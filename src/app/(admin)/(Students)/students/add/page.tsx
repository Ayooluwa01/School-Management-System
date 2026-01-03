"use client";
import React, { useState, useCallback } from "react";
import { 
  User, Users, ArrowRight, Camera, ChevronDown, 
  Loader2, CheckCircle2, AlertCircle
} from "lucide-react";
import axios from "../../../../../../libs/axios"; 

const CLASS_OPTIONS = [
  "JSS 1", "JSS 2", "JSS 3", 
  "SSS 1 (Science)", "SSS 1 (Art)", "SSS 1 (Commercial)",
  "SSS 2 (Science)", "SSS 2 (Art)", "SSS 2 (Commercial)",
  "SSS 3 (Science)", "SSS 3 (Art)", "SSS 3 (Commercial)"
];

const ARM_OPTIONS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const INITIAL_STATE = {
  // Personal
  firstName: "", lastName: "", assignedClass: "", arm: "", 
  dob: "", gender: "", nationality: "Nigerian", 
  religion: "", 
  address: "", city: "",
  bloodGroup: "", genotype: "", 
  stateOrigin: "", lga: "",
  // Guardian
  fatherName: "", fatherPhone: "",
  motherName: "", motherPhone: "",
  guardianOcc: "", guardianEmail: ""
};

// --- MEMOIZED COMPONENTS ---

// 1. Modal Preluder Component
const SaveModal = ({ status }: { status: 'idle' | 'saving' | 'success' | 'error' }) => {
  if (status === 'idle') return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center text-center transform transition-all scale-100">
        
        {status === 'saving' && (
          <>
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">Saving Record...</h3>
            <p className="text-zinc-500 text-sm mt-2">Please wait while we enroll the student.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 animate-in zoom-in duration-300">
              <CheckCircle2 className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">Registration Complete!</h3>
            <p className="text-zinc-500 text-sm mt-2">The student has been successfully added.</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-red-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">Submission Failed</h3>
            <p className="text-zinc-500 text-sm mt-2">Please check your connection and try again.</p>
          </>
        )}
      </div>
    </div>
  );
};

const NavItem = React.memo(({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
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
  label, name, value, onChange, placeholder, 
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
              value={value}
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
            value={value}
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

export default function RegisterStudent() {
  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  async function handleSave(){
    // Trigger the Modal Preluder
    setSaveStatus('saving');

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dob,            
      gender: formData.gender,
      nationality: formData.nationality,
      religion: formData.religion,
      address: formData.address,
      stateOfOrigin: formData.stateOrigin, 
      lga: formData.lga,
      bloodGroup: formData.bloodGroup,
      genotype: formData.genotype,
      class_id: formData.assignedClass,
      arm: formData.arm, // Included Arm in payload
      fatherName: formData.fatherName,
      fatherPhone: formData.fatherPhone,
      motherName: formData.motherName,
      motherPhone: formData.motherPhone,
      guardianOccupation: formData.guardianOcc, 
      guardianEmail: formData.guardianEmail
    };

    // Delay slightly to show the nice loading animation (optional, but looks better)
    await new Promise(r => setTimeout(r, 800));

    try {
      const response = await axios.post("/students/register", payload);

      console.log("Backend response:", response.data);
      
      // Update Modal to Success State
      setSaveStatus('success');
      
      // Close modal and reset form after delay
      setTimeout(() => {
        setSaveStatus('idle');
        setFormData(INITIAL_STATE);
      }, 2000);

    } catch (error: any) {
      console.error("Error submitting form:", error.response?.data || error.message);
      
      // Update Modal to Error State
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-zinc-900 font-sans selection:bg-indigo-100">
      
      <SaveModal status={saveStatus} />

      {/* --- TOP STICKY NAV --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-6 md:px-8 py-4 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
               ES
             </div>
             <div>
                <h1 className="text-xl font-bold text-zinc-900 tracking-tight leading-none">Enroll System</h1>
                <p className="text-xs font-medium text-zinc-500 pt-1">New Student Registration</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold text-zinc-500 hover:text-zinc-800 transition-colors">Discard</button>
            <button 
              onClick={()=>handleSave()}
              disabled={saveStatus === 'saving'}
              className="px-6 py-2.5 bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 rounded-xl shadow-xl shadow-zinc-200"
            >
              {saveStatus === 'saving' ? 'Processing...' : 'Save Record'} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-16 p-6 md:p-12">
        
        {/* --- FLOATING LEFT NAV --- */}
        <aside className="hidden md:block sticky top-32 h-fit">
          <nav className="space-y-2">
            <NavItem active={activeSection === "personal"} label="Personal Information" onClick={() => setActiveSection("personal")} />
            <NavItem active={activeSection === "guardian"} label="Guardian Details" onClick={() => setActiveSection("guardian")} />
          </nav>
          
          <div className="mt-10 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <p className="text-xs text-indigo-800 font-medium leading-relaxed">
              <strong>Tip:</strong> Ensure the passport photograph is under 2MB and clear.
            </p>
          </div>
        </aside>

        {/* --- FORM BODY --- */}
        <main className="min-h-[600px]">
          
          {/* SECTION: PERSONAL */}
          {activeSection === 'personal' && (
            <section id="personal" className="animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out">
              <SectionHeader icon={<User size={24}/>} title="Personal Details" subtitle="Enter the student's legal name and biological information used for official records." />
              
              <div className="flex flex-col-reverse md:flex-row gap-10 mb-8">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="First Name" name="firstName" placeholder="e.g. Daniel" required value={formData.firstName} onChange={handleInputChange} />
                  <InputGroup label="Last Name" name="lastName" placeholder="e.g. Adebayo" required value={formData.lastName} onChange={handleInputChange} />
                  
                  {/* CLASS & ARM ROW */}
                  <div className="md:col-span-2 grid grid-cols-3 gap-4">
                     <div className="col-span-2">
                        <InputGroup label="Class" name="assignedClass" type="select" options={CLASS_OPTIONS} required value={formData.assignedClass} onChange={handleInputChange} />
                     </div>
                     <div className="col-span-1">
                        <InputGroup label="Arm" name="arm" type="select" options={ARM_OPTIONS} required value={formData.arm} onChange={handleInputChange} />
                     </div>
                  </div>
                  
                  <InputGroup label="Gender" name="gender" type="select" options={["Male", "Female"]} value={formData.gender} onChange={handleInputChange} />
                  <InputGroup label="Date of Birth" name="dob" type="date" required value={formData.dob} onChange={handleInputChange} />
                </div>
                
                {/* Photo Upload - More Distinct */}
                <div className="w-full md:w-auto flex flex-col items-center md:items-start">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Passport</label>
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
                  placeholder="Street number, Area, City..." 
                  required
                  value={formData.address} 
                  onChange={handleInputChange} 
                  fullWidth
                />
                 
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-zinc-50/80 border border-zinc-100 rounded-2xl">
                    <InputGroup label="Blood Group" name="bloodGroup" placeholder="O+" value={formData.bloodGroup} onChange={handleInputChange} />
                    <InputGroup label="Genotype" name="genotype" placeholder="AA" value={formData.genotype} onChange={handleInputChange} />
                    <InputGroup label="Origin State" name="stateOrigin" placeholder="Lagos" value={formData.stateOrigin} onChange={handleInputChange} />
                    <InputGroup label="LGA" name="lga" placeholder="Ikeja" value={formData.lga} onChange={handleInputChange} />
                </div>
                
                <InputGroup label="Religion" name="religion" placeholder="e.g. Christianity" value={formData.religion} onChange={handleInputChange} />
              </div>
            </section>
          )}

          {/* SECTION: GUARDIAN */}
          {activeSection === 'guardian' && (
            <section id="guardian" className="animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out">
              <SectionHeader icon={<Users size={24}/>} title="Guardian Units" subtitle="Emergency contacts and sponsor details." />
              
              <div className="space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="md:col-span-2 pb-2 border-b border-zinc-100 mb-2">
                       <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span> Father's Details
                       </h4>
                    </div>
                    <InputGroup label="Full Name" name="fatherName" placeholder="" value={formData.fatherName} onChange={handleInputChange} />
                    <InputGroup label="Phone Number" name="fatherPhone" placeholder="+234..." value={formData.fatherPhone} onChange={handleInputChange} />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="md:col-span-2 pb-2 border-b border-zinc-100 mb-2">
                       <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-pink-500"></span> Mother's Details
                       </h4>
                    </div>
                    <InputGroup label="Full Name" name="motherName" placeholder="" value={formData.motherName} onChange={handleInputChange} />
                    <InputGroup label="Phone Number" name="motherPhone" placeholder="+234..." value={formData.motherPhone} onChange={handleInputChange} />
                 </div>

                 <div className="bg-zinc-50/50 p-6 rounded-2xl border border-zinc-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Guardian Occupation" name="guardianOcc" placeholder="e.g. Civil Servant" value={formData.guardianOcc} onChange={handleInputChange} />
                    <InputGroup label="Guardian Email" name="guardianEmail" placeholder="example@email.com" value={formData.guardianEmail} onChange={handleInputChange} />
                 </div>
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}