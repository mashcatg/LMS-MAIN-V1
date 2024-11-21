"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  FileText,
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
  DropdownMenuContent,
  DropdownMenuItem,
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

export default function Results() {
  const [examDetails, setExamDetails] = useState(null);  // Separate state for exam details
  const [students, setStudents] = useState([]);  // State for students marks
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [examId, setExamId] = useState(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(students.length / itemsPerPage);  // Use students array for pagination

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.pathname.split("/").pop();
    if (id) {
      setExamId(id);
    }
  }, []);

  // Fetch the marks and exam details
  useEffect(() => {
    const fetchMarks = async () => {
      const response = await fetch(
        `http://localhost/lms-admin/marks/fetch_marks.php?exam_id=${examId}`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.success) {
        setExamDetails(result.marks);  // Set exam details like name and date
        setStudents(result.students);  // Set students array for marks
      } else {
        setError(result.message);
      }
    };

    if (examId) {
      fetchMarks();
    }
  }, [examId]);

  // Handle input changes for marks and send update to the backend
  const handleMarksChange = async (examId, field, value, student) => {
    const updatedMarks = {
      exam_id: examId,
      student_index: student.student_index,
      mcq_marks: field === "mcq_marks" ? parseFloat(value) : student.mcq_marks,
      cq_marks: field === "cq_marks" ? parseFloat(value) : student.cq_marks,
      practical_marks:
        field === "practical_marks" ? parseFloat(value) : student.practical_marks,
    };

    try {
      const response = await fetch(
        `http://localhost/lms-admin/marks/update_marks.php?mark_id=${student.marks_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMarks),
          credentials: "include",
        }
      );

      const result = await response.json();
      if (!result.success) {
        alert("Failed to update marks: " + result.message);
      } else {
        // Update the local state to reflect the changes immediately
        setStudents((prevStudents) =>
          prevStudents.map((s) =>
            s.student_index === student.student_index
              ? {
                  ...s,
                  [field]: value === "" ? null : parseFloat(value),
                  total_marks: calculateTotalMarks(
                    s.mcq_marks,
                    s.cq_marks,
                    s.practical_marks,
                    examDetails?.bonus_marks
                  ),
                }
              : s
          )
        );
      }
    } catch (error) {
      console.error("Error updating marks:", error);
      alert("Error updating marks");
    }
  };

  // Calculate total marks for a student (MCQ, CQ, Practical + Bonus)
  const calculateTotalMarks = (mcq_marks, cq_marks, practical_marks, bonus_marks = 0) => {
    const mcq = parseFloat(mcq_marks) || 0;
    const cq = parseFloat(cq_marks) || 0;
    const practical = parseFloat(practical_marks) || 0;
    const bonus = parseFloat(bonus_marks) || 0;

    return mcq + cq + practical + bonus;
  };

  // Filtering students based on the search term
  const filteredResults = students.filter((student) => {
    const keywords = searchTerm.toLowerCase().split(" ");
    return keywords.every(
      (keyword) =>
        student.student_name.toLowerCase().includes(keyword) ||
        student.student_index.toLowerCase().includes(keyword) ||
        student.batch_name.toLowerCase().includes(keyword)
    );
  });

  // Paginate the filtered results
  const currentResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Add students marks and edit them as needed.
            </CardDescription>
            {examDetails && (
              <div className="mt-2">
                <p>Exam Name: {examDetails.exam_name}</p>
                <p>Exam Date: {examDetails.exam_date}</p>
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <div className="relative w-full">
              <label
                htmlFor="input-box"
                className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600"
              >
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
          </div>
        </CardHeader>

        <CardContent className="overflow-auto">
          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead>Position</TableHead>
                <TableHead className="p-4">Index</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>MCQ Marks</TableHead>
                <TableHead>CQ Marks</TableHead>
                <TableHead>Practical Marks</TableHead>
                <TableHead>Bonus Marks</TableHead>
                <TableHead>Total Marks</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentResults.map((student, index) => (
                <TableRow
                  key={student.student_index}
                  className="hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <TableCell className="p-4 font-medium text-gray-800">
                    {index + 1}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {student.student_index}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {student.student_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {student.batch_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    <input
                      type="text"
                      className="w-24 border text-md h-full rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={student.mcq_marks === null ? "" : student.mcq_marks}
                      onChange={(e) =>
                        handleMarksChange(examId, "mcq_marks", e.target.value, student)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    <input
                      type="text"
                      className="w-24 border text-md h-full rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={student.cq_marks === null ? "" : student.cq_marks}
                      onChange={(e) =>
                        handleMarksChange(examId, "cq_marks", e.target.value, student)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    <input
                      type="text"
                      className="w-24 border text-md h-full rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={student.practical_marks === null ? "" : student.practical_marks}
                      onChange={(e) =>
                        handleMarksChange(examId, "practical_marks", e.target.value, student)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {examDetails?.bonus_marks || 0}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {calculateTotalMarks(
                      student.mcq_marks,
                      student.cq_marks,
                      student.practical_marks,
                      examDetails?.bonus_marks
                    )}
                  </TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <nav className="flex justify-between items-center w-full">
            <Button onClick={() => handlePageChange(currentPage - 1)}>
              <ChevronLeft className="mr-2 w-4 h-4" />
              Previous
            </Button>

            <span className="text-sm font-medium text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <Button onClick={() => handlePageChange(currentPage + 1)}>
              Next
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </nav>
        </CardFooter>
      </Card>
    </main>
  );
}
