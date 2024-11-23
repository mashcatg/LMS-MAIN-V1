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
import AddStudent from "@/components/admin/AddStudent";
import AddEnrollment from "@/components/admin/AddEnrollment";
export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";
// import Invoice from "@/components/admin/PrintInvoice";
// import html2canvas from "html2canvas";
//   import { jsPDF } from "jspdf";
function Students() {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingStudent, setEditingStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 10;
    const totalPages = Math.ceil(students.length / itemsPerPage);
    const fetchStudents = async () => {
      try {
          const response = await fetch("http://lms.ennovat.com/lms-admin/students/fetch_students.php", {
              method: "GET",
              credentials: "include",
          });
          
          // Check if the response is OK
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          
          const data = await response.json();
          
          if (data.success) {
              setStudents(data.students || []);
          } else {
              console.error("Error fetching students:", data.message);
          }
      } catch (error) {
          console.error("Error fetching students:", error);
      }
  };
  
  useEffect(() => {
      fetchStudents();
  }, []);

  const deleteStudent = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
          try {
          const response = await fetch(`http://lms.ennovat.com/lms-admin/students/delete_student.php?student_id=${studentId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ student_id: studentId }),
          });
      
          const data = await response.json();
      
          if (data.success) {
            fetchStudents(); // Refresh the expense list
          } else {
            console.error("Error deleting expense:", data.message);
          }
        } catch (error) {
          console.error("Error deleting expense:", error);
        }
    }
  };

  
    // Pagination and search logic
    const filteredStudents = students.filter((student) =>
        student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_institution.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentStudents = filteredStudents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const handleEditClick = (student) => {
      setEditingStudent(student); // Set the selected student for editing
  };
  
    // Handle Export options
    const handleExport = (format) => {
        console.log(`Exporting as ${format}`);
    };
    const handleStudentAdd = () => {
      setEditingStudent(null);
      fetchStudents(); // Refresh the student list
    }
    
    return (
        <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
            <Card className="overflow-x-auto">
                {/* Header Section */}
                <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
                    <div>
                        <CardTitle>Students</CardTitle>
                        <CardDescription> Add your students and edit them as needed. </CardDescription>
                    </div>
                    <div className="flex space-x-4">
                        <div className="relative w-full">
                            <label htmlFor="input-box" className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
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
                                    <FileText className="mr-2 w-4 h-4" /> Export <ChevronDown className="ml-2 w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleExport("Print")}> Print </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExport("CSV")}> CSV </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExport("Excel")}> Excel </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                {/* Student Table */}
                <CardContent className="overflow-auto">
                    <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                            <TableRow className="border-b">
                                <TableHead className="p-4">Name</TableHead>
                                <TableHead>Number</TableHead>
                                <TableHead>Institute</TableHead>
                                <TableHead className="text-right">
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentStudents.map((student, index) => (
                                <TableRow key={index} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                                    <TableCell className="p-4 font-medium text-gray-800">
                                        {student.student_name}
                                    </TableCell>
                                    <TableCell className="p-4 font-medium text-gray-800">
                                        {student.student_number}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="default"> {student.student_institution} </Badge>
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
                                            <DropdownMenuItem onClick={() => handleEditClick(student)}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => deleteStudent(student.student_id)}>Delete</DropdownMenuItem>
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
                        Showing <strong>{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, students.length)}</strong> of <strong>{students.length}</strong> rows
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
                        {/* Pagination Controls */}
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
            <AddStudent onStudentAdded={handleStudentAdd} student={editingStudent} setEditingStudent={setEditingStudent} />
        </main>
    );
}

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [selectedEnrollments, setSelectedEnrollments] = useState([]);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [editEnrollmentData, setEditEnrollmentData] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  
    const fetchEnrollments = async () => {
      try {
        const response = await fetch(
          "http://lms.ennovat.com/lms-admin/students/fetch_enrollments.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setEnrollments(data.enrollments || []);
        }
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        setError("Error fetching enrollments");
      }
    };
  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleEnrollentAdd = () => {fetchEnrollments();}
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://lms.ennovat.com/lms-admin/courses/fetch_courses.php",
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
      }
    };
  useEffect(() => {
    fetchCourses();
  }, []);


    const fetchBatches = async () => {
      try {
        const response = await fetch(
          "http://lms.ennovat.com/lms-admin/batches/fetch_batches.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setBatches(data.batches || []);
        }
      } catch (error) {
        console.error("Error fetching batches:", error);
        setError("Error fetching batches");
      }
    };
  useEffect(() => {
    fetchBatches();
  }, []);
  const handleDeleteEnrollment = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this enrollment?");
    if (!confirmed) return;

    try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/students/delete_enrollment.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ ids: [id] }),
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            fetchEnrollments();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error deleting enrollment:", error);
        alert("Error deleting enrollment.");
    }
};

  const handleDeactivateAll = async () => {
    if (selectedEnrollments.length === 0) {
        alert("No enrollments selected for deletion.");
        return;
    }

    const confirmed = window.confirm("Are you sure you want to delete the selected enrollments?");
    if (!confirmed) return;

    try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/students/delete_enrollment.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ ids: selectedEnrollments }),
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            fetchEnrollments(); // Refresh the enrollments list
            setSelectedEnrollments([]); // Clear selections
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error deactivating enrollments:", error);
        alert("Error deactivating enrollments.");
    }
};

  
  const handleNotice = async () => {

    try {
      const response = await fetch(
        "http://lms.ennovat.com/lms-admin/notices/create_notice.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include",
          body: new URLSearchParams({
            notice: smsText,
            notice_type: selectedEnrollments,
          }),
        }
      );

      const result = await response.json();
      setSmsText("");
      alert(result.message);
    } catch (error) {
      console.error("Error sending notice:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Function to handle changing the page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
 
  const filteredEnrollments = enrollments.filter((enrollment) => {
    const keywords = searchTerm.toLowerCase().split(" ");
    const matchCourse = !selectedCourse || String(enrollment.course_id) === String(selectedCourse);
    const matchBatch = !selectedBatch || String(enrollment.batch_id) === String(selectedBatch);
    const student = enrollment.student || {};
    const keywordMatch = keywords.every(
      (keyword) =>
        (student.student_name && student.student_name.toLowerCase().includes(keyword)) ||
        (student.student_number && student.student_number.toLowerCase().includes(keyword)) ||
        (enrollment.student_index && String(enrollment.student_index).toLowerCase().includes(keyword)) ||
        (student.student_institution && student.student_institution.toLowerCase().includes(keyword))
    );
    return matchCourse && matchBatch && keywordMatch;
  });

  const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);

  // Get the enrollments for the current page
  const currentEnrollments = filteredEnrollments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      // Get the IDs of all currently visible enrollments
      const visibleEnrollmentIds = currentEnrollments.map((enrollment) => enrollment.enrollment_id);
      setSelectedEnrollments(visibleEnrollmentIds);
    } else {
      setSelectedEnrollments([]);
    }
  };
  
  
  const handleSelectEnrollment = (id) => {
    setSelectedEnrollments((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((enrollmentId) => enrollmentId !== id)
        : [...prevSelected, id]
    );
  };
  
  const handleEditEnrollment = (enrollment) => {
    setEditEnrollmentData(enrollment);
    setIsFormOpen(true); // Open the sidebar
};


  const [smsText, setSmsText] = useState("");

 
  const handleSendSMS = async () => {

    try {
      const response = await fetch(
        "http://lms.ennovat.com/lms-admin/sms/create_custom_sms.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include",
          body: new URLSearchParams({
            sms: smsText,
            receiver: selectedEnrollments,
          }),
        }
      );

      const result = await response.json();
      setSmsText("");
      alert(result.message);
    } catch (error) {
      console.error("Error sending notice:", error);
    }
  };

  const handleSendDueNotice = async () => {

    try {
      const response = await fetch(
        "http://lms.ennovat.com/lms-admin/sms/due_sms.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include",
          body: new URLSearchParams({
            receiver: selectedEnrollments,
          }),
        }
      );

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error sending due:", error);
    }
  };
  const closeForm = () => {
    setIsFormOpen(false); // Close the form
    setEditEnrollmentData(null); // Clear any selected enrollment data
  };
  const handleGenerateInvoice = (enrollment) => {
    const totalAmount = (enrollment.payments.total_paid || 0) - (enrollment.payments.total_discounted || 0);
    const enrollmentId = enrollment.enrollment_id; // Assuming enrollment_id is available
    const subdomain = enrollment.service_details.sub_domain; // Replace this with the actual subdomain

    // QR code URL
    const qrCodeUrl = `https://${subdomain}.ennovat.com/invoiceCheck/${enrollmentId}`;
    const qrCodeImgUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeUrl)}&size=100x100`;

    const invoiceContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Customer Copy</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
            <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f8f9fa; font-family: "Poppins", sans-serif; font-size: 10px; color: #333; }
                h5, h3, h4, p, a { font-family: "Poppins", sans-serif; color: #333; }
                h5 { font-weight: 400; margin: 7px 0px; font-size: 10px; }
                h3 { font-size: 13px; font-weight: 600; }
                h4 { font-size: 10px; font-weight: 500; }
                .container { width: 100%; max-width: 700px; background-color: white; box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1); padding: 30px; margin: 40px; border-radius: 8px; position: relative; border-top: 10px solid #13d49a; }
                .invoice-title { text-align: center; font-size: 20px; font-weight: 600; margin: 20px 0; color: #13d49a; }
                .row { display: flex; justify-content: space-between; margin-bottom: 20px; }
                .column { width: 48%; }
                .table, .table2, .phistory { width: 100%; border-collapse: collapse; font-size: 10px; }
                .table th, .table td, .table2 td, .phistory th, .phistory td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                .table th { background-color: #13d49a; color: white; }
                .table2 td { background-color: #f0f0f0; }
                .table2 .highlight { background-color: #13d49a; color: white; font-weight: bold; }
                .logo { position: absolute; top: 20px; left: 30px; width: 100px; height: auto; }
                .qr-code { position: absolute; top: 56px; right: 20px; width: 60px; height: 60px; }
                .date-status { display: flex; justify-content: space-between; margin-bottom: 15px; padding-top: 40px; }
                .divider { border-top: 1px solid #d3d3d3; margin: 1px 0; }
                .contact-details { margin-top: 20px; text-align: right; }
                .row1 { display: flex; justify-content: space-between; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">
                    <img src="ennovat.png" alt="Ennovat LMS Company Logo">
                </div>
                <div class="invoice-title">${enrollment.service_details.company_name}</div>
                <div class="qr-code" style="padding-right: 20px;">
                    <img src="${qrCodeImgUrl}" alt="QR Code" height="80px" width="80px">
                </div>
                <div class="sub-container">
                    <div class="date-status">
                        <div class="date"><h4>Date: ${new Date().toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" })}</h4></div>
                        <div class="status"><h4>Status: <span style="color:green">Valid</span></h4></div>
                    </div>
                    <div class="divider"></div>
                    <div class="row">
                        <div class="column">
                            <h3>Invoiced to:</h3>
                            <h5>${enrollment.student.student_name} <br> ${enrollment.student.student_institution}<br> ${enrollment.student.student_number}<br> ${enrollment.student.student_address}</h5>
                        </div>
                        <div class="column" style="text-align:right;">
                            <h3>Paid to:</h3>
                            <h5>Team Ennovat</h5>
                            <h5>Chawkbazar, Chattogram</h5>
                            <h5>Bangladesh.</h5>
                        </div>
                    </div>
                    <div class="row" style="flex-direction:column;">
                        <h4><b>Billing Details:</b></h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Item</th>
                                    <th>Rate</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>${enrollment.course.course_name}(${enrollment.batch.batch_name})</td>
                                    <td>${enrollment.course_fee ? enrollment.course_fee : "Not Specified"} BDT</td>
                                    <td>1</td>
                                    <td>${enrollment.course_fee ? enrollment.course_fee : "Not Specified"} BDT</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row1">
                        <div class="columnP">
                            <h4><b>Payment History:</b></h4>
                            <table class="phistory">
                                <thead>
                                    <tr style="background: #13d49a;color: #fff;">
                                        <th>Date</th>
                                        <th>P. Method</th>
                                        <th>Paid</th>
                                        <th>Discount</th>
                                        <th>Rec by</th>
                                    </tr>
                                </thead>
                                <tbody>
    ${enrollment.payments.payment_records && enrollment.payments.payment_records.length > 0 ? 
    enrollment.payments.payment_records.map((payment) => {
        return(`
            <tr>
                <td>${new Date(payment.payment_time).toLocaleDateString()}</td>
                <td>${payment.method}</td>
                <td>${payment.paid_amount} BDT</td>
                <td>${payment.discounted_amount} BDT</td>
                <td>${payment.payment_admin_name}</td>
            </tr>
        `);
    }).join("") : 
    `
        <tr>
            <td colspan="5">No payment records found.</td>
        </tr>
    `
}
                                </tbody>
                            </table>
                        </div>
                        <div class="column">
                            <table class="table2">
                                
                                 <tr>
                                    <td>Passed Months:</td>
                                    <td><b>${enrollment.due_amount_details[0].passed_months}</b></td>
                                </tr>
                                <tr>
                                    <td><b>Sub-Total:</b></td>
                                    <td><b>${enrollment.due_amount_details[0].passed_months * enrollment.course_fee} BDT</b></td>
                                </tr>
                                <tr>
                                    <td>Discount Amount:</td>
                                    <td>${enrollment.payments.total_discounted ? enrollment.payments.total_discounted : 0} BDT</td>
                                </tr>
                                <tr>
                                    <td>Net Payable Amount:</td>
                                    <td>${(enrollment.due_amount_details[0].passed_months * enrollment.course_fee) - (enrollment.payments.total_discounted || 0)} BDT</td>

                                </tr>
                                
                                <tr>
                                    <td>Paid Amount:</td>
                                    <td>${enrollment.payments.total_paid ? enrollment.payments.total_paid : 0} BDT</td>
                                </tr>
                                <tr>
                                    <td><b>Due Amount:</b></td>
                                    <td class="highlight"><b>${enrollment.due_amount_details[0].monthly_due} BDT</b></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="contact-details" style="text-align: right; font-size: 9px; margin-top: 20px;">
                        <div class="contact-section">
                            <ul class="contact-list" style="list-style: none; padding: 0;">
                                <li style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 10px;">
                                    <span>${enrollment.service_details.subdomain}</span><i class="fas fa-envelope icon" style="font-size: 14px; margin-left: 5px;"></i>
                                </li>
                                <li style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 10px;">
                                    <span>${enrollment.service_details.facebook}</span><i class="fab fa-facebook icon" style="font-size: 14px; margin-left: 5px;"></i>
                                </li>
                                <li style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 10px;">
                                    <span>${enrollment.service_details.ad_phone}</span><i class="fas fa-phone icon" style="font-size: 14px; margin-left: 5px;"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(invoiceContent);
    newWindow.document.close();

    newWindow.onload = () => {
        newWindow.print();
    };
};


  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      {invoiceData && (
                <Invoice enrollment={invoiceData} onClose={handleCloseInvoice} />
            )}
        <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Enrollments</CardTitle>
            <CardDescription>
              Manage course and batch based enrollments.
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
          <div className="flex space-x-4 my-4">
            <div className="w-full sm:w-1/2">
            <select
                id="course-select"
                className="border text-md rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onChange={(e) => setSelectedCourse(e.target.value)}
                value={selectedCourse}
              >
                <option value="">All Courses</option>
                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-1/2">
              <select
                id="batch-select"
                className="border text-md rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onChange={(e) => setSelectedBatch(e.target.value)}
                value={selectedBatch}
              >
                <option value="">All Batches</option>
                {batches.map((batch) => (
                  <option key={batch.batch_id} value={batch.batch_id}>
                    {batch.batch_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedEnrollments.length === currentEnrollments.length && currentEnrollments.length > 0}
                    />
                  </TableHead>
                <TableHead>Index</TableHead>
                <TableHead className="p-4">Name</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Institute</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Due</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
            {currentEnrollments.map((enrollment, index) => {
    const student = enrollment.student || {};
    const course = enrollment.course || {};
    const batch = enrollment.batch || {};
    const payment = enrollment.payment || {};
    
                return (
                  <TableRow
                    key={enrollment.enrollment_id}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedEnrollments.includes(enrollment.enrollment_id)}
                        onChange={() => handleSelectEnrollment(enrollment.enrollment_id)}
                      />
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {enrollment.student_index}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {student.student_name}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {student.student_number}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {student.student_institution}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {course.course_name}
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-800">
                      {batch.batch_name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default"> {student.due_amount_details}</Badge>
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
                          <DropdownMenuItem onClick={() => handleGenerateInvoice(enrollment)}>
                            Print Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditEnrollment(enrollment)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteEnrollment(enrollment.enrollment_id)}>
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
              {filteredEnrollments.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, filteredEnrollments.length)}
            </strong>{" "}
            of <strong>{filteredEnrollments.length}</strong> rows
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
      <Card x-chunk="dashboard-06">
        <CardContent class="p-6">
          <div className="space-y-4">
            {/* Send SMS Section */}
            <div>
              <div className="relative w-full">
                <label
                  htmlFor="input-box"
                  className="absolute -top-2 left-2 bg-white px-1 text-sm text-gray-600"
                >
                  Send Message
                </label>
                <Textarea
                  id="input-box"
                  placeholder="Type your message here..."
                  value={smsText}
                  onChange={(e) => setSmsText(e.target.value)}
                  className="border text-md h-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-1 block w-full"
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                {/* Send Notice Button (Left-aligned) */}
                <div className="flex space-x-4">
                  <Button
                    onClick={handleNotice}
                    className="mt-2"
                    variant="default"
                  >
                    Send Notice
                  </Button>
                  <Button
                    onClick={handleSendSMS}
                    className="mt-2"
                    variant="outline"
                  >
                    Send SMS
                  </Button>
                </div>

                {/* Deactivate All and Send Due Notice Buttons (Right-aligned) */}
                <div className="flex space-x-4">
                   <Button onClick={handleSendDueNotice} variant="secondary">Send Due Notice</Button>
                  <Button onClick={handleDeactivateAll} variant="destructive">Delete Enrollment(s)</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>  
      
      <AddEnrollment
          isFormOpen={isFormOpen}
          editData={editEnrollmentData}
          onEnrollmentAdded={handleEnrollentAdd}
          onClose={closeForm}
        />

    
    </main>
  );
}

export default function Page() {
  return (
    <main>
      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">All Students</TabsTrigger>
          <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Students />
        </TabsContent>

        <TabsContent value="enrollments">
          <Enrollments />
        </TabsContent>
      </Tabs>
    </main>
  );
}