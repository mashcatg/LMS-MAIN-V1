// src/components/admin/NotificationSidebar.jsx
import React, {useState, useEffect} from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotificationSidebar = ({
  notifications,
  markAllAsRead,
  loadMore,
  hasMore,
  isClosing,
}) => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  // Fetch payment data when the component mounts
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(
          "https://youthsthought.com/lms-backend/student-panel/notices/fetch_notices.php"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payment data");
        }

        const data = await response.json();
        console.log(data); // Check the data structure in the console
        
        // Check if the response contains the "notices" array
        if (data.notices && Array.isArray(data.notices)) {
          setNotices(data.notices);  // Set the notices from the "notices" key
        } else {
          throw new Error("Invalid data format");
        }

        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false);  // Set loading to false in case of an error
      }
    };

    fetchNotices();
  }, []);
  return (
    <nav
      className={`z-50 fixed top-0 right-0 h-full bg-white shadow-lg border border-gray-200 overflow-y-auto transition-transform transform-gpu ${
        isClosing ? "animate-slide-out" : "animate-slide-in"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Notice Board</h2>
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
        {notices.map((notice, index) => (
          <div
            key={index}
            className="flex flex-col p-2 border-b border-gray-200"
          >
            <span className="text-xs text-gray-500">
  {new Date(notice.notice_time).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })} at {new Date(notice.notice_time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })}
</span>

            <span className="text-sm text-dark">{notice.notice}</span>
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
