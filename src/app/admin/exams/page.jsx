"use client";

import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddExam from "@/components/admin/AddExam";

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

function Exams() {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingExam, setEditingExam] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const itemsPerPage = 10;
  const totalPages = Math.ceil(exams.length / itemsPerPage);
  const router = useRouter();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam); 
    toggleSidebar(); // Open the sidebar when editing an exam
  };
  // Function to handle changing the page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filter exams based on the search term
  const filteredExams = exams.filter((exam) =>
    exam.exam_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the products for the current page
  const currentExams = filteredExams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format) => {
    // Logic to handle export based on format
    console.log(`Exporting as ${format}`);
  };
  // Fetch exams from the server
  
    const fetchExams = async () => {
      try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/exams/fetch_exams.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setExams(data.exams || []);
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
        setError("Error fetching exams");
      }
    };
  useEffect(() => {
    fetchExams();
  }, []);
 
  const handleNewExam = () => {
    fetchExams(); 
    setEditingExam(null); // Reset editing state after adding a new exam
  };
  const handleDeleteExam = async (examId) => {
    const confirmDelete = confirm("Are you sure you want to delete this exam?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://lms.ennovat.com/lms-admin/exams/delete_exam.php?exam_id=${examId}`, {
          method: "DELETE",
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          alert("Exam deleted successfully!");
          fetchExams(); 
        } else {
          alert("Failed to delete exam: " + result.message);
        }
      } catch (error) {
        console.error("Error deleting exam:", error);
        alert("Error deleting exam");
      }
    }
  };

  const handleSendSMS = async (examId) => {
    try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/marks/sms_marks.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ exam_id: examId }),
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
        } else {
            alert(result.message); // Show any error messages
        }
    } catch (error) {
        console.error("Error fetching exam details:", error);
        alert("Error fetching exam details.");
    }
};
const handleMarksRedirection = (examId) => {
  router.push(`exams/results/${examId}`);
}
  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Exams</CardTitle>
            <CardDescription>
              Create your exams and edit them as needed.
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
          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead>Name</TableHead>
                <TableHead className="p-4">Course</TableHead>
                <TableHead>MCQ Marks</TableHead>
                <TableHead>CQ Marks</TableHead>
                <TableHead>Practical Marks</TableHead>
                <TableHead>Bonus Marks</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Student Visibility</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentExams.map((exam) => (
                <TableRow
                  key={exam.exam_id}
                  className="hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <TableCell className="p-4 font-medium text-gray-800">
                    {exam.exam_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {exam.course_names}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {exam.mcq_marks}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {exam.cq_marks}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {exam.practical_marks}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {exam.bonus_marks}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {Number(exam.mcq_marks) + Number(exam.cq_marks) + Number(exam.practical_marks)}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    <Badge variant="default">{exam.student_visibility}</Badge>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {exam.exam_date}
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
                        <DropdownMenuItem onClick={() => handleMarksRedirection(exam.exam_id)}>Manage Marks</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendSMS(exam.exam_id)}>Send SMS</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditExam(exam)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteExam(exam.exam_id)}>Delete</DropdownMenuItem>
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
              {Math.min(currentPage * itemsPerPage, exams.length)}
            </strong>{" "}
            of <strong>{exams.length}</strong> rows
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
      <AddExam onExamAdded={handleNewExam} exam={editingExam} setEditingExam={setEditingExam} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </main>
  );
}

export default function Page() {
  return (
    <main>
      <Tabs defaultValue="exams">
        <TabsList className="mb-2">
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger disabled value="results">
            Combined Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exams">
          <Exams />
        </TabsContent>
      </Tabs>
    </main>
  );
}