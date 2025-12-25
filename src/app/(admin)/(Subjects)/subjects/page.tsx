"use client";
import React, { useState, useMemo, useCallback } from "react";
import { 
  Search, Plus, BookOpen, Trash2, 
  Edit3, X, AlertCircle, UserCheck,
  ChevronDown, Check, Users
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_TEACHERS = [
  "Dr. Alexander Marcus", 
  "Mrs. Deborah Cole", 
  "Mr. Abraham Smith", 
  "Prof. Sarah Jenkins",
  "Engr. Victor Okafor"
];

const INITIAL_SUBJECTS = [
  { 
    id: 1, 
    title: "Mathematics", 
    category: "Core", 
    classes: ["JSS 1", "JSS 2", "SSS 1"], 
    teachers: ["Mr. Abraham Smith", "Dr. Alexander Marcus"] 
  },
  { 
    id: 2, 
    title: "English Language", 
    category: "Core", 
    classes: ["JSS 1", "JSS 2", "SSS 3"], 
    teachers: ["Prof. Sarah Jenkins"] 
  },
  { 
    id: 3, 
    title: "Biology", 
    category: "Science", 
    classes: ["SSS 1", "SSS 2"], 
    teachers: ["Mrs. Deborah Cole", "Engr. Victor Okafor"] 
  },
];

const AVAILABLE_CLASSES = ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"];
const CATEGORIES = ["Core", "Science", "Arts", "Commercial", "General"];

// --- MEMOIZED ROW COMPONENT ---
const SubjectRow = React.memo(({ subject, onEdit, onDelete }: any) => (
  <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors group">
    <td className="px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center border border-zinc-800 shadow-sm">
          <BookOpen size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-zinc-800">{subject.title}</p>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{subject.category}</p>
        </div>
      </div>
    </td>

    {/* Classes Column */}
    <td className="px-6 py-5">
      <div className="flex flex-wrap gap-1 max-w-[180px]">
        {subject.classes.map((cls: string) => (
          <span key={cls} className="px-2 py-0.5 bg-zinc-100 text-zinc-500 rounded text-[10px] font-bold border border-zinc-200">
            {cls}
          </span>
        ))}
      </div>
    </td>

    {/* TEACHERS NAME COLUMN */}
    <td className="px-6 py-5">
      <div className="flex flex-col gap-1.5">
        {subject.teachers.length > 0 ? (
          subject.teachers.map((t: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-zinc-600">{t}</span>
            </div>
          ))
        ) : (
          <span className="text-xs text-zinc-400 italic">No teacher assigned</span>
        )}
      </div>
    </td>

    <td className="px-6 py-5 text-right">
      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [formData, setFormData] = useState({ 
    title: "", 
    category: "Core", 
    classes: [] as string[], 
    teachers: [] as string[] 
  });

  const toggleSelection = (item: string, field: 'classes' | 'teachers') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item) 
        ? prev[field].filter(i => i !== item) 
        : [...prev[field], item]
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
    return subjects.filter(s => 
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.teachers.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [subjects, searchTerm]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white min-h-screen text-zinc-900">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subject Registry</h1>
          <p className="text-sm text-zinc-500">Configure curriculum subjects and link teaching faculty.</p>
        </div>
        <button 
          onClick={() => { setEditingSubject(null); setFormData({ title: "", category: "Core", classes: [], teachers: [] }); setIsModalOpen(true); }}
          className="bg-zinc-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-lg active:scale-95"
        >
          <Plus size={18} /> New Subject
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by subject or teacher name..." 
          className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:border-zinc-900 transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 text-[10px] uppercase font-bold text-zinc-400 tracking-[0.15em] border-b border-zinc-100">
            <tr>
              <th className="px-6 py-4">Course Details</th>
              <th className="px-6 py-4">Classes</th>
              <th className="px-6 py-4">Assigned Teachers</th>
              <th className="px-6 py-4 text-right">Settings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filteredSubjects.length > 0 ? filteredSubjects.map(s => (
              <SubjectRow 
                key={s.id} 
                subject={s} 
                onEdit={(subj: any) => { setEditingSubject(subj); setFormData(subj); setIsModalOpen(true); }}
                onDelete={setDeleteConfirm}
              />
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center">
                  <p className="text-zinc-400 italic text-sm">No records match your query.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/10 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl border border-zinc-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8 border-b border-zinc-50 pb-4">
              <h2 className="text-xl font-bold">{editingSubject ? "Update Subject" : "Register New Subject"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-900 p-2"><X size={24}/></button>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block ml-1">Subject Title</label>
                  <input required className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-semibold outline-none focus:border-zinc-900" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Physics" />
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block ml-1">Category</label>
                  <select className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-semibold outline-none appearance-none cursor-pointer" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block ml-1">Select Levels</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_CLASSES.map(cls => (
                    <button key={cls} type="button" onClick={() => toggleSelection(cls, 'classes')} className={`py-2 px-4 rounded-xl text-[11px] font-bold border transition-all ${formData.classes.includes(cls) ? "bg-zinc-900 border-zinc-900 text-white" : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400 shadow-sm"}`}>
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block ml-1">Assign Teachers</label>
                <div className="space-y-1.5 border border-zinc-100 rounded-[1.5rem] p-3 max-h-48 overflow-y-auto bg-zinc-50/30 shadow-inner">
                  {MOCK_TEACHERS.map(teacher => (
                    <div 
                      key={teacher} 
                      onClick={() => toggleSelection(teacher, 'teachers')}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${formData.teachers.includes(teacher) ? "bg-zinc-900 text-white shadow-lg" : "hover:bg-zinc-100 text-zinc-600"}`}
                    >
                      <span className="text-xs font-bold">{teacher}</span>
                      {formData.teachers.includes(teacher) ? <Check size={14} /> : <Plus size={14} className="text-zinc-300" />}
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-4.5 bg-zinc-900 text-white rounded-[1.5rem] font-bold text-sm hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-100 active:scale-[0.98]">
                {editingSubject ? "Commit Changes" : "Create Subject Record"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}