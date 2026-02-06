"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { 
  Search, Plus, BookOpen, Trash2, 
  Edit3, X, AlertCircle, ChevronDown, 
  Layers, LayoutGrid, ArrowRight,
  Check, Users
} from "lucide-react";
import api from "../../../../../libs/axios";
import { useClasses, useSubjects, } from "../../../../../hooks/useSchool";
// Types
export interface Subject {
  is_core: any;
  subject_id: number;
  subject_name: string;
  category: string;
  subject_code: string;
  assigned_classes?: string[];
  class_ids?: number[];
}

export interface SubjectPayload {
  subjectName: string;
  category: string;
  subjectCode: string;
  classIds: number[];
}

interface FormData {
  title: string;
  category: string;
  classIds: number[];
}

// Constants
const CATEGORIES = ["Core", "Science", "Arts", "Commercial", "General", "Vocational", "Others"] as const;

// Subcomponents
const TabItem = React.memo(({ label, active, onClick }: { 
  label: string; 
  active: boolean; 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    type="button"
    className={`px-6 py-3 text-sm font-bold transition-all duration-200 border-b-2 relative ${
      active 
        ? "border-indigo-600 text-indigo-900" 
        : "border-transparent text-zinc-400 hover:text-zinc-600"
    }`}
  >
    {label}
    {active && (
      <span className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
    )}
  </button>
));
TabItem.displayName = "TabItem";

const MetricCard = React.memo(({ icon, label, value }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number 
}) => (
  <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-all group">
    <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-zinc-900 leading-none">
        {value}
      </p>
    </div>
  </div>
));
MetricCard.displayName = "MetricCard";

// Main Component
export default function SubjectManagement() {
  // State
  const [activeSection, setActiveSection] = useState<"overview" | "manage">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({ 
    title: "", 
    category: "Core", 
    classIds: [] 
  });

  // Hooks
  const { classes } = useClasses();
const {registerSubject,subjects,updateSubject,deleteSubject}=useSubjects()
  // Data Fetching
  // const fetchSubjects = useCallback(async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await api.get("/subjects");
  //     setSubjects(response.data);
  //   } catch (err) {
  //     console.error("Error fetching subjects:", err);
  //     setError("Failed to load subjects. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  // useEffect(() => { 
  //   fetchSubjects(); 
  // }, [fetchSubjects]);

  // Handlers
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload = {
      subjectName: formData.title.trim(),
      category: formData.category,
      subjectCode: formData.title.trim().toUpperCase().replace(/\s+/g, '_'),
      classIds: formData.classIds 
    };



    try {
      if (editingSubject) {
await updateSubject.mutateAsync({
          subjectId: editingSubject.subject_id,
          payload: payload
        });
      } else {
registerSubject.mutateAsync(payload)

      }
      handleCloseModal();
    } catch (err) {
      console.error("Save error:", err);
      setError("Error Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

const handleDelete = async () => {
    if (!deleteConfirm) return;
    
    setIsLoading(true);
    try {
      // Use the hook instead of direct api call
      await deleteSubject.mutateAsync(deleteConfirm);
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete subject. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleClassSelection = useCallback((id: number) => {
    setFormData(prev => ({
      ...prev,
      classIds: prev.classIds.includes(id) 
        ? prev.classIds.filter(c => c !== id) 
        : [...prev.classIds, id]
    }));
  }, []);

  const handleOpenModal = useCallback((subject?: Subject) => {
    if (subject) {
      setEditingSubject(subject);
      setFormData({
        title: subject.subject_name,
        category: subject.category,
        classIds: Array.isArray(subject.class_ids) ? subject.class_ids : []
      });
    } else {
      setEditingSubject(null);
      setFormData({ title: "", category: "Core", classIds: [] });
    }
    setIsModalOpen(true);
    setError(null);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingSubject(null);
    setFormData({ title: "", category: "Core", classIds: [] });
    setError(null);
  }, []);

  // Computed Values
  const filteredSubjects = useMemo(() => {
    return subjects.filter(s => 
      s.subject_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [subjects, searchTerm]);

  const averageEnrollment = useMemo(() => {
    if (subjects.length === 0) return "0%";
    const totalClasses = subjects.reduce((acc, s) => 
      acc + (s.assigned_classes?.length || 0), 0
    );
    const avg = (totalClasses / subjects.length / (classes.length || 1)) * 100;
    return `${avg.toFixed(1)}%`;
  }, [subjects, classes]);

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-zinc-900 font-sans selection:bg-indigo-100">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
              SM
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 tracking-tight leading-none">
                Curriculum
              </h1>
              <p className="text-xs font-medium text-zinc-500 pt-1 hidden sm:block">
                Subject Repository
              </p>
            </div>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-all flex items-center gap-2 rounded-xl shadow-xl shadow-zinc-200"
          >
            <Plus size={18} /> 
            <span className="hidden sm:inline">New Subject</span>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex gap-2">
          <TabItem 
            active={activeSection === "overview"} 
            label="Catalog Overview" 
            onClick={() => setActiveSection("overview")} 
          />
          <TabItem 
            active={activeSection === "manage"} 
            label="Manage Subjects" 
            onClick={() => setActiveSection("manage")} 
          />
        </div>
      </header>

      {/* Error Display */}
      {error && (
        <div className="max-w-6xl mx-auto px-6 md:px-8 pt-4">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle size={18} />
            <span className="text-sm font-medium">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <main className="min-h-[500px]">

          {/* Overview Section */}
          {activeSection === 'overview' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start gap-5 mb-8 pb-6 border-b border-zinc-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
                  <LayoutGrid size={24}/>
                </div>
                <div className="pt-1">
                  <h2 className="text-xl font-bold text-zinc-900">Curriculum Summary</h2>
                  <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                    Overview of active learning modules and enrollment across categories.
                  </p>
                </div>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <MetricCard 
                  icon={<BookOpen size={20}/>} 
                  label="Total Subjects" 
                  value={subjects.length} 
                />
                <MetricCard 
                  icon={<Users size={20}/>} 
                  label="Avg. Enrollment" 
                  value={averageEnrollment} 
                />
                <MetricCard 
                  icon={<Layers size={20}/>} 
                  label="Categories" 
                  value={CATEGORIES.length} 
                />
              </div>

              {/* Compliance Badge */}
              <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100/50">
                  <Check size={20} />
                </div>
                <div>
                  <p className="text-sm text-emerald-900 font-bold">WASSCE Compliant</p>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Your subject list matches the standard 2024 Senior Secondary curriculum.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Manage Section */}
          {activeSection === 'manage' && (
            <div className="animate-in fade-in duration-500">
              {/* Search */}
              <div className="mb-6 relative">
                <Search 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" 
                  size={18} 
                />
                <input 
                  type="text" 
                  placeholder="Search subjects..." 
                  className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Table */}
              <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-zinc-50 border-b border-zinc-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase">
                        Subject
                      </th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase">
                        Classes
                      </th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {isLoading && subjects.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-8 py-12 text-center text-zinc-400">
                          Loading subjects...
                        </td>
                      </tr>
                    ) : filteredSubjects.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-8 py-12 text-center text-zinc-400">
                          {searchTerm ? "No subjects found matching your search" : "No subjects yet"}
                        </td>
                      </tr>
                    ) : (
                      filteredSubjects.map(subject => (
                        <tr 
                          key={subject.subject_id} 
                          className="group hover:bg-zinc-50/50 transition-colors"
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-md">
                                <BookOpen size={18} />
                              </div>
                              <div>
                                <p className="font-bold text-zinc-800">
                                  {subject.subject_name}
                                </p>
                                <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                                  {subject.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {subject.assigned_classes?.length ? (
                                subject.assigned_classes.map((className, index) => (
                                  <span 
                                    key={index} 
                                    className="px-2 py-0.5 bg-zinc-100 text-[9px] font-bold rounded-md text-zinc-600 border border-zinc-200"
                                  >
                                    {className}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-zinc-400">No classes assigned</span>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleOpenModal(subject)} 
                                className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Edit subject"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button 
                                onClick={() => setDeleteConfirm(subject.subject_id)} 
                                className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete subject"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-zinc-900">
                {editingSubject ? "Edit Subject" : "New Subject"}
              </h2>
              <button 
                onClick={handleCloseModal} 
                className="text-zinc-400 hover:text-zinc-900 bg-zinc-50 p-2 rounded-full transition-colors"
                disabled={isLoading}
              >
                <X size={18}/>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Subject Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">
                  Subject Title
                </label>
                <input 
                  required 
                  placeholder="e.g. Physics"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium focus:border-indigo-500 focus:bg-white transition-all outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  disabled={isLoading}
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">
                  Category
                </label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium appearance-none outline-none focus:border-indigo-500"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    disabled={isLoading}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" 
                    size={16}
                  />
                </div>
              </div>

              {/* Custom Category Input */}
              {formData.category === 'Others' && (
                <div className="space-y-1.5 animate-in zoom-in-95 duration-200">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">
                    Custom Category Name
                  </label>
                  <input 
                    placeholder="e.g. Technical Studies"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium focus:border-indigo-500 focus:bg-white transition-all outline-none"
                    disabled={isLoading}
                  />
                </div>
              )}

              {/* Class Assignment */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">
                  Assign to Classes
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto pr-1">
                  {classes.map(cls => (
                    <button
                      key={cls.class_id} 
                      type="button"
                      onClick={() => toggleClassSelection(cls.class_id)}
                      disabled={isLoading}
                      className={`py-2 rounded-xl text-[10px] font-bold border transition-all ${
                        formData.classIds.includes(cls.class_id) 
                          ? "bg-zinc-900 border-zinc-900 text-white shadow-md" 
                          : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-400"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {cls.class_code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isLoading || !formData.title.trim()} 
                className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-sm hover:bg-zinc-800 shadow-xl shadow-zinc-200 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : editingSubject ? "Save Changes" : "Create Subject"} 
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={28} />
            </div>
            <h3 className="font-bold text-zinc-900 text-lg">Remove Subject?</h3>
            <p className="text-sm text-zinc-500 mt-2 mb-8">
              This will de-register this subject from all associated student report cards.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteConfirm(null)} 
                className="flex-1 py-3 bg-zinc-50 text-zinc-600 rounded-xl text-xs font-bold hover:bg-zinc-100 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="flex-1 py-3 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-colors disabled:opacity-50"
                disabled={isLoading}
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