import re

with open('src/lib/exportExcel.ts', 'r') as f:
    content = f.read()

# Reverse what I just did if any? No, I didn't write it.

# Let's replace the whole block manually to avoid overlapping replaces.
# Find the start of Row 6 rendering.

# Let's just use re.sub for the rows.

with open('src/lib/exportExcel.ts', 'r') as f:
    original = f.read()

# 1. Update mergeCells for title from A5:X5 to A5:AC5
original = original.replace("sheet.mergeCells('A5:X5');", "sheet.mergeCells('A5:AC5');")

# 2. Add period logic
period_logic = """
  // Period
  let periodText = '';
  if (submissions && submissions.length > 0) {
    const dates = submissions
      .map(s => new Date(s.createdAt).getTime())
      .filter(t => !isNaN(t));
    if (dates.length > 0) {
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));
      
      const format = (d: Date) => {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
      };
      
      periodText = `Période : du ${format(minDate)} jusqu'à la date ${format(maxDate)}`;
      sheet.mergeCells('A6:AC6');
      const periodCell = sheet.getCell('A6');
      periodCell.value = periodText;
      periodCell.font = { size: 12, bold: true };
      periodCell.alignment = { horizontal: 'center', vertical: 'middle' };
    }
  }
"""

title_align = "titleCell.alignment = { horizontal: 'center', vertical: 'middle' };"
if period_logic not in original:
    original = original.replace(title_align, title_align + "\n" + period_logic)

# Row shifts:
# Render Row 6: Sections -> Render Row 7: Sections
# getRow(6) -> getRow(7)
# ...6: ...6 -> ...7: ...7

# Using regex to replace the rendering logic
def replacer(match):
    s = match.group(0)
    s = s.replace("Row 6", "Row 7")
    s = s.replace("row6", "row7")
    s = s.replace("getRow(6)", "getRow(7)")
    s = s.replace("6:`", "7:`")
    s = s.replace("6)", "7)")
    s = s.replace("6:${", "7:${")
    return s

original = re.sub(r'// Render Row 6: Sections.*?row6\.height = 25;', replacer, original, flags=re.DOTALL)

def replacer2(match):
    s = match.group(0)
    s = s.replace("Row 7", "Row 8")
    s = s.replace("row7", "row8")
    s = s.replace("getRow(7)", "getRow(8)")
    s = s.replace("7:`", "8:`")
    s = s.replace("7)", "8)")
    s = s.replace("7:${", "8:${")
    return s

original = re.sub(r'// Render Row 7: Groups.*?row7\.height = 20;', replacer2, original, flags=re.DOTALL)

def replacer3(match):
    s = match.group(0)
    s = s.replace("Row 8", "Row 9")
    s = s.replace("row8", "row9")
    s = s.replace("getRow(8)", "getRow(9)")
    return s

original = re.sub(r'// Render Row 8: Columns.*?row8\.height = 30;', replacer3, original, flags=re.DOTALL)

# apply borders loop
original = original.replace("row6.getCell(c).border = borderThin;", "row7.getCell(c).border = borderThin;")
original = original.replace("row7.getCell(c).border = borderThin;", "row8.getCell(c).border = borderThin;")
original = original.replace("row8.getCell(c).border = borderThin;", "row9.getCell(c).border = borderThin;")
# actually the original was just 6 and 7, so let's just make it 7, 8, 9
def replacer_borders(match):
    return """  for (let c = 1; c <= headers.length; c++) {
    row7.getCell(c).border = borderThin;
    row8.getCell(c).border = borderThin;
    row9.getCell(c).border = borderThin;
  }"""
original = re.sub(r'// Apply borders to row 6 and 7 as well.*?\}', replacer_borders, original, flags=re.DOTALL)

# Populate data row index
original = original.replace("const row = sheet.getRow(9 + rowIdx);", "const row = sheet.getRow(10 + rowIdx);")

with open('src/lib/exportExcel.ts', 'w') as f:
    f.write(original)

