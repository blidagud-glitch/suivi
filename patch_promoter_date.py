import re

with open('src/components/PromoterForm.tsx', 'r') as f:
    content = f.read()

# 1. Update imports
content = content.replace("import { Download, Home } from 'lucide-react';", "import { Download, Home, Calendar } from 'lucide-react';")

# 2. Update the success screen
old_success = """  if (formData.status === 'submitted' && !onComplete) {
    return (
      <>
        <div className="flex h-screen w-full items-center justify-center p-4">
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">✓</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Formulaire Soumis</h2>
            <p className="text-slate-500 font-medium mb-8">Merci, vos réponses ont été enregistrées.</p>
            
            <div className="flex flex-col gap-3">
              <Button onClick={() => setShowPrintView(true)} variant="emerald" className="w-full flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Télécharger / Imprimer
              </Button>
              <Button onClick={() => window.location.href = '/'} variant="outline" className="w-full flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
        
        {showPrintView && (
          <SubmissionDetails 
            submission={formData} 
            onClose={() => setShowPrintView(false)} 
          />
        )}
      </>
    );
  }"""

new_success = """  if (formData.status === 'submitted' && !onComplete) {
    const createdAtDate = formData.createdAt ? new Date(formData.createdAt) : new Date();
    const nextSubmissionDate = new Date(createdAtDate);
    nextSubmissionDate.setMonth(nextSubmissionDate.getMonth() + 6);
    const formattedNextDate = nextSubmissionDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
      <>
        <div className="flex h-screen w-full items-center justify-center p-4">
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">✓</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Formulaire Soumis</h2>
            <p className="text-slate-500 font-medium mb-6">Merci, vos réponses ont été enregistrées avec succès.</p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 text-left shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-xl text-blue-600 shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-sm mb-1">Prochain état d'avancement</h3>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    Vous devrez soumettre votre prochain état d'avancement avant le <strong className="font-bold text-blue-900">{formattedNextDate}</strong> (dans 6 mois).
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={() => setShowPrintView(true)} variant="emerald" className="w-full flex items-center justify-center gap-2 py-6 text-md font-bold">
                <Download className="w-5 h-5" />
                Télécharger / Imprimer
              </Button>
              <Button onClick={() => window.location.href = '/'} variant="outline" className="w-full flex items-center justify-center gap-2 py-5 text-slate-600 hover:text-slate-900">
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
        
        {showPrintView && (
          <SubmissionDetails 
            submission={formData} 
            onClose={() => setShowPrintView(false)} 
          />
        )}
      </>
    );
  }"""

content = content.replace(old_success, new_success)

with open('src/components/PromoterForm.tsx', 'w') as f:
    f.write(content)
