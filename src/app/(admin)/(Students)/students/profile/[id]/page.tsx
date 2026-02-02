"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  User, Calendar, Hash, MapPin, Phone, Loader2, AlertCircle, Mail,
  Users, BookOpen, ChevronLeft, Heart, Shield, Activity, CheckCircle2,
  Sparkles, Award, TrendingUp, Target
} from "lucide-react";
import Link from "next/link";
import StudentProfileView from "@/components/common/Reusables/Studentprofile";
import { useStudent } from "../../../../../../../hooks/useSchool";

export default function StudentProfile() {
  const params = useParams();
  const id = params.id as string;
  const { getStudentProfile } = useStudent(0, {}, id);
  
  const { data: student, isLoading, isError } = getStudentProfile;

  const mockFees = [
    { id: 1, title: "1st Term Tuition", amount: 1500, paid: 1500, status: "paid" as const, date: "2024-09-01" },
    { id: 3, title: "2nd Term Tuition", amount: 1500, paid: 250, status: "partial" as const, date: "2025-01-05" },
  ];

  const mockAttendance = {
    total_days: 120, present: 112, absent: 5, late: 3,
    history: [{ date: "2025-01-20", status: "present" as const }]
  };

  const mockRemarks = [
    { id: 1, teacher: "Mr. Johnson", role: "Class Teacher", date: "Dec 15, 2024", sentiment: "positive" as const, comment: "Excellent participation." },
  ];

  if (isLoading) {
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

  if (isError || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-12 max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Student Not Found</h2>
          <p className="text-sm text-slate-600 mb-6">The student you're looking for doesn't exist.</p>
          <Link 
            href="/dashboard/students" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <ChevronLeft size={16} />
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `${student.surname || ''} ${student.first_name || ''} ${student.other_names || ""}`.trim();
  const initials = `${student.surname?.[0] || ''}${student.first_name?.[0] || ''}`.toUpperCase();
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=4f46e5&color=fff&bold=true&size=256`;

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
                Active Student
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
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">{initials}</span>
                    </div>
                  </div>
                </div>
                {/* Status Indicator */}
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg shadow-green-500/30 flex items-center justify-center border-4 border-white">
                  <CheckCircle2 size={18} className="text-white" />
                </div>
              </div>

              {/* Name & Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-slate-900 mb-2 tracking-tight">
                  {fullName}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-blue-700">
                    <BookOpen size={12} />
                    {student.class_name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-xs font-medium text-indigo-700">
                    <Users size={12} />
                    {student.arm}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium
                    ${student.status === 'ACTIVE' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}>
                    <Activity size={12} />
                    {student.status || 'Active'}
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
                label="Admission No"
                value={student.admission_no}
                gradient="from-blue-500 to-cyan-500"
                bgColor="bg-blue-50"
                borderColor="border-blue-200"
              />
              <StatCard
                icon={Calendar}
                label="Date of Birth"
                value={student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                gradient="from-purple-500 to-pink-500"
                bgColor="bg-purple-50"
                borderColor="border-purple-200"
              />
              <StatCard
                icon={MapPin}
                label="State"
                value={student.state_of_origin || 'N/A'}
                gradient="from-indigo-500 to-blue-500"
                bgColor="bg-indigo-50"
                borderColor="border-indigo-200"
              />
              <StatCard
                icon={Heart}
                label="Blood Group"
                value={student.blood_group || 'N/A'}
                gradient="from-red-500 to-rose-500"
                bgColor="bg-red-50"
                borderColor="border-red-200"
              />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="space-y-6">
            
            {/* Personal Information */}
            <InfoCard title="Personal Information" icon={User} iconColor="text-blue-600" bgColor="bg-blue-50" borderColor="border-blue-200">
              <div className="space-y-4">
                <InfoRow icon={User} label="Gender" value={student.gender} iconColor="text-blue-600" />
                <InfoRow icon={Calendar} label="Date of Birth" value={student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : 'N/A'} iconColor="text-indigo-600" />
                <InfoRow icon={Shield} label="Religion" value={student.religion || 'N/A'} iconColor="text-purple-600" />
                <InfoRow icon={MapPin} label="Nationality" value={student.nationality || 'N/A'} iconColor="text-cyan-600" />
              </div>
            </InfoCard>

            {/* Medical Information */}
            <InfoCard title="Medical Information" icon={Heart} iconColor="text-red-600" bgColor="bg-red-50" borderColor="border-red-200">
              <div className="space-y-4">
                <InfoRow icon={Activity} label="Blood Group" value={student.blood_group || 'N/A'} iconColor="text-red-600" />
                <InfoRow icon={Target} label="Genotype" value={student.genotype || 'N/A'} iconColor="text-rose-600" />
              </div>
            </InfoCard>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Academic Information */}
            <InfoCard title="Academic Information" icon={BookOpen} iconColor="text-purple-600" bgColor="bg-purple-50" borderColor="border-purple-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow icon={Hash} label="Admission No" value={student.admission_no} iconColor="text-blue-600" />
                <InfoRow icon={BookOpen} label="Class" value={`${student.class_name} - ${student.arm}`} iconColor="text-indigo-600" />
                <InfoRow icon={Activity} label="Status" value={student.status || 'Active'} iconColor="text-emerald-600" />
              </div>
            </InfoCard>

            {/* Origin & Location */}
            <InfoCard title="Origin & Location" icon={MapPin} iconColor="text-emerald-600" bgColor="bg-emerald-50" borderColor="border-emerald-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow icon={MapPin} label="State of Origin" value={student.state_of_origin || 'N/A'} iconColor="text-emerald-600" />
                <InfoRow icon={Target} label="LGA" value={student.lga || 'N/A'} iconColor="text-teal-600" />
              </div>
              <div className="mt-4">
                <InfoRow icon={MapPin} label="Address" value={student.address || 'N/A'} iconColor="text-cyan-600" />
              </div>
            </InfoCard>

            {/* Guardian Information */}
            <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 border border-slate-200 p-5">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md shadow-orange-500/30">
                  <Users size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Guardian Information</h3>
                  <p className="text-xs text-slate-600">Parent/Guardian contacts</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Father's Info */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs font-medium text-blue-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <User size={12} />
                    Father's Information
                  </p>
                  <div className="space-y-3">
                    <InfoRow icon={User} label="Name" value={student.fathers_name || 'N/A'} iconColor="text-blue-600" />
                    <InfoRow icon={Phone} label="Phone" value={student.fathers_number || 'N/A'} iconColor="text-indigo-600" />
                  </div>
                </div>

                {/* Mother's Info */}
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-lg p-4">
                  <p className="text-xs font-medium text-pink-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <User size={12} />
                    Mother's Information
                  </p>
                  <div className="space-y-3">
                    <InfoRow icon={User} label="Name" value={student.mothers_name || 'N/A'} iconColor="text-pink-600" />
                    <InfoRow icon={Phone} label="Phone" value={student.mothers_number || 'N/A'} iconColor="text-rose-600" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Student Profile View Component */}
        <div className="mt-8">
          <StudentProfileView 
            results={[]} 
            profileData={student}
            fees={mockFees}
            attendance={mockAttendance}
            remarks={mockRemarks}
          />
        </div>

      </div>
    </div>
  );
}

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