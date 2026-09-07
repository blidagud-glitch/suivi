import re
import os

files = [
    'src/components/PromoterForm.tsx',
    'src/components/form-steps/Step1Contact.tsx',
    'src/components/form-steps/Step2Conditions.tsx',
    'src/components/form-steps/Step3Foncier.tsx',
    'src/components/form-steps/Step4Avancement.tsx',
    'src/components/form-steps/Step5Signature.tsx'
]

def add_t_call(content):
    if "const { t } = useLanguage();" in content:
        return content
    # Find the main export default function
    match = re.search(r'export default function \w+\s*\([^)]*\)\s*(:\s*[^{]+)?\s*\{', content)
    if not match:
        match = re.search(r'export default function \w+.*?\{', content, re.DOTALL)
        
    if match:
        idx = match.end()
        return content[:idx] + "\n  const { t } = useLanguage();" + content[idx:]
    return content

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    if "useLanguage" not in content:
        if "form-steps" in filepath:
            content = "import { useLanguage } from '../../lib/LanguageContext';\n" + content
        else:
            content = "import { useLanguage } from '../lib/LanguageContext';\n" + content

    content = add_t_call(content)

    # Convert object arrays labels
    # e.g. { id: 'informe', label: 'Promoteur...' } => { id: 'informe', label: t('Promoteur...') }
    content = re.sub(r"label:\s*'([^']+)'", r"label: t('\1')", content)
    content = re.sub(r'label:\s*"([^"]+)"', r'label: t("\1")', content)

    # Some hardcoded text in HTML elements
    # I'll just write a quick script to find text between >< and replace it if it has alphabets
    
    # We will manually do the remaining steps if needed, but let's test this first.
    with open(filepath, 'w') as f:
        f.write(content)

