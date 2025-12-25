"use client";
import React, { useState, useMemo, useCallback } from "react";
import { 
  Search, Plus, BookOpen, Trash2, 
  Edit3, X, AlertCircle, CheckCircle2,
  ChevronDown, Layers
} from "lucide-react";

// --- MOCK DATA ---
const NIGERIAN_SUBJECTS = [
  { id: 1, title: "Mathematics", category: "Core", classes: ["JSS 1", "JSS 2", "SSS 1"] },
  { id: 2, title: "English Language", category: "Core", classes: ["JSS 1", "JSS 2", "SSS 3"] },
  { id: 3, title: "Civic Education", category: "General", classes: ["JSS 1", "SSS 1"] },
  { id: 4, title: "Biology", category: "Science", classes: ["SSS 1", "SSS 2", "SSS 3"] },
  { id: 5, title: "Financial Accounting", category: "Commercial", classes: ["SSS 1", "SSS 2"] },
];

const AVAILABLE_CLASSES = ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"];
const CATEGORIES = ["Core", "Science", "Arts", "Commercial", "General", "Vocational"];

// --- MEMOIZED COMPONENTS ---

const SubjectRow = React.memo(({ subject, onEdit, onDelete }: any) => (
  <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center border border-zinc-800 shadow-sm">
          <BookOpen size={16} />
        </div>
        <div>
          <p className="text-sm font-bold text-zinc-800">{subject.title}</p>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{subject.category}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex flex-wrap gap-1.5">
        {subject.classes.map((cls: string) => (
          <span key={cls} className="px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded text-[10px] font-bold border border-zinc-200">
            {cls}
          </span>
        ))}
      </div>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex justify-end gap-2">
        <button onClick={() => onEdit(subject)} className="p-2 text-zinc-400 hover:text-zinc-900 rounded-lg transition-colors">
          <Edit3 size={16} />
        </button>
        <button onClick={() => onDelete(subject.id)} className="p-2 text-zinc-400 hover:text-red-600 rounded-lg transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </td>
  </tr>
));
SubjectRow.displayName = "SubjectRow";

export default function SubjectManagement() {
  const [subjects, setSubjects] = useState(NIGERIAN_SUBJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({ title: "", category: "Core", classes: [] as string[] });

  const toggleClassSelection = (cls: string) => {
    setFormData(prev => ({
      ...prev,
      classes: prev.classes.includes(cls) 
        ? prev.classes.filter(c => c !== cls) 
        : [...prev.classes, cls]
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubject) {
      setSubjects(prev => prev.map(s => s.id === editingSubject.id ? { ...s, ...formData } : s));
    } else {
      setSubjects(prev => [{ id: Date.now(), ...formData }, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredSubjects = useMemo(() => {
    return subjects.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [subjects, searchTerm]);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white min-h-screen text-zinc-900">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Curriculum & Subjects</h1>
          <p className="text-sm text-zinc-500">Manage the list of subjects and their class assignments.</p>
        </div>
        <button 
          onClick={() => { setEditingSubject(null); setFormData({ title: "", category: "Core", classes: [] }); setIsModalOpen(true); }}
          className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> New Subject
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <input 
          type="text" 
          placeholder="Search subjects (e.g. Mathematics)..." 
          className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
            <tr>
              <th className="px-6 py-4">Subject Name</th>
              <th className="px-6 py-4">Offering Classes</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
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

      {/* MODAL: CREATE/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl border border-zinc-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingSubject ? "Edit Subject" : "Create Subject"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-900"><X size={20}/></button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 block">Subject Title</label>
                <input 
                  required
                  placeholder="e.g. Further Mathematics"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-medium outline-none focus:border-zinc-900"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 block">Category</label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-medium outline-none appearance-none focus:border-zinc-900"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16}/>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Assign to Classes</label>
                <div className="grid grid-cols-3 gap-2">
                  {AVAILABLE_CLASSES.map(cls => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => toggleClassSelection(cls)}
                      className={`py-2 px-1 rounded-lg text-[10px] font-bold border transition-all ${
                        formData.classes.includes(cls) 
                          ? "bg-zinc-900 border-zinc-900 text-white" 
                          : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-400"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg">
                {editingSubject ? "Save Changes" : "Create Subject"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/10 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-xl border border-zinc-100">
            <AlertCircle size={32} className="mx-auto text-zinc-300 mb-3" />
            <h3 className="font-bold text-zinc-900">Remove Subject?</h3>
            <p className="text-xs text-zinc-500 mt-1 mb-6">This will remove the subject from all class records.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 bg-zinc-100 rounded-lg text-xs font-bold">Cancel</button>
              <button onClick={() => { setSubjects(subjects.filter(s => s.id !== deleteConfirm)); setDeleteConfirm(null); }} className="flex-1 py-2 bg-red-600 text-white rounded-lg text-xs font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}