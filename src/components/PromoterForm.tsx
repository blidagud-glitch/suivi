import React, { useState, useEffect } from 'react';
import { FormState, initialFormState } from '../types';
import { getSubmission, saveSubmission } from '../lib/store';
import { Button } from './ui/Button';

// Step components
import Step1Contact from './form-steps/Step1Contact';
import Step2Conditions from './form-steps/Step2Conditions';
import Step3Foncier from './form-steps/Step3Foncier';
import Step4Avancement from './form-steps/Step4Avancement';
import Step5Signature from './form-steps/Step5Signature';

export default function PromoterForm({ sessionId, onComplete }: { sessionId: string, onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormState>({ ...initialFormState, sessionId });
  const [isLoaded, setIsLoaded] = useState(false);
  const totalSteps = 5;

  useEffect(() => {
    getSubmission(sessionId).then(existing => {
      if (existing) {
        setFormData(existing);
      } else {
        // Handle new session opened on phone
        setFormData({ ...initialFormState, sessionId });
      }
      setIsLoaded(true);
    });
  }, [sessionId]);

  const updateForm = (updates: Partial<FormState>) => {
    const updated = { ...formData, ...updates };
    setFormData(updated);
    saveSubmission(updated);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    updateForm({ status: 'submitted' });
    alert("Formulaire validé et envoyé avec succès !");
    if (onComplete) {
      onComplete();
    } else {
      window.location.href = '/';
    }
  };

  if (!isLoaded) return <div className="p-8 text-center">Chargement...</div>;

  if (formData.status === 'submitted') {
    return (
      <div className="flex h-screen w-full items-center justify-center p-4">
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">✓</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Formulaire Soumis</h2>
          <p className="text-slate-500 font-medium">Merci, vos réponses ont été enregistrées.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden text-slate-900 font-sans">
      <header className="h-16 flex items-center justify-between px-8 bg-white/40 backdrop-blur-sm border-b border-white/20 shrink-0">
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 uppercase tracking-wider">Session #{sessionId.slice(0, 4)}</span>
          <h2 className="text-lg font-semibold text-slate-700 hidden sm:block">AAPI - Suivi des Projets</h2>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-4xl flex flex-col gap-6">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white/40 shadow-xl p-6 md:p-8 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <button 
                    key={i} 
                    type="button"
                    onClick={() => setCurrentStep(i + 1)}
                    className={`h-2 w-8 sm:w-12 rounded-full transition-colors cursor-pointer ${i + 1 <= currentStep ? 'bg-emerald-500' : 'bg-slate-200 hover:bg-emerald-200'}`}
                    title={`Aller à l'étape ${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wide ml-4">Étape {currentStep} / {totalSteps}</span>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (currentStep < totalSteps) {
                nextStep();
              } else {
                handleSubmit();
              }
            }} className="flex-1 flex flex-col">
              <div className="flex-1">
                {currentStep === 1 && <Step1Contact data={formData} update={updateForm} />}
                {currentStep === 2 && <Step2Conditions data={formData} update={updateForm} />}
                {currentStep === 3 && <Step3Foncier data={formData} update={updateForm} />}
                {currentStep === 4 && <Step4Avancement data={formData} update={updateForm} />}
                {currentStep === 5 && <Step5Signature data={formData} update={updateForm} />}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/50 flex justify-between">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={prevStep} 
                  disabled={currentStep === 1}
                >
                  Précédent
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button type="submit" variant="default">
                    Suivant
                  </Button>
                ) : (
                  <Button type="submit" variant="emerald">
                    Valider et Envoyer
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
