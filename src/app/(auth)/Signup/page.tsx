"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  Lock, Mail, Eye, EyeOff, ShieldCheck, User, 
  ArrowRight, Building2, Globe, MapPin, Phone, 
  Calendar, Zap, Rocket, Crown, ArrowLeft, Check, 
  Info, ChevronRight, AlertCircle, BookOpen, Hash,
  Sparkles, Server, GraduationCap,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useRegisterSchool } from "../../../../hooks/useSchool";
import { RegistrationSchema } from "@/libs/Formvalidations";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegisterSchool();
  const router=useRouter()
  const randomIdSeed = useRef(Math.floor(100 + Math.random() * 900));
  const randomUserSeed = useRef(Math.floor(1000 + Math.random() * 9000));

  const [formData, setFormData] = useState({
    admin: { name: "", email: "", password: "", role: "ADMIN", user_id: "" },
    school: { 
      schoolId: "", 
      name: "", phone: "", email: "", 
      country: "", address: "" 
    },
    academic: {
      sessionName: "", 
      sessionStart: null, 
      sessionEnd: null,
      termNumber: "", 
      termStart: null, 
      termEnd: null
    },
    plan: "professional"
  });

useEffect(() => {
    const sName = formData.school.name;
    const aName = formData.admin.name;
    let updates: any = {};

    if (sName && sName.length >= 3) {
      const prefix = sName.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase() || "SCH";
      const autoSchoolId = `${prefix}|${randomIdSeed.current}|SCH`;
      
      if (formData.school.schoolId !== autoSchoolId) {
        updates.school = { ...formData.school, schoolId: autoSchoolId };
      }
    }

    if (aName && aName.length >= 3) {
      const userPrefix = aName.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase() || "ADM";
      const autoUserId = `${userPrefix}|${randomUserSeed.current}|ADM`;
      
      if (formData.admin.user_id !== autoUserId) {
        updates.admin = { ...formData.admin, user_id: autoUserId };
      }
    }

    if (Object.keys(updates).length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        ...updates,
        school: updates.school ? { ...prev.school, ...updates.school } : prev.school,
        admin: updates.admin ? { ...prev.admin, ...updates.admin } : prev.admin
      }));
    }
  }, [formData.school.name, formData.admin.name]);

  const updateForm = useCallback((section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], [field]: value }
    }));
  }, [formData]);

  const handleFinalSubmit = () => {
    console.log(formData)

    const result = RegistrationSchema.safeParse(formData);
    if (!result.success) {
      console.log(result.error.issues)
      alert("Please ensure all fields are filled correctly across all steps.",result.error.issues);
      return;
    }

    
    registerMutation.mutate(formData);
  };

  const steps = [
    { id: 1, label: 'Admin', icon: ShieldCheck, color: 'text-indigo-600' },
    { id: 2, label: 'School', icon: Building2, color: 'text-emerald-600' },
    { id: 3, label: 'Academic', icon: GraduationCap, color: 'text-amber-600' },
    { id: 4, label: 'Plan', icon: Rocket, color: 'text-rose-600' },
  ];

  const planData: any = {
    starter: { name: "Starter", price: "₦0", setup: "₦5,000", icon: Zap },
    professional: { name: "Professional", price: "₦50,000", setup: "₦20,000", icon: Rocket },
    enterprise: { name: "Enterprise", price: "Custom", setup: "₦50,000+", icon: Crown },
  };

  return (
    <div className="min-h-screen w-full relative bg-white flex items-center justify-center p-4 sm:p-6 overflow-x-hidden selection:bg-indigo-100 font-sans">
      
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-indigo-50 rounded-full blur-[80px] sm:blur-[100px] opacity-60" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-blue-50 rounded-full blur-[80px] sm:blur-[100px] opacity-60" />
      </div>

      <div className={`w-full relative z-10 transition-all duration-500 ${step === 4 ? 'max-w-[920px]' : 'max-w-[460px]'}`}>
        
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 mb-4 sm:mb-6">
            <Sparkles size={12} className="text-indigo-600" />
            <span className="text-[9px] sm:text-[10px] font-bold text-zinc-600 uppercase tracking-widest">School Made Easy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight mb-2">
            Register <span className="text-indigo-600">School</span>
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-medium">Initialize your academic management system</p>
        </div>

        <div className="flex p-1 bg-zinc-100/80 rounded-2xl sm:rounded-[24px] mb-6 sm:mb-8 border border-zinc-200/50 backdrop-blur-sm overflow-x-auto no-scrollbar">
          {steps.map(item => (
            <button
              key={item.id}
              type="button"
              className={`flex-1 min-w-[70px] flex flex-col items-center gap-1 sm:gap-1.5 py-2.5 sm:py-3 rounded-xl sm:rounded-[18px] transition-all duration-300 ${
                step === item.id ? "bg-white text-zinc-900 shadow-sm border border-zinc-200" : "text-zinc-400 opacity-60 cursor-default"
              }`}
            >
              <item.icon size={16} className={step === item.id ? item.color : "opacity-40"} />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white border border-zinc-200/60 rounded-[30px] sm:rounded-[40px] p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-100">
            
            <div className={`transition-all duration-500 ${step === 4 ? 'md:w-1/2 md:pr-10 pb-8 md:pb-0' : 'w-full'}`}>
              
              {/* Step 1: Admin */}
              {step === 1 && (
                <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
                  <FormInput label="Full Name" icon={User} placeholder="e.g. Albert Okon" value={formData.admin.name} onChange={(e:any) => updateForm('admin', 'name', e.target.value)} />
                  <div className="space-y-1.5">
                    <label className="text-[9px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Generated Admin ID</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600" size={18} />
                      <input disabled value={formData.admin.user_id || "Waiting for Name..."} className="w-full bg-indigo-50/50 border border-zinc-200 rounded-xl sm:rounded-2xl pl-11 py-3.5 sm:py-4 text-zinc-400 text-sm font-bold" />
                    </div>
                  </div>
                  <FormInput label="Official Email" icon={Mail} placeholder="admin@school.com" value={formData.admin.email} onChange={(e:any) => updateForm('admin', 'email', e.target.value)} />
                  <FormInput label="Secret Password" icon={Lock} type="password" value={formData.admin.password} onChange={(e:any) => updateForm('admin', 'password', e.target.value)} />
                </div>
              )}

              {/* Step 2: School */}
              {step === 2 && (
                <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
                  <FormInput label="Institute Name" icon={Building2} placeholder="School Name" value={formData.school.name} onChange={(e:any) => updateForm('school', 'name', e.target.value)} />
                  <div className="space-y-1.5 ">
                    <label className="text-[9px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Auto-Generated ID</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600" size={18} />
                      <input  disabled value={formData.school.schoolId || "Generating ID..."} className="w-full bg-indigo-50/50 border border-zinc-200 rounded-xl sm:rounded-2xl pl-11 py-3.5 sm:py-4 text-indigo-700 text-sm font-mono font-bold" />
                    </div>

                  
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Phone" icon={Phone} placeholder="080..." value={formData.school.phone} onChange={(e:any) => updateForm('school', 'phone', e.target.value)} />
                    <FormInput label="Country" icon={Globe} placeholder="Nigeria" value={formData.school.country} onChange={(e:any) => updateForm('school', 'country', e.target.value)} />
                  </div>
                                    <FormInput label="School email" icon={Mail} value={formData.school.email} onChange={(e:any) => updateForm('school', 'email', e.target.value)} />
                  <FormInput label="Physical Address" icon={MapPin} value={formData.school.address} onChange={(e:any) => updateForm('school', 'address', e.target.value)} />
                </div>
              )}

              {/* Step 3: Academic */}
              {step === 3 && (
                <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
                  <FormInput label="Current Session" icon={BookOpen} placeholder="e.g. 2024/2025" value={formData.academic.sessionName} onChange={(e:any) => updateForm('academic', 'sessionName', e.target.value)} />
                  <div className="grid grid-cols-2 gap-4">
                    <DateInput label="Session Start" selected={formData.academic.sessionStart} onChange={(date:any) => updateForm('academic', 'sessionStart', date)} />
                    <DateInput label="Session End" selected={formData.academic.sessionEnd} onChange={(date:any) => updateForm('academic', 'sessionEnd', date)} minDate={formData.academic.sessionStart}/>
                  </div>
                  <div className="pt-4 border-t border-zinc-100 space-y-4">
                    <FormInput label="Active Term (Number)" type="number" icon={Hash} placeholder="e.g. 1" value={formData.academic.termNumber} onChange={(e:any) => updateForm('academic', 'termNumber', e.target.value)} />
                    <div className="grid grid-cols-2 gap-4">
                      <DateInput label="Term Start" selected={formData.academic.termStart} onChange={(date:any) => updateForm('academic', 'termStart', date)} />
                      <DateInput label="Term End" selected={formData.academic.termEnd} onChange={(date:any) => updateForm('academic', 'termEnd', date)} minDate={formData.academic.termStart} />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Plan */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  {Object.keys(planData).map((key) => {
                    const plan = planData[key];
                    const active = formData.plan === key;
                    const Icon = plan.icon;
                    return (
                      <div key={key} onClick={() => updateForm('plan', 'plan', key)}
                        className={`p-5 rounded-[22px] border-2 cursor-pointer transition-all flex items-center justify-between ${active ? 'border-indigo-600 bg-indigo-50/30' : 'border-zinc-100 bg-zinc-50/50 hover:border-zinc-200'}`}
                      >
                        <div className="flex items-center gap-4">
                           <div className={`p-3 rounded-xl ${active ? 'bg-indigo-600 text-white' : 'bg-white text-zinc-400'}`}><Icon size={20}/></div>
                           <div>
                              <h4 className="text-[11px] font-black uppercase text-zinc-900">{plan.name}</h4>
                              <p className="text-xs font-bold text-indigo-600">{plan.price}</p>
                           </div>
                        </div>
                        {active && <Check size={18} className="text-indigo-600" />}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="pt-8 space-y-4">
                  <button 
                    disabled={registerMutation.isPending}
                    onClick={() => step === 4 ? handleFinalSubmit() : setStep(step + 1)} 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl sm:rounded-[20px] font-black text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 disabled:opacity-70"
                  >
                      {registerMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : (
                        <>
                          {step === 4 ? "Complete Setup" : "Continue Registration"} 
                          <ArrowRight size={18} />
                        </>
                      )}
                  </button>
                  {step > 1 && (
                    <button onClick={()=>setStep(step-1)} className="w-full text-zinc-400 font-bold text-[10px] uppercase tracking-widest hover:text-zinc-600 transition-colors py-2 flex items-center justify-center gap-2">
                        <ArrowLeft size={12}/> Previous Step
                    </button>
                  )}
              </div>
            </div>

            {/* Plan Sidebar */}
            {step === 4 && (
              <div className="hidden md:flex flex-1 md:pl-10 flex-col animate-in slide-in-from-right-4">
                <h3 className="text-2xl font-black text-zinc-900 mb-6">Plan Breakdown</h3>
                <div className="space-y-6 flex-1">
                   <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-[24px]">
                      <p className="text-[10px] font-black text-indigo-600 uppercase mb-2 tracking-widest">One-time Setup Fee</p>
                      <p className="text-3xl font-black text-zinc-900">{planData[formData.plan].setup}</p>
                   </div>
                   <div className="space-y-3">
                      <p className="text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-widest">Core Features</p>
                      {['Result Management', 'Fee Tracking', 'Parent Portal', 'Staff Attendance'].map(f => (
                        <div key={f} className="flex items-center gap-3 text-xs font-bold text-zinc-600 bg-white p-3 border border-zinc-100 rounded-xl">
                            <Check size={14} className="text-indigo-600" strokeWidth={3}/> {f}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center mt-8 sm:mt-10 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Already have an account? <Link href='/Login' className="text-indigo-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

function FormInput({ label, icon: Icon, type = "text", ...props }: any) {
  const [show, setShow] = useState(false);
  const inputType = type === "password" ? (show ? "text" : "password") : type;
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="text-[9px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
        <input 
          type={inputType}
          className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl sm:rounded-2xl pl-11 pr-11 py-3.5 sm:py-4 text-zinc-900 text-sm font-semibold outline-none focus:bg-white focus:border-indigo-600/50 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-zinc-300"
          {...props} 
        />
        {type === "password" && (
          <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

function DateInput({ label, selected, onChange,minDate }: any) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="text-[9px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 z-10" size={18} />
        <DatePicker
          selected={selected}
          onChange={onChange}
          minDate={minDate}
          placeholderText="-- / -- / ----"
          dateFormat="dd/MM/yyyy"
          className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl sm:rounded-2xl pl-11 py-3.5 sm:py-4 text-zinc-900 text-sm font-semibold outline-none focus:bg-white focus:border-indigo-600 transition-all cursor-pointer"
        />
      </div>
    </div>
  );
}