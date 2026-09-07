import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from './ui/Button';
import { FileText, UserCircle, Globe } from 'lucide-react';
import Logo from './ui/Logo';
import { useLanguage } from '../lib/LanguageContext';

export default function Home({ onLoginClick, onStartLocalForm }: { onLoginClick: () => void, onStartLocalForm: () => void }) {
  const publicUrl = "https://ais-pre-wuv7tno37jboyv7mmclyix-728454572557.europe-west2.run.app";
  const sessionUrl = `${publicUrl}/?new_form=true`;
  const { lang, setLang, t } = useLanguage();
  const [showLangSelect, setShowLangSelect] = useState(false);

  const handleStartWithLang = (l: 'fr' | 'ar') => {
    setLang(l);
    onStartLocalForm();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Global Lang Toggle */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button variant={lang === 'fr' ? 'emerald' : 'outline'} onClick={() => setLang('fr')} className="text-xs px-3 py-1 h-auto">Français</Button>
        <Button variant={lang === 'ar' ? 'emerald' : 'outline'} onClick={() => setLang('ar')} className="text-xs px-3 py-1 h-auto font-arabic">العربية</Button>
      </div>

      <div className="max-w-4xl w-full">
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center mx-auto">
            <Logo sizeClasses="w-20 h-20" defaultClasses="bg-emerald-500 rounded-3xl text-4xl shadow-emerald-500/30" />
          </div>
          <p className="text-slate-500 text-lg">{t('Plateforme de Suivi des Investissements')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Espace Promoteur */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center space-y-6 relative overflow-hidden">
            {showLangSelect ? (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 space-y-6 animate-in fade-in zoom-in-95">
                <Globe className="w-12 h-12 text-emerald-500 mb-2" />
                <h3 className="text-xl font-bold text-slate-800">{t('Choisir la langue')}</h3>
                <div className="w-full space-y-3">
                  <Button onClick={() => handleStartWithLang('fr')} className="w-full py-4 text-base" variant="outline">
                    Continuer en Français
                  </Button>
                  <Button onClick={() => handleStartWithLang('ar')} className="w-full py-4 text-base font-arabic" variant="emerald">
                    المتابعة باللغة العربية
                  </Button>
                </div>
                <button onClick={() => setShowLangSelect(false)} className="text-sm text-slate-500 hover:text-slate-800 mt-4">
                  {t('Précédent')}
                </button>
              </div>
            ) : null}

            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-2">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{t('Espace Promoteur')}</h2>
              <p className="text-slate-500 text-sm mt-2">{t('Scanner pour remplir le formulaire')}</p>
            </div>
            
            <div className="mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 w-full flex flex-col items-center">
              <div className="bg-white p-4 rounded-xl border border-slate-100 mb-4 shadow-sm">
                <QRCodeSVG value={sessionUrl} size={180} />
              </div>
              <p className="text-xs text-slate-500 mb-4 font-medium">
                {t('Scannez ce code pour démarrer une nouvelle session sur votre terminal.')}
              </p>
              <div className="w-full">
                <button onClick={() => setShowLangSelect(true)} className="flex w-full items-center justify-center px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
                  <FileText className="w-4 h-4 mr-2" />
                  {t('Remplir le formulaire (sur ce poste)')}
                </button>
              </div>
            </div>
          </div>

          {/* Espace Agent */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-2">
              <UserCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{t('Espace Agent')}</h2>
              <p className="text-slate-500 text-sm mt-2">{t('Consultation, édition et impression')}</p>
            </div>
            
            <div className="w-full space-y-4 pt-4">
              <Button onClick={onLoginClick} className="w-full py-6 text-base shadow-md" variant="emerald">
                <UserCircle className="w-5 h-5 mr-2" />
                {t('Accéder au Tableau de Bord')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
