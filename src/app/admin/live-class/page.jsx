"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  EllipsisVertical,
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
import AddLiveClass from "@/components/admin/AddLiveClass";

export default function LiveClasses() {
  const [liveClasses, setLiveClasses] = useState([]);
  const [editingLiveClass, setEditingLiveClass] = useState(null);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const totalPages = Math.ceil(liveClasses.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredLiveClasses = liveClasses.filter((live_class) =>
    live_class.live_class_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentLiveClasses = filteredLiveClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchLiveClasses = async () => {
    try {
      const response = await fetch('http://localhost/lms-admin/live-classes/fetch_live_classes.php', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setLiveClasses(data.live_classes || []);
      } else {
        setError(data.message || 'Failed to fetch live classes');
      }
    } catch (error) {
      console.error('Error fetching live classes:', error);
      setError('Failed to fetch live classes. Please try again later.');
    }
  };

  useEffect(() => {
    fetchLiveClasses();
  }, []);

  const handleAddLiveClass = () => {
    fetchLiveClasses();
  };

  const handleEditLiveClass = (liveClass) => {
    setEditingLiveClass(liveClass);
  };

  const handleDeleteLiveClass = async (liveClassId) => {
    if (confirm("Are you sure you want to delete this live class?")) {
      try {
        const response = await fetch(`http://localhost/lms-admin/live-classes/delete_live_class.php?live_class_id=${liveClassId}`, {
          method: 'POST', // Changed from DELETE to POST as it's more common for PHP scripts
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `live_class_id=${liveClassId}`,
        });

        const result = await response.json();
        if (result.success) {
          alert("Live Class deleted successfully!");
          fetchLiveClasses();
        } else {
          alert("Failed to delete live class.");
        }
      } catch (error) {
        console.error('Error deleting live class:', error);
        alert("Failed to delete live class. Please try again later.");
      }
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card className="overflow-x-auto">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Live Classes</CardTitle>
            <CardDescription>Manage and distribute live classes.</CardDescription>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              className="border text-md h-full rounded-md w-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Search live classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>

        <CardContent className="overflow-auto">
          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead>Live Class Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Batch Name</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentLiveClasses.map((live_class) => (
                <TableRow key={live_class.live_class_id} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                  <TableCell className="p-4 font-medium text-gray-800">{live_class.live_class_name}</TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">{live_class.live_class_desc}</TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">{live_class.course_name || 'No courses available'}</TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">{live_class.batch_name || 'No batches available'}</TableCell>
                  <TableCell className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                          <EllipsisVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditLiveClass(live_class)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteLiveClass(live_class.live_class_id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {error && <div className="p-4 text-red-500">{error}</div>}
        </CardContent>

        <CardFooter className="flex justify-between items-center bg-gray-50 py-4">
          <Button variant="ghost" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <div className="text-sm text-gray-600">Page {currentPage} of {totalPages}</div>
          <Button variant="ghost" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
      <AddLiveClass onLiveClassAdded={handleAddLiveClass} editingLiveClass={editingLiveClass} setEditingLiveClass={setEditingLiveClass} />
    </main>
  );
}