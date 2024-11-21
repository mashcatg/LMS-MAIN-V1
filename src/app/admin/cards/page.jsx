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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCourse from "@/components/admin/AddCourse";
import AddCard from "@/components/admin/AddCard";
import AddBranch from "@/components/admin/AddBranch";
export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export default function Cards() {
  const [editingCard, setEditingCard] = useState(null);
  const [courses, setCourses] = useState([]);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  
const fetchCards = async () => {
  setLoading(true);
  try {
    const response = await fetch(
      "http://localhost/lms-admin/cards/fetch_cards.php",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    } else {
      setCards(data.cards || []);
    }
  } catch (error) {
    console.error("Error fetching cards:", error);
    setError("Error fetching cards");
  } finally {
    setLoading(false);
  }
};
// Fetch cards from the server
useEffect(() => {
fetchCards();
}, []);

const handleCardAdded = () => {
fetchCards(); // Fetch updated cards
};
// Fetch courses from the server
useEffect(() => {
const fetchCourses = async () => {
  setLoading(true);
  try {
    const response = await fetch(
      "http://localhost/lms-admin/courses/fetch_courses.php",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    } else {
      setCourses(data.courses || []);
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    setError("Error fetching courses");
  } finally {
    setLoading(false);
  }
};
fetchCourses();
}, []);

  // Function to handle deleting a card
  const handleDelete = async (cardId) => {
    if (confirm("Are you sure you want to delete this card?")) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost/lms-admin/cards/delete_card.php?card_id=${cardId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          alert("Card deleted successfully!");
          fetchCards(); // Refresh the card list
        } else {
          alert(`Error: ${data.message || "Failed to delete card"}`);
        }
      } catch (error) {
        console.error("Error deleting card:", error);
        alert("Error deleting card");
      } finally {
        setLoading(false);
      }
    }
  };

  const totalPages = Math.ceil(cards.length / itemsPerPage);

  // Function to handle changing the page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filter batchs based on the search term
  const filteredCard = cards.filter((card) =>
    card.card_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the batchs for the current page
  const currentCards = filteredCard.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format) => {
    // Logic to handle export based on format
    console.log(`Exporting as ${format}`);
  };
  const handleEditCard = (card) => {
    setEditingCard(card);
};
  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Cards</CardTitle>
            <CardDescription>
              Add cards for course and edit them as needed.
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

        {/* Product Table */}
        <CardContent className="overflow-auto">
          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead>Name</TableHead>
                <TableHead className="p-4">Course</TableHead>
                <TableHead className="p-4">Student Availability</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentCards.map((card, index) => {
                const currentCourse = courses.find(
                  (course) => course.course_id === card.course_id
                );
                return (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <TableCell className="p-4 font-medium text-gray-800">
                      {card.card_title}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {currentCourse.course_name}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {card.availability}
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
                          <Link href={`/admin/cards/${card.card_id}`}>
                            <DropdownMenuItem>View</DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem onClick={() => setEditingCard(card)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(card.card_id)}>
                            Delete
                          </DropdownMenuItem>
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
              {Math.min(currentPage * itemsPerPage, cards.length)}
            </strong>{" "}
            of <strong>{cards.length}</strong> rows
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
      {editingCard && (
        <AddCard
          card={editingCard}
          onCardEdited={handleCardAdded}
          onClose={() => setEditingCard(null)}
        />
      )}
      <AddCard onCardAdded={handleCardAdded} />
    </main>
  );
}