"use client";
import React from "react";

const topStudents = [
  {
    id: 1,
    name: "Adebayo Samuel",
    age: 14,
    class: "JSS 3A",
    average: 92,
  },
  {
    id: 2,
    name: "Blessing Okorie",
    age: 15,
    class: "SS 1B",
    average: 90,
  },
  {
    id: 3,
    name: "Ibrahim Musa",
    age: 16,
    class: "SS 2A",
    average: 88,
  },
  {
    id: 4,
    name: "Esther Johnson",
    age: 14,
    class: "JSS 2C",
    average: 87,
  },
  {
    id: 5,
    name: "Daniel Olatunji",
    age: 15,
    class: "SS 1A",
    average: 86,
  },
];

export default function TopStudentsList() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 max-h-[500px] flex flex-col">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">
        Top Students
      </h3>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar ">
        {topStudents.map((student, index) => (
          <div
            key={student.id}
            className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">
                {index + 1}. {student.name}
              </p>
              <p className="text-xs text-gray-500">
                Age: {student.age} · Class: {student.class}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-green-700">
                {student.average}%
              </p>
              <p className="text-xs text-gray-500">Average</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
