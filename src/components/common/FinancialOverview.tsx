"use client";
import React from "react";
import { ArrowUp, ArrowDown, DollarSign } from "lucide-react";

export default function FinancialOverview() {
  const financials = [
    {
      id: 1,
      title: "Total Income",
      amount: "₦0.00",
      icon: <ArrowUp size={20} />,
      iconColor: "text-green-500",
    },
    {
      id: 2,
      title: "Total Outcome",
      amount: "₦0.00",
      icon: <ArrowDown size={20} />,
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="rounded-2xl p-4 flex gap-4 flex-col md:flex-row bg-white">
      {financials.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4  border-gray-200 rounded-lg hover:shadow-lg transition transform hover:scale-[1.02] cursor-pointer flex-1"
        >
          <div className="flex items-center gap-3">
            <span className={`${item.iconColor}`}>{item.icon}</span>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500">{item.title}</span>
              <span className="text-lg font-semibold text-gray-800">{item.amount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
