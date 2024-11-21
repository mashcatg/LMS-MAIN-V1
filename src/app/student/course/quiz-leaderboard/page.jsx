"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Leaderboard() {
  const allLeaderboardData = [
    { id: 1, name: "Alice Johnson", score: 95 },
    { id: 2, name: "Bob Smith", score: 92 },
    { id: 3, name: "Charlie Brown", score: 90 },
    { id: 4, name: "Diana Prince", score: 88 },
    { id: 5, name: "Evan Davis", score: 85 },
    { id: 6, name: "Fiona Lee", score: 83 },
    { id: 7, name: "George Kim", score: 80 },
    { id: 8, name: "Hannah Taylor", score: 78 },
    { id: 9, name: "Ivy Carter", score: 75 },
    { id: 10, name: "Jack Wilson", score: 73 },
    { id: 11, name: "Lily Young", score: 70 },
    { id: 12, name: "Max Green", score: 68 },
    // Add more entries as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  // Filter leaderboard data based on the search query
  const filteredData = allLeaderboardData.filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the data to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="flex items-center justify-center flex-col min-h-[80vh] p-6">
      <Card className="w-full max-w-3xl border rounded-lg overflow-hidden">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Leaderboard</h1>
            <button
              onClick={handlePrint}
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Print
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg"
          />

          <table className="w-full text-left mb-4">
            <thead>
              <tr className="border-b">
                <th className="py-2">Rank</th>
                <th className="py-2">Name</th>
                <th className="py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((entry, index) => (
                  <tr key={entry.id} className="border-b">
                    <td className="py-2">{startIndex + index + 1}</td>
                    <td className="py-2">{entry.name}</td>
                    <td className="py-2">{entry.score}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-500"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-500"
            >
              Next
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
