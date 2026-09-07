import re

filepath = 'src/components/form-steps/Step5Signature.tsx'
with open(filepath, 'r') as f:
    content = f.read()

replacements = {
    "8. Suivi du traitement des projets": "8. Suivi du traitement des projets",
    "8.1. Action engagée pour lever l'obstacle": "8.1. Action engagée pour lever l'obstacle",
    "8.2. Partie intervenante": "8.2. Partie intervenante",
    "8.3. État du traitement": "8.3. État du traitement",
    "8.4. Échéance de traitement": "8.4. Échéance de traitement",
    ">Date prévue de réalisation ou d'achèvement de l'action :<": ">{t(\"Date prévue de réalisation ou d'achèvement de l'action :\")}<",
    "Si aucune échéance n'est fixée, ne pas renseigner cette rubrique.": "Si aucune échéance n'est fixée, ne pas renseigner cette rubrique.",
    "8.5. Résultat du traitement (À la date de l'exercice)": "8.5. Résultat du traitement (À la date de l'exercice)",
    "8.6. Date de mise à jour du suivi": "8.6. Date de mise à jour du suivi",
    ">Date du dernier suivi ou de la dernière action réalisée :<": ">{t('Date du dernier suivi ou de la dernière action réalisée :')}<",
    ">Observations :<": ">{t('Observations :')}<",
    "8.7. Possibilité de réactivation du projet": "8.7. Possibilité de réactivation du projet",
    "Signature Numérique du Promoteur": "Signature Numérique du Promoteur",
    "Veuillez signer dans le cadre ci-dessous avant de valider le formulaire.": "Veuillez signer dans le cadre ci-dessous avant de valider le formulaire.",
    "Effacer": "Effacer",
}

for k, v in replacements.items():
    if k.startswith(">") and k.endswith("<"):
        content = content.replace(k, v)
    else:
        safe_v = v.replace("'", "\\'")
        content = content.replace(f">{k}<", f">{{t('{safe_v}')}}<")
        content = content.replace(f'"{k}"', f"{{t('{safe_v}')}}")

with open(filepath, 'w') as f:
    f.write(content)

