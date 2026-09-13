import re

with open('src/components/PromoterForm.tsx', 'r') as f:
    content = f.read()

# 1. Remove saveSubmission from updateForm
old_update = """  const updateForm = (updates: Partial<FormState>) => {
    const updated = { ...formData, ...updates };
    setFormData(updated);
    saveSubmission(updated);
  };"""

new_update = """  const updateForm = (updates: Partial<FormState>) => {
    const updated = { ...formData, ...updates };
    setFormData(updated);
  };"""

content = content.replace(old_update, new_update)

# 2. Add saveSubmission to handleSubmit
old_submit = """  const handleSubmit = () => {
    updateForm({ status: 'submitted' });
    if (!onComplete) { alert("Formulaire validé et envoyé avec succès !"); }
    if (onComplete) {
      onComplete();
    } else {
      window.location.href = '/';
    }
  };"""

new_submit = """  const handleSubmit = () => {
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

content = content.replace(old_submit, new_submit)

with open('src/components/PromoterForm.tsx', 'w') as f:
    f.write(content)
