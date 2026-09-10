import re

with open('src/lib/exportExcel.ts', 'r') as f:
    content = f.read()

content = content.replace("}7:${getCol(endCol - 1)}6", "}7:${getCol(endCol - 1)}7")
content = content.replace("}8:${getCol(endCol - 1)}7", "}8:${getCol(endCol - 1)}8")

with open('src/lib/exportExcel.ts', 'w') as f:
    f.write(content)
