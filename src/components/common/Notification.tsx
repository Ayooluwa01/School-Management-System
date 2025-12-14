"use client";
import React from "react";
import {
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react"; 

const notifications = [
  {
    id: 1,
    title: "New Student Registered",
    message: "John Doe was added to JSS 2A",
    time: "2 mins ago",
    type: "info",
  },
  {
    id: 2,
    title: "Fee Payment",
    message: "₦45,000 school fees paid by Mary A.",
    time: "1 hour ago",
    type: "success",
  },
  {
    id: 3,
    title: "Attendance Alert",
    message: "SS3B attendance dropped below 75%",
    time: "Today",
    type: "warning",
  },
  {
    id: 4,
    title: "Exam Uploaded",
    message: "Mathematics mid-term results uploaded",
    time: "Yesterday",
    type: "info",
  },
];

const typeIcon: Record<
  string,
  { icon: React.ReactNode; color: string }
> = {
  info: { icon: <Info size={18} />, color: "text-blue-500" },
  success: { icon: <CheckCircle size={18} />, color: "text-green-500" },
  warning: { icon: <AlertTriangle size={18} />, color: "text-yellow-500" },
};

export default function NotificationsPanel() {
  return (
    <div className="rounded-2xl border border-gray-200  bg-white p-4 h-[320px] flex flex-col">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">
        Notice Board
      </h3>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-lg p-3 border border-gray-200 hover:shadow-lg transition transform hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <span className={typeIcon[item.type].color}>
                  {typeIcon[item.type].icon}
                </span>
                <p className="text-sm font-medium text-gray-800">{item.title}</p>
              </div>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
            <p className="text-xs text-gray-600">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
