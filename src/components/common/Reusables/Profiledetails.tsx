"use client";
import React, { Activity } from "react";
import { 
  User, MapPin, Shield, HeartPulse, 
  Briefcase, PenLine, Mail,
  BookOpen,
  Calendar,
  Heart,
  Phone,
  Target,
  Users,
  Hash
} from "lucide-react";
import { InfoCard, InfoRow } from "@/app/(admin)/(Students)/students/profile/[id]/page";

export default function ProfileDetails({ data :student}: { data: any }) {
  if (!student) return null;
  return (
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
                    Father&apos;s Information
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
                    Mother&apos;s Information
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

  );
}

// --- MINIMAL HELPERS ---

