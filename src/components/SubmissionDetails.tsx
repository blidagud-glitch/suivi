import React from 'react';
import { FormState } from '../types';
import { Button } from './ui/Button';
import { Printer } from 'lucide-react';
import { getLabel } from '../lib/mappings';

export default function SubmissionDetails({ 
  submission, 
  onClose 
}: { 
  submission: FormState, 
  onClose: () => void 
}) {
  return (
    <div className="absolute inset-0 z-50 bg-slate-50/90 backdrop-blur-sm overflow-auto print:bg-white print:overflow-visible print:static">
      <div className="max-w-5xl mx-auto my-8 bg-white rounded-3xl shadow-2xl overflow-hidden print:m-0 print:rounded-none print:shadow-none">
        
        {/* Header - Hidden when printing */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-800 text-white print:hidden">
          <div>
            <h2 className="text-2xl font-bold">Détails de la soumission</h2>
            <p className="text-slate-300">Session #{submission.sessionId}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white text-slate-800 hover:bg-slate-100" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" /> Imprimer
            </Button>
            <Button variant="outline" className="bg-slate-700 text-white hover:bg-slate-600 border-slate-600" onClick={onClose}>Fermer</Button>
          </div>
        </div>

        {/* Print Only Header */}
        <div className="hidden print:block text-center border-b-2 border-black pb-4 mb-4">
          <h1 className="text-2xl font-bold uppercase tracking-wider">Fiche d'État d'Avancement de Projet</h1>
          <p className="text-sm">Session ID: {submission.sessionId} | Date: {submission.createdAt ? new Date(submission.createdAt).toLocaleDateString('fr-FR') : '-'}</p>
        </div>

        {/* Content - Compact for print */}
        <div className="p-8 print:p-0 space-y-8 print:space-y-4 print:text-[11px] print:leading-tight">
          
          <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-8 print:gap-4">
            
            {/* Section 1 */}
            <section className="print:break-inside-avoid">
              <h3 className="text-lg print:text-sm font-bold text-emerald-700 print:text-black mb-4 print:mb-2 border-b border-emerald-100 print:border-black pb-2">1. Informations Générales</h3>
              <div className="space-y-3 print:space-y-1">
                <DetailItem label="N° Attestation" value={submission.attestationNumero} />
                <DetailItem label="Email Responsable" value={submission.responsableEmail} />
                <DetailItem label="Téléphone Responsable" value={submission.responsableTelephone} />
                <DetailItem label="Contact Établi" value={getLabel('contactEtabli', submission.contactEtabli)} />
                {submission.contactEtabli === 'informe' && <DetailItem label="Information Promoteur" value={submission.informationPromoteur === 'autre' ? submission.informationPromoteurAutre : submission.informationPromoteur?.replace(/_/g, ' ')} />}
                {submission.contactEtabli === 'autre' && <DetailItem label="Raison Non Contact" value={submission.raisonNonContact === 'autre' ? submission.raisonNonContactAutre : submission.raisonNonContact?.replace(/_/g, ' ')} />}
              </div>
            </section>

            {/* Section 2 */}
            <section className="print:break-inside-avoid">
              <h3 className="text-lg print:text-sm font-bold text-emerald-700 print:text-black mb-4 print:mb-2 border-b border-emerald-100 print:border-black pb-2">2. Présentation & Financement</h3>
              <div className="space-y-3 print:space-y-1">
                <DetailItem label="Présentation au GUD" value={getLabel('presentationGUD', submission.presentationGUD)} />
                {submission.presentationGUD === 'pas_presente' && <DetailItem label="Motif Non Présentation" value={getLabel('motifNonPresentation', submission.motifNonPresentation === 'autre' ? submission.motifNonPresentationAutre : submission.motifNonPresentation)} />}
                
                <DetailItem label="Nécessite Crédit" value={getLabel('necessiteCredit', submission.necessiteCredit)} />
                <DetailItem label="État Crédit" value={getLabel('etatCredit', submission.etatCredit)} />
              </div>
            </section>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-8 print:gap-4">
            
            {/* Section 3 */}
            <section className="print:break-inside-avoid">
              <h3 className="text-lg print:text-sm font-bold text-emerald-700 print:text-black mb-4 print:mb-2 border-b border-emerald-100 print:border-black pb-2">3. Foncier, Permis & PPI</h3>
              <div className="grid grid-cols-1 gap-3 print:gap-1">
                <DetailItem label="Nécessite Foncier" value={getLabel('necessiteFoncier', submission.necessiteFoncier)} />
                {submission.necessiteFoncier === 'oui' && (
                  <>
                    <DetailItem label="Type Foncier" value={submission.typeFoncier} />
                    <DetailItem label="Superficie" value={submission.superficieFoncier} />
                    <DetailItem label="Localisation" value={submission.localisationFoncier} />
                    <DetailItem label="Mode d'accès" value={getLabel('modeAccesFoncier', submission.modeAccesFoncier === 'autre' ? submission.modeAccesFoncierAutre : submission.modeAccesFoncier)} />
                    <DetailItem label="État démarches foncières" value={getLabel('etatDemarchesFoncieres', submission.etatDemarchesFoncieres)} />
                  </>
                )}
                
                <DetailItem label="Nécessite Permis" value={getLabel('necessitePermis', submission.necessitePermis)} />
                {submission.necessitePermis === 'oui' && (
                  <>
                    <DetailItem label="État Permis" value={getLabel('etatPermis', submission.etatPermis)} />
                    {submission.dateDepotPermis && <DetailItem label="Date Dépôt Permis" value={submission.dateDepotPermis} />}
                    {submission.dateObtentionPermis && <DetailItem label="Date Obtention Permis" value={submission.dateObtentionPermis} />}
                  </>
                )}

                <DetailItem label="Nécessite PPI" value={getLabel('necessitePPI', submission.necessitePPI)} />
                {submission.necessitePPI === 'oui' && (
                  <>
                    <DetailItem label="État PPI" value={getLabel('etatPPI', submission.etatPPI)} />
                    {submission.dateDepotPPI && <DetailItem label="Date Dépôt PPI" value={submission.dateDepotPPI} />}
                  </>
                )}
              </div>
            </section>

            {/* Section 4 */}
            <section className="print:break-inside-avoid">
              <h3 className="text-lg print:text-sm font-bold text-emerald-700 print:text-black mb-4 print:mb-2 border-b border-emerald-100 print:border-black pb-2">4. Réalisation & Avancement</h3>
              <div className="grid grid-cols-1 gap-3 print:gap-1">
                <DetailItem label="État du projet" value={getLabel('etatProjet', submission.etatProjet)} />
                <DetailItem label="Montant Investissement" value={submission.montantInvestissement} />
                <DetailItem label="Taux avancement physique" value={submission.tauxAvancementPhysique ? `${submission.tauxAvancementPhysique}%` : undefined} />
                
                {(submission.emploisCreesExecution || submission.emploisCreesMaitrise || submission.emploisCreesCadre) && (
                  <div className="bg-slate-50 print:bg-white p-2 rounded-xl border border-slate-100 print:border-gray-300">
                    <span className="text-[10px] font-bold text-slate-500 print:text-black uppercase tracking-wide block mb-1">Emplois Créés</span>
                    <span className="text-sm print:text-[11px] text-slate-900 print:text-black font-medium">
                      Exécution: {submission.emploisCreesExecution || 0} | Maitrise: {submission.emploisCreesMaitrise || 0} | Cadre: {submission.emploisCreesCadre || 0}
                    </span>
                  </div>
                )}
                
                {submission.perspectivesRelance === 'oui' && <DetailItem label="Date prévisionnelle relance" value={submission.dateRelance} />}
                {submission.miseEnExploitation && <DetailItem label="Mise en exploitation" value={getLabel('miseEnExploitation', submission.miseEnExploitation)} />}
                {submission.datePleineExploitation && <DetailItem label="Date prévue pleine exploitation" value={submission.datePleineExploitation} />}
                
                <DetailItem label="Difficulté principale" value={getLabel('difficultes', submission.difficultePrincipale)} />
                
                <div className="">
                  <span className="text-[10px] font-bold text-slate-500 print:text-black uppercase tracking-wide">Toutes les difficultés</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {submission.difficultes?.length > 0 ? submission.difficultes.map((d, i) => (
                      <span key={i} className="px-2 py-0.5 bg-red-50 print:bg-white text-red-700 print:text-black border border-red-200 print:border-gray-400 rounded text-[10px]">
                        {getLabel('difficultes', d)}
                      </span>
                    )) : <span className="text-[10px] text-slate-400">Aucune</span>}
                  </div>
                </div>

                {submission.demarchesRealisees && submission.demarchesRealisees.length > 0 && (
                  <div className="mt-2">
                    <span className="text-[10px] font-bold text-slate-500 print:text-black uppercase tracking-wide">Démarches Réalisées</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {submission.demarchesRealisees.map((d, i) => (
                        <span key={i} className="px-2 py-0.5 bg-emerald-50 print:bg-white text-emerald-700 print:text-black border border-emerald-200 print:border-gray-400 rounded text-[10px]">
                          {getLabel('demarchesRealisees', d)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Capital Distribution (only if present) */}
          {submission.capitalRepartition && submission.capitalRepartition.length > 0 && (
            <section className="print:break-inside-avoid">
              <h3 className="text-lg print:text-sm font-bold text-emerald-700 print:text-black mb-4 print:mb-2 border-b border-emerald-100 print:border-black pb-2">Répartition du Capital</h3>
              <div className="overflow-x-auto border border-slate-200 print:border-gray-400 rounded-xl print:rounded-none">
                <table className="w-full text-left text-sm print:text-[10px]">
                  <thead className="bg-slate-50 print:bg-gray-100 text-slate-600 print:text-black">
                    <tr>
                      <th className="px-3 py-1 border-b print:border-gray-400">Associé</th>
                      <th className="px-3 py-1 border-b print:border-gray-400">Nationalité</th>
                      <th className="px-3 py-1 border-b print:border-gray-400">Part (%)</th>
                      <th className="px-3 py-1 border-b print:border-gray-400">Montant</th>
                      <th className="px-3 py-1 border-b print:border-gray-400">Devise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submission.capitalRepartition.map((entry, idx) => (
                      <tr key={idx} className="border-b last:border-0 border-slate-100 print:border-gray-300">
                        <td className="px-3 py-1 font-medium">{entry.associe}</td>
                        <td className="px-3 py-1">{entry.nationalite}</td>
                        <td className="px-3 py-1">{entry.part}</td>
                        <td className="px-3 py-1">{entry.montant}</td>
                        <td className="px-3 py-1">{entry.devise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Section 8 & Signature side-by-side for print */}
          <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-8 print:gap-4">
            <section className="print:break-inside-avoid">
              <h3 className="text-lg print:text-sm font-bold text-emerald-700 print:text-black mb-4 print:mb-2 border-b border-emerald-100 print:border-black pb-2">8. Suivi du traitement</h3>
              <div className="grid grid-cols-1 gap-3 print:gap-1">
                <DetailItem label="Action engagée" value={getLabel('actionEngagee', submission.actionEngagee === 'autre' ? submission.actionEngageeAutre : submission.actionEngagee)} />
                <DetailItem label="Partie intervenante" value={getLabel('partieIntervenante', ['locale', 'centrale', 'public', 'autre'].includes(submission.partieIntervenante) ? submission.partieIntervenanteAutre : submission.partieIntervenante)} />
                <DetailItem label="État du traitement" value={getLabel('etatTraitement', submission.etatTraitement)} />
                <DetailItem label="Échéance de traitement" value={submission.echeanceTraitement} />
                <DetailItem label="Résultat du traitement" value={getLabel('resultatTraitement', submission.resultatTraitement === 'autre' ? submission.resultatTraitementAutre : submission.resultatTraitement)} />
                <DetailItem label="Date de mise à jour" value={submission.dateMiseAJour} />
                <DetailItem label="Possibilité réactivation" value={getLabel('possibiliteReactivation', submission.possibiliteReactivation)} />
                <DetailItem label="Observations" value={submission.observations} />
              </div>
            </section>

            <section className="print:break-inside-avoid flex flex-col">
              <h3 className="text-lg print:text-sm font-bold text-emerald-700 print:text-black mb-4 print:mb-2 border-b border-emerald-100 print:border-black pb-2">Signature</h3>
              <div className="flex-1 bg-slate-50 print:bg-white p-4 rounded-xl border border-slate-200 print:border-gray-400 flex flex-col items-center justify-center">
                {submission.signatureDataUrl ? (
                  <img src={submission.signatureDataUrl} alt="Signature du promoteur" className="max-h-24 print:max-h-20 object-contain mix-blend-multiply" />
                ) : (
                  <p className="text-slate-400 print:text-black text-[10px] italic">Aucune signature</p>
                )}
                <p className="mt-2 text-[10px] text-slate-500 print:text-black uppercase font-bold tracking-widest">Le Promoteur</p>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: any }) {
  if (!value) return null;
  return (
    <div className="bg-slate-50 print:bg-white p-2 print:p-1 rounded-xl print:rounded-none border border-slate-100 print:border-b print:border-t-0 print:border-x-0 print:border-gray-300">
      <span className="text-[10px] font-bold text-slate-500 print:text-gray-700 uppercase tracking-wide block mb-0.5">{label}</span>
      <span className="text-sm print:text-[11px] text-slate-900 print:text-black font-medium leading-tight">{value}</span>
    </div>
  );
}
