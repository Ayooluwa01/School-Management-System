/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ArrowDownWideNarrow,
  SlidersHorizontal,
  Filter
} from "lucide-react";
import { List } from "@/components/common/Reusables/Lists";
import { PageHeader } from "@/components/common/Reusables/pageHeader";
import { SaveModal } from "@/components/common/Reusables/Preloader";
import { useStudent, useClasses } from "../../../../../../hooks/useSchool";

export default function Allstudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSex, setSelectedSex] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const itemsPerPage = 15;
  // Note: For real pagination, your backend should return a total count. 
  // Using 3000 as a placeholder as per your original code.
  const totalCount = 3000; 
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // 1. Fetch Classes using Hook
  const { classes } = useClasses();

  // 2. Fetch Students using Hook (Passing dynamic filters and page)
  const { 
    data: students = [], 
    isLoading, 
    deleteStudent 
  } = useStudent(currentPage - 1, {
    name: debouncedSearch,
    gender: selectedSex,
    class_id: selectedClass
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 800);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* -------------------------------------------------------------------------- */
  /* HANDLERS                                  */
  /* -------------------------------------------------------------------------- */

  const handleDelete = async (id: number) => {
    setSaveStatus('saving');
    deleteStudent.mutate(id, {
      onSuccess: () => {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 2000);
      },
      onError: () => {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 2500);
      }
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
    setCurrentPage(1);
  };

  const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSex(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto antialiased">
      <SaveModal status={saveStatus} />
      
      <PageHeader Directory='Student Directory' text=' Manage and view all registered students'/>
      
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 bg-white border-b border-gray-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          <div className="relative group grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by name or admission ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-gray-400 pr-2 border-r border-gray-100 mr-1">
              <Filter size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">Filters</span>
            </div>

            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer transition-all"
                value={selectedClass}
                onChange={handleClassChange}
              >
                <option value="All">All Classes</option>
                {classes?.map((cls: any) => (
                  <option key={cls.class_id} value={cls.class_id}>
                    {cls.class_name} - {cls.arm}
                  </option>
                ))}
              </select>
              <ArrowDownWideNarrow className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer transition-all"
                value={selectedSex}
                onChange={handleSexChange}
              >
                <option value="All">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="min-h-[400px]">
           {isLoading ? (
             <div className="flex h-64 items-center justify-center text-gray-400">
               <div className="animate-pulse flex flex-col items-center">
                 <div className="h-4 w-4 bg-gray-200 rounded-full mb-2"></div>
                 <span className="text-xs">Loading Directory...</span>
               </div>
             </div>
           ) : (
            <List
                currentStudents={students}
                handleDelete={handleDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalCount={totalCount}
                startIndex={((currentPage - 1) * itemsPerPage) + 1}
                endIndex={Math.min(currentPage * itemsPerPage, totalCount)} children={undefined}            />
           )}
        </div>
      </div>
    </div>
  );
}