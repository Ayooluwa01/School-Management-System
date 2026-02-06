"use client";
import React, { useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { ChevronRight } from "lucide-react";
import SidebarWidget from "./SidebarWidget";
import { useAuthStore } from "../../zustand/store";
import Image from "next/image";
import { useSchoolProfile } from "../../hooks/useSchool";

type UserRole = "ADMIN" | "TEACHER" | "STUDENT" | "PARENT" | "STAFF";

type SubNavItem = {
  name: string;
  path: string;
  emoji: string;
  allowedRoles?: UserRole[];
};

type NavItem = {
  name: string;
  emoji: string;
  path?: string;
  subItems?: SubNavItem[];
  gradientFrom: string;
  gradientTo: string;
  allowedRoles?: UserRole[];
  isNew?: boolean;
};



      const navItems: NavItem[] = [ 

  {
    name: "Dashboard",
    emoji: "🏠",
    path: "/dashboard",
    gradientFrom: "#f093fb",
    gradientTo: "#f5576c",
    allowedRoles: ["ADMIN", "TEACHER", "STUDENT", "PARENT", "STAFF"],
  },

  {
    name: "Students",
    emoji: "🎓",
    gradientFrom: "#4facfe",
    gradientTo: "#00f2fe",
    allowedRoles: ["ADMIN", "TEACHER", "STAFF"],
    subItems: [
      {
        name: "All Students",
        path: "/students/allstudents",
        emoji: "👥",
      },
      {
        name: "Register Student",
        path: "/students/add",
        emoji: "➕",
        allowedRoles: ["ADMIN"],
      },
      {
        name: "Upload CSV",
        path: "/students/Upload",
        emoji: "📄",
        allowedRoles: ["ADMIN"],
      },
      {
        name: "Attendance",
        path: "/students/attendance",
        emoji: "📋",
      },
    ],
  },

  {
    name: "Staff",
    emoji: "👔",
    gradientFrom: "#fa709a",
    gradientTo: "#fee140",
    allowedRoles: ["ADMIN"],
    subItems: [
      {
        name: "All Staff",
        path: "/staff",
        emoji: "📋",
      },
      {
        name: "Add Staff",
        path: "/staff/add",
        emoji: "➕",
      },
    ],
  },

  {
    name: "Teachers",
    emoji: "👨‍🏫",
    gradientFrom: "#ffecd2",
    gradientTo: "#fcb69f",
    allowedRoles: ["ADMIN"],
    subItems: [
      {
        name: "Assign Subjects",
        path: "/teachers/assign",
        emoji: "📚",
      },
      {
        name: "Class Teachers",
        path: "/teachers/assignClass",
        emoji: "🏫",
      },
    ],
  },

  {
    name: "Class",
    emoji: "🏫",
    path: "/classes",
    gradientFrom: "#a8edea",
    gradientTo: "#fed6e3",
    allowedRoles: ["ADMIN", "TEACHER", "STAFF"],
  },

  {
    name: "Subject",
    emoji: "📚",
    path: "/subjects",
    gradientFrom: "#ff9a9e",
    gradientTo: "#fecfef",
    allowedRoles: ["ADMIN", "TEACHER", "STAFF"],
  },
];

const othersItems: NavItem[] = [
  {
    name: "Examinations",
    emoji: "📝",
    gradientFrom: "#fbc2eb",
    gradientTo: "#a6c1ee",
    allowedRoles: ["ADMIN", "TEACHER", "STUDENT", "PARENT", "STAFF"],
    subItems: [
      {
        name: "Result Entry",
        path: "/Exams/Entry",
        emoji: "✍️",
      },
      {
        name: "Report Cards",
        path: "/Exams/Report-cards",
        emoji: "📊",
      },
    ],
  },

{
  name: "Finance",
  emoji: "💰",
  gradientFrom: "#fdcbf1",
  gradientTo: "#e6dee9",
  allowedRoles: ["ADMIN", "PARENT", "STUDENT"],
  subItems: [
    {
      name: "Create Fee",
      path: "/finance/fees",
      emoji: "💳",
    },
    {
      name: "Fee Payment",
      path: "finance/payment",
      emoji: "🧾",
    },
    {
      name: "Expenses",
      path: "/finance/expenses",
      emoji: "💸",
      allowedRoles: ["ADMIN"],
    },
    
  ],
},
{
    name: "Settings",
    emoji: "⚙️",
    gradientFrom: "#d299c2",
    gradientTo: "#fef9d7",
    allowedRoles: ["ADMIN"],
    subItems: [
      {
        name: "School Profile",
        path: "/settings/school",
        emoji: "🏛️",
      },
      {
        name: "Academic Session",
        path: "/settings/session",
        emoji: "📅",
      },      {
        name: "Grading System",
        path: "/settings/grading",
        emoji: "📅",
      },
    ],
  },

]


        const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<{ type: string; index: number } | null>(null);
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  const user = useAuthStore((state) => state.user);
  const userRole = (user?.role as UserRole);
  const { data: school } = useSchoolProfile();

  const isSidebarOpen = isExpanded || isHovered || isMobileOpen;
  const isActive = useCallback((path: string) => pathname === path || pathname.startsWith(path + '/'), [pathname]);

  const filterItems = useCallback((items: NavItem[]) => {
    return items
      .map(item => ({
        ...item,
        subItems: item.subItems?.filter(sub => !sub.allowedRoles || sub.allowedRoles.includes(userRole))
      }))
      .filter(item => (!item.allowedRoles || item.allowedRoles.includes(userRole)) && (item.subItems ? item.subItems.length > 0 : true));
  }, [userRole]);

  const visibleNavItems = useMemo(() => filterItems(navItems), [filterItems]);
  const visibleOthersItems = useMemo(() => filterItems(othersItems), [filterItems]);

  const renderMenuItems = (items: NavItem[], menuType: string) => (
    <ul className="flex flex-col gap-1.5 px-4">
      {items.map((nav, index) => {
        const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;
        const isParentActive = nav.subItems?.some(sub => isActive(sub.path)); 
        const isLinkActive = nav.path ? isActive(nav.path) : false;
        const activeState = isParentActive || isLinkActive;

        return (
          <li key={nav.name} className="relative group/item">
            {nav.subItems ? (
              <button
                onClick={() => setOpenSubmenu(isOpen ? null : { type: menuType, index })}
                className={`flex items-center w-full p-2.5 rounded-2xl transition-all duration-300
                  ${activeState ? "bg-white shadow-md ring-1 ring-black/5" : "hover:bg-white/70"}
                  ${!isSidebarOpen ? "justify-center" : "justify-between"}`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm transition-transform duration-300 group-hover/item:scale-110`}
                    style={{ 
                      background: activeState 
                        ? `linear-gradient(135deg, ${nav.gradientFrom}, ${nav.gradientTo})`
                        : `linear-gradient(135deg, ${nav.gradientFrom}10, ${nav.gradientTo}10)`
                    }}
                  >
                    <span className="drop-shadow-sm">{nav.emoji}</span>
                  </div>
                  {isSidebarOpen && (
                    <span className={`text-sm font-bold tracking-tight ${activeState ? "text-gray-900" : "text-gray-600 group-hover/item:text-gray-900"}`}>
                      {nav.name}
                    </span>
                  )}
                </div>
                {isSidebarOpen && <ChevronRight size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-90 text-gray-800" : "text-gray-400"}`} />}
              </button>
            ) : (
              nav.path && (
                <Link
                  href={nav.path}
                  className={`flex items-center p-2.5 rounded-2xl transition-all duration-300
                    ${isLinkActive ? "bg-white shadow-md ring-1 ring-black/5" : "hover:bg-white/70"}
                    ${!isSidebarOpen ? "justify-center" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm transition-transform duration-300 group-hover/item:scale-110`}
                      style={{ background: isLinkActive ? `linear-gradient(135deg, ${nav.gradientFrom}, ${nav.gradientTo})` : `linear-gradient(135deg, ${nav.gradientFrom}10, ${nav.gradientTo}10)` }}
                    >
                      <span>{nav.emoji}</span>
                    </div>
                    {isSidebarOpen && (
                      <span className={`text-sm font-bold tracking-tight ${isLinkActive ? "text-gray-900" : "text-gray-600 group-hover/item:text-gray-900"}`}>
                        {nav.name}
                      </span>
                    )}
                  </div>
                </Link>
              )
            )}

            {nav.subItems && isSidebarOpen && (
              <div
                ref={(el) => { subMenuRefs.current[`${menuType}-${index}`] = el; }}
                className="overflow-hidden transition-all duration-300"
                style={{ height: isOpen ? `${subMenuRefs.current[`${menuType}-${index}`]?.scrollHeight}px` : "0px", opacity: isOpen ? 1 : 0 }}
              >
                <ul className="mt-2 ml-8 space-y-1 border-l-2 border-gray-100 pl-4">
                  {nav.subItems.map((subItem) => {
                    const isSubActive = isActive(subItem.path);
                    return (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.path}
                          className={`flex items-center gap-2.5 py-2 px-3 rounded-xl text-[13px] font-bold transition-all
                            ${isSubActive ? "text-indigo-600 bg-indigo-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-white/80"}`}
                        >
                          <span className="text-base">{subItem.emoji}</span>
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
      className={`fixed top-0 left-0 h-screen z-50 transition-all duration-500 ease-in-out flex flex-col bg-[#FBFBFB] border-r border-gray-200/60
        ${isSidebarOpen ? "w-[260px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-24 flex items-center px-6 ${!isSidebarOpen ? "justify-center" : ""}`}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100 flex-shrink-0">
            {school?.logo_url ? <Image src={school.logo_url} alt="Logo" width={36} height={36} /> : <span className="text-2xl">🏫</span>}
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="font-black text-gray-900 truncate text-sm uppercase tracking-tight leading-none">
                {school?.name || "Lumina"}
              </span>
              <span className="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pt-4">
        <section className="mb-8">
          {isSidebarOpen && <div className="px-9 mb-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Operations</div>}
          {renderMenuItems(visibleNavItems, "main")}
        </section>
        <section className="mb-8">
          {isSidebarOpen && <div className="px-9 mb-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Administrative</div>}
          {renderMenuItems(visibleOthersItems, "others")}
        </section>
        {isSidebarOpen && <div className="px-6 mb-10"><SidebarWidget /></div>}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white/40">
        <div className={`flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm ${!isSidebarOpen ? "justify-center" : ""}`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-400 to-rose-400 flex items-center justify-center text-white text-sm font-black shadow-inner">
            {user?.surname?.[0] || "A"}
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col min-w-0">
              <p className="text-xs font-black text-gray-900 truncate uppercase">{userRole}</p>
              <p className="text-[10px] font-bold text-gray-400">System Authorized</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;