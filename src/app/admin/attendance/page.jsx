"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  File,
  FileText,
  Home,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export default function Attendance() {

  const [attendances, setAttendances] = useState([]);
  const [date, setDate] = useState("");
  const [studentIndex, setStudentIndex] = useState("");
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [totalAttendances, setTotalAttendances] = useState(0);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(attendances.length / itemsPerPage);

  // Function to handle changing the page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const filteredAttendances = attendances.filter((attendance) => {
    const keywords = searchTerm.toLowerCase().split(" ");
    const matchesKeywords = keywords.every((keyword) =>
        attendance.student_name.toLowerCase().includes(keyword) ||
        attendance.student_index.toLowerCase().includes(keyword) ||
        attendance.course_name.toLowerCase().includes(keyword) ||
        attendance.batch_name.toLowerCase().includes(keyword) ||
        attendance.attendance_date.toLowerCase().includes(keyword)
    );

    const matchesCourse = selectedCourse ? attendance.course_id === selectedCourse : true;
    const matchesBatch = selectedBatch ? attendance.batch_id === selectedBatch : true;
    const matchesDate = date ? attendance.attendance_date === date : true;

    return matchesKeywords && matchesCourse && matchesBatch && matchesDate;
});

  // Get the products for the current page
  const currentAttendances = filteredAttendances.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = () => {
    // Logic to handle export based on format
    console.log(Exporting);
  };



  
    const fetchAttendances = async () => {
      try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/attendances/fetch_attendances.php", {
          method: "GET",
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.error) {
          setError(data.error);
        } else {
          setAttendances(data.attendance || []);
          setTotalEnrollments(data.total_enrollments || 0);
          setTotalAttendances(data.total_attendances || 0);
        }
      } catch (error) {
        console.error("Error fetching attendances:", error);
        setError("Error fetching attendances");
      }
    };
  useEffect(() => {
    fetchAttendances();
  }, []);

  const handleDeleteAttendance = async (attendanceId) => {
    const confirmDelete = confirm("Are you sure you want to delete this attendance?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://lms.ennovat.com/lms-admin/attendances/delete_attendance.php?attendance_id=${attendanceId}`, {
          method: "DELETE",
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          alert("Attendence deleted successfully!");
          fetchAttendances(); 
        } else {
          alert("Failed to delete attendance: ../ " + result.message);
        }
      } catch (error) {
        console.error("Error deleting attendance:", error);
        alert("Error deleting attendance");
      }
    }
  };
  const handleAddAttendance = async (e) => {
    e.preventDefault();
    if (!date || !studentIndex) {
      alert("Please enter both date, student index, course and batch.");
      return;
    }
  
    try {
      const formData = new URLSearchParams();
      formData.append("attendance_date", date);
      formData.append("student_index", studentIndex);
  
      const response = await fetch("http://lms.ennovat.com/lms-admin/attendances/create_attendance.php", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Attendance marked successfully!");
        fetchAttendances(); // Refresh the attendance data
        setStudentIndex("");
      
      } else {
        alert("Failed to mark attendance: " + result.message);
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("Error marking attendance");
    }
};

const fetchCourses = async () => {
  try {
    const response = await fetch(
      "http://lms.ennovat.com/lms-admin/courses/fetch_courses.php",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    setCourses(data.courses || []);
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};
useEffect(() => {
  fetchCourses(); // Fetch courses when the component mounts
}, []); // Removed dependency array to prevent multiple fetches

const fetchBatches = async (courseId) => {
  try {
    const response = await fetch(
      `http://lms.ennovat.com/lms-admin/batches/fetch_course_batch.php?course_ids=${courseId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    setBatches(data.batches || []);
  } catch (error) {
    console.error("Error fetching batches:", error);
  }
};

const handleCourseChange = async (event) => {
  const courseId = event.target.value;
  setSelectedCourse(courseId);
  await fetchBatches(courseId); // Fetch batches for the selected course
  setSelectedBatch(""); // Reset batch selection when course changes
};

const handleBatchChange = (event) => {
  const batchId = event.target.value;
  setSelectedBatch(batchId);
};


const handleSMSUnattendees = async () => {
  if (!selectedCourse || !selectedBatch || !date) {
    alert("Please select course, batch and date.");
    return;
  }
  try {
    const formData = new URLSearchParams();
    formData.append("course_id", selectedCourse);
    formData.append("batch_id", selectedBatch);
    formData.append("date", date);
  
    const response = await fetch("http://lms.ennovat.com/lms-admin/attendances/sms_unattendees.php", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });
  
    const result = await response.json();
    if (result.success) {
      alert("SMS sent successfully!");
    } else {
      alert("Failed to send SMS: " + result.message);
    }
  } catch (error) {
    console.error("Error sending SMS:", error);
    alert("Error sending SMS");
  }
};

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Add Attendees</CardTitle>
            <CardDescription>
              Add date and student index to mark them as attended.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="w-full flex flex-col lg:flex-row gap-4">
          <form onSubmit={handleAddAttendance} className="w-full flex flex-col lg:flex-row gap-4">
            {/* Date */}
            <div className="relative w-full lg:w-1/3 my-2 lt:my-6">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Date
              </label>
              <input
                    type="date"
                    className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Enter Exam Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} // This updates the date state
                    required
                />

            </div>
            {/* Student Index */}
            <div className="relative w-full lg:w-1/3 my-2 lt:my-6">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Student Index
              </label>
              <input
                type="text"
                className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                placeholder="Enter Student Index"
                value={studentIndex}
                onChange={(e) => setStudentIndex(e.target.value)}
                required
              />
            </div>
            <div className="relative w-full lg:w-1/3 my-2">
              <Button type="submit" className="w-full">Mark as Attended</Button>
            </div>
          </form>
          </div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Attendances</CardTitle>
            <CardDescription>
              Manage your course attendance data as needed.
            </CardDescription>
          </div>
          <div className="flex space-x-4">
            <div class="relative w-full ">
              <label
                for="input-box"
                class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600"
              >
                Search
              </label>
              <input
                id="input-box"
                type="text"
                class="border text-md h-full rounded-md w-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Type something..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default">
                  <FileText className="mr-2 w-4 h-4" />
                  Export <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("Print")}>
                  Print
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("CSV")}>
                  CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("Excel")}>
                  Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        {/* Product Table */}
        <CardContent className="overflow-auto">
          <div className="w-full flex flex-col lg:flex-row gap-4 mb-4">
            {/* Course Name */}
            <div className="relative w-full lg:w-1/3 my-2 lt:my-6">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Course Name
              </label>
              <select 
              value={selectedCourse}
              onChange={handleCourseChange}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent">
                <option value="" disabled selected>
                  Select Course
                </option>
                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Name */}
            <div className="relative w-full lg:w-1/3 my-2 lt:my-6">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Batch Name
              </label>
              <select 
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent">
                <option value="" disabled selected>
                  Select Batch
                </option>
                {batches.map((batch) => (
                  <option key={batch.batch_id} value={batch.batch_id}>
                    {batch.batch_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="relative w-full lg:w-1/3 my-2 lt:my-6">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Date
              </label>
              <input
                type="date"
                className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                placeholder="Enter Exam Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="relative w-full lg:w-1/3 my-2 lt:my-6">
              <Button onClick={handleSMSUnattendees} className="w-full">SMS Unattendees</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <div className="flex flex-row justify-between items-center">
                {/* Left side with title and stats */}
                <div className="flex-1">
                  <CardHeader className="space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Enrollments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{totalEnrollments}</div>
                  </CardContent>
                </div>

                {/* Right side with the Users icon */}
                <div className="h-full top-0 p-4">
                  <Users className="h-12 w-12 text-green-600 bg-green-100 p-2 rounded-[0.5rem]" />
                </div>
              </div>
            </Card>

            <Card x-chunk="dashboard-01-chunk-0">
              <div className="flex flex-row justify-between items-center">
                {/* Left side with title and stats */}
                <div className="flex-1">
                  <CardHeader className="space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Attendees
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{totalAttendances}</div>
                  </CardContent>
                </div>

                {/* Right side with the Users icon */}
                <div className="h-full top-0 p-4">
                  <UserPlus className="h-12 w-12 text-sky-600 bg-sky-100 p-2 rounded-[0.5rem]" />
                </div>
              </div>
            </Card>

            <Card x-chunk="dashboard-01-chunk-0">
              <div className="flex flex-row justify-between items-center">
                {/* Left side with title and stats */}
                <div className="flex-1">
                  <CardHeader className="space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Absent
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{totalEnrollments - totalAttendances}</div>
                  </CardContent>
                </div>

                {/* Right side with the Users icon */}
                <div className="h-full top-0 p-4">
                  <UserMinus className="h-12 w-12 text-orange-600 bg-orange-100 p-2 rounded-[0.5rem]" />
                </div>
              </div>
            </Card>
          </div>

          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead>Index</TableHead>
                <TableHead className="p-4">Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentAttendances.map((attendance, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <TableCell className="p-4 font-medium text-gray-800">
                    {attendance.student_index}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {attendance.student_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {attendance.course_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {attendance.batch_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {attendance.attendance_date}
                  </TableCell>
                  <TableCell className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border p-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        >
                          <span className="sr-only">Open options</span>
                          <EllipsisVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        
                        <DropdownMenuItem onClick={() => handleDeleteAttendance(attendance.attendance_id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, attendances.length)}
            </strong>{" "}
            of <strong>{attendances.length}</strong> rows
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft />
            </Button>

            {currentPage > 2 && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => handlePageChange(1)}
              >
                1
              </Button>
            )}
            {currentPage > 3 && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled
              >
                ...
              </Button>
            )}

            {currentPage > 1 && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </Button>
            )}

            <Button variant="default" size="icon">
              {currentPage}
            </Button>

            {currentPage < totalPages && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </Button>
            )}
            {currentPage + 2 < totalPages && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
              >
                ...
              </Button>
            )}
            {currentPage + 1 < totalPages && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            )}

            <Button
              variant="secondary"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}