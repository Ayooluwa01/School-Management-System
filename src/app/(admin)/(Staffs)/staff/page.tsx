"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Search, Filter, UserX, Trash2, Edit, ArrowDownWideNarrow, X } from "lucide-react";
import Link from "next/link";
import api from "../../../../../libs/axios";

// --- TYPES ---
interface Staff {
  staff_id: number;
  staff_no: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: "Active" | "On Leave" | "Suspended";
  profile_pic?: string;
  sex: string;
  highest_qualification?: string;
  years_of_experience?: number;
  address?: string;
}

export default function AllStaffPage() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter & Pagination States
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await api.get('/staffs'); 
      setStaffs(response.data || []); 
    } catch (error) {
      console.error("Failed to load staff", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStaff = useMemo(() => {
    return staffs.filter(staff => {
      const matchesSearch = 
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        staff.staff_no.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "All" || staff.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [staffs, searchTerm, roleFilter]);

  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- HANDLERS ---
  const handleEditClick = (staff: Staff) => {
    setEditingStaff(staff);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;
    
    setIsSaving(true);
    console.log(editingStaff)
    try {
      const response = await api.patch(`/staffs/${editingStaff.staff_id}`, editingStaff);
      setStaffs(prev => prev.map(s => s.staff_id === editingStaff.staff_id ? response.data : s));
      setIsEditModalOpen(false);
      alert("Staff updated successfully!");
    } catch (error) {
      alert("Error updating staff");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/staffs/${id}`);
      setStaffs(prev => prev.filter(s => s.staff_id !== id));
    } catch (error) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] pb-20 font-sans text-zinc-900 relative">
      
      {/* --- HEADER --- */}
      <div className="bg-white border-b border-zinc-100 px-6 py-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight italic">Staff Directory</h1>
            <p className="text-sm text-zinc-500 mt-1 font-medium">Manage all school personnel records</p>
          </div>
          <Link href="/dashboard/staff/new" className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all">
            + Add New Staff
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          
          {/* TOOLBAR */}
          <div className="p-5 bg-white border-b border-gray-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative group grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-500" />
              <input
                type="text" placeholder="Search by name or ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none cursor-pointer"
                  value={roleFilter}
                  onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
                >
                  <option value="All">All Roles</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Principal">Principal</option>
                  <option value="Bursar">Bursar</option>
                </select>
                <ArrowDownWideNarrow className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 border-b border-zinc-100 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                  <th className="px-6 py-4">Staff Member</th>
                  <th className="px-6 py-4">Role & ID</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 text-sm">
                {paginatedStaff.map((staff) => (
                  <tr key={staff.staff_id} className="group hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold uppercase text-xs">
                           {staff.profile_pic ? <img src={staff.profile_pic} className="w-full h-full object-cover rounded-full" /> : staff.name.substring(0,2)}
                        </div>
                        <div>
                          <Link href={`/staff/${staff.staff_id}`} className="font-bold text-zinc-900 hover:text-indigo-600 transition-colors">{staff.name}</Link>
                          <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-tighter">{staff.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-600 font-medium">
                        {staff.role} <br/> <span className="text-[10px] text-zinc-400 font-bold">{staff.staff_no}</span>
                    </td>
                    <td className="px-6 py-4">
                       <StatusBadge status={staff.status || "Active"} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEditClick(staff)} className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(staff.staff_id)} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {isEditModalOpen && editingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
               <div>
                 <h3 className="text-xl font-bold text-zinc-900">Edit Staff Record</h3>
                 <p className="text-xs text-zinc-500 font-medium">Updating profile for {editingStaff.staff_no}</p>
               </div>
               <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-8 overflow-y-auto space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Full Name</label>
                    <input className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:border-indigo-500 outline-none" value={editingStaff.name} onChange={(e) => setEditingStaff({...editingStaff, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Phone Number</label>
                    <input className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:border-indigo-500 outline-none" value={editingStaff.phone} onChange={(e) => setEditingStaff({...editingStaff, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Job Role</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:border-indigo-500 outline-none" value={editingStaff.role} onChange={(e) => setEditingStaff({...editingStaff, role: e.target.value})}>
                      <option value="Teacher">Teacher</option>
                      <option value="Principal">Principal</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>
                  {/* <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Employment Status</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:border-indigo-500 outline-none" value={editingStaff.status} onChange={(e) => setEditingStaff({...editingStaff, status: e.target.value as any})}>
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div> */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Address</label>
                    <textarea className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:border-indigo-500 outline-none resize-none" rows={2} value={editingStaff.address} onChange={(e) => setEditingStaff({...editingStaff, address: e.target.value})} />
                  </div>
               </div>

               <div className="pt-6 border-t border-zinc-100 flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-6 py-2.5 rounded-xl text-sm font-bold text-zinc-500 hover:bg-zinc-50 transition-colors">Cancel</button>
                  <button type="submit" disabled={isSaving} className="px-8 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center gap-2">
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    "Active": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "On Leave": "bg-amber-50 text-amber-700 border-amber-100",
    "Suspended": "bg-red-50 text-red-700 border-red-100",
  };
  const currentStyle = styles[status] || styles["Active"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${currentStyle}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${status === "Active" ? "bg-emerald-500" : "bg-current"}`} />
      {status}
    </span>
  );
}