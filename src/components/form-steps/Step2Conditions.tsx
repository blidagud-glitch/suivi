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
        <h3 className="font-semibold text-gray-900 border-b pb-2">5. Informations sur les conditions de réalisation</h3>
        
        {/* Note: In a full app we'd have a dynamic table for Capital, keeping it simple here for space */}
        <div className="space-y-4">
          <Label>5.2 Financement (Le projet nécessite-t-il un crédit bancaire ?)</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="credit" required checked={data.necessiteCredit === 'oui'} onChange={() => update({ necessiteCredit: 'oui' })} />
              <span>Oui</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="credit" required checked={data.necessiteCredit === 'non'} onChange={() => update({ necessiteCredit: 'non', etatCredit: '' })} />
              <span>Non</span>
            </label>
          </div>
        </div>

        {data.necessiteCredit === 'oui' && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
            <Label>État d'avancement de la demande de crédit</Label>
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
