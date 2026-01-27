"use client"
import { Download, FileText, FileUp, X } from "lucide-react";
import { useState } from "react";


export default function BatchUpload(){
      const [selectedFile, setSelectedFile] = useState<File | null>(null);
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

      return(
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
                <div className="mt-6 p-4 border border-blue-100 bg-blue-50/50 rounded flex items-center justify-between">
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
                </div>
              </div>
      )
             
           
}