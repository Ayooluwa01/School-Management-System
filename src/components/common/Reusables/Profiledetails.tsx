"use client";
import React from "react";
import { 
  User, MapPin, Shield, HeartPulse, 
  Briefcase, PenLine, Mail 
} from "lucide-react";

export default function ProfileDetails({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div className="space-y-8 py-4 ">
      
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
        <div>
          <h2 className="text-xl font-medium">Student Profile</h2>
          <p className="text-sm text-zinc-500">Comprehensive record and background details</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-zinc-600 border border-zinc-200 px-4 py-2 rounded-lg hover:bg-zinc-50 transition-colors">
          <PenLine size={14} /> 
          <span>Edit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
        
        {/* PERSONAL INFO */}
        <Section title="Identity" icon={<User size={16} />}>
           <div className="grid grid-cols-2 gap-y-6">
              <InfoItem label="Date of Birth" value={data.student.dob} />
              <InfoItem label="Gender" value={data.student.gender} />
              <InfoItem label="Nationality" value={data.student.nationality} />
              <InfoItem label="State of Origin" value={data.student.state_of_origin} />
              <InfoItem label="LGA" value={data.student.lga} />
              <InfoItem label="Religion" value={data.student.religion} />
           </div>
        </Section>

        {/* CONTACT INFO */}
        <Section title="Reach" icon={<MapPin size={16} />}>
           <div className="space-y-6">
              <InfoItem label="Address" value={data.contact.address} />
              <div className="grid grid-cols-2">
                <InfoItem label="City" value={data.contact.city} />
                <InfoItem label="Phone" value={data.contact.phone} />
              </div>
              <InfoItem label="Email" value={data.contact.email} icon={<Mail size={12}/>} />
           </div>
        </Section>

        {/* GUARDIAN INFO */}
        <Section title="Family" icon={<Shield size={16} />}>
           <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Father" value={data.guardian.father_name} />
                  <InfoItem label="Phone" value={data.guardian.father_phone} isAccent />
              </div>
              <div className="h-px bg-zinc-50" />
              <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Mother" value={data.guardian.mother_name} />
                  <InfoItem label="Phone" value={data.guardian.mother_phone} isAccent />
              </div>
              <div className="grid grid-cols-2">
                 <InfoItem label="Occupation" value={data.guardian.occupation} icon={<Briefcase size={12}/>} />
                 <InfoItem label="Email" value={data.guardian.email} />
              </div>
           </div>
        </Section>

        {/* MEDICAL INFO */}
        <Section title="Health" icon={<HeartPulse size={16} />}>
           <div className="grid grid-cols-2 gap-y-6">
              <InfoItem label="Blood Group" value={data.medical.blood_group} />
              <InfoItem label="Genotype" value={data.student.genotype} />
              <div className="col-span-2">
                 <InfoItem label="Allergies" value={data.medical.allergies} />
              </div>
              <div className="col-span-2">
                 <InfoItem label="Conditions" value={data.medical.disabilities} />
              </div>
           </div>
        </Section>

      </div>
    </div>
  );
}

// --- MINIMAL HELPERS ---

function Section({ title, icon, children }: { title: string, icon: any, children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6 text-zinc-400">
        {icon}
        <h3 className=" font-bold uppercase tracking-[0.15em]">{title}</h3>
      </div>
      <div className="pl-6 border-l border-zinc-100">
        {children}
      </div>
    </div>
  );
}

function InfoItem({ label, value, isAccent, icon }: { label: string, value: string, isAccent?: boolean, icon?: any }) {
  return (
    <div>
      <span className="text-[12px] font-medium text-zinc-400 mb-1 flex items-center gap-1 uppercase tracking-wider">
        {icon} {label}
      </span>
      <p className={`text-[13px] ${isAccent ? "text-indigo-600 font-medium" : "text-zinc-700 font-normal"}`}>
        {value || "—"}
      </p>
    </div>
  );
}