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
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Menu, MenuItem, MenuTrigger, MenuContent } from "@radix-ui/react-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddStudent from "@/components/admin/AddStudent";
import AddEnrollment from "@/components/admin/AddEnrollment";
import AddPayment from "@/components/admin/AddPayment";
import AddExpense from "@/components/admin/AddExpense";
import { ExpensePieChart } from "@/components/admin/ExpensePieChart";
export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");
  const [newPayment, setNewPayment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Added to define searchTerm
  const [currentPage, setCurrentPage] = useState(1); // Added to define currentPage
  const [itemsPerPage, setItemsPerPage] = useState(10); // Added to define itemsPerPage
  const [totalPages, setTotalPages] = useState(0); // Added to define totalPages
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);


  const fetchPayments = async () => {
    try {
      const response = await fetch(
        "http://localhost/lms-admin/finance/fetch_payments.php",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setPayments(data.payments || []); // Adjusted to match the new response structure
        setTotalPages(Math.ceil(data.payments.length / itemsPerPage)); // Calculate totalPages based on fetched data
      } else {
        console.error("Error fetching payments:", data.message);
        setError("Error fetching payments");
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError("Error fetching payments");
    }
  };
  useEffect(() => {
    fetchPayments();
  }, []);
  const handlePaymentDelete = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost/lms-admin/finance/delete_payment.php?payment_id=${paymentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setPayments((prevPayments) => prevPayments.filter((p) => p.payment_id !== paymentId));
      } else {
        console.error("Error deleting payment:", data.message);
        setError("Error deleting payment");
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      setError("Error deleting payment");
    }
  };
  const handleEditPayment = (payment) => {
    setSelectedPaymentId(payment.payment_id); // Set the selected payment ID
    setIsEditing(true);
    setIsSidebarOpen(true); // Open the sidebar when editing
  };

  const handlePaymentAdd = () => {
    fetchPayments(); // Refresh payment list
  };
  
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
            <CardTitle>Payments</CardTitle>
            <CardDescription>
              Make payments seamlessly in clicks and print invoice.
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
                <TableHead className="p-4">ID</TableHead>
                <TableHead>Index</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.map((payment, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <TableCell className="p-4 font-medium text-gray-800">
                    {payment.payment_id}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {payment.student_index}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {payment.student_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {payment.method}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{payment.paid_amount} BDT</Badge>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {payment.payment_time}
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
                      <DropdownMenuItem onClick={() => handleEditPayment(payment)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePaymentDelete(payment.payment_id)}>
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
              {Math.min(currentPage * itemsPerPage, payments.length)}
            </strong>{" "}
            of <strong>{payments.length}</strong> rows
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft />
            </Button>

            {currentPage > 2 && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setCurrentPage(1)}
              >
                1
              </Button>
            )}
            {currentPage > 3 && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setCurrentPage(1)}
                disabled
              >
                ...
              </Button>
            )}

            {currentPage > 1 && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setCurrentPage(currentPage - 1)}
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
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {currentPage + 1}
              </Button>
            )}
            {currentPage + 2 < totalPages && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
              >
                ...
              </Button>
            )}
            {currentPage + 1 < totalPages && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </Button>
            )}

            <Button
              variant="secondary"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <AddPayment
          onPaymentAdd={handlePaymentAdd}
          payment={isEditing ? payments.find(p => p.payment_id === selectedPaymentId) : {}}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
        />
    </main>
  );
}

function Expense() {

  const [newSector, setNewSector] = useState("");
  const [sectors, setSectors] = useState([]);
  const [expenses, setExpense] = useState([]);
  const [existingExpense, setExistingExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchExpenseSectors = async () => {
    try {
      const response = await fetch("http://localhost/lms-admin/finance/fetch_expense_sectors.php", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setSectors(data.sectors); // Set the fetched sectors
      } else {
        console.error("Error fetching expense sectors:", data.message);
      }
    } catch (error) {
      console.error("Error fetching expense sectors:", error);
    }
  };
  useEffect(() => {
    fetchExpenseSectors();
  }, []);

  const fetchExpense = async () => {
    try {
      const response = await fetch("http://localhost/lms-admin/finance/fetch_expenses.php", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setExpense(data.expenses); 
      } else {
        console.error("Error fetching expense:", data.message);
      }
    } catch (error) {
      console.error("Error fetching expense:", error);
    }
  };
  useEffect(() => {
    fetchExpense();
  }, []);
  const handleAddSector = async () => {
    if (newSector.trim() !== "") {
      try {
        const response = await fetch("http://localhost/lms-admin/finance/create_expense_sector.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            sector_name: newSector,
          }),
        });
  
        const data = await response.json();
        if (data.success) {
          const newEntry = {
            id: data.sector_id,
            sectorName: newSector,
            // monthlyExpense: parseFloat(newExpense),
          };
          setSectors([...sectors, newEntry]); 
          setNewSector(""); 
          fetchExpenseSectors();
          // setNewExpense(""); 
        } else {
          console.error("Error adding sector:", data.message);
        }
      } catch (error) {
        console.error("Error adding sector:", error);
      }
    }
  };

  const handleDeleteSector = async (sectorId) => {
    try {
      const response = await fetch(`http://localhost/lms-admin/finance/delete_expense_sector.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ sector_id: sectorId }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setSectors(sectors.filter((sector) => sector.sector_id !== sectorId));
      } else {
        console.error("Error deleting sector:", data.message);
      }
    } catch (error) {
      console.error("Error deleting sector:", error);
    }
  };
  
  const handleDelete = async (expenseId) => {
    try {
      const response = await fetch(`http://localhost/lms-admin/finance/delete_expense.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ expense_id: expenseId }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        fetchExpense(); // Refresh the expense list
      } else {
        console.error("Error deleting expense:", data.message);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  // Filter payments based on the search term
  const filteredExpense = expenses.filter((expense) =>
    expense.expensed_amount.toLowerCase().includes(searchTerm.toLowerCase())
  ) || sectors.filter((sector) =>
    sector.sector_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the payments for the current page
  const currentExpense = filteredExpense.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format) => {
    // Logic to handle export based on format
    console.log(`Exporting as ${format}`);
  };
  // Toggle the sidebar based on edit or add mode
const toggleSidebar = () => {
  // Reset to "Add" mode
  setIsEditing(false); // Ensure it"s not in edit mode
  setExistingExpense(null); // Clear any existing expense being edited
  setIsSidebarOpen(!isSidebarOpen); // Open or close the sidebar
};


  const handleEditExpenseClick = (expense) => {
    setExistingExpense(expense); // Set the expense to edit
    setIsEditing(true); // Enable editing mode
    setIsSidebarOpen(true); // Open the sidebar
  };

  const handleExpenseAdded = () => {
    fetchExpense();
  };
  
  const totalPages = Math.ceil(filteredExpense.length / itemsPerPage);

const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
  }
};    
  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>
              Manage expenses with sectors seamlessly.
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
                <TableHead>Sector</TableHead>
                <TableHead className="p-4">Amount</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentExpense.map((expense, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <TableCell className="p-4 font-medium text-gray-800">
                    {expense.sector_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    <Badge variant="default">{expense.expensed_amount}</Badge>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {expense.expense_details}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">
                    {expense.expense_time}
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
                        <DropdownMenuItem onClick={() => handleEditExpenseClick(expense)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(expense.expense_id)}>Delete</DropdownMenuItem>

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
              {Math.min(currentPage * itemsPerPage, expenses.length)}
            </strong>{" "}
            of <strong>{expenses.length}</strong> rows
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
      <div className="flex flex-wrap lg:flex-nowrap space-y-6 lg:space-y-0 lg:space-x-6">
        <Card className="w-full md:w-[66%]">
          <CardHeader>
            <CardTitle>Expense Sectors</CardTitle>
            <CardDescription>
              Manage your monthly expense sectors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="w-full mb-6 border-collapse">
              <TableHeader>
                <TableRow>
                  <TableHead>Sector Name</TableHead>
                  <TableHead className="text-right">
                    Monthly Expense (BDT)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectors.map((sector) => (
                  <TableRow key={sector.sector_id}>
                    <TableCell>{sector.sector_name}</TableCell>
                    <TableCell className="text-right">
                    {/* <DropdownMenu>
                    <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleDeleteSector(sector.sector_id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                      {/* {sector.monthlyExpense.toLocaleString()} */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex flex-col sm:flex-row sm:space-x-4 items-start">
              <div class="relative w-full">
                <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                  Sector Name
                </label>
                <input
                  type="text"
                  class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  placeholder="Enter Sector Name"
                  value={newSector}
                  onChange={(e) => setNewSector(e.target.value)}
                />
              </div>
              <Button onClick={handleAddSector}>Add Sector</Button>
            </div>
          </CardContent>
        </Card>
        <ExpensePieChart sectors={sectors} expenses={expenses} />
      </div>

      <AddExpense
        sectors={sectors}
        onExpenseAdded={handleExpenseAdded}
        existingExpense={existingExpense}
        setExistingExpense={setExistingExpense}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

    </main>
  );
}

export default function Page() {
  return (
    <main>
      <Tabs defaultValue="payments">
        <TabsList>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <Payments />
        </TabsContent>

        <TabsContent value="expenses">
          <Expense />
        </TabsContent>
      </Tabs>
    </main>
  );
}