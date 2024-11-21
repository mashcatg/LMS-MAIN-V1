"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function QuizDetails({ params }) {
  const [quizData, setQuizData] = useState(null); // State for quiz data
  const [lastAttemptData, setLastAttemptData] = useState(null); // State for last attempt data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { quiz_id } = params;

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: true };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  // Fetch quiz data and last attempt data from the API
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizResponse = await fetch(
          `https://www.youthsthought.com/lms-backend/student-panel/quizzes/fetch_single_quiz.php?quiz_id=${quiz_id}`
        );

        if (!quizResponse.ok) {
          throw new Error("Failed to fetch quiz data");
        }

        const quizData = await quizResponse.json();

        // Check if quiz data is valid
        if (quizData.success && quizData.quizzes && quizData.quizzes.length > 0) {
          setQuizData(quizData.quizzes[0]);
        } else {
          throw new Error("No quizzes available");
        }

        // Fetch last attempt data
        const attemptResponse = await fetch(
          `https://www.youthsthought.com/lms-backend/student-panel/quizzes/get_last_attempt_result.php?quiz_id=${quiz_id}`
        );

        if (!attemptResponse.ok) {
          throw new Error("Failed to fetch last attempt data");
        }

        const attemptData = await attemptResponse.json();

        if (attemptData.error) {
          throw new Error(attemptData.error);
        }

        setLastAttemptData(attemptData); // Set last attempt data

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quiz_id]);

  // If loading, show loading state
  if (loading) {
    return <div className="text-center text-gray-700">Loading quiz details...</div>;
  }

  // If there is an error, display the error message
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-primary-500 to-primary-300">
      {/* Quiz Card */}
      <Card className="w-full max-w-md border border-gray-200 rounded-xl shadow-lg bg-white mb-6">
        <CardHeader className="bg-primary text-white rounded-t-xl p-4">
          <CardTitle className="text-2xl font-semibold">{quizData.quiz_name}</CardTitle>
          <p className="text-sm">{quizData.quiz_description}</p>
        </CardHeader>

        {/* Quiz Information */}
        <CardContent className="p-4">
          <div className="space-y-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quiz Details</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Available From:</strong> {formatDate(quizData.available_from)}</li>
                <li><strong>Available To:</strong> {formatDate(quizData.available_to)}</li>
                <li><strong>Duration:</strong> {quizData.quiz_duration} min</li>
                <li><strong>Questions:</strong> {quizData.questions_per_quiz}</li>
                <li><strong>Marks per Question:</strong> {quizData.marks_per_question}</li>
                <li><strong>Negative Marks:</strong> {quizData.negative_marks}</li>
              </ul>
            </div>

            {/* Last Attempt Info */}
            {lastAttemptData && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Last Attempt</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>Correct Answers:</strong> {lastAttemptData.correct_answers}</li>
                  <li><strong>Incorrect Answers:</strong> {lastAttemptData.incorrect_answers}</li>
                  <li><strong>Obtained Marks:</strong> {lastAttemptData.total_obtained_marks}</li>
                  <li><strong>Total Marks:</strong> {lastAttemptData.total_marks}</li>
                  <li><strong>Attempt Date:</strong> {formatDate(lastAttemptData.timestamp)}</li>
                </ul>
              </div>
            )}
          </div>

          {/* Start Quiz Button */}
          <div className="flex justify-center">
            <Link href={`../attempt/${quizData.quiz_id}`}>
            <Button
                    variant="outline"
                    className="bg-primary text-white"
                  >Start Quiz</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
