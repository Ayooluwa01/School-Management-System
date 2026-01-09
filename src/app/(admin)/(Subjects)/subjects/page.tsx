"use client";
import React, { useState, useMemo, useCallback } from "react";
import { 
  Search, Plus, BookOpen, Trash2, 
  Edit3, X, AlertCircle, ChevronDown, 
  Layers, LayoutGrid, ArrowRight,
  GraduationCap, Check,
  Users
} from "lucide-react";

// --- MOCK DATA ---
const NIGERIAN_SUBJECTS = [
  { id: 1, title: "Mathematics", category: "Core", classes: ["JSS 1", "JSS 2", "SSS 1"], students: 120 },
  { id: 2, title: "English Language", category: "Core", classes: ["JSS 1", "JSS 2", "SSS 3"], students: 115 },
  { id: 3, title: "Civic Education", category: "General", classes: ["JSS 1", "SSS 1"], students: 85 },
  { id: 4, title: "Biology", category: "Science", classes: ["SSS 1", "SSS 2", "SSS 3"], students: 45 },
  { id: 5, title: "Financial Accounting", category: "Commercial", classes: ["SSS 1", "SSS 2"], students: 32 },
];

const AVAILABLE_CLASSES = ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"];
const CATEGORIES = ["Core", "Science", "Arts", "Commercial", "General", "Vocational"];

// --- REUSABLE COMPONENTS ---

const TabItem = React.memo(({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    type="button"
    className={`px-6 py-3 text-sm font-bold transition-all duration-200 border-b-2 relative ${
      active ? "border-indigo-600 text-indigo-900" : "border-transparent text-zinc-400 hover:text-zinc-600"
    }`}
  >
    {label}
    {active && <span className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]" />}
  </button>
));
TabItem.displayName = "TabItem";

const MetricCard = React.memo(({ icon, label, value }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-all group">
    <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-zinc-900 leading-none">{value}</p>
    </div>
  </div>
));
MetricCard.displayName = "MetricCard";

const SubjectRow = React.memo(({ subject, onEdit, onDelete }: any) => (
  <tr className="group border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
    <td className="px-8 py-5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-md">
          <BookOpen size={18} />
        </div>
        <div>
          <p className="font-bold text-zinc-800">{subject.title}</p>
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">{subject.category}</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-5">
      <div className="flex flex-wrap gap-1.5">
        {subject.classes.map((cls: string) => (
          <span key={cls} className="px-2.5 py-1 bg-white border border-zinc-200 text-zinc-600 rounded-lg text-[10px] font-bold shadow-sm">
            {cls}
          </span>
        ))}
      </div>
    </td>
    <td className="px-8 py-5">
      <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
        <Users size={14} className="text-zinc-300" /> {subject.students}
      </div>
    </td>
    <td className="px-8 py-5 text-right">
      <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
        <button onClick={() => onEdit(subject)} className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
          <Edit3 size={16} />
        </button>
        <button onClick={() => onDelete(subject.id)} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </td>
  </tr>
));
SubjectRow.displayName = "SubjectRow";

export default function SubjectManagement() {
  const [activeSection, setActiveSection] = useState("overview");
  const [subjects, setSubjects] = useState(NIGERIAN_SUBJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [formData, setFormData] = useState({ title: "", category: "Core", classes: [] as string[] });

  const toggleClassSelection = (cls: string) => {
    setFormData(prev => ({
      ...prev,
      classes: prev.classes.includes(cls) ? prev.classes.filter(c => c !== cls) : [...prev.classes, cls]
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubject) {
      setSubjects(prev => prev.map(s => s.id === editingSubject.id ? { ...s, ...formData } : s));
    } else {
      setSubjects(prev => [{ id: Date.now(), ...formData, students: 0 }, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredSubjects = useMemo(() => {
    return subjects.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [subjects, searchTerm]);

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-zinc-900 font-sans selection:bg-indigo-100">
      
      {/* --- TOP NAV --- */}
      <div className="sticky top-0 z-40 bg-white border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">SM</div>
             <div>
                <h1 className="text-xl font-bold text-zinc-900 tracking-tight leading-none">Curriculum</h1>
                <p className="text-xs font-medium text-zinc-500 pt-1 hidden sm:block">Subject Repository</p>
             </div>
          </div>
          <button 
            onClick={() => { setEditingSubject(null); setFormData({ title: "", category: "Core", classes: [] }); setIsModalOpen(true); }}
            className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-all flex items-center gap-2 rounded-xl shadow-xl shadow-zinc-200"
          >
            <Plus size={18} /> <span className="hidden sm:inline">New Subject</span>
          </button>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex gap-2">
            <TabItem active={activeSection === "overview"} label="Catalog Overview" onClick={() => setActiveSection("overview")} />
            <TabItem active={activeSection === "manage"} label="Manage Subjects" onClick={() => setActiveSection("manage")} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <main className="min-h-[500px]">

          {activeSection === 'overview' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start gap-5 mb-8 pb-6 border-b border-zinc-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
                  <LayoutGrid size={24}/>
                </div>
                <div className="pt-1">
                  <h2 className="text-xl font-bold text-zinc-900">Curriculum Summary</h2>
                  <p className="text-sm text-zinc-500 mt-1 leading-relaxed">Overview of active learning modules and enrollment across categories.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <MetricCard icon={<BookOpen size={20}/>} label="Total Subjects" value={subjects.length} />
                <MetricCard icon={<Users size={20}/>} label="Avg. Enrollment" value="48.5%" />
                <MetricCard icon={<Layers size={20}/>} label="Categories" value={CATEGORIES.length} />
              </div>

              <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100/50">
                    <Check size={20} />
                 </div>
                 <div>
                    <p className="text-sm text-emerald-900 font-bold">WASSCE Compliant</p>
                    <p className="text-xs text-emerald-700 mt-0.5">Your subject list matches the standard 2024 Senior Secondary curriculum.</p>
                 </div>
              </div>
            </section>
          )}

          {activeSection === 'manage' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter by subject title..." 
                  className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-zinc-50/50 border-b border-zinc-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Identity</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Offered In</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Students</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredSubjects.map(s => (
                      <SubjectRow 
                        key={s.id} 
                        subject={s} 
                        onEdit={(subj: any) => { setEditingSubject(subj); setFormData(subj); setIsModalOpen(true); }}
                        onDelete={setDeleteConfirm}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-zinc-900">{editingSubject ? "Edit Subject" : "New Subject"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-900 bg-zinc-50 p-2 rounded-full transition-colors"><X size={18}/></button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">Subject Title</label>
                <input 
                  required placeholder="e.g. Physics"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium focus:border-indigo-500 focus:bg-white transition-all outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">Category</label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium appearance-none outline-none focus:border-indigo-500"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16}/>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">Assign to Classes</label>
                <div className="grid grid-cols-3 gap-2">
                  {AVAILABLE_CLASSES.map(cls => (
                    <button
                      key={cls} type="button"
                      onClick={() => toggleClassSelection(cls)}
                      className={`py-2 rounded-xl text-[10px] font-bold border transition-all ${
                        formData.classes.includes(cls) 
                          ? "bg-zinc-900 border-zinc-900 text-white shadow-md" 
                          : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-400"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-sm hover:bg-zinc-800 shadow-xl shadow-zinc-200 transition-all flex items-center justify-center gap-2 mt-4">
                {editingSubject ? "Save Changes" : "Create Subject"} <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE ALERT --- */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                 <AlertCircle size={28} />
            </div>
            <h3 className="font-bold text-zinc-900 text-lg">Remove Subject?</h3>
            <p className="text-sm text-zinc-500 mt-2 mb-8">This will de-register this subject from all associated student report cards.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 bg-zinc-50 text-zinc-600 rounded-xl text-xs font-bold hover:bg-zinc-100 transition-colors">Cancel</button>
              <button onClick={() => { setSubjects(subjects.filter(s => s.id !== deleteConfirm)); setDeleteConfirm(null); }} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}