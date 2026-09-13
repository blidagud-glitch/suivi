import re

with open('src/components/PromoterForm.tsx', 'r') as f:
    content = f.read()

old_init = """        // Handle new session opened on phone
        setFormData({ ...initialFormState, sessionId });"""

new_init = """        // Handle new session opened on phone
        setFormData({ ...initialFormState, sessionId, createdAt: new Date().toISOString() });"""
content = content.replace(old_init, new_init)

with open('src/components/PromoterForm.tsx', 'w') as f:
    f.write(content)

