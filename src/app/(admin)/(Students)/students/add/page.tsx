"use client";
import React, { useState } from "react";
import { 
  User, Shield, HeartPulse, MapPin, 
  Users, CheckCircle2, ArrowRight, Camera 
} from "lucide-react";

export default function RegisterStudent() {
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* --- TOP STICKY NAV --- */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
   <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
           Enroll System
          </h1>
          <p className="text-sm text-gray-500">
Register a student
          </p>
        </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900">Discard</button>
            <button className="px-6 py-2 bg-linear-to-br from-blue-700 via-blue-800 to-indigo-900 text-white text-sm font-bold  hover:bg-indigo-700 transition-all flex items-center gap-2">
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
          {
            activeSection==='personal' &&(
              <div>
                     {/* SECTION: PERSONAL */}
          <section id="personal" className="space-y-8">
            <SectionHeader icon={<User size={20}/>} title="Personal Details" subtitle="Full legal name and biological information." />
            
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="First Name" placeholder="John" required />
                <InputGroup label="Last Name" placeholder="Doe" required />
                <InputGroup label="Date of Birth" type="date" required />
                <InputGroup label="Gender" type="select" options={["Male", "Female"]} />
                <InputGroup label="Nationality" placeholder="Nigerian" />
                <InputGroup label="Religion" placeholder="Christianity" />
              </div>
              <div className="w-full md:w-40">
                <label className="text-[11px] font-bold text-zinc-400 uppercase mb-3 block">Photo</label>
                <div className="aspect-square bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-3xl flex flex-col items-center justify-center text-zinc-400 group hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer">
                  <Camera size={24} className="group-hover:text-indigo-600" />
                  <span className="text-[10px] mt-2 font-medium">Upload</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-zinc-50 rounded-3xl">
              <InputGroup label="Blood Group" placeholder="O+" />
              <InputGroup label="Genotype" placeholder="AA" />
              <InputGroup label="State of Origin" placeholder="Lagos" />
              <InputGroup label="LGA" placeholder="Ikeja" />
            </div>
          </section>
              </div>
            )
          }

          {
            activeSection==='guardian' && (
              <div>     {/* SECTION: GUARDIAN */}
          <section id="guardian" className="space-y-8">
            <SectionHeader icon={<Users size={20}/>} title="Guardian Units" subtitle="Contact information for parents or legal sponsors." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <h4 className="text-sm font-bold text-zinc-800">Father's Information</h4>
                  <InputGroup label="Full Name" placeholder="Mr. John Doe" />
                  <InputGroup label="Phone Number" placeholder="+234..." />
               </div>
               <div className="space-y-6">
                  <h4 className="text-sm font-bold text-zinc-800">Mother's Information</h4>
                  <InputGroup label="Full Name" placeholder="Mrs. Jane Doe" />
                  <InputGroup label="Phone Number" placeholder="+234..." />
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <InputGroup label="Guardian Occupation" placeholder="Software Engineer" />
               <InputGroup label="Guardian Email" placeholder="parents@example.com" />
            </div>
          </section>
                 
              </div>
            )
          }
       

  

     

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
        .minimal-area {
          width: 100%;
          padding: 1rem;
          background: #fbfbfb;
          border: 1px solid #f4f4f5;
          border-radius: 1rem;
          min-height: 100px;
          outline: none;
          font-size: 0.95rem;
        }
        .minimal-area:focus {
          border-color: #e2e2e7;
          background: white;
        }
      `}</style>
    </div>
  );
}

// --- REUSABLE ATOMS ---

function NavItem({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
        active ?  "bg-brand-50 text-white" : "text-zinc-500 hover:bg-zinc-50"
      }`}
    >
      {label}
    </button>
  );
}

function SectionHeader({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-900 border border-zinc-100">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-zinc-500">{subtitle}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder, type = "text", required, options }: { label: string, placeholder?: string, type?: string, required?: boolean, options?: string[] }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "select" ? (
        <select className="minimal-input appearance-none bg-none">
          {options?.map(opt => <option key={opt}>{opt}</option>)}
        </select>
      ) : (
        <input type={type} placeholder={placeholder} className="minimal-input" />
      )}
    </div>
  );
}