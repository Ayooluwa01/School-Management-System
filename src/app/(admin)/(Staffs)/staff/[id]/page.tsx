"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  User, Mail, Phone, MapPin, Briefcase, GraduationCap,
  Calendar, Award, BookOpen, Users, ChevronLeft,
  Clock, Hash, Shield, TrendingUp, FileText
} from "lucide-react";
import Link from "next/link";
import { useStaffs } from "../../../../../../hooks/useSchool";

interface StaffProfile {
  staff_id: string;
  staff_code: string;
  surname: string;
  first_name: string;
  other_names?: string;
  full_name: string;
  sex: string;
  date_of_birth: string;
  marital_status: string;
  address: string;
  phone: string;
  email: string;
  highest_qualification: string;
  years_of_experience: number;
  primary_subject?: string;
  secondary_subject?: string;
  role: string;
  date_of_appointment: string;
  employment_status: string;
  profile_pic?: string;
  teaching_assignments: any[];
  classes_managed: any[];
  workload_stats: {
    total_subjects: number;
    total_classes: number;
  };
}

const StaffProfilePage = () => {
  const params = useParams();
  const { useStaffProfile } = useStaffs();
  const { data: staff, isLoading: ProfileLoading } = useStaffProfile(
    params?.id as string
  );

  if (ProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Staff Not Found</h2>
          <p className="text-gray-600 mb-6">The staff member you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/staff" className="text-blue-600 font-semibold hover:underline">
            ← Back to Staff Directory
          </Link>
        </div>
      </div>
    );
  }

  const initials = `${staff.surname[0]}${staff.first_name[0]}`.toUpperCase();
  const avatarUrl = staff.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.full_name)}&background=3b82f6&color=fff&bold=true&size=200`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* BACK BUTTON */}
        <Link 
          href="/dashboard/staff" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to Staff Directory
        </Link>

        {/* HERO CARD */}
        <div className="bg-white rounded-3xl shadow-lg shadow-blue-100/50 overflow-hidden border border-gray-100/50 transition-shadow duration-300 hover:shadow-xl">
          {/* Header with subtle gradient and pattern */}
          <div className="h-28 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSAwIDQwIEwgNDAgMCBNMCAwIEw0MCA0MCBNNDAgMCBMMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjIiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-10" />
          </div>

          <div className="relative px-6 md:px-8 pb-8">
            {/* Avatar and Name Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-14">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-white p-1 shadow-xl shadow-blue-200/30 ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
                  {staff.profile_pic ? (
                    <img src={avatarUrl} alt={staff.full_name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{initials}</span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full border-3 border-white shadow-md flex items-center justify-center animate-pulse-slow">
                  <Shield size={14} className="text-white" />
                </div>
              </div>

              {/* Name & Title */}
              <div className="flex-1 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">
                  {staff.full_name}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold border border-blue-100/50 transition-colors duration-200 hover:bg-blue-100">
                    <Briefcase size={14} />
                    {staff.role}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border transition-colors duration-200
                    ${staff.employment_status === 'Permanent' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50 hover:bg-emerald-100' 
                      : staff.employment_status === 'Contract'
                      ? 'bg-blue-50 text-blue-600 border-blue-100/50 hover:bg-blue-100'
                      : 'bg-amber-50 text-amber-600 border-amber-100/50 hover:bg-amber-100'
                    }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    {staff.employment_status}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 group shadow-sm">
                  <Mail size={16} className="text-gray-600 group-hover:text-gray-900" />
                </button>
                <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 group shadow-sm">
                  <Phone size={16} className="text-gray-600 group-hover:text-gray-900" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <StatCard
                icon={Hash}
                label="Staff ID"
                value={staff.staff_code}
                color="blue"
              />
              <StatCard
                icon={BookOpen}
                label="Subjects"
                value={staff.workload_stats.total_subjects.toString()}
                color="purple"
              />
              <StatCard
                icon={Users}
                label="Classes"
                value={staff.workload_stats.total_classes.toString()}
                color="indigo"
              />
              <StatCard
                icon={TrendingUp}
                label="Experience"
                value={`${staff.years_of_experience} Yrs`}
                color="green"
              />
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN - Personal Info */}
          <div className="space-y-6">
            
            {/* Contact Information */}
            <InfoCard title="Contact Information" icon={Mail}>
              <InfoRow icon={Mail} label="Email" value={staff.email} />
              <InfoRow icon={Phone} label="Phone" value={staff.phone} />
              <InfoRow icon={MapPin} label="Address" value={staff.address} />
            </InfoCard>

            {/* Personal Details */}
            <InfoCard title="Personal Details" icon={User}>
              <InfoRow icon={User} label="Gender" value={staff.sex} />
              <InfoRow icon={Calendar} label="Date of Birth" value={new Date(staff.date_of_birth).toLocaleDateString()} />
              <InfoRow icon={Shield} label="Marital Status" value={staff.marital_status} />
            </InfoCard>

          </div>

          {/* RIGHT COLUMN - Professional Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Employment Details */}
            <InfoCard title="Employment Information" icon={Briefcase}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoRow icon={Hash} label="Staff Code" value={staff.staff_code} />
                <InfoRow icon={Briefcase} label="Role" value={staff.role} />
                <InfoRow icon={Calendar} label="Date Appointed" value={new Date(staff.date_of_appointment).toLocaleDateString()} />
                <InfoRow icon={Shield} label="Status" value={staff.employment_status} />
              </div>
            </InfoCard>

            {/* Academic Qualifications */}
            <InfoCard title="Academic & Experience" icon={GraduationCap}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoRow icon={Award} label="Qualification" value={staff.highest_qualification || 'Not specified'} />
                <InfoRow icon={Clock} label="Experience" value={`${staff.years_of_experience} Years`} />
                {staff.primary_subject && (
                  <InfoRow icon={BookOpen} label="Primary Subject" value={staff.primary_subject} />
                )}
                {staff.secondary_subject && (
                  <InfoRow icon={BookOpen} label="Secondary Subject" value={staff.secondary_subject} />
                )}
              </div>
            </InfoCard>

            {/* Teaching Assignments */}
            {staff.teaching_assignments.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100/50 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                    <BookOpen size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Teaching Assignments</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {staff.teaching_assignments.map((assignment: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200">
                      <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-purple-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{assignment.subject_name}</p>
                        <p className="text-xs text-gray-500">{assignment.subject_code}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Classes Managed */}
            {staff.classes_managed.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100/50 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                    <Users size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Classes Managed</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {staff.classes_managed.map((cls: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200">
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center shrink-0">
                        <Users size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{cls.class_name} - {cls.arm}</p>
                        <p className="text-xs text-gray-500">{cls.class_code}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Components
const StatCard = ({ icon: Icon, label, value, color }: any) => {
  const colors: any = {
    blue: "from-blue-400 to-blue-500",
    purple: "from-purple-400 to-purple-500",
    indigo: "from-indigo-400 to-indigo-500",
    green: "from-green-400 to-green-500",
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100/50 transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-md bg-gradient-to-br ${colors[color]} flex items-center justify-center shrink-0 shadow-md`}>
          <Icon size={16} className="text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{label}</p>
          <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, icon: Icon, children }: any) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100/50 shadow-sm transition-shadow duration-300 hover:shadow-md">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center shadow-md">
        <Icon size={18} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InfoRow = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center shrink-0 mt-0.5">
      <Icon size={14} className="text-gray-600" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900 break-words">{value || 'Not specified'}</p>
    </div>
  </div>
);

export default StaffProfilePage;