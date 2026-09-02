import React from 'react';
import { FormState } from '../../types';
import { Input, Label } from '../ui/Input';

export default function Step1Contact({ 
  data, update 
}: { 
  data: FormState, update: (u: Partial<FormState>) => void 
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Partie I — Prise de contact</h2>
        <p className="text-gray-500 text-sm">Informations d'enregistrement et suivi de la mobilisation du promoteur.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="attestation">Numéro d'enregistrement</Label>
          <Input 
            id="attestation" 
            value={data.attestationNumero} 
            onChange={e => update({ attestationNumero: e.target.value })} 
            placeholder="Ex: 2026/09/0001"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Adresse e-mail du responsable</Label>
          <Input 
            id="email" 
            type="email"
            value={data.responsableEmail} 
            onChange={e => update({ responsableEmail: e.target.value })} 
            placeholder="contact@entreprise.dz"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tel">Numéro de téléphone</Label>
          <Input 
            id="tel" 
            type="tel"
            value={data.responsableTelephone} 
            onChange={e => update({ responsableTelephone: e.target.value })} 
            placeholder="05..."
            required
          />
        </div>
      </div>

      <div className="space-y-4 border-t pt-6">
        <h3 className="font-medium text-gray-900">3.1 Prise du contact</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="contact" required checked={data.contactEtabli === 'telephone'} onChange={() => update({ contactEtabli: 'telephone' })} className="text-blue-600 focus:ring-blue-500" />
            <span className="text-sm">Oui, contact établi par téléphone</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="contact" required checked={data.contactEtabli === 'gud'} onChange={() => update({ contactEtabli: 'gud' })} className="text-blue-600 focus:ring-blue-500" />
            <span className="text-sm">Oui, promoteur déjà présent au GUD</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="contact" required checked={data.contactEtabli === 'non'} onChange={() => update({ contactEtabli: 'non' })} className="text-blue-600 focus:ring-blue-500" />
            <span className="text-sm">Non (Aucun contact)</span>
          </label>
        </div>
      </div>

      {data.contactEtabli === 'telephone' && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-medium text-gray-900">3.2 Information du promoteur</h3>
          <div className="space-y-2">
            {[
              { id: 'informe', label: 'Promoteur informé et invité à se présenter au GUD' },
              { id: 'demande_delai', label: 'Promoteur demande un délai / rendez-vous' },
              { id: 'refuse', label: 'Promoteur refuse de se présenter' },
              { id: 'autre', label: 'Autre' }
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" name="info_promo" required
                  checked={data.informationPromoteur === opt.id} 
                  onChange={() => update({ informationPromoteur: opt.id })}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
          {data.informationPromoteur === 'autre' && (
            <Input 
              value={data.informationPromoteurAutre}
              onChange={e => update({ informationPromoteurAutre: e.target.value })}
              placeholder="Précisez..."
              className="mt-2"
              required
            />
          )}
        </div>
      )}

      {data.contactEtabli === 'non' && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-medium text-gray-900">3.3 Raison de non contact</h3>
          <div className="space-y-2">
            {[
              { id: 'injoignable', label: 'Numéro injoignable' },
              { id: 'incorrect', label: 'Numéro incorrect' },
              { id: 'inactif', label: 'Numéro inactif, bloqué ou non attribué' },
              { id: 'absence', label: 'Absence de réponse' },
              { id: 'repondeur', label: 'Répondeur / Boîte vocale' },
              { id: 'autre', label: 'Autre' }
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" name="raison_non" required
                  checked={data.raisonNonContact === opt.id} 
                  onChange={() => update({ raisonNonContact: opt.id })}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
          {data.raisonNonContact === 'autre' && (
            <Input 
              value={data.raisonNonContactAutre}
              onChange={e => update({ raisonNonContactAutre: e.target.value })}
              placeholder="Précisez la raison..."
              className="mt-2"
              required
            />
          )}
        </div>
      )}

    </div>
  );
}
