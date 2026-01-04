import React from "react";
import { GraduationCap, UserCog, Users } from "lucide-react";
// Components
import ComponentCard from "@/components/common/ComponentCard";
import GenderDonutChart from "@/components/common/Popluationchart";
import FinancialOverview from "@/components/common/FinancialOverview";
import MonthlySalesChart from "@/components/common/Financialchart";
import NotificationsPanel from "@/components/common/Notification";
import TopStudentsList from "@/components/common/Topstudents";
import TinyCalendar from "@/components/calendar/Calendar";
import { Fetch, fetchClasses, fetchStudents } from "../../../../libs/api";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import Badge from "@/components/ui/badge/Badge";
import Alert from "@/components/ui/alert/Alert";

export default async function Dashboard() {

  const studentData = await fetchStudents();
  
  return (
    <div className="p-4 md:p-6 space-y-2 min-h-screen bg-gray-25 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* <UserAddressCard /> */}
      {/* <UserInfoCard /> */}
      {/* ===== SECTION 1: KEY METRICS (KPIs) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          icon={<GraduationCap className="w-5 h-5 text-blue-600" />}
          label="Students"
          value={studentData.studentCount||0}
          color="blue"
        />
        <StatCard 
          icon={<Users className="w-5 h-5 text-green-600" />}
          label="Teachers"
          value={0 || 0}
          color="green"
        />
        <StatCard 
          icon={<UserCog className="w-5 h-5 text-purple-600" />}
          label="Staff"
          value={470}
          color="purple"
        />
      </div>

      {/* ===== SECTION 2: MAIN GRID ===== */}
      {/* 2/3 width for main content, 1/3 width for sidebar on large screens */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* === LEFT COLUMN (Main Data) === */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Welcome / Intro Card */}
          <ComponentCard title="Dashboard Overview">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente atque
              earum sint temporibus reprehenderit quia aperiam itaque voluptatibus
              unde harum alias eos saepe.
            </p>
          </ComponentCard>

          {/* Financial Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="col-span-1 md:col-span-2">
                <MonthlySalesChart />
             </div>
             <div className="col-span-1 md:col-span-2">
                <FinancialOverview />
             </div>
          </div>

          {/* Top Students */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-lg">Top Performing Students</h3>
            </div>
            <div className="p-4">
              <TopStudentsList />
            </div>
          </div>
        </div>

        {/* === RIGHT COLUMN (Sidebar / Helpers) === */}
        <div className="space-y-2">
          
          {/* Gender Split */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl   border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center">
            <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Population Split</h3>
            <div className="w-full flex justify-center">
              <GenderDonutChart />
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl  border border-gray-100 dark:border-gray-700">
             <TinyCalendar />
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl  border-gray-100 dark:border-gray-700 h-fit">
            <NotificationsPanel />
          </div>

        </div>
      </div>
    </div>
  );
}




function StatCard({ icon, label, value, color }:any) {
  // Dynamic color map for backgrounds
  const colorMap = {
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800",
    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800",
  };

  return (
    <div className={`flex items-center justify-between px-5 py-4 rounded-xl border ${colorMap[color] || colorMap.blue}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </span>
      </div>
      <span className="text-2xl font-bold text-gray-800 dark:text-white">
        {value}
      </span>
    </div>
  );
}