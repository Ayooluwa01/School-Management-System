"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "../../zustand/store";
import { useSchoolProfile, useSession_Terms, useUserProfile } from "../../hooks/useSchool";
import { Menu, X, Bell, Sun, Moon, ChevronDown, Calendar, Activity } from "lucide-react";

const AppHeader: React.FC = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar, isExpanded } = useSidebar();
  const { user } = useAuthStore();
  const { data: session } = useSession_Terms();
  const { data: school, isLoading } = useSchoolProfile();
  const { data: profile, isLoading: loading } = useUserProfile();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const getRoleGradient = (role?: string) => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "from-blue-500 to-cyan-500";
      case "TEACHER":
        return "from-purple-500 to-pink-500";
      case "STUDENT":
        return "from-emerald-500 to-teal-500";
      case "PARENT":
        return "from-orange-500 to-red-500";
      default:
        return "from-indigo-600 to-purple-600";
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-slate-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">

        {/* Left Section: Toggle & School Identity */}
        <div className="flex items-center gap-4">
          {/* Toggle Button */}
          <button
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
            className="flex h-10 w-10 items-center justify-center border-2 border-slate-200 dark:border-gray-800 text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 transition-all active:scale-95 group"
          >
            {isMobileOpen || isExpanded ? (
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* School Logo & Name */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            {isLoading ? (
              <div className="h-10 w-10 animate-pulse bg-slate-200 dark:bg-gray-700" />
            ) : (
              <div className="relative">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  {school?.logo_url ? (
                    <Image
                      src={school.logo_url}
                      alt="School Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-xl">🏫</span>
                  )}
                </div>
                {/* Active Indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
              </div>
            )}
            
            <div className="hidden md:flex flex-col">
              <span className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
                {school?.name || "Lumina"}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Management System
              </span>
            </div>
          </Link>
        </div>

        {/* Center Section: Session Info (Hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/20 border-2 border-indigo-200 dark:border-indigo-900">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest leading-none">
              {session?.current_session || "2024/2025"}
            </span>
            <span className="text-[8px] font-bold text-slate-500">
              Term {session?.current_term || "1"}
            </span>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle */}
          <div className="hidden sm:block">
            <ThemeToggleButton />
          </div>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Divider */}
          <div className="h-8 w-px bg-slate-200 dark:bg-gray-800 hidden sm:block" />

          {/* User Profile Section */}
          <div className="flex items-center gap-3">
            {/* User Info */}
            <div className="hidden md:flex flex-col items-end">
              <div className="flex items-center gap-2">
                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {loading ? "Loading..." : profile?.surname || profile?.first_name || "User"}
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {user?.role || "User"}
                </span>
                <span className="text-[8px] font-bold text-slate-300">•</span>
                <span className="text-[9px] font-bold text-indigo-600 uppercase">
                  Active
                </span>
              </div>
            </div>
            
            {/* User Avatar */}
            <div className="relative group cursor-pointer">
              <div className={`h-10 w-10 bg-gradient-to-br ${getRoleGradient(user?.role)} flex items-center justify-center text-white font-black text-sm shadow-lg border-2 border-white dark:border-gray-900 transition-transform group-hover:scale-110`}>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  user?.surname?.[0] || user?.role?.slice(0, 1) || "U"
                )}
              </div>
              {/* Status Badge */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                <Activity className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Session Info Bar */}
      <div className="lg:hidden border-t border-slate-200 dark:border-gray-800 px-4 py-2 bg-slate-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-indigo-600" />
            <span className="font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              {session?.current_session || "2024/2025"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Term {session?.current_term || "1"}</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-bold text-emerald-500 uppercase text-[9px]">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;