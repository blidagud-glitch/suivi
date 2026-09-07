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

    lines = content.split('\n')
    for i, line in enumerate(lines):
        if "label: t('" in line:
            # Let's just find anything matching label: t('...') where there's an apostrophe in the middle
            # We can just replace label: t('...') with label: t("...") manually if it has \'
            if "\')" in line and "}" in line:
                # Find text between t(' and ' }
                parts = line.split("t('")
                if len(parts) > 1:
                    after_t = parts[1]
                    inner_text = after_t.split("' }")[0]
                    # it might have \') inside
                    inner_text = inner_text.replace("\\')", "'")
                    lines[i] = parts[0] + 't("' + inner_text + '") }' + (after_t.split("' }")[1] if len(after_t.split("' }")) > 1 else "")
                    
        # Explicit override
        if "id: 'permis'" in line and "urbanisme" in line:
            lines[i] = "            { id: 'permis', label: t(\"Permis de construire et actes d'urbanisme\") },"

    with open(filepath, 'w') as f:
        f.write('\n'.join(lines))
