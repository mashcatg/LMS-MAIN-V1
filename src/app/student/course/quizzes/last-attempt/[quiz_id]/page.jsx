"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // For route navigation
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'; // Lucid React Icons

export default function LastAttempt({ params }) {
  const { quiz_id } = params;
  const router = useRouter();
  const [attemptData, setAttemptData] = useState(null); // State to store last attempt data
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state for error handling

  // Fetch last attempt results once quiz_id is available
  useEffect(() => {
    if (!quiz_id) return; // Wait until quiz_id is available

    const fetchLastAttempt = async () => {
      try {
        const response = await fetch(
          `https://www.youthsthought.com/lms-backend/student-panel/quizzes/get_last_attempt_result.php?quiz_id=${quiz_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch last attempt data");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setAttemptData(data); // Set the fetched attempt data
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchLastAttempt();
  }, [quiz_id]);

  // Format the time remaining (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-600">
        <AlertTriangle className="animate-spin text-5xl mb-4" />
        <div>Loading last attempt data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-red-500">
        <XCircle className="text-5xl mb-4" />
        <div>{error}</div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      {/* Header with quiz title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-primary mb-4">Your Last Attempt for Quiz {quiz_id}</h1>
        <p className="text-lg text-gray-600">Here are the details of your most recent quiz attempt.</p>
      </div>

      {/* Attempt Results */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Display Total Marks and Obtained Marks */}
        <div className="p-6 bg-primary text-white rounded-lg shadow-xl">
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Total Marks:</strong> {attemptData.total_marks}</div>
            <div><strong>Your Marks:</strong> {attemptData.total_obtained_marks}</div>
            <div><strong>Correct Answers:</strong> {attemptData.correct_answers}</div>
            <div><strong>Incorrect Answers:</strong> {attemptData.incorrect_answers}</div>
          </div>
        </div>

        {/* Display Questions and User Answers */}
        {attemptData.questions.length > 0 ? (
          attemptData.questions.map((question, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2
                className="text-xl font-semibold mb-4"
                dangerouslySetInnerHTML={{ __html: question.question }} // Render HTML content safely
              />
              <div className="space-y-3">
                {Object.entries(question.options).map(([label, option], idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <span className="font-medium">{label}:</span>
                    <span dangerouslySetInnerHTML={{ __html: option }} />
                  </div>
                ))}
              </div>

              {/* Show user's submitted answer */}
              <div className="mt-4">
                <strong>Your Answer:</strong> <span>{question.submitted_answer}</span>
              </div>

              {/* Show if answer was correct or incorrect */}
              <div className={`mt-2 ${question.submitted_answer === question.correct_answer ? 'text-green-500' : 'text-red-500'}`}>
                {question.submitted_answer === question.correct_answer ? (
                  <CheckCircle className="inline-block mr-2" />
                ) : (
                  <XCircle className="inline-block mr-2" />
                )}
                {question.submitted_answer === question.correct_answer ? "Correct" : "Incorrect"}
              </div>

              {/* Display solution */}
              {question.quiz_solution && (
                <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                  <strong className="text-lg">Solution:</strong>
                  <div dangerouslySetInnerHTML={{ __html: question.quiz_solution }} />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No questions available for this quiz.</p>
        )}
      </div>
    </main>
  );
}
