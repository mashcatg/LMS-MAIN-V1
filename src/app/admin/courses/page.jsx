"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Component,
  EllipsisVertical,
  File,
  FileText,
  Home,
  ListFilter,
  Map,
  MoreHorizontal,
  PlusCircle,
  School,
  User,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCourse from "@/components/admin/AddCourse";
import AddBatch from "@/components/admin/AddBatch";
import AddBranch from "@/components/admin/AddBranch";
export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";
function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [batches, setBatches] = useState([])

  const itemsPerPage = 10;

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost/lms-admin/courses/fetch_courses.php", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Error fetching courses");
    }
  };
  const fetchBatches = async () => {
    try {
      const response = await fetch("http://localhost/lms-admin/batches/fetch_batches.php", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setBatches(data.batches || []);
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
      setError("Error fetching batches");
    }
  };
  useEffect(() => {
    fetchCourses();
    fetchBatches();
  }, [])
  const handleCourseAdded = () => {
    fetchCourses();
  };
  const handleCourseEdited = () => {
    fetchCourses();
    fetchBatches();
    setEditingCourse(null);
  };
  const handleDeleteCourse = async (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await fetch(
          `http://localhost/lms-admin/courses/delete_course.php?course_id=${courseId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          alert("Course deleted successfully!");
          setCourses(prevCourses => prevCourses.filter(course => course.course_id !== courseId));
        } else {
          alert(`Error: ${data.message || "Failed to delete course"}`);
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Error deleting course");
      }
    }
  };
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch(
          "http://localhost/lms-admin/students/fetch_enrollments.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setEnrollments(data.enrollments || []);
        }
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        setError("Error fetching enrollments");
      }
    };
    fetchEnrollments();
  }, []);


  // Filter courses based on the search term
  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Get the products for the current page
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format) => {
    // Logic to handle export based on format
    console.log(`Exporting as ${format}`);
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Courses</CardTitle>
            <CardDescription>
              Create your courses and edit them as needed.
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
                  <span className="flex items-center">
                    <FileText className="mr-2 w-4 h-4" />
                    Export <ChevronDown className="ml-2 w-4 h-4" />
                  </span>
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
          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Banner
                </TableHead>
                <TableHead className="p-4">Name</TableHead>
                <TableHead>Total Batches</TableHead>
                <TableHead>Total Students</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCourses.map((course, index) => {
                const currentBatches = batches.filter(
                  (batch) => batch.course_id === course.course_id
                );
                const currentEnrollments = enrollments.filter(
                  (enrollment) => enrollment.course_id === course.course_id
                );
                return (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <TableCell className="hidden w-[100px] sm:table-cell">
                      <img
                        src={course.course_banner}
                        alt={course.course_name}
                        className="h-10 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {course.course_name}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {currentBatches.length}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">
                        {currentEnrollments.length}
                      </Badge>
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
                          <DropdownMenuItem onClick={() => setEditingCourse(course)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteCourse(course.course_id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        {/* Pagination */}
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, courses.length)}
            </strong>{" "}
            of <strong>{courses.length}</strong> rows
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
      <AddCourse
        editingCourse={editingCourse} 
        onCourseAdded={handleCourseAdded} 
        onCourseEdited={handleCourseEdited} 
        onClose={() => setEditingCourse(null)} 
      />
      
    </main>
    </Suspense>
  );
}
function Batches() {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [editingBatch, setEditingBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(batches.length / itemsPerPage);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
  };
  const onBatchAdded = (newBatch) => {
    if (editingBatch) {
      // If editing, update the batch
      onBatchEdited(newBatch);
    } else {
      // If adding, append the new batch
      setBatches((prevBatches) => [...prevBatches, newBatch]);
    }
  };
  
  const onBatchEdited = (updatedBatch) => {
    setBatches((prevBatches) =>
      prevBatches.map((batch) =>
        batch.batch_id === updatedBatch.batch_id ? updatedBatch : batch
      )
    );
  };

  const onBatchDeleted = (batchId) => {
    setBatches((prevBatches) => prevBatches.filter((batch) => batch.batch_id !== batchId));
  };

  const deleteBatch = async (batchId) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      try {
        const response = await fetch(`http://localhost/lms-admin/batches/delete_batch.php?batch_id=${batchId}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await response.json();
        
        if (data.success) {
          onBatchDeleted(batchId); // Update state
          alert("Batch deleted successfully!"); // Alert success
        } else {
          alert(data.error || "Failed to delete the batch.");
        }
      } catch (error) {
        console.error("Error deleting batch:", error);
        alert("Error deleting batch");
      }
    }
  };

  
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch(
          "http://localhost/lms-admin/batches/fetch_batches.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setBatches(data.batches || []);
        }
      } catch (error) {
        console.error("Error fetching batches:", error);
        setError("Error fetching batches");
      }
    };
    fetchBatches();
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost/lms-admin/courses/fetch_courses.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setCourses(data.courses || []);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Error fetching courses");
      }
    };
    fetchCourses();
  }, []);
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch(
          "http://localhost/lms-admin/students/fetch_enrollments.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setEnrollments(data.enrollments || []);
        }
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        setError("Error fetching enrollments");
      }
    };
    fetchEnrollments();
  }, []);
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(
          "http://localhost/lms-admin/branches/fetch_branches.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setBranches(data.branches || []);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
        setError("Error fetching branches");
      }
    };
    fetchBranches();
  }, []);
  const filteredBatches = batches.filter((batch) =>
    batch.batch_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
   // Use filteredBatches here
  const currentBatches = filteredBatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Batches</CardTitle>
            <CardDescription>
              Add batches for course and edit them as needed.
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
                <DropdownMenuItem onClick={() => handleExport("PDF")}>
                  PDF
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
          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead>Course</TableHead>
                <TableHead className="p-4">Name</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Total Students</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBatches.map((batch, index) => {
                const currentEnrollments = enrollments.filter(
                  (enrollment) => enrollment.batch_id === batch.batch_id
                );
                const currentCourse = courses.find(
                  (course) => course.course_id === batch.course_id
                );
                const currentBranch = branches.find(
                  (branch) => branch.branch_id === batch.branch_id
                );
                return (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <TableCell className="p-4 font-medium text-gray-800">
                      <div className="flex items-center space-x-3">
                        {" "}
                        {/* Flex container */}
                        <img
                          src={currentCourse?.course_banner || ""}
                          alt={currentCourse?.course_name || ""}
                          className="h-10 rounded-md object-cover"
                        />
                        <span>{currentCourse?.course_name || "N/A"}</span>{" "}
                        {/* Course name */}
                      </div>
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {batch.batch_name}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {currentBranch?.branch_name || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">
                        {" "}
                        {currentEnrollments.length}
                      </Badge>
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
                          <DropdownMenuItem onClick={() => setEditingBatch(batch)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteBatch(batch.batch_id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        {/* Pagination */}
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, batches.length)}
            </strong>{" "}
            of <strong>{batches.length}</strong> rows
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
      <AddBatch
  onBatchAdded={onBatchAdded}
  onBatchEdited={onBatchEdited}  
  editingBatch={editingBatch}
  onClose={() => setEditingBatch(null)}
  courses={courses}
  branches={branches}
/>
    </main>
  );
}
function Branches() {
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBranch, setEditingBranch] = useState(null);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(branches.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredBranches = branches.filter((branch) =>
    branch.branch_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentBranches = filteredBranches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
  };

  const fetchBranches = async () => {
    try {
      const response = await fetch(
        "http://localhost/lms-admin/branches/fetch_branches.php",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setBranches(data.branches || []);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
      setError("Error fetching branches");
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);
  const deleteBranch = async (branchId) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
        try {
            const response = await fetch(`http://localhost/lms-admin/branches/delete_branch.php?branch_id=${branchId}`, {
                method: "DELETE",
                credentials: "include",  // Ensure credentials (cookies) are sent
            });
            const data = await response.json();
            console.log(data);  // Log response for debugging

            if (data.success) {
                alert("Branch deleted successfully!");
                fetchBranches();  // Refresh the branch list
            } else {
                alert(data.error || data.message || "Failed to delete the branch.");
            }
        } catch (error) {
            console.error("Error deleting branch:", error);
            alert("Error deleting branch");
        }
    }
};

  

  const onBranchAdded = () => {
    fetchBranches();  // Refresh the branch list
  };

  const onBranchEdited = () => {
    fetchBranches();
  };

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Branches</CardTitle>
            <CardDescription>
              Add branches and edit them as needed.
            </CardDescription>
          </div>
          <div className="flex space-x-4">
            <div className="relative w-full">
              <label htmlFor="input-box" className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Search
              </label>
              <input
                id="input-box"
                type="text"
                className="border text-md h-full rounded-md w-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                <DropdownMenuItem onClick={() => handleExport("PDF")}>PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("CSV")}>CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("Excel")}>Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="overflow-auto">
          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead>Name</TableHead>
                <TableHead className="p-4">Details</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBranches.map((branch, index) => (
                <TableRow key={index} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                  <TableCell className="p-4 font-medium text-gray-800">{branch.branch_name}</TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">{branch.branch_details}</TableCell>
                  <TableCell>{branch.branch_location}</TableCell>
                  <TableCell className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button type="button" className="inline-flex justify-center rounded-md border p-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                          <span className="sr-only">Open options</span>
                          <EllipsisVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setEditingBranch(branch)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteBranch(branch.branch_id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, branches.length)}
            </strong>{" "}
            of <strong>{branches.length}</strong> rows
          </div>
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
              <Button variant="secondary" size="icon" onClick={() => handlePageChange(1)}>1</Button>
            )}
            {currentPage > 3 && (
              <Button variant="secondary" size="icon" onClick={() => handlePageChange(1)} disabled>...</Button>
            )}
            {currentPage > 1 && (
              <Button variant="secondary" size="icon" onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</Button>
            )}
            <Button variant="default" size="icon">{currentPage}</Button>
            {currentPage < totalPages && (
              <Button variant="secondary" size="icon" onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</Button>
            )}
            {currentPage + 2 < totalPages && (
              <Button variant="secondary" size="icon" onClick={() => handlePageChange(totalPages)}>...</Button>
            )}
            {currentPage + 1 < totalPages && (
              <Button variant="secondary" size="icon" onClick={() => handlePageChange(totalPages)}>{totalPages}</Button>
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
      <AddBranch 
        editingBranch={editingBranch} 
        onBranchAdded={onBranchAdded} 
        onBranchEdited={onBranchEdited} 
        onClose={() => setEditingBranch(null)} 
      />
    </main>
  );
}
export default function Page() {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState("");
  // Fetch courses from the server
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost/lms-admin/courses/fetch_courses.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setCourses(data.courses || []);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Error fetching courses");
      }
    };
    fetchCourses();
  }, []);
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch(
          "http://localhost/lms-admin/batches/fetch_batches.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setBatches(data.batches || []);
        }
      } catch (error) {
        console.error("Error fetching batches:", error);
        setError("Error fetching batches");
      }
    };
    fetchBatches();
  }, []);
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(
          "http://localhost/lms-admin/branches/fetch_branches.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setBranches(data.branches || []);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
        setError("Error fetching branches");
      }
    };
    fetchBranches();
  }, []);
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <div className="flex flex-row justify-between items-center">
            {/* Left side with title and stats */}
            <div className="flex-1">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Branches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{branches.length}</div>
              </CardContent>
            </div>
            {/* Right side with the Users icon */}
            <div className="h-full top-0 p-4">
              <Map className="h-12 w-12 text-green-600 bg-green-100 p-2 rounded-[0.5rem]" />
            </div>
          </div>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <div className="flex flex-row justify-between items-center">
            {/* Left side with title and stats */}
            <div className="flex-1">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{courses.length}</div>
              </CardContent>
            </div>
            {/* Right side with the Users icon */}
            <div className="h-full top-0 p-4">
              <School className="h-12 w-12 text-sky-600 bg-sky-100 p-2 rounded-[0.5rem]" />
            </div>
          </div>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <div className="flex flex-row justify-between items-center">
            {/* Left side with title and stats */}
            <div className="flex-1">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Batches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{batches.length}</div>
              </CardContent>
            </div>
            {/* Right side with the Users icon */}
            <div className="h-full top-0 p-4">
              <Component className="h-12 w-12 text-orange-600 bg-orange-100 p-2 rounded-[0.5rem]" />
            </div>
          </div>
        </Card>
      </div>
      <Tabs defaultValue="courses">
        <TabsList className="mb-2">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <Courses />
        </TabsContent>
        <TabsContent value="batches">
          <Batches />
        </TabsContent>
        <TabsContent value="branches">
          <Branches />
        </TabsContent>
      </Tabs>
    </main>
  );
}
