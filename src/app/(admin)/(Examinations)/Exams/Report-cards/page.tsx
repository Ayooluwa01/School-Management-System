"use client";
import React, { useState, useEffect, useMemo } from "react";
import { 
  Download, 
  Users, 
  Search, 
  Layers, 
  Loader2,
  AlertCircle
} from "lucide-react";
import api from "../../../../../../libs/axios";

export default function ClassResultsPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get('/class/all_classes');
        const mappedData = response.data.map((item: any) => ({
          id: item.class_id,
          name: item.class_name, 
          arm: item.arm,         
                    category: item.class_name.includes("SSS") ? "Senior" : "Junior",
          students: Math.floor(Math.random() * (45 - 20 + 1) + 20), 
          teacher: "Class Teacher"
        }));

        setClasses(mappedData);
      } catch (err) {
        console.error(err);
        setError("Could not load class list. Is the backend running?");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleDownload = async (id: number, className: string, arm: string) => {
    setDownloadingId(id);
    try {
    
      const response = await api.get(`/class/result_download/${id}`, {
        responseType: 'blob', 
      });

 const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `student_${className}_${arm}_result.pdf`
    );
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);  
      
    } catch (err) {
      console.error("Download error:", err);
      alert("Error downloading result. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const filteredClasses = useMemo(() => {
    return classes.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.arm.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "All" || item.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter, classes]);

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-zinc-900 font-sans pb-20 selection:bg-indigo-100">
      
      {/* --- HEADER --- */}
      <div className="bg-white border-b border-zinc-100 px-6 md:px-12 py-8 sticky top-0 z-20 bg-opacity-90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
               <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Academic Records</span>
            </div>
            <div className="flex flex-row gap-2">
 <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">TM</div>

            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Terminal Results</h1>
            </div>
                        
            <p className="text-sm text-zinc-500 mt-2 max-w-md">Generate and export comprehensive PDF report cards for entire classes.</p>
          </div>
          
          <div className="flex items-center gap-3 animate-in slide-in-from-right-2 duration-500">
            <div className="relative group w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search class..."
                className="pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full md:w-72 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        
        {error && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600 mb-8">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="flex items-center gap-8 mb-10 border-b border-zinc-100">
            {["All", "Junior", "Senior"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                  filter === type ? "text-indigo-600" : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {type} School
                {filter === type && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
             {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in zoom-in-95 duration-500">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => (
                <ClassCard 
                  key={cls.id} 
                  cls={cls} 
                  isDownloading={downloadingId === cls.id}
                  onDownload={() => handleDownload(cls.id, cls.name, cls.arm)}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
               <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-zinc-300" />
                 </div>
                 <p className="text-zinc-500 font-medium">No classes found matching &quot;{searchTerm}&quot;</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


function ClassCard({ cls, onDownload, isDownloading }: { cls: any, onDownload: () => void, isDownloading: boolean }) {
  return (
    <div className="group bg-white border border-zinc-200 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-200 transition-all duration-300">
              <Layers size={20} />
           </div>
           <div>
              <h3 className="text-xl font-bold text-zinc-900 leading-none flex items-center gap-2">
                {cls.name} <span className="px-2 py-0.5 bg-zinc-100 rounded text-[10px] text-zinc-500 font-bold border border-zinc-200">{cls.arm}</span>
              </h3>
              <p className="text-[10px] text-zinc-400 font-bold mt-1.5 uppercase tracking-widest">{cls.category} Division</p>
           </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 border-t border-dashed border-zinc-100 mb-6">
         <div className="flex items-center gap-2">
            <Users size={14} className="text-zinc-400" />
            <span className="text-xs font-semibold text-zinc-600">Students :</span>
         </div>
      </div>

      <button 
        onClick={onDownload}
        disabled={isDownloading}
        className="w-full flex items-center justify-center gap-2 py-4 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 disabled:bg-zinc-100 disabled:text-zinc-400 transition-all active:scale-[0.98] shadow-lg shadow-zinc-200"
      >
         {isDownloading ? (
           <>
            <Loader2 size={16} className="animate-spin" /> Generating PDF...
           </>
         ) : (
           <>
            <Download size={16} /> Download Result Sheets
           </>
         )}
      </button>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-zinc-100 rounded-2xl p-6">
      <div className="flex gap-4 mb-6">
        <div className="w-12 h-12 bg-zinc-100 rounded-2xl animate-pulse" />
        <div className="space-y-2">
           <div className="w-24 h-5 bg-zinc-100 rounded animate-pulse" />
           <div className="w-16 h-3 bg-zinc-50 rounded animate-pulse" />
        </div>
      </div>
      <div className="w-full h-8 bg-zinc-50 rounded-lg mb-6 animate-pulse" />
      <div className="w-full h-12 bg-zinc-100 rounded-xl animate-pulse" />
    </div>
  );
}