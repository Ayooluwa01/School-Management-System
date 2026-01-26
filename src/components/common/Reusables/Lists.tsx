/* eslint-disable @next/next/no-img-element */
"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { Edit2, Trash2, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Activestudent } from "../../../../zustand/Activestudent";
import { useState } from "react";
import api from "../../../../libs/axios";
import { useAuthStore } from "../../../../zustand/store";

interface ListProps {
  currentStudents: any[];
  handleDelete: (id: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalCount: number;
  startIndex: number;
  endIndex: number;
}

export function List({
  currentStudents,
  handleDelete,
  currentPage,
  setCurrentPage,
  totalPages,
  totalCount,
  startIndex,
  endIndex,
}: ListProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();
  const [isSaving, setIsSaving] = useState(false);

  // Zustand Store
  const { 
    student_id, admission_no, first_name, last_name, gender, date_of_birth,
    class_id, class_name, nationality, religion, blood_group, genotype,
    state_of_origin, lga, fathers_name, mothers_name, fathers_number,
    mothers_number, address, setStudent 
  } = Activestudent();

  async function Toggleedit(student: any) {
    setStudent(student);
    openModal();
  }

  const handleSave = async () => {
    setIsSaving(true);
    // Matching the DTO expected by our fixed Backend Service
    const updateDto = {
      first_name,
      last_name,
      gender,
      date_of_birth,
      nationality,
      religion,
      blood_group,
      genotype,
      state_of_origin,
      lga,
      fathers_name,
      mothers_name,
      address,
    };

    try {
      const response = await api.patch(
        `/students/update/student/${student_id}/${user?.school_id}`, 
        updateDto
      );

      if (response.data.updated) {
        alert("Student records updated successfully");
        closeModal();
        // Force refresh or use Query Invalidation here if using Tanstack Query
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
          <tr>
            <th className="px-6 py-4 text-left">Student Info</th>
            <th className="px-4 py-4 text-left">Admission No</th>
            <th className="px-4 py-4 text-left">Class</th>
            <th className="px-4 py-4 text-center">Gender</th>
            <th className="px-4 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {currentStudents.map((student) => {
            // Concatenate Name for UI
            const fullName = `${student.last_name} ${student.first_name}`;
            const avatarUrl = `https://ui-avatars.com/api/?name=${student.last_name}+${student.first_name}&background=random&color=fff&bold=true`;

            return (
              <tr key={student.student_id} className="hover:bg-gray-50/50 transition-colors group">
                {/* AVATAR + NAME COLUMN */}
                <td className="px-6 py-3">
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => router.push(`/students/profile/${student.student_id}`)}
                  >
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                      <img src={avatarUrl} alt={fullName} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors uppercase">
                        {fullName}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">ID: {student.student_id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-gray-600 font-medium">{student.admission_no}</td>
                
                <td className="px-4 py-3">
                  <span className="text-gray-700">{student.class_name}</span>
                  <span className="text-[10px] ml-1 text-gray-400">{student.arm}</span>
                </td>

                <td className="px-4 py-3 text-center">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                    ${student.gender === "Male" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-pink-50 text-pink-600 border border-pink-100"}`}>
                    {student.gender}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button 
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      onClick={() => Toggleedit(student)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.student_id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* PAGINATION SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 border-t bg-white">
        <p className="text-xs font-medium text-gray-500">
          Displaying <span className="text-gray-900">{startIndex}</span> to <span className="text-gray-900">{Math.min(endIndex, totalCount)}</span> of <span className="text-gray-900">{totalCount}</span> results
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold disabled:opacity-30 hover:bg-gray-50 transition-all"
          >
            <ChevronLeft size={14} /> Previous
          </button>

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
             <span className="px-3 text-xs font-bold text-blue-600">
               {currentPage} / {totalPages}
             </span>
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold disabled:opacity-30 hover:bg-gray-50 transition-all"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* EDIT MODAL SECTION */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[850px] m-4 p-8 overflow-y-auto max-h-[90vh] rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-8 border-b pb-5">
          <div>
            <h3 className="text-2xl font-black text-gray-900">Update Student Data</h3>
            <p className="text-sm text-gray-500">Modify records for <span className="font-bold text-blue-600">{last_name} {first_name}</span></p>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-gray-400 uppercase font-bold">Admission Number</span>
            <span className="px-4 py-1.5 bg-gray-900 text-white text-xs font-black rounded-lg">
              {admission_no}
            </span>
          </div>
        </div>

        <div className="space-y-10">
          {/* PERSONAL INFO */}
          <section>
            <h5 className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest mb-6">
              <span className="h-1.5 w-6 bg-blue-600 rounded-full"></span> Basic Information
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase font-bold text-gray-400">First Name</Label>
                <input 
                  type="text" 
                  className="w-full rounded-xl border-gray-200 bg-gray-50 p-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none border transition-all"
                  value={first_name || ""} 
                  onChange={(e) => setStudent({ first_name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase font-bold text-gray-400">Last Name</Label>
                <input 
                  type="text" 
                  className="w-full rounded-xl border-gray-200 bg-gray-50 p-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none border transition-all"
                  value={last_name || ""} 
                  onChange={(e) => setStudent({ last_name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase font-bold text-gray-400">Date of Birth</Label>
                <Input type="date" defaultValue={date_of_birth?.split('T')[0]} onChange={(e) => setStudent({ date_of_birth: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase font-bold text-gray-400">Gender</Label>
                <select 
                  className="w-full rounded-xl border-gray-200 bg-gray-50 p-2.5 text-sm outline-none border transition-all"
                  value={gender}
                  onChange={(e) => setStudent({ gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </section>

        </div>

        <div className="flex items-center justify-end gap-3 mt-12 pt-6 border-t">
          <Button variant="outline" onClick={closeModal} className="rounded-xl px-8 font-bold border-gray-200">
            Discard
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="rounded-xl px-10 font-bold shadow-lg shadow-blue-500/20">
            {isSaving ? "Processing..." : "Commit Changes"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}