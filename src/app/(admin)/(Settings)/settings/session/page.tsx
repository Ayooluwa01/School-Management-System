"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar, Plus, CheckCircle2, Lock, Unlock,
  Trash2, CalendarDays, Power, ToggleLeft, ToggleRight,
  AlertTriangle, Save, Hash, Loader2
} from "lucide-react";
import { useSession_Terms } from "../../../../../../hooks/useSchool";

export default function AcademicDatabaseManager() {
  const { data: sessionsData, isLoading, refetch } = useSession_Terms();
  
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);

  useEffect(() => {
    if (sessionsData) {
      setSessions(sessionsData);
      if (!selectedSessionId && sessionsData.length > 0) {
        setSelectedSessionId(sessionsData[0].session_id);
      }
    }
  }, [sessionsData]);

  const currentSession = sessions.find(s => s.session_id === selectedSessionId);


  const handleTermActiveToggle = (termId: number) => {
    if (!currentSession) return;

    const termToUpdate = currentSession.terms.find((t: any) => t.term_id === termId);
    const isCurrentlyActive = termToUpdate?.is_active;

    // RULE: If trying to activate, check if another term is already active
    if (!isCurrentlyActive) {
      const activeTerm = currentSession.terms.find((t: any) => t.is_active);
      if (activeTerm) {
        alert(`Term ${activeTerm.term_name} is still active. Please close or deactivate it before starting a new term.`);
        return;
      }
    }

    updateTerm(termId, 'is_active', !isCurrentlyActive);
  };

  const updateTerm = (termId: number, field: string, value: any) => {
    setSessions(prev => prev.map(s => {
      if (s.session_id === selectedSessionId) {
        return {
          ...s,
          terms: s.terms.map((t: any) => t.term_id === termId ? { ...t, [field]: value } : t)
        };
      }
      return s;
    }));
  };

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
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Connected to Database</p>
          </div>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2">
          <Plus size={14} /> New Session
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar: Sessions List */}
        <aside className="w-72 border-r border-slate-200 bg-white overflow-y-auto p-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Academic Sessions</h2>
          <div className="space-y-2">
            {sessions.map(s => (
              <button
                key={s.session_id}
                onClick={() => setSelectedSessionId(s.session_id)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selectedSessionId === s.session_id 
                  ? "border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-600" 
                  : "border-transparent hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${selectedSessionId === s.session_id ? "text-indigo-700" : "text-slate-700"}`}>
                    {s.name}
                  </span>
                  {s.is_active && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {s.start_date} - {s.end_date}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex-1 overflow-y-auto p-8">
          {currentSession && (
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Session Header Card */}
              <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Session Dates</h3>
                  <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                      {currentSession.is_active ? <CheckCircle2 className="text-emerald-500" size={20} /> : <AlertTriangle className="text-slate-300" size={20} />}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Session Start</label>
                    <input 
                      type="date"
                      value={currentSession.start_date}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Session End</label>
                    <input 
                      type="date"
                      value={currentSession.end_date}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none cursor-pointer"
                    />
                  </div>
                </div>
              </section>

              {/* Terms Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Session Terms</h3>
                  <button className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                    <Plus size={14} /> Add Term
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentSession.terms.map((term: any) => (
                    <div 
                      key={term.term_id}
                      className={`bg-white border rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 transition-all ${
                        term.is_active ? "border-emerald-500 ring-1 ring-emerald-500/10 shadow-sm" : "border-slate-200"
                      } ${term.is_closed ? "bg-slate-50/50 grayscale-[0.5]" : ""}`}
                    >
                      {/* Control Buttons */}
                      <div className="flex md:flex-col gap-2 shrink-0">
                        <button 
                          onClick={() => handleTermActiveToggle(term.term_id)}
                          className={`p-2 rounded-xl border transition-all ${
                            term.is_active ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-white border-slate-200 text-slate-300 hover:text-emerald-400"
                          }`}
                        >
                          <Power size={18} />
                        </button>
                        <button 
                          onClick={() => updateTerm(term.term_id, 'is_closed', !term.is_closed)}
                          className={`p-2 rounded-xl border transition-all ${
                            term.is_closed ? "bg-slate-800 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-300 hover:text-slate-600"
                          }`}
                        >
                          {term.is_closed ? <Lock size={18} /> : <Unlock size={18} />}
                        </button>
                      </div>

                      {/* Numerical Title & Date Pickers */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1">
                            <Hash size={10} /> Term (No.)
                          </label>
                          <input 
                            type="number"
                            value={term.term_name}
                            onChange={(e) => updateTerm(term.term_id, 'term_name', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Start Date</label>
                          <input 
                            type="date"
                            value={term.start_date}
                            onChange={(e) => updateTerm(term.term_id, 'start_date', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] outline-none cursor-pointer"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">End Date</label>
                          <input 
                            type="date"
                            value={term.end_date}
                            onChange={(e) => updateTerm(term.term_id, 'end_date', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] outline-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sync Footer */}
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Save size={20} className="text-indigo-400" />
                  </div>
                  <p className="text-xs font-medium">Ready to save changes to the central database?</p>
                </div>
                <button className="bg-white text-slate-900 text-xs font-bold px-6 py-2 rounded-lg hover:bg-slate-100 transition-all">
                  Update Academic Structure
                </button>
              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}