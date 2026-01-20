"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "../../zustand/store";
import { useSchoolProfile } from "../../hooks/useSchool";

const AppHeader: React.FC = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { user } = useAuthStore();
  
  const { data: school, isLoading } = useSchoolProfile();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-14 items-center justify-between px-3 lg:px-4">

        {/* Left Section: Sidebar Toggle & School Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 dark:border-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>

          <Link href="/" className="flex items-center gap-2 sm:flex">
            {isLoading ? (
              <div className="h-8 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            ) : (
              <>
                {school?.logo_url && (
                  <Image
                    src={school.logo_url}
                    alt="School Logo"
                    width={32}
                    height={32}
                    className="rounded object-contain"
                  />
                )}
                <span className="hidden font-semibold text-gray-800 dark:text-white md:block">
                  {school?.name}
                </span>
              </>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggleButton />
          <NotificationDropdown />

          <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-800">
            <div className="text-right leading-tight">
              <p className="text-sm font-bold text-gray-800 dark:text-white capitalize">
                {user?.role}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {school?.current_term_id ? `Term ${school.current_term_id}` : "No Active Term"}
              </p>
            </div>
            
            <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {user?.role?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default AppHeader;