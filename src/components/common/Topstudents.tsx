"use client";

import React from "react";
import { Trophy, Award, Medal, Star, User } from "lucide-react";

const topStudents = [
  { id: 1, name: "Adebayo Samuel", age: 14, class: "JSS 3A", average: 92, image: "https://images.unsplash.com/photo-1594191316005-4c6981881779?w=100&h=100&fit=crop" },
  { id: 2, name: "Blessing Okorie", age: 15, class: "SS 1B", average: 90, image: "https://images.unsplash.com/photo-1594191316005-4c6981881779?w=100&h=100&fit=crop" },
  { id: 3, name: "Ibrahim Musa", age: 16, class: "SS 2A", average: 88, image: "" },
  { id: 4, name: "Esther Johnson", age: 14, class: "JSS 2C", average: 87, image: "" },
  { id: 5, name: "Daniel Olatunji", age: 15, class: "SS 1A", average: 86, image: "" },
];

export default function TopStudentsList() {
  const getRankBadge = (index) => {
    switch (index) {
      case 0: return <Trophy className="text-yellow-500" size={18} />;
      case 1: return <Medal className="text-slate-400" size={18} />;
      case 2: return <Medal className="text-amber-600" size={18} />;
      default: return <span className="text-xs font-bold text-gray-400">#{index + 1}</span>;
    }
  };

  return (
    <div className="rounded-2xl border  flex flex-col overflow-hidden max-w-md">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              Academic Leaders <Star size={16} className="fill-yellow-400 text-yellow-400" />
            </h3>
            <p className="text-blue-100 text-xs opacity-80">Current term top performers</p>
          </div>
          <Award className="text-white/20" size={40} />
        </div>
      </div>

      {/* LIST CONTENT */}
      <div className="p-3 space-y-3 overflow-y-auto max-h-[420px] custom-scrollbar">
        {topStudents.map((student, index) => (
          <div
            key={student.id}
            className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-200 border ${
              index === 0 
                ? "bg-yellow-50/50 border-yellow-100" 
                : "bg-white border-transparent hover:border-gray-100 hover:shadow-sm"
            }`}
          >
            {/* RANK ICON */}
            <div className="w-8 flex justify-center shrink-0">
              {getRankBadge(index)}
            </div>

            {/* AVATAR */}
            <div className="relative shrink-0">
              {student.image ? (
                <img 
                  src={student.image} 
                  alt={student.name} 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <User size={20} />
                </div>
              )}
              {index === 0 && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">1</span>
                </div>
              )}
            </div>

            {/* NAME & INFO */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate leading-tight">
                {student.name}
              </p>
              <p className="text-[11px] text-gray-500 font-medium">
                {student.class} <span className="mx-1 text-gray-300">•</span> {student.age} yrs
              </p>
            </div>

            {/* SCORE */}
            <div className="text-right shrink-0">
              <div className={`text-sm font-bold ${
                index === 0 ? "text-yellow-600" : "text-green-600"
              }`}>
                {student.average}%
              </div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">AVG</div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER ACTION */}
      <button className="w-full py-3 bg-gray-50 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100">
        View Full Rankings
      </button>
    </div>
  );
}