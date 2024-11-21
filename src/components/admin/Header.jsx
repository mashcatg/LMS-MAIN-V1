import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import NotificationSidebar from "./NotificationSidebar";
import ProfileSidebar from "./ProfileSidebar"; // Import Profile Sidebar

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [isProfileClosing, setIsProfileClosing] = useState(false);
  const [notifications, setNotifications] = useState([
    { message: "New message from John", time: "2 minutes ago" },
    { message: "Your report is ready", time: "10 minutes ago" },
    { message: "Meeting at 3 PM", time: "30 minutes ago" },
    { message: "New comment on your post", time: "1 hour ago" },
    { message: "New message from John", time: "2 minutes ago" },
    { message: "Your report is ready", time: "10 minutes ago" },
    { message: "Meeting at 3 PM", time: "30 minutes ago" },
    { message: "New comment on your post", time: "1 hour ago" },
    { message: "New message from John", time: "2 minutes ago" },
    { message: "Your report is ready", time: "10 minutes ago" },
    { message: "Meeting at 3 PM", time: "30 minutes ago" },
    { message: "New comment on your post", time: "1 hour ago" },
    { message: "New message from John", time: "2 minutes ago" },
    { message: "Your report is ready", time: "10 minutes ago" },
    { message: "Meeting at 3 PM", time: "30 minutes ago" },
    { message: "New comment on your post", time: "1 hour ago" },
    { message: "New message from John", time: "2 minutes ago" },
    { message: "Your report is ready", time: "10 minutes ago" },
    { message: "Meeting at 3 PM", time: "30 minutes ago" },
    { message: "New comment on your post", time: "1 hour ago" },
    { message: "New message from John", time: "2 minutes ago" },
    { message: "Your report is ready", time: "10 minutes ago" },
    { message: "Meeting at 3 PM", time: "30 minutes ago" },
    { message: "New comment on your post", time: "1 hour ago" },
  ]);
  const [visibleNotifications, setVisibleNotifications] = useState(
    notifications.slice(0, 10)
  ); // Initially load 10
  const [hasUnread, setHasUnread] = useState(true); // Global read status
  const sidebarRef = useRef(null);
  const profileSidebarRef = useRef(null); // Ref for profile sidebar

  const handleBellClick = () => {
    setIsSidebarOpen(true);
    setIsClosing(false); // Reset closing state when opening
  };

  const handleProfileClick = () => {
    setIsProfileSidebarOpen(true);
    setIsProfileClosing(false);
  };

  const markAllAsRead = () => {
    setHasUnread(false);
    closeSidebar(); // Close sidebar with animation
  };

  const loadMore = () => {
    const nextNotifications = notifications.slice(
      visibleNotifications.length,
      visibleNotifications.length + 10
    );
    setVisibleNotifications((prev) => [...prev, ...nextNotifications]);
  };

  const closeSidebar = () => {
    setIsClosing(true); // Trigger slide-out animation
    setTimeout(() => {
      setIsSidebarOpen(false); // Unmount after animation
    }, 300); // Match the duration of the animation
  };

  const closeProfileSidebar = () => {
    setIsProfileClosing(true); // Trigger slide-out animation
    setTimeout(() => {
      setIsProfileSidebarOpen(false); // Unmount after animation
    }, 300); // Match the duration of the animation
  };

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (sidebarRef.current && !sidebarRef.current.contains(event.target)) ||
        (profileSidebarRef.current &&
          !profileSidebarRef.current.contains(event.target))
      ) {
        closeSidebar();
        closeProfileSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className="z-20 fixed flex items-center justify-between px-4 py-2 bg-white/70 backdrop-blur-lg mb-4"
        style={{ width: "-webkit-fill-available" }}
      >
        {/* Left Section: Notification Icon */}
        <Button
          variant="ghost"
          className="relative p-2"
          onClick={handleBellClick}
        >
          <Bell className="w-6 h-6 text-gray-600" />
          {hasUnread && (
            <span className="absolute top-1 right-2 h-2.5 w-2.5 rounded-full bg-primary" />
          )}
        </Button>

        {/* Right Section: Profile Icon */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="relative p-2"
            onClick={handleProfileClick} // Open profile sidebar on click
          >
            <Avatar>
              <AvatarImage src="/default-avatar.png" alt="Profile" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>

      {/* Notification Sidebar */}
      {isSidebarOpen && (
        <div ref={sidebarRef}>
          <NotificationSidebar
            notifications={visibleNotifications}
            onClose={closeSidebar}
            markAllAsRead={markAllAsRead}
            loadMore={loadMore}
            hasMore={visibleNotifications.length < notifications.length}
            isClosing={isClosing}
          />
        </div>
      )}

      {/* Profile Sidebar */}
      {isProfileSidebarOpen && (
        <div ref={profileSidebarRef}>
          <ProfileSidebar
            onClose={closeProfileSidebar}
            isClosing={isProfileClosing}
          />
        </div>
      )}
    </>
  );
}
