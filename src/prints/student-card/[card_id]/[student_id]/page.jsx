"use client"; 

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card"; 
import Image from "next/image";

const PrintStudentCard = ({ params }) => {
  const { student_id, card_id } = params;

  const [student, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false); // To track data loading
  const [isImageLoaded, setIsImageLoaded] = useState(false); // To track image loading

  // Fetch student data from the server
  useEffect(() => {
    if (card_id && student_id) {
      const fetchStudentData = async () => {
        try {
          const response = await fetch(
            `http://lms.ennovat.com/lms-admin/cards/fetch_print_data.php?card_id=${encodeURIComponent(
              card_id
            )}&student_id=${encodeURIComponent(student_id)}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await response.json();
          if (data.error) {
            setError(data.error);
          } else {
            setStudentData(data); // Set the entire fetched student data
            setIsLoaded(true); // Mark data as loaded
            console.log("Fetched Student Data:", data); // Debugging: log the fetched data
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
          setError("Error fetching student data");
        }
      };
      fetchStudentData();
    }
  }, [card_id, student_id]);

  // Trigger print only after both data and image are loaded
  useEffect(() => {
    if (isLoaded && isImageLoaded) {
      window.print();
    }
  }, [isLoaded, isImageLoaded]);

  // Check if the data is loaded before rendering the card
  if (!isLoaded) {
    return <p>Loading student data...</p>;
  }

  return (
    <div className="p-8">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 print:grid-cols-2">
          <Card className="border border-gray-300 break-inside-avoid print:border print:border-gray-300 m-2 print:m-2">
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                {/* Logo on the top-left */}
                <div>
                  <Image
                    src="/ennovat-logo.png"
                    alt="Event Logo"
                    width={100}
                    height={100}
                    onLoad={() => setIsImageLoaded(true)} // Image load handler
                  />
                </div>

                {/* Event Name on the top-right */}
                <div className="text-right">
                  <h1 className="text-lg font-bold">{student.card_title}</h1>
                  <p className="text-md">{student.card_date}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="text-sm grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p>
                  <strong>Name:</strong> {student.student_name}
                </p>
                <p>
                  <strong>Number:</strong> {student.student_number}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {student.student_date_of_birth}
                </p>
              </div>
              <div>
                <p>
                  <strong>Institution:</strong> {student.student_institution}
                </p>
                <p>
                  <strong>Course:</strong> {student.course_name}
                </p>
                <p>
                  <strong>Batch:</strong> {student.batch_name}
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between mt-6">
              <div>
                <p className="text-xs text-gray-500">Signature of Authority</p>
                <div className="border-t border-gray-400 w-32 mt-1"></div>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Print styles */}
      <style jsx>{`
        @media print {
          .print\\:border {
            border-width: 1px !important;
            border-color: black !important;
          }

          .break-inside-avoid {
            break-inside: avoid;
          }

          body {
            margin: 0;
            padding: 0;
          }

          .grid:nth-of-type(8n) {
            break-after: page;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintStudentCard;