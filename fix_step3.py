import re

filepath = 'src/components/form-steps/Step3Foncier.tsx'
with open(filepath, 'r') as f:
    content = f.read()

replacements = {
    "5.3 Foncier": "5.3 Foncier",
    "Le projet nécessite-t-il une assiette foncière ?": "Le projet nécessite-t-il une assiette foncière ?",
    ">Oui<": ">{t('Oui')}<",
    ">Non<": ">{t('Non')}<",
    ">Type de foncier<": ">{t('Type de foncier')}<",
    ">Sélectionner<": ">{t('Sélectionner')}<",
    ">Industriel<": ">{t('Industriel')}<",
    ">Urbain<": ">{t('Urbain')}<",
    ">Touristique<": ">{t('Touristique')}<",
    ">Agricole<": ">{t('Agricole')}<",
    ">Superficie prévue (m²)<": ">{t('Superficie prévue (m²)')}<",
    ">Localisation (Commune / Wilaya)<": ">{t('Localisation (Commune / Wilaya)')}<",
    "5.3.5. Mode d'accès au foncier": "5.3.5. Mode d'accès au foncier",
    "5.3.6. État d'avancement des démarches foncières": "5.3.6. État d'avancement des démarches foncières",
    "5.4. Permis de construire :": "5.4. Permis de construire :",
    "5.4.1. Le projet nécessite-t-il un permis de construire ?": "5.4.1. Le projet nécessite-t-il un permis de construire ?",
    ">Oui (Aller à la question 5.4.2)<": ">{t('Oui (Aller à la question 5.4.2)')}<",
    ">Non (Aller à la question 5.5)<": ">{t('Non (Aller à la question 5.5)')}<",
    "5.4.2. État d'avancement des démarches pour l'obtention du permis de construire": "5.4.2. État d'avancement des démarches pour l'obtention du permis de construire",
    ">Aucune démarche engagée<": ">{t('Aucune démarche engagée')}<",
    ">Demande déposée → Date du dépôt :<": ">{t('Demande déposée → Date du dépôt :')}<",
    ">Dossier en cours d'instruction<": ">{t(\"Dossier en cours d'instruction\")}<",
    ">Permis obtenu → Date d'obtention :<": ">{t(\"Permis obtenu → Date d'obtention :\")}<",
    ">Réserves formulées<": ">{t('Réserves formulées')}<",
    ">Dossier rejeté<": ">{t('Dossier rejeté')}<",
    "5.5 Programme prévisionnel d’importation (PPI)": "5.5 Programme prévisionnel d’importation (PPI)",
    "5.5.1. Le projet nécessite-t-il l’accomplissement de formalités relatives au PPI ?": "5.5.1. Le projet nécessite-t-il l’accomplissement de formalités relatives au PPI ?",
    ">Oui (continuer)<": ">{t('Oui (continuer)')}<",
    ">Date de dépôt :<": ">{t('Date de dépôt :')}<",
    ">Non (Aller à la question 6)<": ">{t('Non (Aller à la question 6)')}<",
    "5.5.2. État d’avancement de la demande relative au PPI": "5.5.2. État d’avancement de la demande relative au PPI",
    "5.5.3. Date de dépôt de la demande :": "5.5.3. Date de dépôt de la demande :",
    ">Date :<": ">{t('Date :')}<",
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

