import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. First initNewForm
old_init_new = """      const initNewForm = async () => {
        const newId = Math.random().toString(36).substring(2, 10);
        const form: FormState = {
          ...initialFormState,
          sessionId: newId,
          createdAt: new Date().toISOString(),
        };
        await saveSubmission(form);
        window.location.href = `/?session_id=${newId}`;
      };"""

new_init_new = """      const initNewForm = async () => {
        const newId = Math.random().toString(36).substring(2, 10);
        // Ne pas sauvegarder en base pour éviter les brouillons, PromoterForm initialisera l'état localement.
        window.location.href = `/?session_id=${newId}`;
      };"""
content = content.replace(old_init_new, new_init_new)

# 2. handleStartLocalForm
old_start_local = """  const handleStartLocalForm = async () => {
    const newId = Math.random().toString(36).substring(2, 10);
    const form: FormState = {
      ...initialFormState,
      sessionId: newId,
      createdAt: new Date().toISOString(),
    };
    await saveSubmission(form);
    setSessionId(newId);
    window.history.pushState({}, '', `/?session_id=${newId}`);
  };"""

new_start_local = """  const handleStartLocalForm = async () => {
    const newId = Math.random().toString(36).substring(2, 10);
    // Ne pas sauvegarder en base pour éviter les brouillons
    setSessionId(newId);
    window.history.pushState({}, '', `/?session_id=${newId}`);
  };"""
content = content.replace(old_start_local, new_start_local)

with open('src/App.tsx', 'w') as f:
    f.write(content)
