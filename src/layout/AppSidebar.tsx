"use client";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  GraduationCap, UsersRound, UserRoundPlus, LayoutDashboard, Users,
  UserCog, ShieldCheck, List, UserPlus, Layers, BookOpen, CalendarClock,
  FileText, ClipboardCheck, PieChart, Table, CreditCard, FileBarChart,
  Plug, Megaphone, Settings, Calendar, Award, ChevronRight, MoreHorizontal,
  School, CircleUser, CalendarCheck
} from "lucide-react";

import SidebarWidget from "./SidebarWidget";
import { useAuthStore } from "../../zustand/store";
import Image from "next/image";
import { useSchoolProfile } from "../../hooks/useSchool";

// --- Roles ---
type UserRole = "ADMIN" | "TEACHER" | "STUDENT" | "PARENT" |"STAFF";

// --- Types ---
type SubNavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  allowedRoles?: UserRole[];
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubNavItem[];
  iconColor: string; 
  bgColor: string;
  allowedRoles?: UserRole[];
};

// --- Navigation Data ---
const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
    iconColor: "text-sky-600",
    bgColor: "bg-sky-100",
    allowedRoles: ["ADMIN", "TEACHER", "STUDENT", "PARENT","STAFF"],
  },
  {
    name: "Students",
    icon: <GraduationCap size={20} />,
    iconColor: "text-violet-600",
    bgColor: "bg-violet-100",
    allowedRoles: ["ADMIN", "TEACHER","STAFF"],
    subItems: [
      { name: "All Students", path: "/students/allstudents", icon: <UsersRound size={18} /> },
      { name: "Register Student", path: "/students/add", icon: <UserRoundPlus size={18} />, allowedRoles: ["ADMIN"] },
      { name: "Attendance", path: "/students/attendance", icon: <CalendarCheck size={18} /> },
    ],
  },
  {
    name: "Staff",
    icon: <UserCog size={20} />,
    iconColor: "text-pink-600",
    bgColor: "bg-pink-100",
    allowedRoles: ["ADMIN"],
    subItems: [
      { name: "All Staff", path: "/staff", icon: <List size={18} /> },
      { name: "Add Staff", path: "/staff/add", icon: <UserPlus size={18} /> },
      { name: "Roles & Permissions", path: "/staff/roles", icon: <ShieldCheck size={18} /> },
    ],
  },
  {
    name: "Teachers",
    icon: <Users size={20} />,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-100",
    allowedRoles: ["ADMIN"],
    subItems: [
      { name: "Assign Subjects", path: "/teachers/assign", icon: <Table size={18} /> },
      { name: "Assign Classes", path: "/teachers/assignClass", icon: <Table size={18} /> },
    ],
  },
  { name: "Class", icon: <Layers size={20} />, path: "/classes", iconColor: "text-emerald-600", bgColor: "bg-emerald-100", allowedRoles: ["ADMIN", "TEACHER","STAFF"] },
  { name: "Subject", icon: <BookOpen size={20} />, path: "/subjects", iconColor: "text-cyan-600", bgColor: "bg-cyan-100", allowedRoles: ["ADMIN", "TEACHER","STAFF"] },
  { name: "Attendance", icon: <CalendarCheck size={20} />, path: "/attendance", iconColor: "text-orange-600", bgColor: "bg-orange-100", allowedRoles: ["STUDENT", "PARENT","ADMIN","STAFF"] },
  { name: "Timetable", icon: <CalendarClock size={20} />, path: "/timetable", iconColor: "text-fuchsia-600", bgColor: "bg-fuchsia-100", allowedRoles: ["ADMIN", "TEACHER", "STUDENT", "PARENT"] },
  {
    name: "Examinations",
    icon: <FileText size={20} />,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-100",
    allowedRoles: ["ADMIN", "TEACHER", "STUDENT", "PARENT","STAFF"],
    subItems: [
      { name: "Result Entry", path: "/Exams/Entry", icon: <Table size={18} />, allowedRoles: ["ADMIN", "TEACHER"] },
      { name: "Report Cards", path: "/Exams/Report-cards", icon: <ClipboardCheck size={18} /> },
    ],
  },
  {
    name: "Finance",
    icon: <PieChart size={20} />,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
    allowedRoles: ["ADMIN", "PARENT", "STUDENT"],
    subItems: [
      { name: "Fees", path: "/finance/fees", icon: <Table size={18} /> },
      { name: "Payments", path: "/finance/payments", icon: <CreditCard size={18} /> },
      { name: "Expenses", path: "/finance/expenses", icon: <List size={18} />, allowedRoles: ["ADMIN"] },
      { name: "Reports", path: "/finance/reports", icon: <FileBarChart size={18} />, allowedRoles: ["ADMIN"] },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    name: "Communication",
    icon: <Plug size={20} />,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-100",
    allowedRoles: ["ADMIN", "TEACHER","STAFF"],
    subItems: [
      { name: "Announcements", path: "/communication/announcements", icon: <Megaphone size={18} /> },
      { name: "Broadcasts", path: "/communication/broadcast", icon: <Plug size={18} /> },
    ],
  },
  {
    name: "Settings",
    icon: <Settings size={20} />,
    iconColor: "text-slate-600",
    bgColor: "bg-slate-100",
    allowedRoles: ["ADMIN"],
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
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
const user = useAuthStore((state) => state.user);
const userRole = (user?.role as UserRole)
  const { data: school, isLoading } = useSchoolProfile();

const isActive = useCallback((path: string) => pathname === path || pathname.startsWith(path + '/'), [pathname]);
  const isSidebarOpen = isExpanded || isHovered || isMobileOpen;

  // --- Filter Logic ---
  const filterItems = useCallback((items: NavItem[]) => {
    return items
      .map(item => {
        // Filter sub-items first
        const filteredSubItems = item.subItems?.filter(sub => 
          !sub.allowedRoles || sub.allowedRoles.includes(userRole)
        );
        return { ...item, subItems: filteredSubItems };
      })
      .filter(item => {
        const hasRole = !item.allowedRoles || item.allowedRoles.includes(userRole);
        const hasVisibleChildren = item.subItems ? item.subItems.length > 0 : true;
        return hasRole && hasVisibleChildren;
      });
  }, [userRole]);

  const visibleNavItems = useMemo(() => filterItems(navItems), [filterItems]);
  const visibleOthersItems = useMemo(() => filterItems(othersItems), [filterItems]);

  useEffect(() => {
    let submenuMatched = false;
    [{ items: visibleNavItems, type: "main" }, { items: visibleOthersItems, type: "others" }].forEach((menu) => {
      menu.items.forEach((nav, index) => {
        if (nav.subItems?.some((subItem) => isActive(subItem.path))) {
          setOpenSubmenu({ type: menu.type as "main" | "others", index });
          submenuMatched = true;
        }
      });
    });
    if (!submenuMatched) setOpenSubmenu(null);
  }, [pathname, isActive, visibleNavItems, visibleOthersItems]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) => (prev?.type === menuType && prev.index === index ? null : { type: menuType, index }));
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-1 px-3">
      {items.map((nav, index) => {
        const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;
        const isParentActive = nav.subItems?.some(sub => isActive(sub.path)); 
        const isLinkActive = nav.path ? isActive(nav.path) : false;

        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`group flex items-center w-full p-2 rounded-xl transition-all duration-200 ease-in-out cursor-pointer
                  ${isParentActive ? "bg-zinc-100/80" : "hover:bg-zinc-50"}
                  ${!isSidebarOpen ? "justify-center" : "justify-between"}`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`p-2 rounded-lg ${isParentActive ? `${nav.bgColor} ${nav.iconColor}` : `text-zinc-500 ${nav.bgColor} bg-opacity-50 group-hover:bg-opacity-100 group-hover:${nav.iconColor}`}`}>
                    {nav.icon}
                  </div>
                  {isSidebarOpen && <span className={`text-sm font-bold ${isParentActive ? "text-zinc-900" : "text-zinc-600 group-hover:text-zinc-900"}`}>{nav.name}</span>}
                </div>
                {isSidebarOpen && (
                  <ChevronRight size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-90 text-zinc-600" : "text-zinc-400"}`} />
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  href={nav.path}
                  className={`group flex items-center p-2 rounded-xl transition-all duration-200 ease-in-out
                    ${isLinkActive ? "bg-zinc-100/80" : "hover:bg-zinc-50"}
                    ${!isSidebarOpen ? "justify-center" : ""}`}
                >
                  <div className={`p-2 rounded-lg ${isLinkActive ? `${nav.bgColor} ${nav.iconColor}` : `text-zinc-500 ${nav.bgColor} bg-opacity-50 group-hover:bg-opacity-100 group-hover:${nav.iconColor}`}`}>
                    {nav.icon}
                  </div>
                  {isSidebarOpen && <span className={`ml-3 text-sm font-bold ${isLinkActive ? "text-zinc-900" : "text-zinc-600 group-hover:text-zinc-900"}`}>{nav.name}</span>}
                </Link>
              )
            )}

            {nav.subItems && isSidebarOpen && (
              <div
                ref={(el) => { subMenuRefs.current[`${menuType}-${index}`] = el; }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ height: isOpen ? `${subMenuRefs.current[`${menuType}-${index}`]?.scrollHeight}px` : "0px", opacity: isOpen ? 1 : 0.8 }}
              >
                <ul className="mt-1 ml-5 border-l-2 border-zinc-100 pl-3 space-y-1">
                  {nav.subItems.map((subItem) => {
                    const isSubActive = isActive(subItem.path);
                    return (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.path}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors 
                            ${isSubActive ? `${nav.iconColor} ${nav.bgColor}` : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"} bg-opacity-30`}
                        >
                          <span className={isSubActive ? "opacity-100" : "opacity-70"}>{subItem.icon}</span>
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
      className={`fixed top-0 left-0 h-screen z-50 bg-white border-r border-zinc-100 transition-all duration-300 ease-in-out flex flex-col font-sans
        ${isSidebarOpen ? "w-[280px]" : "w-[88px]"}
        ${isMobileOpen ? "translate-x-0" : isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-20 flex items-center flex-none px-6 mb-2 ${!isSidebarOpen ? "justify-center px-0" : "justify-between"}`}>
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

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar space-y-6">
        <nav>
           {isSidebarOpen && <div className="px-6 mb-2 text-xs font-black text-zinc-400 uppercase tracking-widest">Main Menu</div>}
           {renderMenuItems(visibleNavItems, "main")}
        </nav>

        <nav>
          {isSidebarOpen && <div className="px-6 mb-2 text-xs font-black text-zinc-400 uppercase tracking-widest">Management</div>}
          {renderMenuItems(visibleOthersItems, "others")}
        </nav>

        {isSidebarOpen && <div className="px-4 pt-4"><SidebarWidget /></div>}
      </div>
      
      <div className="p-4 bg-white border-t border-zinc-100">
          <button className={`flex items-center gap-3 w-full p-2 rounded-xl hover:bg-zinc-50 transition-colors ${!isSidebarOpen ? "justify-center" : ""}`}>
            <div className="relative">
                <CircleUser size={38} className="text-zinc-300" strokeWidth={1.5} />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            {isSidebarOpen && (
               <div className="flex flex-col items-start overflow-hidden">
                  <p className="text-sm font-black text-zinc-800 truncate">{userRole} Account</p>
                  <p className="text-[11px] font-bold text-zinc-400 truncate">active session</p>
               </div>
            )}
          </button>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        .custom-scrollbar:hover::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e4e4e7; border-radius: 20px; }
      `}</style>
    </aside>
  );
};

export default AppSidebar;