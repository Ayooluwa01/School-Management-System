"use client";
import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, Plus, Users, Trash2, Edit3, 
  Hash, X, AlertCircle, ChevronDown, 
  LayoutGrid, ArrowRight
} from "lucide-react";
import api from "../../../../../libs/axios"; 

const ARM_OPTIONS = ["A", "B", "C", "D", "Science", "Art", "Commercial"];

// --- COMPONENTS ---

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

const SectionHeader = React.memo(({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
  <div className="flex items-start gap-5 mb-8 pb-6 border-b border-zinc-100">
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
      {icon}
    </div>
    <div className="pt-1">
      <h2 className="text-xl font-bold text-zinc-900">{title}</h2>
      <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{subtitle}</p>
    </div>
  </div>
));
SectionHeader.displayName = "SectionHeader";

const MetricCard = React.memo(({ icon, label, value }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-all">
      <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-zinc-900 leading-none">{value}</p>
      </div>
    </div>
));
MetricCard.displayName = "MetricCard";

const InputGroup = React.memo(({ label, value, onChange, placeholder, type = "text", options, required }: any) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        {type === "select" ? (
          <>
            <select 
              value={value}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>Select {label}</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-focus-within:text-indigo-500" size={16} />
          </>
        ) : (
          <input 
            type={type} value={value} onChange={onChange} placeholder={placeholder}
            className="w-full px-4 py-3 rounded-xl bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all placeholder:text-zinc-300" 
          />
        )}
      </div>
    </div>
));
InputGroup.displayName = "InputGroup";

// MAIN COMPONENT 

export default function ClassManagement() {
  const [activeSection, setActiveSection] = useState("overview");
  const [classes, setClasses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({ name: "", code: "A" });

  const fetchClasses = async () => {
    try {
      const response = await api.get("/class/");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const filteredClasses = useMemo(() => {
    if (!searchTerm) return classes;
    return classes.filter((cls) =>
      cls.class_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, classes]);

  const openModal = (cls?: any) => {
    if (cls) {
      setEditingClass(cls);
      setFormData({ 
        name: cls.class_name, 
        code: cls.arm
      });
    } else {
      setEditingClass(null);
      setFormData({ name: "", code: "A" });
    }
    setIsModalOpen(true);
  };

  // Create & Update Logic
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      className: formData.name,
      arm: formData.code,
      classCode:`${formData.name}-${formData.code}`
    };

    try {
      if (editingClass) {
        await api.patch(`/class/update/${editingClass.class_id}`, payload);
      } else {
        await api.post("/class/createClass", payload);
      }
      await fetchClasses();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save class:", error);
      alert("Failed to save class. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setIsLoading(true);
    try {
      await api.delete(`/class/delete/${deleteConfirm}`);
      await fetchClasses();
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete class:", error);
      alert("Failed to delete. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-zinc-900 font-sans selection:bg-indigo-100">
      
      {/*  HEADER --- */}
      <div className="sticky top-0 z-40 bg-white border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">CM</div>
             <div>
                <h1 className="text-xl font-bold text-zinc-900 tracking-tight leading-none">Class Manager</h1>
                <p className="text-xs font-medium text-zinc-500 pt-1 hidden sm:block">Academic Structure</p>
             </div>
          </div>
          <button 
            onClick={() => openModal()}
            className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-all flex items-center gap-2 rounded-xl shadow-xl shadow-zinc-200"
          >
            <Plus size={18} /> <span className="hidden sm:inline">Add Class</span>
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-8 flex gap-2">
            <TabItem active={activeSection === "overview"} label="Overview" onClick={() => setActiveSection("overview")} />
            <TabItem active={activeSection === "manage"} label="Manage Classes" onClick={() => setActiveSection("manage")} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <main className="min-h-[500px]">

          {/* SECTION: OVERVIEW */}
          {activeSection === 'overview' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionHeader icon={<LayoutGrid size={24}/>} title="Academic Summary" subtitle="Current school population metrics." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <MetricCard icon={<Hash size={20}/>} label="Total Classes" value={classes.length} />
                <MetricCard icon={<Users size={20}/>} label="Total Students" value={classes.reduce((acc, curr) => acc + (curr.student_count || 0), 0)} />
              </div>
            </section>
          )}

          {/* SECTION: MANAGE TABLE */}
          {activeSection === 'manage' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionHeader icon={<Users size={24}/>} title="Class Records" subtitle="Manage specific class divisions." />
              
              <div className="mb-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by class name..." 
                  className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-zinc-50/50 border-b border-zinc-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Identity</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Population</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
{filteredClasses.map((item) => (
  <tr key={`class-row-${item.class_id}`} className="group hover:bg-zinc-50/50 transition-colors">
    <td className="px-8 py-5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-sm shadow-md">
          {item.arm?.charAt(0) || "C"}
        </div>
        <div>
            <p className="font-bold text-zinc-800">{item.class_name}</p>
            <p className="text-xs text-zinc-500 font-medium tracking-wide">Arm: {item.arm}</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-5">
        <span className="bg-zinc-100 text-zinc-600 px-2 py-1 rounded text-[10px] font-black mr-2 uppercase tracking-tighter">Active</span>
    </td>
    <td className="px-8 py-5 text-right">
      <div className="flex justify-end gap-2">
        <button 
          onClick={() => {
            setEditingClass(item);
            setFormData({ 
              name: item.class_name, 
              code: item.arm,
            });
            setIsModalOpen(true);
          }} 
          className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <Edit3 size={16} />
        </button>
        <button onClick={() => setDeleteConfirm(item.class_id)} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </td>
  </tr>
))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        </main>
      </div>

      {/* --- MODAL (CREATE/EDIT) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-zinc-900">{editingClass ? "Edit Class" : "New Class"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-900 bg-zinc-50 p-2 rounded-full transition-colors"><X size={18}/></button>
            </div>
            <form onSubmit={handleSave} className="space-y-5">
              <InputGroup label="Class Name" value={formData.name} onChange={(e: any) => setFormData({...formData, name: e.target.value})} placeholder="e.g. JSS 3" required />
              <InputGroup label="Select Arm" type="select" options={ARM_OPTIONS} value={formData.code} onChange={(e: any) => setFormData({...formData, code: e.target.value})} required />
              
              <button disabled={isLoading} className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-sm hover:bg-zinc-800 shadow-xl shadow-zinc-200 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50">
                {isLoading ? "Processing..." : (editingClass ? "Update Record" : "Create Class")} <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELETE MODAL --- */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-zinc-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full shadow-2xl border border-zinc-100 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><AlertCircle size={28} /></div>
            <h3 className="font-bold text-zinc-900 text-lg">Confirm Delete</h3>
            <p className="text-sm text-zinc-500 mt-2 mb-8 leading-relaxed">This action will remove the class record permanently.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 bg-zinc-50 text-zinc-600 rounded-xl text-xs font-bold hover:bg-zinc-100 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-colors">
                {isLoading ? "..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}