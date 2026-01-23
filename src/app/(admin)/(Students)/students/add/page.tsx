"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { User, Users, Save, Camera, ChevronDown, Info, Calendar } from "lucide-react";
import axios from "../../../../../../libs/axios"; 
import { SaveModal } from "@/components/common/Reusables/Preloader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GENDER_OPTIONS = ["Male", "Female"];
const INITIAL_STATE = {
  first_name: "", last_name: "", class_id: "", date_of_birth: "", 
  gender: "", nationality: "Nigerian", religion: "", address: "", 
  blood_group: "", genotype: "", state_of_origin: "", lga: "",
  fathers_name: "", fathers_number: "", mothers_name: "", mothers_number: ""
};

const FormField = ({ label, name, type = "text", options, onChange, placeholder, fullWidth, value }: any) => (
  <div className={`flex flex-col gap-1 ${fullWidth ? "col-span-full" : ""}`}>
    <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-tight">{label}</label>
    <div className="relative">
      {type === "select" ? (
        <>
          <select 
            name={name} 
            onChange={onChange}
            className="w-full h-9 px-3 bg-white border border-zinc-300 rounded text-sm focus:outline-none focus:border-blue-600 appearance-none cursor-pointer"
          >
            <option value="">Select...</option>
            {options?.map((opt: any, i: number) => (
              <option key={i} value={typeof opt === 'object' ? opt.value : opt}>
                {typeof opt === 'object' ? opt.label : opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-2.5 text-zinc-400 pointer-events-none" size={14} />
        </>
      ) : (
        <input 
          type={type} 
          name={name} 
          placeholder={placeholder}
          onChange={onChange}
          className="w-full h-9 px-3 bg-white border border-zinc-300 rounded text-sm focus:outline-none focus:border-blue-600 placeholder:text-zinc-300" 
        />
      )}
    </div>
  </div>
);

export default function RegisterStudent() {
  const [activeTab, setActiveTab] = useState("personal");
  const [classes, setClasses] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const formRef = useRef(INITIAL_STATE);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("/class/all_classes");
        if (Array.isArray(response.data)) setClasses(response.data);
      } catch (e) { console.error(e); }
    };
    fetchClasses();
  }, []);

  const handleInputChange = useCallback((e: any) => {
    formRef.current = { ...formRef.current, [e.target.name]: e.target.value };
  }, []);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
        const formatted = date.toISOString().split('T')[0];
        formRef.current = { ...formRef.current, date_of_birth: formatted };
    }
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await axios.post("/students/register", formRef.current);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (e) { 
        setSaveStatus('error'); 
        setTimeout(() => setSaveStatus('idle'), 2500); 
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <SaveModal status={saveStatus} />

      {/* --- HEADER --- */}
      <div className="border-b border-zinc-200  top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center text-white text-xs font-bold bg-blue-600 shadow-md">E</div>
            <h1 className="text-sm font-bold uppercase tracking-tight">New Student Enrollment</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs font-medium text-zinc-500 hover:bg-zinc-100 px-3 py-1.5 rounded">Discard</button>
            <button 
              onClick={handleSave}
              className="bg-zinc-900 text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-2 hover:bg-zinc-800 transition-colors"
            >
              <Save size={14} /> SAVE RECORD
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* --- TABS --- */}
        <div className="flex border-b border-zinc-200 mb-6 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab("personal")}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === 'personal' ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
          >
            1. Student Info
          </button>
          <button 
            onClick={() => setActiveTab("guardian")}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === 'guardian' ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
          >
            2. Guardian Details
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {activeTab === 'personal' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField label="First Name" name="first_name" onChange={handleInputChange} />
                  <FormField label="Last Name" name="last_name" onChange={handleInputChange} />
                  <FormField label="Class" name="class_id" type="select" options={classes.map(c => ({value: c.class_id, label: c.class_code}))} onChange={handleInputChange} />
                  <FormField label="Gender" name="gender" type="select" options={GENDER_OPTIONS} onChange={handleInputChange} />
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-tight">Date of Birth</label>
                    <div className="relative">
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="YYYY-MM-DD"
                            className="w-full h-9 px-3 bg-white border border-zinc-300 z-40 rounded text-sm focus:outline-none focus:border-blue-600 placeholder:text-zinc-300"
                            wrapperClassName="w-full"
                        />
                        <Calendar className="absolute right-2 top-2.5 text-zinc-400 pointer-events-none" size={14} />
                    </div>
                  </div>

                  <FormField label="Nationality" name="nationality" placeholder="Nigerian" onChange={handleInputChange} />
                </div>

                <div className="pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField label="Home Address" name="address" fullWidth onChange={handleInputChange} />
                  <FormField label="State of Origin" name="state_of_origin" onChange={handleInputChange} />
                  <FormField label="LGA" name="lga" onChange={handleInputChange} />
                  <FormField label="Religion" name="religion" onChange={handleInputChange} />
                  <FormField label="Blood Group" name="blood_group" placeholder="e.g. O+" onChange={handleInputChange} />
                  <FormField label="Genotype" name="genotype" placeholder="e.g. AA" onChange={handleInputChange} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-zinc-200 rounded">
                  <h3 className="text-xs font-bold uppercase text-zinc-400 mb-4 flex items-center gap-2">
                    <User size={14}/> Father's Information
                  </h3>
                  <div className="space-y-4">
                    <FormField label="Full Name" name="fathers_name" onChange={handleInputChange} />
                    <FormField label="Phone Number" name="fathers_number" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="p-4 border border-zinc-200 rounded">
                  <h3 className="text-xs font-bold uppercase text-zinc-400 mb-4 flex items-center gap-2">
                    <User size={14}/> Mother's Information
                  </h3>
                  <div className="space-y-4">
                    <FormField label="Full Name" name="mothers_name" onChange={handleInputChange} />
                    <FormField label="Phone Number" name="mothers_number" onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --- SIDEBAR --- */}
          <div className="lg:col-span-1 space-y-4">
            <div className="border border-zinc-200 p-4 rounded text-center">
              <div className="w-24 h-24 border-2 border-dashed border-zinc-200 mx-auto mb-3 flex flex-col items-center justify-center text-zinc-400 hover:bg-zinc-50 cursor-pointer transition-colors">
                <Camera size={20} />
                <span className="text-[10px] font-bold mt-1 uppercase">Passport</span>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium">Click to upload photo</p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 p-4 rounded">
              <div className="flex items-center gap-2 text-zinc-600 mb-2">
                <Info size={14} />
                <span className="text-xs font-bold uppercase tracking-tighter">Information</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Double-check the Date of Birth and Contact numbers as these are used for official identification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}