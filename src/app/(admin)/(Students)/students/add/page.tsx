"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { 
  User, Users, ArrowRight, Camera, ChevronDown, Sparkles, Menu, X
} from "lucide-react";
import axios from "../../../../../../libs/axios"; 
import { SaveModal } from "@/components/common/Reusables/Preloader";

const GENDER_OPTIONS = ["Male", "Female"];

const INITIAL_STATE = {
  first_name: "", 
  last_name: "", 
  class_id: "",
  date_of_birth: "", 
  gender: "", 
  nationality: "Nigerian", 
  religion: "", 
  address: "", 
  blood_group: "", 
  genotype: "", 
  state_of_origin: "", 
  lga: "",
  fathers_name: "", 
  fathers_number: "",
  mothers_name: "", 
  mothers_number: ""
};

const NavItem = React.memo(({ label, active, onClick, icon }: any) => (
  <button 
    onClick={onClick}
    type="button"
    className={`group w-full text-left px-4 py-3 rounded-lg text-xs font-semibold transition-all duration-300 border-l-2 ${
      active 
        ? "bg-white border-indigo-600 text-indigo-900" 
        : "border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
    }`}
  >
    <div className="flex items-center gap-2.5">
      <div className={`transition-all ${active ? 'text-indigo-600' : 'text-zinc-400 group-hover:text-zinc-600'}`}>
        {icon}
      </div>
      <span>{label}</span>
    </div>
  </button>
));
NavItem.displayName = "NavItem";

const SectionHeader = React.memo(({ icon, title, subtitle }: any) => (
  <div className="mb-6 md:mb-8">
    <div className="flex items-start gap-3 md:gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-indigo-600 border border-indigo-100/50 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-base md:text-lg font-bold text-zinc-900 mb-1">{title}</h2>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  </div>
));
SectionHeader.displayName = "SectionHeader";

const InputGroup = React.memo(({ 
  label, name, defaultValue, onChange, placeholder, 
  type = "text", required, options, fullWidth, className
}: any) => {
  return (
    <div className={`space-y-1.5 ${fullWidth ? "col-span-full" : ""} ${className || ""}`}>
      <label className="text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wide pl-0.5">
        {label}
      </label>
      
      <div className="relative group">
        {type === "select" ? (
          <>
            <select 
              name={name}
              defaultValue={defaultValue}
              onChange={onChange}
              className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer hover:border-zinc-300"
            >
              <option value="" disabled>Select {label}</option>
              {options?.map((opt: any, idx: number) => {
                const value = typeof opt === 'object' ? opt.value : opt;
                const display = typeof opt === 'object' ? opt.label : opt;
                return (
                  <option key={`${value}-${idx}`} value={value}>{display}</option>
                );
              })}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" size={16} />
          </>
        ) : (
          <input 
            type={type} 
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all placeholder:text-zinc-300 hover:border-zinc-300" 
          />
        )}
      </div>
    </div>
  );
});
InputGroup.displayName = "InputGroup";

export default function RegisterStudent() {
  const [activeSection, setActiveSection] = useState("personal");
  const [classes, setClasses] = useState<any[]>([]);
  const formRef = useRef(INITIAL_STATE);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("/class/all_classes");
        if (Array.isArray(response.data)) {
            setClasses(response.data);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  const classOptions = classes.map((cls) => ({
    value: cls.class_id,
    label: `${cls.class_code}`
  }));

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    formRef.current = { ...formRef.current, [name]: value };
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  async function handleSave(){
    setSaveStatus('saving');
    
    const formData = formRef.current;
    
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      nationality: formData.nationality,
      religion: formData.religion,
      address: formData.address,
      state_of_origin: formData.state_of_origin,
      lga: formData.lga,
      blood_group: formData.blood_group,
      genotype: formData.genotype,
      class_id: formData.class_id ? parseInt(formData.class_id) : null,
      fathers_name: formData.fathers_name,
      fathers_number: formData.fathers_number,
      mothers_name: formData.mothers_name,
      mothers_number: formData.mothers_number
    };

    await new Promise(r => setTimeout(r, 800));

    try {
      const response = await axios.post("/students/register", payload);
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } catch (error: any) {
      console.error("Error submitting form:", error.response?.data || error.message);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2500);
    }
  };

  return (
    <div className=" bg-[#FDFDFE] text-zinc-900 font-sans selection:bg-indigo-100">
      
      <SaveModal status={saveStatus} />

      {/* Top Bar */}
      <div className="top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg shadow-indigo-200">
                ES
              </div>
              <div>
                <h1 className="text-sm md:text-base font-bold text-zinc-900 tracking-tight leading-none">Enroll System</h1>
                <p className="text-[10px] md:text-xs font-medium text-zinc-500 hidden sm:flex items-center gap-1.5 pt-0.5">
                  <Sparkles size={10} className="text-indigo-500" />
                  New Student Registration
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button className="hidden md:block px-4 py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 rounded-lg transition-all">
                Discard
              </button>
              <button 
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="px-4 md:px-5 py-2 md:py-2.5 bg-zinc-900 text-white text-xs md:text-sm font-semibold hover:bg-zinc-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 rounded-lg shadow-lg shadow-zinc-200"
              >
                <span className="hidden sm:inline">{saveStatus === 'saving' ? 'Processing...' : 'Save Record'}</span>
                <span className="sm:hidden">{saveStatus === 'saving' ? 'Saving...' : 'Save'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden sticky top-[57px] md:top-[65px] z-40 bg-white border-b border-zinc-100 px-4 py-3">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-zinc-700"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          {activeSection === 'personal' ? 'Personal Information' : 'Guardian Details'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[105px] md:top-[113px] z-30 bg-white border-b border-zinc-100 p-4 space-y-2">
          <NavItem 
            active={activeSection === "personal"} 
            label="Personal Info" 
            icon={<User size={16} />}
            onClick={() => handleSectionChange("personal")} 
          />
          <NavItem 
            active={activeSection === "guardian"} 
            label="Guardian Details" 
            icon={<Users size={16} />}
            onClick={() => handleSectionChange("guardian")} 
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 md:gap-8 lg:gap-12 p-4 md:p-6 lg:p-10">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-2">
            <NavItem 
              active={activeSection === "personal"} 
              label="Personal Information" 
              icon={<User size={16} />}
              onClick={() => setActiveSection("personal")} 
            />
            <NavItem 
              active={activeSection === "guardian"} 
              label="Guardian Details" 
              icon={<Users size={16} />}
              onClick={() => setActiveSection("guardian")} 
            />
            
            <div className="mt-6 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mb-3 shadow-sm shadow-indigo-200">
                <Sparkles size={16} className="text-white" />
              </div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1.5">Quick Tip</h4>
              <p className="text-[10px] text-zinc-600 leading-relaxed">
                Ensure all required fields are filled to successfully register the student.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Form Area */}
        <main className="min-h-[400px]">
          
          {/* PERSONAL SECTION */}
          <section className={activeSection === 'personal' ? "block animate-in fade-in duration-500" : "hidden"}>
            <SectionHeader 
              icon={<User size={20}/>} 
              title="Personal Details" 
              subtitle="Student legal and biographical information." 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <InputGroup label="First Name" name="first_name" placeholder="e.g. Daniel" defaultValue={INITIAL_STATE.first_name} onChange={handleInputChange} />
                <InputGroup label="Last Name" name="last_name" placeholder="e.g. Adebayo" defaultValue={INITIAL_STATE.last_name} onChange={handleInputChange} />
                
                <InputGroup 
                  label="Class" 
                  name="class_id" 
                  type="select" 
                  options={classOptions} 
                  defaultValue={INITIAL_STATE.class_id} 
                  onChange={handleInputChange} 
                  fullWidth
                />
                
                <InputGroup label="Gender" name="gender" type="select" options={GENDER_OPTIONS} defaultValue={INITIAL_STATE.gender} onChange={handleInputChange} />
                <InputGroup label="Date of Birth" name="date_of_birth" type="date" defaultValue={INITIAL_STATE.date_of_birth} onChange={handleInputChange} />
              </div>
              
              {/* Photo Upload */}
              <div className="flex flex-col items-center sm:items-start">
                <label className="text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">Passport</label>
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 md:w-36 md:h-36 bg-white border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center text-zinc-400 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all">
                    <div className="w-12 h-12 bg-zinc-50 rounded-lg flex items-center justify-center mb-2 group-hover:bg-indigo-50 group-hover:scale-105 transition-all">
                      <Camera size={20} className="text-zinc-500 group-hover:text-indigo-600" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500 group-hover:text-indigo-600">Upload</span>
                    <span className="text-[9px] text-zinc-400 mt-0.5">Max 2MB</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 md:space-y-6">
              <InputGroup 
                label="Residential Address" 
                name="address" 
                placeholder="Street number, Area, City..." 
                defaultValue={INITIAL_STATE.address} 
                onChange={handleInputChange} 
                fullWidth
              />
                
              <div className="bg-zinc-50/80 p-5 md:p-6 rounded-xl border border-zinc-100">
                <h3 className="text-xs md:text-sm font-bold text-zinc-900 mb-4 md:mb-5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                  Medical & Origin Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <InputGroup label="Blood Group" name="blood_group" placeholder="O+" defaultValue={INITIAL_STATE.blood_group} onChange={handleInputChange} />
                  <InputGroup label="Genotype" name="genotype" placeholder="AA" defaultValue={INITIAL_STATE.genotype} onChange={handleInputChange} />
                  <InputGroup label="State of Origin" name="state_of_origin" placeholder="Lagos" defaultValue={INITIAL_STATE.state_of_origin} onChange={handleInputChange} />
                  <InputGroup label="LGA" name="lga" placeholder="Ikeja" defaultValue={INITIAL_STATE.lga} onChange={handleInputChange} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <InputGroup label="Nationality" name="nationality" placeholder="Nigerian" defaultValue={INITIAL_STATE.nationality} onChange={handleInputChange} />
                <InputGroup label="Religion" name="religion" placeholder="e.g. Christianity" defaultValue={INITIAL_STATE.religion} onChange={handleInputChange} />
              </div>
            </div>
          </section>

          {/* GUARDIAN SECTION */}
          <section className={activeSection === 'guardian' ? "block animate-in fade-in duration-500" : "hidden"}>
            <SectionHeader 
              icon={<Users size={20}/>} 
              title="Guardian Units" 
              subtitle="Emergency contacts and sponsor details." 
            />
            
            <div className="space-y-5 md:space-y-8">
              {/* Father's Details */}
              <div className="bg-white p-5 md:p-6 rounded-xl border border-zinc-200">
                <div className="flex items-center gap-2.5 mb-4 md:mb-5 pb-3 md:pb-4 border-b border-zinc-100">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm shadow-indigo-200">
                    <User size={16} className="text-white" />
                  </div>
                  <h4 className="text-xs md:text-sm font-bold text-zinc-900">Father's Details</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <InputGroup label="Full Name" name="fathers_name" placeholder="Father's full name" defaultValue={INITIAL_STATE.fathers_name} onChange={handleInputChange} />
                  <InputGroup label="Phone Number" name="fathers_number" placeholder="+234..." defaultValue={INITIAL_STATE.fathers_number} onChange={handleInputChange} />
                </div>
              </div>

              {/* Mother's Details */}
              <div className="bg-white p-5 md:p-6 rounded-xl border border-zinc-200">
                <div className="flex items-center gap-2.5 mb-4 md:mb-5 pb-3 md:pb-4 border-b border-zinc-100">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm shadow-indigo-200">
                    <User size={16} className="text-white" />
                  </div>
                  <h4 className="text-xs md:text-sm font-bold text-zinc-900">Mother's Details</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <InputGroup label="Full Name" name="mothers_name" placeholder="Mother's full name" defaultValue={INITIAL_STATE.mothers_name} onChange={handleInputChange} />
                  <InputGroup label="Phone Number" name="mothers_number" placeholder="+234..." defaultValue={INITIAL_STATE.mothers_number} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}