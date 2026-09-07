import re

filepath = 'src/lib/mappings.ts'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("  typesSoutien: {", ",\n  typesSoutien: {")

with open(filepath, 'w') as f:
    f.write(content)
