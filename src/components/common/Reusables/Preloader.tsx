



import { 
  User, Users, ArrowRight, Camera, ChevronDown, 
  Loader2, CheckCircle2, AlertCircle
} from "lucide-react";
export const SaveModal = ({ status }: { status: 'idle' | 'saving' | 'success' | 'error' }) => {
  if (status === 'idle') return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center text-center transform transition-all scale-100">
        
        {status === 'saving' && (
          <>
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">In progress...</h3>
            <p className="text-zinc-500 text-sm mt-2">Please wait hold on....</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 animate-in zoom-in duration-300">
              <CheckCircle2 className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">Registration Complete!</h3>
            <p className="text-zinc-500 text-sm mt-2">The action was successful.</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-red-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">Submission Failed</h3>
            <p className="text-zinc-500 text-sm mt-2">Please check your connection and try again.</p>
          </>
        )}
      </div>
    </div>
  );
};