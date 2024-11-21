"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // SHADCN Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // SHADCN Card components
import Link from "next/link";

export default function Page() {
  // State to store quizzes, loading state, and error state
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quiz data when the component mounts
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          "https://www.youthsthought.com/lms-backend/student-panel/quizzes/fetch_quizzes.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const data = await response.json();
        if (data.success && data.quizzes && Array.isArray(data.quizzes)) {
          setQuizzes(data.quizzes); // Set quizzes data
        } else {
          throw new Error("Invalid quiz data format");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // Render loading state
  if (loading) {
    return <div className="text-center text-gray-700">Loading quizzes...</div>;
  }

  // Render error message
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Helper function to format the date
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Render quizzes if data is available
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] gap-6 p-6 bg-gradient-to-b from-gray-50 to-white">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-primary mb-6">All Quizzes</h1>

      {/* Display Quizzes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.length === 0 ? (
          <div>No quizzes available.</div>
        ) : (
          quizzes.map((quiz) => (
            <Card
              key={quiz.quiz_id}
              className="w-full max-w-md border rounded-lg shadow-lg transition-transform duration-200 hover:shadow-xl bg-white"
            >
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <CardTitle className="text-xl font-semibold">{quiz.quiz_name}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  {/* Duration, Marks, Questions */}
                  <div className="text-sm text-gray-700">
                    <p><strong>Duration:</strong> {quiz.quiz_duration} minutes</p>
                    <p><strong>Marks per Question:</strong> {quiz.marks_per_question}</p>
                    <p><strong>Questions per Quiz:</strong> {quiz.questions_per_quiz}</p>
                  </div>

                  {/* Available Dates */}
                  <div className="text-sm text-gray-700 mt-4">
                    <p>
                     {formatDate(quiz.available_from)} to
                    </p>
                    <p>
                      {formatDate(quiz.available_to)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  {/* Multiple Availability */}
                  <p className={`font-semibold text-md ${quiz.multiple_availability ? 'text-green-500' : 'text-red-500'}`}>
                    {quiz.multiple_availability ? "Multiple Availability: Enabled" : "Multiple Availability: Disabled"}
                  </p>
                </div>

                {/* Link to start quiz */}
                <div className="flex justify-center mt-6">
                  <Link
                    href={`/quizzes/${quiz.quiz_id}`}
                    passHref
                  >
                    <Button
                    variant="outline"
                    className="bg-primary text-white"
                  >Start Quiz</Button>
                    
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
