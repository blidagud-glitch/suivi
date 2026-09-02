import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input, Label } from './ui/Input';
import { ArrowLeft } from 'lucide-react';
import Logo from './ui/Logo';

interface LoginProps {
  onLogin: (role: string) => void;
  onBack: () => void;
}

export default function Login({ onLogin, onBack }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@aapi.dz' && password === 'admin') {
      onLogin('agent');
    } else if (email === 'superadmin@aapi.dz' && password === 'superadmin') {
      onLogin('superadmin');
    } else {
      setError('Email ou mot de passe incorrect. (Utilisez admin@aapi.dz ou superadmin@aapi.dz)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à l'accueil
      </button>
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="text-center space-y-3">
          <div className="flex justify-center mx-auto">
            <Logo sizeClasses="w-20 h-20" defaultClasses="bg-emerald-500 rounded-2xl text-4xl shadow-emerald-500/30" />
          </div>
          <p className="text-slate-500 text-sm mt-6">Veuillez vous connecter à votre espace agent pour gérer les projets.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-4 rounded-xl border border-red-100 font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-2 text-left">
            <Label htmlFor="email">Adresse email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="admin@aapi.dz" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-3"
            />
          </div>
          
          <div className="space-y-2 text-left">
            <Label htmlFor="password">Mot de passe</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="py-3"
            />
          </div>
          
          <Button type="submit" className="w-full text-base py-6 mt-4" variant="emerald">
            Se connecter
          </Button>
        </form>
        
        <div className="text-center text-sm text-slate-400">
          <p>Plateforme de suivi des investissements</p>
        </div>
      </div>
    </div>
  );
}
