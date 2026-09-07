import re

filepath = 'src/components/SubmissionDetails.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# We need to add typesSoutien
injection = """                {submission.typesSoutien && submission.typesSoutien.length > 0 && (
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
                )}
"""

target = "                {submission.demarchesRealisees && submission.demarchesRealisees.length > 0 && ("

if "typesSoutien" not in content:
    content = content.replace(target, injection + target)
    with open(filepath, 'w') as f:
        f.write(content)
