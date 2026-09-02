import React from 'react';
import { FormState } from '../../types';
import { Input, Label } from '../ui/Input';

export default function Step2Conditions({ 
  data, update 
}: { 
  data: FormState, update: (u: Partial<FormState>) => void 
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Partie II — État d'avancement et diagnostic</h2>
        <p className="text-gray-500 text-sm">Suivi de la présentation au GUD et conditions de réalisation (Capital, Financement).</p>
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">4. Suivi de la présentation au GUD</h3>
        
        <div className="space-y-4">
          <Label>4.1 Présentation au GUD (Le promoteur s'est-il présenté ?)</Label>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { id: 'renseigne', label: 'Oui, formulaire renseigné' },
              { id: 'non_renseigne', label: 'Oui, présentation au GUD mais formulaire non renseigné' },
              { id: 'pas_presente', label: 'Non, ne s\'est pas encore présenté' },
              { id: 'refuse', label: 'Non, refuse de se présenter' }
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-2 cursor-pointer p-3 border rounded-md hover:bg-gray-50">
                <input 
                  type="radio" name="pres_gud" required
                  checked={data.presentationGUD === opt.id} 
                  onChange={() => update({ presentationGUD: opt.id })}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {data.presentationGUD === 'pas_presente' && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
            <Label>4.2. Proposition d'un autre rendez-vous</Label>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="rdv" checked={data.autreRendezVous === 'oui'} onChange={() => update({ autreRendezVous: 'oui' })} />
                <span className="text-sm">Oui</span>
              </label>
              {data.autreRendezVous === 'oui' && (
                <div className="ml-6 flex items-center gap-2">
                  <span className="text-sm">Date prévue :</span>
                  <Input type="date" value={data.autreRendezVousDate} onChange={e => update({ autreRendezVousDate: e.target.value })} className="w-auto h-8" />
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="rdv" checked={data.autreRendezVous === 'non'} onChange={() => update({ autreRendezVous: 'non' })} />
                <span className="text-sm">Non</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="rdv" checked={data.autreRendezVous === 'autre'} onChange={() => update({ autreRendezVous: 'autre' })} />
                <span className="text-sm">Autre :</span>
              </label>
              {data.autreRendezVous === 'autre' && (
                <div className="ml-6 flex items-center gap-2">
                  <Input value={data.autreRendezVousAutre} onChange={e => update({ autreRendezVousAutre: e.target.value })} placeholder="Précisez..." className="mt-1" />
                </div>
              )}
            </div>
          </div>
        )}

        {data.presentationGUD === 'non_renseigne' || data.presentationGUD === 'pas_presente' ? (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
            <Label>4.3 Motif de non-présentation ou de non-renseignement</Label>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { id: 'disponibilite', label: 'Manque de disponibilité' },
                { id: 'report', label: 'Report demandé par le promoteur' },
                { id: 'interet', label: 'Absence d\'intérêt' },
                { id: 'refus', label: 'Refus de renseigner le formulaire' },
                { id: 'deplacer', label: 'Difficulté à se déplacer au GUD' },
                { id: 'autre', label: 'Autre' }
              ].map(opt => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" name="motif_non_pres" 
                    checked={data.motifNonPresentation === opt.id} 
                    onChange={() => update({ motifNonPresentation: opt.id })}
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
            {data.motifNonPresentation === 'autre' && (
              <Input 
                value={data.motifNonPresentationAutre}
                onChange={e => update({ motifNonPresentationAutre: e.target.value })}
                placeholder="Précisez..."
                className="mt-2"
              />
            )}
          </div>
        ) : null}
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">5. Informations sur les conditions de réalisation du projet</h3>
        
        <div className="space-y-4">
          <Label>5.1. Répartition du capital :</Label>
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-3 py-2 border-b">N°</th>
                  <th className="px-3 py-2 border-b">Associé / Actionnaire</th>
                  <th className="px-3 py-2 border-b">Nationalité</th>
                  <th className="px-3 py-2 border-b">Part du capital (%)</th>
                  <th className="px-3 py-2 border-b">Montant</th>
                  <th className="px-3 py-2 border-b">Devise (USD/Euro)</th>
                  <th className="px-3 py-2 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {data.capitalRepartition.map((entry, idx) => (
                  <tr key={entry.id} className="border-b last:border-0">
                    <td className="px-3 py-2">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <Input value={entry.associe} onChange={e => {
                        const newRep = [...data.capitalRepartition];
                        newRep[idx].associe = e.target.value;
                        update({ capitalRepartition: newRep });
                      }} className="h-8 min-w-[150px]" />
                    </td>
                    <td className="px-3 py-2">
                      <Input value={entry.nationalite} onChange={e => {
                        const newRep = [...data.capitalRepartition];
                        newRep[idx].nationalite = e.target.value;
                        update({ capitalRepartition: newRep });
                      }} className="h-8 min-w-[100px]" />
                    </td>
                    <td className="px-3 py-2">
                      <Input type="number" value={entry.part || ''} onChange={e => {
                        const newRep = [...data.capitalRepartition];
                        newRep[idx].part = parseFloat(e.target.value) || 0;
                        update({ capitalRepartition: newRep });
                      }} className="h-8 w-24" />
                    </td>
                    <td className="px-3 py-2">
                      <Input type="number" value={entry.montant || ''} onChange={e => {
                        const newRep = [...data.capitalRepartition];
                        newRep[idx].montant = parseFloat(e.target.value) || 0;
                        update({ capitalRepartition: newRep });
                      }} className="h-8 w-24" />
                    </td>
                    <td className="px-3 py-2">
                      <Input value={entry.devise} onChange={e => {
                        const newRep = [...data.capitalRepartition];
                        newRep[idx].devise = e.target.value;
                        update({ capitalRepartition: newRep });
                      }} className="h-8 w-24" />
                    </td>
                    <td className="px-3 py-2">
                      <button type="button" onClick={() => {
                        update({ capitalRepartition: data.capitalRepartition.filter(e => e.id !== entry.id) });
                      }} className="text-red-500 hover:bg-red-50 p-1 rounded">✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" onClick={() => {
            update({ capitalRepartition: [...data.capitalRepartition, { id: Date.now().toString(), associe: '', nationalite: '', part: 0, montant: 0, devise: '' }] });
          }} className="text-sm text-blue-600 hover:underline">+ Ajouter un associé</button>
        </div>

        <div className="space-y-4">
          <Label>5.2. Financement :</Label>
          <Label className="block mt-2">5.2.1. Le projet nécessite-t-il un crédit bancaire ?</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="credit" required checked={data.necessiteCredit === 'oui'} onChange={() => update({ necessiteCredit: 'oui' })} />
              <span>Oui (Aller à la question 5.2.2)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="credit" required checked={data.necessiteCredit === 'non'} onChange={() => update({ necessiteCredit: 'non', etatCredit: '' })} />
              <span>Non (Aller à la question 5.3)</span>
            </label>
          </div>
        </div>

        {data.necessiteCredit === 'oui' && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
            <Label>5.2.2. Si oui, quel est l'état d'avancement de votre demande de crédit ?</Label>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { id: 'aucune', label: 'Aucune démarche engagée' },
                { id: 'preparation', label: 'Dossier en préparation' },
                { id: 'depose', label: 'Dossier déposé' },
                { id: 'etude', label: 'Dossier en cours d\'étude' },
                { id: 'approuve', label: 'Crédit approuvé' },
                { id: 'partiellement', label: 'Crédit partiellement approuvé' },
                { id: 'refuse', label: 'Crédit refusé' },
                { id: 'decaisse', label: 'Crédit décaissé' }
              ].map(opt => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" name="etat_credit" 
                    checked={data.etatCredit === opt.id} 
                    onChange={() => update({ etatCredit: opt.id })}
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
