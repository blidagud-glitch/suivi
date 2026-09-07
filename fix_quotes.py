import os
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

    # Just fixing specific lines that are broken by finding them and replacing the quotes.
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if "label: t('" in line and "')est" in line:
            lines[i] = re.sub(r"label: t\('(.+)'\)", lambda m: 'label: t("' + m.group(1).replace("\\'", "'").replace("'", "\\'") + '")', line)
        
        # A more generic approach for any broken t('...') line
        if "label: t('" in line:
            match = re.search(r"label: t\('(.*?)'\s*\}\s*,?", line)
            if match:
               pass
            
        if "id: 'interet'" in line:
            lines[i] = "              { id: 'interet', label: t(\"Absence d'intérêt\") },"
        if "id: 'etat'" in line and "domaine privé" in line:
            lines[i] = "              { id: 'etat', label: t(\"Concession (domaine privé de l'État)\") },"
        if "id: 'attente_foncier'" in line:
            lines[i] = "              { id: 'attente_foncier', label: t(\"Attente de l'assiette foncière\") },"
        if "id: 'arret_decision'" in line:
            lines[i] = "              { id: 'arret_decision', label: t(\"Décision de l'investisseur\") },"

    with open(filepath, 'w') as f:
        f.write('\n'.join(lines))
