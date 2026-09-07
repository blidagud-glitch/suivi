import re

filepath = 'src/components/SubmissionDetails.tsx'
with open(filepath, 'r') as f:
    content = f.read()

types_soutien_block = """                {submission.typesSoutien && submission.typesSoutien.length > 0 && (
                  <div className="mt-2">
                    <span className="text-[10px] font-bold text-slate-500 print:text-black uppercase tracking-wide">Types de soutien supplémentaire</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {submission.typesSoutien.map((d: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 bg-blue-50 print:bg-white text-blue-700 print:text-black border border-blue-200 print:border-gray-400 rounded text-[10px]">
                          {d === 'autre' ? (submission.typesSoutienAutre || 'Autre') : getLabel('typesSoutien', d)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}"""

# Remove it from inside section 4
content = content.replace(types_soutien_block, "")

# Add it as a new section before section 8
new_section = """
          {/* Section 7: Soutien */}
          {submission.typesSoutien && submission.typesSoutien.length > 0 && (
            <section className="print:break-inside-avoid mt-8 print:mt-4">
              <h3 className="text-lg print:text-sm font-bold text-emerald-700 print:text-black mb-4 print:mb-2 border-b border-emerald-100 print:border-black pb-2">7. Types de soutien supplémentaire</h3>
              <div className="flex flex-wrap gap-2 print:gap-1">
                {submission.typesSoutien.map((d: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 print:bg-white text-blue-700 print:text-black border border-blue-200 print:border-gray-400 rounded text-sm print:text-[11px] font-medium">
                    {d === 'autre' ? (submission.typesSoutienAutre || 'Autre') : getLabel('typesSoutien', d)}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Section 8 & Signature side-by-side for print */}"""

content = content.replace("          {/* Section 8 & Signature side-by-side for print */}", new_section)

with open(filepath, 'w') as f:
    f.write(content)
