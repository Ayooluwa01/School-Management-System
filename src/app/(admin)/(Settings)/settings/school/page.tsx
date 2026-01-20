/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, MapPin, Phone, Mail, Camera, Save, 
  CheckCircle2, XCircle, Loader2, CheckCircle, X
} from "lucide-react";
import { useSchoolProfile } from "../../../../../../hooks/useSchool";

export default function SchoolProfileSettings() {
  const { data: school, isLoading, updateProfile } = useSchoolProfile();

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-indigo-600" size={32} />
    </div>
  );

  return (
    <ProfileForm 
      key={school?.school_id} 
      school={school} 
      updateProfile={updateProfile} 
    />
  );
}

function ProfileForm({ school, updateProfile }: any) {
  const [formData, setFormData] = useState({
    school_id: school?.school_id || "",
    instituteName: school?.name || "",
    email: school?.email || "",
    phone: school?.phone || "",
    address: school?.address || "",
    country: school?.country || "Nigeria",
    logoUrl: school?.logo_url || null,
    isActive: school?.is_active ?? true,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    if (updateProfile.isPending || updateProfile.isSuccess) {
      setShowStatusModal(true);
      if (updateProfile.isSuccess) {
        const timer = setTimeout(() => setShowStatusModal(false), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [updateProfile.isPending, updateProfile.isSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setLogoFile(file);

        // For localpreview
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, logoUrl: imageUrl }));
    }
  };


  const handleSave = () => {
  const data = new FormData();
 

  data.append('instituteName', formData.instituteName);
  data.append('email', formData.email);
  data.append('phone', formData.phone);
  data.append('address', formData.address);
  data.append('country', formData.country);
 data.append('logoUrl',formData.logoUrl)
  if (logoFile) {
    data.append('logo', logoFile); 
  }
  updateProfile.mutate(data);
}
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {showStatusModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-xs p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            {updateProfile.isPending ? (
              <>
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                  <Loader2 className="animate-spin text-indigo-600" size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Saving Changes</h3>
                <p className="text-sm text-slate-500 mt-1">Updating your school profile...</p>
              </>
            ) : updateProfile.isSuccess ? (
              <>
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="text-emerald-600" size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Success!</h3>
                <p className="text-sm text-slate-500 mt-1">Profile updated successfully.</p>
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Building2 size={20} /></div>
            <div>
              <h1 className="text-xl font-bold">Institute Profile</h1>
              <p className="text-xs text-slate-500 font-medium">Manage branding and identity</p>
            </div>
          </div>
          <button 
            onClick={handleSave}
            disabled={updateProfile.isPending}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg disabled:opacity-70"
          >
            {updateProfile.isPending ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                {/* <Fingerprint size={18} className="text-indigo-500" /> Core Identity */}
              </h2>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${formData.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                {formData.isActive ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                {formData.isActive ? "Active" : "Inactive"}
              </div>
            </div>
            
            <div className="p-6 space-y-6">
                {/* LOGO  */}
                <div className="gap-6 p-4 bg-slate-50 rounded-xl  border-slate-300 items-center justify-center flex flex-col">
                    <div className="relative group shrink-0">
                        <div className="w-46 h-46 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
                            {formData.logoUrl ? (
                                <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <Building2 className="text-slate-300" size={32} />
                            )}
                        </div>
                        <label className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer text-[10px] font-bold">
                            <Camera size={20} className="mb-1" />
                            CHANGE
                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        </label>
                    </div>

                    <div>
                       <label className="cursor-pointer px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                                Upload New Logo
                                <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                       </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase">School ID</label>
                        <input type="text" value={formData.school_id} disabled className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-500 cursor-not-allowed" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Official Name</label>
                        <input type="text" name="instituteName" value={formData.instituteName} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                    </div>
                </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2"><MapPin size={18} className="text-emerald-500" /> Location & Contact</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Physical Address</label>
                    <textarea name="address" rows={2} value={formData.address} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none resize-none" />
                </div>
            </div>
          </section>
        </div>

        {/* --- PREVIEW --- */}
        <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Public Preview</h3>
                </div>

                <div className="bg-white rounded-4xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden relative group pb-8">
                    <div className="h-32 bg-gradient-to-br from-indigo-600 to-violet-600 relative">
                        <div className="absolute -bottom-12 left-0 right-0 flex justify-center">
                            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md border-4 border-white">
                                <div className="w-full h-full rounded-full bg-slate-50 overflow-hidden flex items-center justify-center border border-slate-100">
                                     {formData.logoUrl ? (
                                        <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <Building2 className="text-slate-300" size={32} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-14 px-6 text-center">
                        <h2 className="text-lg font-black text-slate-900 leading-tight">
                            {formData.instituteName || "School Name"}
                        </h2>
                        
                        <div className="mt-4 flex justify-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${formData.isActive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                                {formData.isActive ? "Active" : "Inactive"}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-500">
                                {formData.school_id}
                            </span>
                        </div>
                        
                        <div className="mt-8 space-y-4 text-left">
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100/50">
                                <div className="mt-0.5 flex justify-center"><MapPin size={16} className="text-indigo-500" /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Address</p>
                                    <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                                        {formData.address || "No address provided"}, {formData.country}
                                    </p>
                                </div>
                            </div>

                             <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100/50">
                                <div className="mt-0.5 flex justify-center"><Mail size={16} className="text-emerald-500" /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Official Email</p>
                                    <p className="text-xs font-semibold text-slate-700">{formData.email || "N/A"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100/50">
                                <div className="mt-0.5 flex justify-center"><Phone size={16} className="text-orange-500" /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Phone Support</p>
                                    <p className="text-xs font-semibold text-slate-700">{formData.phone || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}