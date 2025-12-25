"use client";
import React from "react";
import { 
  User, MapPin, Briefcase, GraduationCap, 
  Mail, CalendarDays, BadgeCheck, BookOpen, 
  CreditCard, ClipboardCheck, History 
} from "lucide-react";

export default function TeacherProfileView({ 
  profileData, 
  workload, 
  payroll, 
  attendance, 
  appraisals 
}: { 
  profileData: any; 
  workload: any[]; 
  payroll: any[]; 
  attendance: any; 
  appraisals: any[]; 
}) {
  if (!profileData) return null;

  return (
    <div className="space-y-10">
      
      {/* 1. TOP ROW: IDENTITY & REACH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Identity" icon={<User size={18} />}>
           <div className="grid grid-cols-2 gap-y-6">
              <InfoItem label="Date of Birth" value={profileData.personal.dob} />
              <InfoItem label="Gender" value={profileData.personal.gender} />
              <InfoItem label="Nationality" value={profileData.personal.nationality} />
              <InfoItem label="State of Origin" value={profileData.personal.state_of_origin} />
              <InfoItem label="Marital Status" value={profileData.personal.marital_status} />
              <InfoItem label="Religion" value={profileData.personal.religion} />
           </div>
        </Section>

        <Section title="Reach" icon={<MapPin size={18} />}>
           <div className="space-y-6">
              <InfoItem label="Residential Address" value={profileData.contact.address} />
              <div className="grid grid-cols-2">
                <InfoItem label="City" value={profileData.contact.city} />
                <InfoItem label="Phone Number" value={profileData.contact.phone} isAccent />
              </div>
              <InfoItem label="Email Address" value={profileData.contact.email} icon={<Mail size={12}/>} />
           </div>
        </Section>
      </div>

      {/* 2. PROFESSIONAL PORTFOLIO & WORKLOAD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Professional Portfolio" icon={<GraduationCap size={18} />}>
           <div className="space-y-6">
              <InfoItem label="Qualifications" value={profileData.professional.qualifications} />
              <InfoItem label="Total Experience" value={profileData.professional.experience} />
              
              <div className="pt-4 border-t border-zinc-100">
                <span className="text-[10px] font-bold text-zinc-400 mb-3 block uppercase tracking-wider">Teaching Load</span>
                <div className="flex flex-wrap gap-2">
                  {profileData.professional.subjects?.map((sub: string) => (
                    <span key={sub} className="text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
           </div>
        </Section>

        <Section title="Workload (Classes)" icon={<BookOpen size={18} />}>
           <div className="space-y-3">
              {profileData.professional.classes_assigned?.map((cls: string, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                   <span className="text-sm font-medium text-zinc-700">{cls}</span>
                   <span className="text-[10px] font-bold text-zinc-400 uppercase">Primary Instructor</span>
                </div>
              ))}
              {(!profileData.professional.classes_assigned || profileData.professional.classes_assigned.length === 0) && (
                <p className="text-sm text-zinc-400 italic">No classes assigned for this session.</p>
              )}
           </div>
        </Section>
      </div>

      {/* 3. EMPLOYMENT & PAYROLL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Section title="Employment Details" icon={<Briefcase size={18} />}>
               <div className="grid grid-cols-2 gap-y-6">
                  <InfoItem label="Staff ID" value={profileData.employment.employee_id} />
                  <InfoItem label="Date Joined" value={profileData.employment.date_joined} icon={<CalendarDays size={12}/>} />
                  <InfoItem label="Current Role" value={profileData.employment.role} />
                  <div>
                     <span className="text-[10px] font-bold text-zinc-400 mb-1 block uppercase tracking-wider">Status</span>
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                        profileData.employment.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-zinc-100 text-zinc-500"
                     }`}>
                        <BadgeCheck size={12} /> {profileData.employment.status}
                     </span>
                  </div>
                  <div className="col-span-2 pt-4 border-t border-zinc-100">
                     <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="Next of Kin" value={profileData.employment.next_of_kin} />
                        <InfoItem label="Emergency Phone" value={profileData.employment.next_of_kin_phone} isAccent />
                     </div>
                  </div>
               </div>
            </Section>
        </div>

        <Section title="Recent Payroll" icon={<CreditCard size={18} />}>
           <div className="space-y-4">
              {payroll.map((pay) => (
                <div key={pay.id} className="flex flex-col gap-1 border-b border-zinc-50 pb-3 last:border-0">
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-zinc-800">{pay.month}</span>
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">{pay.status}</span>
                   </div>
                   <span className="text-xs text-zinc-500">Paid on {pay.date}</span>
                </div>
              ))}
           </div>
        </Section>
      </div>

      {/* 4. PERFORMANCE APPRAISALS */}
      <Section title="Performance Reviews" icon={<ClipboardCheck size={18} />}>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appraisals.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-3">
                 <div className="flex justify-between items-start">
                    <div>
                       <h4 className="text-sm font-bold text-zinc-900">{rev.evaluator}</h4>
                       <p className="text-[11px] text-zinc-400 uppercase font-medium">{rev.role} • {rev.date}</p>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${rev.sentiment === 'positive' ? 'bg-emerald-400' : 'bg-zinc-300'}`} />
                 </div>
                 <p className="text-sm text-zinc-600 leading-relaxed italic">&rdquo;{rev.comment}&rdquo;</p>
              </div>
            ))}
         </div>
      </Section>

    </div>
  );
}

// --- SHARED UI ATOMS ---

function Section({ title, icon, children }: { title: string, icon: any, children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-[1.5rem] border border-zinc-200 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-zinc-50 rounded-lg text-zinc-400 border border-zinc-100">{icon}</div>
        <h3 className="font-bold uppercase tracking-[0.1em] text-xs text-zinc-800">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

function InfoItem({ label, value, isAccent, icon }: { label: string, value: string, isAccent?: boolean, icon?: any }) {
  return (
    <div>
      <span className="text-[10px] font-bold text-zinc-400 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
        {icon} {label}
      </span>
      <p className={`text-[13px] leading-relaxed ${isAccent ? "text-indigo-600 font-bold" : "text-zinc-700 font-medium"}`}>
        {value || "—"}
      </p>
    </div>
  );
}