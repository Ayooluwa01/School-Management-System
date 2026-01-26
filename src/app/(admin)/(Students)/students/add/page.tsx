"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { User, Users, Save, Camera, ChevronDown, Info, Calendar, FileUp, Download, FileText, X } from "lucide-react";
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

const FormField = ({ label, name, type = "text", options, onChange, placeholder, fullWidth }: any) => (
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      if (activeTab === 'batch' && selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await axios.post("/students/batch-register", formData);
      } else {
        await axios.post("/students/register", formRef.current);
      }
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
      <div className="border-b border-zinc-200 sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center text-white text-xs font-bold bg-blue-600">E</div>
            <h1 className="text-sm font-bold uppercase tracking-tight">Enrollment System</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs font-medium text-zinc-500 hover:bg-zinc-100 px-3 py-1.5 rounded">Discard</button>
            <button 
              onClick={handleSave}
              className="bg-zinc-900 text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-2 hover:bg-zinc-800 transition-colors"
            >
              <Save size={14} /> {activeTab === 'batch' ? 'UPLOAD FILE' : 'SAVE RECORD'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* --- TABS --- */}
        <div className="flex border-b border-zinc-200 mb-6 overflow-x-auto no-scrollbar">
          <button onClick={() => setActiveTab("personal")} className={`px-6 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === 'personal' ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}>1. Student Info</button>
          <button onClick={() => setActiveTab("guardian")} className={`px-6 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === 'guardian' ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}>2. Guardian Details</button>
          <button onClick={() => setActiveTab("batch")} className={`px-6 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === 'batch' ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}>3. Batch Upload</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {activeTab === 'personal' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField label="First Name" name="first_name" onChange={handleInputChange} />
                  <FormField label="Last Name" name="last_name" onChange={handleInputChange} />
                  <FormField label="Class" name="class_id" type="select" options={classes.map(c => ({value: c.class_id, label: c.class_code}))} onChange={handleInputChange} />
                  <FormField label="Gender" name="gender" type="select" options={GENDER_OPTIONS} onChange={handleInputChange} />
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-tight">Date of Birth</label>
                    <div className="relative">
                        <DatePicker selected={startDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd" placeholderText="YYYY-MM-DD" className="w-full h-9 px-3 bg-white border border-zinc-300 rounded text-sm focus:outline-none focus:border-blue-600 placeholder:text-zinc-300" wrapperClassName="w-full" />
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
            )}

            {activeTab === 'guardian' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                <div className="p-4 border border-zinc-200 rounded">
                  <h3 className="text-xs font-bold uppercase text-zinc-400 mb-4 flex items-center gap-2"><User size={14}/> Father's Information</h3>
                  <div className="space-y-4">
                    <FormField label="Full Name" name="fathers_name" onChange={handleInputChange} />
                    <FormField label="Phone Number" name="fathers_number" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="p-4 border border-zinc-200 rounded">
                  <h3 className="text-xs font-bold uppercase text-zinc-400 mb-4 flex items-center gap-2"><User size={14}/> Mother's Information</h3>
                  <div className="space-y-4">
                    <FormField label="Full Name" name="mothers_name" onChange={handleInputChange} />
                    <FormField label="Phone Number" name="mothers_number" onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'batch' && (
              <div className="animate-in fade-in duration-300">
                <div className="border-2 border-dashed border-zinc-200 rounded-lg p-10 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition-colors relative">
                  <input type="file" accept=".csv" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className={`p-4 rounded-full mb-4 ${selectedFile ? 'bg-green-100 text-green-600' : 'bg-zinc-200 text-zinc-500'}`}>
                    {selectedFile ? <FileText size={32} /> : <FileUp size={32} />}
                  </div>
                  <h3 className="text-sm font-bold text-zinc-700">
                    {selectedFile ? selectedFile.name : "Click or drag CSV file to upload"}
                  </h3>
                  
                  {selectedFile && (
                    <button onClick={(e) => {e.stopPropagation(); setSelectedFile(null);}} className="mt-4 text-[10px] font-bold text-red-500 uppercase flex items-center gap-1">
                      <X size={12}/> Remove File
                    </button>
                  )}
                </div>

{/* Preview upload csv file */}
                {/* <div className="mt-6 p-4 border border-blue-100 bg-blue-50/50 rounded flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <Download className="text-blue-600" size={18} />
                    <div>
                      <p className="text-xs font-bold text-zinc-800 uppercase tracking-tight">Need a template?</p>
                      <p className="text-[11px] text-zinc-500">Download the pre-formatted CSV structure to ensure a smooth upload.</p>
                    </div>
                  </div>
                  <button className="bg-white border border-blue-200 text-blue-600 text-[10px] font-bold px-4 py-2 rounded hover:bg-blue-50">
                    DOWNLOAD CSV
                  </button>
                </div> */}
              </div>
            )}
          </div>

          {/* --- SIDEBAR --- */}
          <div className="lg:col-span-1 space-y-4">
            <div className="border border-zinc-200 p-4 rounded text-center bg-white">
              <div className="w-20 h-20 border border-zinc-200 mx-auto mb-3 flex flex-col items-center justify-center text-zinc-400 bg-zinc-50 rounded">
                <Camera size={20} />
              </div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase">Passport Photo</p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 p-4 rounded">
              <div className="flex items-center gap-2 text-zinc-600 mb-2 font-bold uppercase text-xs">
                <Info size={14} /> Instructions
              </div>
              <ul className="text-[10px] text-zinc-500 space-y-2 leading-tight">
                {activeTab === 'batch' ? (
                  <>
                    <li>• Ensure columns match the template.</li>
                    <li>• Date format: YYYY-MM-DD.</li>
                    <li>• Phone numbers must start with 234 or 0.</li>
                  </>
                ) : (
                  <>
                    <li>• All red fields are mandatory.</li>
                    <li>• Use official names only.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}