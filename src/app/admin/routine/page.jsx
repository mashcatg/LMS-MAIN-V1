"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  FileText,
} from "lucide-react";
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
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddRoutine from "@/components/admin/AddRoutine";

export default function Routine() {
  const [error, setError] = useState(null);
  const [routineData, setRoutineData] = useState([]);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const fetchRoutine = async () => {
    try {
      const response = await fetch("http://localhost/lms-admin/routines/fetch_routines.php", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setRoutineData(data.routines || []);
      } else {
        setError(data.message || "Error fetching routine");
      }
    } catch (error) {
      console.error("Error fetching routine:", error);
      setError("Error fetching routine");
    }
  };

  useEffect(() => {
    fetchRoutine();
  }, []);

  const handleNewRoutine = () => {
    fetchRoutine(); 
  };

  const totalPages = Math.ceil(routineData.length / itemsPerPage);

  const filteredRoutine = routineData.filter((routine) =>
    routine.routine_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentRoutine = filteredRoutine.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteRoutine = async (routineId) => {
    const confirmDelete = confirm("Are you sure you want to delete this routine?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost/lms-admin/routines/delete_routine.php?routine_id=${routineId}`, {
          method: "DELETE",
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          alert("Routine deleted successfully!");
          fetchRoutine(); 
        } else {
          alert("Failed to delete routine: " + result.message);
        }
      } catch (error) {
        console.error("Error deleting routine:", error);
        alert("Error deleting routine");
      }
    }
  };

  const handleEditRoutine = (routine) => {
    setEditingRoutine(routine);
  };

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card className="overflow-x-auto">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Routine</CardTitle>
            <CardDescription>
              Upload and share routine as you need.
            </CardDescription>
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
                <TableHead className="p-4">Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Routine File</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentRoutine.length ? (
                currentRoutine.map((routine) => (
                  <TableRow key={routine.routine_id} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                    <TableCell className="p-4 font-medium text-gray-800">
                      {routine.routine_name}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {routine.course_names}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {routine.batch_names}
                    </TableCell>
                    <TableCell>
                      <Button variant="default" as="a" href={routine.file_address}>
                        Open File
                      </Button>
                    </TableCell>
                    <TableCell className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="w-8 h-8 p-0">
                            <EllipsisVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleEditRoutine(routine)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteRoutine(routine.routine_id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No routines found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
      <AddRoutine onBatchAdded={handleNewRoutine} editingRoutine={editingRoutine} setEditingRoutine={setEditingRoutine} />
    </main>
  );
}
