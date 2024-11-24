"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card"; // Assuming you have a UI component for Card

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(""); // State to store error messages
  const [playlistId, setPlaylistId] = useState(null);

  // Get playlistId from URL (assuming you"re using dynamic routes)
  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.pathname.split("/").pop();
    if (id) {
      setPlaylistId(id);
    } else {
      setError("No playlist ID provided");
    }
  }, []);

  // Fetch classes for the given playlistId
  useEffect(() => {
    if (!playlistId) return; // Do not fetch if playlistId is missing

    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `http://lms.ennovat.com/lms-admin/student-panel/classes/fetch_classes.php?id=${playlistId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Classes Data:", data); // Debugging

        if (data.classes && data.classes.length > 0) {
          setClasses(data.classes);
        } else {
          setError("No classes found for this playlist.");
        }
      } catch (error) {
        setError("Failed to fetch classes. Please try again later.");
        console.error("Error fetching classes:", error); // Log the error
      }
    };

    fetchClasses();
  }, [playlistId]); // Only re-fetch when playlistId changes

  return (
    <div>
      {/* Display error message if any */}
      {error && <p className="error-message">{error}</p>}

      {/* Show classes in a 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {classes.length === 0 ? (
          <p>No classes found for this playlist.</p>
        ) : (
          classes.map((classItem) => (
            <Card key={classItem.class_id} className="border rounded-lg overflow-hidden">
              <Link href={`${playlistId}/${classItem.class_id}`} className="w-full">
                {/* Card Content */}
                <div className="relative h-60">
                  <img
                    src={classItem.class_thumbnail || "/default-thumbnail.jpg"} // Default thumbnail if none exists
                    alt={classItem.class_name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{classItem.class_name}</h3>
                    <p className="text-sm">{classItem.notes && classItem.notes.length} Notes</p>
                  </div>
                </div>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ClassesPage;
