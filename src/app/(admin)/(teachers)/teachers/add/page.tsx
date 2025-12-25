"use client";
import React, { useState } from "react";
import { 
  User, Briefcase, GraduationCap, Camera, 
  ArrowRight, Save, X, ChevronRight, BookOpen, CreditCard 
} from "lucide-react";

type SectionType = "personal" | "professional" | "employment";

export default function RegisterTeacher() {
  const [activeSection, setActiveSection] = useState<SectionType>("personal");

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 font-sans pb-20">
      
      {/* --- 1. STICKY HEADER --- */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
              Staff Registration
            </h1>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">
              Onboard a new teacher or staff member into the system.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-all">
              Discard
            </button>
            <button className="px-5 py-2 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm">
              <Save size={14} /> Save Record
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 p-6 md:p-10">
        
        {/* --- 2. SIDEBAR NAVIGATION --- */}
        <aside className="hidden md:block sticky top-32 h-fit">
          <nav className="space-y-1">
            <NavItem 
              active={activeSection === "personal"} 
              label="Bio & Identity" 
              description="Personal Info & Contact"
              onClick={() => setActiveSection("personal")} 
            />
            <NavItem 
              active={activeSection === "professional"} 
              label="Academic Portfolio" 
              description="Qualifications & Subjects"
              onClick={() => setActiveSection("professional")} 
            />
             <NavItem 
              active={activeSection === "employment"} 
              label="Employment Data" 
              description="Role, Salary & Next of Kin"
              onClick={() => setActiveSection("employment")} 
            />
          </nav>
        </aside>

        {/* --- 3. MAIN FORM AREA --- */}
        <main className="bg-white border border-zinc-200 rounded-2xl shadow-sm min-h-[600px] p-8 md:p-10">
          
          {/* TAB: PERSONAL */}
          {activeSection === 'personal' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <SectionHeader 
                icon={<User size={20}/>} 
                title="Personal Information" 
                subtitle="Basic identification and contact details for the staff member." 
              />
              
              <div className="flex flex-col-reverse md:flex-row gap-10">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <FormInput label="Full Name" placeholder="e.g. Dr. Sarah Benson" required />
                  <FormInput label="Email Address" type="email" placeholder="sarah.b@school.com" required />
                  <FormInput label="Phone Number" placeholder="+234..." required />
                  <FormInput label="Date of Birth" type="date" required />
                  <FormInput label="Gender" type="select" options={["Male", "Female"]} />
                  <FormInput label="Marital Status" type="select" options={["Single", "Married", "Other"]} />
                </div>

                <div className="w-full md:w-48 shrink-0">
                  <PhotoUploader label="Staff Photo" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                 <FormInput label="Residential Address" placeholder="Enter full home address..." />
              </div>
            </div>
          )}

          {/* TAB: PROFESSIONAL */}
          {activeSection === 'professional' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <SectionHeader 
                icon={<GraduationCap size={20}/>} 
                title="Academic Qualifications" 
                subtitle="Teacher's educational background and teaching area." 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Highest Qualification" placeholder="e.g. B.Sc(Ed) Mathematics" required />
                  <FormInput label="Years of Experience" placeholder="e.g. 5 Years" />
                  <FormInput label="Primary Subject" type="select" options={["Mathematics", "English", "Physics", "Biology", "Fine Arts"]} />
                  <FormInput label="Secondary Subject" type="select" options={["None", "Mathematics", "English", "Civic Education"]} />
              </div>

              <div className="p-5 bg-zinc-50 rounded-xl border border-zinc-100 space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-zinc-400" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Class Assignments</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <FormInput label="Assigned Class 1" type="select" options={["JSS 1", "JSS 2", "SSS 1"]} />
                   <FormInput label="Assigned Class 2" type="select" options={["None", "JSS 1", "JSS 2", "SSS 1"]} />
                   <FormInput label="Assigned Class 3" type="select" options={["None", "JSS 1", "JSS 2", "SSS 1"]} />
                </div>
              </div>
            </div>
          )}

          {/* TAB: EMPLOYMENT */}
          {activeSection === 'employment' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <SectionHeader 
                icon={<Briefcase size={20}/>} 
                title="Employment & Payroll" 
                subtitle="Contractual details and emergency contact information." 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormInput label="Staff ID Number" placeholder="e.g. TCH/2024/001" />
                 <FormInput label="Date of Appointment" type="date" required />
                 <FormInput label="Employment Status" type="select" options={["Full-Time", "Part-Time", "Contract"]} />
                 <FormInput label="Designation" placeholder="e.g. Senior Tutor" />
              </div>

              <div className="h-px bg-zinc-100" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-zinc-400" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Payment Details</h4>
                    </div>
                    <FormInput label="Bank Name" placeholder="e.g. Zenith Bank" />
                    <FormInput label="Account Number" placeholder="0123456789" />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-zinc-400" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Emergency Contact</h4>
                    </div>
                    <FormInput label="Next of Kin Name" placeholder="Full Name" />
                    <FormInput label="Next of Kin Phone" placeholder="+234..." />
                  </div>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="mt-12 pt-6 border-t border-zinc-100 flex justify-end">
             {activeSection !== 'employment' ? (
               <button 
                onClick={() => {
                   if(activeSection === 'personal') setActiveSection('professional');
                   if(activeSection === 'professional') setActiveSection('employment');
                }}
                className="flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-indigo-600 transition-colors"
               >
                 Next Step <ChevronRight size={16} />
               </button>
             ) : (
               <span className="text-xs font-bold text-emerald-600 flex items-center gap-2">
                 Onboarding Ready <ArrowRight size={14} />
               </span>
             )}
          </div>
        </main>
      </div>
    </div>
  );
}

// --- REUSABLE COMPONENTS (Modified for Teacher) ---

function NavItem({ label, description, active, onClick }: { label: string; description: string; active: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group border-l-2 ${
        active 
        ? "bg-white border-zinc-900 shadow-sm" 
        : "bg-transparent border-transparent hover:bg-zinc-100"
      }`}
    >
      <span className={`block text-sm font-bold ${active ? "text-zinc-900" : "text-zinc-500 group-hover:text-zinc-700"}`}>
        {label}
      </span>
      <span className="block text-[11px] text-zinc-400 mt-0.5 font-medium">
        {description}
      </span>
    </button>
  );
}

function SectionHeader({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-700 border border-zinc-200 shadow-sm shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-lg font-bold text-zinc-900 tracking-tight">{title}</h2>
        <p className="text-sm text-zinc-500">{subtitle}</p>
      </div>
    </div>
  );
}

function FormInput({ label, placeholder, type = "text", required, options }: { label: string, placeholder?: string, type?: string, required?: boolean, options?: string[] }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === "select" ? (
        <div className="relative">
          <select className="w-full bg-white border border-zinc-200 text-zinc-900 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all appearance-none font-medium">
            <option value="" disabled selected>Select {label}</option>
            {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <ChevronRight className="absolute right-3 top-3 text-zinc-400 rotate-90 pointer-events-none" size={14} />
        </div>
      ) : (
        <input 
          type={type} 
          placeholder={placeholder} 
          className="w-full bg-white border border-zinc-200 text-zinc-900 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-300 font-medium"
        />
      )}
    </div>
  );
}

function PhotoUploader({ label }: { label: string }) {
  return (
    <div>
      <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block">{label}</label>
      <div className="aspect-square bg-zinc-50 border border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:border-zinc-400 transition-all cursor-pointer group relative overflow-hidden">
         <Camera size={24} className="mb-2 group-hover:scale-110 transition-transform text-zinc-400 group-hover:text-zinc-600" />
         <span className="text-[10px] font-bold uppercase tracking-wide">Upload</span>
         <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
      </div>
    </div>
  );
}