"use client";
import React, { useState } from "react";
import { 
  Lock, Mail, Eye, EyeOff, ShieldCheck, User, 
  ArrowRight, Sparkles, Building2, Globe, 
  MapPin, Phone, Calendar, Zap, Rocket, Crown,
  ArrowLeft, Check, Info, ChevronRight, X, AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function CreateSchoolPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  const [formData, setFormData] = useState({
    admin: { name: "", email: "", phone: "", password: "", role: "School Administrator" },
    school: { 
      instituteName: "", targetLine: "", phone: "", email: "", website: "", 
      country: "", address: "", sessionName: "", sessionStart: "", 
      sessionEnd: "", currentTerm: "" 
    },
    plan: "professional"
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const planData: any = {
    starter: {
      name: "FREE — Starter",
      price: "₦0",
      setup: "₦5,000",
      limits: ["100 students", "3 classes", "1 active term"],
      features: ["Student records", "Attendance tracking", "Manual fees", "Basic reporting"],
    },
    professional: {
      name: "PROFESSIONAL",
      price: "₦50,000",
      setup: "₦20,000",
      limits: ["600 students", "Unlimited classes", "8 admins"],
      features: ["Everything in Free", "Result publishing", "Payroll management", "Parent Portal", "SMS alerts"],
    },
    enterprise: {
      name: "ENTERPRISE",
      price: "Custom",
      setup: "₦50,000+",
      limits: ["1,000+ students", "Multi-campus"],
      features: ["Custom workflows", "Dedicated manager", "SLA support", "Advanced Analytics"],
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-white flex items-center justify-center p-4 sm:p-6 overflow-x-hidden selection:bg-indigo-100 font-sans">
      
      {/* Background Patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[300px] h-[300px] bg-indigo-50 rounded-full blur-[80px] opacity-60" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[300px] h-[300px] bg-blue-50 rounded-full blur-[80px] opacity-60" />
      </div>

      <div className={`transition-all duration-700 ease-in-out relative z-10 w-full ${step === 3 ? 'max-w-[920px]' : 'max-w-[460px]'}`}>
        
        {/* Main Header */}
        <div className="text-center mb-10 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 mb-4">
            <Sparkles size={12} className="text-indigo-600" />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                Safe & Secure Registration
            </span>
          </div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
            Register <span className="text-indigo-600">School</span>
          </h1>
        </div>

        {/* --- RESTYLED STEP COUNTER --- */}
        <div className="mb-12 max-w-[250px] mx-auto">
          <div className="flex items-center justify-between relative">
            {[
              { id: 1, label: "User" },
              { id: 2, label: "School" },
              { id: 3, label: "Plan" }
            ].map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center relative z-10">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-500 border-2 ${
                    step >= s.id ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200 scale-110" : "bg-white border-zinc-200 text-zinc-400"
                  }`}>
                    {step > s.id ? <Check size={16} strokeWidth={4} /> : s.id}
                  </div>
                  <div className="absolute top-12">
                    <span className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${step >= s.id ? "text-zinc-900" : "text-zinc-400"}`}>
                        {s.label}
                    </span>
                  </div>
                </div>
                {i < 2 && (
                  <div className="flex-1 h-[3px] mx-2 bg-zinc-100 rounded-full overflow-hidden relative -top-0.5">
                    <div className={`h-full bg-indigo-600 transition-all duration-1000 ease-in-out ${step > s.id ? "w-full" : "w-0"}`} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="mt-14 bg-white border border-zinc-200/60 rounded-[35px] sm:rounded-[45px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-100">
            
            {/* Form Section */}
            <div className={`p-8 sm:p-12 transition-all duration-500 ${step === 3 ? 'md:w-[460px]' : 'w-full'}`}>
              
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <h2 className="text-xl font-black text-zinc-900">Administrator Details</h2>
                    <p className="text-xs text-zinc-500 font-medium">Create your primary admin account</p>
                  </div>
                  <FormInput label="Full Name" icon={User} placeholder="e.g. Albert Okon" />
                  <FormInput label="Official Email" icon={Mail} placeholder="admin@school.com" />
                  <FormInput label="Phone" icon={Phone} placeholder="080..." />
                  <div className="space-y-1.5 opacity-60">
                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">Account Role</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600" size={17} />
                      <input disabled value={formData.admin.role} className="w-full bg-zinc-100 border border-zinc-200 rounded-xl pl-11 py-3.5 text-zinc-500 text-sm font-bold" />
                    </div>
                  </div>
                  <FormInput label="Password" icon={Lock} type="password" />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <h2 className="text-xl font-black text-zinc-900">School Profile</h2>
                    <p className="text-xs text-zinc-500 font-medium">Basic information about the institution</p>
                  </div>
                  <FormInput label="Institute Name" icon={Building2} />
                  <FormInput label="Target Line" icon={Sparkles} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput label="Phone" icon={Phone} />
                    <FormInput label="Country" icon={Globe} />
                  </div>
                  <FormInput label="School Email" icon={Mail} />
                  <FormInput label="Address" icon={MapPin} />
                  <div className="pt-4 border-t border-zinc-100 mt-2 space-y-4">
                    <FormInput label="Current Session" icon={Calendar} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput label="Start Date" type="date" icon={Calendar} />
                      <FormInput label="End Date" type="date" icon={Calendar} />
                    </div>
                    <FormInput label="Active Term" icon={Info} />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <h2 className="text-xl font-black text-zinc-900">Select Plan</h2>
                    <p className="text-xs text-zinc-500 font-medium">Choose a subscription that fits your needs</p>
                  </div>
                  {Object.keys(planData).map((key) => (
                    <div 
                      key={key} 
                      onClick={() => { setFormData({...formData, plan: key}); if(window.innerWidth < 768) setShowMobileSidebar(true); }}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${formData.plan === key ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-4 ring-indigo-600/5' : 'border-zinc-100 bg-zinc-50/50 hover:border-zinc-200'}`}
                    >
                      <div className="flex items-center gap-4">
                         <div className={`p-2.5 rounded-xl ${formData.plan === key ? 'bg-indigo-600 text-white' : 'bg-white text-zinc-400 shadow-sm'}`}>
                           {key === 'starter' ? <Zap size={20}/> : key === 'professional' ? <Rocket size={20}/> : <Crown size={20}/>}
                         </div>
                         <div>
                            <h4 className="text-[12px] font-black uppercase text-zinc-900 tracking-tight">{planData[key].name}</h4>
                            <p className="text-xs font-bold text-indigo-600">{planData[key].price}</p>
                         </div>
                      </div>
                      <ChevronRight size={18} className={`${formData.plan === key ? 'text-indigo-600' : 'text-zinc-300'}`} />
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-10 space-y-4">
                  <button onClick={step === 3 ? undefined : nextStep} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4.5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 active:scale-[0.98]">
                      {step === 3 ? "Launch Dashboard" : "Continue"} <ArrowRight size={18} />
                  </button>
                  {step > 1 && (
                    <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] hover:text-zinc-600 py-2 transition-colors"><ArrowLeft size={12}/> Previous Step</button>
                  )}
              </div>
            </div>

            {/* Desktop Side Bar */}
            {step === 3 && (
              <div className="hidden md:flex flex-1 bg-zinc-50/30 p-12 flex-col animate-in fade-in slide-in-from-right-8 duration-700">
                <PackageDetails plan={planData[formData.plan]} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Sheet Sidebar */}
        {showMobileSidebar && step === 3 && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md" onClick={() => setShowMobileSidebar(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[45px] p-10 animate-in slide-in-from-bottom duration-500 max-h-[85vh] overflow-y-auto">
              <div className="w-14 h-1.5 bg-zinc-200 rounded-full mx-auto mb-10" />
              <PackageDetails plan={planData[formData.plan]} />
              <button onClick={() => setShowMobileSidebar(false)} className="w-full bg-indigo-600 text-white py-5 rounded-[22px] font-black text-sm mt-10 shadow-2xl shadow-indigo-200">Confirm Subscription</button>
            </div>
          </div>
        )}
        
        {/* Simple Footer */}
        <p className="text-center mt-10 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Have an acount? <Link href='/Login' className="text-indigo-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

function PackageDetails({ plan }: any) {
  return (
    <div className="space-y-10 flex flex-col h-full">
      <div className="pb-6 border-b border-zinc-100">
        <h3 className="text-3xl font-[1000] text-zinc-900 uppercase tracking-tighter mb-2">{plan.name}</h3>
        <p className="text-sm font-semibold text-zinc-400">Exclusive feature breakdown</p>
      </div>

      <div className="space-y-8 flex-1">
        <div className="space-y-4">
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] flex items-center gap-2"><AlertCircle size={14}/> Capacity & Limits</p>
          <div className="space-y-3">
            {plan.limits.map((l:any) => <p key={l} className="text-[13px] font-bold text-zinc-800 flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" /> {l}</p>)}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] flex items-center gap-2"><Sparkles size={14}/> Core Features</p>
          <div className="grid grid-cols-1 gap-3">
            {plan.features.map((f:any) => (
                <div key={f} className="flex items-start gap-3 p-3 bg-white border border-zinc-100 rounded-xl shadow-sm group hover:border-indigo-100 transition-colors">
                    <Check size={14} className="text-emerald-500 mt-0.5 shrink-0" strokeWidth={4}/>
                    <span className="text-[12px] font-bold text-zinc-600">{f}</span>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Setup Price Block at the Bottom */}
      <div className="mt-auto pt-8 border-t border-zinc-200">
        <div className="group relative overflow-hidden bg-indigo-600 p-6 rounded-[24px] shadow-2xl shadow-indigo-200 text-white flex items-center justify-between">
          <div className="relative z-10">
            <span className="text-[9px] font-black uppercase tracking-[0.25em] opacity-70 block mb-1">One-time Setup</span>
            <span className="text-2xl font-[1000] tracking-tight">{plan.setup}</span>
          </div>
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm relative z-10">
            <Rocket className="text-white" size={24} />
          </div>
          {/* Abstract background shape */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, icon: Icon, type = "text", ...props }: any) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600 transition-colors">
            <Icon size={18} />
        </div>
        <input 
          type={type === "password" ? (show ? "text" : "password") : type} 
          className="w-full bg-zinc-50/50 border border-zinc-200 rounded-[18px] pl-12 pr-4 py-4 text-zinc-900 text-sm font-semibold outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-zinc-300 shadow-sm" 
          {...props} 
        />
        {type === "password" && (
          <button type="button" onClick={() => setShow(!show)} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-600 transition-colors">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}