"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";


import { useRouter } from "next/navigation";
import { Activestudent } from "../../../../zustand/Activestudent";

interface ListProps {
  currentStudents: any[];
  handleDelete: (id: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalCount: number;
  startIndex: number;
  endIndex: number;
  children: React.ReactNode;
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
  children
}: ListProps) {
    const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
const {student_id,admission_no,name,sex,date_of_birth,class_id,setadmission_no,setclass_id,setstudent_id,setname,setsex,setdob}=Activestudent()



async function Toggleedit(student: any){
  try {
setname(student.name)
setadmission_no(student.admission_no)
setstudent_id(student.student_id)
setsex(student.sex)
setdob(student.date_of_birth)
setclass_id(student.clas_id)
openModal()
  } catch (error) {
    
  }}



  return (
    <div className="overflow-x-auto">
      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="px-4 py-3">Admission No</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Class</th>
            <th className="px-4 py-3 text-center">Sex</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {currentStudents.map((student) => (
            <tr
              key={student.student_id}
              className="hover:bg-gray-50 transition cursor-pointer"
           >
              <td className="px-4 py-3"   >{student.admission_no}</td>
              <td className="px-4 py-3 font-medium"   onClick={() =>
    router.push(`/students/profile/${student.student_id}`)
               }> 
               {student.name}</td>
              <td className="px-4 py-3">{student.class_name}</td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                  ${
                    student.sex === "Male"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-pink-100 text-pink-700"
                  }`}
                >
                  {student.sex}
                </span>
              </td>

              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-3">
                  <button className="text-gray-500 hover:text-blue-600" onClick={()=>Toggleedit(student)} key={student.clas_id}>
                    <Edit2 size={16} />
           
                  </button>

                  {/* Modal */}


                  {/* End of modal */}
                  <button
                    onClick={() => handleDelete(student.student_id)}
                    className="text-gray-500 hover:text-red-600"
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
        {/* Showing info */}
        <p className="text-xs text-gray-600">
          Showing <strong>{startIndex + 1}</strong> to{" "}
          <strong>{Math.min(endIndex, totalCount)}</strong> of{" "}
          <strong>{totalCount}</strong> students
        </p>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 rounded border disabled:opacity-40 hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="px-3 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 rounded border disabled:opacity-40 hover:bg-gray-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

 {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4 p-6">
 <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Name</Label>
                    <Input type="text" defaultValue={name } />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>DOB</Label>
                    <Input type="text" defaultValue={date_of_birth} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Address</Label>
                    <Input type="text" defaultValue="randomuser@pimjo.com" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Parent Number</Label>
                    <Input type="text" defaultValue="+09 363 398 46" />
                  </div>

                  <div className="col-span-1">
                    <Label>Admission Number</Label>
                    <Input type="text" defaultValue={admission_no} disabled/>
                  </div>
                </div>
        
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm">
                Save Changes
              </Button>
            </div>
     </Modal>
      

     
    </div>
  );
}
