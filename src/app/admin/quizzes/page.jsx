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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import AddQuiz from "@/components/admin/AddQuiz";
import AddEnrollment from "@/components/admin/AddEnrollment";
export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export default function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");
  const [editingQuiz, setEditingQuiz] = useState(null);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(
        "http://localhost/lms-admin/quizzes/fetch_quiz.php",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setQuizzes(data.quizzes || []);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setError("Error fetching quizzes");
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(quizzes.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.quiz_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentQuizzes = filteredQuizzes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
  };

  const handleDelete = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        const response = await fetch(
          `http://localhost/lms-admin/quizzes/delete_quiz.php`,
          {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({ quiz_id: quizId })
          }
        );
        const data = await response.json();
        if (data.success) {
          alert("Quiz deleted successfully");
          fetchQuizzes(); // Refresh the quiz list
        } else {
          throw new Error(data.message || "Failed to delete quiz");
        }
      } catch (error) {
        console.error("Error deleting quiz:", error);
        alert("Failed to delete quiz");
      }
    }
  };

  const handleQuizAdded = () => {
    fetchQuizzes(); // Refresh the quiz list
    alert(editingQuiz ? "Quiz updated successfully" : "Quiz added successfully");
    setEditingQuiz(null);
  };

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
  };
  const handleSendSMS = async (quizId) => {
    try {
        const response = await fetch("http://localhost/lms-admin/quizzes/sms_leaderboard.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ quiz_id: quizId }),
        });

        const result = await response.json();

        if (result.success) {
          alert("Quiz SMS sent successfully.");
        } else {
            alert(result.message); // Show any error messages
        }
    } catch (error) {
        console.error("Error fetching exam details:", error);
        alert("Error fetching exam details.");
    }
};
  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Quizzes</CardTitle>
            <CardDescription>
              Add your quizzes and edit them as needed.
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
                <TableHead className="p-4">Quiz Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>On Live</TableHead>
                <TableHead>Multiple Availability</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentQuizzes.map((quiz, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <TableCell className="p-4 font-medium text-gray-800">
                    {quiz.quiz_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {quiz.course_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {quiz.questions_per_quiz}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {quiz.quiz_duration}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {quiz.student_visibility === "1" ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {quiz.multiple_availability === "1" ? "On" : "Off"}
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
                        <Link href={`/admin/quizzes/${quiz.quiz_id}`}>
                          {" "}
                          <DropdownMenuItem>Manage Quiz Questions</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => handleSendSMS(quiz.quiz_id)}>Send SMS</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(quiz)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(quiz.quiz_id)}>Delete</DropdownMenuItem>
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
              {Math.min(currentPage * itemsPerPage, quizzes.length)}
            </strong>{" "}
            of <strong>{quizzes.length}</strong> rows
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
      <AddQuiz onQuizAdded={handleQuizAdded} editingQuiz={editingQuiz} setEditingQuiz={setEditingQuiz} />
    </main>
  );
}
