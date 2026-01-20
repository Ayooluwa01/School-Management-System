"use client";

import React, { useState } from "react";
import { 
  Trophy, 
  Plus, 
  Trash2, 
  Save, 
  ChevronDown, 
  Layers,
  Sparkles,
  ShieldCheck
} from "lucide-react";

interface GradeEntry {
  grading_id?: number;
  min_score: number;
  max_score: number;
  grade: string;
  remark: string;
}

export default function SleekGradingManager() {
  const [grades, setGrades] = useState<GradeEntry[]>([
    { min_score: 70, max_score: 100, grade: "A", remark: "Excellent" },
  ]);

  const scoreOptions = Array.from({ length: 101 }, (_, i) => i).reverse();

  const addGradeRow = () => {
    const lastGrade = grades[grades.length - 1];
    const newMax = lastGrade ? lastGrade.min_score - 1 : 100;
    const newMin = Math.max(0, newMax - 10);
    
    setGrades([...grades, { 
      min_score: newMin, 
      max_score: newMax, 
      grade: "", 
      remark: "" 
    }]);
  };

  const updateGrade = (index: number, field: keyof GradeEntry, value: any) => {
    const updated = [...grades];
    updated[index] = { ...updated[index], [field]: value };
    setGrades(updated);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-10 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Sleek Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-600 text-[10px] font-black text-white px-2 py-0.5 rounded uppercase tracking-tighter">System Config</span>
              <div className="h-[1px] w-8 bg-slate-200" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800">Grading Metrics</h1>
          </div>
          <button 
            onClick={addGradeRow}
            className="group flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm shadow-slate-200"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> 
            Add Grade Scale
          </button>
        </div>

        {/* Grade Cards List */}
        <div className="space-y-4">
          {grades.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-white border border-slate-100 rounded-4xl p-6  hover:shadow-sm transition-all flex flex-wrap md:flex-nowrap items-center gap-6"
            >
              {/* Grade Badge */}
              <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 w-20 h-20 rounded-3xl shrink-0 group-hover:border-indigo-200 group-hover:bg-indigo-50/30 transition-colors">
                <span className="text-[10px] font-black text-slate-400 uppercase mb-1">Grade</span>
                <input 
                  type="text"
                  value={item.grade}
                  onChange={(e) => updateGrade(index, 'grade', e.target.value.toUpperCase())}
                  placeholder="?"
                  className="bg-transparent text-xl font-black text-indigo-600 w-full text-center outline-none placeholder:text-slate-200"
                />
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Min Score</label>
                  <div className="relative">
                    <select 
                      value={item.min_score}
                      onChange={(e) => updateGrade(index, 'min_score', Number(e.target.value))}
                      className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
                    >
                      {scoreOptions.map(num => (
                        <option key={num} value={num}>{num}%</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Max Score</label>
                  <div className="relative">
                    <select 
                      value={item.max_score}
                      onChange={(e) => updateGrade(index, 'max_score', Number(e.target.value))}
                      className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
                    >
                      {scoreOptions.map(num => (
                        <option key={num} value={num}>{num}%</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Remark Input */}
              <div className="flex-[1.5] space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Remark</label>
                <input 
                  type="text"
                  value={item.remark}
                  onChange={(e) => updateGrade(index, 'remark', e.target.value)}
                  placeholder="Describe performance..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Delete Button */}
              <button 
                onClick={() => setGrades(grades.filter((_, i) => i !== index))}
                className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          {grades.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[3rem]">
              <Sparkles className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-400 font-medium">No grading tiers established yet.</p>
            </div>
          )}
        </div>

        {/* Global Action Bar */}
        <div className="mt-12 p-1.5 bg-white border border-slate-100 rounded-[2.5rem] shadow-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4 pl-6">
            <div className="bg-emerald-500/10 p-2 rounded-full">
              <ShieldCheck className="text-emerald-600" size={20} />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">Submit To update Grading Schema</span>
          </div>
          <button className="bg-slate-900 hover:bg-indigo-600 text-white px-10 py-4 rounded-[2rem] font-black text-sm transition-all flex items-center gap-3">
            <Save size={18} /> Update Grading Scheme
          </button>
        </div>
      </div>
    </div>
  );
}