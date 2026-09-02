import React from 'react';
import { FormState } from '../../types';
import { Input, Label } from '../ui/Input';

export default function Step3Foncier({ 
  data, update 
}: { 
  data: FormState, update: (u: Partial<FormState>) => void 
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">5.3 Foncier</h3>
        
        <div className="space-y-4">
          <Label>Le projet nécessite-t-il une assiette foncière ?</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="foncier" required checked={data.necessiteFoncier === 'oui'} onChange={() => update({ necessiteFoncier: 'oui' })} />
              <span>Oui</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="foncier" required checked={data.necessiteFoncier === 'non'} onChange={() => update({ necessiteFoncier: 'non' })} />
              <span>Non</span>
            </label>
          </div>
        </div>

        {data.necessiteFoncier === 'oui' && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type de foncier</Label>
                <select 
                  className="w-full h-10 px-3 border rounded-md"
                  value={data.typeFoncier}
                  onChange={e => update({ typeFoncier: e.target.value })}
                >
                  <option value="">Sélectionner</option>
                  <option value="industriel">Industriel</option>
                  <option value="urbain">Urbain</option>
                  <option value="touristique">Touristique</option>
                  <option value="agricole">Agricole</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Superficie prévue (m²)</Label>
                <Input type="number" value={data.superficieFoncier} onChange={e => update({ superficieFoncier: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Localisation (Commune / Wilaya)</Label>
              <Input value={data.localisationFoncier} onChange={e => update({ localisationFoncier: e.target.value })} />
            </div>
            
            <div className="space-y-2">
              <Label>Mode d'accès au foncier</Label>
              <select 
                className="w-full h-10 px-3 border rounded-md"
                value={data.modeAccesFoncier}
                onChange={e => update({ modeAccesFoncier: e.target.value })}
              >
                <option value="">Sélectionner</option>
                <option value="concession">Concession de l'État</option>
                <option value="acquisition_particulier">Acquisition (particulier)</option>
                <option value="acquisition_entreprise">Acquisition (entreprise)</option>
                <option value="location">Location</option>
                <option value="deja_detenu">Déjà détenu</option>
                <option value="autre">Autre</option>
              </select>
              {data.modeAccesFoncier === 'autre' && (
                <Input value={data.modeAccesFoncierAutre} onChange={e => update({ modeAccesFoncierAutre: e.target.value })} placeholder="Précisez..." className="mt-2" />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">5.4 Permis de construire</h3>
        <div className="space-y-4">
          <Label>Le projet nécessite-t-il un permis de construire ?</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="permis" required checked={data.necessitePermis === 'oui'} onChange={() => update({ necessitePermis: 'oui' })} />
              <span>Oui</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="permis" required checked={data.necessitePermis === 'non'} onChange={() => update({ necessitePermis: 'non' })} />
              <span>Non</span>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">5.5 Programme prévisionnel d’importation (PPI)</h3>
        <div className="space-y-4">
          <Label>Nécessite-t-il l’accomplissement de formalités PPI ?</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="ppi" required checked={data.necessitePPI === 'oui'} onChange={() => update({ necessitePPI: 'oui' })} />
              <span>Oui</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="ppi" required checked={data.necessitePPI === 'non'} onChange={() => update({ necessitePPI: 'non' })} />
              <span>Non</span>
            </label>
          </div>
        </div>
      </div>

    </div>
  );
}
