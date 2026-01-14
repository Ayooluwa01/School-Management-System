"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  GraduationCap,
  UsersRound,
  UserRoundPlus,
  LayoutDashboard,
  Users,
  UserCog,
  ShieldCheck,
  List,
  UserPlus,
  Layers,
  BookOpen,
  CalendarClock,
  FileText,
  ClipboardCheck,
  PieChart,
  Table,
  CreditCard,
  FileBarChart,
  Plug,
  Megaphone,
  Settings,
  Calendar,
  Award,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

import SidebarWidget from "./SidebarWidget";

// --- Types ---
type SubNavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubNavItem[];
};

// --- Navigation Data ---
const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  {
    name: "Students",
    icon: <GraduationCap size={20} />,
    subItems: [
      { name: "All Students", path: "/students/allstudents", icon: <UsersRound size={18} /> },
      { name: "Register Student", path: "/students/add", icon: <UserRoundPlus size={18} /> },
    ],
  },
  {
    name: "Staff",
    icon: <UserCog size={20} />,
    subItems: [
      { name: "All Staff", path: "/staff", icon: <List size={18} /> },
      { name: "Add Staff", path: "/staff/add", icon: <UserPlus size={18} /> },
      { name: "Roles & Permissions", path: "/staff/roles", icon: <ShieldCheck size={18} /> },
    ],
  },
  {
    name: "Teachers",
    icon: <Users size={20} />,
    subItems: [
      { name: "Assign Subjects", path: "/teachers/assign", icon: <Table size={18} /> },
      { name: "Assign Classes", path: "/teachers/assignClass", icon: <Table size={18} /> },
    ],
  },
  { name: "Class", icon: <Layers size={20} />, path: "/classes" },
  { name: "Subject", icon: <BookOpen size={20} />, path: "/subjects" },
  { name: "Timetable", icon: <CalendarClock size={20} />, path: "/timetable" },
  {
    name: "Examinations",
    icon: <FileText size={20} />,
    subItems: [
      { name: "Result Entry", path: "/Exams/Entry", icon: <Table size={18} /> },
      { name: "Report Cards", path: "/Exams/Report-cards", icon: <ClipboardCheck size={18} /> },
    ],
  },
  {
    name: "Finance",
    icon: <PieChart size={20} />,
    subItems: [
      { name: "Fees", path: "/finance/fees", icon: <Table size={18} /> },
      { name: "Payments", path: "/finance/payments", icon: <CreditCard size={18} /> },
      { name: "Expenses", path: "/finance/expenses", icon: <List size={18} /> },
      { name: "Reports", path: "/finance/reports", icon: <FileBarChart size={18} /> },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    name: "Communication",
    icon: <Plug size={20} />,
    subItems: [
      { name: "Announcements", path: "/communication/announcements", icon: <Megaphone size={18} /> },
      { name: "Broadcasts", path: "/communication/broadcast", icon: <Plug size={18} /> },
    ],
  },
  {
    name: "Settings",
    icon: <Settings size={20} />,
    subItems: [
      { name: "School Profile", path: "/settings/school", icon: <Layers size={18} /> },
      { name: "Academic Session", path: "/settings/session", icon: <Calendar size={18} /> },
      { name: "Grading System", path: "/settings/grading", icon: <Award size={18} /> },
      { name: "Roles", path: "/settings/roles", icon: <ShieldCheck size={18} /> },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => pathname === path || pathname.startsWith(path + '/'), [pathname]);
  const isSidebarOpen = isExpanded || isHovered || isMobileOpen;

  // Auto-expand menu based on active path
  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType as "main" | "others", index });
              submenuMatched = true;
            }
          });
        }
      });
    });
    if (!submenuMatched) setOpenSubmenu(null);
  }, [pathname, isActive]);

  // Calculate dynamic heights for animations
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) => {
      if (prev && prev.type === menuType && prev.index === index) return null;
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-1.5 px-3">
      {items.map((nav, index) => {
        const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;
        // Check if any child is active to highlight parent
        const isParentActive = nav.subItems?.some(sub => isActive(sub.path)); 
        const isLinkActive = nav.path ? isActive(nav.path) : false;

        return (
          <li key={nav.name}>
            {nav.subItems ? (
              // --- Parent Item (Submenu Trigger) ---
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`group flex items-center w-full px-3 py-2.5 rounded-xl transition-all duration-200 ease-in-out cursor-pointer
                  ${isParentActive 
                    ? "bg-indigo-50 text-indigo-700 font-semibold" 
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"}
                  ${!isSidebarOpen ? "justify-center" : "justify-between"}
                `}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className={`transition-colors ${isParentActive ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600"}`}>
                    {nav.icon}
                  </span>
                  {isSidebarOpen && <span className="text-sm truncate">{nav.name}</span>}
                </div>
                {isSidebarOpen && (
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-90 text-indigo-500" : "text-zinc-400"}`}
                  />
                )}
              </button>
            ) : (
              // --- Single Link Item ---
              nav.path && (
                <Link
                  href={nav.path}
                  className={`group flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 ease-in-out
                    ${isLinkActive 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" 
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"}
                    ${!isSidebarOpen ? "justify-center" : ""}
                  `}
                >
                  <span className={`${!isSidebarOpen ? "" : "mr-3"} ${isLinkActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-600"}`}>
                    {nav.icon}
                  </span>
                  {isSidebarOpen && <span className="text-sm font-medium truncate">{nav.name}</span>}
                </Link>
              )
            )}

            {/* --- Submenu Dropdown --- */}
            {nav.subItems && isSidebarOpen && (
              <div
                ref={(el) => { subMenuRefs.current[`${menuType}-${index}`] = el; }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  height: isOpen ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px",
                  opacity: isOpen ? 1 : 0.6
                }}
              >
                <ul className="mt-1 ml-4 border-l-2 border-zinc-100 pl-2 space-y-1">
                  {nav.subItems.map((subItem) => {
                    const isSubActive = isActive(subItem.path);
                    return (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.path}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] transition-colors
                            ${isSubActive 
                              ? "bg-indigo-50 text-indigo-700 font-medium" 
                              : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}
                          `}
                        >
                          {isSubActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                          {!isSubActive && <div className="w-1.5 h-1.5 rounded-full bg-transparent" />}
                          <span className="truncate">{subItem.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 bg-white border-r border-zinc-200 transition-all duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? "w-[280px]" : "w-[88px]"}
        ${isMobileOpen ? "translate-x-0" : isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- Logo Area --- */}
      <div className={`h-20 flex items-center flex-none px-6 border-b border-zinc-50 ${!isSidebarOpen ? "justify-center px-0" : "justify-between"}`}>
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white flex-none shadow-lg shadow-indigo-200">
             {/* Simple Logo Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.949 49.949 0 0 0-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0A50.009 50.009 0 0 0 7.5 12.174v-.224c0-.131.067-.248.182-.311a51.02 51.02 0 0 1 .65-.343c.255-.13.281-.487.07-.66a3.881 3.881 0 0 0-2.097-.64V4.5c0-.212.166-.334.364-.403A61.91 61.91 0 0 1 11.7 2.805Z" />
              <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 0 1-.46.71 47.878 47.878 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.877 47.877 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 0 1 6 13.18v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 0 0 .551-1.608 1.5 1.5 0 0 0 .14-2.67v-2.245a48.541 48.541 0 0 1 5.56 2.836Z" />
            </svg>
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-zinc-900 leading-none tracking-tight">Schl<span className="text-indigo-600">Mgs</span></span>
              <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider mt-0.5">Admin Portal</span>
            </div>
          )}
        </Link>
      </div>

      {/* --- Scrollable Content --- */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 custom-scrollbar space-y-8">
        <nav>
           {/* Main Section */}
           <div className={`px-6 mb-2 text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center ${!isSidebarOpen ? "justify-center" : ""}`}>
              {isSidebarOpen ? "Main Menu" : <MoreHorizontal size={16} />}
           </div>
           {renderMenuItems(navItems, "main")}
        </nav>

        <nav>
          {/* Others Section */}
          <div className={`px-6 mb-2 text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center ${!isSidebarOpen ? "justify-center" : ""}`}>
             {isSidebarOpen ? "Management" : <MoreHorizontal size={16} />}
          </div>
          {renderMenuItems(othersItems, "others")}
        </nav>

        {isSidebarOpen && (
          <div className="px-4">
            <SidebarWidget />
          </div>
        )}
      </div>
      
      {/* Optional: User Mini Profile at bottom (Visual placeholder if needed) */}
      <div className="border-t border-zinc-100 p-4 bg-zinc-50/50">
          <div className={`flex items-center gap-3 ${!isSidebarOpen ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center text-zinc-500">
               <Users size={16} />
            </div>
            {isSidebarOpen && (
               <div className="overflow-hidden">
                  <p className="text-sm font-bold text-zinc-700 truncate">Admin User</p>
                  <p className="text-[10px] text-zinc-400 truncate">admin@schlmgs.com</p>
               </div>
            )}
          </div>
      </div>
      
      {/* --- Custom Scrollbar CSS --- */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </aside>
  );
};

export default AppSidebar;