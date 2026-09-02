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
            
            <div className="space-y-3">
              <Label>5.3.5. Mode d'accès au foncier</Label>
              <div className="space-y-2">
                {[
                  { id: 'concession_aapi', label: "Concession du domaine privé de l'État (Plateforme AAPI)" },
                  { id: 'acquisition_particulier', label: "Acquisition auprès d'un particulier" },
                  { id: 'acquisition_entreprise', label: "Acquisition auprès d'une entreprise" },
                  { id: 'location', label: "Location" },
                  { id: 'deja_detenu', label: "Terrain déjà détenu par le promoteur" },
                  { id: 'autre', label: "Autre" }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" name="mode_foncier" 
                      checked={data.modeAccesFoncier === opt.id} 
                      onChange={() => update({ modeAccesFoncier: opt.id })}
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
              {data.modeAccesFoncier === 'autre' && (
                <div className="ml-6">
                  <Input value={data.modeAccesFoncierAutre} onChange={e => update({ modeAccesFoncierAutre: e.target.value })} placeholder="Précisez..." className="mt-1" />
                </div>
              )}
            </div>

            <div className="space-y-3 border-t pt-4">
              <Label>5.3.6. État d'avancement des démarches foncières</Label>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { id: 'aucune', label: "Aucune démarche engagée" },
                  { id: 'identifie', label: "Terrain identifié" },
                  { id: 'deposee', label: "Demande déposée" },
                  { id: 'instruction', label: "Dossier en cours d'instruction" },
                  { id: 'favorable', label: "Avis favorable obtenu" },
                  { id: 'attribution', label: "Décision d'attribution obtenue" },
                  { id: 'acte_signe', label: "Acte de concession signé" },
                  { id: 'mis_disposition', label: "Terrain mis à disposition" },
                  { id: 'acquis', label: "Terrain acquis" },
                  { id: 'suspendu', label: "Dossier suspendu" },
                  { id: 'rejete', label: "Dossier rejeté" }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" name="etat_foncier" required 
                      checked={data.etatDemarchesFoncieres === opt.id} 
                      onChange={() => update({ etatDemarchesFoncieres: opt.id })}
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">5.4. Permis de construire :</h3>
        <div className="space-y-4">
          <Label>5.4.1. Le projet nécessite-t-il un permis de construire ?</Label>
          <div className="flex gap-4 flex-col sm:flex-row">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="permis" required checked={data.necessitePermis === 'oui'} onChange={() => update({ necessitePermis: 'oui' })} />
              <span className="text-sm">Oui (Aller à la question 5.4.2)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="permis" required checked={data.necessitePermis === 'non'} onChange={() => update({ necessitePermis: 'non', etatPermis: '', dateDepotPermis: '', dateObtentionPermis: '' })} />
              <span className="text-sm">Non (Aller à la question 5.5)</span>
            </label>
          </div>
        </div>

        {data.necessitePermis === 'oui' && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
            <Label>5.4.2. État d'avancement des démarches pour l'obtention du permis de construire</Label>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'aucune'} onChange={() => update({ etatPermis: 'aucune' })} />
                <span className="text-sm">Aucune démarche engagée</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'deposee'} onChange={() => update({ etatPermis: 'deposee' })} />
                <span className="text-sm">Demande déposée → Date du dépôt :</span>
              </label>
              {data.etatPermis === 'deposee' && (
                <div className="ml-6">
                  <Input type="date" value={data.dateDepotPermis} onChange={e => update({ dateDepotPermis: e.target.value })} className="w-auto h-8" />
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'instruction'} onChange={() => update({ etatPermis: 'instruction' })} />
                <span className="text-sm">Dossier en cours d'instruction</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'obtenu'} onChange={() => update({ etatPermis: 'obtenu' })} />
                <span className="text-sm">Permis obtenu → Date d'obtention :</span>
              </label>
              {data.etatPermis === 'obtenu' && (
                <div className="ml-6">
                  <Input type="date" value={data.dateObtentionPermis} onChange={e => update({ dateObtentionPermis: e.target.value })} className="w-auto h-8" />
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'reserves'} onChange={() => update({ etatPermis: 'reserves' })} />
                <span className="text-sm">Réserves formulées</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'rejete'} onChange={() => update({ etatPermis: 'rejete' })} />
                <span className="text-sm">Dossier rejeté</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">5.5 Programme prévisionnel d’importation (PPI)</h3>
        
        <div className="space-y-4">
          <Label>5.5.1. Le projet nécessite-t-il l’accomplissement de formalités relatives au PPI ?</Label>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="ppi" required checked={data.necessitePPI === 'oui'} onChange={() => update({ necessitePPI: 'oui' })} />
              <span className="text-sm">Oui (continuer)</span>
            </label>
            {data.necessitePPI === 'oui' && (
              <div className="ml-6 flex items-center gap-2">
                <span className="text-sm">Date de dépôt :</span>
                <Input type="date" value={data.dateDepotPPI} onChange={e => update({ dateDepotPPI: e.target.value })} className="w-auto h-8" />
              </div>
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="ppi" required checked={data.necessitePPI === 'non'} onChange={() => update({ necessitePPI: 'non', etatPPI: '', dateDepotPPI: '' })} />
              <span className="text-sm">Non (Aller à la question 6)</span>
            </label>
          </div>
        </div>

        {data.necessitePPI === 'oui' && (
          <>
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
              <Label>5.5.2. État d’avancement de la demande relative au PPI</Label>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { id: 'aucune', label: 'Aucune démarche engagée' },
                  { id: 'preparation', label: 'Dossier en préparation' },
                  { id: 'deposee', label: 'Demande déposée' },
                  { id: 'examen', label: 'Demande en cours d\'examen' },
                  { id: 'accord_total', label: 'Accord total sans modification' },
                  { id: 'accord_partiel', label: 'Accord partiel' },
                  { id: 'accord_reserve', label: 'Accord sous réserve de modifications' },
                  { id: 'rejetee', label: 'Demande rejetée' },
                  { id: 'attente_info', label: 'Demande en attente de complément d\'information' },
                  { id: 'autre', label: 'Autre' }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" name="etat_ppi" required 
                      checked={data.etatPPI === opt.id} 
                      onChange={() => update({ etatPPI: opt.id })}
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
              {data.etatPPI === 'autre' && (
                <div className="mt-2">
                  <Input 
                    value={(data as any).etatPPIAutre || ''} 
                    onChange={e => update({ etatPPIAutre: e.target.value } as any)} 
                    placeholder="Précisez..." 
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg border">
              <Label>5.5.3. Date de dépôt de la demande :</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">Date :</span>
                <Input type="date" value={data.dateDepotPPI} onChange={e => update({ dateDepotPPI: e.target.value })} className="w-auto h-8" />
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
