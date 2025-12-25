"use client";

import { useState } from "react";
import { 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Phone, 
  BookOpen, 
  Layers,
  MoreVertical
} from "lucide-react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";

export interface TeacherType {
  teacher_id: number;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[]; 
  status: "Active" | "On Leave";
}

interface TeacherListProps {
  teachers: TeacherType[];
  handleDelete: (id: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalCount: number;
  startIndex: number;
  endIndex: number;
}

export function TeacherList({
  teachers,
  handleDelete,
  currentPage,
  setCurrentPage,
  totalPages,
  totalCount,
  startIndex,
  endIndex,
}: TeacherListProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherType | null>(null);
    const router = useRouter();

  // Handle opening the modal with specific teacher data
  const handleEditClick = (teacher: TeacherType) => {
    setSelectedTeacher(teacher);
    openModal();
  };

  const handleSave = () => {
    // Logic to call backend API
    console.log("Saving teacher:", selectedTeacher);
    closeModal();
  };

  return (
    <div className="overflow-x-auto">
      {/* TABLE */}
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="px-4 py-3">Profile</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Workload (Subjects & Classes)</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {teachers.map((teacher) => (
            <tr
              key={teacher.teacher_id}
              className="hover:bg-gray-50 transition cursor-pointer group"
            >
              {/* Profile Column */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold" onClick={()=>router.push(`/teachers/profile/${teacher.teacher_id}`)}>
                  {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{teacher.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      ID: #{teacher.teacher_id}
                    </div>
                  </div>
                </div>
              </td>

              {/* Contact Column */}
              <td className="px-4 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} className="text-gray-400" />
                    <span>{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} className="text-gray-400" />
                    <span>{teacher.phone}</span>
                  </div>
                </div>
              </td>

              {/* Workload Column */}
              <td className="px-4 py-4 max-w-xs">
                <div className="flex flex-col gap-2">
                  {/* Subjects */}
                  <div className="flex items-start gap-2">
                    <BookOpen size={14} className="text-purple-500 mt-1 shrink-0" />
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((sub, idx) => (
                        <span key={idx} className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-xs border border-purple-100">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Classes */}
                  <div className="flex items-start gap-2">
                    <Layers size={14} className="text-orange-500 mt-1 shrink-0" />
                    <div className="flex flex-wrap gap-1">
                      {teacher.classes.map((cls, idx) => (
                        <span key={idx} className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded text-xs border border-orange-100">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </td>

              {/* Status Column */}
              <td className="px-4 py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    teacher.status === "Active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {teacher.status}
                </span>
              </td>

              {/* Actions Column */}
              <td className="px-4 py-4 text-center">
                <div className="flex justify-center gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button 
                    className="p-1.5 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-md transition" 
                    onClick={() => handleEditClick(teacher)}
                    title="Edit Teacher"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(teacher.teacher_id)}
                    className="p-1.5 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-md transition"
                    title="Delete Teacher"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t bg-gray-50">
        <p className="text-xs text-gray-600">
          Showing <strong>{startIndex + 1}</strong> to{" "}
          <strong>{Math.min(endIndex, totalCount)}</strong> of{" "}
          <strong>{totalCount}</strong> teachers
        </p>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 rounded border bg-white disabled:opacity-40 hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="px-3 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 rounded border bg-white disabled:opacity-40 hover:bg-gray-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4 p-6">
        <div className="mt-5">
          <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6">
            Edit Teacher Details
          </h5>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div className="col-span-2">
              <Label>Full Name</Label>
              <Input type="text" defaultValue={selectedTeacher?.name} />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Email Address</Label>
              <Input type="email" defaultValue={selectedTeacher?.email} />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Phone Number</Label>
              <Input type="text" defaultValue={selectedTeacher?.phone} />
            </div>

            <div className="col-span-2">
              <Label>Subjects (Comma separated)</Label>
              <Input type="text" defaultValue={selectedTeacher?.subjects.join(", ")} />
            </div>
            
            <div className="col-span-2">
              <Label>Assigned Classes (Comma separated)</Label>
              <Input type="text" defaultValue={selectedTeacher?.classes.join(", ")} />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-8 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}