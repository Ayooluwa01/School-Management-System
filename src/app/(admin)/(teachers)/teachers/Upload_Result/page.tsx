"use client";
import React, { useState, useMemo, useCallback } from "react";
import { 
  Search, Save, Filter, GraduationCap, 
  BookOpen, CheckCircle2, AlertCircle, 
  ChevronDown, ArrowRight, User
} from "lucide-react";

// --- MOCK DATA ---
const TEACHER_SUBJECTS = ["Mathematics", "Further Mathematics"];
const CLASSES = ["SSS 1A", "SSS 1B", "SSS 2C"];

const MOCK_STUDENTS = [
  { id: 1, name: "Chinedu Okeke", class: "SSS 1A", subject: "Mathematics", ca: 24, exam: 52 },
  { id: 2, name: "Amina Yusuf", class: "SSS 1A", subject: "Mathematics", ca: 18, exam: 45 },
  { id: 3, name: "Emeka Obi", class: "SSS 1B", subject: "Mathematics", ca: 20, exam: 60 },
  { id: 4, name: "Zainab Ahmed", class: "SSS 1A", subject: "Further Mathematics", ca: 28, exam: 55 },
];

const ScoreRow = React.memo(({ student, onUpdate }: any) => {
  const total = (Number(student.ca) || 0) + (Number(student.exam) || 0);

  return (
    <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
            <User size={14} />
          </div>
          <span className="text-sm font-bold text-zinc-800">{student.name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <input 
          type="number" 
          max={40}
          className="w-20 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-semibold outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-100 transition-all"
          value={student.ca}
          onChange={(e) => onUpdate(student.id, 'ca', e.target.value)}
        />
        <span className="ml-2 text-[10px] text-zinc-400 font-bold">/40</span>
      </td>
      <td className="px-6 py-4">
        <input 
          type="number" 
          max={60}
          className="w-20 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-semibold outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-100 transition-all"
          value={student.exam}
          onChange={(e) => onUpdate(student.id, 'exam', e.target.value)}
        />
        <span className="ml-2 text-[10px] text-zinc-400 font-bold">/60</span>
      </td>
      <td className="px-6 py-4 text-center">
        <div className={`text-sm font-black ${total >= 50 ? 'text-emerald-600' : 'text-zinc-900'}`}>
          {total}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        {total > 0 ? (
          <div className="flex justify-end items-center text-emerald-500 gap-1 text-[10px] font-bold uppercase tracking-widest">
            <CheckCircle2 size={12} /> Ready
          </div>
        ) : (
          <div className="flex justify-end items-center text-zinc-300 gap-1 text-[10px] font-bold uppercase tracking-widest">
            Pending
          </div>
        )}
      </td>
    </tr>
  );
});
ScoreRow.displayName = "ScoreRow";

export default function ScoreEntry() {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [selectedSubject, setSelectedSubject] = useState(TEACHER_SUBJECTS[0]);
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpdate = useCallback((id: number, field: string, value: string) => {
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  }, []);

  const filteredList = useMemo(() => {
    return students.filter(s => {
      const matchesSubject = s.subject === selectedSubject;
      const matchesClass = selectedClass === "All Classes" || s.class === selectedClass;
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSubject && matchesClass && matchesSearch;
    });
  }, [students, selectedSubject, selectedClass, searchTerm]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white min-h-screen text-zinc-900">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2 mb-2 text-zinc-400">
            <GraduationCap size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Academic Records</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Student Score Entry</h1>
          <p className="text-sm text-zinc-500 mt-1 font-medium">Input Continuous Assessment and Exam scores for your students.</p>
        </div>

        <button className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 active:scale-95">
          <Save size={18} /> Save All Grades
        </button>
      </div>

      {/* FILTER TOOLBAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Subject</label>
          <div className="relative">
            <select 
              className="w-full pl-4 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none appearance-none focus:border-zinc-900"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {TEACHER_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <BookOpen className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none" size={16} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Filter Class</label>
          <div className="relative">
            <select 
              className="w-full pl-4 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none appearance-none focus:border-zinc-900"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option>All Classes</option>
              {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none" size={16} />
          </div>
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Search Student</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
            <input 
              className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-zinc-900"
              placeholder="Type student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SCORE TABLE */}
      <div className="border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 text-[10px] uppercase font-bold text-zinc-400 tracking-[0.15em] border-b border-zinc-100">
            <tr>
              <th className="px-6 py-4">Student Identity</th>
              <th className="px-6 py-4 text-center md:text-left">CA (40)</th>
              <th className="px-6 py-4 text-center md:text-left">Exam (60)</th>
              <th className="px-6 py-4 text-center">Total (100)</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length > 0 ? filteredList.map((student) => (
              <ScoreRow key={student.id} student={student} onUpdate={handleUpdate} />
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-32 text-center text-zinc-400 italic">
                  No students found for the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER INFO */}
      <div className="mt-6 p-4 bg-zinc-50 rounded-2xl flex items-center justify-between border border-zinc-100">
        <div className="flex items-center gap-3 text-zinc-500">
            <AlertCircle size={16} />
            <p className="text-[10px] font-bold uppercase tracking-wider">Changes are not final until you click &quot;Save All Grades&quot;</p>
        </div>
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Showing {filteredList.length} Students
        </div>
      </div>

    </div>
  );
}