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
import AddEnrollment from "@/components/admin/AddEnrollment";
import AddQuestion from "@/components/admin/AddQuestion";
export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";
  
function Questions() {
  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.pathname.split("/").pop();
    if (id) {
      setQuizId(id);
    }
  }, []);

  // Fetch questions from the server
 
    const fetchQuestions = async (quizId) => {
      try {
        const response = await fetch(
          `http://localhost/lms-admin/quizzes/fetch_questions.php?quiz_id=${quizId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setQuestions(data.questions || []);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Error fetching questions");
      }
    };
  useEffect(() => {
    if (quizId) {
      fetchQuestions(quizId);
    }
  }, [quizId]);
  const handleQuestionAdd = (quizId) => {
      fetchQuestions(quizId);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  // Function to handle changing the page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filter questions based on the search term
  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the products for the current page
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format) => {
    // Logic to handle export based on format
    console.log(`Exporting as ${format}`);
  };
  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
  
    try {
      const response = await fetch(`http://localhost/lms-admin/quizzes/delete_question.php?question_id=${questionId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        alert("Question deleted successfully!");
        fetchQuestions(quizId);
      } else {
        alert(data.error || "Failed to delete the question.");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question.");
    }
  };
  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <AddQuestion quizId={quizId} onAddedQuestion={() => handleQuestionAdd(quizId)} />
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Questions</CardTitle>
            <CardDescription>
              Add questions and edit them as needed.
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
                <TableHead>ID</TableHead>
                <TableHead className="p-4">Question</TableHead>
                <TableHead>Option</TableHead>
                <TableHead>Option</TableHead>
                <TableHead>Option</TableHead>
                <TableHead>Option(Answer)</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentQuestions.map((question, index) => {
                return (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <TableCell className="p-4 font-medium text-gray-800">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: question.question_id,
                        }}
                      />
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      <div
                        dangerouslySetInnerHTML={{ __html: question.question }}
                      />
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      <div
                        dangerouslySetInnerHTML={{ __html: question.option_1 }}
                      />
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      <div
                        dangerouslySetInnerHTML={{ __html: question.option_2 }}
                      />
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      <div
                        dangerouslySetInnerHTML={{ __html: question.option_3 }}
                      />
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: question.correct_option_4,
                        }}
                      />
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
                        <DropdownMenuItem onClick={() => handleDeleteQuestion(question.question_id)}>Delete</DropdownMenuItem>
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
              {Math.min(currentPage * itemsPerPage, questions.length)}
            </strong>{" "}
            of <strong>{questions.length}</strong> rows
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

function Leaderboard() {
  const [quizId, setQuizId] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.pathname.split("/").pop();
    if (id) {
      setQuizId(id);
    }
  }, []);

  // Fetch leaderboard from the server
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `http://localhost/lms-admin/quizzes/fetch_leaderboard.php?quiz_id=${quizId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setLeaderboard(data.leaderboard || []);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError("Error fetching leaderboard");
      }
    };
    if (quizId) {
      fetchLeaderboard();
    }
  }, [quizId]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(leaderboard.length / itemsPerPage);

  // Function to handle changing the page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filter leaderboard based on the search term
  const filteredLeaderboard = leaderboard.filter(
    (leaderboard) =>
      leaderboard.student_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      leaderboard.student_institution
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      leaderboard.student_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      leaderboard.student_index.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the products for the current page
  const currentLeaderboard = filteredLeaderboard.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format) => {
    // Logic to handle export based on format
    console.log(`Exporting as ${format}`);
  };

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Questions</CardTitle>
            <CardDescription>
              Add questions and edit them as needed.
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
                <TableHead>Position</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="p-4">Index</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentLeaderboard.map((leaderboard, index) => {
                return (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <TableCell className="p-4 font-medium text-gray-800">
                      {leaderboard.position}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {leaderboard.student_name}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {leaderboard.student_index}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {leaderboard.student_number}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {leaderboard.student_institution}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {leaderboard.marks}
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
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
              {Math.min(currentPage * itemsPerPage, leaderboard.length)}
            </strong>{" "}
            of <strong>{leaderboard.length}</strong> rows
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

export default function Page() {
  return (
    <main>
      <Tabs defaultValue="questions">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <Questions />
        </TabsContent>

        <TabsContent value="leaderboard">
          <Leaderboard />
        </TabsContent>
      </Tabs>
    </main>
  );
}