// src/components/admin/NotificationSidebar.jsx
import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotificationSidebar = ({
  notifications,
  markAllAsRead,
  loadMore,
  hasMore,
  isClosing,
}) => {
  return (
    <nav
      className={`z-50 fixed top-0 right-0 h-full bg-white shadow-lg border border-gray-200 overflow-y-auto transition-transform transform-gpu ${
        isClosing ? "animate-slide-out" : "animate-slide-in"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <Button
          variant="secondary"
          className="ml-12 p-2 text-[0.7rem]"
          onClick={(e) => {
            e.stopPropagation(); // Prevent closing when clicking the button
            markAllAsRead();
          }}
        >
          <CheckCircle className="mr-2 w-4 h-4" />
          Mark as Read
        </Button>
      </div>
      <div className="p-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex flex-col p-2 border-b border-gray-200"
          >
            <span className="text-xs text-gray-500">{notification.time}</span>
            <span className="text-sm text-dark">{notification.message}</span>
          </div>
        ))}
        {/* View More Button */}
        {hasMore && (
          <Button onClick={loadMore} className="mt-4 w-full">
            View More
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NotificationSidebar;
