"use client";
import React, { useState, useMemo } from "react";
import { 
  Download, 
  Users, 
  Search, 
  ChevronRight, 
  ArrowDownToLine,
  Layers,
  GraduationCap
} from "lucide-react";

// --- DUMMY DATA ---
const CLASSES_DATA = [
  { id: 1, name: "JSS 1", arm: "A", students: 42, category: "Junior", teacher: "Mr. Okon" },
  { id: 2, name: "JSS 1", arm: "B", students: 38, category: "Junior", teacher: "Mrs. Adeyemi" },
  { id: 3, name: "SSS 1", arm: "Science", students: 35, category: "Senior", teacher: "Dr. Ibrahim" },
  { id: 4, name: "SSS 1", arm: "Art", students: 28, category: "Senior", teacher: "Ms. Linda" },
  { id: 5, name: "SSS 3", arm: "Commercial", students: 31, category: "Senior", teacher: "Mr. Eze" },
  { id: 6, name: "JSS 2", arm: "C", students: 40, category: "Junior", teacher: "Mrs. Bello" },
];

export default function ClassResultsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredClasses = useMemo(() => {
    return CLASSES_DATA.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.arm.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "All" || item.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter]);

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-zinc-900 font-sans pb-20">
      
      {/* --- SLEEK HEADER --- */}
      <div className="bg-white border-b border-zinc-100 px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
               <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Academic Records</span>
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Terminal Results</h1>
            <p className="text-sm text-zinc-500 mt-2 max-w-md">Select a class to generate and export student performance reports for the current term.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search class..."
                className="pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 w-full md:w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        
        {/* --- MINIMAL FILTER --- */}
        <div className="flex items-center gap-6 mb-10 border-b border-zinc-100">
          {["All", "Junior", "Senior"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                filter === type ? "text-indigo-600" : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {type} Sectors
              {filter === type && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 animate-in fade-in zoom-in duration-300" />}
            </button>
          ))}
        </div>

        {/* --- CLEAN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClasses.map((cls) => (
            <ClassCard key={cls.id} cls={cls} />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- REFINED CLASS CARD ---

function ClassCard({ cls }: { cls: any }) {
  return (
    <div className="group bg-white border border-zinc-100 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-300 hover:bg-[#FCFCFD]">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-indigo-600 group-hover:border-zinc-200 border border-transparent transition-all">
              <Layers size={18} />
           </div>
           <div>
              <h3 className="text-lg font-bold text-zinc-900 leading-none">
                {cls.name} <span className="text-zinc-400 font-medium ml-1">{cls.arm}</span>
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium mt-1 uppercase tracking-wider">{cls.category} Division</p>
           </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 border-y border-zinc-50 mb-6">
         <div className="flex items-center gap-2">
            <Users size={14} className="text-zinc-400" />
            <span className="text-xs font-semibold text-zinc-600">{cls.students} Students</span>
         </div>
         <div className="flex items-center gap-2">
            <GraduationCap size={14} className="text-zinc-400" />
            <span className="text-xs font-semibold text-zinc-600">{cls.teacher}</span>
         </div>
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]">
         <ArrowDownToLine size={15} />
         Download Result Sheets
      </button>
    </div>
  );
}