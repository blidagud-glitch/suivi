import React, { useState, useEffect } from 'react';
import { getSubmissions, saveSubmission, deleteSubmission } from '../lib/store';
import { FormState, initialFormState } from '../types';
import { Button } from './ui/Button';
import { Plus, Download, Search, QrCode, Eye, Pencil, Trash2, Users, Settings, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import SubmissionDetails from './SubmissionDetails';
import PromoterForm from './PromoterForm';
import { cn } from '../lib/utils';

import SettingsComponent from './Settings';
import Logo from './ui/Logo';

export default function Dashboard({ onLogout, role }: { onLogout: () => void, role: string }) {
  const [submissions, setSubmissions] = useState<FormState[]>([]);
  const [viewSubmissionId, setViewSubmissionId] = useState<string | null>(null);
  const [editSubmissionId, setEditSubmissionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'agents' | 'settings'>('projects');

  useEffect(() => {
    // Initial fetch
    getSubmissions().then(setSubmissions);

    // Set up polling interval for real-time updates
    const intervalId = setInterval(() => {
      getSubmissions().then(setSubmissions);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce formulaire ?')) {
      await deleteSubmission(id);
      const updated = await getSubmissions();
      setSubmissions(updated);
    }
  };

  const handleEditComplete = async () => {
    setEditSubmissionId(null);
    const updated = await getSubmissions();
    setSubmissions(updated);
  };

  const exportToExcel = () => {
    // Map submissions to the required format for AAPI tracking table
    const data = submissions.map(sub => ({
      "Numéro d'enregistrement": sub.attestationNumero,
      "Contact établi": sub.contactEtabli === 'telephone' ? 'Téléphone' : sub.contactEtabli === 'gud' ? 'GUD' : 'Non',
      "Motif de non-contact": sub.raisonNonContact,
      "Présentation GUD": sub.presentationGUD,
      "Crédit bancaire": sub.necessiteCredit,
      "État du crédit": sub.etatCredit,
      "Foncier nécessaire": sub.necessiteFoncier,
      "Type de foncier": sub.typeFoncier,
      "État du projet": sub.etatProjet,
      "Montant investissement": sub.montantInvestissement,
      "Difficulté principale": sub.difficultePrincipale,
      "Action engagée": sub.actionEngagee,
      "Résultat": sub.resultatTraitement,
      "Date de mise à jour": sub.dateMiseAJour
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Projets");
    
    XLSX.writeFile(workbook, "Suivi_Projets_AAPI.xlsx");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden text-slate-900 font-sans print:h-auto print:overflow-visible">
      <aside className="w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700 flex flex-col text-white hidden md:flex print:hidden">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Logo sizeClasses="w-10 h-10" defaultClasses="bg-emerald-500 rounded-lg text-xl" />
            <div>
              <p className="text-xs text-slate-300 font-medium uppercase tracking-widest leading-tight">Suivi des Investissements</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('projects')} className={cn("w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-colors text-left", activeTab === 'projects' ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            Tableau de Bord
          </button>
          {activeTab === 'projects' && (
            <button onClick={exportToExcel} className="w-full flex items-center gap-3 p-3 text-slate-400 hover:bg-white/5 rounded-xl text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Rapports Excel
            </button>
          )}
          {role === 'superadmin' && (
            <>
            <button onClick={() => setActiveTab('agents')} className={cn("w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-colors text-left", activeTab === 'agents' ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5")}>
              <Users className="w-5 h-5" />
              Gestion des Agents
            </button>
            <button onClick={() => setActiveTab('settings')} className={cn("w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-colors text-left", activeTab === 'settings' ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5")}>
              <Settings className="w-5 h-5" />
              Paramètres
            </button>
            </>
          )}
        </nav>
        <div className="p-6 space-y-3">
          <div className="p-4 bg-emerald-900/30 border border-emerald-500/20 rounded-2xl">
            <p className="text-xs text-emerald-400 mb-1">{role === 'superadmin' ? 'Super Administrateur' : 'Agent Connecté'}</p>
            <p className="text-sm font-medium">{role === 'superadmin' ? 'Direction Générale' : 'Agent AAPI'}</p>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-400 rounded-xl text-sm font-medium transition-colors border border-slate-700 hover:border-red-900/50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden print:overflow-visible">
        <header className="h-16 flex items-center justify-between px-8 bg-white/40 backdrop-blur-sm border-b border-white/20 shrink-0 print:hidden">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-700">Tableau de Bord AAPI</h2>
          </div>
          <div className="flex gap-4">
            <Button onClick={exportToExcel} variant="outline" className="flex items-center gap-2 hidden sm:flex border-slate-300">
              <Download className="w-4 h-4" />
              Exporter Excel (.xlsx)
            </Button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto space-y-6 print:p-0 print:overflow-visible">
          {activeTab === 'agents' ? (
            <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white/40 shadow-xl overflow-hidden flex flex-col p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Gestion des Agents</h3>
                    <p className="text-slate-500 text-sm mt-1">Espace réservé au super administrateur pour la gestion des accès.</p>
                  </div>
                  <Button variant="emerald">Ajouter un agent</Button>
                </div>
                
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-bold uppercase tracking-wide text-xs">Nom</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-wide text-xs">Email</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-wide text-xs">Rôle</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-wide text-xs text-right">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">Agent Standard</td>
                                <td className="px-6 py-4 text-slate-500">admin@aapi.dz</td>
                                <td className="px-6 py-4"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-bold uppercase tracking-wider">Agent</span></td>
                                <td className="px-6 py-4 text-right"><span className="text-emerald-500 font-bold text-xs uppercase">Actif</span></td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">Directeur Général</td>
                                <td className="px-6 py-4 text-slate-500">superadmin@aapi.dz</td>
                                <td className="px-6 py-4"><span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-[10px] font-bold uppercase tracking-wider">Super Admin</span></td>
                                <td className="px-6 py-4 text-right"><span className="text-emerald-500 font-bold text-xs uppercase">Actif</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          ) : activeTab === 'settings' ? (
            <SettingsComponent />
          ) : editSubmissionId ? (
            <div className="absolute inset-0 z-50 bg-slate-50 overflow-auto">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
                <h2 className="text-xl font-bold text-slate-800">Édition de la session #{editSubmissionId.slice(0,4)}</h2>
                <Button variant="outline" onClick={handleEditComplete}>Fermer l'éditeur</Button>
              </div>
              <div className="h-[calc(100vh-73px)]">
                <PromoterForm sessionId={editSubmissionId} onComplete={handleEditComplete} />
              </div>
            </div>
          ) : viewSubmissionId ? (
            <SubmissionDetails 
              submission={submissions.find(s => s.sessionId === viewSubmissionId)!} 
              onClose={() => setViewSubmissionId(null)} 
            />
          ) : (
            <>
          <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white/40 shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/40 flex justify-between items-center">
              <h2 className="font-semibold text-slate-700">Soumissions Récentes</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="pl-9 pr-4 py-2 text-sm bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold uppercase tracking-wide text-xs">Session ID</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wide text-xs">Date de création</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wide text-xs">N° Attestation</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wide text-xs">État du projet</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wide text-xs">Statut</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wide text-xs text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {submissions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        Aucune soumission pour le moment.
                      </td>
                    </tr>
                  ) : (
                    submissions.map(sub => (
                      <tr key={sub.sessionId} className="hover:bg-white/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">{sub.sessionId}</td>
                        <td className="px-6 py-4">{new Date(sub.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{sub.attestationNumero || '-'}</td>
                        <td className="px-6 py-4">
                          {sub.etatProjet ? (
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-200 uppercase">{sub.etatProjet.replace('_', ' ')}</span>
                          ) : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-3 py-1 text-[10px] font-bold rounded-lg border uppercase",
                            sub.status === 'submitted' ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-blue-100 text-blue-700 border-blue-200"
                          )}>
                            {sub.status === 'submitted' ? 'Soumis' : 'Brouillon'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => setViewSubmissionId(sub.sessionId)} 
                              className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 font-bold rounded-lg transition-colors"
                              title="Consulter"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setEditSubmissionId(sub.sessionId)} 
                              className="inline-flex items-center justify-center w-8 h-8 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700 font-bold rounded-lg transition-colors"
                              title="Modifier"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(sub.sessionId)} 
                              className="inline-flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-bold rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </>
          )}
        </div>
      </main>
    </div>
  );
}

// Also need `cn` utility imported. I'll add that.
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
