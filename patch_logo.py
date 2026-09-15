import re

with open('src/components/ui/Logo.tsx', 'r') as f:
    content = f.read()

old_src = "const src = logoData || (!imgError ? '/logo.png' : null);"
new_src = "const src = logoData || (!imgError ? 'https://chelha.net/wp-content/uploads/2026/09/Logo.png' : null);"

content = content.replace(old_src, new_src)

with open('src/components/ui/Logo.tsx', 'w') as f:
    f.write(content)
