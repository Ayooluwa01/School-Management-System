"use client";
import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  Lock, Mail, Eye, EyeOff, ShieldCheck, User, 
  ArrowRight, Building2, Globe, MapPin, Phone, 
  Calendar, Zap, Rocket, Crown, ArrowLeft, Check, 
  BookOpen, Hash, Sparkles, Loader2, Users, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useRegisterSchool } from "../../../../hooks/useSchool";
import { RegistrationSchema } from "@/libs/Formvalidations";
import { useRouter } from "next/navigation";


export default function SignupPage() {
  const [step, setStep] = useState(1);
  const registerMutation = useRegisterSchool();
  const router = useRouter();
  
  const [seeds] = useState(() => ({
    id: Math.floor(100 + Math.random() * 900),
    user: Math.floor(1000 + Math.random() * 9000)
  }));

  const [formData, setFormData] = useState({
    admin: { 
      surname: "", 
      firstName: "", 
      otherNames: "", 
      gender: "", 
      phone: "", 
      email: "", 
      password: "", 
      role: "ADMIN", 
      user_id: "" 
    },
    school: { 
      schoolId: "", 
      name: "", 
      phone: "", 
      email: "", 
      country: "", 
      address: "" 
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
    const aName = formData.admin.surname; 
    let updates: any = {};

    if (sName && sName.length >= 3) {
      const prefix = sName.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase() || "SCH";
      const autoSchoolId = `${prefix}${seeds.user}`;
      
      if (formData.school.schoolId !== autoSchoolId) {
        updates.school = { ...formData.school, schoolId: autoSchoolId };
      }
    }

    if (aName && aName.length >= 3) {
      const userPrefix = aName.replace(/[^a-zA-Z]/g, "").toUpperCase() || "ADM";
      const autoUserId = `${userPrefix}${seeds.id}`;
      
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
  }, [formData.school.name, formData.admin.surname, seeds.id, seeds.user]);

  const updateForm = useCallback((section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], [field]: value }
    }));
  }, []);

  const handleFinalSubmit = () => {
    const result = RegistrationSchema.safeParse(formData);
    
    if (!result.success) {
      console.log(result.error.issues);
    }

    registerMutation.mutate(formData);
  };

  const steps = [
    { id: 1, label: 'Admin', icon: ShieldCheck, color: 'from-blue-500 to-cyan-500', emoji: '👨‍💼' },
    { id: 2, label: 'School', icon: Building2, color: 'from-purple-500 to-pink-500', emoji: '🏫' },
    { id: 3, label: 'Academic', icon: BookOpen, color: 'from-emerald-500 to-teal-500', emoji: '📚' },
    { id: 4, label: 'Plan', icon: Rocket, color: 'from-orange-500 to-red-500', emoji: '🚀' },
  ];

  const planData: any = {
    starter: { 
      name: "Starter", 
      price: "₦0", 
      setup: "₦5,000", 
      icon: Zap,
      gradient: "from-blue-500 to-cyan-500",
      features: ['Basic Result Management', 'Up to 100 Students', 'Email Support']
    },
    professional: { 
      name: "Professional", 
      price: "₦50,000", 
      setup: "₦20,000", 
      icon: Rocket,
      gradient: "from-purple-500 to-pink-500",
      features: ['Advanced Result Management', 'Unlimited Students', 'Fee Tracking', 'Parent Portal', 'Priority Support']
    },
    enterprise: { 
      name: "Enterprise", 
      price: "Custom", 
      setup: "₦50,000+", 
      icon: Crown,
      gradient: "from-orange-500 to-red-500",
      features: ['Full System Access', 'Custom Integrations', 'Dedicated Support', 'Staff Training', 'Custom Features']
    },
  };

  const currentStep = steps.find(s => s.id === step);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/10 flex items-center justify-center p-4 sm:p-6 overflow-x-hidden">
      
      <div className={`w-full relative z-10 transition-all duration-500 ${step === 4 ? 'max-w-[1100px]' : 'max-w-[600px]'}`}>
        
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">School Management System</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            Create Your <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">School Account</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Initialize your academic management system in 4 simple steps</p>
        </div>

        {/* Progress Stepper */}
        <div className="grid grid-cols-4 gap-3 mb-8 animate-fade-in-up">
          {steps.map((item, index) => {
            const isActive = step === item.id;
            const isCompleted = step > item.id;
            return (
              <div key={item.id} className="relative">
                <div className={`
                  bg-white dark:bg-gray-900 border-2 p-4 transition-all duration-300
                  ${isActive ? 'border-indigo-600 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20 -translate-y-1' : 'border-slate-200 dark:border-gray-800'}
                  ${isCompleted ? 'border-emerald-500' : ''}
                `}>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`
                      w-12 h-12 flex items-center justify-center bg-gradient-to-br ${item.color} shadow-lg
                      ${!isActive && !isCompleted ? 'opacity-30' : ''}
                    `}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <item.icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <span className="text-2xl">{item.emoji}</span>
                    <p className={`text-[9px] font-black uppercase tracking-wider text-center ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {item.label}
                    </p>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-full w-3 h-0.5 bg-slate-200 dark:bg-gray-800 hidden lg:block">
                    <div 
                      className={`h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 ${isCompleted ? 'w-full' : 'w-0'}`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-slate-100 dark:border-gray-800 p-8 shadow-xl animate-fade-in-up">
          <div className={`flex flex-col ${step === 4 ? 'lg:flex-row lg:gap-8' : ''}`}>
            
            {/* Main Form Area */}
            <div className={`${step === 4 ? 'lg:w-1/2' : 'w-full'}`}>
              
              {/* Step Header */}
              <div className="mb-8 pb-6 border-b border-slate-100 dark:border-gray-800">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${currentStep?.color} flex items-center justify-center shadow-lg`}>
                    {currentStep && <currentStep.icon className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step {step} of 4</p>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">{currentStep?.label} Information</h2>
                  </div>
                </div>
              </div>

              {/* Step 1: Admin */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput 
                      label="Surname" 
                      icon={User} 
                      placeholder="Enter surname" 
                      value={formData.admin.surname} 
                      onChange={(e:any) => updateForm('admin', 'surname', e.target.value)} 
                    />
                    <FormInput 
                      label="First Name" 
                      icon={User} 
                      placeholder="Enter first name" 
                      value={formData.admin.firstName} 
                      onChange={(e:any) => updateForm('admin', 'firstName', e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput 
                      label="Other Names" 
                      icon={User} 
                      placeholder="Optional" 
                      value={formData.admin.otherNames} 
                      onChange={(e:any) => updateForm('admin', 'otherNames', e.target.value)} 
                    />
                    <FormSelect 
                      label="Gender" 
                      icon={Users}
                      value={formData.admin.gender} 
                      onChange={(e:any) => updateForm('admin', 'gender', e.target.value)}
                      options={[
                        { label: "Select Gender", value: "" },
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" }
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput 
                      label="Phone Number" 
                      icon={Phone} 
                      placeholder="080..." 
                      value={formData.admin.phone} 
                      onChange={(e:any) => updateForm('admin', 'phone', e.target.value)} 
                    />
                    <FormInput 
                      label="Email Address" 
                      icon={Mail} 
                      placeholder="admin@school.com" 
                      value={formData.admin.email} 
                      onChange={(e:any) => updateForm('admin', 'email', e.target.value)} 
                    />
                  </div>

                  <FormInput 
                    label="Password" 
                    icon={Lock} 
                    type="password" 
                    placeholder="Create secure password"
                    value={formData.admin.password} 
                    onChange={(e:any) => updateForm('admin', 'password', e.target.value)} 
                  />

                  <div className="bg-indigo-50 dark:bg-indigo-950/20 border-2 border-indigo-200 dark:border-indigo-900 p-4">
                    <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 block">Auto-Generated Admin ID</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600" size={20} />
                      <input 
                        disabled 
                        value={formData.admin.user_id || "Waiting for name input..."} 
                        className="w-full bg-white dark:bg-gray-800 border-2 border-indigo-300 dark:border-indigo-800 pl-12 pr-4 py-3 text-indigo-700 dark:text-indigo-400 text-sm font-mono font-bold outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: School */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <FormInput 
                    label="School Name" 
                    icon={Building2} 
                    placeholder="Enter school name" 
                    value={formData.school.name} 
                    onChange={(e:any) => updateForm('school', 'name', e.target.value)} 
                  />
                  
                  <div className="bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-200 dark:border-purple-900 p-4">
                    <label className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-2 block">Auto-Generated School ID</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600" size={20} />
                      <input 
                        disabled 
                        value={formData.school.schoolId || "Generating ID..."} 
                        className="w-full bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-800 pl-12 pr-4 py-3 text-purple-700 dark:text-purple-400 text-sm font-mono font-bold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput 
                      label="School Phone" 
                      icon={Phone} 
                      placeholder="080..." 
                      value={formData.school.phone} 
                      onChange={(e:any) => updateForm('school', 'phone', e.target.value)} 
                    />
                    <FormInput 
                      label="School Email" 
                      icon={Mail} 
                      placeholder="info@school.com"
                      value={formData.school.email} 
                      onChange={(e:any) => updateForm('school', 'email', e.target.value)} 
                    />
                  </div>

                  <FormInput 
                    label="Country" 
                    icon={Globe} 
                    placeholder="Nigeria" 
                    value={formData.school.country} 
                    onChange={(e:any) => updateForm('school', 'country', e.target.value)} 
                  />
                  
                  <FormInput 
                    label="Physical Address" 
                    icon={MapPin} 
                    placeholder="Enter complete address"
                    value={formData.school.address} 
                    onChange={(e:any) => updateForm('school', 'address', e.target.value)} 
                  />
                </div>
              )}

              {/* Step 3: Academic */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <FormInput 
                    label="Academic Session" 
                    icon={BookOpen} 
                    placeholder="e.g. 2024/2025" 
                    value={formData.academic.sessionName} 
                    onChange={(e:any) => updateForm('academic', 'sessionName', e.target.value)} 
                  />
                  
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-900 p-6">
                    <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Calendar size={14} /> Session Duration
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <DateInput 
                        label="Session Start" 
                        selected={formData.academic.sessionStart} 
                        onChange={(date:any) => updateForm('academic', 'sessionStart', date)} 
                      />
                      <DateInput 
                        label="Session End" 
                        selected={formData.academic.sessionEnd} 
                        onChange={(date:any) => updateForm('academic', 'sessionEnd', date)} 
                        minDate={formData.academic.sessionStart}
                      />
                    </div>
                  </div>

                  <div className="bg-teal-50 dark:bg-teal-950/20 border-2 border-teal-200 dark:border-teal-900 p-6">
                    <h3 className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Calendar size={14} /> Current Term
                    </h3>
                    <FormInput 
                      label="Term Number" 
                      type="number" 
                      icon={Hash} 
                      placeholder="e.g. 1, 2, or 3" 
                      value={formData.academic.termNumber} 
                      onChange={(e:any) => updateForm('academic', 'termNumber', e.target.value)} 
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <DateInput 
                        label="Term Start" 
                        selected={formData.academic.termStart} 
                        onChange={(date:any) => updateForm('academic', 'termStart', date)} 
                      />
                      <DateInput 
                        label="Term End" 
                        selected={formData.academic.termEnd} 
                        onChange={(date:any) => updateForm('academic', 'termEnd', date)} 
                        minDate={formData.academic.termStart} 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Plan */}
              {step === 4 && (
                <div className="space-y-4 animate-fade-in">
                  {Object.keys(planData).map((key) => {
                    const plan = planData[key];
                    const active = formData.plan === key;
                    const Icon = plan.icon;
                    return (
                      <div 
                        key={key} 
                        onClick={() => setFormData(prev => ({ ...prev, plan: key }))}
                        className={`
                          group relative p-6 border-2 cursor-pointer transition-all duration-300
                          ${active 
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20 -translate-y-1' 
                            : 'border-slate-200 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700'
                          }
                        `}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg ${!active && 'opacity-30'}`}>
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <h4 className="text-lg font-black uppercase text-slate-900 dark:text-white">{plan.name}</h4>
                              <p className={`text-2xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>{plan.price}</p>
                              <p className="text-[10px] font-bold text-slate-500 uppercase">Setup: {plan.setup}</p>
                            </div>
                          </div>
                          {active && (
                            <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2 pl-1">
                          {plan.features.map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                              <CheckCircle2 size={14} className={active ? 'text-indigo-600' : 'text-slate-300'} />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-8 space-y-4">
                <button 
                  disabled={registerMutation.isPending}
                  onClick={() => step === 4 ? handleFinalSubmit() : setStep(step + 1)} 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 font-black text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 uppercase tracking-wider"
                >
                  {registerMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Processing...
                    </>
                  ) : (
                    <>
                      {step === 4 ? "Complete Registration" : "Continue to Next Step"} 
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                
                {step > 1 && (
                  <button 
                    onClick={() => setStep(step - 1)} 
                    className="w-full border-2 border-slate-200 dark:border-gray-800 text-slate-600 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest hover:border-slate-300 dark:hover:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800 transition-all py-3 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={12} /> Previous Step
                  </button>
                )}
              </div>
            </div>

            {/* Plan Breakdown Sidebar - Only visible on Step 4 */}
            {step === 4 && (
              <div className="hidden lg:flex lg:w-1/2 flex-col gap-6 animate-fade-in mt-8 lg:mt-0">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
                  <h3 className="text-2xl font-black mb-6 uppercase">Selected Plan</h3>
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between pb-4 border-b border-white/20">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Plan Name</span>
                      <span className="text-xl font-black">{planData[formData.plan].name}</span>
                    </div>
                    <div className="flex items-baseline justify-between pb-4 border-b border-white/20">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Monthly Cost</span>
                      <span className="text-3xl font-black">{planData[formData.plan].price}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Setup Fee</span>
                      <span className="text-2xl font-black">{planData[formData.plan].setup}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 p-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">What's Included</h4>
                  <div className="space-y-3">
                    {planData[formData.plan].features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={3} />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-900 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Next Steps</h4>
                  </div>
                  <ol className="space-y-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <li className="flex gap-2"><span className="text-emerald-600 font-black">1.</span> Complete registration</li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-black">2.</span> Verify your email</li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-black">3.</span> Complete payment</li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-black">4.</span> Start managing your school</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Already have an account? <Link href='/Login' className="text-indigo-600 hover:text-indigo-700 transition-colors">Login Here</Link>
          </p>
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

function FormInput({ label, icon: Icon, type = "text", ...props }: any) {
  const [show, setShow] = useState(false);
  const inputType = type === "password" ? (show ? "text" : "password") : type;
  
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
        <input 
          type={inputType}
          className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 pl-12 pr-12 py-4 text-slate-900 dark:text-white text-sm font-bold outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-600 transition-all placeholder:text-slate-300 dark:placeholder:text-gray-600"
          {...props} 
        />
        {type === "password" && (
          <button 
            type="button" 
            onClick={() => setShow(!show)} 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

function FormSelect({ label, icon: Icon, options, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" size={20} />
        <select
          className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 pl-12 pr-4 py-4 text-slate-900 dark:text-white text-sm font-bold outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-600 transition-all appearance-none cursor-pointer"
          {...props}
        >
          {options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function DateInput({ label, selected, onChange, minDate }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={20} />
        <DatePicker
          selected={selected}
          onChange={onChange}
          minDate={minDate}
          placeholderText="DD/MM/YYYY"
          dateFormat="dd/MM/yyyy"
          className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 pl-12 pr-4 py-4 text-slate-900 dark:text-white text-sm font-bold outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-600 transition-all cursor-pointer"
        />
      </div>
    </div>
  );
}