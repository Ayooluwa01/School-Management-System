"use client";

import React from "react";
import { useParams } from "next/navigation";
import { User, Calendar, Hash, MapPin, Phone, Loader2, AlertCircle } from "lucide-react";
import StudentProfileView from "@/components/common/Reusables/Studentprofile";
import { useStudent } from "../../../../../../../hooks/useSchool"; // Ensure this path is correct

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
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-gray-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Fetching Student Profile...</p>
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center text-center p-6 bg-gray-50">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-bold text-gray-800">Student Not Found</h2>
        <p className="text-gray-500">The record might have been moved or you don't have the required permissions.</p>
      </div>
    );
  }

  const fullName = `${student.surname || '' ||''}    ${student.first_name || ''} ${student.other_names || ""}`;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8 bg-gray-50/50 min-h-screen">
      
      {/* ===== HERO SECTION ===== */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
               <div className="h-36 w-36 rounded-3xl border-4 border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg">
                   <User size={64} className="text-white/80" />
               </div>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-4">
                <div>
                   <h1 className="text-4xl font-black tracking-tight uppercase leading-tight">{fullName}</h1>
                   <div className="flex items-center gap-2 mt-1">
                      <span className="bg-blue-600/30 text-blue-200 px-3 py-0.5 rounded-full text-xs font-bold border border-blue-500/30">
                        {student.class_name}
                      </span>
                      <span className="bg-indigo-600/30 text-indigo-200 px-3 py-0.5 rounded-full text-xs font-bold border border-indigo-500/30 uppercase">
                        {student.arm}
                      </span>
                   </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Badge icon={<Hash size={14}/>} text={student.admission_no} />
                    <Badge icon={<Calendar size={14}/>} text={student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : "N/A"} />
                    <Badge icon={<MapPin size={14}/>} text={student.state_of_origin} />
                </div>
            </div>
            
            <div className="hidden lg:flex flex-col justify-center items-end border-l border-white/10 pl-8 text-right">
                <span className="text-blue-300 text-[10px] font-black uppercase tracking-widest mb-1">Status</span>
                <span className="text-4xl font-black text-emerald-400 uppercase tracking-tighter">{student.status || 'Active'}</span>
                <div className="mt-4">
                   <a href={`tel:${student.fathers_number || student.mothers_number}`} className="flex items-center gap-2 text-[10px] font-black bg-white/10 hover:bg-white text-white hover:text-blue-950 px-4 py-2 rounded-xl transition-all uppercase tracking-widest">
                      <Phone size={12} /> Call Guardian
                   </a>
                </div>
            </div>
        </div>
      </div>

      <StudentProfileView 
         results={[]} 
         profileData={student}
         fees={mockFees}
         attendance={mockAttendance}
         remarks={mockRemarks}
      />

    </div>
  );
}

function Badge({ icon, text }: { icon: any, text: string }) {
    return (
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-medium backdrop-blur-sm">
            <span className="text-blue-400">{icon}</span>
            <span className="text-gray-200">{text || "N/A"}</span>
        </div>
    );
}