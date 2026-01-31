/* eslint-disable @next/next/no-img-element */
"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import {
  Edit2, Trash2, ChevronLeft, ChevronRight,
  User, Briefcase, Phone, Mail, MapPin,
  Calendar, X, Save
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// --- TYPES ---
interface Staff {
  staff_id: string;
  school_id: string;
  user_id: string;
  staff_code: string;
  surname: string;
  first_name: string;
  other_names?: string | null;
  sex: string;
  date_of_birth: string;
  marital_status: string;
  address: string;
  phone: string;
  email: string;
  highest_qualification?: string;
  years_of_experience?: number;
  primary_subject?: string | null;
  secondary_subject?: string | null;
  role: string;
  date_of_appointment: string;
  employment_status: "Permanent" | "Contract" | "Temporary";
  created_at: string;
  profile_pic?: string;
}

interface StaffListProps {
  currentStaff: Staff[];
  handleDelete: (id: string) => void;
  handleUpdate: (staff: Staff) => Promise<void>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalCount: number;
  startIndex: number;
  endIndex: number;
}

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  className = ""
}: {
  label: string;
  value: any;
  onChange?: (e: any) => void;
  type?: string;
  disabled?: boolean;
  className?: string;
}) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
      {label}
    </label>
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-all duration-200
        ${disabled
          ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
          : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        }`}
    />
  </div>
);

const FormSelect = ({
  label,
  value,
  onChange,
  options,
  className = ""
}: {
  label: string;
  value: any;
  onChange: (e: any) => void;
  options: string[];
  className?: string;
}) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
      {label}
    </label>
    <div className="relative">
      <select
        value={value || ""}
        onChange={onChange}
        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      >
        <option value="">Select Option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

function FormGroup({ label, children, className = "" }: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    "Permanent": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Contract": "bg-blue-50 text-blue-700 border-blue-100",
    "Temporary": "bg-amber-50 text-amber-700 border-amber-100",
  };
  const currentStyle = styles[status] || styles["Permanent"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${currentStyle}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${status === "Permanent" ? "bg-emerald-500" : "bg-current"}`} />
      {status}
    </span>
  );
}

export function StaffList({
  currentStaff,
  handleDelete,
  handleUpdate,
  currentPage,
  setCurrentPage,
  totalPages,
  totalCount,
  startIndex,
  endIndex,
}: StaffListProps) {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const [isSaving, setIsSaving] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  // 1. OPEN MODAL
  const handleEditClick = (staff: Staff) => {
    setEditingStaff({ ...staff });
    openModal();
  };

  // 2. SAVE HANDLER
  const handleSave = async () => {
    if (!editingStaff) return;

    setIsSaving(true);
    try {
      await handleUpdate(editingStaff);
      closeModal();
    } catch (error: any) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof Staff, value: any) => {
    if (editingStaff) {
      setEditingStaff({ ...editingStaff, [field]: value });
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      {/* --- TABLE SECTION --- */}
      <table className="w-full text-sm">
        <thead className="bg-gray-50/50 text-gray-500 font-semibold border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left">Staff Member</th>
            <th className="px-4 py-4 text-left">Staff No</th>
            <th className="px-4 py-4 text-left">Role</th>
            <th className="px-4 py-4 text-center">Status</th>
            <th className="px-4 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {currentStaff.map((staff: Staff) => {
            const fullName = `${staff.surname} ${staff.first_name} ${staff.other_names || ''}`.trim();
            const initials = `${staff.surname[0]}${staff.first_name[0]}`.toUpperCase();
            const avatarUrl = staff.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&color=fff&bold=true`;

            return (
              <tr key={staff.staff_id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-6 py-3">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => router.push(`/staff/${staff.staff_id}`)}
                  >
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                      {staff.profile_pic ? (
                        <img src={avatarUrl} alt={fullName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                          {initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors uppercase">
                        {fullName}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                        <Mail size={10} />
                        {staff.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-gray-600 font-medium font-mono text-xs">{staff.staff_code}</td>

                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-gray-700 font-medium">{staff.role}</span>
                    {staff.highest_qualification && (
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{staff.highest_qualification}</span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3 text-center">
                  <StatusBadge status={staff.employment_status || "Permanent"} />
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      onClick={() => handleEditClick(staff)}
                      title="Edit Staff"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(staff.staff_id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Staff"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* --- PAGINATION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 border-t bg-gray-50/30">
        <p className="text-xs font-medium text-gray-500">
          Showing <span className="font-bold text-gray-900">{startIndex}</span> - <span className="font-bold text-gray-900">{Math.min(endIndex, totalCount)}</span> of <span className="font-bold text-gray-900">{totalCount}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border bg-white text-xs font-semibold text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ChevronLeft size={14} /> Previous
          </button>

          <div className="flex items-center gap-1 bg-white border px-2 py-1 rounded-lg shadow-sm">
            <span className="text-xs font-bold text-blue-600">
              {currentPage} / {totalPages}
            </span>
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border bg-white text-xs font-semibold text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-all shadow-sm"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[900px] w-[95vw] h-full m-auto p-0 rounded-2xl shadow-2xl overflow-auto flex flex-col bg-white"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Briefcase size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 leading-tight">Edit Staff Record</h3>
              <p className="text-xs text-gray-500 font-bold uppercase">ID: {editingStaff?.staff_code}</p>
            </div>
          </div>
          <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">

          {/* Personal Info Section */}
          <section className="space-y-4">
            <div className="border-b border-gray-100 pb-2 flex items-center gap-2">
              <User size={14} className="text-blue-600" />
              <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Personal Information</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormInput
                label="Surname"
                value={editingStaff?.surname}
                onChange={(e: any) => updateField('surname', e.target.value)}
              />
              <FormInput
                label="First Name"
                value={editingStaff?.first_name}
                onChange={(e: any) => updateField('first_name', e.target.value)}
              />
              <FormInput
                label="Other Names"
                value={editingStaff?.other_names}
                onChange={(e: any) => updateField('other_names', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Email Address"
                value={editingStaff?.email}
                onChange={(e: any) => updateField('email', e.target.value)}
                type="email"
              />
              <FormInput
                label="Phone Number"
                value={editingStaff?.phone}
                onChange={(e: any) => updateField('phone', e.target.value)}
              />
              <FormSelect
                label="Gender"
                value={editingStaff?.sex}
                onChange={(e: any) => updateField('sex', e.target.value)}
                options={["Male", "Female"]}
              />
              <FormSelect
                label="Marital Status"
                value={editingStaff?.marital_status}
                onChange={(e: any) => updateField('marital_status', e.target.value)}
                options={["Single", "Married", "Divorced", "Widowed"]}
              />
            </div>
          </section>

          {/* Employment Section */}
          <section className="space-y-4">
            <div className="border-b border-gray-100 pb-2 flex items-center gap-2">
              <Briefcase size={14} className="text-purple-600" />
              <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Employment Details</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Staff Code"
                value={editingStaff?.staff_code}
                disabled={true}
              />
              <FormSelect
                label="Role"
                value={editingStaff?.role}
                onChange={(e: any) => updateField('role', e.target.value)}
                options={["Teacher", "Principal", "Bursar", "Administrator", "Librarian", "Lab Assistant"]}
              />
              <FormSelect
                label="Employment Status"
                value={editingStaff?.employment_status}
                onChange={(e: any) => updateField('employment_status', e.target.value)}
                options={["Permanent", "Contract", "Temporary"]}
              />
              <FormInput
                label="Highest Qualification"
                value={editingStaff?.highest_qualification}
                onChange={(e: any) => updateField('highest_qualification', e.target.value)}
              />
              <FormInput
                label="Years of Experience"
                value={editingStaff?.years_of_experience}
                onChange={(e: any) => updateField('years_of_experience', parseInt(e.target.value) || 0)}
                type="number"
              />
              <FormInput
                label="Primary Subject"
                value={editingStaff?.primary_subject}
                onChange={(e: any) => updateField('primary_subject', e.target.value)}
              />
              <FormInput
                label="Secondary Subject"
                value={editingStaff?.secondary_subject}
                onChange={(e: any) => updateField('secondary_subject', e.target.value)}
              />
            </div>
          </section>

          {/* Address Section */}
          <section className="space-y-4 bg-gray-50 p-5 rounded-xl">
            <div className="border-b border-gray-200 pb-2 flex items-center gap-2">
              <MapPin size={14} className="text-green-600" />
              <h4 className="text-[11px] font-black uppercase text-gray-500 tracking-widest">Address</h4>
            </div>
            <FormGroup label="Residential Address">
              <textarea
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                rows={3}
                value={editingStaff?.address || ""}
                onChange={(e) => updateField('address', e.target.value)}
              />
            </FormGroup>
          </section>

        </div>

        {/* FOOTER */}
        <div className="px-8 py-5 border-t bg-gray-50 flex items-center justify-between shrink-0">
          <button onClick={closeModal} className="text-sm font-bold text-gray-400 hover:text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
}