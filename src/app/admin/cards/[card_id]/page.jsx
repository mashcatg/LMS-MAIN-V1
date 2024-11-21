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
  Printer,
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
import AddCard from "@/components/admin/AddCard";
import AddBranch from "@/components/admin/AddBranch";
export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export default function Cards({ params }) {
  const card_id = params.card_id;
  const [students, setStudents] = useState([]);

  const [courses, setCourses] = useState([]);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  // Fetch students from the server
  useEffect(() => {
    if (card_id) {
      const fetchStudents = async () => {
        try {
          const response = await fetch(
            `http://localhost/lms-admin/cards/fetch_students.php?card_id=${encodeURIComponent(
              card_id
            )}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await response.json();
          if (data.error) {
            setError(data.error);
          } else {
            setStudents(data.students || []);
          }
        } catch (error) {
          console.error("Error fetching students:", error);
          setError("Error fetching students");
        }
      };
      fetchStudents();
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(students.length / itemsPerPage);

  // Function to handle changing the page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filter batchs based on the search term
  const filteredStudents = students.filter((student) =>
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the batchs for the current page
  const currentStudents = filteredStudents.slice(
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
            <CardTitle>Cards</CardTitle>
            <CardDescription>
              Print cards of your students in clicks
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
            <Link
              href={`/prints/student-card/${card_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" className="py-2">
                <Printer className="mr-2 max-h-4" /> Print All
              </Button>
            </Link>
          </div>
        </CardHeader>

        {/* Product Table */}
        <CardContent className="overflow-auto">
          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead>Name</TableHead>
                <TableHead className="p-4">Institution</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentStudents.map((student, index) => {
                return (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <TableCell className="p-4 font-medium text-gray-800">
                      {student.student_name}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {student.student_institution}
                    </TableCell>
                    <TableCell className="p-4 text-right">
                      <Link
                        href={`/prints/student-card/${card_id}/${student.student_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="mr-2">
                          <Printer className="mr-2 max-h-4" /> Print
                        </Button>
                      </Link>
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
              {Math.min(currentPage * itemsPerPage, students.length)}
            </strong>{" "}
            of <strong>{students.length}</strong> rows
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
      <AddCard />
    </main>
  );
}