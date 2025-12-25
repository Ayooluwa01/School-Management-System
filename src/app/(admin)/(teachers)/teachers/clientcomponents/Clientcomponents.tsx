"use client"
import { Search, Filter, ArrowDownWideNarrow, SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react'

export function Toolbox() {
          const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSex, setSelectedSex] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
    const [classes, setClasses] = useState<any>([]);
  
  const classOptions = ["All", ...Array.from(new Set(classes.map((c: any) => c.class_id)))];

  return (
 
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

          {/* FILTERS */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-gray-400 pr-2 border-r border-gray-100 mr-1">
              <Filter size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Filters
              </span>
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
                {classOptions
                  .filter((c) => c !== "All")
                  .map((cls) => (
                    <option key={cls} value={cls}>
                     {cls}
                    </option>
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
)
}
