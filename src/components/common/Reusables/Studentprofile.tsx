"use client";

import React, { useState } from "react";
import { 
  BookOpen, Calendar, DollarSign, FileText, 
  MessageSquare, TrendingUp, AlertCircle, CheckCircle, Clock, Download, 
  UserCog
} from "lucide-react";
import ResultViewer from "./ResultViewer"; // The component we made previously
import ProfileDetails from "./Profiledetails";


interface Fee {
  id: number;
  title: string;
  amount: number;
  paid: number;
  status: "paid" | "partial" | "pending";
  date: string;
}

interface Attendance {
  total_days: number;
  present: number;
  absent: number;
  late: number;
  history: { date: string; status: "present" | "absent" | "late"; reason?: string }[];
}

interface Remark {
  id: number;
  teacher: string;
  role: string; 
  comment: string;
  date: string;
  sentiment: "positive" | "neutral" | "warning";
}

export default function StudentProfileView({ 
  results, 
  fees, 
  attendance, 
  remarks ,
      profileData
}: { 
          profileData:any[]
  results: any[]; 
  fees: Fee[]; 
  attendance: Attendance; 
  remarks: Remark[]; 
}) {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: UserCog }, 
    { id: "academics", label: "Academics", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "finance", label: "Financials", icon: DollarSign },
    { id: "remarks", label: "Remarks", icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. NAVIGATION TABS */}
      <div className="bg-white dark:bg-gray-800 p-1.5 rounded-xl border border-gray-100 dark:border-gray-700 inline-flex flex-wrap gap-1 shadow-sm w-full md:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all
              ${activeTab === tab.id 
                ? "bg-indigo-600 text-white shadow-md" 
                : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:text-gray-400"}
            `}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2. DYNAMIC CONTENT AREA */}
      <div className="min-h-[400px]">
        
        {/* --- VIEW: ACADEMICS --- */}
        {activeTab === "academics" && (
           <ResultViewer results={results} />
        )}

        {/* --- VIEW: ATTENDANCE --- */}
        {activeTab === "attendance" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                 <h3 className="text-gray-500 text-xs font-bold uppercase mb-4">Attendance Overview</h3>
                 <div className="relative h-32 w-32 mx-auto flex items-center justify-center">

                    <div className="absolute inset-0 rounded-full border-[10px] border-gray-100 dark:border-gray-700"></div>
                    <div className="absolute inset-0 rounded-full border-[10px] border-emerald-500 border-t-transparent border-l-transparent -rotate-45"></div>
                    <div className="text-center">
                       <span className="text-3xl font-black text-gray-800 dark:text-white">
                         {((attendance.present / attendance.total_days) * 100).toFixed(0)}%
                       </span>
                    </div>
                 </div>
                 <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 rounded-full bg-emerald-500"/> Present</span>
                      <span className="font-bold">{attendance.present} Days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 rounded-full bg-orange-400"/> Late</span>
                      <span className="font-bold">{attendance.late} Days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 rounded-full bg-red-500"/> Absent</span>
                      <span className="font-bold">{attendance.absent} Days</span>
                    </div>
                 </div>
              </div>
            </div>
            
            {/* History List */}
            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
               <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                 <h3 className="font-bold text-gray-800 dark:text-gray-100">Recent Activity</h3>
               </div>
               <div className="divide-y divide-gray-50 dark:divide-gray-700">
                 {attendance.history.map((day, i) => (
                   <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          day.status === "present" ? "bg-emerald-100 text-emerald-600" : 
                          day.status === "late" ? "bg-orange-100 text-orange-600" : "bg-red-100 text-red-600"
                        }`}>
                          {day.status === "present" ? <CheckCircle size={18}/> : day.status === "late" ? <Clock size={18}/> : <AlertCircle size={18}/>}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{new Date(day.date).toDateString()}</p>
                          {day.reason && <p className="text-xs text-gray-400">Reason: {day.reason}</p>}
                        </div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{day.status}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* --- VIEW: FINANCE --- */}
        {activeTab === "finance" && (
           <div className="space-y-6">
          

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-900 text-[10px] uppercase font-bold text-gray-500">
                    <tr>
                      <th className="p-4">Fee Title</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                    {fees.map((fee) => (
                      <tr key={fee.id}>
                        <td className="p-4 font-semibold text-sm text-gray-700 dark:text-gray-200">{fee.title}</td>
                        <td className="p-4 text-xs text-gray-500">{fee.date}</td>
                        <td className="p-4 text-sm font-bold">${fee.amount.toLocaleString()}</td>
                        <td className="p-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            fee.status === "paid" ? "bg-emerald-100 text-emerald-700" :
                            fee.status === "partial" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                          }`}>
                            {fee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        )}

        {/* --- VIEW: REMARKS --- */}
        {activeTab === "remarks" && (
          <div className="grid grid-cols-1 gap-4">
             {remarks.map((remark) => (
                <div key={remark.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4">
                   <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                         {remark.teacher.charAt(0)}
                      </div>
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center justify-between w-full">
                         <div>
                            <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{remark.teacher}</h4>
                            <p className="text-xs text-gray-400">{remark.role}</p>
                         </div>
                         <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{remark.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg rounded-tl-none">
                         {remark.comment}
                      </p>
                   </div>
                </div>
             ))}
          </div>
        )}

    {/* ---VIEW :PROFILE */}
{activeTab === "profile" && (
   <ProfileDetails data={profileData} /> 
)}

      </div>
    </div>
  );
}