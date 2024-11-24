"use client";

import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar"; // Assuming you have this component
import { DayPicker } from "react-day-picker"; // Alternatively, you can use DayPicker if not using a custom Calendar component

export default function AttendancePage() {
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch attendance data from the backend
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/student-panel/attendance/fetch_attendances.php", {
          method: "GET",
          credentials: "include", // Ensure that session is respected
        });

        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }

        const data = await response.json();
        if (data.success) {
          // Parse the attendance dates from the response and convert to Date objects
          const attendedDates = data.attendance.map((entry) => parseISO(entry.attendance_date));
          setAttendanceDates(attendedDates);
        } else {
          console.error(data.message || "No attendance data available.");
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Show loading state until attendance data is fetched
  if (loading) {
    return <div className="text-center text-gray-500">Loading attendance...</div>;
  }

  return (
    <main className="flex items-center justify-center flex-col min-h-[80vh] p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Attendance</h2>

      {/* Calendar Component */}
      <Calendar
        selected={attendanceDates}
        showOutsideDays
        modifiers={{
          marked: attendanceDates, // Pass the marked dates to the calendar
        }}
        modifiersClassNames={{
          marked: "bg-primary text-white rounded-full", // Add Tailwind class to style the highlighted dates
        }}
      />

      {/* Attendance Key */}
      <div className="flex flex-col items-center mt-6">
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-primary rounded-full"></span>
          <span className="text-sm">Attended that day</span>
        </div>
      </div>
    </main>
  );
}
