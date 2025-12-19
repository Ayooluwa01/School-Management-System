import React from "react";
import { Fetch } from '../../../../../../../libs/api';
import { 
  User, 
  Calendar, 
  Hash, 
  GraduationCap, 
  Award, 
  BookOpen,
  Mail,
  ArrowUpRight,
  Info
} from "lucide-react";
import ComponentCard from "@/components/common/ComponentCard";
export interface Student {
  student_id: number;
  admission_no: string;
  name: string;
  sex: string;
  date_of_birth: string;
  class_id: number;
}

interface ClassRoom {
  class_id: number;
  class_name: string;
  arm: string;
  class_code: string;
  classroom_staff_id: number;
}

interface Result {
  result_id: number;
  subject_id: number;
  term: string;
  test1: number;
  test2: number;
  exam: number;
  total: number;
  grade: string;
}

export default async function StudentProfile(props: any) {
  const { id } = await props.params;

  // Fetching Data
  const studentRes = await Fetch(`student?student_id=${id}`);
  const student = studentRes.data[0] as Student;

  const classRes = await Fetch(`class?clas_id=${student.class_id}`);
  const classData = classRes.data as ClassRoom;

let studentResult=await Fetch(`result?student_id=${id}`)
const Result=studentResult.data as Result
console.log("Student Result-",Result)

  // Placeholder for Results - in a real app, you'd fetch this
  const results = []; // Assume your sample data comes from a fetch here

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 antialiased">
      
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image/Avatar */}
          <div className="relative">
            <div className="h-32 w-32 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl">
              <User size={64} className="text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-lg border-4 border-indigo-900 shadow-lg">
              <div className="h-3 w-3 bg-white rounded-full animate-pulse" />
            </div>
          </div>

          {/* Identity */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                Student Profile - {student.name}
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">{student.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-blue-100 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <Hash size={16} className="opacity-70" />
                {student.admission_no}
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap size={16} className="opacity-70" />
                {classData.class_name} ({classData.arm})
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="opacity-70" />
                DOB: {student.date_of_birth}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. SIDEBAR - PERSONAL DETAILS */}
        <div className="space-y-6">
          <ComponentCard title="Information" desc="Basic bio-data">
            <div className="space-y-4">
              <DetailRow label="Gender" value={student.sex} />
              <DetailRow label="Class Code" value={classData.class_code} />
              <DetailRow label="Admission Date" value="Sept 2023" />
              <DetailRow label="Status" value="Active" isStatus />
            </div>
            <button className="w-full mt-4 py-2 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors">
              Edit Profile
            </button>
          </ComponentCard>

          <ComponentCard title="Performance Summary">
            <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
              <div>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">Average Score</p>
                <h4 className="text-2xl font-black text-emerald-700 dark:text-emerald-400">72.4%</h4>
              </div>
              <Award size={32} className="text-emerald-500 opacity-50" />
            </div>
          </ComponentCard>
        </div>

        {/* 3. MAIN CONTENT - ACADEMIC RESULTS */}
        <div className="lg:col-span-2 space-y-6">
          <ComponentCard 
            title="Academic Transcript" 
            desc="Recent examination results"
         
          >
            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5">
                    <th className="pb-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subject ID</th>
                    <th className="pb-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Term</th>
                    <th className="pb-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Tests</th>
                    <th className="pb-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Exam</th>
                    <th className="pb-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Total</th>
                    <th className="pb-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {/* Mapping samples of your result data */}
                  {[1, 2, 3].map((res) => (
                    <tr key={res} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
                            <BookOpen size={14} />
                          </div>
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Subject #{res}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs font-medium text-gray-500">Term 1</td>
                      <td className="py-4 px-4 text-center text-sm font-medium">33.0</td>
                      <td className="py-4 px-4 text-center text-sm font-medium">45.0</td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-bold text-blue-600 italic">78.0</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-blue-600 text-white text-[10px] font-black">A</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center gap-3">
               <Info size={16} className="text-blue-500" />
               <p className="text-[11px] text-gray-500">Only showing validated results for the 2023/2024 Session.</p>
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}

// Sub-component for clean rows
function DetailRow({ label, value, isStatus = false }: { label: string, value: string, isStatus?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-xs font-medium text-gray-400">{label}</span>
      {isStatus ? (
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">
          {value}
        </span>
      ) : (
        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{value}</span>
      )}
    </div>
  );
}