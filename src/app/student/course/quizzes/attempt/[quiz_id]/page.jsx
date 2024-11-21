"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // For route navigation

export default function QuizAttempt({ params }) {
  const { quiz_id } = params;
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState(0); // Timer state (will be dynamically fetched)
  const [questions, setQuestions] = useState([]); // State to store fetched questions
  const [selectedAnswers, setSelectedAnswers] = useState({}); // State to store user answers
  const [isLoading, setIsLoading] = useState(true); // Loading state for the quiz data
  const [error, setError] = useState(null); // State for error handling
  const [isSubmitted, setIsSubmitted] = useState(false); // To track if the quiz has been submitted

  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fetch quiz details and questions once quiz_id is available
  useEffect(() => {
    if (!quiz_id) return; // Wait until quiz_id is available
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `https://www.youthsthought.com/lms-backend/student-panel/quizzes/fetch_questions.php?quiz_id=${quiz_id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Error fetching quiz data");
        }

        const { quiz, questions } = data;

        // Shuffle questions and options
        const shuffledQuestions = shuffleArray(questions).map((question) => {
          const shuffledOptions = shuffleArray([
            question.option_1,
            question.option_2,
            question.option_3,
            question.correct_option_4,
          ]).map((option, index) => ({
            label: String.fromCharCode(97 + index), // 'a' -> 97, 'b' -> 98, ...
            value: option,
          }));

          // Add the labels a, b, c, d to options based on their order
          return {
            ...question,
            options: shuffledOptions,
          };
        });

        // Calculate remaining time based on available_from and available_to
        const currentTime = new Date();
        const availableFrom = new Date(quiz.available_from);
        const availableTo = new Date(quiz.available_to);

        if (currentTime < availableFrom || currentTime > availableTo) {
          throw new Error("Quiz is not available at this time.");
        }

        const quizDurationInSeconds = quiz.quiz_duration * 60;
        const timeLeft = availableTo - currentTime;
        const timer = Math.max(0, Math.min(timeLeft, quizDurationInSeconds));

        setQuestions(shuffledQuestions);
        setTimeRemaining(timer);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchQuizData();
  }, [quiz_id]);

  // Timer functionality to decrement every second
  useEffect(() => {
    if (timeRemaining === 0 || isLoading) return;

    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          handleSubmit(); // Automatically submit when time reaches 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeRemaining, isLoading]);

  // Format the time remaining (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle the selection of answers
  const handleOptionSelect = (questionId, selectedLabel) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedLabel, // Store the answer label (e.g., 'a.', 'b.', etc.)
    }));
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    if (isSubmitted) return; // Prevent submitting multiple times

    try {
      const submissionData = questions.map((question) => {
        const selectedAnswer = selectedAnswers[question.question_id] || null;

        return {
          question_id: question.question_id,
          options: question.options.map((option) => `${option.label}. ${option.value}`), // Include full options
          submitted_answer: selectedAnswer, // Store selected label (e.g., 'a.', 'b.', etc.)
        };
      });

      const response = await fetch("https://www.youthsthought.com/lms-backend/student-panel/quizzes/submit_quiz.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quiz_id,
          answers: submissionData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true); // Set to true to avoid further submissions
        router.push(`../../quizzes/${quiz_id}`); // Redirect to quiz page
      } else {
        alert("Error submitting quiz: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  // Handle auto submission when page is being closed, reloaded, or switched tabs
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isSubmitted) {
        handleSubmit();
        event.preventDefault(); // Prevent the "Are you sure?" dialog
        event.returnValue = ''; // Most browsers require setting returnValue
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !isSubmitted) {
        handleSubmit(); // Submit when switching tabs or leaving the page
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isSubmitted]);

  if (isLoading) {
    return <div className="text-center">Loading quiz details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Timer Display */}
      <div className="fixed top-0 left-0 w-full bg-primary text-white py-4 text-center font-semibold mt-12">
        Time Remaining: {formatTime(timeRemaining)}
      </div>

      {/* Quiz Content */}
      <div className="mt-16 w-full max-w-lg">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question.question_id} className="w-full border rounded-lg p-4 mb-6 bg-white">
              <h2
                className="font-semibold mb-4"
                dangerouslySetInnerHTML={{ __html: question.question }} // Render HTML content safely
              />
              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${question.question_id}`}
                      value={option.label}
                      checked={selectedAnswers[question.question_id] === `${option.label}. ${option.value}`}
                      onChange={() => handleOptionSelect(question.question_id, `${option.label}. ${option.value}`)}
                      className="h-4 w-4 text-primary"
                    />
                    <span dangerouslySetInnerHTML={{ __html: `${option.label}. ${option.value}` }} />
                  </label>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No questions available.</p>
        )}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-primary text-white w-full py-3 rounded-lg"
        >
          Submit Quiz
        </button>
      </div>
    </main>
  );
}
