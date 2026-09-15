import re

with open('src/components/PromoterForm.tsx', 'r') as f:
    content = f.read()

old_wrapper = '<div className="flex h-screen w-full items-center justify-center p-4">'
new_wrapper = '<div className="flex h-screen w-full items-center justify-center p-4 print:hidden">'

content = content.replace(old_wrapper, new_wrapper)

with open('src/components/PromoterForm.tsx', 'w') as f:
    f.write(content)
