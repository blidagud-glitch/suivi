import re

with open('src/components/PromoterForm.tsx', 'r') as f:
    content = f.read()

old_submit = """  const handleSubmit = () => {
    const finalData = { ...formData, status: 'submitted' as const };
    setFormData(finalData);
    saveSubmission(finalData);
    if (!onComplete) { alert("Formulaire validé et envoyé avec succès !"); }
    if (onComplete) {
      onComplete();
    } else {
      window.location.href = '/';
    }
  };"""

new_submit = """  const handleSubmit = async () => {
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

content = content.replace(old_submit, new_submit)

with open('src/components/PromoterForm.tsx', 'w') as f:
    f.write(content)

