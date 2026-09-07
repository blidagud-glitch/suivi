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

    # The broken pattern is label: t("something') },") }
    # which came from my bad replace script.
    # It looks like: t("Text') },") }  or  t("Text') }") }
    
    # regex to find t("...") where there is ') } inside
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if "') },\") }" in line:
            line = line.replace("') },\") }", "') },")
            line = line.replace('t("', "t('")
            lines[i] = line
        if "') }\") }" in line:
            line = line.replace("') }\") }", "') }")
            line = line.replace('t("', "t('")
            lines[i] = line
            
    with open(filepath, 'w') as f:
        f.write('\n'.join(lines))
