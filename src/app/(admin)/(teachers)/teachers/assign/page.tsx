/* eslint-disable react/display-name */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  LayoutGrid 
} from "lucide-react";
import api from "../../../../../../libs/axios";

// --- REUSABLE COMPONENTS ---

const TabItem = React.memo(({ label, active, onClick }: any) => (
  <button 
    onClick={onClick} 
    className={`px-6 py-3 text-sm font-bold border-b-2 relative transition-all ${
      active ? "border-indigo-600 text-indigo-900" : "border-transparent text-zinc-400 hover:text-zinc-600"
    }`}
  >
    {label}
    {active && <span className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]" />}
  </button>
));

const MetricCard = React.memo(({ icon, label, value }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-zinc-900 leading-none">{value}</p>
      </div>
    </div>
));

export default function TeachingAssignmentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [activeSubjectIds, setActiveSubjectIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [tRes, sRes] = await Promise.all([
        api.get('/staffs/teachers/all'),
        api.get('/subjects'), 
      ]);
      setTeachers(tRes.data);
      setSubjects(sRes.data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  const loadTeacherSubjects = async (staffId: number) => {
    setLoading(true);
    console.log("sTAFF ID",staffId)
    try {
      const res = await api.get(`/staffs/assignments/${staffId}`);
      console.log(res)
      setActiveSubjectIds(res.data.map((a: any) => a.subject_id));
    } catch (err) {
      console.error(err);
      setActiveSubjectIds([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(()=>{
console.log(activeSubjectIds)
  },[activeSubjectIds])
  const handleToggle = async (subjectId: number) => {
    if (!selectedTeacher) return;
    const isAssigned = activeSubjectIds.includes(subjectId);

    try {
      if (isAssigned) {
        await api.delete(`/staffs/assignments/remove/${selectedTeacher.staff_id}/${subjectId}`);
        setActiveSubjectIds(prev => prev.filter(id => id !== subjectId));
      } else {
        await api.post('/staffs/assignments/create', {
          staff_id: selectedTeacher.staff_id,
          subject_id: subjectId        });
        setActiveSubjectIds(prev => [...prev, subjectId]);
      }
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t: any) => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [teachers, searchTerm]);

  return (
    <div className="h-screen flex flex-col bg-[#FDFDFE] text-zinc-900 overflow-hidden">
      
      <header className="flex-none bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <BookOpen size={20}/>
            </div>
            <h1 className="text-xl font-bold text-zinc-900 italic">Teaching Assignments</h1>
          </div>
          <div className="flex gap-2">
            <TabItem active={activeTab === "overview"} label="Overview" onClick={() => setActiveTab("overview")} />
            <TabItem active={activeTab === "manage"} label="Manage Assignments" onClick={() => setActiveTab("manage")} />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden p-8">
        <div className="max-w-7xl mx-auto h-full">
          
          {activeTab === "overview" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MetricCard icon={<GraduationCap size={20}/>} label="Total Teachers" value={teachers.length} />
              <MetricCard icon={<BookOpen size={20}/>} label="Subjects Offered" value={subjects.length} />
              <MetricCard icon={<CheckCircle2 size={20}/>} label="Global Assignments" value="--" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-in fade-in duration-500">
              
              <div className="lg:col-span-4 flex flex-col h-full overflow-hidden bg-white border border-zinc-200 rounded-2xl shadow-sm">
                <div className="flex-none p-4 border-b border-zinc-100 bg-zinc-50/30">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search teacher..." 
                      className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/10"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto divide-y divide-zinc-50 scrollbar-thin scrollbar-thumb-zinc-200">
                  {filteredTeachers.map((t: any) => (
                    <button
                      key={t.staff_id}
                      onClick={() => { setSelectedTeacher(t); loadTeacherSubjects(t.staff_id); }}
                      className={`w-full p-4 flex items-center justify-between transition-all ${
                        selectedTeacher?.staff_id === t.staff_id ? "bg-indigo-50 border-r-4 border-r-indigo-600" : "hover:bg-zinc-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                          selectedTeacher?.staff_id === t.staff_id ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-500"
                        }`}>
                          {t.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="text-left">
                          <p className={`text-sm font-bold ${selectedTeacher?.staff_id === t.staff_id ? "text-indigo-900" : "text-zinc-900"}`}>{t.name}</p>
                          <p className="text-[10px] text-zinc-400">{t.staff_no}</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className={selectedTeacher?.staff_id === t.staff_id ? "text-indigo-400" : "text-zinc-200"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 h-full overflow-hidden">
                {selectedTeacher ? (
                  <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm h-full flex flex-col">
                    <div className="flex-none flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
                      <div>
                        <h2 className="text-lg font-bold text-zinc-900 italic">{selectedTeacher.name}</h2>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Matrix Management</p>
                      </div>
                      <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                        {activeSubjectIds.length} Subjects ON
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 pr-2">
                      {loading ? (
                        <div className="py-20 text-center text-zinc-400 text-sm italic animate-pulse">Synchronizing assignments...</div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                          {subjects.map((s: any) => {
                            const isActive = activeSubjectIds.includes(s.subject_id);
                            return (
                              <div 
                                key={s.subject_id}
                                onClick={() => handleToggle(s.subject_id)}
                                className={`group flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                  isActive 
                                  ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" 
                                  : "bg-white border-zinc-100 text-zinc-600 hover:border-indigo-200 shadow-sm"
                                }`}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    isActive ? "bg-white/20 text-white" : "bg-zinc-50 text-zinc-400 group-hover:text-indigo-600"
                                  }`}>
                                    <BookOpen size={16} />
                                  </div>
                                  <div>
                                    <p className={`text-sm font-bold ${isActive ? "text-white" : "text-zinc-800"}`}>{s.subject_name}</p>
                                    <p className={`text-[10px] font-bold uppercase ${isActive ? "text-indigo-100" : "text-zinc-400"}`}>{s.subject_code}</p>
                                  </div>
                                </div>
                                
                                <div className={`w-8 h-4 rounded-full relative transition-colors ${isActive ? "bg-white/30" : "bg-zinc-200"}`}>
                                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${isActive ? "right-0.5" : "left-0.5"}`} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-zinc-200 border-dashed rounded-3xl h-full flex flex-col items-center justify-center text-center p-8">
                    <LayoutGrid size={48} className="text-zinc-100 mb-4" />
                    <h3 className="text-lg font-bold text-zinc-400 tracking-tight">Select a teacher</h3>
                    <p className="text-xs text-zinc-300 mt-2">Pick a staff member from the left to manage toggles</p>
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