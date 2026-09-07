import re

filepath = 'src/lib/i18n.ts'
with open(filepath, 'r') as f:
    lines = f.readlines()

seen_keys = set()
new_lines = []

for line in lines:
    # Match the key part: "Key": "Value",
    match = re.search(r'^\s*"([^"]+)":\s*".*",?', line)
    if match:
        key = match.group(1)
        if key in seen_keys:
            continue
        seen_keys.add(key)
    new_lines.append(line)

with open(filepath, 'w') as f:
    f.writelines(new_lines)

