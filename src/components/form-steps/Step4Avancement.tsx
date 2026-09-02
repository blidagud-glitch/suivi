import React from 'react';
import { FormState } from '../../types';
import { Input, Label } from '../ui/Input';

export default function Step4Avancement({ 
  data, update 
}: { 
  data: FormState, update: (u: Partial<FormState>) => void 
}) {
  const toggleDifficulte = (id: string) => {
    if (data.difficultes.includes(id)) {
      update({ difficultes: data.difficultes.filter(d => d !== id) });
    } else {
      update({ difficultes: [...data.difficultes, id] });
    }
  };

  const toggleSoutien = (id: string) => {
    if (data.typesSoutien.includes(id)) {
      update({ typesSoutien: data.typesSoutien.filter(s => s !== id) });
    } else {
      update({ typesSoutien: [...data.typesSoutien, id] });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">6. État d'avancement du projet</h3>
        
        <div className="space-y-4">
          <Label>6.1 État actuel du projet</Label>
          <div className="grid sm:grid-cols-3 gap-2">
            {[
              { id: 'abandonne', label: 'Abandonné' },
              { id: 'annule', label: 'Annulé' },
              { id: 'en_arret', label: 'En arrêt' },
              { id: 'non_entame', label: 'Non encore entamé' },
              { id: 'en_cours', label: 'En cours de réalisation' },
              { id: 'acheve', label: 'Achevé' },
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-2 cursor-pointer p-3 border rounded-md hover:bg-gray-50">
                <input 
                  type="radio" name="etat_projet" required
                  checked={data.etatProjet === opt.id} 
                  onChange={() => update({ etatProjet: opt.id })}
                />
                <span className="text-sm font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {['abandonne', 'annule', 'en_arret'].includes(data.etatProjet) && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Montant d'investissement réalisé (DA)</Label>
                <Input type="number" value={data.montantInvestissement} onChange={e => update({ montantInvestissement: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Taux global d'avancement physique (%)</Label>
                <Input type="number" max="100" value={data.tauxAvancementPhysique} onChange={e => update({ tauxAvancementPhysique: e.target.value })} />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Label>6.3 Difficultés ou obstacles rencontrés (plusieurs réponses possibles)</Label>
          <div className="space-y-2">
            {[
              { id: 'admin', label: 'Procédures administratives et réglementaires' },
              { id: 'permis', label: 'Permis de construire et actes d\'urbanisme' },
              { id: 'foncier', label: 'Foncier (accès, disponibilité)' },
              { id: 'finance', label: 'Financement (crédit, ressources)' },
              { id: 'ppi', label: 'Importations et approvisionnement extérieur (PPI)' },
              { id: 'logistique', label: 'Approvisionnement et logistique' },
              { id: 'tech', label: 'Contraintes techniques ou technologiques' },
              { id: 'partenaires', label: 'Partenaires, prestataires ou sous-traitants' },
              { id: 'reseaux', label: 'Raccordement aux réseaux (élec, gaz, eau...)' },
              { id: 'rh', label: 'Main-d\'œuvre et ressources humaines' },
              { id: 'marche', label: 'Marché et conditions économiques' },
              { id: 'autre', label: 'Autre difficulté' }
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={data.difficultes.includes(opt.id)}
                  onChange={() => toggleDifficulte(opt.id)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
          {data.difficultes.includes('autre') && (
            <Input value={data.difficulteAutre} onChange={e => update({ difficulteAutre: e.target.value })} placeholder="Préciser l'autre difficulté..." />
          )}
        </div>

        {data.difficultes.length > 0 && (
          <div className="space-y-2">
            <Label>Quelle est actuellement la principale contrainte ?</Label>
            <select 
              className="w-full h-10 px-3 border rounded-md"
              value={data.difficultePrincipale}
              onChange={e => update({ difficultePrincipale: e.target.value })}
            >
              <option value="">Sélectionner la contrainte principale</option>
              {data.difficultes.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">7. Types de soutien supplémentaire souhaité</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { id: 'tech', label: 'Assistance technique' },
            { id: 'fin', label: 'Soutien financier' },
            { id: 'juridique', label: 'Conseil juridique' },
            { id: 'admin', label: 'Accompagnement administratif' },
            { id: 'reseautage', label: 'Réseautage et partenariats' },
            { id: 'formation', label: 'Formation (RH)' },
            { id: 'logistique', label: 'Assistance logistique' },
            { id: 'foncier', label: 'Appui pour accès au foncier' },
            { id: 'ppi', label: 'Appui obtention PPI' }
          ].map(opt => (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={data.typesSoutien.includes(opt.id)}
                onChange={() => toggleSoutien(opt.id)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}
