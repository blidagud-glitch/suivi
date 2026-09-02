import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { neon } from '@neondatabase/serverless';

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

async function initDb() {
  const sql = getDb();
  if (sql) {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS submissions (
          session_id TEXT PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `;
      console.log('Database initialized successfully.');
    } catch (err) {
      console.error('Error initializing database:', err);
    }
  } else {
    console.warn('⚠️ No DATABASE_URL found. Please set it in the environment variables to save submissions.');
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  await initDb();

  app.use(express.json());

  // API Routes
  app.get('/api/config', (req, res) => {
    res.json({ appUrl: process.env.APP_URL || '' });
  });

  app.get('/api/sessions', async (req, res) => {
    const sql = getDb();
    if (!sql) return res.json([]);
    
    try {
      const rows = await sql`SELECT data FROM submissions ORDER BY created_at DESC`;
      res.json(rows.map(r => r.data));
    } catch (err) {
      console.error('Error fetching sessions:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.get('/api/sessions/:id', async (req, res) => {
    const sql = getDb();
    if (!sql) return res.status(500).json({ error: 'Database not configured' });

    try {
      const rows = await sql`SELECT data FROM submissions WHERE session_id = ${req.params.id}`;
      if (rows.length > 0) {
        res.json(rows[0].data);
      } else {
        res.status(404).json({ error: 'Not found' });
      }
    } catch (err) {
      console.error('Error fetching session:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.post('/api/sessions/:id', async (req, res) => {
    const sql = getDb();
    if (!sql) return res.status(500).json({ error: 'Database not configured' });

    try {
      // Upsert logic
      await sql`
        INSERT INTO submissions (session_id, data) 
        VALUES (${req.params.id}, ${req.body}::jsonb)
        ON CONFLICT (session_id) DO UPDATE SET data = EXCLUDED.data
      `;
      res.json({ success: true });
    } catch (err) {
      console.error('Error saving session:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.delete('/api/sessions/:id', async (req, res) => {
    const sql = getDb();
    if (!sql) return res.status(500).json({ error: 'Database not configured' });

    try {
      await sql`DELETE FROM submissions WHERE session_id = ${req.params.id}`;
      res.json({ success: true });
    } catch (err) {
      console.error('Error deleting session:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
