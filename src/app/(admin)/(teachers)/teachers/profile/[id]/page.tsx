"use client";
import React, { useMemo } from "react";
import { 
  User, Calendar, Hash, Briefcase, 
  MapPin, Mail, GraduationCap, Phone 
} from "lucide-react";
import TeacherProfileView from "@/components/common/Reusables/Teacherprofile";

// --- CONSTANT MOCK DATA (Outside component to prevent re-allocation) ---
const MOCK_TEACHER = {
  name: "Dr. Alexander Marcus",
  designation: "Senior Lead Instructor",
  employee_no: "STF-2024-0012",
  department: "Mathematical Sciences",
  date_of_birth: "14th Oct, 1982",
  sex: "Male"
};

const MOCK_PAYROLL = [
  { id: 1, month: "Dec 2024", base: 3500, allowance: 500, status: "paid", date: "2024-12-24" },
  { id: 2, month: "Nov 2024", base: 3500, allowance: 500, status: "paid", date: "2024-11-25" },
];

const MOCK_APPRAISALS = [
  { id: 1, evaluator: "Prof. Sarah", role: "Principal", date: "Dec 2024", sentiment: "positive", comment: "Exceptional curriculum development skills." },
];

// --- MEMOIZED BADGE COMPONENT ---
const Badge = React.memo(({ icon: Icon, text }: { icon: any, text: string }) => (
  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-zinc-300">
    <Icon size={14} className="text-zinc-400" />
    <span>{text}</span>
  </div>
));
Badge.displayName = "Badge";

const TeacherProfile = () => {
  // Memoize the profile structure to prevent re-renders unless source data changes
  const profileData = useMemo(() => ({
    personal: {
      dob: MOCK_TEACHER.date_of_birth,
      gender: MOCK_TEACHER.sex,
      nationality: "Nigerian",
      state_of_origin: "Lagos",
      marital_status: "Married",
      religion: "None",
    },
    contact: {
      address: "88, Victoria Island Close",
      city: "Lagos",
      email: "a.marcus@academy.edu",
      phone: "+234 800 123 4567",
    },
    professional: {
      qualifications: "PhD Mathematics, M.Sc Applied Physics",
      experience: "15 Years",
      subjects: ["Advanced Calculus", "Quantum Mechanics"],
      classes_assigned: ["SSS 3A", "SSS 3B"],
    },
    employment: {
      employee_id: MOCK_TEACHER.employee_no,
      date_joined: "2015-08-10",
      status: "Active",
      role: MOCK_TEACHER.designation,
      next_of_kin: "Juliet Marcus",
      next_of_kin_phone: "08011112222",
    }
  }), []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-white min-h-screen">
      
      {/* ===== MINIMALIST HERO ===== */}
      <div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 p-8 md:p-12 text-white shadow-2xl">
        {/* Subtle Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar */}
            <div className="h-32 w-32 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner shrink-0">
                <User size={48} className="text-zinc-600" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                   <h1 className="text-3xl font-bold tracking-tight">{MOCK_TEACHER.name}</h1>
                   <p className="text-zinc-400 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                     <Briefcase size={16} /> {MOCK_TEACHER.designation} — {MOCK_TEACHER.department}
                   </p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge icon={Hash} text={MOCK_TEACHER.employee_no} />
                    <Badge icon={GraduationCap} text="Doctorate" />
                    <Badge icon={MapPin} text="Lagos, NG" />
                </div>
            </div>
            
            {/* Action/Status */}
            <div className="hidden lg:flex flex-col items-end justify-center pl-8 border-l border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Account Status</span>
                <span className="text-xl font-bold text-emerald-500">Verified</span>
                <button className="mt-4 flex items-center gap-2 text-xs bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-xl border border-zinc-800 transition-colors">
                   <Mail size={14} /> Message Staff
                </button>
            </div>
        </div>
      </div>

      {/* Main Content View */}
      <TeacherProfileView 
         workload={[]} // Empty array for now as you aren't using APIs
         profileData={profileData}
         payroll={MOCK_PAYROLL}
         attendance={{ total_days: 100, present: 98, absent: 2, late: 0, history: [] }}
         appraisals={MOCK_APPRAISALS}
      />

    </div>
  );
};

export default React.memo(TeacherProfile);