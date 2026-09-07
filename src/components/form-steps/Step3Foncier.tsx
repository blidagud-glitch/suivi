import { useLanguage } from '../../lib/LanguageContext';
import React from 'react';
import { FormState } from '../../types';
import { Input, Label } from '../ui/Input';

export default function Step3Foncier({
  
 data, update 
}: { 
 data: FormState, update: (u: Partial<FormState>) => void 
}) {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">{t('5.3 Foncier')}</h3>
        
        <div className="space-y-4">
          <Label>{t('Le projet nécessite-t-il une assiette foncière ?')}</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="foncier" required checked={data.necessiteFoncier === 'oui'} onChange={() => update({ necessiteFoncier: 'oui' })} />
              <span>{t('Oui')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="foncier" required checked={data.necessiteFoncier === 'non'} onChange={() => update({ necessiteFoncier: 'non' })} />
              <span>{t('Non')}</span>
            </label>
          </div>
        </div>

        {data.necessiteFoncier === 'oui' && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('Type de foncier')}</Label>
                <select 
                  className="w-full h-10 px-3 border rounded-md"
                  value={data.typeFoncier}
                  onChange={e => update({ typeFoncier: e.target.value })}
                >
                  <option value="">{t('Sélectionner')}</option>
                  <option value="industriel">{t('Industriel')}</option>
                  <option value="urbain">{t('Urbain')}</option>
                  <option value="touristique">{t('Touristique')}</option>
                  <option value="agricole">{t('Agricole')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>{t('Superficie prévue (m²)')}</Label>
                <Input type="number" value={data.superficieFoncier} onChange={e => update({ superficieFoncier: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('Localisation (Commune / Wilaya)')}</Label>
              <Input value={data.localisationFoncier} onChange={e => update({ localisationFoncier: e.target.value })} />
            </div>
            
            <div className="space-y-3">
              <Label>{t('5.3.5. Mode d\'accès au foncier')}</Label>
              <div className="space-y-2">
                {[
                  { id: 'concession_aapi', label: t("Concession du domaine privé de l'État (Plateforme AAPI)") },
                  { id: 'acquisition_particulier', label: t("Acquisition auprès d'un particulier") },
                  { id: 'acquisition_entreprise', label: t("Acquisition auprès d'une entreprise") },
                  { id: 'location', label: t("Location") },
                  { id: 'deja_detenu', label: t("Terrain déjà détenu par le promoteur") },
                  { id: 'autre', label: t("Autre") }
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
              <Label>{t('5.3.6. État d\'avancement des démarches foncières')}</Label>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { id: 'aucune', label: t("Aucune démarche engagée") },
                  { id: 'identifie', label: t("Terrain identifié") },
                  { id: 'deposee', label: t("Demande déposée") },
                  { id: 'instruction', label: t("Dossier en cours d'instruction") },
                  { id: 'favorable', label: t("Avis favorable obtenu") },
                  { id: 'attribution', label: t("Décision d'attribution obtenue") },
                  { id: 'acte_signe', label: t("Acte de concession signé") },
                  { id: 'mis_disposition', label: t("Terrain mis à disposition") },
                  { id: 'acquis', label: t("Terrain acquis") },
                  { id: 'suspendu', label: t("Dossier suspendu") },
                  { id: 'rejete', label: t("Dossier rejeté") }
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
        <h3 className="font-semibold text-gray-900 border-b pb-2">{t('5.4. Permis de construire :')}</h3>
        <div className="space-y-4">
          <Label>{t('5.4.1. Le projet nécessite-t-il un permis de construire ?')}</Label>
          <div className="flex gap-4 flex-col sm:flex-row">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="permis" required checked={data.necessitePermis === 'oui'} onChange={() => update({ necessitePermis: 'oui' })} />
              <span className="text-sm">{t('Oui (Aller à la question 5.4.2)')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="permis" required checked={data.necessitePermis === 'non'} onChange={() => update({ necessitePermis: 'non', etatPermis: '', dateDepotPermis: '', dateObtentionPermis: '' })} />
              <span className="text-sm">{t('Non (Aller à la question 5.5)')}</span>
            </label>
          </div>
        </div>

        {data.necessitePermis === 'oui' && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
            <Label>{t('5.4.2. État d\'avancement des démarches pour l\'obtention du permis de construire')}</Label>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'aucune'} onChange={() => update({ etatPermis: 'aucune' })} />
                <span className="text-sm">{t('Aucune démarche engagée')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'deposee'} onChange={() => update({ etatPermis: 'deposee' })} />
                <span className="text-sm">{t('Demande déposée → Date du dépôt :')}</span>
              </label>
              {data.etatPermis === 'deposee' && (
                <div className="ml-6">
                  <Input type="date" value={data.dateDepotPermis} onChange={e => update({ dateDepotPermis: e.target.value })} className="w-auto h-8" />
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'instruction'} onChange={() => update({ etatPermis: 'instruction' })} />
                <span className="text-sm">{t("Dossier en cours d'instruction")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'obtenu'} onChange={() => update({ etatPermis: 'obtenu' })} />
                <span className="text-sm">{t("Permis obtenu → Date d'obtention :")}</span>
              </label>
              {data.etatPermis === 'obtenu' && (
                <div className="ml-6">
                  <Input type="date" value={data.dateObtentionPermis} onChange={e => update({ dateObtentionPermis: e.target.value })} className="w-auto h-8" />
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'reserves'} onChange={() => update({ etatPermis: 'reserves' })} />
                <span className="text-sm">{t('Réserves formulées')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="etat_permis" required checked={data.etatPermis === 'rejete'} onChange={() => update({ etatPermis: 'rejete' })} />
                <span className="text-sm">{t('Dossier rejeté')}</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">{t('5.5 Programme prévisionnel d’importation (PPI)')}</h3>
        
        <div className="space-y-4">
          <Label>{t('5.5.1. Le projet nécessite-t-il l’accomplissement de formalités relatives au PPI ?')}</Label>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="ppi" required checked={data.necessitePPI === 'oui'} onChange={() => update({ necessitePPI: 'oui' })} />
              <span className="text-sm">{t('Oui (continuer)')}</span>
            </label>
            {data.necessitePPI === 'oui' && (
              <div className="ml-6 flex items-center gap-2">
                <span className="text-sm">{t('Date de dépôt :')}</span>
                <Input type="date" value={data.dateDepotPPI} onChange={e => update({ dateDepotPPI: e.target.value })} className="w-auto h-8" />
              </div>
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="ppi" required checked={data.necessitePPI === 'non'} onChange={() => update({ necessitePPI: 'non', etatPPI: '', dateDepotPPI: '' })} />
              <span className="text-sm">{t('Non (Aller à la question 6)')}</span>
            </label>
          </div>
        </div>

        {data.necessitePPI === 'oui' && (
          <>
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
              <Label>{t('5.5.2. État d’avancement de la demande relative au PPI')}</Label>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { id: 'aucune', label: t('Aucune démarche engagée') },
                  { id: 'preparation', label: t('Dossier en préparation') },
                  { id: 'deposee', label: t('Demande déposée') },
                  { id: 'examen', label: t("Demande en cours d'examen") },
                  { id: 'accord_total', label: t('Accord total sans modification') },
                  { id: 'accord_partiel', label: t('Accord partiel') },
                  { id: 'accord_reserve', label: t('Accord sous réserve de modifications') },
                  { id: 'rejetee', label: t('Demande rejetée') },
                  { id: 'attente_info', label: t("Demande en attente de complément d'information") },
              { id: 'autre', label: t('Autre') }
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
              <Label>{t('5.5.3. Date de dépôt de la demande :')}</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">{t('Date :')}</span>
                <Input type="date" value={data.dateDepotPPI} onChange={e => update({ dateDepotPPI: e.target.value })} className="w-auto h-8" />
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
