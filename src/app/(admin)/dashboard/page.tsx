





"use client"
import React, { useEffect, useMemo, useState } from "react";
import { 
  GraduationCap, UserCog, Users, Search, TrendingUp, Calendar as CalendarIcon, 
  BookOpen, Layers, UserCheck, Award, Clock, Activity, BarChart3, 
  PieChart as PieChartIcon, BellOff, CheckCircle2,
  Sun
} from "lucide-react";

// Components
import GenderDonutChart from "@/components/common/Popluationchart";
import FinancialOverview from "@/components/common/FinancialOverview";
import MonthlySalesChart from "@/components/common/Financialchart";
import NotificationsPanel from "@/components/common/Notification";
import TinyCalendar from "@/components/calendar/Calendar";
import { useStaffs, useClasses, useStudent, useSubjects, useSession_Terms } from "../../../../hooks/useSchool";

export default function Dashboard() {
  const { staffs, teachers } = useStaffs();
  const { classes } = useClasses();
  const { data: studentsData } = useStudent(0);
  const { subjects, fetchAssignedSubjects } = useSubjects();
  const { data: sessionData } = useSession_Terms();

  const stats = useMemo(() => {
    const totalStudents = studentsData?.totalCount || 0;
    const totalClasses = classes?.length || 0;
    const totalSubjects = subjects?.length || 0;
    const coreSubjects = subjects?.filter(s => s.is_core).length || 0;
    const electiveSubjects = totalSubjects - coreSubjects;
    const totalAssignments = fetchAssignedSubjects.data?.length || 0;
    const avgClassSize = totalClasses > 0 ? Math.round(totalStudents / totalClasses) : 0;
    const teachersWithAssignments = new Set(fetchAssignedSubjects.data?.map((a: any) => a.staff_id) || []).size;

    return { totalStudents, totalClasses, totalSubjects, coreSubjects, electiveSubjects, totalAssignments, avgClassSize, teachersWithAssignments };
  }, [studentsData, classes, subjects, fetchAssignedSubjects.data]);

  const recentClasses = useMemo(() => {
    return [...(classes || [])].sort((a, b) => (b.student_count || 0) - (a.student_count || 0));
  }, [classes]);


  // Greeting & Time Logic
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });
  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
  });
  return (
    <div className="p-4 md:p-6 space-y-6  bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/10 text-slate-900 dark:text-slate-100">
      
{/* ===== GREETING BAR ===== */}
      <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600">
            <Sun className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-tighter">Good Day, Administrator</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{formattedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xl font-black tabular-nums tracking-tighter">{formattedTime}</p>
          </div>
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-gray-800 hidden md:block"></div>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-indigo-600 uppercase">System Status</span>
             <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1">
               <div className="w-1 h-1 bg-emerald-500 rounded-none animate-ping" /> Online
             </span>
          </div>
        </div>
      </div>

      {/* ===== HEADER SECTION ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            System Overview
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] font-black flex items-center gap-2 uppercase tracking-wider">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            {sessionData?.current_session} • {sessionData?.current_term || 'Term'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-slate-200 dark:border-gray-800 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-indigo-500 w-64 transition-all outline-none" 
              placeholder="Search data..."
            />
          </div>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2.5 rounded-xl shadow-lg transition-all active:scale-95">
            <CalendarIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ===== KPI CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ModernStatCard icon={<GraduationCap className="w-6 h-6" />} emoji="🎓" label="Students" value={stats.totalStudents} subtitle={`Avg ${stats.avgClassSize}/class`} gradient="from-blue-500 to-cyan-500" delay="0" />
        <ModernStatCard icon={<Users className="w-6 h-6" />} emoji="👨‍🏫" label="Teachers" value={teachers.length} subtitle={`${stats.teachersWithAssignments} Active`} gradient="from-purple-500 to-pink-500" delay="100" />
        <ModernStatCard icon={<BookOpen className="w-6 h-6" />} emoji="📚" label="Subjects" value={stats.totalSubjects} subtitle={`${stats.coreSubjects} Core Items`} gradient="from-emerald-500 to-teal-500" delay="200" />
        <ModernStatCard icon={<Layers className="w-6 h-6" />} emoji="🏫" label="Classes" value={stats.totalClasses} subtitle={`${stats.totalAssignments} Assignments`} gradient="from-orange-500 to-red-500" delay="300" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* === LEFT COLUMN === */}
        <div className="xl:col-span-8 space-y-6">
          
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl  p-6 shadow-md border border-slate-100 dark:border-gray-800 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"><BarChart3 className="w-5 h-5 text-white" /></div>
                <h3 className="font-black text-lg">Finance</h3>
              </div>
              <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Monthly</span>
            </div>
            <MonthlySalesChart />
            <FinancialOverview />
          </div>

          {/* Class Overview - SCROLLABLE */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-md   border-slate-100 dark:border-gray-800 overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-slate-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg"><Layers className="w-5 h-5 text-white" /></div>
                <h3 className="font-black text-lg">Class Overview</h3>
              </div>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                {recentClasses.map((cls, index) => {
                  const hasTeacher = !!cls.classroom_staff_id;
                  return (
                    <div key={cls.class_id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group ${hasTeacher ? 'bg-emerald-50/40 border-emerald-100/50 dark:bg-emerald-900/10' : 'bg-slate-50/50 border-slate-100 dark:bg-gray-800/50'}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center font-black text-xs shadow-sm group-hover:scale-110 transition-transform">{index + 1}</div>
                        <div>
                          <p className="font-bold text-sm">{cls.class_code}</p>
                          <div className="flex items-center gap-1.5">
                            {hasTeacher ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
                            <p className="text-[10px] text-slate-500 font-bold truncate max-w-[150px]">{cls.classroom_staff_id || 'Waiting Assignment'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right mr-2">
                          <p className="font-black text-sm">{cls.student_count || 0}</p>
                          <p className="text-[9px] text-slate-400 font-black uppercase">Students</p>
                        </div>
                        <div className="w-20 h-1.5 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600" style={{ width: `${Math.min(((cls.student_count || 0) / 50) * 100, 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Subjects - SCROLLABLE */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-slate-100 dark:border-gray-800 animate-fade-in-up">
            <h3 className="font-black text-lg mb-6 flex items-center gap-2">📚 Subject Matrix</h3>
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {subjects.map((category, index) => {
                  const grads = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-emerald-500 to-teal-500', 'from-orange-500 to-red-500'];
                  return (
                    <div key={category.subject_code} className="p-3 rounded-2xl bg-slate-50/50 dark:bg-gray-800/50 border border-slate-100 dark:border-gray-700 hover:scale-105 transition-all">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${grads[index % grads.length]} flex items-center justify-center font-black text-white text-[10px] mb-2 shadow-md`}>
                        {category.subject_name.slice(0,3)}
                      </div>
                      <p className="font-bold text-[11px] truncate">{category.subject_name}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">{category.subject_code}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* === RIGHT COLUMN === */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 rounded-[2rem] shadow-2xl text-white animate-fade-in">
            <div className="flex items-center gap-2 mb-6"><Activity className="w-5 h-5" /><h3 className="font-black text-md">Live Status</h3></div>
            <div className="space-y-3">
              <QuickStatRow icon={<UserCheck />} label="Total Staff" value={staffs.length} />
              <QuickStatRow icon={<Award />} label="Avg Class" value={stats.avgClassSize} />
              <QuickStatRow icon={<Clock />} label="Active Tasks" value={stats.totalAssignments} />
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-100 dark:border-gray-800 animate-fade-in">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 text-center">🎯 Population Ratio</h3>
            <div className="flex justify-center scale-90 py-2"><GenderDonutChart /></div>
          </div>

          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-5 rounded-[2rem] border border-slate-100 dark:border-gray-800 animate-fade-in">
            <TinyCalendar />
          </div>

          <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 rounded-[2rem] overflow-hidden shadow-xl animate-fade-in">
            <div className="p-5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
              <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">🔔 Notice Board</h3>
              {/* Check for notifications array length */}
              {false ? ( // Replace 'false' with your actual notification data length check
                <NotificationsPanel />
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm mb-3">
                    <BellOff className="w-5 h-5 text-slate-300" />
                  </div>
                  <p className="text-xs font-bold text-slate-500">All Clear!</p>
                  <p className="text-[10px] text-slate-400 font-medium">No new notices for today.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}

function ModernStatCard({ icon, emoji, label, value, subtitle, gradient, delay }: any) {
  return (
    <div className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-5 rounded-3xl shadow-lg border border-slate-100 dark:border-gray-800 hover:-translate-y-1 transition-all duration-300 overflow-hidden" style={{ animationDelay: `${delay}ms` }}>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg text-white`}>{icon}</div>
          <span className="text-3xl">{emoji}</span>
        </div>
        <p className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-slate-900 dark:text-white my-0.5">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        <p className="text-[10px] font-bold text-slate-500">{subtitle}</p>
      </div>
      <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-opacity`} />
    </div>
  );
}

function QuickStatRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">{React.cloneElement(icon, { size: 14 })}</div>
        <span className="font-bold text-xs">{label}</span>
      </div>
      <span className="font-black text-lg">{value}</span>
    </div>
  );
}