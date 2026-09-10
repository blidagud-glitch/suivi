import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# 1. Add states
state_insertion = """  const [activeTab, setActiveTab] = useState<'projects' | 'agents' | 'settings'>('projects');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredSubmissions = submissions.filter(sub => {
    let match = true;
    const subDate = new Date(sub.createdAt);
    subDate.setHours(0, 0, 0, 0);

    if (startDate) {
      const s = new Date(startDate);
      s.setHours(0, 0, 0, 0);
      if (subDate < s) match = false;
    }
    if (endDate) {
      const e = new Date(endDate);
      e.setHours(0, 0, 0, 0);
      if (subDate > e) match = false;
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (sub.attestationNumero && sub.attestationNumero.toLowerCase().includes(searchLower)) ||
        (sub.sessionId && sub.sessionId.toLowerCase().includes(searchLower));
      if (!matchesSearch) match = false;
    }

    return match;
  });
"""
content = content.replace("  const [activeTab, setActiveTab] = useState<'projects' | 'agents' | 'settings'>('projects');", state_insertion)

# 2. Update exportToExcel
content = content.replace("generateExcel(submissions);", "generateExcel(filteredSubmissions);")

# 3. Add UI for date filters and change Search input
# Let's find the header of the table:
header_search = """            <div className="p-6 border-b border-white/40 flex justify-between items-center">
              <h2 className="font-semibold text-slate-700">Soumissions Récentes</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="pl-9 pr-4 py-2 text-sm bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
                />
              </div>
            </div>"""

new_header = """            <div className="p-6 border-b border-white/40 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center gap-6 bg-slate-50/50 p-2 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600 font-medium">Du</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-blue-700 font-medium"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600 font-medium">au :</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-blue-700 font-medium"
                  />
                </div>
                <div className="flex items-center gap-2 border-l border-slate-300 pl-6">
                  <span className="text-sm font-bold text-teal-700 underline">Résultat</span>
                  <span className="text-lg font-bold text-red-600">{String(filteredSubmissions.length).padStart(2, '0')}</span>
                </div>
              </div>
              
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher (N° Attestation...)" 
                  className="pl-9 pr-4 py-2 text-sm bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
                />
              </div>
            </div>"""

content = content.replace(header_search, new_header)

# 4. Map over filteredSubmissions instead of submissions
content = content.replace("{submissions.length === 0 ?", "{filteredSubmissions.length === 0 ?")
content = content.replace("submissions.map(sub => (", "filteredSubmissions.map(sub => (")

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
