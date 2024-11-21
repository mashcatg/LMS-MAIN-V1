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
import AddNote from "@/components/admin/AddNote";
export const description =
  "A notes dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of notes in a table with actions.";

  export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingNote, setEditingNote] = useState(null);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(notes.length / itemsPerPage);
    
    
    // Function to handle changing the page
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    // Filter notes based on the search term
    const filteredNotes = notes.filter((note) =>
      note.note_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Get the notes for the current page
    const currentNotes = filteredNotes.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const handleExport = (format) => {
      console.log(`Exporting as ${format}`);
    };
    const handleEditNote = (note) => {
        setEditingNote(note); 
    };
    // Fetch notes function, moved outside useEffect
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost/lms-admin/notes/fetch_notes.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setNotes(data.notes || []);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Error fetching notes");
      }
    };
  
    // Fetch notes on component mount
    useEffect(() => {
      fetchNotes();
    }, []);
  
    const handleNewNote = () => {
      fetchNotes(); 
    };
    
    const handleDeleteNote = async (noteId) => {
      const confirmDelete = confirm("Are you sure you want to delete this note?");
      if (confirmDelete) {
        try {
          const response = await fetch(`http://localhost/lms-admin/notes/delete_note.php?note_id=${noteId}`, {
            method: "DELETE",
            credentials: "include",
          });
          const result = await response.json();
          if (result.success) {
            alert("Note deleted successfully!");
            fetchNotes(); 
          } else {
            alert("Failed to delete note: " + result.message);
          }
        } catch (error) {
          console.error("Error deleting note:", error);
          alert("Error deleting note");
        }
      }
    };
    return (
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card className="overflow-x-auto">
          {/* Header Section */}
          <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Manage and distribute notes.</CardDescription>
            </div>
            <div className="flex space-x-4">
              <div class="relative w-full">
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
                  placeholder="Search notes..."
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
  
          {/* Notes Table */}
          <CardContent className="overflow-auto">
            <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                <TableRow className="border-b">
                  <TableHead>Note Name</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Batch Name</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
  
              <TableBody>
                {notes.map((note, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <TableCell className="p-4 font-medium text-gray-800">
                      {note.note_name}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      <a href={`/notes/${note.file_address}`} target="_blank">
                        <Badge variant="default"> View Note</Badge>
                      </a>
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {note.course_names}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {note.batch_names}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {note.note_tags.split(",").map((tag, index) => (
                        <a
                          key={index}
                          href={`/notes/${tag.trim()}`}
                          className="text-primary hover:underline mr-2"
                        >
                          {tag.trim()}
                        </a>
                      ))}
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
                        <DropdownMenuItem onClick={() => handleEditNote(note)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteNote(note.note_id)}>Delete</DropdownMenuItem>
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
                {Math.min(currentPage * itemsPerPage, notes.length)}
              </strong>{" "}
              of <strong>{notes.length}</strong> rows
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
        <AddNote onNoteAdded={handleNewNote} note={editingNote} setEditingNote={setEditingNote} />
      </main>
    );
  }
  
