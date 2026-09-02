import React, { useRef } from 'react';
import { FormState } from '../types';
import { Button } from './ui/Button';
import { Printer } from 'lucide-react';
import Logo from './ui/Logo';
import { useReactToPrint } from 'react-to-print';

interface Props {
  submission: FormState;
  onClose: () => void;
}

export default function SubmissionDetails({ submission, onClose }: Props) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `AAPI-Fiche-${submission.sessionId}`,
  });

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full max-h-[80vh] print:max-h-none print:shadow-none print:border-none print:bg-white print:rounded-none">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 sticky top-0 z-10 print:hidden">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Détails du Projet</h2>
          <p className="text-sm text-slate-500">Session ID: <span className="font-mono">{submission.sessionId}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" onClick={() => handlePrint()} className="bg-slate-800 text-white hover:bg-slate-700">
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </Button>
          <Button variant="outline" onClick={onClose}>Retour au tableau de bord</Button>
        </div>
      </div>
      
      <div ref={printRef} id="print-section" className="p-8 overflow-y-auto flex-1 space-y-8 bg-white print:p-0 print:overflow-visible">
        <div className="mb-6 pb-6 border-b border-slate-200 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AAPI - Fiche de Suivi de Projet</h1>
            <p className="text-slate-500 mt-1">Session ID: <span className="font-mono">{submission.sessionId}</span> | Date: {new Date(submission.createdAt).toLocaleDateString()}</p>
          </div>
          <Logo sizeClasses="w-16 h-16" defaultClasses="bg-emerald-500 rounded-xl text-3xl" />
        </div>

        {/* Section 1 */}
        <section>
          <h3 className="text-lg font-bold text-emerald-700 mb-4 border-b border-emerald-100 pb-2">1. Prise de contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="N° Attestation" value={submission.attestationNumero} />
            <DetailItem label="Email Responsable" value={submission.responsableEmail} />
            <DetailItem label="Téléphone Responsable" value={submission.responsableTelephone} />
            <DetailItem label="Contact Établi" value={submission.contactEtabli} />
            <DetailItem label="Info Promoteur" value={submission.informationPromoteur || submission.informationPromoteurAutre} />
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h3 className="text-lg font-bold text-emerald-700 mb-4 border-b border-emerald-100 pb-2">2. État d'avancement et Diagnostic</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Présentation GUD" value={submission.presentationGUD} />
            <DetailItem label="Motif Non Présentation" value={submission.motifNonPresentation || submission.motifNonPresentationAutre} />
            <DetailItem label="Nécessite Crédit" value={submission.necessiteCredit} />
            <DetailItem label="État Crédit" value={submission.etatCredit} />
          </div>

          {submission.capitalRepartition && submission.capitalRepartition.length > 0 && (
            <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden">
              <h4 className="text-sm font-bold text-slate-700 bg-slate-50 p-3 border-b border-slate-200">5.1. Répartition du capital</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-2 border-b">Associé</th>
                      <th className="px-4 py-2 border-b">Nationalité</th>
                      <th className="px-4 py-2 border-b">Part (%)</th>
                      <th className="px-4 py-2 border-b">Montant</th>
                      <th className="px-4 py-2 border-b">Devise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submission.capitalRepartition.map((entry, idx) => (
                      <tr key={idx} className="border-b last:border-0 border-slate-100">
                        <td className="px-4 py-2 font-medium text-slate-700">{entry.associe}</td>
                        <td className="px-4 py-2">{entry.nationalite}</td>
                        <td className="px-4 py-2">{entry.part}</td>
                        <td className="px-4 py-2">{entry.montant}</td>
                        <td className="px-4 py-2">{entry.devise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Section 3 */}
        <section>
          <h3 className="text-lg font-bold text-emerald-700 mb-4 border-b border-emerald-100 pb-2">3. Foncier & Permis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Nécessite Foncier" value={submission.necessiteFoncier} />
            <DetailItem label="Type Foncier" value={submission.typeFoncier} />
            <DetailItem label="Superficie" value={submission.superficieFoncier} />
            <DetailItem label="Localisation" value={submission.localisationFoncier} />
            <DetailItem label="Mode d'accès" value={submission.modeAccesFoncier || submission.modeAccesFoncierAutre} />
            <DetailItem label="État démarches foncières" value={submission.etatDemarchesFoncieres} />
            
            <DetailItem label="Nécessite Permis" value={submission.necessitePermis} />
            <DetailItem label="État Permis" value={submission.etatPermis} />
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h3 className="text-lg font-bold text-emerald-700 mb-4 border-b border-emerald-100 pb-2">4. Réalisation & Difficultés</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="État du projet" value={submission.etatProjet?.replace(/_/g, ' ')} />
            <DetailItem label="Montant Investissement" value={submission.montantInvestissement} />
            <DetailItem label="Taux avancement physique" value={submission.tauxAvancementPhysique} />
            <DetailItem label="Difficulté principale" value={submission.difficultePrincipale} />
            
            <div className="col-span-1 md:col-span-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Toutes les difficultés</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {submission.difficultes.length > 0 ? submission.difficultes.map((d, i) => (
                  <span key={i} className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">{d}</span>
                )) : <span className="text-sm text-slate-400">Aucune</span>}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h3 className="text-lg font-bold text-emerald-700 mb-4 border-b border-emerald-100 pb-2">5. Signature</h3>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[150px]">
            {submission.signatureDataUrl ? (
              <img src={submission.signatureDataUrl} alt="Signature du promoteur" className="max-h-32 object-contain mix-blend-multiply" />
            ) : (
              <p className="text-slate-400 text-sm italic">Aucune signature fournie</p>
            )}
            <p className="mt-2 text-xs text-slate-500 uppercase font-bold tracking-widest">Signature du Promoteur</p>
          </div>
        </section>

      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: any }) {
  if (!value) return null;
  return (
    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">{label}</span>
      <span className="text-sm text-slate-900 font-medium">{value}</span>
    </div>
  );
}
