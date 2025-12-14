import React from "react";
import { LogOut } from "lucide-react";

export default function SidebarLogout() {
  const handleLogout = () => {
    // TODO:
    // 1. Clear auth tokens (localStorage / cookies)
    // 2. Reset user state
    // 3. Redirect to login page
    console.log("User logged out");
  };

  return (
    <div className="mx-auto mb-6 w-full max-w-60 px-3">
      <button
        onClick={handleLogout}
        className="
          group flex w-full items-center justify-center gap-2
          rounded-xl border border-red-100 bg-red-50 px-4 py-3
          text-sm font-medium text-red-600
          transition-all duration-200
          hover:bg-red-600 hover:text-white
          dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400
          dark:hover:bg-red-500 dark:hover:text-white
        "
      >
        <LogOut
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}
