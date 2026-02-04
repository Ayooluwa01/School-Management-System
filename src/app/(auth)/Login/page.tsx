"use client";
import React, { useState } from "react";
import { 
  Lock, Mail, Eye, EyeOff, 
  ShieldCheck, User, GraduationCap, Users,
  Loader2, ArrowRight, Sparkles,
  BookOpen, CheckCircle2, AlertCircle
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
    { id: 'admin', label: 'Admin', icon: ShieldCheck, gradient: 'from-blue-500 to-cyan-500', emoji: '👨‍💼' },
    { id: 'teacher', label: 'Teacher', icon: User, gradient: 'from-purple-500 to-pink-500', emoji: '👨‍🏫' },
    { id: 'student', label: 'Student', icon: GraduationCap, gradient: 'from-emerald-500 to-teal-500', emoji: '🎓' },
    { id: 'parent', label: 'Parent', icon: Users, gradient: 'from-orange-500 to-red-500', emoji: '👨‍👩‍👧' },
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

  const currentRole = roles.find(r => r.id === role);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/10 flex items-center justify-center p-4 sm:p-6 overflow-x-hidden">
      
      <div className="w-full max-w-[540px] relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">School Management System</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            Welcome <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Back</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Sign in to access your dashboard</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-4 gap-3 mb-8 animate-fade-in-up">
          {roles.map((item) => {
            const isActive = role === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setRole(item.id)}
                className={`
                  relative bg-white dark:bg-gray-900 border-2 p-4 transition-all duration-300
                  ${isActive 
                    ? 'border-indigo-600 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20 -translate-y-1' 
                    : 'border-slate-200 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700'
                  }
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`
                    w-12 h-12 flex items-center justify-center bg-gradient-to-br ${item.gradient} shadow-lg
                    ${!isActive && 'opacity-30'}
                  `}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl">{item.emoji}</span>
                  <p className={`text-[9px] font-black uppercase tracking-wider text-center ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {item.label}
                  </p>
                </div>
                
                {isActive && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Login Form */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-slate-100 dark:border-gray-800 p-8 shadow-xl animate-fade-in-up">
          
          {/* Selected Role Header */}
          <div className="mb-8 pb-6 border-b border-slate-100 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${currentRole?.gradient} flex items-center justify-center shadow-lg`}>
                {currentRole && <currentRole.icon className="w-7 h-7 text-white" />}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signing in as</p>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase">{currentRole?.label}</h2>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>

            {/* Login ID */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">Login ID</label>
              <div className="relative group">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  name='login_id'
                  type="text"
                  placeholder="Enter your login ID"
                  value={formData.login_id}
                  onChange={handleChange}
                  className={`
                    w-full bg-slate-50 dark:bg-gray-800 border-2 pl-12 pr-4 py-4 
                    text-slate-900 dark:text-white text-sm font-bold outline-none 
                    focus:bg-white dark:focus:bg-gray-900 transition-all 
                    placeholder:text-slate-300 dark:placeholder:text-gray-600
                    ${errors.login_id 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-slate-200 dark:border-gray-700 focus:border-indigo-600'
                    }
                  `}
                />
              </div>
              {errors.login_id && (
                <div className="flex items-center gap-2 mt-2 ml-1">
                  <AlertCircle className="w-3 h-3 text-red-500" />
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.login_id}</p>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1 mr-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Password</label>
                <button 
                  type="button" 
                  className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-wider transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`
                    w-full bg-slate-50 dark:bg-gray-800 border-2 pl-12 pr-12 py-4 
                    text-slate-900 dark:text-white text-sm font-bold outline-none 
                    focus:bg-white dark:focus:bg-gray-900 transition-all 
                    placeholder:text-slate-300 dark:placeholder:text-gray-600
                    ${errors.password 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-slate-200 dark:border-gray-700 focus:border-indigo-600'
                    }
                  `}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 mt-2 ml-1">
                  <AlertCircle className="w-3 h-3 text-red-500" />
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.password}</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 font-black text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 uppercase tracking-wider"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign Into Dashboard
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-gray-800">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Secure Login</p>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Protected</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">System Status</p>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Don't have an account? <Link href='/Signup' className="text-indigo-600 hover:text-indigo-700 transition-colors">Create Account</Link>
          </p>
          
          <div className="mt-6 flex items-center justify-center gap-6">
            <button className="text-[9px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider transition-colors">Help</button>
            <div className="w-px h-3 bg-slate-200 dark:bg-gray-800" />
            <button className="text-[9px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider transition-colors">Privacy</button>
            <div className="w-px h-3 bg-slate-200 dark:bg-gray-800" />
            <button className="text-[9px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider transition-colors">Terms</button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes fade-in-up { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in { 
          animation: fade-in 0.5s ease-out forwards; 
        }
        .animate-fade-in-up { 
          animation: fade-in-up 0.6s ease-out forwards; 
        }
      `}</style>
    </div>
  );
}