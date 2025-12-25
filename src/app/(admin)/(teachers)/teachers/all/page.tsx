"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/Reusables/pageHeader";
import { Toolbox } from "../clientcomponents/Clientcomponents";
import { TeacherList, TeacherType } from "@/components/common/Reusables/Teacherlist";

export default function Allteachers() {
  // --- MOCK DATA FOR DEMO ---
  const [teachers, setTeachers] = useState<TeacherType[]>([
    {
      teacher_id: 1,
      name: "Mr. Samson Okoro",
      email: "samson@school.com",
      phone: "+234 801 234 5678",
      subjects: ["Mathematics", "Further Math","Mathematics", "Further Math","Mathematics", "Further Math","Mathematics", "Further Math"],
      classes: ["SSS 3", "SSS 2"],
      status: "Active",
    },
    {
      teacher_id: 2,
      name: "Mrs. Sarah James",
      email: "sarah.j@school.com",
      phone: "+234 809 987 6543",
      subjects: ["English Language", "Literature"],
      classes: ["JSS 1", "JSS 2", "JSS 3"],
      status: "Active",
    },
    {
      teacher_id: 3,
      name: "Mr. David Lee",
      email: "d.lee@school.com",
      phone: "+234 705 555 1212",
      subjects: ["Physics"],
      classes: ["SSS 1"],
      status: "On Leave",
    },
  ]);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Logic to slice data for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeachers = teachers.slice(startIndex, endIndex);

  // --- HANDLERS ---
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      setTeachers((prev) => prev.filter((t) => t.teacher_id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto antialiased space-y-6">
      {/* PAGE HEADER */}
      <PageHeader
        Directory="Teachers Directory"
        text="Manage and view all registered teachers"
      />

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* TOOLBOX (Search, Filter, etc.) */}
        <Toolbox />

        {/* LIST COMPONENT */}
        <TeacherList
          teachers={currentTeachers}
          handleDelete={handleDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(teachers.length / itemsPerPage)}
          totalCount={teachers.length}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </div>
    </div>
  );
}