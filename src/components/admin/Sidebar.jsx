"use client"; // Necessary to enable client-side features
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  School,
  Users,
  Wallet,
  MessageSquareWarning,
  FilePenLine,
  SquareCheck,
  FileText,
  IdCard,
  BookUser,
  CalendarCheck,
  Shapes,
  PanelsTopLeft,
  Settings,
  ChevronRight,
  ChevronLeft,
  RadioTower,
  TvMinimalPlay,
  FileLock,
  MessageSquareText,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation"; // Import usePathname
import { SideNavbar } from "@/components/ui/sidenavbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [links, setLinks] = useState([
      { title: "Dashboard", icon: LayoutDashboard, url: "/admin", variant: "menu_items" },
      { title: "Courses", icon: School, url: "/admin/courses", variant: "menu_items" },
      { title: "Students", icon: Users, url: "/admin/students", variant: "menu_items" },
      { title: "Finance", icon: Wallet, url: "/admin/finance", variant: "menu_items" },
      { title: "Notices", icon: MessageSquareWarning, url: "/admin/notices", variant: "menu_items" },
      { title: "Attendance", icon: BookUser, url: "/admin/attendance", variant: "menu_items" },
      { title: "Class", icon: TvMinimalPlay, url: "/admin/class", variant: "menu_items" },
      { title: "Live Class", icon: RadioTower, url: "/admin/live-class", variant: "menu_items" },
      { title: "Notes", icon: FileText, url: "/admin/notes", variant: "menu_items" },
      { title: "Exams", icon: FilePenLine, url: "/admin/exams", variant: "menu_items" },
      { title: "Quizzes", icon: SquareCheck, url: "/admin/quizzes", variant: "menu_items" },
      
      { title: "Routine", icon: CalendarCheck, url: "/admin/routine", variant: "menu_items" },
      { title: "Student Cards", icon: IdCard, url: "/admin/cards", variant: "menu_items" },
      { title: "Materials", icon: Shapes, url: "/admin/materials", variant: "menu_items" },
      { title: "SMS Management", icon: MessageSquareText, url: "/admin/sms", variant: "menu_items" },
      { title: "Manage Admins", icon: User, url: "/admin/admins", variant: "menu_items" },
      { title: "Website", icon: PanelsTopLeft, url: "/admin/under-development", variant: "menu_items" },
      { title: "Settings", icon: Settings, url: "/admin/settings", variant: "menu_items" },
      { title: "Logs", icon: FileLock, url: "/admin/logs", variant: "menu_items" },
     
      
    ]);

    const pathname = usePathname();

    // Check authentication function
    const checkAuth = async (url) => {
      try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/check_auth.php", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Ensure correct content type
          },
          body: new URLSearchParams({
            from_page: url,
          }).toString(),
        });
        const data = await response.json();
        if (!data.logged_in) {
          router.push("/auth/admin/login/"); // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    const handleLinkClick = async (url) => {
      await checkAuth(url);
      if (router.asPath !== url) {
          router.push(url);
      }
  };
  

    // Update active link whenever the pathname changes and check auth
    useEffect(() => {
      checkAuth(pathname); // Call checkAuth on pathname change

      setLinks((prevLinks) =>
        prevLinks.map((link) => ({
          ...link,
          variant: link.url === pathname ? "menu_active_item" : "menu_items",
        }))
      );
    }, [pathname]); // Depend on pathname so it updates on route changes

    return (
      <motion.div
        className="fixed flex flex-col border-r min-h-screen bg-white z-50 pt-4"
        initial={{ width: 80 }} // Initial width when collapsed
        animate={{ width: isCollapsed ? 80 : 240 }} // Expand width based on state
        transition={{ duration: 0.3 }} // Animation duration
      >
        {/* Collapse/Expand Button */}
        <div className="absolute right-[-13px] top-[28px] translate-y-[-50%] z-100">
          <Button
            variant="secondary"
            className="rounded-full p-1 w-6 h-6 flex items-center justify-center border bg-white"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Logo */}
        <div
          className={`flex items-center justify-center mb-10 ${!isCollapsed ? "p-4 mb-4" : ""}`}
        >
          <img
            src={isCollapsed ? "/ennovat-icon.ico" : "/ennovat-logo.png"}
            alt="Ennovat Logo"
            className={isCollapsed ? "w-9 mt-4" : "w-64"}
          />
        </div>

        {/* SideNavbar Component with updated links */}
        <SideNavbar isCollapsed={isCollapsed} links={links} onLinkClick={handleLinkClick} />
      </motion.div>
    );
}
