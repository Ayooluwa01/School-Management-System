/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ArrowDownWideNarrow,
  SlidersHorizontal,
  Filter
} from "lucide-react";
import { PageHeader } from "@/components/common/Reusables/pageHeader";
import { SaveModal } from "@/components/common/Reusables/Preloader";
import { useStaffs } from "../../../../../hooks/useSchool";
import { StaffList } from "@/components/common/Reusables/Stafflist";
// --- TYPES ---
interface Staff {
  staff_id: string;
  school_id: string;
  user_id: string;
  staff_code: string;
  surname: string;
  first_name: string;
  other_names?: string | null;
  sex: string;
  date_of_birth: string;
  marital_status: string;
  address: string;
  phone: string;
  email: string;
  highest_qualification?: string;
  years_of_experience?: number;
  primary_subject?: string | null;
  secondary_subject?: string | null;
  role: string;
  date_of_appointment: string;
  employment_status: "Permanent" | "Contract" | "Temporary";
  created_at: string;
  profile_pic?: string;
}

export default function AllStaffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const itemsPerPage = 15;

  // Use the existing hook
  const {
    staffs = [],
    isLoadingStaffs,
    updateStaff,
    deleteStaff
  } = useStaffs();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 800);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredStaff = (staffs as Staff[]).filter(staff => {
    const fullName = `${staff.surname} ${staff.first_name} ${staff.other_names || ''}`.toLowerCase();
    const matchesSearch =
      fullName.includes(debouncedSearch.toLowerCase()) ||
      staff.staff_code?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      staff.email?.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesRole = roleFilter === "All" || staff.role === roleFilter;
    const matchesStatus = statusFilter === "All" || staff.employment_status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalCount = filteredStaff.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* -------------------------------------------------------------------------- */
  /* HANDLERS                                  */
  /* -------------------------------------------------------------------------- */

  const handleDelete = async (id: string) => {
    setSaveStatus('saving');
    deleteStaff.mutate(id, {
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

  const handleUpdate = async (updatedStaff: Staff) => {
    setSaveStatus('saving');
    
    const { staff_id, ...payload } = updatedStaff;
    
    updateStaff.mutate(
      { id: staff_id, payload },
      {
        onSuccess: () => {
          setSaveStatus('success');
          setTimeout(() => setSaveStatus('idle'), 2000);
        },
        onError: () => {
          setSaveStatus('error');
          setTimeout(() => setSaveStatus('idle'), 2500);
          throw new Error("Update failed");
        }
      }
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto antialiased">
      <SaveModal status={saveStatus} />

      <PageHeader Directory="Staff Directory" text="Manage and view all school personnel" />

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 bg-white border-b border-gray-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          <div className="relative group grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by name, email or staff ID..."
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
                value={roleFilter}
                onChange={handleRoleChange}
              >
                <option value="All">All Roles</option>
                <option value="Teacher">Teacher</option>
                <option value="Principal">Principal</option>
                <option value="Bursar">Bursar</option>
                <option value="Administrator">Administrator</option>
              </select>
              <ArrowDownWideNarrow className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer transition-all"
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <option value="All">All Status</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
              <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="min-h-[400px]">
          {isLoadingStaffs ? (
            <div className="flex h-64 items-center justify-center text-gray-400">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 w-4 bg-gray-200 rounded-full mb-2"></div>
                <span className="text-xs">Loading Directory...</span>
              </div>
            </div>
          ) : (
            <StaffList
              currentStaff={paginatedStaff}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              startIndex={((currentPage - 1) * itemsPerPage) + 1}
              endIndex={Math.min(currentPage * itemsPerPage, totalCount)}
            />
          )}
        </div>
      </div>
    </div>
  );
}