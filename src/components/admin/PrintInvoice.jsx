import React, { useEffect, useRef } from "react";

const Invoice = ({ enrollment }) => {
    const printWindowRef = useRef([]);

    useEffect(() => {
        // Close all previous invoice windows
        printWindowRef.current.forEach(win => {
            if (win) {
                win.close();
            }
        });
        printWindowRef.current = []; // Reset the array

        // Open a new window
        const newWindow = window.open("", "_blank");

        if (!newWindow) {
            console.error("Failed to open new window. Please check your browser settings.");
            return;
        }

        printWindowRef.current.push(newWindow); // Store the reference

        const invoiceContent = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Invoice - ${enrollment.enrollment_id}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
                    <style>
                        body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f8f9fa; font-family: "Poppins", sans-serif; font-size: 10px; color: #333; }
                        .container { width: 100%; max-width: 700px; background-color: white; box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1); padding: 30px; margin: 40px; border-radius: 8px; position: relative; border-top: 10px solid #13d49a; }
                        .invoice-title { text-align: center; font-size: 20px; font-weight: 600; margin: 20px 0; color: #13d49a; }
                        .row { display: flex; justify-content: space-between; margin-bottom: 20px; }
                        .column { width: 48%; }
                        .table, .table2 { width: 100%; border-collapse: collapse; font-size: 10px; }
                        .table th, .table td, .table2 td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                        .table th { background-color: #13d49a; color: white; }
                        .table2 .highlight { background-color: #13d49a; color: white; font-weight: bold; }
                        a { text-decoration: none; color: #13d49a; font-family: "Poppins", sans-serif; font-size: 10px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="invoice-title">Ennovat LMS Invoice</div>
                        <div class="row">
                            <div class="column">
                                <h3>Invoiced to:</h3>
                                <h5>${enrollment.student.student_name} <br> ${enrollment.student.student_number}</h5>
                            </div>
                            <div class="column" style="text-align:right;">
                                <h3>Paid to:</h3>
                                <h5>${enrollment.service_details.company_name}</h5>
                                <img src="${enrollment.service_details.logo}" alt="Logo" style="width: 100px;" />
                            </div>
                        </div>
                        <h4>Course: ${enrollment.course.course_name}</h4>
                        <p>${enrollment.due_amount_details}</p>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Enrollment ID</th>
                                    <th>Course Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${enrollment.enrollment_id}</td>
                                    <td>${enrollment.course_fee || "TBD"} BDT</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
            </html>
        `;

        newWindow.document.write(invoiceContent);
        newWindow.document.close();

        newWindow.onload = () => {
            newWindow.print();
            // No need to close the window here
        };

        // Add the new window reference to the array
        printWindowRef.current.push(newWindow);
    }, [enrollment]);

    return null; // No UI needed since it prints automatically
};

export default Invoice;
