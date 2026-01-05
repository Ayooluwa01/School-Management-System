import { Fetch } from '../../../../../../../libs/api'; 
import { User, Calendar, Hash, GraduationCap, MapPin, Phone } from "lucide-react";
import StudentProfileView from "@/components/common/Reusables/Studentprofile";

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
}


// ... imports



export default async function StudentProfile(props: any) {
  const { id } = await props.params;
  
  const studentRes = await Fetch(`students/${id}`);
  const student = studentRes.data;

  

  const mockFees = [
    { id: 1, title: "1st Term Tuition", amount: 1500, paid: 1500, status: "paid", date: "2024-09-01" },
    { id: 2, title: "Uniform & Books", amount: 450, paid: 450, status: "paid", date: "2024-09-05" },
    { id: 3, title: "2nd Term Tuition", amount: 1500, paid: 250, status: "partial", date: "2025-01-05" },
  ];

  const mockAttendance = {
    total_days: 120,
    present: 112,
    absent: 5,
    late: 3,
    history: [
      { date: "2025-01-20", status: "present" },
      { date: "2025-01-19", status: "late", reason: "Bus breakdown" },
      { date: "2025-01-18", status: "absent", reason: "Sick leave" },
      { date: "2025-01-17", status: "present" },
    ]
  };

  const mockRemarks = [
    { id: 1, teacher: "Mr. Johnson", role: "Class Teacher", date: "Dec 15, 2024", sentiment: "positive", comment: "An excellent student who participates actively in class discussions. Keep up the good work." },
    { id: 2, teacher: "Mrs. Davis", role: "Principal", date: "Nov 10, 2024", sentiment: "neutral", comment: "Discipline has improved significantly this term." },
  ];


  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8 bg-gray-50/50 min-h-screen">
      
      {/* ===== HERO SECTION ===== */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8">
            {/* Avatar Area */}
            <div className="flex-shrink-0">
               <div className="h-36 w-36 rounded-2xl border-4 border-white/10 bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                   <User size={64} className="text-white/90" />
               </div>
            </div>

            {/* Info Area */}
            <div className="flex-1 flex flex-col justify-center space-y-4">
                <div>
                   <h1 className="text-4xl font-black tracking-tight">{student?.name || "Student Name"}</h1>
                   <p className="text-blue-200 text-lg font-medium">{student?.class_name} {student?.arm}</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 text-sm">
                        <Hash size={14} className="text-blue-300"/> <span>{student?.admission_no}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 text-sm">
                        <Calendar size={14} className="text-blue-300"/> <span>{student?.date_of_birth}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 text-sm">
                        <MapPin size={14} className="text-blue-300"/> <span>Lagos, NG</span>
                    </div>
                </div>
            </div>
            
            {/* Quick Stat (Right side) */}
            <div className="hidden lg:flex flex-col justify-center items-end border-l border-white/10 pl-8">
                <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">Current Status</span>
                <span className="text-3xl font-bold text-emerald-400">Active</span>
                <div className="mt-2 flex items-center gap-2 text-xs text-blue-200 bg-blue-900/50 px-2 py-1 rounded">
                   <Phone size={12} /> Contact Parent
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