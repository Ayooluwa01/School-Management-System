





"use client"
import React, { useEffect, useMemo, useState } from "react";
import { 
  GraduationCap, UserCog, Users, Search, TrendingUp, Calendar as CalendarIcon, 
  BookOpen, Layers, UserCheck, Award, Clock, Activity, BarChart3, 
  PieChart as PieChartIcon, BellOff, CheckCircle2,
  Sun,
  Briefcase,
  Calendar,
  FileText,
  Hash,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Star,
  Target,
  User
} from "lucide-react";

// Components
import GenderDonutChart from "@/components/common/Popluationchart";
import FinancialOverview from "@/components/common/FinancialOverview";
import MonthlySalesChart from "@/components/common/Financialchart";
import NotificationsPanel from "@/components/common/Notification";
import TinyCalendar from "@/components/calendar/Calendar";
import { useStaffs, useClasses, useStudent, useSubjects, useSession_Terms, useUserProfile } from "../../../../hooks/useSchool";
import { useAuthStore } from "../../../../zustand/store";
import StaffProfilePage from "../(Staffs)/staff/[id]/page";
import { StatCard, InfoCard, InfoRow } from "../(Students)/students/profile/[id]/page";
import { Subject } from "../(Subjects)/subjects/page";


// Dynamic Dashbaord



export default function Dashboard() {
  const { user } = useAuthStore();

const dynmaicDashboard=(role?:string)=>{
  switch(user?.role){
    case "ADMIN":
    return <AdminDashboard/>;
    case "TEACHER":
    return <StaffDashboard />;
    case "STAFF":
      return <StaffProfilePage />;
 default:
        return <StaffProfilePage/>;
  }
}
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
return(
  <div>
    {/* ===== GREETING BAR ===== */}
      <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600">
            <Sun className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-tighter">Hello There,</h2>
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
{dynmaicDashboard(user?.role)} 

    </div>

)
}



const AdminDashboard=()=>{
    const { staffs, teachers } = useStaffs();
  const { classes } = useClasses();
  const { data: studentsData } = useStudent(0);
  const { subjects, fetchAssignedSubjects } = useSubjects();
  const { data: sessionData } = useSession_Terms();
  const { data: profile, isLoading: loading } = useUserProfile();
  const { user } = useAuthStore();
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

  

  return (
    <div className="p-4 md:p-6 space-y-6  bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/10 text-slate-900 dark:text-slate-100">
      


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
  )
}

const StaffDashboard=()=>{
    const { data: staff, isLoading: loading } = useUserProfile();

 if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-3 border-purple-200 border-b-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900 mb-1">Loading Profile</p>
            <p className="text-xs text-slate-600">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-12 max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Staff Not Found</h2>
          <p className="text-sm text-slate-600 mb-6">The staff member you're looking for doesn't exist.</p>
         
        </div>
      </div>
    );
  }

  const initials = `${staff.surname[0]}${staff.first_name[0]}`.toUpperCase();
  const avatarUrl = staff.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.full_name)}&background=4f46e5&color=fff&bold=true&size=256`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mb-8">
          {/* Header Gradient */}
          <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
            {/* Decorative patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48" />
            </div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
            
            {/* Top right badge */}
            <div className="absolute top-6 right-6">
              <div className="px-3 py-1.5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-lg">
                <Sparkles size={12} />
                Verified
              </div>
            </div>
          </div>

          <div className="px-8 pb-8">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-24 mb-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-xl shadow-blue-500/20 ring-4 ring-white">
                  <div className="w-full h-full rounded-[20px] overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
                    {staff.profile_pic ? (
                      <img src={avatarUrl} alt={staff.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{initials}</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Status Indicator */}
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg shadow-green-500/30 flex items-center justify-center border-4 border-white">
                  <CheckCircle2 size={18} className="text-white" />
                </div>
              </div>

              {/* Name & Info */}
              <div className="flex-1 z-10">
                <h1 className="text-2xl font-semibold text-slate-900 md:text-white  md:text-3xl mb-2 tracking-tight">
                  {staff.surname.toUpperCase()}  {staff.first_name.toUpperCase()}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-blue-700">
                    <Briefcase size={12} />
                    {staff.role}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium
                    ${staff.employment_status === 'Permanent' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : staff.employment_status === 'Contract'
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}>
                    <Activity size={12} />
                    {staff.employment_status}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button className="w-12 h-12 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl flex items-center justify-center transition-all group">
                  <Mail size={18} className="text-blue-600" />
                </button>
                <button className="w-12 h-12 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl flex items-center justify-center transition-all group">
                  <Phone size={18} className="text-indigo-600" />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                icon={Hash}
                label="Staff ID"
                value={staff.staff_code}
                gradient="from-blue-500 to-cyan-500"
                bgColor="bg-blue-50"
                borderColor="border-blue-200"
              />
              <StatCard
                icon={BookOpen}
                label="Subjects"
                value={'32'}
                gradient="from-purple-500 to-pink-500"
                bgColor="bg-purple-50"
                borderColor="border-purple-200"
              />
              <StatCard
                icon={Users}
                label="Classes Taught"
                value={'22'}
                gradient="from-indigo-500 to-blue-500"
                bgColor="bg-indigo-50"
                borderColor="border-indigo-200"
              />
              <StatCard
                icon={TrendingUp}
                label="Experience"
                value={`${staff.years_of_experience} Yrs`}
                gradient="from-emerald-500 to-teal-500"
                bgColor="bg-emerald-50"
                borderColor="border-emerald-200"
              />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="space-y-6">
            
            {/* Contact Information */}
            <InfoCard title="Contact Information" icon={Mail} iconColor="text-blue-600" bgColor="bg-blue-50" borderColor="border-blue-200">
              <div className="space-y-4">
                <InfoRow icon={Mail} label="Email" value={staff.email} iconColor="text-blue-600" />
                <InfoRow icon={Phone} label="Phone" value={staff.phone} iconColor="text-indigo-600" />
                <InfoRow icon={MapPin} label="Address" value={staff.address} iconColor="text-purple-600" />
              </div>
            </InfoCard>

            {/* Personal Details */}
            <InfoCard title="Personal Details" icon={User} iconColor="text-indigo-600" bgColor="bg-indigo-50" borderColor="border-indigo-200">
              <div className="space-y-4">
                <InfoRow icon={User} label="Gender" value={staff.sex} iconColor="text-indigo-600" />
                <InfoRow icon={Calendar} label="Date of Birth" value={new Date(staff.date_of_birth).toLocaleDateString()} iconColor="text-blue-600" />
                <InfoRow icon={Shield} label="Marital Status" value={staff.marital_status} iconColor="text-purple-600" />
              </div>
            </InfoCard>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Employment Details */}
            <InfoCard title="Employment Information" icon={Briefcase} iconColor="text-purple-600" bgColor="bg-purple-50" borderColor="border-purple-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow icon={Hash} label="Staff Code" value={staff.staff_code} iconColor="text-blue-600" />
                <InfoRow icon={Briefcase} label="Role" value={staff.role} iconColor="text-indigo-600" />
                <InfoRow icon={Calendar} label="Date Appointed" value={new Date(staff.date_of_appointment).toLocaleDateString()} iconColor="text-purple-600" />
                <InfoRow icon={Activity} label="Status" value={staff.employment_status} iconColor="text-emerald-600" />
              </div>
            </InfoCard>

            {/* Academic Qualifications */}
            <InfoCard title="Academic & Experience" icon={GraduationCap} iconColor="text-emerald-600" bgColor="bg-emerald-50" borderColor="border-emerald-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow icon={Award} label="Qualification" value={staff.highest_qualification || 'Not specified'} iconColor="text-emerald-600" />
                <InfoRow icon={Clock} label="Experience" value={`${staff.years_of_experience} Years`} iconColor="text-teal-600" />
                {staff.primary_subject && (
                  <InfoRow icon={BookOpen} label="Primary Subject" value={staff.primary_subject} iconColor="text-blue-600" />
                )}
                {staff.secondary_subject && (
                  <InfoRow icon={BookOpen} label="Secondary Subject" value={staff.secondary_subject} iconColor="text-indigo-600" />
                )}
              </div>
            </InfoCard>

            {/* Teaching Assignments */}
            {staff.teaching_assignments && staff.teaching_assignments.length > 0 && (
              <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 border border-slate-200 p-5">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/30">
                    <BookOpen size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Teaching Assignments</h3>
                    <p className="text-xs text-slate-600">Classes and Subjects</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {staff.teaching_assignments.map((assignment: TeachingAssignment, idx: number) => (
                    <div 
                      key={idx} 
                      className="group bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3.5 hover:shadow-md hover:shadow-purple-200/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-purple-200 transition-colors">
                          <FileText size={16} className="text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm mb-1.5">{assignment.subject_name}</p>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-[10px] text-purple-700 font-medium bg-purple-100 px-2 py-0.5 rounded">
                              {assignment.subject_code}
                            </span>
                            {assignment.is_core && (
                              <span className="text-[10px] text-emerald-700 font-medium bg-emerald-100 px-2 py-0.5 rounded">
                                CORE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 flex items-center gap-1">
                            <Users size={10} />
                            {assignment.class_name} - {assignment.arm}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subjects Overview */}
            {staff.subjects_taught && staff.subjects_taught.length > 0 && (
              <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 border border-slate-200 p-5">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md shadow-orange-500/30">
                    <Star size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Subjects Overview</h3>
                    <p className="text-xs text-slate-600">All subjects taught across classes</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {staff.subjects_taught.map((subject: Subject, idx: number) => (
                    <div 
                      key={idx} 
                      className="inline-flex items-center gap-2.5 px-3.5 py-2.5 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <Award size={13} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{subject.subject_name}</p>
                        <p className="text-xs text-slate-600">{subject.subject_code}</p>
                      </div>
                      {subject.is_core && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                          Core
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Classes Managed */}
            {staff.classes_managed && staff.classes_managed.length > 0 && (
              <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 border border-slate-200 p-5">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md shadow-cyan-500/30">
                    <Users size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Classes Managed</h3>
                    <p className="text-xs text-slate-600">Form teacher responsibilities</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {staff.classes_managed.map((cls: any, idx: number) => (
                    <div 
                      key={idx} 
                      className="group bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-3.5 hover:shadow-md hover:shadow-cyan-200/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-cyan-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-cyan-200 transition-colors">
                          <Target size={16} className="text-cyan-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{cls.class_name} - {cls.arm}</p>
                          <p className="text-xs text-slate-600">{cls.class_code}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
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