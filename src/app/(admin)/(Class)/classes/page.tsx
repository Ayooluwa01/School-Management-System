"use client";
import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, Plus, Users, Trash2, Edit3, 
  Hash, X, AlertCircle, ChevronDown, 
  LayoutGrid, ArrowRight, GraduationCap, BookOpen
} from "lucide-react";
import { useClasses, useSchoolProfile } from "../../../../../hooks/useSchool";

const ARM_OPTIONS = ["A", "B", "C", "D", "E", "F", "G","H","I","J","K","L","M","N"];

// --- COMPONENTS ---

const TabItem = React.memo(({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    type="button"
    className={`px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm font-bold transition-all duration-200 border-b-2 relative ${
      active ? "border-indigo-600 text-indigo-900" : "border-transparent text-zinc-400 hover:text-zinc-600"
    }`}
  >
    {label}
    {active && <span className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-indigo-600" />}
  </button>
));
TabItem.displayName = "TabItem";

const SectionHeader = React.memo(({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
  <div className="mb-6 md:mb-8">
    <div className="flex items-start gap-3 md:gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-indigo-600 border border-indigo-100/50 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-base md:text-lg font-bold text-zinc-900 mb-1">{title}</h2>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  </div>
));
SectionHeader.displayName = "SectionHeader";

const MetricCard = React.memo(({ icon, label, value, gradient }: any) => (
  <div className="relative overflow-hidden bg-white p-4 md:p-5 rounded-2xl border border-zinc-200 hover:border-indigo-200 transition-all group">
    <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity`}></div>
    <div className="relative flex items-center gap-3 md:gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-xl md:text-2xl font-bold text-zinc-900 leading-none">{value}</p>
      </div>
    </div>
  </div>
));
MetricCard.displayName = "MetricCard";

const InputGroup = React.memo(({ label, value, onChange, placeholder, type = "text", options, required }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wide pl-0.5">
      {label}
    </label>
    <div className="relative group">
      {type === "select" ? (
        <>
          <select 
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled>Select {label}</option>
            {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-focus-within:text-indigo-500" size={16} />
        </>
      ) : (
        <input 
          type={type} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all placeholder:text-zinc-300" 
        />
      )}
    </div>
  </div>
));
InputGroup.displayName = "InputGroup";

const EmptyState = React.memo(({ title, description, actionLabel, onAction, icon }: any) => (
  <div className="flex flex-col items-center justify-center py-16 md:py-20 px-4">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-indigo-100 rounded-full blur-2xl opacity-20"></div>
      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex items-center justify-center text-indigo-400">
        {icon}
      </div>
    </div>
    <h3 className="text-base md:text-lg font-bold text-zinc-900 mb-2">{title}</h3>
    <p className="text-xs md:text-sm text-zinc-500 mb-6 max-w-sm text-center leading-relaxed">{description}</p>
    
  </div>
));
EmptyState.displayName = "EmptyState";

// MAIN COMPONENT 

export default function ClassManagement() {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<any | null>(null);
  const [formData, setFormData] = useState({ class_name: "", arm: "",classCode:"" });
  const { data: school } = useSchoolProfile();
const { classes, isLoading, createClass, updateClass, deleteClass } = useClasses();

 
  const filteredClasses = useMemo(() => {
    if (!searchTerm) return classes;

    return classes.filter((cls) =>
      cls.class_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.arm?.toLowerCase().includes(searchTerm.toLowerCase())

    );
  }, [searchTerm, classes]);

  const openModal = (cls?: any) => {
    if (cls) {
      setEditingClass(cls);
      setFormData({ 
        class_name: cls.class_name, 
        arm: cls.arm || "A",
    classCode:`${cls.class_name-cls.arm}`
      });
    } else {
      setEditingClass(null);
      setFormData({ class_name: "", arm: "",classCode:"" });
    }
    setIsModalOpen(true);
  };

const handleSave = () => {
  if (!formData.class_name) return;

  const payload = {
    school_id: school.school_id,
    className: formData.class_name,
    arm: formData.arm,
    classCode: `${formData.class_name}-${formData.arm}`,
  };

  if (editingClass) {
    updateClass.mutate({
      id: editingClass.class_id,
      payload,
    });
  } else {
    createClass.mutate(payload);
  }

  setIsModalOpen(false);
  setEditingClass(null);
  setFormData({ class_name: "", arm: "", classCode: "" });
};

const handleDelete = () => {
  if (!deleteConfirm) return;
  deleteClass.mutate(deleteConfirm);
  setDeleteConfirm(null)
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 text-zinc-900 font-sans selection:bg-indigo-100">
      
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600 rounded-lg blur-md opacity-20"></div>
              <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-base">
                <GraduationCap size={18} className="md:hidden" />
                <span className="hidden md:inline">CM</span>
              </div>
            </div>
            <div>
              <h1 className="text-sm md:text-base font-bold text-zinc-900 tracking-tight leading-none">Class Manager</h1>
              <p className="text-[10px] md:text-xs font-medium text-zinc-500 pt-0.5 hidden sm:block">Academic Structure</p>
            </div>
          </div>
          <button 
            onClick={() => openModal()}
            className="px-3 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-xs md:text-sm font-semibold hover:from-indigo-700 hover:to-indigo-800 active:scale-95 transition-all flex items-center gap-1.5 md:gap-2 rounded-lg"
          >
            <Plus size={16} /> <span className="hidden sm:inline">Add Class</span><span className="sm:hidden">Add</span>
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide">
          <TabItem active={activeSection === "overview"} label="Overview" onClick={() => setActiveSection("overview")} />
          <TabItem active={activeSection === "manage"} label="Manage Classes" onClick={() => setActiveSection("manage")} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-10">
        <main className="min-h-[400px]">

          {/* SECTION: OVERVIEW */}
          {activeSection === 'overview' && (
            <section className="animate-in fade-in duration-500">
              <SectionHeader icon={<LayoutGrid size={20}/>} title="Academic Summary" subtitle="Overview of your school's class structure and student distribution." />
              
              {classes.length === 0 ? (
                <EmptyState 
                  icon={<BookOpen size={32} />}
                  title="No Classes Yet"
                  description="Start building your academic structure by creating your first class. Classes help organize students into manageable groups."
                  actionLabel="Create First Class"
                  onAction={() => openModal()}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <MetricCard 
                    icon={<Hash size={18}/>} 
                    label="Total Classes" 
                    value={classes.length}
                    gradient="bg-gradient-to-br from-indigo-500 to-purple-500"
                  />
                  <MetricCard 
                    icon={<Users size={18}/>} 
                    label="Total Students" 
                    value={0}
                    gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
                  />
                </div>
              )}
            </section>
          )}

          {/* SECTION: MANAGE TABLE */}
          {activeSection === 'manage' && (
            <section className="animate-in fade-in duration-500">
              <SectionHeader icon={<Users size={20}/>} title="Class Records" subtitle="View, edit, and manage all class divisions in your school." />
              
              {classes.length === 0 ? (
                <EmptyState 
                  icon={<BookOpen size={32} />}
                  title="No Classes Found"
                  description="Get started by creating your first class. You can add multiple arms and assign teachers later."
                  actionLabel="Create Class"
                  onAction={() => openModal()}
                />
              ) : (
                <>
                  <div className="mb-5 md:mb-6 relative">
                    <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search by class name or arm..." 
                      className="w-full pl-9 md:pl-11 pr-3 md:pr-4 py-2.5 md:py-3 bg-white border border-zinc-200 rounded-lg text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {filteredClasses.length === 0 ? (
                    <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center">
                      <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Search size={20} className="text-zinc-400" />
                      </div>
                      <p className="text-sm font-semibold text-zinc-900 mb-1">No matches found</p>
                      <p className="text-xs text-zinc-500">Try adjusting your search terms</p>
                    </div>
                  ) : (
                    <>
                      {/* Mobile Card View */}
                      <div className="md:hidden space-y-3">
                        {filteredClasses.map((item) => (
                          <div key={`class-card-${item.class_id}`} className="bg-white border border-zinc-200 rounded-xl p-4 hover:border-indigo-200 transition-all">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm">
                                  {item.arm?.charAt(0) || "?"}
                                </div>
                                <div>
                                  <p className="font-bold text-sm text-zinc-800">{item.class_name}</p>
                                  <p className="text-[10px] text-zinc-500 font-medium">Arm: {item.arm || "N/A"}</p>
                                </div>
                              </div>
                              <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-[9px] font-bold uppercase border border-emerald-200">Active</span>
                            </div>
                            <div className="flex gap-2 pt-3 border-t border-zinc-100">
                              <button 
                                onClick={() => openModal(item)} 
                                className="flex-1 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                              >
                                <Edit3 size={14} /> Edit
                              </button>
                              <button 
                                onClick={() => setDeleteConfirm(item)} 
                                className="flex-1 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Desktop Table View */}
                      <div className="hidden md:block bg-white border border-zinc-200 rounded-xl overflow-hidden">
                        <table className="w-full text-left">
                          <thead className="bg-gradient-to-r from-zinc-50 to-slate-50 border-b border-zinc-200">
                            <tr>
                              <th className="px-5 py-3.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Class Details</th>
                              <th className="px-5 py-3.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Code</th>
                              <th className="px-5 py-3.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                              <th className="px-5 py-3.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100">
                            {filteredClasses.map((item) => (
                              <tr key={`class-row-${item.class_id}`} className="group hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-transparent transition-all">
                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xs">
                                      {item.arm?.charAt(0) || "?"}
                                    </div>
                                    <div>
                                      <p className="font-bold text-sm text-zinc-800">{item.class_name}</p>
                                      <p className="text-[10px] text-zinc-500 font-medium">Arm: {item.arm || "N/A"}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-4">
                                  <span className="font-mono text-xs text-zinc-600 bg-zinc-100 px-2 py-1 rounded">{item.class_code || "N/A"}</span>
                                </td>
                                <td className="px-5 py-4">
                                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border border-emerald-200">Active</span>
                                </td>
                                <td className="px-5 py-4 text-right">
                                  <div className="flex justify-end gap-1.5">
                                    <button 
                                      onClick={() => openModal(item)} 
                                      className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                      title="Edit class"
                                    >
                                      <Edit3 size={15} />
                                    </button>
                                    <button 
                                      onClick={() => setDeleteConfirm(item)} 
                                      className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                      title="Delete class"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              )}
            </section>
          )}

        </main>
      </div>

      {/* MODAL (CREATE/EDIT) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 md:p-8 border border-zinc-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <div>
                <h2 className="text-base md:text-lg font-bold text-zinc-900">{editingClass ? "Edit Class" : "New Class"}</h2>
                <p className="text-[10px] text-zinc-500 mt-0.5">Fill in the class details below</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-900 bg-zinc-50 p-1.5 rounded-lg transition-colors">
                <X size={18}/>
              </button>
            </div>
            <div className="space-y-4 md:space-y-5">
              <InputGroup 
                label="Class Name" 
                value={formData.class_name} 
                onChange={(e: any) => setFormData({...formData, class_name: e.target.value})} 
                placeholder="e.g. JSS 3, SS 1" 
                required 
              />
              <InputGroup 
                label="Class Arm" 
                type="select" 
                options={ARM_OPTIONS} 
                value={formData.arm} 
                onChange={(e: any) => setFormData({...formData, arm: e.target.value})} 
                required 
              />
              
              <button 
                onClick={handleSave}
                disabled={isLoading || !formData.class_name} 
                className="w-full py-3 md:py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-bold text-xs md:text-sm hover:from-indigo-700 hover:to-indigo-800 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 active:scale-95"
              >
                {isLoading ? "Processing..." : (editingClass ? "Update Class" : "Create Class")} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-xs w-full border border-zinc-100 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="font-bold text-zinc-900 text-base md:text-lg">Delete Class?</h3>
            <p className="text-xs md:text-sm text-zinc-500 mt-2 mb-6 md:mb-8 leading-relaxed">This action cannot be undone. The class record will be permanently removed.</p>
            <div className="flex gap-2 md:gap-3">
              <button 
                onClick={() => setDeleteConfirm(null)} 
                className="flex-1 py-2.5 md:py-3 bg-zinc-100 text-zinc-700 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="flex-1 py-2.5 md:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-xs font-bold hover:from-red-700 hover:to-red-800 transition-all active:scale-95"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}