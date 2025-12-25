"use client";
import React, { useState, useMemo, useCallback } from "react";
import { 
  Search, 
  UserPlus, 
  CheckCircle2, 
  School, 
  Users, 
  Filter,
  ArrowRightLeft
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_TEACHERS = [
  { id: 101, name: "Dr. Alexander Marcus" },
  { id: 102, name: "Mrs. Deborah Cole" },
  { id: 103, name: "Mr. Abraham Smith" },
  { id: 104, name: "Prof. Sarah Jenkins" },
];

const MOCK_CLASSES = [
  { id: 1, name: "JSS 1", code: "A", currentTeacherId: 103 },
  { id: 2, name: "JSS 1", code: "B", currentTeacherId: 102 },
  { id: 3, name: "JSS 2", code: "A", currentTeacherId: null },
  { id: 4, name: "JSS 2", code: "B", currentTeacherId: 101 },
  { id: 5, name: "SSS 3", code: "C", currentTeacherId: null },
];

// --- MEMOIZED ROW COMPONENT ---
// This prevents the entire list from re-rendering when only one class assignment changes
const AssignmentRow = React.memo(({ cls, teachers, onAssign }: any) => {
  return (
    <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 font-bold text-xs border border-zinc-200">
            {cls.code}
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-800">{cls.name} {cls.code}</p>
            <p className="text-[10px] text-zinc-400 uppercase font-medium tracking-wider">Main Classroom</p>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="relative max-w-[240px]">
          <select 
            value={cls.currentTeacherId || ""}
            onChange={(e) => onAssign(cls.id, e.target.value)}
            className={`w-full pl-3 pr-8 py-2 text-sm rounded-lg border appearance-none outline-none transition-all font-medium
              ${cls.currentTeacherId 
                ? "bg-white border-zinc-200 text-zinc-700" 
                : "bg-orange-50/50 border-orange-100 text-orange-600 italic"
              } focus:border-zinc-900 focus:ring-2 focus:ring-zinc-100`}
          >
            <option value="">Unassigned — Select Teacher</option>
            {teachers.map((t: any) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
            <UserPlus size={14} />
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        {cls.currentTeacherId ? (
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
            <CheckCircle2 size={12} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Assigned</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-zinc-400 bg-zinc-100 w-fit px-3 py-1 rounded-full border border-zinc-200">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending</span>
          </div>
        )}
      </td>
    </tr>
  );
});
AssignmentRow.displayName = "AssignmentRow";

// --- MAIN PAGE COMPONENT ---
export default function AssigningClasses() {
  const [classes, setClasses] = useState(MOCK_CLASSES);
  const [searchTerm, setSearchTerm] = useState("");

  // Handler for updating assignment
  const handleAssign = useCallback((classId: number, teacherId: string) => {
    setClasses(prev => prev.map(c => 
      c.id === classId ? { ...c, currentTeacherId: teacherId ? parseInt(teacherId) : null } : c
    ));
  }, []);

  // Filter logic
  const filteredClasses = useMemo(() => {
    return classes.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [classes, searchTerm]);

  // Assignment Stats
  const stats = useMemo(() => {
    const assigned = classes.filter(c => c.currentTeacherId).length;
    return {
      total: classes.length,
      assigned,
      pending: classes.length - assigned
    };
  }, [classes]);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white min-h-screen text-zinc-900">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Class Assignments</h1>
          <p className="text-sm text-zinc-500">Connect classrooms to primary instructors for the 2025 session.</p>
        </div>
        
        <div className="flex gap-2">
            <div className="px-4 py-2 bg-zinc-50 rounded-lg border border-zinc-100 text-center">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Assigned</p>
                <p className="text-lg font-bold">{stats.assigned}/{stats.total}</p>
            </div>
            <div className="px-4 py-2 bg-orange-50 rounded-lg border border-orange-100 text-center">
                <p className="text-[10px] font-bold text-orange-400 uppercase">Pending</p>
                <p className="text-lg font-bold text-orange-600">{stats.pending}</p>
            </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Filter by class name (e.g. JSS 1)..." 
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="p-2.5 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors text-zinc-500">
          <Filter size={18} />
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50 text-[10px] uppercase font-bold text-zinc-400 tracking-[0.1em]">
            <tr>
              <th className="px-6 py-4">Classroom</th>
              <th className="px-6 py-4">Assigned Teacher</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.length > 0 ? filteredClasses.map((cls) => (
              <AssignmentRow 
                key={cls.id} 
                cls={cls} 
                teachers={MOCK_TEACHERS} 
                onAssign={handleAssign} 
              />
            )) : (
              <tr>
                <td colSpan={3} className="px-6 py-20 text-center text-zinc-400 italic text-sm">
                  No classes found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER ACTION */}
      <div className="mt-8 flex justify-end">
        <button className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg active:scale-95">
          <ArrowRightLeft size={16} /> Update All Assignments
        </button>
      </div>

    </div>
  );
}