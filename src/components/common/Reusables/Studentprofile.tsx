"use client";

import React, { useState } from "react";
import { 
  BookOpen, Calendar, DollarSign, FileText, 
  MessageSquare, TrendingUp, AlertCircle, CheckCircle, Clock, Download, 
  UserCog
} from "lucide-react";
import ResultViewer from "./ResultViewer";
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
  remarks,
  profileData
}: { 
  profileData: any[];
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
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-md shadow-slate-200/50 inline-flex flex-wrap gap-2 w-full md:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all
              ${activeTab === tab.id 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
            `}
          >
            <tab.icon size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 2. DYNAMIC CONTENT AREA */}
      <div className="min-h-[400px]">
        
        {/* --- VIEW: PROFILE --- */}
        {activeTab === "profile" && (
          <ProfileDetails data={profileData} /> 
        )}

        {/* --- VIEW: ACADEMICS --- */}
        {activeTab === "academics" && (
          <ResultViewer results={results} data={profileData} />
        )}

        {/* --- VIEW: ATTENDANCE --- */}
        {activeTab === "attendance" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white p-6 rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200">
                <h3 className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-6">Attendance Overview</h3>
                <div className="relative h-32 w-32 mx-auto flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e2e8f0"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#10b981"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${(attendance.present / attendance.total_days) * 352} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="text-center">
                    <span className="text-3xl font-semibold text-slate-900">
                      {((attendance.present / attendance.total_days) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"/>
                      Present
                    </span>
                    <span className="font-semibold text-slate-900">{attendance.present} Days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-orange-400"/>
                      Late
                    </span>
                    <span className="font-semibold text-slate-900">{attendance.late} Days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-red-500"/>
                      Absent
                    </span>
                    <span className="font-semibold text-slate-900">{attendance.absent} Days</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* History List */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Recent Activity</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {attendance.history.map((day, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        day.status === "present" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : 
                        day.status === "late" ? "bg-orange-50 text-orange-600 border border-orange-200" : 
                        "bg-red-50 text-red-600 border border-red-200"
                      }`}>
                        {day.status === "present" ? <CheckCircle size={18}/> : 
                         day.status === "late" ? <Clock size={18}/> : 
                         <AlertCircle size={18}/>}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{new Date(day.date).toDateString()}</p>
                        {day.reason && <p className="text-xs text-slate-500">Reason: {day.reason}</p>}
                      </div>
                    </div>
                    <span className={`text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      day.status === "present" ? "bg-emerald-100 text-emerald-700" :
                      day.status === "late" ? "bg-orange-100 text-orange-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {day.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: FINANCE --- */}
        {activeTab === "finance" && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-blue-700 uppercase tracking-wide">Total Fees</p>
                    <p className="text-2xl font-semibold text-slate-900">
                      ${fees.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CheckCircle size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide">Paid</p>
                    <p className="text-2xl font-semibold text-slate-900">
                      ${fees.reduce((sum, fee) => sum + fee.paid, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle size={18} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-700 uppercase tracking-wide">Balance</p>
                    <p className="text-2xl font-semibold text-slate-900">
                      ${fees.reduce((sum, fee) => sum + (fee.amount - fee.paid), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fees Table */}
            <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase font-medium text-slate-600">
                  <tr>
                    <th className="p-4">Fee Title</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Paid</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fees.map((fee) => (
                    <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-sm text-slate-900">{fee.title}</td>
                      <td className="p-4 text-xs text-slate-600">{fee.date}</td>
                      <td className="p-4 text-sm font-semibold text-slate-900">${fee.amount.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium text-slate-700">${fee.paid.toLocaleString()}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-medium uppercase ${
                          fee.status === "paid" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" :
                          fee.status === "partial" ? "bg-orange-100 text-orange-700 border border-orange-200" : 
                          "bg-red-100 text-red-700 border border-red-200"
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
              <div key={remark.id} className="bg-white p-6 rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg shadow-blue-500/30">
                    {remark.teacher.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{remark.teacher}</h4>
                      <p className="text-xs text-slate-500 font-medium">{remark.role}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                      {remark.date}
                    </span>
                  </div>
                  <div className={`p-4 rounded-xl rounded-tl-none ${
                    remark.sentiment === "positive" ? "bg-emerald-50 border border-emerald-200" :
                    remark.sentiment === "warning" ? "bg-red-50 border border-red-200" :
                    "bg-slate-50 border border-slate-200"
                  }`}>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {remark.comment}
                    </p>
                  </div>
                  {remark.sentiment === "positive" && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                      <CheckCircle size={12} />
                      Positive Feedback
                    </span>
                  )}
                  {remark.sentiment === "warning" && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700">
                      <AlertCircle size={12} />
                      Needs Attention
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}