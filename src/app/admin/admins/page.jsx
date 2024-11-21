"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  FileText,
  Plus,
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
import AddAdmin from "@/components/admin/AddAdmin";

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editAdmin, setEditAdmin] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Fetch admins from the server
  const fetchAdmins = async () => {
    try {
      const response = await fetch(
        "http://localhost/lms-admin/admins/fetch_admins.php",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAdmins(data.admins || []);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      setError("Error fetching admins");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleEdit = (admin) => {
    setEditAdmin(admin); // Set the admin to edit
    setIsSidebarOpen(true); // Open the sidebar
  };

  // Open sidebar on AddAdmin click
  const handleAddAdminClick = () => {
    setEditAdmin(null); // Reset editAdmin to null
    setIsSidebarOpen(true); // Open the sidebar for adding new admin
  };

  // Delete an admin
  const handleDelete = async (adminId) => {
    try {
      const response = await fetch(
        `http://localhost/lms-admin/admins/delete_admin.php`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ admin_id: adminId }),
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchAdmins(); // Refresh the admin list
      } else {
        console.error("Error deleting admin:", data.message);
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);
  const refreshData = () => {
    fetchAdmins(); // Refetch data when called
    setEditAdmin(null);
    closeSidebar(); // Close the sidebar after refreshing data
  };

  const totalPages = Math.ceil(admins.length / itemsPerPage);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.admin_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.admin_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.admin_institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Admins</CardTitle>
            <CardDescription>
              Add admins and edit their page permissions as needed.
            </CardDescription>
          </div>
          <div className="flex space-x-4">
            <div className="relative w-full ">
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
                <TableHead className="p-4">Name</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentAdmins.map((admin, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <TableCell className="p-4 font-medium text-gray-800">
                    {admin.admin_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {admin.admin_number}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {admin.admin_permissions}
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
                        <DropdownMenuItem onClick={() => handleEdit(admin)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(admin.admin_id)}>
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

        {/* Pagination */}
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, admins.length)}
            </strong>{" "}
            of <strong>{admins.length}</strong> rows
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

            {/* Pagination with "..." between distant pages */}
            {currentPage > 2 && <Button variant="secondary" size="icon">1</Button>}
            {currentPage > 3 && <span className="px-1">...</span>}
            {currentPage > 1 && (
              <Button variant="secondary" size="icon" onClick={() => handlePageChange(currentPage - 1)}>
                {currentPage - 1}
              </Button>
            )}

            <Button variant="default" size="icon">
              {currentPage}
            </Button>

            {currentPage < totalPages && (
              <Button variant="secondary" size="icon" onClick={() => handlePageChange(currentPage + 1)}>
                {currentPage + 1}
              </Button>
            )}

            {currentPage < totalPages - 2 && <span className="px-1">...</span>}
            {currentPage < totalPages - 1 && (
              <Button variant="secondary" size="icon" onClick={() => handlePageChange(totalPages)}>
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

      {/* Add Admin Button */}
      <div className="fixed bottom-6 right-6">
                <button
                    onClick={handleAddAdminClick}
                    className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[150px] overflow-hidden"
                >
                    <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
                        <Plus className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Add Admin
                    </span>
                </button>
            </div>

      {/* AddAdmin Sidebar */}
      <AddAdmin
        refreshData={refreshData}
        editAdmin={editAdmin}
        setEditAdmin={setEditAdmin}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
      />
    </main>
  );
}
