"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  User, Mail, Phone, MapPin, Briefcase, GraduationCap,
  Calendar, Award, BookOpen, Users, ChevronLeft,
  Clock, Hash, Shield, TrendingUp, FileText, Star,
  Target, Activity, CheckCircle2, Sparkles, Building2
} from "lucide-react";
import Link from "next/link";
import { useStaffs } from "../../../../../../hooks/useSchool";

interface TeachingAssignment {
  class_subject_id: number;
  class_id: number;
  subject_id: number;
  subject_name: string;
  subject_code: string;
  is_core: boolean;
  subject_category?: string;
  class_name: string;
  arm: string;
  class_code: string;
}

interface Subject {
  subject_id: number;
  subject_name: string;
  subject_code: string;
  is_core: boolean;
  subject_category?: string;
}

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
  teaching_assignments: TeachingAssignment[];
  subjects_taught: Subject[];
  classes_managed: any[];
  workload_stats: {
    total_subjects: number;
    total_classes_taught: number;
    total_classes_managed: number;
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-3 border-purple-200 border-b-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900 mb-1">Loading Profile</p>
            <p className="text-xs text-slate-600">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-12 max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Staff Not Found</h2>
          <p className="text-sm text-slate-600 mb-6">The staff member you're looking for doesn't exist.</p>
          <Link 
            href="/dashboard/staff" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <ChevronLeft size={16} />
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const initials = `${staff.surname[0]}${staff.first_name[0]}`.toUpperCase();
  const avatarUrl = staff.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.full_name)}&background=4f46e5&color=fff&bold=true&size=256`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mb-8">
          {/* Header Gradient */}
          <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
            {/* Decorative patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48" />
            </div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
            
            {/* Top right badge */}
            <div className="absolute top-6 right-6">
              <div className="px-3 py-1.5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-lg">
                <Sparkles size={12} />
                Verified
              </div>
            </div>
          </div>

          <div className="px-8 pb-8">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-24 mb-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-xl shadow-blue-500/20 ring-4 ring-white">
                  <div className="w-full h-full rounded-[20px] overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
                    {staff.profile_pic ? (
                      <img src={avatarUrl} alt={staff.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{initials}</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Status Indicator */}
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg shadow-green-500/30 flex items-center justify-center border-4 border-white">
                  <CheckCircle2 size={18} className="text-white" />
                </div>
              </div>

              {/* Name & Info */}
              <div className="flex-1 z-10">
                <h1 className="text-2xl font-semibold text-slate-900 md:text-white  md:text-3xl mb-2 tracking-tight">
                  {staff.surname.toUpperCase()}  {staff.first_name.toUpperCase()}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-blue-700">
                    <Briefcase size={12} />
                    {staff.role}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium
                    ${staff.employment_status === 'Permanent' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : staff.employment_status === 'Contract'
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}>
                    <Activity size={12} />
                    {staff.employment_status}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button className="w-12 h-12 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl flex items-center justify-center transition-all group">
                  <Mail size={18} className="text-blue-600" />
                </button>
                <button className="w-12 h-12 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl flex items-center justify-center transition-all group">
                  <Phone size={18} className="text-indigo-600" />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                icon={Hash}
                label="Staff ID"
                value={staff.staff_code}
                gradient="from-blue-500 to-cyan-500"
                bgColor="bg-blue-50"
                borderColor="border-blue-200"
              />
              <StatCard
                icon={BookOpen}
                label="Subjects"
                value={'32'}
                gradient="from-purple-500 to-pink-500"
                bgColor="bg-purple-50"
                borderColor="border-purple-200"
              />
              <StatCard
                icon={Users}
                label="Classes Taught"
                value={'22'}
                gradient="from-indigo-500 to-blue-500"
                bgColor="bg-indigo-50"
                borderColor="border-indigo-200"
              />
              <StatCard
                icon={TrendingUp}
                label="Experience"
                value={`${staff.years_of_experience} Yrs`}
                gradient="from-emerald-500 to-teal-500"
                bgColor="bg-emerald-50"
                borderColor="border-emerald-200"
              />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="space-y-6">
            
            {/* Contact Information */}
            <InfoCard title="Contact Information" icon={Mail} iconColor="text-blue-600" bgColor="bg-blue-50" borderColor="border-blue-200">
              <div className="space-y-4">
                <InfoRow icon={Mail} label="Email" value={staff.email} iconColor="text-blue-600" />
                <InfoRow icon={Phone} label="Phone" value={staff.phone} iconColor="text-indigo-600" />
                <InfoRow icon={MapPin} label="Address" value={staff.address} iconColor="text-purple-600" />
              </div>
            </InfoCard>

            {/* Personal Details */}
            <InfoCard title="Personal Details" icon={User} iconColor="text-indigo-600" bgColor="bg-indigo-50" borderColor="border-indigo-200">
              <div className="space-y-4">
                <InfoRow icon={User} label="Gender" value={staff.sex} iconColor="text-indigo-600" />
                <InfoRow icon={Calendar} label="Date of Birth" value={new Date(staff.date_of_birth).toLocaleDateString()} iconColor="text-blue-600" />
                <InfoRow icon={Shield} label="Marital Status" value={staff.marital_status} iconColor="text-purple-600" />
              </div>
            </InfoCard>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Employment Details */}
            <InfoCard title="Employment Information" icon={Briefcase} iconColor="text-purple-600" bgColor="bg-purple-50" borderColor="border-purple-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow icon={Hash} label="Staff Code" value={staff.staff_code} iconColor="text-blue-600" />
                <InfoRow icon={Briefcase} label="Role" value={staff.role} iconColor="text-indigo-600" />
                <InfoRow icon={Calendar} label="Date Appointed" value={new Date(staff.date_of_appointment).toLocaleDateString()} iconColor="text-purple-600" />
                <InfoRow icon={Activity} label="Status" value={staff.employment_status} iconColor="text-emerald-600" />
              </div>
            </InfoCard>

            {/* Academic Qualifications */}
            <InfoCard title="Academic & Experience" icon={GraduationCap} iconColor="text-emerald-600" bgColor="bg-emerald-50" borderColor="border-emerald-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow icon={Award} label="Qualification" value={staff.highest_qualification || 'Not specified'} iconColor="text-emerald-600" />
                <InfoRow icon={Clock} label="Experience" value={`${staff.years_of_experience} Years`} iconColor="text-teal-600" />
                {staff.primary_subject && (
                  <InfoRow icon={BookOpen} label="Primary Subject" value={staff.primary_subject} iconColor="text-blue-600" />
                )}
                {staff.secondary_subject && (
                  <InfoRow icon={BookOpen} label="Secondary Subject" value={staff.secondary_subject} iconColor="text-indigo-600" />
                )}
              </div>
            </InfoCard>

            {/* Teaching Assignments */}
            {staff.teaching_assignments && staff.teaching_assignments.length > 0 && (
              <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 border border-slate-200 p-5">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/30">
                    <BookOpen size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Teaching Assignments</h3>
                    <p className="text-xs text-slate-600">Classes and Subjects</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {staff.teaching_assignments.map((assignment: TeachingAssignment, idx: number) => (
                    <div 
                      key={idx} 
                      className="group bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3.5 hover:shadow-md hover:shadow-purple-200/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-purple-200 transition-colors">
                          <FileText size={16} className="text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm mb-1.5">{assignment.subject_name}</p>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-[10px] text-purple-700 font-medium bg-purple-100 px-2 py-0.5 rounded">
                              {assignment.subject_code}
                            </span>
                            {assignment.is_core && (
                              <span className="text-[10px] text-emerald-700 font-medium bg-emerald-100 px-2 py-0.5 rounded">
                                CORE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 flex items-center gap-1">
                            <Users size={10} />
                            {assignment.class_name} - {assignment.arm}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subjects Overview */}
            {staff.subjects_taught && staff.subjects_taught.length > 0 && (
              <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 border border-slate-200 p-5">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md shadow-orange-500/30">
                    <Star size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Subjects Overview</h3>
                    <p className="text-xs text-slate-600">All subjects taught across classes</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {staff.subjects_taught.map((subject: Subject, idx: number) => (
                    <div 
                      key={idx} 
                      className="inline-flex items-center gap-2.5 px-3.5 py-2.5 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <Award size={13} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{subject.subject_name}</p>
                        <p className="text-xs text-slate-600">{subject.subject_code}</p>
                      </div>
                      {subject.is_core && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                          Core
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Classes Managed */}
            {staff.classes_managed && staff.classes_managed.length > 0 && (
              <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 border border-slate-200 p-5">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md shadow-cyan-500/30">
                    <Users size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Classes Managed</h3>
                    <p className="text-xs text-slate-600">Form teacher responsibilities</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {staff.classes_managed.map((cls: any, idx: number) => (
                    <div 
                      key={idx} 
                      className="group bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-3.5 hover:shadow-md hover:shadow-cyan-200/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-cyan-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-cyan-200 transition-colors">
                          <Target size={16} className="text-cyan-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{cls.class_name} - {cls.arm}</p>
                          <p className="text-xs text-slate-600">{cls.class_code}</p>
                        </div>
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
const StatCard = ({ icon: Icon, label, value, gradient, bgColor, borderColor }: any) => (
  <div className={`${bgColor} border ${borderColor} rounded-xl p-3.5 hover:shadow-md transition-all group cursor-pointer`}>
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
        <Icon size={18} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-medium text-slate-600 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-base font-semibold text-slate-900 truncate">{value}</p>
      </div>
    </div>
  </div>
);

const InfoCard = ({ title, icon: Icon, iconColor, bgColor, borderColor, children }: any) => (
  <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 border border-slate-200 p-5">
    <div className="flex items-center gap-2.5 mb-5">
      <div className={`w-10 h-10 ${bgColor} border ${borderColor} rounded-lg flex items-center justify-center`}>
        <Icon size={18} className={iconColor} />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    </div>
    {children}
  </div>
);

const InfoRow = ({ icon: Icon, label, value, iconColor }: any) => (
  <div className="flex items-start gap-2.5 group">
    <div className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-slate-100 transition-colors">
      <Icon size={13} className={iconColor} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-900 break-words">{value || 'Not specified'}</p>
    </div>
  </div>
);

export default StaffProfilePage;