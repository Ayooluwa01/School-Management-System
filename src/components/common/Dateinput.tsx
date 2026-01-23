import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";







export function DateInput({ label, selected, onChange,minDate }: any) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="text-[9px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 z-10" size={18} />
        <DatePicker
        disabled={false}
          selected={selected}
          onChange={onChange}
          minDate={minDate}
          placeholderText="-- / -- / ----"
          dateFormat="dd/MM/yyyy"
          className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl sm:rounded-2xl pl-11 py-3.5 sm:py-4 text-zinc-900 text-sm font-semibold outline-none focus:bg-white focus:border-indigo-600 transition-all cursor-pointer"
        />
      </div>
    </div>
  );
}