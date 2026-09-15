import re

with open('src/components/PromoterForm.tsx', 'r') as f:
    content = f.read()

# Add import
import_statement = "import Step5Signature from './form-steps/Step5Signature';"
new_import = "import Step5Signature from './form-steps/Step5Signature';\nimport SubmissionDetails from './SubmissionDetails';\nimport { Download, Home } from 'lucide-react';"
if 'SubmissionDetails' not in content:
    content = content.replace(import_statement, new_import)

# Add state
state_statement = "const [isLoaded, setIsLoaded] = useState(false);"
new_state = "const [isLoaded, setIsLoaded] = useState(false);\n  const [showPrintView, setShowPrintView] = useState(false);"
if 'showPrintView' not in content:
    content = content.replace(state_statement, new_state)

# Replace handleSubmit
old_submit = """  const handleSubmit = async () => {
    const finalData = { ...formData, status: 'submitted' as const };
    setFormData(finalData);
    
    // Attendre que la sauvegarde soit terminée avant de changer de page
    try {
      await saveSubmission(finalData);
      
      if (!onComplete) { alert("Formulaire validé et envoyé avec succès !"); }
      if (onComplete) {
        onComplete();
      } else {
        window.location.href = '/';
      }
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'enregistrement. Veuillez réessayer.");
    }
  };"""

new_submit = """  const handleSubmit = async () => {
    const finalData = { ...formData, status: 'submitted' as const };
    setFormData(finalData);
    
    try {
      await saveSubmission(finalData);
      if (onComplete) {
        onComplete();
      }
      // If not onComplete (i.e. public view), we stay on this page to show the success screen.
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'enregistrement. Veuillez réessayer.");
    }
  };"""

content = content.replace(old_submit, new_submit)

# Replace success screen
old_success = """  if (formData.status === 'submitted' && !onComplete) {
    return (
      <div className="flex h-screen w-full items-center justify-center p-4">
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">✓</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Formulaire Soumis</h2>
          <p className="text-slate-500 font-medium">Merci, vos réponses ont été enregistrées.</p>
        </div>
      </div>
    );
  }"""

new_success = """  if (formData.status === 'submitted' && !onComplete) {
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

content = content.replace(old_success, new_success)

with open('src/components/PromoterForm.tsx', 'w') as f:
    f.write(content)

