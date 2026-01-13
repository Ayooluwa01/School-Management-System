"use client";
import React, { useState, useCallback, useRef } from "react";
import { 
  User, Briefcase, GraduationCap, Camera, ChevronDown, 
  ArrowRight, Save, CheckCircle2, AlertCircle
} from "lucide-react";
import { SaveModal } from "@/components/common/Reusables/Preloader";
import api from "../../../../../../libs/axios";

const ROLE_OPTIONS = ["Teacher", "Principal", "Vice Principal", "Administrator", "Bursar", "Lab Technician", "Other"];
const STATUS_OPTIONS = ["Permanent", "Contract", "Probation", "Part-time"];
const MARITAL_OPTIONS = ["Single", "Married", "Divorced", "Widowed"];
const GENDER_OPTIONS = ["Male", "Female"];

const INITIAL_STATE = {
  name: "",
  sex: "",
  address: "",
  phone: "",
  date_of_birth: "",
  role: "",
  email: "",
  profile_pic: "",
  marital_status: "",
  highest_qualification: "",
  years_of_experience: 0,
  primary_subject: "", // Now optional text
  secondary_subject: "", // Now optional text
  date_of_appointment: "",
  employment_status: "Permanent"
};

export default function RegisterStaff() {
  const [activeSection, setActiveSection] = useState("personal");
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  
  const formRef = useRef(INITIAL_STATE);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "role") setSelectedRole(value);

    formRef.current = { 
      ...formRef.current, 
      [name]: name === "years_of_experience" ? parseInt(value) || 0 : value 
    };
  }, []);

  async function handleSave() {
    setSaveStatus('saving');
    
    const finalData = {
      ...formRef.current,
      role: selectedRole === "Other" ? otherRole : selectedRole
    };

    try {
      await api.post("/staffs/register", finalData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2500);
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-zinc-900 font-sans">
      <SaveModal status={saveStatus} />

      {/* --- HEADER --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">HR</div>
             <div>
                <h1 className="text-xl font-bold text-zinc-900 leading-none">Staff Portal</h1>
                <p className="text-xs font-medium text-zinc-500 mt-1">New Onboarding</p>
             </div>
          </div>
          <button 
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="px-6 py-2.5 bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-all flex items-center gap-2 rounded-xl"
          >
            {saveStatus === 'saving' ? 'Saving...' : 'Save Record'} <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 p-6 md:p-12">
        
        {/* --- SIDEBAR --- */}
        <aside className="hidden md:block sticky top-32 h-fit space-y-2">
          <NavItem active={activeSection === "personal"} label="Bio & Identity" onClick={() => setActiveSection("personal")} />
          <NavItem active={activeSection === "professional"} label="Qualifications" onClick={() => setActiveSection("professional")} />
          <NavItem active={activeSection === "employment"} label="Employment" onClick={() => setActiveSection("employment")} />
        </aside>

        <main>
          {/* SECTION 1: PERSONAL */}
          {activeSection === 'personal' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionHeader icon={<User size={24}/>} title="Personal Information" subtitle="Official identification and contact details." />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Name" name="name" required onChange={handleInputChange} fullWidth />
                <InputGroup label="Email Address" name="email" type="email" required onChange={handleInputChange} />
                <InputGroup label="Phone Number" name="phone" required onChange={handleInputChange} />
                <InputGroup label="Date of Birth" name="date_of_birth" type="date" required onChange={handleInputChange} />
                <InputGroup label="Gender" name="sex" type="select" options={GENDER_OPTIONS} onChange={handleInputChange} />
                <InputGroup label="Marital Status" name="marital_status" type="select" options={MARITAL_OPTIONS} onChange={handleInputChange} />
                <InputGroup label="Residential Address" name="address" fullWidth onChange={handleInputChange} />
              </div>
            </section>
          )}

          {/* SECTION 2: PROFESSIONAL */}
          {activeSection === 'professional' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionHeader icon={<GraduationCap size={24}/>} title="Qualifications" subtitle="Academic background and teaching areas (if applicable)." />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Highest Qualification" name="highest_qualification" placeholder="e.g. B.Sc Computer Science" onChange={handleInputChange} />
                <InputGroup label="Years of Experience" name="years_of_experience" type="number" onChange={handleInputChange} />
                
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div className="md:col-span-2">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-1">Subject Specialization</h4>
                    <p className="text-[11px] text-zinc-500 mb-4 font-medium italic">Leave blank if this staff member is non-teaching.</p>
                  </div>
                  <InputGroup label="Primary Subject" name="primary_subject" placeholder="e.g. Mathematics" onChange={handleInputChange} />
                  <InputGroup label="Secondary Subject" name="secondary_subject" placeholder="e.g. Further Maths" onChange={handleInputChange} />
                </div>
              </div>
            </section>
          )}

          {/* SECTION 3: EMPLOYMENT */}
          {activeSection === 'employment' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionHeader icon={<Briefcase size={24}/>} title="Employment Data" subtitle="Job role and contractual status." />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <InputGroup label="Job Role" name="role" type="select" options={ROLE_OPTIONS} required onChange={handleInputChange} />
                  {selectedRole === "Other" && (
                    <div className="animate-in zoom-in-95 duration-200">
                      <input 
                        type="text"
                        placeholder="Please specify role..."
                        className="w-full px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={otherRole}
                        onChange={(e) => setOtherRole(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <InputGroup label="Date of Appointment" name="date_of_appointment" type="date" required onChange={handleInputChange} />
                <InputGroup label="Employment Status" name="employment_status" type="select" options={STATUS_OPTIONS} onChange={handleInputChange} />
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

function NavItem({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left px-5 py-3 rounded-xl text-sm font-medium transition-all border-l-4 ${
        active ? "bg-indigo-50 border-indigo-600 text-indigo-900" : "border-transparent text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
      }`}
    >
      {label}
    </button>
  );
}

function SectionHeader({ icon, title, subtitle }: any) {
  return (
    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-zinc-100">
      <div className="p-3 bg-zinc-100 rounded-2xl text-indigo-600">{icon}</div>
      <div>
        <h2 className="text-xl font-bold text-zinc-900">{title}</h2>
        <p className="text-sm text-zinc-500 font-medium">{subtitle}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, name, type = "text", options, fullWidth, onChange, placeholder, required }: any) {
  return (
    <div className={`space-y-1.5 ${fullWidth ? "md:col-span-2" : ""}`}>
      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {type === "select" ? (
          <>
            <select 
              name={name} 
              onChange={onChange}
              className="w-full px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium appearance-none outline-none focus:border-indigo-500 focus:bg-white transition-all"
            >
              <option value="">Select {label}</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </>
        ) : (
          <input 
            type={type} 
            name={name} 
            placeholder={placeholder}
            onChange={onChange}
            className="w-full px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-zinc-300"
          />
        )}
      </div>
    </div>
  );
}