"use client";

import React, { useEffect, useState } from "react";
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

export default function MaterialsReceiver({ params }) {
  const material_id = params.material_id;
  const [receivers, setReceivers] = useState([]);
  const [error, setError] = useState("");
  const [studentIndex, setStudentIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReceivers = async () => {
    try {
      const response = await fetch(
        `http://localhost/lms-admin/materials_receivers/fetch_materials_receivers.php?material_id=${encodeURIComponent(
          material_id
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
        setReceivers(data.receivers || []);
      }
    } catch (error) {
      console.error("Error fetching receivers:", error);
      setError("Error fetching receivers");
    }
  };

  useEffect(() => {
    fetchReceivers();
  }, [material_id]);

  const handleMarkAsAttended = async () => {
    try {
      const response = await fetch(
        "http://localhost/lms-admin/materials_receivers/create_materials_receiver.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            material_id,
            student_index: studentIndex,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Student marked as received material successfully");
        setStudentIndex("");
        fetchReceivers(); // Refresh the receivers list
      } else {
        alert(data.error || "Failed to mark student as received material");
      }
    } catch (error) {
      console.error("Error marking student as received material:", error);
      alert("An error occurred while marking student as received material");
    }
  };

  const handleDelete = async (receiverId) => {
    if (window.confirm("Are you sure you want to delete this receiver?")) {
      try {
        const response = await fetch(
          `http://localhost/lms-admin/materials_receivers/delete_materials_receiver.php?id=${receiverId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          alert("Receiver deleted successfully");
          fetchReceivers(); // Refresh the receivers list
        } else {
          throw new Error(data.error || "Failed to delete receiver");
        }
      } catch (error) {
        console.error("Error deleting receiver:", error);
        alert("Failed to delete receiver");
      }
    }
  };

  // Filter receivers based on the search term
  const filteredReceivers = receivers.filter(
    (receiver) =>
      receiver.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receiver.student_index.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receiver.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receiver.batch_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the receivers for the current page
  const currentReceivers = filteredReceivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to handle changing the page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(filteredReceivers.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>Add Material Receiver</CardTitle>
          <CardDescription>Add student index to record students.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="relative w-full lg:w-1/2 my-2 lt:my-6">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Student Index
              </label>
              <input
                type="text"
                className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                placeholder="Enter Student Index"
                value={studentIndex}
                onChange={(e) => setStudentIndex(e.target.value)}
              />
            </div>
            <div className="relative w-full lg:w-1/2 my-2 lt:my-6">
              <Button className="w-full" onClick={handleMarkAsAttended}>Give Material</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-x-auto">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Material Receivers</CardTitle>
            <CardDescription>Manage material receivers.</CardDescription>
          </div>
          {/* ... (search and export buttons remain the same) */}
        </CardHeader>

        <CardContent className="overflow-auto">
          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead className="p-4">Index</TableHead>
                <TableHead className="p-4">Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="p-4">Batch</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentReceivers.map((receiver, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <TableCell className="p-4 font-medium text-gray-800">
                    {receiver.student_index}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {receiver.student_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {receiver.course_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {receiver.batch_name}
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
                        <DropdownMenuItem onClick={() => handleDelete(receiver.material_receiver_id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {/* ... (pagination remains the same) */}
      </Card>
    </main>
  );
}
