"use client";
import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Globe, 
  Camera, 
  RefreshCw,
  Home,
  Mail,
  Calendar,
  Layers,
  Clock,
  BookOpen
} from "lucide-react";

export default function SchoolProfile() {
  const [formData, setFormData] = useState({
    // Institute Details
    instituteName: 
    "",
    targetLine: "",
    phone: "",
    website: "",
    address: "",
    country: "",
    email: "",
    logo: null as string | null,
    
    sessionStart: "",
    sessionEnd: "",
    currentTerm: "",
    sessionName: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, logo: imageUrl }));
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "---";
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 p-6 md:p-12 font-sans text-zinc-800">
      
      {/* --- Breadcrumb Header --- */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-zinc-900">General Settings</h1>
            <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
            <Home size={14} />
            <span>/</span>
            <span>Institute Profile & Session</span>
            </div>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 text-sm">
            <RefreshCw size={16} />
            Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* --- LEFT COLUMN: FORMS --- */}
        <div className="lg:col-span-2 space-y-8">
            
          {/* Section 1: Institute Profile */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Building2 className="text-indigo-500" size={20} />
                Institute Details
            </h2>

            {/* Logo Upload */}
            <div className="relative border border-zinc-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 mb-8 bg-zinc-50/50">
                <div className="w-20 h-20 rounded-full bg-white border-2 border-dashed border-zinc-300 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    {formData.logo ? (
                        <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                        <Building2 className="text-zinc-300" size={28} />
                    )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs font-bold text-zinc-900">Institute Logo</p>
                    <p className="text-[10px] text-zinc-400 mb-3">Recommended: 400x400px PNG</p>
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-700 text-xs font-bold rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors shadow-sm">
                        <Camera size={14} />
                        Upload
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                {/* Institute Name */}
                <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                        Institute Name
                    </label>
                    <input 
                        type="text" name="instituteName" value={formData.instituteName} onChange={handleChange}
                        className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                    />
                </div>

                {/* Target Line */}
                <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Target Line</label>
                    <input 
                        type="text" name="targetLine" value={formData.targetLine} onChange={handleChange}
                        className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                    />
                </div>

                {/* Phone */}
                <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Phone No</label>
                    <input 
                        type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                    />
                </div>

                 {/* Email */}
                 <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                    <input 
                        type="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                    />
                </div>

                {/* Website */}
                <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Website URL</label>
                    <input 
                        type="text" name="website" value={formData.website} onChange={handleChange}
                        className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                    />
                </div>

                 {/* Country */}
                 <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Country</label>
                    <select 
                        name="country" value={formData.country} onChange={handleChange}
                        className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                    >
                        <option>Nigeria</option>
                        <option>Ghana</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                    </select>
                </div>

                {/* Address */}
                <div className="relative group md:col-span-2">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Address</label>
                    <input 
                        type="text" name="address" value={formData.address} onChange={handleChange}
                        className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                    />
                </div>
            </div>
          </div>

          {/* Section 2: Academic Configuration */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
             <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Layers className="text-orange-500" size={20} />
                Academic Configuration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                
                {/* Session Name */}
                <div className="relative group md:col-span-2">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-orange-600 uppercase tracking-wider">Current Session Name</label>
                    <input 
                        type="text" name="sessionName" value={formData.sessionName} onChange={handleChange} placeholder="e.g. 2025/2026"
                        className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                    />
                </div>

                {/* Start Date */}
                <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                       <Clock size={10} /> Session Start
                    </label>
                    <input 
                        type="date" name="sessionStart" value={formData.sessionStart} onChange={handleChange}
                        className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                    />
                </div>

                {/* End Date */}
                <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                        <Clock size={10} /> Session End
                    </label>
                    <input 
                        type="date" name="sessionEnd" value={formData.sessionEnd} onChange={handleChange}
                        className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                    />
                </div>

                {/* Current Term */}
                <div className="relative group md:col-span-2">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1">
                        <BookOpen size={10} /> Active Term
                    </label>
                    <select 
                        name="currentTerm" value={formData.currentTerm} onChange={handleChange}
                        className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                    >
                        <option>1st Term</option>
                        <option>2nd Term</option>
                        <option>3rd Term</option>
                        <option>Summer School</option>
                    </select>
                </div>

            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN: PREVIEW --- */}
        <div className="lg:col-span-1">
             <div className="sticky top-8 space-y-6">
                
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-2">Live Preview</h3>

                <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-xl shadow-zinc-200/50 overflow-hidden relative">
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-indigo-50 text-indigo-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
                        Profile Card
                    </div>

                    {/* Logo & Name */}
                    <div className="flex flex-col items-center text-center mt-8 pb-6 border-b border-zinc-100">
                        <div className="w-24 h-24 rounded-2xl bg-zinc-50 border border-zinc-100 shadow-sm flex items-center justify-center mb-4 overflow-hidden relative">
                            {formData.logo ? (
                                <img src={formData.logo} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-2 opacity-30">
                                    <Building2 size={32} />
                                </div>
                            )}
                        </div>
                        <h3 className="text-lg font-black text-zinc-900 leading-tight">
                            {formData.instituteName || "Institute Name"}
                        </h3>
                        <p className="text-xs text-zinc-400 font-medium mt-1">
                            {formData.targetLine || "Institute Tag Line"}
                        </p>
                    </div>
                    
                    {/* Academic Session Status Badge (New) */}
                    <div className="my-4 p-3 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">Current Session</p>
                            <p className="text-sm font-black text-orange-900">{formData.sessionName || "20XX/20XX"}</p>
                        </div>
                        <div className="text-right">
                             <span className="inline-block px-2 py-1 bg-white text-orange-600 rounded-lg text-[10px] font-bold shadow-sm">
                                {formData.currentTerm}
                             </span>
                        </div>
                    </div>

                    {/* Contact Details List */}
                    <div className="pt-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 shrink-0">
                                <Phone size={14} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] uppercase font-bold text-zinc-400">Phone</p>
                                <p className="text-xs font-bold text-zinc-700 truncate">{formData.phone || "---"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 shrink-0">
                                <Mail size={14} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] uppercase font-bold text-zinc-400">Email</p>
                                <p className="text-xs font-bold text-zinc-700 truncate">{formData.email || "---"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 shrink-0">
                                <MapPin size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-zinc-400">Location</p>
                                <p className="text-xs font-bold text-zinc-700 leading-tight">{formData.address || "---"}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 pt-2 border-t border-zinc-50">
                             <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 shrink-0">
                                <Calendar size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-zinc-400">Session Duration</p>
                                <p className="text-[10px] font-bold text-zinc-600">
                                    {formatDate(formData.sessionStart)} — {formatDate(formData.sessionEnd)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}