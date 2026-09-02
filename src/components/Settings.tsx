import React, { useRef, useState } from 'react';
import { Button } from './ui/Button';
import { Upload, Image as ImageIcon, Trash2, Copy, Check } from 'lucide-react';

export default function Settings() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState<string | null>(() => localStorage.getItem('aapi_logo'));
  const [isCopied, setIsCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/png')) {
      alert('Veuillez sélectionner une image au format PNG.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setLogo(dataUrl);
      localStorage.setItem('aapi_logo', dataUrl);
      // Dispatch event so Logo components can update immediately
      window.dispatchEvent(new Event('logo-updated'));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    localStorage.removeItem('aapi_logo');
    window.dispatchEvent(new Event('logo-updated'));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyPath = () => {
    if (logo) {
      navigator.clipboard.writeText(logo);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white/40 shadow-xl overflow-hidden flex flex-col p-6 space-y-6 max-w-3xl">
      <div className="border-b border-slate-200 pb-4">
        <h3 className="text-xl font-bold text-slate-800">Paramètres de l'application</h3>
        <p className="text-slate-500 text-sm mt-1">Personnalisez l'apparence et le comportement de la plateforme.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-slate-800 mb-2">Logo de l'Organisation</h4>
          <p className="text-slate-500 text-sm mb-4">Uploadez un logo au format PNG (fond transparent recommandé) pour remplacer le "A" par défaut dans toute l'application.</p>
          
          <div className="flex items-start gap-8">
            <div className="w-32 h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
              {logo ? (
                <img src={logo} alt="Preview" className="max-w-full max-h-full object-contain p-2" />
              ) : (
                <ImageIcon className="w-10 h-10 text-slate-300" />
              )}
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <input 
                  type="file" 
                  accept="image/png" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  id="logo-upload" 
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  variant="outline" 
                  className="bg-white hover:bg-slate-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Parcourir...
                </Button>
                
                {logo && (
                  <>
                    <Button 
                      onClick={handleCopyPath} 
                      variant="outline" 
                      className="bg-white hover:bg-slate-50"
                    >
                      {isCopied ? <Check className="w-4 h-4 mr-2 text-emerald-500" /> : <Copy className="w-4 h-4 mr-2" />}
                      {isCopied ? "Copié !" : "Copier le chemin"}
                    </Button>
                    <Button 
                      onClick={handleRemoveLogo} 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Format supporté : PNG uniquement.<br/>
                L'image sera automatiquement redimensionnée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
