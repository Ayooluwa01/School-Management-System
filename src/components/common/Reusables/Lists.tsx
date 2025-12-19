"use client";

import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ListProps {
  currentStudents: any[];
  handleDelete: (id: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalCount: number;
  startIndex: number;
  endIndex: number;
}

export function List({
  currentStudents,
  handleDelete,
  currentPage,
  setCurrentPage,
  totalPages,
  totalCount,
  startIndex,
  endIndex,
}: ListProps) {
    const router = useRouter();

  return (
    <div className="overflow-x-auto">
      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="px-4 py-3">Admission No</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Class</th>
            <th className="px-4 py-3 text-center">Sex</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {currentStudents.map((student) => (
            <tr
              key={student.student_id}
              className="hover:bg-gray-50 transition cursor-pointer"
               onClick={() =>
    router.push(`/students/profile/${student.admission_no}`)
               }>
              <td className="px-4 py-3">{student.admission_no}</td>
              <td className="px-4 py-3 font-medium">{student.name}</td>
              <td className="px-4 py-3">{student.class_id}</td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                  ${
                    student.sex === "Male"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-pink-100 text-pink-700"
                  }`}
                >
                  {student.sex}
                </span>
              </td>

              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-3">
                  <button className="text-gray-500 hover:text-blue-600">
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(student.student_id)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t bg-gray-50">
        {/* Showing info */}
        <p className="text-xs text-gray-600">
          Showing <strong>{startIndex + 1}</strong> to{" "}
          <strong>{Math.min(endIndex, totalCount)}</strong> of{" "}
          <strong>{totalCount}</strong> students
        </p>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 rounded border disabled:opacity-40 hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="px-3 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 rounded border disabled:opacity-40 hover:bg-gray-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
