import React, { useState, useEffect } from 'react';
import { getSubmissions, saveSubmission, deleteSubmission, subscribeToSubmissions } from '../lib/store';
import { FormState, initialFormState } from '../types';
import { Button } from './ui/Button';
import { Plus, Download, Search, QrCode, Eye, Pencil, Trash2, Users, Settings, Upload } from 'lucide-react';
import { generateExcel } from '../lib/exportExcel';
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
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredSubmissions = submissions.filter(sub => {
    let match = true;
    const subDate = new Date(sub.createdAt);
    subDate.setHours(0, 0, 0, 0);

    if (startDate) {
      const s = new Date(startDate);
      s.setHours(0, 0, 0, 0);
      if (subDate < s) match = false;
    }
    if (endDate) {
      const e = new Date(endDate);
      e.setHours(0, 0, 0, 0);
      if (subDate > e) match = false;
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (sub.attestationNumero && sub.attestationNumero.toLowerCase().includes(searchLower)) ||
        (sub.sessionId && sub.sessionId.toLowerCase().includes(searchLower));
      if (!matchesSearch) match = false;
    }

    return match;
  });


  useEffect(() => {
    const unsubscribe = subscribeToSubmissions((data) => {
      setSubmissions(data);
    });
    return () => unsubscribe();
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


  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredSubmissions, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `aapi_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedData)) {
          if (window.confirm(`Vous allez importer ${importedData.length} formulaires. Voulez-vous continuer ?`)) {
            for (const sub of importedData) {
              await saveSubmission(sub);
            }
            alert("Importation réussie !");
            event.target.value = "";
          }
        } else {
          alert("Format de fichier invalide.");
        }
      } catch (err) {
        alert("Erreur lors de la lecture du fichier JSON.");
      }
    };
    reader.readAsText(file);
  };

  const exportToExcel = () => {
    generateExcel(filteredSubmissions);
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
            <div className="relative">
              <input type="file" accept=".json" onChange={handleImportJson} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Importer" />
              <Button variant="outline" className="flex items-center gap-2 border-slate-300 pointer-events-none">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Importer</span>
              </Button>
            </div>
            <Button onClick={exportToJson} variant="outline" className="flex items-center gap-2 border-slate-300">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Sauvegarder</span>
            </Button>
            <Button onClick={exportToExcel} variant="outline" className="flex items-center gap-2 border-slate-300">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exporter Excel</span>
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
            <div className="p-6 border-b border-white/40 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center gap-6 bg-slate-50/50 p-2 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600 font-medium">Du</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-blue-700 font-medium"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600 font-medium">au :</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-blue-700 font-medium"
                  />
                </div>
                <div className="flex items-center gap-2 border-l border-slate-300 pl-6">
                  <span className="text-sm font-bold text-teal-700 underline">Résultat</span>
                  <span className="text-lg font-bold text-red-600">{String(filteredSubmissions.length).padStart(2, '0')}</span>
                </div>
              </div>
              
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher (N° Attestation...)" 
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
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        Aucune soumission pour le moment.
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map(sub => (
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
