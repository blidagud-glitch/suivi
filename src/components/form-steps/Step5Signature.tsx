import { useLanguage } from '../../lib/LanguageContext';
import React, { useRef, useEffect } from 'react';
import { FormState } from '../../types';
import { Input, Label } from '../ui/Input';
import { Button } from '../ui/Button';
import SignatureCanvas from 'react-signature-canvas';

export default function Step5Signature({
  
 data, update 
}: { 
 data: FormState, update: (u: Partial<FormState>) => void 
}) {
  const { t } = useLanguage();

  const sigCanvas = useRef<SignatureCanvas>(null);

  useEffect(() => {
    // Si une signature est déjà enregistrée (ex: mode édition), on l'affiche
    if (sigCanvas.current && data.signatureDataUrl) {
      sigCanvas.current.fromDataURL(data.signatureDataUrl);
    }
  }, []);

  const clearSignature = () => {
    sigCanvas.current?.clear();
    update({ signatureDataUrl: '' });
  };

  const saveSignature = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      update({ signatureDataUrl: sigCanvas.current.getCanvas().toDataURL('image/png') });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">{t('8. Suivi du traitement des projets')}</h3>
        
        <div className="space-y-4">
          <Label>{t('8.1. Action engagée pour lever l\'obstacle')}</Label>
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg border">
            {[
              { id: 'aucune', label: t("Aucune action : aucune action n'a encore été engagée.") },
              { id: 'info_promo', label: t("Information du promoteur : le promoteur a été informé de l'action ou des documents nécessaires.") },
              { id: 'saisine', label: t("Saisine de la partie compétente : l'obstacle a été transmis à la partie compétente pour prise en charge.") },
                { id: 'coordination', label: t("Coordination avec la partie concernée : un contact ou une coordination a été établi avec la partie intervenante.") },
              { id: 'reunion', label: t("Réunion / séance de travail : une réunion ou une séance de travail a été tenue pour examiner l'obstacle.") },
                { id: 'correspondance', label: t("Correspondance officielle : une correspondance officielle a été adressée à la partie concernée.") },
              { id: 'obstacle_leve', label: t("Obstacle levé : l'obstacle a été traité et levé.") },
                { id: 'en_cours', label: t("Action en cours de suivi : une action a été engagée et son traitement est toujours en cours.") },
              { id: 'autre', label: t('Autre') }
            ].map(opt => (
              <label key={opt.id} className="flex items-start gap-2 cursor-pointer">
                <input 
                  type="radio" name="action_eng" required 
                  checked={data.actionEngagee === opt.id} 
                  onChange={() => update({ actionEngagee: opt.id })}
                  className="mt-1"
                />
                <span className="text-sm leading-tight">{opt.label}</span>
              </label>
            ))}
            {data.actionEngagee === 'autre' && (
              <div className="ml-6 mt-2">
                <Input value={data.actionEngageeAutre} onChange={e => update({ actionEngageeAutre: e.target.value })} placeholder="Préciser..." className="h-8" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Label>{t('8.2. Partie intervenante')}</Label>
          <div className="grid sm:grid-cols-2 gap-2 bg-gray-50 p-4 rounded-lg border">
            {[
              { id: 'promoteur', label: t('Promoteur / investisseur') },
              { id: 'aapi', label: t("Agence Algérienne de Promotion de l'Investissement (AAPI) / Guichet unique") },
              { id: 'locale', label: t('Administration locale : wilaya, commune ou services locaux') },
              { id: 'centrale', label: t('Administration centrale : ministère ou organisme central') },
              { id: 'public', label: t('Établissement public / opérateur') },
              { id: 'banque', label: t('Banque / établissement financier') },
              { id: 'plusieurs', label: t('Plusieurs parties') },
              { id: 'autre', label: t('Autre') }
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" name="partie_int" required 
                  checked={data.partieIntervenante === opt.id} 
                  onChange={() => update({ partieIntervenante: opt.id })}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
            {(['locale', 'centrale', 'public', 'autre'].includes(data.partieIntervenante)) && (
              <div className="col-span-1 sm:col-span-2 mt-2">
                <Input value={data.partieIntervenanteAutre} onChange={e => update({ partieIntervenanteAutre: e.target.value })} placeholder="Préciser la partie intervenante..." className="h-8" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Label>{t('8.3. État du traitement')}</Label>
          <div className="grid sm:grid-cols-2 gap-2 bg-gray-50 p-4 rounded-lg border">
            {[
              { id: 'non_engagee', label: t('Non engagée') },
                { id: 'en_cours', label: t("Action en cours de suivi : une action a été engagée et son traitement est toujours en cours.") },
              { id: 'achevee', label: t('Achevée') },
              { id: 'attente', label: t("En attente d'intervention d\'une autre partie") },
              { id: 'sans_suite', label: t('Sans suite') }
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" name="etat_trait" required 
                  checked={data.etatTraitement === opt.id} 
                  onChange={() => update({ etatTraitement: opt.id })}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2 bg-gray-50 p-4 rounded-lg border">
          <Label>{t('8.4. Échéance de traitement')}</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm">{t("Date prévue de réalisation ou d'achèvement de l'action :")}</span>
            <Input type="date" value={data.echeanceTraitement} onChange={e => update({ echeanceTraitement: e.target.value })} className="w-auto h-8" />
          </div>
          <p className="text-xs text-slate-500 italic mt-1">{t('Si aucune échéance n\'est fixée, ne pas renseigner cette rubrique.')}</p>
        </div>

        <div className="space-y-4">
          <Label>{t('8.5. Résultat du traitement (À la date de l\'exercice)')}</Label>
          <div className="grid sm:grid-cols-2 gap-2 bg-gray-50 p-4 rounded-lg border">
            {[
              { id: 'leve', label: t('Obstacle levé') },
              { id: 'partiellement', label: t('Obstacle partiellement levé') },
              { id: 'non_leve', label: t('Obstacle non levé') },
              { id: 'reactive', label: t('Projet réactivé / relancé') },
              { id: 'tjrs_arret', label: t("Projet toujours non entamé / à l'arrêt") },
              { id: 'nouvelle_inter', label: t('Nouvelle intervention nécessaire') },
              { id: 'autre', label: t('Autre') }
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" name="res_traitement" required 
                  checked={data.resultatTraitement === opt.id} 
                  onChange={() => update({ resultatTraitement: opt.id })}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
            {data.resultatTraitement === 'autre' && (
              <div className="col-span-1 sm:col-span-2 mt-2">
                <Input value={data.resultatTraitementAutre} onChange={e => update({ resultatTraitementAutre: e.target.value })} placeholder="Préciser le résultat..." className="h-8" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 bg-gray-50 p-4 rounded-lg border">
          <Label>{t('8.6. Date de mise à jour du suivi')}</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm">{t('Date du dernier suivi ou de la dernière action réalisée :')}</span>
            <Input type="date" value={data.dateMiseAJour} onChange={e => update({ dateMiseAJour: e.target.value })} className="w-auto h-8" />
          </div>
          <div className="mt-4 space-y-2">
            <Label>{t('Observations :')}</Label>
            <Input value={data.observations} onChange={e => update({ observations: e.target.value })} placeholder="Saisir vos observations..." />
          </div>
        </div>

        <div className="space-y-4">
          <Label>{t('8.7. Possibilité de réactivation du projet')}</Label>
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg border">
            {[
              { id: 'oui', label: t("Oui : le projet peut être réactivé après levée de l'obstacle et satisfaction des conditions nécessaires.") },
              { id: 'oui_cond', label: t('Oui, sous conditions : le projet peut être réactivé sous réserve de traiter certains obstacles ou de satisfaire des conditions déterminées.') },
              { id: 'a_confirmer', label: t('À confirmer : une possibilité de réactivation existe a priori, mais une étude ou une évaluation complémentaire est nécessaire.') },
              { id: 'non', label: t('Non : aucune possibilité réaliste de réactivation du projet dans sa situation actuelle.') },
              { id: 'en_eval', label: t("En cours d'évaluation : la possibilité de réactivation du projet n\'est pas encore déterminée.") },
              { id: 'non_concerne', label: t("Non concerné : le projet ne nécessite pas d'évaluation de sa possibilité de réactivation.") }
            ].map(opt => (
              <label key={opt.id} className="flex items-start gap-2 cursor-pointer">
                <input 
                  type="radio" name="reactivation" required 
                  checked={data.possibiliteReactivation === opt.id} 
                  onChange={() => update({ possibiliteReactivation: opt.id })}
                  className="mt-1"
                />
                <span className="text-sm leading-tight">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t">
        <h3 className="font-semibold text-gray-900">{t('Signature Numérique du Promoteur')}</h3>
        <p className="text-sm text-gray-500">{t('Veuillez signer dans le cadre ci-dessous avant de valider le formulaire.')}</p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 relative flex justify-center">
          <SignatureCanvas 
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ width: 400, height: 200, className: 'cursor-crosshair bg-white max-w-full' }}
            onEnd={saveSignature}
          />
          <Button 
            type="button"
            variant="ghost" 
            onClick={clearSignature}
            className="absolute top-2 right-2 px-2 py-1 h-auto text-xs bg-white/80 hover:bg-white"
          >
            Effacer
          </Button>
        </div>
      </div>
    </div>
  );
}
