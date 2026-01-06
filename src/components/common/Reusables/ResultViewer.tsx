"use client";

import React, { useState } from "react";
import { BookOpen, AlertCircle, FileSpreadsheet } from "lucide-react";

interface Result {
  result_id: number;
  subject_id: number;
  term: string; 
    test1: number;
  test2: number;
  exam: number;
  total: number;
  grade: string;
  subject_name?: string;
}

export default function ResultViewer({ results }: { results: Result[] }) {
  const [activeTerm, setActiveTerm] = useState("1");

  const filteredResults = results.filter((r) => r.term === activeTerm);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "B": return "bg-blue-100 text-blue-700 border-blue-200";
      case "C": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "F": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full">
      {/* HEADER & FILTER TABS */}
      <div className="border-b border-gray-100 dark:border-gray-700 p-4 sm:flex sm:items-center sm:justify-between gap-4">
        <div>
           <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
             <FileSpreadsheet className="w-5 h-5 text-blue-600" />
             Academic Transcript
           </h3>
           <p className="text-xs text-gray-500">Select a term to view performance</p>
        </div>

        {/* Term Switcher */}
        <div className="mt-3 sm:mt-0 flex p-1 bg-gray-100 dark:bg-gray-900 rounded-xl w-fit">
          {["1", "2", "3"].map((term) => (
            <button
              key={term}
              onClick={() => setActiveTerm(term)}
              className={`
                px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200
                ${
                  activeTerm === term
                    ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                }
              `}
            >
              Term {term}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE CONTENT */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/50 text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100 dark:border-gray-700">
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4 text-center">Test 1</th>
              <th className="px-6 py-4 text-center">Test 2</th>
              <th className="px-6 py-4 text-center">Exam</th>
              <th className="px-6 py-4 text-center">Total</th>
              <th className="px-6 py-4 text-right">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
            {filteredResults.length > 0 ? (
              filteredResults.map((res) => (
                <tr
                  key={res.result_id}
                  className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                        <BookOpen size={14} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        {res.subject_name || `Subject ${res.subject_id}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-medium text-gray-500">
                    {res.test1}
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-medium text-gray-500">
                    {res.test2}
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-medium text-gray-500">
                    {res.exam}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-black text-gray-800 dark:text-gray-100">
                      {res.total}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold border ${getGradeColor(res.grade)}`}
                    >
                      {res.grade}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm">No results found for Term {activeTerm}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer Summary */}
      <div className="mt-auto bg-gray-50 dark:bg-gray-900/30 p-4 border-t border-gray-100 dark:border-gray-700">
         <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Subjects: {filteredResults.length}</span>
            <span>Term Average: <strong className="text-gray-800 dark:text-gray-200">{filteredResults.length > 0 ? (filteredResults.reduce((a, b) => a + b.total, 0) / filteredResults.length).toFixed(1) : 0}%</strong></span>
         </div>
      </div>
    </div>
  );
}