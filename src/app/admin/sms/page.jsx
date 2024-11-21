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
  CreditCard,
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
export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";
function Logs() {
    const [sms, setSms] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 10;
  
    // Fetch SMS from the server
    useEffect(() => {
      const fetchSMS = async () => {
        try {
          const response = await fetch("http://localhost/lms-admin/sms/fetch_sms.php", {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          if (data.error) {
            setError(data.error);
          } else {
            setSms(data.sms || []);
          }
        } catch (error) {
          console.error("Error fetching sms:", error);
          setError("Error fetching sms");
        }
      };
      fetchSMS();
    }, []);
  
    const totalPages = Math.ceil(sms.length / itemsPerPage);
  
    // Function to handle changing the page
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    // Filter SMS based on the search term
    const filteredSMS = sms.filter(
      (sms) =>
        sms.sms_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sms.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sms.sms_time.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Get the SMS for the current page
    const currentSMS = filteredSMS.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const handleExport = (format) => {
      console.log(`Exporting as ${format}`);
    };
  
    return (
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
          {/* Header Section */}
          <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <CardTitle>SMS</CardTitle>
              <CardDescription>
                Check your SMS Logs
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
  
          {/* SMS Table */}
          <CardContent className="overflow-auto">
            <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                <TableRow className="border-b">
                  <TableHead className="p-4">ID</TableHead>
                  <TableHead className="p-4">Message</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
  
              <TableBody>
                {currentSMS.map((sms, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <TableCell className="p-4 font-medium text-gray-800">
                    {sms.sms_id}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                    {sms.sms_text}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                    {sms.student_indexes.join(", ")}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                    {sms.sms_time}
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
                {Math.min(currentPage * itemsPerPage, sms.length)}
              </strong>{" "}
              of <strong>{sms.length}</strong> rows
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
                  disabled
                  onClick={() => handlePageChange(1)}
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
      </main>
  );
}

function Configurations() {
    const [smsTransactions, setSmsTransactions] = useState([]);
    const [smsNumber, setSmsNumber] = useState(0);
    const [calculatedAmount, setCalculatedAmount] = useState(0);
    const [error, setError] = useState("");
    const [creditRemaining, setCreditRemaining] = useState(0);
    // Fetch SMS Transactions from the server
    
      const fetchSMSTransactions = async () => {
        try {
          const response = await fetch("http://localhost/lms-admin/sms/fetch_transactions.php", {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          if (data.error) {
            setError(data.error);
          } else {
            setSmsTransactions(data.sms_transaction || []);
          }
        } catch (error) {
          console.error("Error fetching sms transactions:", error);
          setError("Error fetching sms transactions");
        }
      };
      useEffect(() => {
      fetchSMSTransactions();
    }, []);
  
    const handleSmsNumberChange = (e) => {
      const value = parseFloat(e.target.value);
      setSmsNumber(value);
      setCalculatedAmount((value * 0.33).toFixed(2));
    };
    const fetchSMS = async () => {
        try {
          const response = await fetch("http://localhost/lms-admin/sms/fetch_sms.php", {
            method: "GET",
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.error) {
            setError(data.error);
          } else {
            setCreditRemaining(data.sms_credit || 0); // Set the SMS credit
          }
        } catch (error) {
          console.error("Error fetching SMS:", error);
          setError("Error fetching SMS");
        }
      };
    useEffect(() => {
    fetchSMS();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost/lms-admin/sms/purchase_sms.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
            body: new URLSearchParams({
                smsNumber: smsNumber,
            }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          if (data.success) {
            alert(data.message);
            fetchSMSTransactions();
            fetchSMS();
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while submitting the purchase sms form.");
        }
      };
  
    return (
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        {/* Card for SMS Number Input */}

        <div className="flex">
        <Card x-chunk="dashboard-01-chunk-0 mb-4">
          <div className="flex flex-row justify-between items-center">
            {/* Left side with title and stats */}
            <div className="flex-1">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Remaining Credit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{creditRemaining}</div>
              </CardContent>
            </div>
            {/* Right side with the Users icon */}
            <div className="h-full top-0 p-4">
              <CreditCard className="h-12 w-12 text-yellow-400 bg-yellow-100 p-2 rounded-[0.5rem]" />
            </div>
          </div>
        </Card>
        <div>
            
        </div>
        </div>

          
       
          <Card x-chunk="input-card" className="overflow-x-auto">
          <CardHeader>
            <CardTitle>Purchase SMS Credit</CardTitle>
            <CardDescription>
              Enter the SMS amount to get more SMS Credit.
            </CardDescription>
          </CardHeader>
          <CardContent>
          <div className="w-full flex flex-col lg:flex-row gap-4"><div className="relative w-full lg:w-1/3 my-2 lt:my-6">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              SMS Amount
              </label>
              <input
                type="number"
                className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                placeholder="Enter SMS Amount"
                value={smsNumber}
                onChange={handleSmsNumberChange}
                required
              />
            </div>
            {/* Course Name */}
            <div className="relative w-full lg:w-1/3 my-2 lt:my-6">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                SMS Price
              </label>
              <input
                type="text"
                class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                placeholder="Price"
                value={calculatedAmount}
                readOnly
              />
            </div>
            <div className="relative w-full lg:w-1/3 my-2">
              <Button type="submit" className="w-full" onClick={handleSubmit}>Purchase SMS</Button>
            </div>
          </div>
          </CardContent>
        </Card>
  
        {/* Card for SMS Transactions Table */}
        <Card x-chunk="transactions-card" className="overflow-x-auto">
          <CardHeader>
            <CardTitle>SMS Transactions</CardTitle>
            <CardDescription>
              View your SMS transaction logs.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-auto">
            <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                <TableRow className="border-b">
                  <TableHead className="p-4">SMS Amount</TableHead>
                  <TableHead className="p-4">SMS Rate</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Purchased By</TableHead>
                  <TableHead>Purchasing Time</TableHead>
                  <TableHead>Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {smsTransactions.map((transaction, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <TableCell className="p-4 font-medium text-gray-800">
                      {transaction.sms_amount}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {transaction.sms_rate}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {(transaction.sms_amount * transaction.sms_rate).toFixed(2)}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {transaction.admin_name}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {transaction.created_at}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {new Date(new Date(transaction.created_at).setMonth(new Date(transaction.created_at).getMonth() + 6)).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    );
  }
  export default function Page() {
     // Initialize error with an empty string
  // Fetch courses from the server
  
    
  return (
    <main>
        
      <Tabs defaultValue="courses">
        <TabsList className="mb-2">
          <TabsTrigger value="courses">SMS Logs</TabsTrigger>
          <TabsTrigger value="batches">Configurations</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <Logs />
        </TabsContent>
        <TabsContent value="batches">
          <Configurations />
        </TabsContent>
      </Tabs>
    </main>
  );
  }
