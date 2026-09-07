import re
import json

filepaths = [
    'src/components/PromoterForm.tsx',
    'src/components/form-steps/Step1Contact.tsx',
    'src/components/form-steps/Step2Conditions.tsx',
    'src/components/form-steps/Step3Foncier.tsx',
    'src/components/form-steps/Step4Avancement.tsx',
    'src/components/form-steps/Step5Signature.tsx'
]

translations = {}
# let's just parse the TS file roughly
with open('src/lib/i18n.ts', 'r') as f:
    i18n_content = f.read()
    
# Extract everything inside translations: Record<string, string> = { ... }
import ast

found_keys = set()
lines = i18n_content.split('\n')
for line in lines:
    if '": "' in line:
        key = line.split('": "')[0].strip().strip('"')
        found_keys.add(key)

all_t_calls = set()
for fp in filepaths:
    with open(fp, 'r') as f:
        content = f.read()
        
    matches1 = re.findall(r"t\('(.*?)'\)", content)
    matches2 = re.findall(r't\("(.*?)"\)', content)
    
    all_t_calls.update(matches1)
    all_t_calls.update(matches2)

missing = all_t_calls - found_keys
for m in missing:
    print(m)
