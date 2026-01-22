"use client";
import React, { useState } from "react";
import { 
  Lock, Mail, Eye, EyeOff, 
  ShieldCheck, User, GraduationCap, Users,
  Loader2, ArrowRight, Sparkles,
  BookOpen
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zfd } from "zod-form-data";
import { login_idFieldSchema, loginSchema, passwordFieldSchema } from "@/libs/Formvalidations";
import { ZodSafeParseResult } from "zod/v4";
import axios from "../../../../libs/axios";
import { useAuthStore } from "../../../../zustand/store";


export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ login_id: "", password: "" });
  const [errors, setErrors] = useState<{ login_id?: string; password?: string }>({});

  const roles = [
    { id: 'admin', label: 'Admin', icon: ShieldCheck, color: 'text-indigo-600' },
    { id: 'teacher', label: 'Teacher', icon: User, color: 'text-emerald-600' },
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'text-amber-600' },
    { id: 'parent', label: 'Parent', icon: Users, color: 'text-rose-600' },
  ];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));

  const fd = new FormData();
  fd.append(name, value);

  let result: any;
  if (name === "login_id") result = login_idFieldSchema.safeParse(fd);
  else if (name === "password") result = passwordFieldSchema.safeParse(fd);

  if (!result?.success) {
    setErrors(prev => ({
      ...prev,
      [name]: result?.error.flatten().fieldErrors[name]?.[0]
    }));
  } else {
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }
};



const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const fd = new FormData(e.currentTarget);
  const result = loginSchema.safeParse(fd);

  if (!result.success) {
  const formatted = result.error.format();
  setErrors({
    login_id: formatted.login_id?._errors[0],
    password: formatted.password?._errors[0],
  });

    setLoading(false);
    return;
  }

  try {
    const response = await axios.post('/auth/login', {
      ...result.data,
      role, 
    });
    const { accessToken } = response.data;
    useAuthStore.getState().setAccessToken(accessToken);
    
router.replace('/dashboard')
    setErrors({});

  } catch (error: any) {

    setErrors({
      password: 'Invalid login id or password',
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen w-full relative bg-white flex items-center justify-center p-4 sm:p-6 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-indigo-50 rounded-full blur-[80px] sm:blur-[100px] opacity-60" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-blue-50 rounded-full blur-[80px] sm:blur-[100px] opacity-60" />
      </div>

      <div className="w-full max-w-[460px] relative z-10 animate-in fade-in zoom-in-95 duration-500">
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

        {/* Role Selection */}
        <div className="flex p-1 bg-zinc-100/80 rounded-2xl sm:rounded-[24px] mb-6 sm:mb-8 border border-zinc-200/50 backdrop-blur-sm overflow-x-auto no-scrollbar">
          {roles.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setRole(item.id)}
              className={`flex-1 min-w-[70px] flex flex-col items-center gap-1 sm:gap-1.5 py-2.5 sm:py-3 rounded-xl sm:rounded-[18px] transition-all duration-300 ${
                role === item.id ? "bg-white text-zinc-900 shadow-sm border border-zinc-200" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <item.icon size={16} className={role === item.id ? item.color : "opacity-40"} />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Login Form */}
        <div className="bg-white border border-zinc-200/60 rounded-[30px] sm:rounded-[40px] p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>

            {/* Email */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">LOGIN ID</label>
              <div className="relative group">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  name='login_id'
                  type="text"
                  placeholder="Your login id"
                  value={formData.login_id}
                  onChange={handleChange}
                  className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl sm:rounded-2xl pl-11 pr-4 py-3.5 sm:py-4 text-zinc-900 text-sm outline-none focus:bg-white focus:border-indigo-600/50 focus:ring-4 focus:ring-indigo-600/5 transition-all"
                />
                {errors.login_id && <p className="text-red-500 text-[9px] ml-1">{errors.login_id}</p>}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest">Secret Password</label>
                <button type="button" className="text-[9px] sm:text-[10px] font-bold text-indigo-600 hover:underline">Forgot Key?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl sm:rounded-2xl pl-11 pr-11 py-3.5 sm:py-4 text-zinc-900 text-sm outline-none focus:bg-white focus:border-indigo-600/50 focus:ring-4 focus:ring-indigo-600/5 transition-all"
                />
                {errors.password && <p className="text-red-500 text-[9px] ml-1">{errors.password}</p>}

                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
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

        {/* Footer */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4 sm:gap-6 text-zinc-400">
          <p className="text-center mt-10 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Dont have an account? <Link href='/Signup' className="text-indigo-600">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
