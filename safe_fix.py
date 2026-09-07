import re

files = [
    'src/components/form-steps/Step1Contact.tsx',
    'src/components/form-steps/Step2Conditions.tsx',
    'src/components/form-steps/Step3Foncier.tsx',
    'src/components/form-steps/Step4Avancement.tsx',
    'src/components/form-steps/Step5Signature.tsx'
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the broken lines that look like: { id: '...', label: t("...") },") }
    # Let's just fix the syntax error directly:
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if "t(\"Promoteur informé et invité" in line:
            lines[i] = "              { id: 'informe', label: t('Promoteur informé et invité à se présenter au GUD') },"
        elif "t(\"Promoteur demande un délai" in line:
            lines[i] = "              { id: 'demande_delai', label: t('Promoteur demande un délai / rendez-vous') },"
        elif "t(\"Promoteur refuse de se présenter" in line:
            lines[i] = "              { id: 'refuse', label: t('Promoteur refuse de se présenter') },"
        elif "t(\"Autre')" in line:
            lines[i] = "              { id: 'autre', label: t('Autre') }"
        elif "t(\"Numéro injoignable" in line:
            lines[i] = "              { id: 'injoignable', label: t('Numéro injoignable') },"
        elif "t(\"Numéro incorrect" in line:
            lines[i] = "              { id: 'incorrect', label: t('Numéro incorrect') },"
        elif "t(\"Numéro inactif" in line:
            lines[i] = "              { id: 'inactif', label: t('Numéro inactif, bloqué ou non attribué') },"
        elif "t(\"Absence de réponse" in line:
            lines[i] = "              { id: 'absence', label: t('Absence de réponse') },"
        elif "t(\"Répondeur / Boîte vocale" in line:
            lines[i] = "              { id: 'repondeur', label: t('Répondeur / Boîte vocale') },"
        elif "t(\"Autre')" in line:
            lines[i] = "              { id: 'autre', label: t('Autre') }"
            
        elif "id: 'pas_presente'" in line:
            lines[i] = "              { id: 'pas_presente', label: t(\"Non, ne s'est pas encore présenté\") },"
        elif "id: 'interet'" in line:
            lines[i] = "              { id: 'interet', label: t(\"Absence d'intérêt\") },"
        elif "id: 'permis'" in line and "urbanisme" in line:
            lines[i] = "            { id: 'permis', label: t(\"Permis de construire et actes d'urbanisme\") },"

    with open(filepath, 'w') as f:
        f.write('\n'.join(lines))
