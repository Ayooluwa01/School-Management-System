"use client";

import React, { useState } from "react";
import { Studentlist } from "../../../../../../libs/Fakedata/students";
import {
  Search,
  ArrowDownWideNarrow,
  SlidersHorizontal,
  Filter,
  Users
} from "lucide-react";
import { List } from "@/components/common/Reusables/Lists";

export default function Allstudents() {
  const [students, setStudents] = useState(Studentlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSex, setSelectedSex] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admission_no.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass =
      selectedClass === "All" || String(s.class_id) === String(selectedClass);
    const matchesSex =
      selectedSex === "All" || s.sex === selectedSex;

    return matchesSearch && matchesClass && matchesSex;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.student_id !== id));
  };

  const classOptions = ["All", ...Array.from(new Set(students.map((s) => s.class_id)))];

  return (
    <div className="max-w-6xl mx-auto antialiased">
      {/* PAGE HEADER */}
      <div className="mb-6 flex items-center justify-between px-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Directory</h1>
          <p className="text-sm text-gray-500">Manage and view all registered students</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium border border-blue-100">
          <Users size={16} />
          {students.length} Total
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* MODERN TOOLBAR */}
        <div className="p-5 bg-white border-b border-gray-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* SEARCH BOX */}
          <div className="relative group flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by name or admission ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* FILTERS GROUP */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-gray-400 pr-2 border-r border-gray-100 mr-1">
              <Filter size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">Filters</span>
            </div>

            {/* CLASS SELECT */}
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer transition-all"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Classes</option>
                {classOptions.filter(c => c !== "All").map((cls) => (
                  <option key={cls} value={cls}>Class {cls}</option>
                ))}
              </select>
              <ArrowDownWideNarrow className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>

            {/* SEX SELECT */}
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer transition-all"
                value={selectedSex}
                onChange={(e) => {
                  setSelectedSex(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* LIST AREA */}
        <div className="min-h-[400px]">
          <List
            currentStudents={currentStudents}
            handleDelete={handleDelete}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalCount={filteredStudents.length}
            startIndex={indexOfFirstItem}
            endIndex={indexOfLastItem}
          />
        </div>
      </div>
    </div>
  );
}