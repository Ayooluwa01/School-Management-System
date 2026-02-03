"use client";
import React, { useState, useMemo } from "react";
import { 
  Users, Search, CheckCircle2, School, XCircle, 
  ArrowRightLeft, Info, Loader2, Menu, X 
} from "lucide-react";
import { useStaffs, useClasses, useClassTeacher } from "../../../../../../hooks/useSchool";

export default function SingleClassAssignmentPage() {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [staffSearch, setStaffSearch] = useState("");
  const [classSearch, setClassSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  const { teachers, isLoadingTeachers } = useStaffs();
  const { classes, isLoading: isLoadingClasses } = useClasses();
  const { assignClassTeacher } = useClassTeacher();

  const selectedTeacher = useMemo(() => 
    teachers?.find((t: any) => t.staff_id === selectedTeacherId), 
  [teachers, selectedTeacherId]);

  const currentAssignedClass = useMemo(() => 
    classes?.find((c: any) => c.classroom_staff_id === selectedTeacherId),
  [classes, selectedTeacherId]);

  const filteredTeachers = useMemo(() => 
    teachers?.filter((t: any) => `${t.surname} ${t.first_name}`.toLowerCase().includes(staffSearch.toLowerCase())), 
  [teachers, staffSearch]);

  const filteredClasses = useMemo(() => 
    classes?.filter((c: any) => c.class_name.toLowerCase().includes(classSearch.toLowerCase())), 
  [classes, classSearch]);

  const handleAction = (classId: number | null) => {
    if (!selectedTeacherId) return;
    assignClassTeacher.mutate({ staff_id: selectedTeacherId, class_id: classId });
  };

  if (isLoadingTeachers || isLoadingClasses) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#F8F9FC] flex flex-col overflow-hidden font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-4 md:px-8 py-4 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-zinc-100 rounded-lg">
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-zinc-900 leading-tight">Class Placement</h1>
            <p className="hidden sm:block text-[10px] md:text-xs text-zinc-500 font-medium uppercase tracking-wider">Form Teacher Management</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`
          absolute lg:relative z-50 inset-y-0 left-0 w-72 md:w-80 bg-white border-r border-zinc-200 flex flex-col transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              <input 
                onChange={(e) => setStaffSearch(e.target.value)}
                className="w-full bg-zinc-100 border-none rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                placeholder="Search staff..."
              />
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden ml-2 p-2 text-zinc-400">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredTeachers?.map((t: any) => (
              <button
                key={t.staff_id}
                onClick={() => {
                  setSelectedTeacherId(t.staff_id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full px-5 py-4 flex items-center justify-between transition-all border-b border-zinc-50 ${
                  selectedTeacherId === t.staff_id ? "bg-indigo-50 border-r-4 border-r-indigo-600" : "hover:bg-zinc-50"
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                    selectedTeacherId === t.staff_id ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {t.surname[0]}{t.first_name[0]}
                  </div>
                  <div className="text-left truncate">
                    <p className={`text-sm font-bold truncate ${selectedTeacherId === t.staff_id ? "text-indigo-900" : "text-zinc-900"}`}>
                      {t.surname} {t.first_name}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-mono">{t.staff_code}</p>
                  </div>
                </div>
                {classes?.some((c: any) => c.classroom_staff_id === t.staff_id) && (
                  <CheckCircle2 size={14} className="text-indigo-500 flex-shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-zinc-50/30">
          {selectedTeacher ? (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Profile Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-100">
                    {selectedTeacher.surname[0]}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-zinc-900">{selectedTeacher.surname} {selectedTeacher.first_name}</h2>
                    <p className="text-xs text-zinc-500 font-medium tracking-wide uppercase">{selectedTeacher.role} • {selectedTeacher.email || 'No Email'}</p>
                  </div>
                </div>
                {assignClassTeacher.isPending && <Loader2 className="animate-spin text-indigo-600" size={24} />}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Current Responsibility */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Info size={12} /> Current Assignment
                  </h3>
                  {currentAssignedClass ? (
                    <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                      <School className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12 transition-transform group-hover:scale-110" />
                      <h4 className="text-3xl font-black mb-1">{currentAssignedClass.class_name}</h4>
                      <p className="text-indigo-100 font-medium text-xs mb-8">{currentAssignedClass.class_code} — {currentAssignedClass.arm || 'General'}</p>
                      
                      <button 
                        onClick={() => handleAction(null)}
                        disabled={assignClassTeacher.isPending}
                        className="relative z-10 flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/10"
                      >
                        <XCircle size={14} /> Remove Responsibility
                      </button>
                    </div>
                  ) : (
                    <div className="h-48 border-2 border-dashed border-zinc-200 rounded-3xl flex flex-col items-center justify-center text-zinc-400 bg-white">
                      <School size={32} className="mb-2 opacity-10" />
                      <p className="text-xs font-bold uppercase tracking-widest">Unassigned</p>
                    </div>
                  )}
                </div>

                {/* Class Selection */}
                <div className="space-y-3 flex flex-col">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Assign Class</h3>
                    <input 
                      onChange={(e) => setClassSearch(e.target.value)}
                      className="bg-white border border-zinc-200 rounded-lg py-1 px-3 text-[10px] focus:ring-1 focus:ring-indigo-500 outline-none w-32"
                      placeholder="Filter..."
                    />
                  </div>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredClasses?.map((c: any) => {
                      const isMine = c.classroom_staff_id === selectedTeacherId;
                      const isTaken = c.classroom_staff_id !== null && !isMine;
                      return (
                        <button
                          key={c.class_id}
                          disabled={assignClassTeacher.isPending || isMine}
                          onClick={() => handleAction(c.class_id)}
                          className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                            isMine ? "border-indigo-600 bg-indigo-50" : isTaken ? "bg-zinc-50 opacity-40 cursor-not-allowed" : "bg-white hover:border-indigo-200 shadow-sm"
                          }`}
                        >
                          <div className="truncate">
                            <p className="text-sm font-bold text-zinc-800 truncate">{c.class_name}</p>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{isTaken ? "Occupied" : c.class_code}</p>
                          </div>
                          {!isTaken && !isMine && <ArrowRightLeft size={14} className="text-zinc-300" />}
                          {isMine && <CheckCircle2 size={16} className="text-indigo-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Users size={48} className="text-zinc-200 mb-4" />
              <h3 className="text-lg font-bold text-zinc-400">Select a Staff Member</h3>
              <p className="text-xs text-zinc-300 mt-1 max-w-[200px]">Choose an educator from the list to manage their classroom placement.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}