"use client";
import React, { useState } from "react";
import { 
  Lock, Mail, Eye, EyeOff, 
  ShieldCheck, User, GraduationCap, Users,
  Loader2, ArrowRight, Sparkles, Building2
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ email: "", password: "" });

  const roles = [
    { id: 'admin', label: 'Admin', icon: ShieldCheck, color: 'text-indigo-600' },
    { id: 'teacher', label: 'Teacher', icon: User, color: 'text-emerald-600' },
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'text-amber-600' },
    { id: 'parent', label: 'Parent', icon: Users, color: 'text-rose-600' },
  ];

  return (
    <div className="min-h-screen w-full relative bg-white flex items-center justify-center p-4 sm:p-6 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      
      {/* --- Background Pattern (Simplified for mobile performance) --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />
      
      {/* --- Background Blur Decoration --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-indigo-50 rounded-full blur-[80px] sm:blur-[100px] opacity-60" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-blue-50 rounded-full blur-[80px] sm:blur-[100px] opacity-60" />
      </div>

      <div className="w-full max-w-[460px] relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header - Responsive text sizes */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 mb-4 sm:mb-6">
            <Sparkles size={12} className="text-indigo-600" />
            <span className="text-[9px] sm:text-[10px] font-bold text-zinc-600 uppercase tracking-widest">School Made Easy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight mb-2">
          Manage <span className="text-indigo-600">School</span>
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-medium">Manage your academic excellence</p>
        </div>

        {/* --- Role Selection - Flexible layout --- */}
        <div className="flex p-1 bg-zinc-100/80 rounded-2xl sm:rounded-[24px] mb-6 sm:mb-8 border border-zinc-200/50 backdrop-blur-sm overflow-x-auto no-scrollbar">
          {roles.map((item) => (
            <button
              key={item.id}
              onClick={() => setRole(item.id)}
              className={`flex-1 min-w-[70px] flex flex-col items-center gap-1 sm:gap-1.5 py-2.5 sm:py-3 rounded-xl sm:rounded-[18px] transition-all duration-300 ${
                role === item.id 
                ? "bg-white text-zinc-900 shadow-sm border border-zinc-200" 
                : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <item.icon size={16} className={role === item.id ? item.color : "opacity-40"} />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>

        {/* --- Login Card - Responsive padding/corners --- */}
        <div className="bg-white border border-zinc-200/60 rounded-[30px] sm:rounded-[40px] p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
            <form className="space-y-4 sm:space-y-6">
                <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[9px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Official Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input 
                            type="email" 
                            placeholder="e.g. admin@school.com"
                            className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl sm:rounded-2xl pl-11 pr-4 py-3.5 sm:py-4 text-zinc-900 text-sm outline-none focus:bg-white focus:border-indigo-600/50 focus:ring-4 focus:ring-indigo-600/5 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[9px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest">Secret Password</label>
                        <button type="button" className="text-[9px] sm:text-[10px] font-bold text-indigo-600 hover:underline">Forgot Key?</button>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl sm:rounded-2xl pl-11 pr-11 py-3.5 sm:py-4 text-zinc-900 text-sm outline-none focus:bg-white focus:border-indigo-600/50 focus:ring-4 focus:ring-indigo-600/5 transition-all"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <div className="pt-2">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 sm:py-4 rounded-xl sm:rounded-[20px] font-black text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 sm:gap-3 shadow-lg sm:shadow-xl shadow-indigo-100 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : "Sign into Dashboard"}
                        {!loading && <ArrowRight size={18} className="hidden sm:block" />}
                    </button>
                </div>
            </form>
        </div>

        {/* Footer - Optimized for small screens */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4 sm:gap-6 text-zinc-400">
            <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} />
                <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-nowrap">Secure SSL</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-200" />
            <div className="flex items-center gap-1.5">
                <Building2 size={12} />
                <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">v4.0.2</span>
            </div>
        </div>
      </div>
    </div>
  );
}