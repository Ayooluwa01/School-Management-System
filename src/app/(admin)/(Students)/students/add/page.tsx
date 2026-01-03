"use client";
import React, { useState, useCallback } from "react";
import { 
  User, Users, ArrowRight, Camera, ChevronDown, MapPin 
} from "lucide-react";
import api from "../../../../../../libs/axios";
import axios from "../../../../../../libs/axios";

const CLASS_OPTIONS = [
  "JSS 1", "JSS 2", "JSS 3", 
  "SSS 1 (Science)", "SSS 1 (Art)", "SSS 1 (Commercial)",
  "SSS 2 (Science)", "SSS 2 (Art)", "SSS 2 (Commercial)",
  "SSS 3 (Science)", "SSS 3 (Art)", "SSS 3 (Commercial)"
];

const INITIAL_STATE = {
  // Personal
  firstName: "", lastName: "", assignedClass: "", 
  dob: "", gender: "", nationality: "Nigerian", 
  religion: "", 
  address: "", city: "", // Added Address Fields
  bloodGroup: "", genotype: "", 
  stateOrigin: "", lga: "",
  // Guardian
  fatherName: "", fatherPhone: "",
  motherName: "", motherPhone: "",
  guardianOcc: "", guardianEmail: ""
};

// --- MEMOIZED COMPONENTS ---
const NavItem = React.memo(({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
      active ?  "bg-indigo-50 text-indigo-900" : "text-zinc-500 hover:bg-zinc-50"
    }`}
  >
    {label}
  </button>
));
NavItem.displayName = "NavItem";

const SectionHeader = React.memo(({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
  <div className="flex items-center gap-4 mb-10">
    <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-900 border border-zinc-100">
      {icon}
    </div>
    <div>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-zinc-500">{subtitle}</p>
    </div>
  </div>
));
SectionHeader.displayName = "SectionHeader";

const InputGroup = React.memo(({ 
  label, name, value, onChange, placeholder, 
  type = "text", required, options, fullWidth 
}: any) => {
  return (
    <div className={`space-y-1 ${fullWidth ? "md:col-span-2" : ""}`}>
      <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === "select" ? (
        <div className="relative">
          <select 
            name={name}
            value={value}
            onChange={onChange}
            className="minimal-input appearance-none bg-transparent cursor-pointer"
          >
            <option value="" disabled>Select {label}</option>
            {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
        </div>
      ) : (
        <input 
          type={type} 
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder} 
          className="minimal-input" 
        />
      )}
    </div>
  );
});
InputGroup.displayName = "InputGroup";


// --- MAIN COMPONENT ---

export default function RegisterStudent() {
  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSave = async () => {
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
    fatherName: formData.fatherName,
    fatherPhone: formData.fatherPhone,
    motherName: formData.motherName,
    motherPhone: formData.motherPhone,
    guardianOccupation: formData.guardianOcc, 
    guardianEmail: formData.guardianEmail
  };
  console.log("Submitting payload:", payload);
alert(payload)
async function handleSave(){
  // Map frontend keys to backend DTO keys
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
    fatherName: formData.fatherName,
    fatherPhone: formData.fatherPhone,
    motherName: formData.motherName,
    motherPhone: formData.motherPhone,
    guardianOccupation: formData.guardianOcc, 
    guardianEmail: formData.guardianEmail
  };


  try {
    const response = await axios.post("/students/register", payload);

    alert("Student saved successfully!");
    console.log("Backend response:", response.data);

    setFormData(INITIAL_STATE);

  } catch (error) {
    console.error("Error submitting form:", error.response?.data || error.message);
    alert("Error saving student. Check console for details.");
  }
};

  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* --- TOP STICKY NAV --- */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Enroll System</h1>
            <p className="text-sm text-gray-500">Register a student</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900">Discard</button>
            <button 
              onClick={()=>handleSave()}
              className="px-6 py-2 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 rounded-sm shadow-md shadow-indigo-200"
            >
              Save Record <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 p-8">
        
        {/* --- FLOATING LEFT NAV --- */}
        <aside className="md:block md:sticky top-28 h-fit space-y-1">
          <NavItem active={activeSection === "personal"} label="Personal Info" onClick={() => setActiveSection("personal")} />
          <NavItem active={activeSection === "guardian"} label="Guardian Details" onClick={() => setActiveSection("guardian")} />
        </aside>

        {/* --- FORM BODY --- */}
        <main className="space-y-20 pb-20">
          
          {/* SECTION: PERSONAL */}
          {activeSection === 'personal' && (
            <section id="personal" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <SectionHeader icon={<User size={20}/>} title="Personal Details" subtitle="Full legal name and biological information." />
              
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="First Name" name="firstName" placeholder="" required value={formData.firstName} onChange={handleInputChange} />
                  <InputGroup label="Last Name" name="lastName" placeholder="" required value={formData.lastName} onChange={handleInputChange} />
                  
                  {/* CLASS DROPDOWN */}
                  <InputGroup label="Class" name="assignedClass" type="select" options={CLASS_OPTIONS} required value={formData.assignedClass} onChange={handleInputChange} />
                  
                  <InputGroup label="Gender" name="gender" type="select" options={["Male", "Female"]} value={formData.gender} onChange={handleInputChange} />
                  <InputGroup label="Date of Birth" name="dob" type="date" required value={formData.dob} onChange={handleInputChange} />
                  <InputGroup label="Religion" name="religion" placeholder="" value={formData.religion} onChange={handleInputChange} />
                </div>
                
                {/* Photo Upload */}
                <div className="w-full md:w-40">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase mb-3 block">Photo</label>
                  <div className="aspect-square bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-3xl flex flex-col items-center justify-center text-zinc-400 group hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer">
                    <Camera size={24} className="group-hover:text-indigo-600" />
                    <span className="text-[10px] mt-2 font-medium">Upload</span>
                  </div>
                </div>
              </div>

              {/* --- ADDRESS SECTION (NEW) --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="md:col-span-2">
                    <InputGroup 
                      label="Residential Address" 
                      name="address" 
                      placeholder="" 
                      required
                      value={formData.address} 
                      onChange={handleInputChange} 
                    />
                 </div>
             
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-zinc-50 rounded-3xl mt-2">
                <InputGroup label="Blood Group" name="bloodGroup" placeholder="O+" value={formData.bloodGroup} onChange={handleInputChange} />
                <InputGroup label="Genotype" name="genotype" placeholder="AA" value={formData.genotype} onChange={handleInputChange} />
                <InputGroup label="State of Origin" name="stateOrigin" placeholder="Lagos" value={formData.stateOrigin} onChange={handleInputChange} />
                <InputGroup label="LGA" name="lga" placeholder="Ikeja" value={formData.lga} onChange={handleInputChange} />
              </div>
            </section>
          )}

          {/* SECTION: GUARDIAN */}
          {activeSection === 'guardian' && (
            <section id="guardian" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <SectionHeader icon={<Users size={20}/>} title="Guardian Units" subtitle="Contact information for parents or legal sponsors." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <h4 className="text-sm font-bold text-zinc-800 border-b border-zinc-100 pb-2">Father&rsquo;s Information</h4>
                    <InputGroup label="Full Name" name="fatherName" placeholder="" value={formData.fatherName} onChange={handleInputChange} />
                    <InputGroup label="Phone Number" name="fatherPhone" placeholder="+234..." value={formData.fatherPhone} onChange={handleInputChange} />
                 </div>
                 <div className="space-y-6">
                    <h4 className="text-sm font-bold text-zinc-800 border-b border-zinc-100 pb-2">Mother&rsquo;s Information</h4>
                    <InputGroup label="Full Name" name="motherName" placeholder="" value={formData.motherName} onChange={handleInputChange} />
                    <InputGroup label="Phone Number" name="motherPhone" placeholder="+234..." value={formData.motherPhone} onChange={handleInputChange} />
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <InputGroup label="Guardian Occupation" name="guardianOcc" placeholder="" value={formData.guardianOcc} onChange={handleInputChange} />
                 <InputGroup label="Guardian Email" name="guardianEmail" placeholder="" value={formData.guardianEmail} onChange={handleInputChange} />
              </div>
            </section>
          )}

        </main>
      </div>

      <style jsx>{`
        .minimal-input {
          width: 100%;
          padding: 0.75rem 0;
          background: transparent;
          border-bottom: 2px solid #f4f4f5;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .minimal-input:focus {
          border-bottom-color: #4f46e5;
        }
        select.minimal-input {
            border-radius: 0;
        }
      `}</style>
    </div>
  );
}