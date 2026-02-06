"use client";

import React, { useState } from "react";
import { 
  Plus, X, Trash2, Loader2, Edit3, 
  Wallet, Calendar, GraduationCap, Banknote, 
  AlertCircle, Layout
} from "lucide-react";
import { useFeeService, useClasses, useSession_Terms } from "../../../../../../hooks/useSchool";

export default function FeeManagementSystem() {
  const { structures, isLoading, isError, createFee, deleteFee, updateFee } = useFeeService() as any;
  const { classes } = useClasses();
  const { data: sessionData } = useSession_Terms();
  
  const terms = sessionData?.flatMap((session: any) => 
    session.terms.map((t: any) => ({ ...t, sessionName: session.name }))
  ) || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", class_id: "", term_id: "", amount: "" });

  // --- CURRENCY FORMATTING LOGIC ---
  const formatDisplayAmount = (val: string) => {
    if (!val) return "";
    const number = parseFloat(val.replace(/,/g, ""));
    if (isNaN(number)) return "";
    return number.toLocaleString();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove everything except numbers
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setForm({ ...form, amount: rawValue });
  };

  const handleOpenModal = (fee?: any) => {
    if (fee) {
      setEditingId(fee.fee_structure_id);
      setForm({
        name: fee.type_name,
        class_id: fee.class_id,
        term_id: fee.term_id,
        amount: fee.amount.toString()
      });
    } else {
      setEditingId(null);
      setForm({ name: "", class_id: "", term_id: "", amount: "" });
    }
    setIsModalOpen(true);
  };

const handleSave = () => {
    if (!form.name || !form.amount) {
      alert("Please enter a name and amount");
      return;
    }

    const sanitizedPayload = {
      ...form,
      amount: parseInt(form.amount),
      class_id: form.class_id || null, // Convert "" to null
      term_id: form.term_id || null    // Convert "" to null
    };

    if (editingId) {
      updateFee.mutate({ id: editingId, payload: sanitizedPayload }, {
        onSuccess: () => setIsModalOpen(false)
      });
    } else {
      createFee.mutate(sanitizedPayload, {
        onSuccess: () => setIsModalOpen(false)
      });
    }
  };
  return (
    <div className="min-h-screen bg-[#F4F7FE] text-slate-900 pb-20">
      {/* Header & Stats (unchanged from previous clean design) */}
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 h-20 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200 text-white">
               <Banknote size={20} />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-slate-800">Fee Configurator</h1>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <Plus size={18} /> New Fee
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* --- GRID VIEW --- */}
        {isLoading ? (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
             {[1,2,3].map(i => <div key={i} className="h-44 bg-slate-200/50 rounded-3xl" />)}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {structures?.map((fee: any) => (
              <div key={fee.fee_structure_id} className="bg-white border border-slate-200/60 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Wallet size={20} />
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleOpenModal(fee)} className="p-2 text-slate-400 hover:text-indigo-600"><Edit3 size={16}/></button>
                    <button onClick={() => deleteFee.mutate(fee.fee_structure_id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-slate-800 text-lg">{fee.type_name}</h3>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase">{fee.class_name} • {fee.term_name}</p>
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-900">₦{Number(fee.amount).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- SEMI-TRANSPARENT BLUR MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          
          {/* Modal Card */}
          <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{editingId ? "Edit Fee" : "Add Fee"}</h2>
                <p className="text-sm text-slate-500 font-medium">Configure structure for the term</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/50 rounded-full text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 pt-4 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Label</label>
                <input 
                  type="text"
                  placeholder="e.g. Tuition Fee"
                  className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl font-semibold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Class</label>
                    <select 
                      className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl font-semibold outline-none focus:border-indigo-500"
                      value={form.class_id}
                      onChange={e => setForm({...form, class_id: e.target.value})}
                    >
                      <option value="">Select...</option>
                      {classes?.map((c: any) => <option key={c.class_id} value={c.class_id}>{c.class_code}</option>)}
                    </select>
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Term</label>
                    <select 
                      className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl font-semibold outline-none focus:border-indigo-500"
                      value={form.term_id}
                      onChange={e => setForm({...form, term_id: e.target.value})}
                    >
                      <option value="">Select...</option>
                      {terms?.map((t: any) => <option key={t.term_id} value={t.term_id}>{t.term_name}</option>)}
                    </select>
                 </div>
              </div>

              {/* AMOUNT INPUT WITH COMMA FORMATTING */}
              <div className="pt-2">
                <div className="bg-slate-900/90 rounded-3xl p-6 shadow-xl border border-slate-800">
                  <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block mb-2">Amount (Naira)</label>
                  <div className="relative flex items-center">
                    <span className="text-3xl font-black text-white/30 mr-2">₦</span>
                    <input 
                      type="text" // Use text to allow formatting
                      placeholder="0"
                      className="bg-transparent text-3xl font-black text-white outline-none w-full placeholder:text-white/10"
                      value={formatDisplayAmount(form.amount)}
                      onChange={handleAmountChange}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 italic font-medium">Commas are for display only. Only positive numbers allowed.</p>
                </div>
              </div>
            </div>

            <div className="p-8 pt-0 flex gap-4">
               <button 
                onClick={handleSave}
                disabled={createFee.isPending || updateFee?.isPending}
                className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center"
               >
                {createFee.isPending || updateFee?.isPending ? <Loader2 className="animate-spin" /> : editingId ? 'Update Structure' : 'Confirm & Save'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}