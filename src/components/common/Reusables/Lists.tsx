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
import { useStudent } from "../../../../hooks/useSchool";
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
  
const studentStore = Activestudent();

  const { updateStudent } = useStudent();

   const { setStudent, resetStudent, ...studentDataOnly } = studentStore;
 async function Toggleedit(student: any) {
    setStudent(student);
    openModal();
  }

const handleSave = async () => {
  setIsSaving(true);
  try {
    await updateStudent.mutateAsync(studentDataOnly as StudentData);
    closeModal();
  } catch (error: any) {
    alert(error.response?.data?.message || "Update failed");
  } finally {
    setIsSaving(false);
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
          {currentStudents.map((student) => {
            const fullName = `${student.last_name} ${student.first_name}`;
            const avatarUrl = `https://ui-avatars.com/api/?name=${student.last_name}+${student.first_name}&background=random&color=fff&bold=true`;

            return (
              <tr key={student.student_id} className="hover:bg-gray-50/80 transition-colors group">
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
        className="max-w-[850px] w-[95vw] h-full max-h-[90vh] m-auto p-0 rounded-2xl shadow-2xl overflow-y-auto flex flex-col bg-white"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <User size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 leading-tight">Student Profile</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">ID: {studentStore.admission_no}</p>
            </div>
          </div>
          <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={24} />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1  p-8 space-y-10 scroll-smooth">
          
          {/* SECTION 1: PERSONAL */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3 border-b border-gray-100 pb-2 flex items-center gap-2">
              <User size={14} className="text-blue-600" />
              <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Identity</h4>
            </div>
            
            <FormGroup label="First Name">
              <input className="input-style" value={studentStore.first_name || ""} onChange={(e) => studentStore.setStudent({ first_name: e.target.value })} />
            </FormGroup>

            <FormGroup label="Last Name">
              <input className="input-style" value={studentStore.last_name || ""} onChange={(e) => studentStore.setStudent({ last_name: e.target.value })} />
            </FormGroup>

            <FormGroup label="Date of Birth">
              <div className="relative">
                <DatePicker
                  selected={studentStore.date_of_birth ? new Date(studentStore.date_of_birth) : null}
                  onChange={(date: Date | null) => studentStore.setStudent({ date_of_birth: date?.toISOString() })}
                  dateFormat="yyyy-MM-dd"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  placeholderText="Select date"
                  showYearDropdown
                  dropdownMode="select"
                />
                <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </FormGroup>

            <FormGroup label="Gender">
               <select className="input-style" value={studentStore.gender} onChange={(e) => studentStore.setStudent({ gender: e.target.value })}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
               </select>
            </FormGroup>
            
            <FormGroup label="Religion">
              <input className="input-style" value={studentStore.religion || ""} onChange={(e) => studentStore.setStudent({ religion: e.target.value })} />
            </FormGroup>
          </section>

          {/* SECTION 2: FAMILY */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
            <div className="md:col-span-2 border-b border-gray-100 pb-2 flex items-center gap-2">
              <Users size={14} className="text-green-600" />
              <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Family Contact</h4>
            </div>
            <FormGroup label="Father's Name">
              <input className="input-style bg-white" value={studentStore.fathers_name || ""} onChange={(e) => studentStore.setStudent({ fathers_name: e.target.value })} />
            </FormGroup>
            <FormGroup label="Father's Phone">
              <input className="input-style bg-white" value={studentStore.fathers_number || ""} onChange={(e) => studentStore.setStudent({ fathers_number: e.target.value })} />
            </FormGroup>
            <FormGroup label="Mother's Name">
              <input className="input-style bg-white" value={studentStore.mothers_name || ""} onChange={(e) => studentStore.setStudent({ mothers_name: e.target.value })} />
            </FormGroup>
            <FormGroup label="Mother's Phone">
              <input className="input-style bg-white" value={studentStore.mothers_number || ""} onChange={(e) => studentStore.setStudent({ mothers_number: e.target.value })} />
            </FormGroup>
          </section>

          {/* SECTION 3: ACADEMIC & MEDICAL */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-4 border-b border-gray-100 pb-2 flex items-center gap-2">
              <Activity size={14} className="text-red-500" />
              <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Academic & Health</h4>
            </div>
            <FormGroup label="Class" className="md:col-span-2">
              <input className="input-style" value={studentStore.class_name || ""} onChange={(e) => studentStore.setStudent({ class_name: e.target.value })} />
            </FormGroup>

              <FormGroup label="Arm" className="md:col-span-2">
              <input className="input-style" value={studentStore.arm|| ""} onChange={(e) => studentStore.setStudent({ arm: e.target.value })} />
            </FormGroup>
            <FormGroup label="Blood Group">
              <input className="input-style" value={studentStore.blood_group || ""} onChange={(e) => studentStore.setStudent({ blood_group: e.target.value })} />
            </FormGroup>
            <FormGroup label="Genotype">
              <input className="input-style" value={studentStore.genotype || ""} onChange={(e) => studentStore.setStudent({ genotype: e.target.value })} />
            </FormGroup>
          </section>

          {/* ADDRESS */}
          <FormGroup label="Residential Address">
            <textarea 
              className="input-style min-h-[80px]" 
              value={studentStore.address || ""} 
              onChange={(e) => studentStore.setStudent({ address: e.target.value })}
            />
          </FormGroup>
        </div>

        {/* FOOTER */}
        <div className="px-8 py-5 border-t bg-gray-50 flex items-center justify-between shrink-0">
          <button onClick={closeModal} className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
            Discard Changes
          </button>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-2 px-10 py-3 bg-gray-900 text-white rounded-xl text-sm font-black shadow-xl shadow-gray-200 hover:bg-black active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? "Saving..." : <><Save size={16} /> Update Record</>}
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