"use client";
import React, { useMemo, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  User, Hash, Briefcase, MapPin, Mail, 
  GraduationCap, Loader2, ShieldCheck, ChevronLeft 
} from "lucide-react";
import Link from "next/link";
import TeacherProfileView from "@/components/common/Reusables/Teacherprofile";
import api from "../../../../../../libs/axios";

// --- MEMOIZED BADGE COMPONENT ---
const Badge = React.memo(({ icon: Icon, text }: { icon: any, text: string }) => (
  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-zinc-300">
    <Icon size={14} className="text-zinc-400" />
    <span>{text}</span>
  </div>
));
Badge.displayName = "Badge";

const StaffProfile = () => {
  const params = useParams();
  const [staff, setStaff] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await api.get(`/staffs/${params.id}`);
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchStaffData();
  }, [params.id]);

  const profileData = useMemo(() => {
    if (!staff) return null;
    return {
      personal: {
        dob: staff.date_of_birth,
        gender: staff.sex,
        nationality: "Nigerian",
        marital_status: staff.marital_status || "Not Specified",
      },
      contact: {
        address: staff.address,
        email: staff.email,
        phone: staff.phone,
      },
      professional: {
        qualifications: staff.highest_qualification,
        experience: `${staff.years_of_experience} Years`,
        subjects: [staff.primary_subject, staff.secondary_subject].filter(Boolean),
      },
      employment: {
        employee_id: staff.staff_no,
        date_joined: staff.date_of_appointment,
        status: staff.employment_status || "Active",
        role: staff.role,
      }
    };
  }, [staff]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-zinc-300" size={40} />
    </div>
  );

  if (!staff) return <div className="p-20 text-center">Staff member not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-white min-h-screen antialiased">
      
      {/* BACK BUTTON */}
      <Link href="/dashboard/staff" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-zinc-900 transition-colors">
        <ChevronLeft size={16} /> Back to Directory
      </Link>

      {/* ===== MINIMALIST HERO ===== */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-950 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar */}
            <div className="h-32 w-32 rounded-[2rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner shrink-0 overflow-hidden">
                {staff.profile_pic ? (
                  <img src={staff.profile_pic} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-zinc-700" />
                )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                   <div className="flex items-center justify-center md:justify-start gap-3">
                      <h1 className="text-3xl font-extrabold tracking-tight italic">{staff.name}</h1>
                      <ShieldCheck size={20} className="text-indigo-400" />
                   </div>
                   <p className="text-zinc-400 font-bold flex items-center justify-center md:justify-start gap-2 mt-2 uppercase text-[11px] tracking-widest">
                     <Briefcase size={14} /> {staff.role}
                   </p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge icon={Hash} text={staff.staff_no} />
                    <Badge icon={MapPin} text="Campus Office" />
                    <Badge icon={GraduationCap} text={staff.highest_qualification?.split(' ')[0] || "Staff"} />
                </div>
            </div>
            
            {/* Action/Status */}
            <div className="hidden lg:flex flex-col items-end justify-center pl-10 border-l border-white/10">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</span>
                <span className="text-lg font-bold text-emerald-400 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  {staff.employment_status}
                </span>
                <button className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-2xl transition-all shadow-xl shadow-white/5">
                   <Mail size={14} /> Contact
                </button>
            </div>
        </div>
      </div>

      {/* Main Content View (Stats, Payroll, Experience) */}
      <TeacherProfileView 
         workload={[]} 
         profileData={profileData}
         payroll={[]} // You can fetch this from a /staffs/:id/payroll endpoint later
         attendance={{ total_days: 100, present: 98, absent: 2, late: 0, history: [] }}
         appraisals={[]}
      />
    </div>
  );
};

export default React.memo(StaffProfile);