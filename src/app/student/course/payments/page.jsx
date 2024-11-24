"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CalendarIcon, DollarSignIcon, CreditCardIcon, FileTextIcon } from "lucide-react"; // Import Lucide Icons

export default function Page() {
  // State to store payments, loading state, and error state
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch payment data when the component mounts
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          "http://lms.ennovat.com/lms-admin/student-panel/payments/fetch_payments.php"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payment data");
        }

        const data = await response.json();
        console.log(data); // Check the data structure in the console
        
        // Check if the response contains the "payments" array
        if (data.payments && Array.isArray(data.payments)) {
          setPayments(data.payments);  // Set the payments from the "payments" key
        } else {
          throw new Error("Invalid data format");
        }

        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false);  // Set loading to false in case of an error
      }
    };

    fetchPayments();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] gap-6 p-6">
      {payments.length === 0 ? (
        <div>No payment history available.</div>
      ) : (
        payments.map((payment) => (
          <Card
            key={payment.payment_id}
            className="w-full max-w-md border rounded-lg shadow-lg transition-transform duration-200 hover:shadow-xl"
          >
            <CardHeader className="bg-primary text-white rounded-t-lg">
              <CardTitle className="text-xl font-semibold">
                Transaction ID {payment.payment_id}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm mt-2 flex items-center">
                <CalendarIcon className="h-5 w-5 text-primary mr-2" />
                 {new Date(payment.payment_time).toLocaleDateString()} 
                {" "}
                {new Date(payment.payment_time).toLocaleTimeString()}
              </p>
              <p className="text-sm mt-2 flex items-center">
                <DollarSignIcon className="h-5 w-5 text-primary mr-2" />
                <strong>Paid BDT. {payment.paid_amount}</strong>
              </p>
              <p className="text-sm mt-2 flex items-center">
                <DollarSignIcon className="h-5 w-5 text-primary mr-2" />
                <span className="line-through">Discounted BDT. {payment.discounted_amount}</span>
              </p>
              <p className="text-sm mt-2 flex items-center">
                <CreditCardIcon className="h-5 w-5 text-primary mr-2" />
                {payment.method === "online" ? "Online" : "Offline"}
              </p>
              <div className="flex justify-end mt-4">
                <Link href={`/payments/invoice/${payment.payment_id}`} passHref>
                  <Button
                    variant="outline"
                    className="bg-white text-primary hover:bg-primary hover:text-white"
                  >
                    <FileTextIcon className="h-5 w-5 mr-2" />
                    View Invoice
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </main>
  );
}
