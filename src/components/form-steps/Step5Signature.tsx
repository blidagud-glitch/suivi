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
        <h3 className="font-semibold text-gray-900 border-b pb-2">8. Suivi du traitement des projets</h3>
        
        <div className="space-y-4">
          <Label>8.1 Action engagée pour lever l'obstacle</Label>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { id: 'aucune', label: 'Aucune action engagée' },
              { id: 'info_promo', label: 'Information du promoteur' },
              { id: 'saisine', label: 'Saisine de la partie compétente' },
              { id: 'coordination', label: 'Coordination avec la partie concernée' },
              { id: 'reunion', label: 'Réunion / séance de travail' },
              { id: 'correspondance', label: 'Correspondance officielle' },
              { id: 'obstacle_leve', label: 'Obstacle levé' },
              { id: 'en_cours', label: 'Action en cours de suivi' },
              { id: 'autre', label: 'Autre' }
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" name="action_eng" required
                  checked={data.actionEngagee === opt.id} 
                  onChange={() => update({ actionEngagee: opt.id })}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
          {data.actionEngagee === 'autre' && (
            <Input value={data.actionEngageeAutre} onChange={e => update({ actionEngageeAutre: e.target.value })} placeholder="Préciser..." />
          )}
        </div>

        <div className="space-y-4">
          <Label>8.5 Résultat du traitement</Label>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { id: 'leve', label: 'Obstacle levé' },
              { id: 'partiellement', label: 'Obstacle partiellement levé' },
              { id: 'non_leve', label: 'Obstacle non levé' },
              { id: 'reactive', label: 'Projet réactivé / relancé' },
              { id: 'tjrs_arret', label: 'Projet toujours non entamé / à l\'arrêt' },
              { id: 'nouvelle_inter', label: 'Nouvelle intervention nécessaire' },
              { id: 'autre', label: 'Autre' }
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
          </div>
        </div>

      </div>

      <div className="space-y-6 pt-6 border-t">
        <h3 className="font-semibold text-gray-900">Signature Numérique du Promoteur</h3>
        <p className="text-sm text-gray-500">Veuillez signer dans le cadre ci-dessous avant de valider le formulaire.</p>
        
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
