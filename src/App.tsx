import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import PromoterForm from './components/PromoterForm';
import Login from './components/Login';
import Home from './components/Home';
import { saveSubmission } from './lib/store';
import { initialFormState, FormState } from './types';

export default function App() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const [userRole, setUserRole] = useState<string | null>(() => {
    return localStorage.getItem('aapi_role');
  });

  const [currentView, setCurrentView] = useState<'home' | 'login' | 'dashboard'>(() => {
    return localStorage.getItem('aapi_role') ? 'dashboard' : 'home';
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session = params.get('session_id');
    const newForm = params.get('new_form');

    if (session) {
      setSessionId(session);
    } else if (newForm === 'true') {
      const initNewForm = async () => {
        const newId = Math.random().toString(36).substring(2, 10);
        const form: FormState = {
          ...initialFormState,
          sessionId: newId,
          createdAt: new Date().toISOString(),
        };
        await saveSubmission(form);
        window.location.href = `/?session_id=${newId}`;
      };
      initNewForm();
    }
  }, []);

  const handleLogin = (role: string) => {
    setUserRole(role);
    localStorage.setItem('aapi_role', role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('aapi_role');
    setCurrentView('home');
  };

  const handleStartLocalForm = async () => {
    const newId = Math.random().toString(36).substring(2, 10);
    const form: FormState = {
      ...initialFormState,
      sessionId: newId,
      createdAt: new Date().toISOString(),
    };
    await saveSubmission(form);
    setSessionId(newId);
    window.history.pushState({}, '', `/?session_id=${newId}`);
  };

  if (sessionId) {
    return <PromoterForm sessionId={sessionId} />;
  }

  if (currentView === 'home') {
    return <Home 
      onLoginClick={() => setCurrentView(userRole ? 'dashboard' : 'login')} 
      onStartLocalForm={handleStartLocalForm}
    />;
  }

  if (currentView === 'login') {
    return <Login onLogin={handleLogin} onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'dashboard' && userRole) {
    return <Dashboard onLogout={handleLogout} role={userRole} />;
  }

  // Fallback
  return <Home 
    onLoginClick={() => setCurrentView('login')} 
    onStartLocalForm={handleStartLocalForm}
  />;
}
