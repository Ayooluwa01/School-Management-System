"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "../../zustand/store";

const AppHeader: React.FC = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
const {user}=useAuthStore()
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

        {/* Left */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 dark:border-gray-800 dark:text-gray-400"
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>

          <Link href="/" className="hidden sm:block">
            {/* <Image
              src="/images/logo/logo.svg"
              alt="Logo"
              width={110}
              height={24}
              className="dark:hidden"
            />
            <Image
              src="/images/logo/logo-dark.svg"
              alt="Logo"
              width={110}
              height={24}
              className="hidden dark:block"
            /> */}
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <ThemeToggleButton />
          <NotificationDropdown />

          {/* Static User Info */}
          <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
            <Image
              src="/images/avatar/avatar.png"
              alt="User"
              width={32}
              height={32}
              className="rounded-full"
            />

            <div className="leading-tight">
              <p className="text-sm font-medium text-gray-800 dark:text-white">
              {user?.role }
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.user_id} · 2nd Term
              </p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default AppHeader;
