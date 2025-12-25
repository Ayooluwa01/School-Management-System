"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {House,GraduationCap, UsersRound, UsersRoundIcon, UserRoundPlus, BookAudio, BookOpenCheck, LayoutDashboard, Users, UserRoundPen, SquareUser, PieChart, Table, CreditCard, List, FileBarChart, CalendarDays, ClipboardCheck, FileText, UserPlus, ShieldCheck, UserCog, BookOpen, CalendarClock, Layers, ChevronRight, UserRoundMinus } from 'lucide-react'

import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";

type SubNavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  pro?: boolean;
  new?: boolean;
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubNavItem[];
};

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/dashboard",
  },

  {
    name: "Students",
    icon: <GraduationCap />,
    subItems: [
      { name: "All Students", path: "/students/allstudents", icon: <UsersRound/> },
      { name: "Register Student", path: "/students/add", icon:<UserRoundPlus /> },

      // { name: "Attendance", path: "/students/attendance", icon: <BookAudio /> },
      // { name: "Results", path: "/students/results", icon: <BookOpenCheck/> },
    ],
  },
 {
  name: "Class",
  icon: <Layers size={18} />,
  path: "/classes",
},




{
  name: "Teachers",
  icon: <Users size={18} />,
  subItems: [
    {
      name: "All Teachers",
      path: "/teachers/all",
      icon: <List size={16} />,
    },
    {
      name: "Add / Remove Teacher",
      path: "/teachers/add",
      icon: <UserPlus size={16} />,
    },
    {
      name: "Assign Classes",
      path: "/teachers/assign",
      icon: <Table size={16} />,
    },
  ],
}
,
{
  name: "Subject",
  icon: <BookOpen size={18} />,
  path: "/subjects",
},
{
  name: "Timetable",
  icon: <CalendarClock size={18} />,
  path: "/timetable",
},
{
  name: "Staffs",
  icon: <UserCog size={18} />,
  subItems: [
    {
      name: "All Staff",
      path: "/staff",
      icon: <List size={16} />,
    },
    {
      name: "Add Staff",
      path: "/staff/add",
      icon: <UserPlus size={16} />,
    },
    {
      name: "Roles & Permissions",
      path: "/staff/roles",
      icon: <ShieldCheck size={16} />,
    },
  ],
}
,
{
  name: "Examinations",
  icon: <FileText size={18} />,
  subItems: [
    {
      name: "Exam Schedule",
      path: "/exams/schedule",
      icon: <CalendarDays size={16} />,
    },
    {
      name: "Result Entry",
      path: "/exams/entry",
      icon: <Table size={16} />,
    },
    {
      name: "Report Cards",
      path: "/exams/report-cards",
      icon: <ClipboardCheck size={16} />,
    },
  ],
}
,

 

{
  name: "Finance",
  icon: <PieChart size={18} />,
  subItems: [
    {
      name: "Fees",
      path: "/finance/fees",
      icon: <Table size={16} />,
    },
    {
      name: "Payments",
      path: "/finance/payments",
      icon: <CreditCard size={16} />,
    },
    {
      name: "Expenses",
      path: "/finance/expenses",
      icon: <List size={16} />,
    },
    {
      name: "Reports",
      path: "/finance/reports",
      icon: <FileBarChart size={16} />,
    },
  ],
}


  // {
  //   name: "Parents",
  //   icon: <UserCircleIcon />,
  //   subItems: [
  //     { name: "All Parents", path: "/parents", icon: <ListIcon /> },
  //     { name: "Link Students", path: "/parents/link", icon: <PlugInIcon /> },
  //     { name: "Messages", path: "/parents/messages", icon: <PageIcon /> },
  //   ],
  // },
];


const othersItems: NavItem[] = [
  {
    name: "Communication",
    icon: <PlugInIcon />,
    subItems: [
      { name: "Announcements", path: "/communication/announcements", icon: <PageIcon /> },
      { name: "SMS / Email", path: "/communication/broadcast", icon: <PlugInIcon /> },
    ],
  },

  {
    name: "Settings",
    icon: <BoxCubeIcon />,
    subItems: [
      { name: "School Profile", path: "/settings/school", icon: <GridIcon /> },
      { name: "Academic Session", path: "/settings/session", icon: <CalenderIcon /> },
      { name: "Grading System", path: "/settings/grading", icon: <TableIcon /> },
      { name: "Roles & Permissions", path: "/settings/roles", icon: <UserCircleIcon /> },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-3">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronRight
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
               {nav.subItems.map((subItem) => (
  <li key={subItem.name}>
    <Link
      href={subItem.path}
      className={`menu-dropdown-item ${
        isActive(subItem.path)
          ? "menu-dropdown-item-active"
          : "menu-dropdown-item-inactive"
      }`}
    >
      <span className="flex items-center gap-3">
        <span className="text-lg">{subItem.icon}</span>
        {subItem.name}
      </span>
    </Link>
  </li>
))}

              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

   const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname,isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 z-[999] left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              {/* <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              /> */}
              <h3 className="text-4xl font-bold"><span className="text-#0c111d">Schl</span> <span className="text-[#262e89]  ">Mgs</span></h3>
            </>
          ) : (
            // <Image
            //   src="/images/logo/logo-icon.svg"
            //   alt="Logo"
            //   width={32}
            //   height={32}
            // />
              <h3 >Schl <span>Mgs</span></h3>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
<></>                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
