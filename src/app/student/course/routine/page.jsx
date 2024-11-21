"use client";

import React, {useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  // State to store the routines, loading state, and error state
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch routines when the component mounts
  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await fetch(
          "https://youthsthought.com/lms-backend/student-panel/routines/fetch_routines.php"
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch routines");
        }

        const data = await response.json();
        console.log(data); // Check the data structure in the console
        
        // Check if the response contains the "routines" array
        if (data.routines && Array.isArray(data.routines)) {
          setRoutines(data.routines);  // Set the routines from the "routines" key
        } else {
          throw new Error("Invalid data format");
        }

        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false);  // Set loading to false in case of an error
      }
    };

    fetchRoutines();
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
      {routines.map((routine) => (
        <Card
          key={routine.routine_id}
          className="w-full max-w-md border rounded-lg shadow-lg transition-transform duration-200 hover:shadow-xl"
        >
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold">
              {routine.routine_name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm mt-2">{routine.routine_description}</p>
            <div className="flex justify-end mt-4">
              <Link
                href={routine.file_address}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="bg-white text-primary hover:bg-primary hover:text-white"
                >
                  Open Routine
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
