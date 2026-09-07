import re

filepath = 'src/components/form-steps/Step4Avancement.tsx'
with open(filepath, 'r') as f:
    content = f.read()

replacements = {
    "Montant d'investissement réalisé (en DA) :": "Montant d'investissement réalisé (en DA) :",
    "Nombre d'emplois créés :": "Nombre d'emplois créés :",
    "i. Exécution :": "i. Exécution :",
    "ii. Maitrise :": "ii. Maitrise :",
    "iii. Cadre :": "iii. Cadre :",
    "Taux global d'avancement physique estimé (%) :": "Taux global d'avancement physique estimé (%) :",
    "Taux d'utilisation des capacité de production (%) :": "Taux d'utilisation des capacité de production (%) :",
    "Sélectionner la contrainte principale": "Sélectionner la contrainte principale",
    "6. Etat d'avancement du projet": "6. Etat d'avancement du projet",
    "6.1. Etat actuel du projet": "6.1. Etat actuel du projet",
    "6.2. Si Abandonné, Annulé, en Arrêt": "6.2. Si Abandonné, Annulé, en Arrêt",
    "6.4. Perspectives de relance/de mise en exécution du projet": "6.4. Perspectives de relance/de mise en exécution du projet",
    "Le projet présente-t-il des perspectives de relance/Mise en exécution ?": "Le projet présente-t-il des perspectives de relance/Mise en exécution ?",
    "6.5. Date prévisionnelle de relance ou d'entame du projet :": "6.5. Date prévisionnelle de relance ou d'entame du projet :",
    "6.6. En cours de réalisation : procédures et démarches réalisées": "6.6. En cours de réalisation : procédures et démarches réalisées",
    "6.7. Mise en exploitation :": "6.7. Mise en exploitation :",
    "6.8. Réalisation :": "6.8. Réalisation :",
    "6.9. Date prévue de pleine exploitation :": "6.9. Date prévue de pleine exploitation :",
    "7. Types de soutien supplémentaire": "7. Types de soutien supplémentaire",
    ">Autre<": ">{t('Autre')}<",
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

