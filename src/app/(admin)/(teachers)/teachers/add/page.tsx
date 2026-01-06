"use client";
import React, { useState, useCallback, useRef } from "react";
import { 
  User, Briefcase, GraduationCap, Camera, ChevronDown, 
  ArrowRight, Save, CheckCircle2, AlertCircle
} from "lucide-react";
import axios from "../../../../../../libs/axios";
import { SaveModal } from "@/components/common/Reusables/Preloader";

// --- CONSTANTS & OPTIONS ---
const ROLE_OPTIONS = ["Teacher", "Principal", "Vice Principal", "Administrator", "Bursar", "Lab Technician"];
const SUBJECT_OPTIONS = ["Mathematics", "English", "Physics", "Chemistry", "Biology", "Economics", "Civic Education", "None"];
const STATUS_OPTIONS = ["Active", "Probation", "Suspended", "On Leave", "Terminated"];
const MARITAL_OPTIONS = ["Single", "Married", "Divorced", "Widowed"];
const GENDER_OPTIONS = ["Male", "Female"];

const INITIAL_STATE = {
  // Personal
  name: "", 
  email: "", 
  phone: "", 
  sex: "", 
  date_of_birth: "", 
  marital_status: "", 
  address: "", 
  profile_pic: "",
  
  // Professional
  highest_qualification: "", 
  years_of_experience: "", 
  primary_subject: "", 
  secondary_subject: "",
  
  // Employment
  staff_no: "", 
  role: "", 
  date_of_appointment: "", 
  employment_status: "Active"
};

// --- MEMOIZED UI COMPONENTS ---

const NavItem = React.memo(({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    type="button"
    className={`w-full text-left px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-l-2 ${
      active 
        ? "bg-white border-indigo-600 text-indigo-900 shadow-sm" 
        : "border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
    }`}
  >
    {label}
  </button>
));
NavItem.displayName = "NavItem";

const SectionHeader = React.memo(({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
  <div className="flex items-start gap-5 mb-8 pb-6 border-b border-zinc-100">
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
      {icon}
    </div>
    <div className="pt-1">
      <h2 className="text-xl font-bold text-zinc-900">{title}</h2>
      <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{subtitle}</p>
    </div>
  </div>
));
SectionHeader.displayName = "SectionHeader";

const InputGroup = React.memo(({ 
  label, name, defaultValue, onChange, placeholder, 
  type = "text", required, options, fullWidth, className
}: any) => {
  return (
    <div className={`space-y-1.5 ${fullWidth ? "md:col-span-2" : ""} ${className || ""}`}>
      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative group">
        {type === "select" ? (
          <>
            <select 
              name={name}
              defaultValue={defaultValue}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>Select {label}</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-focus-within:text-indigo-500" size={16} />
          </>
        ) : (
          <input 
            type={type} 
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-xl bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all placeholder:text-zinc-300" 
          />
        )}
      </div>
    </div>
  );
});
InputGroup.displayName = "InputGroup";


// --- MAIN COMPONENT ---

export default function RegisterStaff() {
  const [activeSection, setActiveSection] = useState("personal");
  const formRef = useRef(INITIAL_STATE);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Silent update using useRef to avoid re-renders on every keystroke
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    formRef.current = { ...formRef.current, [name]: value };
  }, []);

  async function handleSave(){
    setSaveStatus('saving');
    const formData = formRef.current;

    // Simulate Network Delay
    await new Promise(r => setTimeout(r, 800));

    try {
      // Maps directly to your DB columns
      const response = await axios.post("/staff/register", formData);
      
      console.log("Staff Registered:", response.data);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);

    } catch (error: any) {
      console.error("Error submitting form:", error.response?.data || error.message);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-zinc-900 font-sans selection:bg-indigo-100">
      
      <SaveModal status={saveStatus} />

      {/* --- STICKY HEADER --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-6 md:px-8 py-4 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
               HR
             </div>
             <div>
                <h1 className="text-xl font-bold text-zinc-900 tracking-tight leading-none">Staff Portal</h1>
                <p className="text-xs font-medium text-zinc-500 pt-1">New Staff Onboarding</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold text-zinc-500 hover:text-zinc-800 transition-colors">Discard</button>
            <button 
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="px-6 py-2.5 bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 rounded-xl shadow-xl shadow-zinc-200"
            >
              {saveStatus === 'saving' ? 'Processing...' : 'Save Record'} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-16 p-6 md:p-12">
        
        {/* --- NAVIGATION SIDEBAR --- */}
        <aside className="hidden md:block sticky top-32 h-fit">
          <nav className="space-y-2">
            <NavItem active={activeSection === "personal"} label="Bio & Identity" onClick={() => setActiveSection("personal")} />
            <NavItem active={activeSection === "professional"} label="Academic Portfolio" onClick={() => setActiveSection("professional")} />
            <NavItem active={activeSection === "employment"} label="Employment Data" onClick={() => setActiveSection("employment")} />
          </nav>
          
          <div className="mt-10 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <p className="text-xs text-indigo-800 font-medium leading-relaxed">
              <strong>Note:</strong> Staff ID is usually auto-generated, but can be manually set if migrating data.
            </p>
          </div>
        </aside>

        {/* --- FORM CONTENT --- */}
        <main className="min-h-[600px]">

          {/* SECTION 1: PERSONAL */}
          <section id="personal" className={activeSection === 'personal' ? "block animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out" : "hidden"}>
            <SectionHeader icon={<User size={24}/>} title="Personal Information" subtitle="Basic identification and contact details for the staff member." />
            
            <div className="flex flex-col-reverse md:flex-row gap-10 mb-8">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Name" name="name" placeholder="e.g. Dr. Sarah Benson" required defaultValue={INITIAL_STATE.name} onChange={handleInputChange} fullWidth />
                
                <InputGroup label="Email Address" name="email" type="email" placeholder="sarah@school.com" required defaultValue={INITIAL_STATE.email} onChange={handleInputChange} />
                <InputGroup label="Phone Number" name="phone" placeholder="+234..." required defaultValue={INITIAL_STATE.phone} onChange={handleInputChange} />
                
                <InputGroup label="Date of Birth" name="date_of_birth" type="date" required defaultValue={INITIAL_STATE.date_of_birth} onChange={handleInputChange} />
                <InputGroup label="Gender" name="sex" type="select" options={GENDER_OPTIONS} defaultValue={INITIAL_STATE.sex} onChange={handleInputChange} />
                
                <InputGroup label="Marital Status" name="marital_status" type="select" options={MARITAL_OPTIONS} defaultValue={INITIAL_STATE.marital_status} onChange={handleInputChange} />
              </div>
              
              {/* Photo Upload */}
              <div className="w-full md:w-auto flex flex-col items-center md:items-start">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Profile Photo</label>
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-400 group hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer shadow-sm">
                  <div className="p-3 bg-zinc-50 rounded-full group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                      <Camera size={20} />
                  </div>
                  <span className="text-[10px] mt-2 font-semibold uppercase tracking-wide">Upload</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <InputGroup 
                label="Residential Address" 
                name="address" 
                placeholder="Enter full home address..." 
                defaultValue={INITIAL_STATE.address} 
                onChange={handleInputChange} 
                fullWidth
              />
            </div>
          </section>

          {/* SECTION 2: PROFESSIONAL */}
          <section id="professional" className={activeSection === 'professional' ? "block animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out" : "hidden"}>
            <SectionHeader icon={<GraduationCap size={24}/>} title="Academic Qualifications" subtitle="Educational background and teaching subjects." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <InputGroup 
                  label="Highest Qualification" 
                  name="highest_qualification" 
                  placeholder="e.g. B.Sc(Ed) Mathematics" 
                  required
                  defaultValue={INITIAL_STATE.highest_qualification} 
                  onChange={handleInputChange} 
               />
               <InputGroup 
                  label="Years of Experience" 
                  name="years_of_experience" 
                  type="number"
                  placeholder="e.g. 5" 
                  defaultValue={INITIAL_STATE.years_of_experience} 
                  onChange={handleInputChange} 
               />
            </div>
            
            <div className="mt-8 p-6 bg-zinc-50/80 border border-zinc-100 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="md:col-span-2">
                 <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2 mb-1">
                   Subject Allocation
                 </h4>
                 <p className="text-xs text-zinc-500">Assign the primary and secondary teaching areas.</p>
               </div>
               
               <InputGroup 
                  label="Primary Subject" 
                  name="primary_subject" 
                  type="select"
                  options={SUBJECT_OPTIONS}
                  defaultValue={INITIAL_STATE.primary_subject} 
                  onChange={handleInputChange} 
               />
               <InputGroup 
                  label="Secondary Subject" 
                  name="secondary_subject" 
                  type="select"
                  options={SUBJECT_OPTIONS}
                  defaultValue={INITIAL_STATE.secondary_subject} 
                  onChange={handleInputChange} 
               />
            </div>
          </section>

          {/* SECTION 3: EMPLOYMENT */}
          <section id="employment" className={activeSection === 'employment' ? "block animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out" : "hidden"}>
            <SectionHeader icon={<Briefcase size={24}/>} title="Employment Data" subtitle="Contractual details, role assignment and ID." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <InputGroup 
                  label="Staff ID No" 
                  name="staff_no" 
                  placeholder="e.g. STF/2024/001" 
                  defaultValue={INITIAL_STATE.staff_no} 
                  onChange={handleInputChange} 
               />
               <InputGroup 
                  label="Job Role" 
                  name="role" 
                  type="select"
                  options={ROLE_OPTIONS}
                  required
                  defaultValue={INITIAL_STATE.role} 
                  onChange={handleInputChange} 
               />
               <InputGroup 
                  label="Date of Appointment" 
                  name="date_of_appointment" 
                  type="date"
                  required
                  defaultValue={INITIAL_STATE.date_of_appointment} 
                  onChange={handleInputChange} 
               />
               <InputGroup 
                  label="Employment Status" 
                  name="employment_status" 
                  type="select"
                  options={STATUS_OPTIONS}
                  defaultValue={INITIAL_STATE.employment_status} 
                  onChange={handleInputChange} 
               />
            </div>
            
            <div className="mt-8 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-start gap-3">
               <CheckCircle2 className="text-indigo-600 shrink-0 mt-0.5" size={18} />
               <p className="text-sm text-indigo-900">
                 By saving this record, you confirm that the <strong>date of appointment</strong> matches the physical contract signed by the staff member.
               </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}