import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from './ui/Button';
import { FileText, UserCircle, QrCode } from 'lucide-react';
import Logo from './ui/Logo';

export default function Home({ onLoginClick, onStartLocalForm }: { onLoginClick: () => void, onStartLocalForm: () => void }) {
  const publicUrl = "https://ais-pre-wuv7tno37jboyv7mmclyix-728454572557.europe-west2.run.app";
  const sessionUrl = `${publicUrl}/?new_form=true`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center mx-auto">
            <Logo sizeClasses="w-20 h-20" defaultClasses="bg-emerald-500 rounded-3xl text-4xl shadow-emerald-500/30" />
          </div>
          <p className="text-slate-500 text-lg">Plateforme de Suivi des Investissements</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Espace Promoteur */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-2">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Espace Promoteur</h2>
              <p className="text-slate-500 text-sm mt-2">Scanner pour remplir le formulaire</p>
            </div>
            
            <div className="mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 w-full flex flex-col items-center">
              <div className="bg-white p-4 rounded-xl border border-slate-100 mb-4 shadow-sm">
                <QRCodeSVG value={sessionUrl} size={180} />
              </div>
              <p className="text-xs text-slate-500 mb-4 font-medium">
                Scannez ce code pour démarrer une nouvelle session sur votre terminal.
              </p>
              <div className="w-full">
                <button onClick={onStartLocalForm} className="flex w-full items-center justify-center px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
                  <FileText className="w-4 h-4 mr-2" />
                  Remplir le formulaire (sur ce poste)
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
              <h2 className="text-2xl font-bold text-slate-800">Espace Agent</h2>
              <p className="text-slate-500 text-sm mt-2">Consultation, édition et impression</p>
            </div>
            
            <div className="w-full space-y-4 pt-4">
              <Button onClick={onLoginClick} className="w-full py-6 text-base shadow-md" variant="emerald">
                <UserCircle className="w-5 h-5 mr-2" />
                Accéder au Tableau de Bord
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
