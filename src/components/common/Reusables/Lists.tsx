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
import { fetchClasses } from "../../../../libs/api";
import { useEffect, useState } from "react";
import api from "../../../../libs/axios";

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
const [isSaving, setIsSaving] = useState(false);

  const { 
    student_id, admission_no, name,  sex,  date_of_birth,  
class_id,
    class_name,
    info_id,
    first_name,
    last_name,
  gender, 
  nationality, 
   religion,
    blood_group,
    genotype,  
    state_of_origin,
    lga,
        fathers_name,
    mothers_name,   fathers_number,
    mothers_number,
    address,setStudent } = Activestudent();



async function Toggleedit(student: any){
  try {
setStudent(student)
openModal()
console.log(first_name)
  } catch (error) {
    
  }}



  const handleSave = async () => {
    setIsSaving(true);
    const updateDto = {
      firstName:first_name,
      lastName:last_name,
      gender:gender, 
      dateOfBirth:date_of_birth,
      admission_no:admission_no,
      class_id: Number(class_id), 
     // Optionals
      nationality:nationality,
      religion:religion,
      bloodGroup:blood_group,
      genotype:genotype,
      stateOfOrigin:state_of_origin,
      lga:lga,
      address:address,   
      // Guardian Details 
      fatherName:fathers_name,
      fatherPhone:fathers_number,
      motherName:mothers_name,
      motherPhone:mothers_number,
    };

    try {
      const response = await api.patch(`/students/update/student/${student_id}`, updateDto);

      if (response.data.updated) {
       alert("Student records updated successfully");
        closeModal();
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "An error occurred while saving";
      console.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
      console.error("DTO Validation/Update Error:", error.response?.data);
    } finally {
      setIsSaving(false);
    }
  };

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
                  <button className="text-gray-500 hover:text-blue-600" onClick={()=>Toggleedit(student)} key={student.student_id}>
                    <Edit2 size={16} />
           
                  </button>
                  
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

<Modal isOpen={isOpen} onClose={closeModal} className="max-w-[800px] m-4 p-6 overflow-y-auto max-h-[90vh]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Edit Student Profile
        </h3>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
          {admission_no}
        </span>
      </div>

      <div className="space-y-8">
        
        {/* SECTION 1: Personal & Academic */}
        <div>
          <h5 className="mb-4 text-sm uppercase tracking-wide font-bold text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Personal Details
          </h5>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            
            {/* Row 1 */}
            <div>
            <Label>First Name</Label>
  <input 
    type="text" 
    className="w-full rounded-lg border border-gray-300 p-2" // add your styling
    defaultValue={first_name || ""} 
    onChange={(e) => setStudent({ first_name: e.target.value })}
  />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input 
                type="text" 
                defaultValue={last_name} 
                onChange={(e) => setStudent({ last_name: e.target.value })}
              />
            </div>

            {/* Row 2 */}
            <div>
              <Label>Date of Birth</Label>
              <Input 
                type="date" 
                defaultValue={date_of_birth?.split('T')[0]} 
                onChange={(e) => setStudent({ date_of_birth: e.target.value })}
              />
            </div>
            <div>
              <Label>Gender</Label>
              <select 
                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:text-white"
                defaultValue={gender}
                onChange={(e) => setStudent({ gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Row 3 */}
            <div>
              <Label>Class</Label>
              <Input 
                type="text" 
                defaultValue={class_name} 
                onChange={(e) => setStudent({ class_name: e.target.value })}
              />
            </div>
            <div>
              <Label>Religion</Label>
              <Input 
                type="text" 
                defaultValue={religion} 
                onChange={(e) => setStudent({ religion: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Origin & Medical */}
        <div>
          <h5 className="mb-4 text-sm uppercase tracking-wide font-bold text-gray-500 flex items-center gap-2 border-t border-gray-100 pt-6">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span> Origin & Medical
          </h5>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-4">
            
            <div className="lg:col-span-2">
               <Label>Nationality</Label>
               <Input 
                 type="text" 
                 defaultValue={nationality} 
                 onChange={(e) => setStudent({ nationality: e.target.value })}
               />
            </div>
            
            <div className="lg:col-span-1">
              <Label>State of Origin</Label>
              <Input 
                type="text" 
                defaultValue={state_of_origin} 
                onChange={(e) => setStudent({ state_of_origin: e.target.value })}
              />
            </div>
            <div className="lg:col-span-1">
              <Label>LGA</Label>
              <Input 
                type="text" 
                defaultValue={lga} 
                onChange={(e) => setStudent({ lga: e.target.value })}
              />
            </div>

            <div className="lg:col-span-1">
              <Label>Genotype</Label>
              <Input 
                type="text" 
                defaultValue={genotype} 
                placeholder="e.g. AA"
                onChange={(e) => setStudent({ genotype: e.target.value })}
              />
            </div>
            <div className="lg:col-span-1">
              <Label>Blood Group</Label>
              <Input 
                type="text" 
                defaultValue={blood_group} 
                placeholder="e.g. O+"
                onChange={(e) => setStudent({ blood_group: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Guardian & Contact */}
        <div>
          <h5 className="mb-4 text-sm uppercase tracking-wide font-bold text-gray-500 flex items-center gap-2 border-t border-gray-100 pt-6">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Guardian Info
          </h5>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            
            {/* Father */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 dark:bg-white/5 dark:border-white/10 space-y-3">
               <p className="text-xs font-bold text-gray-400 uppercase">Father&#39;s Details</p>
               <div>
                  <Label>Name</Label>
                  <Input 
                    type="text" 
                    defaultValue={fathers_name} 
                    className="bg-white"
                    onChange={(e) => setStudent({ fathers_name: e.target.value })}
                  />
               </div>
               <div>
                  <Label>Phone</Label>
                  <Input 
                    type="tel" 
                    defaultValue={fathers_number} 
                    className="bg-white"
                    onChange={(e) => setStudent({ fathers_number: e.target.value })}
                  />
               </div>
            </div>

            {/* Mother */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 dark:bg-white/5 dark:border-white/10 space-y-3">
               <p className="text-xs font-bold text-gray-400 uppercase">Mother&rsquo;s Details</p>
               <div>
                  <Label>Name</Label>
                  <Input 
                    type="text" 
                    defaultValue={mothers_name} 
                    className="bg-white"
                    onChange={(e) => setStudent({ mothers_name: e.target.value })}
                  />
               </div>
               <div>
                  <Label>Phone</Label>
                  <Input 
                    type="tel" 
                    defaultValue={mothers_number} 
                    className="bg-white"
                    onChange={(e) => setStudent({ mothers_number: e.target.value })}
                  />
               </div>
            </div>

            {/* Address */}
            <div className="col-span-2">
              <Label>Residential Address</Label>
              <Input 
                type="text" 
                defaultValue={address} 
                onChange={(e) => setStudent({ address: e.target.value })}
              />
            </div>
            
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-6 mt-8 border-t border-gray-100 lg:justify-end">
        <Button size="sm" variant="outline" onClick={closeModal}>
          Cancel
        </Button>
     <Button 
      size="sm" 
      onClick={handleSave} 
      disabled={isSaving}
      className="w-full lg:w-auto"
    >
      {isSaving ? (
        <span className="flex items-center gap-2">
           <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
           Saving...
        </span>
      ) : (
        "Save Changes"
      )}
    </Button>
      </div>
    </Modal>
     
    </div>
  );
}
