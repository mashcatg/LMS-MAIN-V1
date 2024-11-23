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
import { useRouter } from "next/navigation";

// Drag-and-drop imports
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddClass from "@/components/admin/AddClass"; // Import AddClass component

export const description =
  "A classes dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of classes in a table with actions.";

export default function Classes() {
  const router = useRouter();
  const [playlist_id, setId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingClass, setEditingClass] = useState(null); // State for editing class
  const itemsPerPage = 10;
  const totalPages = Math.ceil(classes.length / itemsPerPage);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.pathname.split("/").pop();
    if (id) {
      setId(id);
    }
  }, []);

  // Fetch classes from the server
  
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `http://lms.ennovat.com/lms-admin/classes/fetch_classes.php?playlist_id=${playlist_id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setClasses(data.classes || []);
        } else {
          setError(data.message || "Failed to fetch classes");
        }
      } catch (error) {
        setError("Failed to fetch classes. Please try again later.");
      }
    };
  useEffect(() => {
    fetchClasses();
  }, [playlist_id]);

  // Function to handle changing the page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filter classes based on the search term
  const filteredClasses = classes.filter((classItem) =>
    classItem.class_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the classes for the current page
  const currentClasses = filteredClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
  };

  // Handle drag end event to reorder the class indexes
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedClasses = Array.from(classes);
    const [movedClass] = reorderedClasses.splice(result.source.index, 1);
    reorderedClasses.splice(result.destination.index, 0, movedClass);

    // Update the class indexes in the database
    try {
      const response = await fetch(
        `http://lms.ennovat.com/lms-admin/classes/update_class_order.php`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            playlist_id,
            newOrder: reorderedClasses.map((classItem, index) => ({
              class_id: classItem.class_id,
              class_index: index,
            })),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setClasses(reorderedClasses);
      } else {
        setError(data.message || "Failed to update class order");
      }
    } catch (error) {
      setError("Failed to update class order. Please try again later.");
    }
  };

  const onClassAdded = () => {
    fetchClasses();
  };

  const handleDeleteClass = async (classId, playlistId) => {
    if (!window.confirm("Are you sure you want to delete this class?")) {
      return;
    }
  
    try {
      const response = await fetch(
        `http://lms.ennovat.com/lms-admin/classes/delete_class.php?class_id=${classId}&playlist_id=${playlistId}`,
        {
          method: "DELETE", 
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const result = await response.json();
  
      if (result.success) {
        alert("Class deleted successfully!");
        onClassAdded();
      } else {
        alert("Failed to delete class: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Classes</CardTitle>
            <CardDescription>Manage and distribute classes.</CardDescription>
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
                placeholder="Search classes..."
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

        {/* Classes Table */}
        <CardContent className="overflow-auto">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="classList">
              {(provided) => (
                <Table
                  className="w-full bg-white shadow-md rounded-lg overflow-hidden"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                    <TableRow className="border-b">
                      <TableHead>Class Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Class Note</TableHead>
                      <TableHead>Class Link</TableHead>
                      
                      <TableHead className="text-right">
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {currentClasses.map((classItem, index) => (
                      <Draggable
                        key={classItem.class_id}
                        draggableId={`class-${classItem.class_id}`}
                        index={index}
                      >
                        {(provided) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="hover:bg-gray-100 transition duration-200 ease-in-out"
                          >
                            <TableCell className="p-4 font-medium text-gray-800">
                              {classItem.class_name}
                            </TableCell>
                            <TableCell className="p-4 font-medium text-gray-800">
                              {classItem.class_description}
                            </TableCell>
                            <TableCell className="p-2 font-medium text-gray-800">
                              {classItem.note_names ? classItem.note_names.join(", ") : "No Notes"}
                            </TableCell>
                            <TableCell className="p-2 font-medium text-gray-800">
                              <a
                                href={classItem.class_link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button variant="default"> View Class</Button>
                              </a>
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
                                  <DropdownMenuItem onClick={() => setEditingClass(classItem)}>Edit</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteClass(classItem.class_id, classItem.playlist_id)}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                </Table>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>

        {/* Pagination */}
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {(currentPage - 1) * itemsPerPage + 1}-{" "}
              {Math.min(currentPage * itemsPerPage, classes.length)}
            </strong>{" "}
            of <strong>{classes.length}</strong> rows
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </CardFooter>
      </Card>
      <AddClass onClassAdded={onClassAdded} editingClass={editingClass} setEditingClass={setEditingClass} playlistId={playlist_id} />
    </main>
  );
}