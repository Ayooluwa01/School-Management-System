/* eslint-disable react/display-name */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { 
  Users, Search, CheckCircle2, School,
  UserPlus, XCircle, ArrowRightLeft, Info, Loader2
} from "lucide-react";
import api from "../../../../../../libs/axios";

export default function SingleClassAssignmentPage() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState<any>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [staffSearch, setStaffSearch] = useState("");
  const [classSearch, setClassSearch] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [tRes, cRes] = await Promise.all([
        api.get('/staffs/teachers/all'),
        api.get('/class/all_classes'), 
      ]);
      setTeachers(tRes.data);
      setClasses(cRes.data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  const handleAssignment = async (classId: number | null) => {
    if (!selectedTeacher) return;
    setLoading(true);
    try {
     
      await api.post('/staffs/assignClass', {
        staff_id: selectedTeacher.staff_id,
        class_id: classId 
      });
      
     
      const updatedClasses: any = classes.map((c: any) => {
        if (c.class_id === classId) return { ...c, classroom_staff_id: selectedTeacher.staff_id };
        if (c.classroom_staff_id === selectedTeacher.staff_id) return { ...c, classroom_staff_id: null };
        return c;
      });

      setClasses(updatedClasses);
      setSelectedTeacher({ ...selectedTeacher, assigned_class: classId });
      
    } catch (err) {
      console.error("Assignment failed", err);
      alert("Failed to assign class. Ensure the backend endpoint is active.");
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t: any) => t.name.toLowerCase().includes(staffSearch.toLowerCase()));
  }, [teachers, staffSearch]);

  const filteredClasses = useMemo(() => {
    return classes.filter((c: any) => 
      c.class_name.toLowerCase().includes(classSearch.toLowerCase())
    );
  }, [classes, classSearch]);

  const currentAssignedClass = classes.find((c: any) => c.classroom_staff_id === selectedTeacher?.staff_id);

  return (
    <div className="h-screen bg-[#F8F9FC] flex flex-col font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-8 py-4 flex justify-between items-center shadow-sm z-10">
        <div>
          <h1 className="text-xl font-extrabold text-zinc-900 tracking-tight">Class Placement</h1>
          <p className="text-xs text-zinc-500 font-medium">Assign one primary class per educator</p>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-zinc-400">{teachers.length} Staff Loaded</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Staff Navigation */}
        <aside className="w-80 bg-white border-r border-zinc-200 flex flex-col shadow-sm">
          <div className="p-4 border-b border-zinc-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                onChange={(e) => setStaffSearch(e.target.value)}
                className="w-full bg-zinc-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all"
                placeholder="Find teacher..."
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredTeachers.map((t: any) => {
              const hasAssignment = classes.some((c: any) => c.classroom_staff_id === t.staff_id);
              return (
                <button
                  key={t.staff_id}
                  onClick={() => setSelectedTeacher(t)}
                  className={`w-full px-6 py-4 flex items-center justify-between group transition-colors ${
                    selectedTeacher?.staff_id === t.staff_id ? "bg-indigo-50 border-r-4 border-r-indigo-600" : "hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      selectedTeacher?.staff_id === t.staff_id ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-500"
                    }`}>
                      {t.name[0]}
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-bold ${selectedTeacher?.staff_id === t.staff_id ? "text-indigo-900" : "text-zinc-900"}`}>{t.name}</p>
                      <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-tighter">{t.staff_no}</p>
                    </div>
                  </div>
                  {hasAssignment && <CheckCircle2 size={16} className="text-indigo-500" />}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Panel: Work Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-zinc-50/30">
          {selectedTeacher ? (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Profile Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-black">
                        {selectedTeacher.name[0]}
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-zinc-900">{selectedTeacher.name}</h2>
                        <p className="text-sm text-zinc-500 font-medium">{selectedTeacher.email || 'No Email Provided'}</p>
                    </div>
                </div>
                {loading && <Loader2 className="animate-spin text-indigo-600" size={24} />}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Current Class Slot */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <Info size={14} /> Current Assignment
                    </h3>
                    {currentAssignedClass ? (
                        <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                            <School className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12" />
                            <h4 className="text-3xl font-black tracking-tight">{currentAssignedClass.class_name}</h4>
                            <p className="text-indigo-100 font-medium mt-1">{currentAssignedClass.class_code} — {currentAssignedClass.arm}</p>
                            
                            <button 
                                onClick={() => handleAssignment(null)}
                                className="mt-8 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold transition-all"
                            >
                                <XCircle size={14} /> Remove From Class
                            </button>
                        </div>
                    ) : (
                        <div className="h-48 border-2 border-dashed border-zinc-200 rounded-3xl flex flex-col items-center justify-center text-zinc-400 bg-white">
                            <School size={32} className="mb-2 opacity-20" />
                            <p className="text-sm font-bold tracking-tight">No Class Assigned</p>
                        </div>
                    )}
                </div>

                {/* Selection List */}
                <div className="space-y-4 flex flex-col">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Available Classes</h3>
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400" size={12} />
                            <input 
                                onChange={(e) => setClassSearch(e.target.value)}
                                className="bg-white border border-zinc-200 rounded-lg py-1 pl-7 pr-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Search..."
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 max-h-[400px] pr-2">
                        {filteredClasses.map((c: any) => {
                            const isThisTeacher = c.classroom_staff_id === selectedTeacher.staff_id;
                            const isTaken = c.classroom_staff_id !== null && !isThisTeacher;

                            return (
                                <button
                                    key={c.class_id}
                                    disabled={loading || isThisTeacher}
                                    onClick={() => handleAssignment(c.class_id)}
                                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                                        isThisTeacher 
                                        ? "border-indigo-600 bg-indigo-50" 
                                        : isTaken 
                                          ? "border-zinc-100 bg-zinc-50 opacity-60 cursor-not-allowed"
                                          : "border-white bg-white hover:border-indigo-200 shadow-sm"
                                    }`}
                                >
                                    <div>
                                        <p className="text-sm font-bold text-zinc-800">{c.class_name}</p>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                          {isTaken ? "Occupied" : c.class_code}
                                        </p>
                                    </div>
                                    {!isTaken && !isThisTeacher && (
                                        <ArrowRightLeft size={16} className="text-zinc-300" />
                                    )}
                                    {isThisTeacher && <CheckCircle2 size={18} className="text-indigo-600" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                    <Users size={32} className="text-zinc-200" />
                </div>
                <h3 className="text-lg font-bold text-zinc-400">Select a staff member</h3>
                <p className="text-xs text-zinc-300 mt-1">to manage classroom placement</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}