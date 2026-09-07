import re

filepath = 'src/components/form-steps/Step2Conditions.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# I will systematically replace untranslated hardcoded text with {t('...')}
replacements = {
    "Partie II — État d'avancement et diagnostic": "Partie II — État d'avancement et diagnostic",
    "Suivi de la présentation au GUD et conditions de réalisation (Capital, Financement).": "Suivi de la présentation au GUD et conditions de réalisation (Capital, Financement).",
    "4. Suivi de la présentation au GUD": "4. Suivi de la présentation au GUD",
    "4.1 Présentation au GUD (Le promoteur s'est-il présenté ?)": "4.1 Présentation au GUD (Le promoteur s'est-il présenté ?)",
    "4.2. Proposition d'un autre rendez-vous": "4.2. Proposition d'un autre rendez-vous",
    ">Oui<": ">{t('Oui')}<",
    ">Non<": ">{t('Non')}<",
    ">Autre :<": ">{t('Autre :')}<",
    ">Date prévue :<": ">{t('Date prévue :')}<",
    'placeholder="Précisez..."': 'placeholder={t("Précisez...")}',
    "4.3 Motif de non-présentation ou de non-renseignement": "4.3 Motif de non-présentation ou de non-renseignement",
    "5. Informations sur les conditions de réalisation du projet": "5. Informations sur les conditions de réalisation du projet",
    "5.1. Répartition du capital :": "5.1. Répartition du capital :",
    ">N°<": ">{t('N°')}<",
    ">Associé / Actionnaire<": ">{t('Associé / Actionnaire')}<",
    ">Nationalité<": ">{t('Nationalité')}<",
    ">Part du capital (%)<": ">{t('Part du capital (%)')}<",
    ">Montant<": ">{t('Montant')}<",
    ">Devise (USD/Euro)<": ">{t('Devise (USD/Euro)')}<",
    ">Total:<": ">{t('Total:')}<",
    ">+ Ajouter un associé<": ">{t('+ Ajouter un associé')}<",
    ">La répartition totale devrait être de 100%<": ">{t('La répartition totale devrait être de 100%')}<",
    "5.2. Financement :": "5.2. Financement :",
    "5.2.1. Le projet nécessite-t-il un crédit bancaire ?": "5.2.1. Le projet nécessite-t-il un crédit bancaire ?",
    ">Oui (Aller à la question 5.2.2)<": ">{t('Oui (Aller à la question 5.2.2)')}<",
    ">Non (Aller à la question 5.3)<": ">{t('Non (Aller à la question 5.3)')}<",
    "5.2.2. Si oui, quel est l'état d'avancement de votre demande de crédit ?": "5.2.2. Si oui, quel est l'état d'avancement de votre demande de crédit ?",
}

for k, v in replacements.items():
    if k.startswith(">") and k.endswith("<"):
        content = content.replace(k, v)
    elif k.startswith('placeholder='):
        content = content.replace(k, v)
    else:
        # It's a text node inside <...>...</...> probably.
        # But maybe it's in a <h2 ...> text </h2> or <Label>text</Label>
        # Let's replace >text< with >{t('text')}< if it doesn't have internal quotes,
        # or >{t("text")}< if it has single quotes.
        safe_v = v.replace("'", "\\'")
        content = content.replace(f">{k}<", f">{{t('{safe_v}')}}<")
        content = content.replace(f'"{k}"', f"{{t('{safe_v}')}}") # in case it's in a string literal, though unlikely.

# One more for text nodes that might have spaces around them.
# Let's just use re.sub for safety if it didn't match.
import re
for k, v in replacements.items():
    if not k.startswith(">"):
        safe_v = v.replace("'", "\\'")
        # find >{k}< or > {k} <
        content = content.replace(f">{k}<", f">{{t('{safe_v}')}}<")

with open(filepath, 'w') as f:
    f.write(content)

