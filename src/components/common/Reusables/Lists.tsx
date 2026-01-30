/* eslint-disable @next/next/no-img-element */
"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { 
  Edit2, Trash2, ChevronLeft, ChevronRight, 
  User, Users, GraduationCap, Activity, 
  MapPin, Save, X, Phone, Calendar 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Activestudent, StudentData } from "../../../../zustand/Activestudent";
import { useState } from "react";
import { useAuthStore } from "../../../../zustand/store";
import { useClasses, useStudent } from "../../../../hooks/useSchool";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const FormInput = ({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  disabled = false, 
  className = "" 
}: {
  label: string;
  value: any;
  onChange?: (e: any) => void;
  type?: string;
  disabled?: boolean;
  className?: string;
}) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
      {label}
    </label>
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-all duration-200
        ${disabled 
          ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed" 
          : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        }`}
    />
  </div>
);

const FormSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  className = "" 
}: {
  label: string;
  value: any;
  onChange: (e: any) => void;
  options: string[];
  className?: string;
}) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
      {label}
    </label>
    <div className="relative">
      <select
        value={value || ""}
        onChange={onChange}
        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      >
        <option value="">Select Option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);


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
  currentStudents, handleDelete, currentPage, setCurrentPage, totalPages, totalCount, startIndex, endIndex,
}: any) {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const [isSaving, setIsSaving] = useState(false);
  
  // Zustand & Hooks
  const studentStore = Activestudent();
  const { updateStudent } = useStudent();
  const { classes } = useClasses();

  // 1. OPEN MODAL
  const Toggleedit = (student: any) => {
    // Populate store
    studentStore.setStudent(student);
    openModal();
  };

  // 2. SAVE HANDLER
  const handleSave = async () => {
    setIsSaving(true);
    
    // CRITICAL: Remove functions from the object before sending
    const { setStudent, resetStudent, ...studentDataOnly } = studentStore;

    try {
      // Cast to ensure TS is happy
      await updateStudent.mutateAsync(studentDataOnly as StudentData);
      closeModal();
    } catch (error: any) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    // Find the full class object to allow UI to update immediately
    const classObj = classes?.find((c: any) => c.class_id === selectedId);
    
    if (classObj) {
        studentStore.setStudent({ 
            class_id: classObj.class_id,
            class_name: classObj.class_name, 
            arm: classObj.arm // Visual update only, backend uses class_id
        });
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      {/* --- TABLE SECTION --- */}
      <table className="w-full text-sm">
        <thead className="bg-gray-50/50 text-gray-500 font-semibold border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left">Student Info</th>
            <th className="px-4 py-4 text-left">Admission No</th>
            <th className="px-4 py-4 text-left">Class</th>
            <th className="px-4 py-4 text-center">Gender</th>
            <th className="px-4 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {currentStudents.map((student:StudentData) => {
            const fullName = `${student.surname} ${student.first_name}`;
            const avatarUrl = `https://ui-avatars.com/api/?name=${student.last_name}+${student.first_name}&background=random&color=fff&bold=true`;

            return (
              <tr key={student.student_id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-6 py-3">
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
    studentStore.setStudent(student);

    router.push(`/students/profile/${student.student_id}`);
  }}
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

                <td className="px-4 py-3 text-gray-600 font-medium font-mono text-xs">{student.admission_no}</td>
                
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-gray-700 font-medium">{student.class_name}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{student.arm}</span>
                  </div>
                </td>

                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                    ${student.gender === "Male" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-pink-50 text-pink-600 border border-pink-100"}`}>
                    {student.gender}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button 
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      onClick={() => Toggleedit(student)}
                      title="Edit Student"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.student_id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Student"
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

      {/* --- PAGINATION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 border-t bg-gray-50/30">
        <p className="text-xs font-medium text-gray-500">
          Showing <span className="font-bold text-gray-900">{startIndex}</span> - <span className="font-bold text-gray-900">{Math.min(endIndex, totalCount)}</span> of <span className="font-bold text-gray-900">{totalCount}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border bg-white text-xs font-semibold text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ChevronLeft size={14} /> Previous
          </button>

          <div className="flex items-center gap-1 bg-white border px-2 py-1 rounded-lg shadow-sm">
            <span className="text-xs font-bold text-blue-600">
              {currentPage} / {totalPages}
            </span>
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border bg-white text-xs font-semibold text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-all shadow-sm"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

   <Modal 
        isOpen={isOpen} 
        onClose={closeModal} 
        className="max-w-[900px] w-[95vw] h-full m-auto p-0 rounded-2xl shadow-2xl overflow-auto flex flex-col bg-white"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <User size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 leading-tight">Edit Student</h3>
              <p className="text-xs text-gray-500 font-bold uppercase">ID: {studentStore.admission_no}</p>
            </div>
          </div>
          <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          
          {/* Identity Section */}
          <section className="space-y-4">
             <div className="border-b border-gray-100 pb-2 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Identity</h4>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <FormInput label="Surname" value={studentStore.surname} onChange={(e:any) => studentStore.setStudent({ surname: e.target.value })} />
                <FormInput label="First Name" value={studentStore.first_name} onChange={(e:any) => studentStore.setStudent({ first_name: e.target.value })} />
                <FormInput label="Other Names" value={studentStore.other_names} onChange={(e:any) => studentStore.setStudent({ other_names: e.target.value })} />
                
                <FormGroup label="Date of Birth">
                  <div className="relative">
                    <DatePicker
                      selected={studentStore.date_of_birth ? new Date(studentStore.date_of_birth) : null}
                      onChange={(date: Date | null) => studentStore.setStudent({ date_of_birth: date ? date.toISOString() : null })}
                      dateFormat="yyyy-MM-dd"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      placeholderText="YYYY-MM-DD"
                      showYearDropdown
                    />
                    <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </FormGroup>

                <FormGroup label="Gender">
                   <select 
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:bg-white"
                      value={studentStore.gender} 
                      onChange={(e) => studentStore.setStudent({ gender: e.target.value })}
                   >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                   </select>
                </FormGroup>
                
                <FormInput label="Religion" value={studentStore.religion} onChange={(e:any) => studentStore.setStudent({ religion: e.target.value })} />
             </div>
          </section>

          {/* Academic Section */}
          <section className="space-y-4">
             <div className="border-b border-gray-100 pb-2 flex items-center gap-2">
                <GraduationCap size={14} className="text-purple-600" />
                <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Academic</h4>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormGroup label="Class / Arm">
                    <select 
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:bg-white"
                        value={studentStore.class_id || ""}
                        onChange={handleClassChange}
                    >
                        <option value="">Select Class...</option>
                        {classes?.map((cls: any) => (
                            <option key={cls.class_id} value={cls.class_id}>
                                {cls.class_code}
                            </option>
                        ))}
                    </select>
                </FormGroup>

                <FormInput label="Admission No" value={studentStore.admission_no} disabled={true} />
             </div>
          </section>

          {/* Origin & Location */}
          <section className="space-y-4">
            <div className="border-b border-gray-100 pb-2 flex items-center gap-2">
                <Activity size={14} className="text-orange-500" />
                <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Origin & Medical</h4>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <FormInput label="State" value={studentStore.state_of_origin} onChange={(e:any) => studentStore.setStudent({ state_of_origin: e.target.value })} />
                <FormInput label="LGA" value={studentStore.lga} onChange={(e:any) => studentStore.setStudent({ lga: e.target.value })} />
                <FormInput label="Blood Group" value={studentStore.blood_group} onChange={(e:any) => studentStore.setStudent({ blood_group: e.target.value })} />
                <FormInput label="Genotype" value={studentStore.genotype} onChange={(e:any) => studentStore.setStudent({ genotype: e.target.value })} />
             </div>
             <FormGroup label="Address">
                <textarea 
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm outline-none focus:bg-white"
                  rows={2}
                  value={studentStore.address || ""}
                  onChange={(e) => studentStore.setStudent({ address: e.target.value })}
                />
             </FormGroup>
          </section>

          {/* Family */}
          <section className="space-y-4 bg-gray-50 p-5 rounded-xl">
             <div className="border-b border-gray-200 pb-2 flex items-center gap-2">
                <Users size={14} className="text-green-600" />
                <h4 className="text-[11px] font-black uppercase text-gray-500 tracking-widest">Guardian Info</h4>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput label="Father's Name" className="bg-white" value={studentStore.fathers_name} onChange={(e:any) => studentStore.setStudent({ fathers_name: e.target.value })} />
                <FormInput label="Father's Phone" className="bg-white" value={studentStore.fathers_number} onChange={(e:any) => studentStore.setStudent({ fathers_number: e.target.value })} />
                <FormInput label="Mother's Name" className="bg-white" value={studentStore.mothers_name} onChange={(e:any) => studentStore.setStudent({ mothers_name: e.target.value })} />
                <FormInput label="Mother's Phone" className="bg-white" value={studentStore.mothers_number} onChange={(e:any) => studentStore.setStudent({ mothers_number: e.target.value })} />
             </div>
          </section>

        </div>

        {/* FOOTER */}
        <div className="px-8 py-5 border-t bg-gray-50 flex items-center justify-between shrink-0">
          <button onClick={closeModal} className="text-sm font-bold text-gray-400 hover:text-gray-600">Cancel</button>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="px-8 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-all"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </Modal>
      {/* --- INLINE STYLES FOR CLEANER JSX --- */}
      <style jsx>{`
        .input-style {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          background-color: #f9fafb;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .input-style:focus {
          background-color: white;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
}










// Small helper component for labels
function FormGroup({ label, children, className = "" }: { label: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      {children}
    </div>
  );
}