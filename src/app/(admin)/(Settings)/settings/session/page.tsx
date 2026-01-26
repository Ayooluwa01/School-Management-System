"use client";

import React, { useState, useMemo } from "react";
import { 
  CalendarDays, Loader2, CheckCircle2, AlertTriangle, 
  Hash, Power, Lock, Unlock, Plus 
} from "lucide-react";
import { useSession_Terms } from "../../../../../../hooks/useSchool";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function AcademicDatabaseManager() {
  const { data: sessionsData, isLoading } = useSession_Terms();
  
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  
 
  const activeId = selectedSessionId ?? sessionsData?.[0]?.session_id;

  const currentSessionSource = sessionsData?.find((s: any) => s.session_id === activeId);

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 font-sans flex flex-col">
      <header className="border-b border-slate-200 bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <CalendarDays size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900">Academic Structure</h1>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Configuration</p>
          </div>
        </div>
        <button className="opacity-50 cursor-not-allowed bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2" disabled>
          <Plus size={14} /> New Session
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-72 border-r border-slate-200 bg-white overflow-y-auto p-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Sessions</h2>
          <div className="space-y-2">
            {sessionsData?.map((s: any) => (
              <button
                key={s.session_id}
                onClick={() => setSelectedSessionId(s.session_id)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  // Use activeId for highlighting the selection
                  activeId === s.session_id 
                  ? "border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-600" 
                  : "border-transparent hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${activeId === s.session_id ? "text-indigo-700" : "text-slate-700"}`}>
                    {s.name}
                  </span>
                  {s.is_active && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">{s.start_date}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* WORKSPACE */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
          {currentSessionSource ? (
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Session Summary Card */}
              <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Session Dates</h3>
                  <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">System Status</span>
                      {currentSessionSource.is_active ? <CheckCircle2 className="text-emerald-500" size={18} /> : <AlertTriangle className="text-slate-300" size={18} />}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DateDisplay label="Session Start" value={currentSessionSource.start_date} />
                  <DateDisplay label="Session End" value={currentSessionSource.end_date} />
                </div>
              </section>

              {/* Terms Section */}
              <section className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 px-2">Academic Terms</h3>
                <div className="grid grid-cols-1 gap-3">
                  {currentSessionSource.terms?.map((term: any) => (
                    <div 
                      key={term.term_id}
                      className={`bg-white border rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 transition-all ${
                        term.is_active ? "border-emerald-500 shadow-sm" : "border-slate-200"
                      }`}
                    >
                      <div className="flex md:flex-col gap-2">
                        <StatusIcon active={term.is_active} icon={<Power size={18} />} />
                        <StatusIcon active={term.is_closed} icon={term.is_closed ? <Lock size={18} /> : <Unlock size={18} />} isDark={term.is_closed} />
                      </div>

                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1">
                            <Hash size={10} /> Term Title
                          </label>
                          <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-sm font-bold text-slate-700">
                            {term.term_name}
                          </div>
                        </div>
                        <DateDisplay label="Term Start" value={term.start_date} small />
                        <DateDisplay label="Term End" value={term.end_date} small />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Locked Footer */}
              <div className="flex items-center justify-between p-5 bg-slate-900 rounded-2xl text-white shadow-xl">
                <p className="text-xs font-medium text-slate-300">
                  Modifications are locked. End the current term to adjust the structure.
                </p>
                <button className="bg-slate-700 text-slate-400 text-xs font-bold px-6 py-2 rounded-lg cursor-not-allowed" disabled>
                  Sync Database
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <CalendarDays size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">Select a session to manage structure</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const DateDisplay = ({ label, value, small }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{label}</label>
    <div className={`relative flex items-center ${small ? 'h-10' : 'h-12'}`}>
        <DatePicker
          disabled
          selected={value ? new Date(value) : null} 
          dateFormat="dd/MM/yyyy"
          className="w-full h-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 text-slate-600 text-sm font-semibold outline-none cursor-not-allowed"
        />
        <CalendarDays size={14} className="absolute right-4 text-slate-300 pointer-events-none" />
    </div>
  </div>
);

const StatusIcon = ({ active, icon, isDark }: any) => (
    <div className={`p-2 rounded-xl border transition-all ${
        active 
        ? (isDark ? "bg-slate-800 border-slate-800 text-white" : "bg-emerald-50 border-emerald-200 text-emerald-600") 
        : "bg-white border-slate-200 text-slate-300"
    }`}>
        {icon}
    </div>
);