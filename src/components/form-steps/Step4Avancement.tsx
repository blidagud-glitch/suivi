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

  const toggleDemarche = (id: string) => {
    if (data.demarchesRealisees.includes(id)) {
      update({ demarchesRealisees: data.demarchesRealisees.filter(d => d !== id) });
    } else {
      update({ demarchesRealisees: [...data.demarchesRealisees, id] });
    }
  };

  const renderInvestissementEmplois = (prefix: string) => (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
      <div className="space-y-2">
        <Label>Montant d'investissement réalisé (en DA) :</Label>
        <Input type="number" value={data.montantInvestissement} onChange={e => update({ montantInvestissement: e.target.value })} />
      </div>
      <div className="space-y-3">
        <Label>Nombre d'emplois créés :</Label>
        <div className="grid sm:grid-cols-3 gap-3 ml-4">
          <div>
            <Label className="text-xs">i. Exécution :</Label>
            <Input type="number" value={data.emploisCreesExecution} onChange={e => update({ emploisCreesExecution: e.target.value })} className="h-8" />
          </div>
          <div>
            <Label className="text-xs">ii. Maitrise :</Label>
            <Input type="number" value={data.emploisCreesMaitrise} onChange={e => update({ emploisCreesMaitrise: e.target.value })} className="h-8" />
          </div>
          <div>
            <Label className="text-xs">iii. Cadre :</Label>
            <Input type="number" value={data.emploisCreesCadre} onChange={e => update({ emploisCreesCadre: e.target.value })} className="h-8" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Taux global d'avancement physique estimé (%) :</Label>
        <Input type="number" max="100" value={data.tauxAvancementPhysique} onChange={e => update({ tauxAvancementPhysique: e.target.value })} />
      </div>
      {prefix === '6.8' && (
        <div className="space-y-2 pt-2">
          <Label>Taux d'utilisation des capacité de production (%) :</Label>
          <Input type="number" max="100" value={data.tauxUtilisationCapacite} onChange={e => update({ tauxUtilisationCapacite: e.target.value })} />
        </div>
      )}
    </div>
  );

  const renderDifficultes = (title: string) => (
    <div className="space-y-4">
      <Label>{title}</Label>
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg border">
        {[
          { id: 'admin', label: 'Procédures administratives et réglementaires' },
          { id: 'permis', label: 'Permis de construire et actes d\'urbanisme' },
          { id: 'foncier', label: 'Foncier' },
          { id: 'finance', label: 'Financement' },
          { id: 'ppi', label: 'Importations et approvisionnement extérieur (PPI)' },
          { id: 'logistique', label: 'Approvisionnement et logistique' },
          { id: 'tech', label: 'Contraintes techniques ou technologiques' },
          { id: 'partenaires', label: 'Partenaires, prestataires ou sous-traitants' },
          { id: 'reseaux', label: 'Raccordement aux réseaux et infrastructures' },
          { id: 'rh', label: 'Main-d\'œuvre et ressources humaines' },
          { id: 'marche', label: 'Marché et conditions économiques' },
          { id: 'autre', label: 'Autre difficulté' }
        ].map(opt => (
          <label key={opt.id} className="flex items-start gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={data.difficultes.includes(opt.id)}
              onChange={() => toggleDifficulte(opt.id)}
              className="mt-1 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm leading-tight">{opt.label}</span>
          </label>
        ))}
        {data.difficultes.includes('autre') && (
          <div className="ml-6">
            <Input value={data.difficulteAutre} onChange={e => update({ difficulteAutre: e.target.value })} placeholder="Préciser..." className="mt-1 h-8" />
          </div>
        )}
      </div>
      
      {data.difficultes.length > 0 && (
        <div className="space-y-2 bg-gray-50 p-4 rounded-lg border">
          <Label>Parmi les difficultés mentionnées, quelle est actuellement la principale contrainte du projet ?</Label>
          <select 
            className="w-full h-10 px-3 border rounded-md text-sm"
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
  );

  const isGroup1 = ['abandonne', 'annule', 'en_arret'].includes(data.etatProjet);
  const isGroup2 = ['non_entame'].includes(data.etatProjet);
  const isGroup3 = ['en_cours'].includes(data.etatProjet);
  const isGroup4 = ['acheve'].includes(data.etatProjet);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">6. Etat d'avancement du projet</h3>
        
        <div className="space-y-4">
          <Label>6.1. Etat actuel du projet</Label>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { id: 'abandonne', label: 'Abandonné', subtitle: 'Aller à la question 6.2' },
              { id: 'annule', label: 'Annulé', subtitle: 'Aller à la question 6.2' },
              { id: 'en_arret', label: 'En arrêt', subtitle: 'Aller à la question 6.2' },
              { id: 'non_entame', label: 'Non encore entamé', subtitle: 'Aller à la question 6.3' },
              { id: 'en_cours', label: 'En cours de réalisation', subtitle: 'Aller à la question 6.6' },
              { id: 'acheve', label: 'Achevé', subtitle: 'Aller à la question 6.7' },
            ].map(opt => (
              <label key={opt.id} className="flex flex-col cursor-pointer p-3 border rounded-md hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" name="etat_projet" required
                    checked={data.etatProjet === opt.id} 
                    onChange={() => update({ etatProjet: opt.id })}
                  />
                  <span className="text-sm font-medium">{opt.label}</span>
                </div>
                <span className="text-xs text-slate-500 ml-6">{opt.subtitle}</span>
              </label>
            ))}
          </div>
        </div>

        {isGroup1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>6.2. Si Abandonné, Annulé, en Arrêt</Label>
              {renderInvestissementEmplois('6.2')}
            </div>
            {renderDifficultes('6.3. Difficultés ou obstacles rencontrées')}
            
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
              <Label>6.4. Perspectives de relance/de mise en exécution du projet</Label>
              <div className="space-y-2">
                {[
                  { id: 'oui', label: 'Oui (Aller à la question 6.5)' },
                  { id: 'non', label: 'Non (Fin de questionnaire 7)' },
                  { id: 'nsp', label: 'Je ne sais pas (Aller à la question 7)' }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" name="perspectives" required 
                      checked={data.perspectivesRelance === opt.id} 
                      onChange={() => update({ perspectivesRelance: opt.id })}
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
              
              {data.perspectivesRelance === 'oui' && (
                <div className="pt-4 border-t mt-4 flex items-center gap-2">
                  <Label>6.5. Date prévisionnelle de relance ou d'entame du projet :</Label>
                  <Input type="date" value={data.dateRelance} onChange={e => update({ dateRelance: e.target.value })} className="w-auto h-8" />
                  <span className="text-xs text-slate-500">(Aller à la question 7)</span>
                </div>
              )}
            </div>
          </div>
        )}

        {isGroup2 && (
          <div className="space-y-6">
            {renderDifficultes('6.3. Difficultés ou obstacles rencontrées')}
            
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
              <Label>6.4. Perspectives de relance/de mise en exécution du projet</Label>
              <div className="space-y-2">
                {[
                  { id: 'oui', label: 'Oui (Aller à la question 6.5)' },
                  { id: 'non', label: 'Non (Fin de questionnaire 7)' },
                  { id: 'nsp', label: 'Je ne sais pas (Aller à la question 7)' }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" name="perspectives" required 
                      checked={data.perspectivesRelance === opt.id} 
                      onChange={() => update({ perspectivesRelance: opt.id })}
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
              
              {data.perspectivesRelance === 'oui' && (
                <div className="pt-4 border-t mt-4 flex items-center gap-2">
                  <Label>6.5. Date prévisionnelle de relance ou d'entame du projet :</Label>
                  <Input type="date" value={data.dateRelance} onChange={e => update({ dateRelance: e.target.value })} className="w-auto h-8" />
                  <span className="text-xs text-slate-500">(Aller à la question 7)</span>
                </div>
              )}
            </div>
          </div>
        )}

        {(isGroup3 || isGroup4) && (
          <div className="space-y-6">
            {isGroup3 && (
              <div className="space-y-4">
                <Label>6.6. En cours de réalisation : procédures et démarches réalisées</Label>
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg border">
                  {[
                    { id: 'admin', label: 'Formalités administratives réalisées (CNRC, services fiscaux, sécurité sociale, etc.)' },
                    { id: 'foncier', label: 'Foncier sécurisé (attribution, acquisition ou location du terrain)' },
                    { id: 'etudes', label: 'Études et business plan finalisés' },
                    { id: 'financement', label: 'Financement obtenu ou mobilisé' },
                    { id: 'autorisations', label: 'Autorisations, agréments et permis obtenus (permis de construire, autorisations sectorielles, etc.)' },
                    { id: 'importation', label: 'Formalités d\'importation accomplies (PPI, autorisations et procédures douanières)' },
                    { id: 'travaux', label: 'Travaux de réalisation engagés (génie civil, infrastructures et réseaux)' },
                    { id: 'equipements', label: 'Équipements acquis, réceptionnés ou installés' },
                    { id: 'recrutement', label: 'Recrutement et formation du personnel réalisés' },
                    { id: 'exploitation_partielle', label: 'Mise en exploitation partielle ou phase de tests engagée' }
                  ].map(opt => (
                    <label key={opt.id} className="flex items-start gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={data.demarchesRealisees.includes(opt.id)}
                        onChange={() => toggleDemarche(opt.id)}
                        className="mt-1 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm leading-tight">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
              <Label>6.7. Mise en exploitation :</Label>
              <div className="space-y-2">
                {[
                  { id: 'non', label: 'Non encore mis en exploitation' },
                  { id: 'partielle', label: 'Mis partiellement en exploitation' },
                  { id: 'totalement', label: 'Mis totalement en exploitation' }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" name="mise_exploitation" required 
                      checked={data.miseEnExploitation === opt.id} 
                      onChange={() => update({ miseEnExploitation: opt.id })}
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>6.8. Réalisation :</Label>
              {renderInvestissementEmplois('6.8')}
            </div>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg border flex items-center gap-2">
              <Label>6.9. Date prévue de pleine exploitation :</Label>
              <Input type="date" value={data.datePleineExploitation} onChange={e => update({ datePleineExploitation: e.target.value })} className="w-auto h-8" />
            </div>

            {renderDifficultes('6.10. Difficultés ou obstacles rencontrées')}
          </div>
        )}

      </div>
      
      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900 border-b pb-2">7. Types de soutien supplémentaire</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { id: 'tech', label: 'Assistance technique : Support pour résoudre des problèmes...' },
            { id: 'fin', label: 'Soutien financier : Fonds supplémentaires, subventions...' },
            { id: 'juridique', label: 'Conseil juridique : Aide pour naviguer dans les aspects...' },
            { id: 'admin', label: 'Accompagnement administratif : Assistance pour les démarches...' },
            { id: 'reseautage', label: 'Réseautage et partenariats : Aide pour établir des connexions...' },
            { id: 'formation', label: 'Formation et développement des compétences : Organisation...' },
            { id: 'logistique', label: 'Assistance logistique : Aide pour la gestion des aspects...' },
            { id: 'feedback', label: 'Évaluation et feedback : Mécanismes de suivi pour identifier...' },
            { id: 'foncier', label: 'Appui pour l\'accès au foncier : Facilitation de l\'attribution...' },
            { id: 'ppi', label: 'Appui pour l\'obtention des autorisations d\'importation (PPI)' }
          ].map(opt => (
            <label key={opt.id} className="flex items-start gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={data.typesSoutien.includes(opt.id)}
                onChange={() => toggleSoutien(opt.id)}
                className="mt-1 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm leading-tight">{opt.label}</span>
            </label>
          ))}
          <label className="flex items-start gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={data.typesSoutien.includes('autre')}
              onChange={() => toggleSoutien('autre')}
              className="mt-1 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm leading-tight">Autre</span>
          </label>
        </div>
        {data.typesSoutien.includes('autre') && (
          <Input value={data.typesSoutienAutre} onChange={e => update({ typesSoutienAutre: e.target.value })} placeholder="Précisez..." />
        )}
      </div>

    </div>
  );
}
