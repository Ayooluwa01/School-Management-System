/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ArrowDownWideNarrow,
  SlidersHorizontal,
  Filter,
  Users
} from "lucide-react";
import { List } from "@/components/common/Reusables/Lists";
import { Fetch, fetchClasses } from "../../../../../../libs/api";
import { PageHeader } from "@/components/common/Reusables/pageHeader";
import api from "../../../../../../libs/axios";
import { SaveModal } from "@/components/common/Reusables/Preloader";


export default function Allstudents() {
  const [students, setStudents] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const [classes, setClasses] = useState<any>([]);
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 15;

  const totalPages = Math.ceil(totalCount / itemsPerPage);


  /* -------------------------------------------------------------------------- */
  /*                            Fetch STUDENTS (API)                             */
  /* -------------------------------------------------------------------------- */

const getStudents = async () => {
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    const response = await api.get('/students/all_students', {
      params: {
        limit: itemsPerPage,
        offset
      },
    });

    setStudents(response.data);
    setTotalCount(3000); 

  } catch (err) {
    console.error(err);
  }
};


  /* -------------------------------------------------------------------------- */
  /*                        EFFECT: Runs ONLY when needed                       */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
        getStudents();
  }, [currentPage]);


// Fetch all classes
useEffect(() => {
  async function loadData() {
  try {
      const { classList } = await fetchClasses(); 
setClasses(classList)      
    } catch (err) {
      setClasses([]);
    }
  }


  loadData();
}, []);


// Filter student
useEffect(() => {

  if(selectedSex==='All'){
    setSelectedSex('')
  }else{
      const handler = setTimeout(async () => {
    const offset = (currentPage - 1) * itemsPerPage;

    try {
      const response = await api.get('/students/filter_student', {
        params: {
          limit: itemsPerPage,
          offset,
          name: searchTerm,
          gender: selectedSex,
          class_id: selectedClass,
        },
      });

      setStudents(response.data);
      setTotalCount(3000);
    } catch (err) {
      console.error(err);
    }
  }, 800); 
  return () => clearTimeout(handler);
  }


}, [searchTerm, selectedClass, selectedSex,currentPage]);



  useEffect(()=>{
setStudents([])
  },[searchTerm])
  /* ---------------- DELETE HANDLER ---------------- */
const handleDelete = async (id: number) => {
      setSaveStatus('saving');
  try {
    const res = await api.delete(`/students/delete/${id}`);
    if (res.data.deleted) {
          setSaveStatus('success');
      
      setTimeout(() => {
        setSaveStatus('idle');
     
      }, 2000);
    }
  } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2500)
  }
};



  return (
    <div className="max-w-6xl mx-auto antialiased">
            <SaveModal status={saveStatus} />
      
      {/* PAGE HEADER */}

<PageHeader Directory='Student Directory' text=' Manage and view all registered students'/>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* TOOLBAR */}
        <div className="p-5 bg-white border-b border-gray-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* SEARCH BOX */}
          <div className="relative group grow max-w-md">
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
  {classes.map((cls: any) => (
    <option key={cls.class_id} value={cls.class_id}>
      {cls.class_name} - {cls.arm}
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
                <option value="All">All</option>
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
            currentStudents={students}
            handleDelete={handleDelete}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            startIndex={1}
            endIndex={2}        />
        </div>
      </div>
    </div>
  );
}
