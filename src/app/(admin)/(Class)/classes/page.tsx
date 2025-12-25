"use client";
import React, { useState, useMemo, useCallback } from "react";
import { 
  Search, Plus, Users, MoreVertical, 
  Trash2, Edit3, Hash, ShieldCheck, 
  X, AlertCircle, ChevronDown
} from "lucide-react";

// Move static data outside to prevent re-calculation on every render
const ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

// --- MEMOIZED SUB-COMPONENTS ---

const StatCard = React.memo(({ icon, label, value }: any) => (
  <div className="bg-white p-5 rounded-xl border border-zinc-200 flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-500 border border-zinc-100">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider leading-none mb-1">{label}</p>
      <p className="text-xl font-bold text-zinc-900">{value}</p>
    </div>
  </div>
));
StatCard.displayName = "StatCard";

const TableRow = React.memo(({ item, onEdit, onDelete }: any) => (
  <tr className="hover:bg-zinc-50/50 transition-colors border-b border-zinc-100 last:border-0">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
          {item.code}
        </div>
        <span className="text-sm font-semibold text-zinc-800">{item.name} {item.code}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-sm text-zinc-600">{item.teacher || "Unassigned"}</td>
    <td className="px-6 py-4 text-sm text-zinc-500">{item.students} Students</td>
    <td className="px-6 py-4 text-right">
      <div className="flex justify-end gap-1">
        <button onClick={() => onEdit(item)} className="p-2 text-zinc-400 hover:text-zinc-900 rounded-md transition-colors">
          <Edit3 size={16} />
        </button>
        <button onClick={() => onDelete(item.id)} className="p-2 text-zinc-400 hover:text-red-600 rounded-md transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </td>
  </tr>
));
TableRow.displayName = "TableRow";

// --- MAIN COMPONENT ---

export default function Classes() {
  const [classes, setClasses] = useState([
    { id: 1, name: "JSS 2", code: "A", teacher: "Abraham Smith", students: 32 },
    { id: 2, name: "JSS 2", code: "B", teacher: "Deborah Cole", students: 28 },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", code: "A", teacher: "" });

  // Callbacks to prevent re-creating functions on every render
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingClass(null);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClass) {
      setClasses(prev => prev.map(c => c.id === editingClass.id ? { ...c, ...formData } : c));
    } else {
      setClasses(prev => [{ id: Date.now(), ...formData, students: 0 }, ...prev]);
    }
    closeModal();
  };

  const filteredClasses = useMemo(() => {
    return classes.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [classes, searchTerm]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white min-h-screen text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Classes</h1>
          <p className="text-xs text-zinc-500">Manage academic levels and arm assignments</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Class
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={<Hash size={18}/>} label="Total" value={classes.length} />
        <StatCard icon={<Users size={18}/>} label="Students" value="60" />
        <StatCard icon={<ShieldCheck size={18}/>} label="Staff" value={classes.length} />
      </div>

      {/* Toolbar */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
        <input 
          type="text" 
          placeholder="Filter classes..." 
          className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-zinc-400 transition-all"
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <div className="border border-zinc-200 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50 text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
            <tr>
              <th className="px-6 py-3">Class & Arm</th>
              <th className="px-6 py-3">Teacher</th>
              <th className="px-6 py-3">Population</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((item) => (
              <TableRow 
                key={item.id} 
                item={item} 
                onEdit={(cls: any) => { setEditingClass(cls); setFormData(cls); setIsModalOpen(true); }}
                onDelete={setDeleteConfirm}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-[2px]">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-xl border border-zinc-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">{editingClass ? "Edit Class" : "New Class"}</h2>
              <button onClick={closeModal} className="text-zinc-400 hover:text-zinc-900"><X size={20}/></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Class Name</label>
                <input 
                  required
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-zinc-900"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. JSS 3"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Select Arm</label>
                <div className="relative">
                  <select 
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none appearance-none focus:border-zinc-900"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                  >
                    {ALPHABET.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14}/>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Class Teacher</label>
                <input 
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-zinc-900"
                  value={formData.teacher}
                  onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                  placeholder="Full Name"
                />
              </div>

              <button className="w-full py-2.5 bg-zinc-900 text-white rounded-lg font-bold text-sm hover:bg-zinc-800 transition-colors mt-2">
                Save Class Arm
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
          <div className="bg-white rounded-xl p-6 max-w-xs w-full shadow-xl border border-zinc-200 text-center">
            <AlertCircle size={32} className="mx-auto text-zinc-300 mb-3" />
            <h3 className="font-bold">Confirm Deletion</h3>
            <p className="text-xs text-zinc-500 mt-1 mb-6">Are you sure? This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 bg-zinc-100 rounded-lg text-xs font-bold">Cancel</button>
              <button onClick={() => { if(deleteConfirm) setClasses(classes.filter(c => c.id !== deleteConfirm)); setDeleteConfirm(null); }} className="flex-1 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}