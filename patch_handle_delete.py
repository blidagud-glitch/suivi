import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

old_delete = """  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce formulaire ?')) {
      try {
        await deleteSubmission(id);
      } catch (err) {
        console.error(err);
      }
    }
  };"""

new_delete = """  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce formulaire ?')) {
      try {
        await deleteSubmission(id);
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression.");
      }
    }
  };"""

content = content.replace(old_delete, new_delete)
with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)

