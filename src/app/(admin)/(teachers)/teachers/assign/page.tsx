"use client";
import React, { useState, useMemo } from "react";
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  LayoutGrid, 
  School,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  Filter, 
  ChevronDown
} from "lucide-react";
import { useSubjects, useStaffs, useSubjectAssignments, useClasses } from "../../../../../../hooks/useSchool";

const TabItem = ({ label, active, onClick, icon: Icon }: any) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-lg ${
      active ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-100"
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

export default function TeachingAssignmentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("all"); 
  const [subjectSearch, setSubjectSearch] = useState(""); 
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  const { teachers } = useStaffs();
  const { subjects, fetchAssignedSubjects, assignedIds } = useSubjects(selectedTeacher?.staff_id);
  const { classes = [] } = useClasses();

  const { assignSubject, unassignSubject, isSyncing } = useSubjectAssignments(selectedTeacher?.staff_id);

  const uniqueBaseClasses = useMemo(() => {
    if (!fetchAssignedSubjects.data) return [];
    const data = fetchAssignedSubjects.data as any[]
    const baseNames = data.map((item: any) => {
      return item.class_name.replace(/[A-Z]$/i, '').trim();
    });
    
    return Array.from(new Set(baseNames)).sort();
  }, [fetchAssignedSubjects.data]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t: any) => 
      `${t.surname} ${t.first_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [teachers, searchTerm]);

  const filteredAssignedSubjects = useMemo(() => {
    if (!fetchAssignedSubjects.data) return [];
    
    return fetchAssignedSubjects.data.filter((item: any) => {
      const matchesClass = classFilter === "all" || item.class_name.startsWith(classFilter);
      
      const matchesSubject = item.subject_name.toLowerCase().includes(subjectSearch.toLowerCase()) || 
                             item.subject_code.toLowerCase().includes(subjectSearch.toLowerCase());
      
      return matchesClass && matchesSubject;
    });
  }, [fetchAssignedSubjects.data, classFilter, subjectSearch]);

  const handleToggle = (subjectId: number, classId: number) => {
    if (!selectedTeacher) return;
    const payload = { staff_id: selectedTeacher.staff_id, subject_id: subjectId, class_id: classId };
    assignedIds.includes(`${classId}-${subjectId}`) ? unassignSubject.mutate(payload) : assignSubject.mutate(payload);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F9FAFB] text-zinc-900 overflow-hidden">
      <header className="flex-none bg-white border-b border-zinc-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
            <School size={18} />
          </div>
          <h1 className="text-base font-bold tracking-tight text-zinc-800">Academic Manager</h1>
        </div>
        <nav className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200">
          <TabItem active={activeTab === "overview"} label="Dashboard" icon={LayoutGrid} onClick={() => setActiveTab("overview")} />
          <TabItem active={activeTab === "manage"} label="Assignments" icon={UserCheck} onClick={() => setActiveTab("manage")} />
        </nav>
      </header>

      <main className="flex-1 overflow-hidden p-5">
        <div className="max-w-[1500px] mx-auto h-full">
          {activeTab === "overview" ? (
             <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: "Faculty", val: teachers.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Subjects", val: subjects.length, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { label: "Classes", val: classes.length, icon: School, color: "text-violet-600", bg: "bg-violet-50" },
                    { label: "Coverage", val: "92%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                  ].map((m) => (
                    <div key={m.label} className="bg-white p-5 rounded-xl border border-zinc-200 flex items-center gap-4">
                      <div className={`${m.bg} ${m.color} w-10 h-10 rounded-lg flex items-center justify-center`}><m.icon size={20} /></div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{m.label}</p>
                        <p className="text-xl font-bold text-zinc-900">{m.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Distribution Charts UI can go here as per your original code */}
             </div>
          ) : (
            <div className="grid grid-cols-12 gap-5 h-full">
              <div className="col-span-3 flex flex-col h-full bg-white border border-zinc-200 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-zinc-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                    <input type="text" placeholder="Search faculty..." className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium outline-none" onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5 scrollbar-hide">
                  {filteredTeachers.map((t: any) => (
                    <button key={t.staff_id} onClick={() => { setSelectedTeacher(t); setClassFilter("all"); setSubjectSearch(""); }} className={`w-full px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${selectedTeacher?.staff_id === t.staff_id ? "bg-zinc-100 text-zinc-900" : "hover:bg-zinc-50 text-zinc-600"}`}>
                      <span className="font-semibold text-xs tracking-tight">{t.surname} {t.first_name}</span>
                      <ChevronRight size={14} className={selectedTeacher?.staff_id === t.staff_id ? "opacity-100" : "opacity-0"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-9 h-full flex flex-col gap-5">
                {selectedTeacher ? (
                  <div className="bg-white border border-zinc-200 rounded-xl p-6 flex flex-col h-full overflow-hidden">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h2 className="text-lg font-bold text-zinc-900 leading-none mb-1">{selectedTeacher.surname} {selectedTeacher.first_name}</h2>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider italic">Faculty Member • {selectedTeacher.staff_id}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Subject Search */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={12} />
                          <input 
                            type="text"
                            placeholder="Find subject..."
                            value={subjectSearch}
                            onChange={(e) => setSubjectSearch(e.target.value)}
                            className="pl-8 pr-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-[10px] font-bold uppercase tracking-tight outline-none w-32 focus:border-zinc-400 transition-colors"
                          />
                        </div>

                        {/* Class Dropdown Filter (Base Name) */}
                        <div className="relative">
                          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={12} />
                          <select 
                            value={classFilter}
                            onChange={(e) => setClassFilter(e.target.value)}
                            className="appearance-none pl-8 pr-8 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-[10px] font-bold uppercase tracking-tight outline-none cursor-pointer focus:border-zinc-400 transition-colors min-w-[120px]"
                          >
                            <option value="all">All Classes</option>
                            {uniqueBaseClasses.map(baseName => (
                              <option key={baseName} value={baseName}>{baseName}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={12} />
                        </div>

                        <div className={`px-3 py-1 rounded-md text-[10px] font-bold border ${isSyncing ? 'bg-amber-50 border-amber-200 text-amber-700 animate-pulse' : 'bg-green-50 border-green-200 text-green-700'}`}>
                          {isSyncing ? "SYNCING" : "LIVE"}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredAssignedSubjects.map((item: any) => {
                          const isActive = assignedIds.includes(`${item.class_id}-${item.subject_id}`);
                          const isOther = item.staff_id && item.staff_id !== selectedTeacher.staff_id;

                          return (
                            <button 
                              key={`${item.class_id}-${item.subject_id}`}
                              onClick={() => handleToggle(item.subject_id, item.class_id)}
                              disabled={isSyncing}
                              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all duration-200 ${isActive ? "bg-zinc-900 border-zinc-900 text-white shadow-sm" : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400"}`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? "bg-zinc-800" : "bg-zinc-100"}`}><BookOpen size={16} /></div>
                              <div className={`text-left overflow-hidden ${isOther && !isActive ? 'pointer-events-none select-none opacity-60' : ''}`}>
                                <p className="text-[9px] font-bold text-indigo-500 uppercase leading-none mb-1">{item.class_code}</p>
                                <p className="text-xs font-bold truncate uppercase">{item.subject_name}</p>
                                {isOther && !isActive && <p className="text-[8px] italic text-amber-600 font-bold mt-1">Occupied</p>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {filteredAssignedSubjects.length === 0 && (
                         <div className="py-20 text-center">
                            <p className="text-xs font-bold text-zinc-300 uppercase italic">No subjects found</p>
                         </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border-2 border-dashed border-zinc-200 rounded-xl h-full flex flex-col items-center justify-center text-center p-12">
                    <UserCheck size={32} className="text-zinc-200 mb-4" />
                    <h3 className="text-sm font-bold text-zinc-800">Faculty Management</h3>
                    <p className="text-xs text-zinc-400 mt-1">Select a teacher from the directory to configure academic assignments.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}