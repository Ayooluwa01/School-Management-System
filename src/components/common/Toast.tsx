"use client";
import React from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import { X, AlertCircle, CheckCircle2, Info, RotateCcw } from "lucide-react";

const CustomToast = ({ 
  title, 
  message, 
  type = "info", 
  onRetry, 
  closeToast 
}: any) => {
  
  const iconMap = {
    success: <CheckCircle2 className="text-emerald-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <Info className="text-indigo-500" size={20} />,
  };

  return (
    <div className="flex items-start gap-4 p-1">
      <div className="mt-0.5">{iconMap[type as keyof typeof iconMap]}</div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-zinc-800 leading-none mb-1">
          {title}
        </h4>
        <p className="text-xs text-zinc-500 leading-relaxed">
          {message}
        </p>
        
        {/* Actions Row */}
        <div className="flex items-center gap-3 mt-3">
          {onRetry && (
            <button 
              onClick={(e) => { e.stopPropagation(); onRetry(); }}
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-600 hover:text-indigo-700"
            >
              <RotateCcw size={12} /> Retry
            </button>
          )}
          <button 
            onClick={closeToast}
            className="text-[10px] font-black uppercase tracking-wider text-zinc-400 hover:text-zinc-600"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export const notify = {
  success: (title: string, message: string) => 
    toast(({ closeToast }) => (
      <CustomToast type="success" title={title} message={message} closeToast={closeToast} />
    )),
    
  error: (title: string, message: string, onRetry?: () => void) => 
    toast(({ closeToast }) => (
      <CustomToast type="error" title={title} message={message} onRetry={onRetry} closeToast={closeToast} />
    )),

  info: (title: string, message: string) => 
    toast(({ closeToast }) => (
      <CustomToast type="info" title={title} message={message} closeToast={closeToast} />
    )),
};

// 3. Styled Container Component
export function ToastProvider() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={false}
      hideProgressBar
      newestOnTop
      
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastClassName={() => 
        "relative flex p-4 mb-4 min-h-10 z-50 rounded-2xl bg-white border border-zinc-100 shadow-xl shadow-zinc-200/50 cursor-default overflow-hidden"
      }
      className={() => "text-sm font-white block p-0 w-full"}
      closeButton={false} 
    />
  );
}