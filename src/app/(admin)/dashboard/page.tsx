import React from "react";
import { 
  GraduationCap, 
  UserCog, 
  Users, 
  Search, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  ArrowUpRight 
} from "lucide-react";

// Components
import GenderDonutChart from "@/components/common/Popluationchart";
import FinancialOverview from "@/components/common/FinancialOverview";
import MonthlySalesChart from "@/components/common/Financialchart";
import NotificationsPanel from "@/components/common/Notification";
import TopStudentsList from "@/components/common/Topstudents";
import TinyCalendar from "@/components/calendar/Calendar";

export default async function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-[#F8FAFC] dark:bg-gray-950 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* ===== HEADER SECTION ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">System Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Welcome back, Admin. Here&rsquo;s what&rsquo;s happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 transition-all" 
              placeholder="Search data..."
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full shadow-lg shadow-indigo-200 dark:shadow-none transition-transform active:scale-95">
            <CalendarIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ===== SECTION 1: KEY METRICS (KPIs) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PremiumStatCard 
          icon={<GraduationCap className="w-6 h-6" />}
          label="Total Students"
          value="2,840"
          trend=""
          accentColor="indigo"
        />
        <PremiumStatCard 
          icon={<Users className="w-6 h-6" />}
          label="Active Teachers"
          value="156"
          trend=""
          accentColor="emerald"
        />
        <PremiumStatCard 
          icon={<UserCog className="w-6 h-6" />}
          label="Staff Members"
          value="470"
          trend=""
          accentColor="violet"
        />
      </div>

      {/* ===== SECTION 2: MAIN GRID ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* === LEFT COLUMN (Charts & Tables) === */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* Main Visualizations */}
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg px-2 border-l-4 border-indigo-600">Financial Performance</h3>
              <div className="flex gap-2">
                <span className="bg-slate-50 dark:bg-gray-800 text-slate-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Monthly</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10">
                <MonthlySalesChart />
                <FinancialOverview />
            </div>
          </div>

          {/* Top Students Section */}
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-gray-800 overflow-hidden">
            <div className="p-6 flex items-center justify-between">
              <h3 className="font-bold text-lg px-2 border-l-4 border-emerald-500">Academic Leaders</h3>
              <button className="text-indigo-600 dark:text-indigo-400 text-sm font-bold flex items-center gap-1 hover:underline">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 pb-6">
              <TopStudentsList />
            </div>
          </div>
        </div>

        {/* === RIGHT COLUMN (Widgets Panel) === */}
        <div className="xl:col-span-4 space-y-8">
          
          {/* Population Widget */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-gray-800">
            <h3 className="text-xs font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-6 text-center underline decoration-indigo-500/30 underline-offset-8">
              Population Diversity
            </h3>
            <div className="flex justify-center scale-110 py-4">
              <GenderDonutChart />
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-gray-800 overflow-hidden">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">School Calendar</h3>
             </div>
             <TinyCalendar />
          </div>

          {/* Notifications Widget */}
          <div className="bg-indigo-900/5 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-950 rounded-[2rem] overflow-hidden">
            <div className="p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <NotificationsPanel />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function PremiumStatCard({ icon, label, value, trend, accentColor }: any) {
  const themes: any = {
    indigo: "text-indigo-600 bg-indigo-50/50 ring-indigo-100",
    emerald: "text-emerald-600 bg-emerald-50/50 ring-emerald-100",
    violet: "text-violet-600 bg-violet-50/50 ring-violet-100",
  };

  return (
    <div className="group bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className={`p-4 rounded-2xl ring-4 ${themes[accentColor]}`}>
          {icon}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{label}</span>
          <span className="text-3xl font-black text-slate-900 dark:text-white mt-1">{value}</span>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <div className="flex items-center justify-center w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
           <TrendingUp className="w-3 h-3 text-emerald-600" />
        </div>
        <p className="text-xs font-bold text-slate-500 dark:text-gray-400 italic">
          {trend}
        </p>
      </div>
    </div>
  );
}