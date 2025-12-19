"use client";
import React, { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Bell,
  Info,
  ChevronRight,
  SendHorizontal,
  Megaphone
} from "lucide-react"; 

const notifications = [
  { id: 1, title: "New Student Registered", message: "John Doe was added to JSS 2A", time: "2 mins ago", type: "info" },
  { id: 2, title: "Fee Payment", message: "₦45,000 school fees paid by Mary A.", time: "1 hour ago", type: "success" },
  { id: 3, title: "Attendance Alert", message: "SS3B attendance dropped below 75%", time: "Today", type: "warning" },
  { id: 4, title: "Exam Uploaded", message: "Mathematics mid-term results uploaded", time: "Yesterday", type: "info" },
];

const config: Record<string, { icon: React.ReactNode; bg: string; text: string }> = {
  info: { icon: <Info size={16} />, bg: "bg-blue-50", text: "text-blue-600" },
  success: { icon: <CheckCircle2 size={16} />, bg: "bg-emerald-50", text: "text-emerald-600" },
  warning: { icon: <AlertCircle size={16} />, bg: "bg-amber-50", text: "text-amber-600" },
};

export default function NotificationsPanel() {
  const [announcement, setAnnouncement] = useState("");

  const handleSend = () => {
    if (!announcement.trim()) return;
    setAnnouncement(""); 
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col h-[480px]">
      {/* HEADER */}
      <div className="p-4 border-b border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gray-50 rounded-lg">
            <Bell size={18} className="text-gray-600" />
          </div>
          <h3 className="text-sm font-bold text-gray-800 tracking-tight">Notice Board</h3>
        </div>
       
      </div>

      {/* NOTIFICATION LIST  */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {notifications.map((item, index) => (
          <div
            key={item.id}
            className={`group relative flex gap-4 p-4 transition-colors hover:bg-gray-50 cursor-pointer ${
              index !== notifications.length - 1 ? "border-b border-gray-50" : ""
            }`}
          >
            <div className="flex flex-col items-center shrink-0">
              <div className={`p-2 rounded-xl ${config[item.type].bg} ${config[item.type].text} shadow-sm`}>
                {config[item.type].icon}
              </div>
              {index !== notifications.length - 1 && <div className="w-px h-full bg-gray-100 mt-2" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-0.5">
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate pr-4">
                  {item.title}
                </h4>
                <span className="text-[10px] font-medium text-gray-400">{item.time}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE ANNOUNCEMENT BOX */}
      <div className="p-4 bg-gray-50/80 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Megaphone size={14} className="text-blue-600" />
          <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Quick Announcement</span>
        </div>
        
        <div className="relative group">
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Type a message to all students/staff..."
            className="w-full pl-3 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-sm"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={!announcement.trim()}
            className={`absolute right-2 bottom-2 p-2 rounded-lg transition-all ${
              announcement.trim() 
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md scale-100" 
                : "bg-gray-100 text-gray-400 scale-90 cursor-not-allowed"
            }`}
          >
            <SendHorizontal size={16} />
          </button>
        </div>
        <p className="mt-2 text-[10px] text-gray-400 text-center italic">
          Press send to broadcast this message immediately.
        </p>
      </div>
    </div>
  );
}