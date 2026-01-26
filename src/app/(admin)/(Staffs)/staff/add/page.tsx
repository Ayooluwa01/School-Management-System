"use client";
import React, { useState, useCallback, useRef } from "react";
import { User, Briefcase, GraduationCap, Save, Camera, ChevronDown, Info, Calendar } from "lucide-react";
import axios from "../../../../../../libs/axios"; 
import { SaveModal } from "@/components/common/Reusables/Preloader";

// Datepicker imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ROLE_OPTIONS = ["Teacher", "Principal", "Vice Principal", "Administrator", "Bursar", "Lab Technician", "Other"];
const STATUS_OPTIONS = ["Permanent", "Contract", "Probation", "Part-time"];
const MARITAL_OPTIONS = ["Single", "Married", "Divorced", "Widowed"];
const GENDER_OPTIONS = ["Male", "Female"];

const INITIAL_STATE = {
  surname: "", first_name: "", other_names: "", sex: "",
  date_of_birth: "", marital_status: "", address: "", phone: "",
  email: "", highest_qualification: "", years_of_experience: 0,
  primary_subject: "", secondary_subject: "", role: "",
  date_of_appointment: "", employment_status: "Permanent"
};

export default function RegisterStaff() {
  const [activeTab, setActiveTab] = useState("personal");
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [otherRole, setOtherRole] = useState("");
  
  // Date States
  const [dob, setDob] = useState<Date | null>(null);
  const [doa, setDoa] = useState<Date | null>(null);

  const formRef = useRef(INITIAL_STATE);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    formRef.current = { 
        ...formRef.current, 
        [name]: name === "years_of_experience" ? parseInt(value) || 0 : value 
    };
  }, []);

  const handleDateChange = (date: Date | null, field: 'date_of_birth' | 'date_of_appointment') => {
    if (field === 'date_of_birth') setDob(date);
    else setDoa(date);

    if (date) {
        const formatted = date.toISOString().split('T')[0];
        formRef.current = { ...formRef.current, [field]: formatted };
    }
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    const finalData = {
        ...formRef.current,
        role: formRef.current.role === "Other" ? otherRole : formRef.current.role
    };

    try {
      await axios.post("/staffs/register", finalData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (e) { 
        setSaveStatus('error'); 
        setTimeout(() => setSaveStatus('idle'), 2500); 
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <SaveModal status={saveStatus} />

      {/* --- HEADER --- */}
      <div className="border-b border-zinc-200 sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center text-white text-xs font-bold bg-blue-600">HR</div>
            <h1 className="text-sm font-bold uppercase tracking-tight">Staff Portal</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs font-medium text-zinc-500 hover:bg-zinc-100 px-3 py-1.5 rounded">Discard</button>
            <button 
              onClick={handleSave}
              className="bg-zinc-900 text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-2 hover:bg-zinc-800 transition-colors"
            >
              <Save size={14} /> SAVE RECORD
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* --- TABS --- */}
        <div className="flex border-b border-zinc-200 mb-6 overflow-x-auto no-scrollbar">
          <button onClick={() => setActiveTab("personal")} className={`px-6 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === 'personal' ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}>1. Bio & Identity</button>
          <button onClick={() => setActiveTab("professional")} className={`px-6 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === 'professional' ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}>2. Qualifications</button>
          <button onClick={() => setActiveTab("employment")} className={`px-6 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === 'employment' ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}>3. Employment Data</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            
            {activeTab === 'personal' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField label="Surname" name="surname" placeholder="e.g. Doe" required onChange={handleInputChange} />
                  <FormField label="First Name" name="first_name" placeholder="e.g. John" required onChange={handleInputChange} />
                  <FormField label="Other Names" name="other_names" placeholder="Middle Name" onChange={handleInputChange} />
                  
                  <FormField label="Gender" name="sex" type="select" options={GENDER_OPTIONS} onChange={handleInputChange} />
                  
                  {/* DATE OF BIRTH */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-tight">Date of Birth <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <DatePicker 
                          selected={dob} 
                          onChange={(date) => handleDateChange(date, 'date_of_birth')} 
                          dateFormat="yyyy-MM-dd" 
                          placeholderText="YYYY-MM-DD" 
                          className="w-full h-9 px-3 bg-white border border-zinc-300 rounded text-sm focus:outline-none focus:border-blue-600 placeholder:text-zinc-300"
                          wrapperClassName="w-full"
                        />
                        <Calendar className="absolute right-2 top-2.5 text-zinc-400 pointer-events-none" size={14} />
                    </div>
                  </div>

                  <FormField label="Marital Status" name="marital_status" type="select" options={MARITAL_OPTIONS} onChange={handleInputChange} />
                </div>
                
                <div className="pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Email Address" name="email" type="email" placeholder="john.doe@school.com" onChange={handleInputChange} />
                  <FormField label="Phone Number" name="phone" placeholder="080..." onChange={handleInputChange} />
                  <FormField label="Residential Address" name="address" fullWidth onChange={handleInputChange} />
                </div>
              </div>
            )}

            {activeTab === 'professional' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Highest Qualification" name="highest_qualification" placeholder="e.g. B.Sc Computer Science" onChange={handleInputChange} />
                    <FormField label="Years of Experience" name="years_of_experience" type="number" onChange={handleInputChange} />
                </div>
                <div className="p-4 border border-zinc-200 rounded bg-zinc-50">
                    <h3 className="text-xs font-bold uppercase text-zinc-400 mb-4 flex items-center gap-2"><GraduationCap size={14}/> Subject Specialization</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Primary Subject" name="primary_subject" placeholder="e.g. Mathematics" onChange={handleInputChange} />
                        <FormField label="Secondary Subject" name="secondary_subject" placeholder="e.g. Further Maths" onChange={handleInputChange} />
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'employment' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                <div className="p-4 border border-zinc-200 rounded h-fit space-y-4">
                  <h3 className="text-xs font-bold uppercase text-zinc-400 flex items-center gap-2"><Briefcase size={14}/> Job Details</h3>
                  <FormField label="Job Role" name="role" type="select" options={ROLE_OPTIONS} required onChange={handleInputChange} />
                  {formRef.current.role === "Other" && (
                      <div className="flex flex-col gap-1">
                           <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-tight">Specify Role</label>
                           <input type="text" onChange={(e) => setOtherRole(e.target.value)} className="w-full h-9 px-3 bg-white border border-blue-300 rounded text-sm focus:outline-none focus:border-blue-600" />
                      </div>
                  )}
                  <FormField label="Employment Status" name="employment_status" type="select" options={STATUS_OPTIONS} onChange={handleInputChange} />
                </div>

                <div className="p-4 border border-zinc-200 rounded h-fit space-y-4">
                  <h3 className="text-xs font-bold uppercase text-zinc-400 flex items-center gap-2"><Calendar size={14}/> Timeline</h3>
                  {/* DATE OF APPOINTMENT */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-tight">Date of Appointment <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <DatePicker 
                          selected={doa} 
                          onChange={(date) => handleDateChange(date, 'date_of_appointment')} 
                          dateFormat="yyyy-MM-dd" 
                          placeholderText="YYYY-MM-DD" 
                          className="w-full h-9 px-3 bg-white border border-zinc-300 rounded text-sm focus:outline-none focus:border-blue-600 placeholder:text-zinc-300"
                          wrapperClassName="w-full"
                        />
                        <Calendar className="absolute right-2 top-2.5 text-zinc-400 pointer-events-none" size={14} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --- SIDEBAR --- */}
          <div className="lg:col-span-1 space-y-4">
            <div className="border border-zinc-200 p-4 rounded text-center bg-white">
              <div className="w-20 h-20 border border-zinc-200 mx-auto mb-3 flex flex-col items-center justify-center text-zinc-400 bg-zinc-50 rounded">
                <Camera size={20} />
              </div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase">Staff Photo</p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-4 rounded">
              <div className="flex items-center gap-2 text-zinc-600 mb-2 font-bold uppercase text-xs"><Info size={14} /> Guidelines</div>
              <ul className="text-[10px] text-zinc-500 space-y-2 leading-tight">
                <li>• Ensure date formats follow YYYY-MM-DD.</li>
                <li>• Mobile numbers must be valid.</li>
                <li>• Qualifications must be official.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Internal FormField Helper
const FormField = ({ label, name, type = "text", options, onChange, placeholder, fullWidth, required }: any) => (
    <div className={`flex flex-col gap-1 ${fullWidth ? "col-span-full" : ""}`}>
      <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-tight">{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        {type === "select" ? (
          <>
            <select name={name} onChange={onChange} className="w-full h-9 px-3 bg-white border border-zinc-300 rounded text-sm focus:outline-none focus:border-blue-600 appearance-none cursor-pointer">
              <option value="">Select...</option>
              {options?.map((opt: any, i: number) => <option key={i} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 text-zinc-400 pointer-events-none" size={14} />
          </>
        ) : (
          <input type={type} name={name} placeholder={placeholder} onChange={onChange} className="w-full h-9 px-3 bg-white border border-zinc-300 rounded text-sm focus:outline-none focus:border-blue-600 placeholder:text-zinc-300" />
        )}
      </div>
    </div>
  );