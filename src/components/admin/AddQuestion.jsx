"use client";
import React, { useState, useEffect } from "react";
import QuizOption from "./QuizOption";
import "draft-js/dist/Draft.css";
import QuizQuestion from "./QuizQuestion";
import { Button } from "../ui/button";
import QuizQuestionSolution from "./QuizQuestionSolution";


export default function AddQuestion({ quizId, onAddedQuestion }) {
  // Local state for inputs
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [solution, setSolution] = useState("");
  const [followUpId, setFollowUpId] = useState("");
  

  const handleAddQuestion = async () => {
    // Check if all fields are filled
    if (!question || !option1 || !option2 || !option3 || !correctOption) {
      alert("All fields are required!");
      return;
    }
    
    const newQuestion = {
      question,
      option_1: option1,
      option_2: option2,
      option_3: option3,
      correct_option: correctOption,
      solution,
      follow_up_id: followUpId,
      quiz_id: quizId,
    };
    console.log(newQuestion);
    try {
      const response = await fetch("http://lms.ennovat.com/lms-admin/quizzes/add_question.php", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });
      const data = await response.json();
      if (data.success) {
        alert("Question added successfully!");
        onAddedQuestion();
        // Clear the input fields after adding the question
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setCorrectOption("");
        setSolution("");
        setFollowUpId("");
      } else {
        alert(data.message || "Failed to add the question.");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question.");
    }
  };

  return (
    <div className="border rounded-xl p-4 w-full mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Add Question</h2>
        <div className="relative w-full max-w-64 my-2">
          <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600"> Follow Up Question ID </label>
          <input
            type="number"
            className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            placeholder="Enter Follow Up Question ID"
            value={followUpId}
            onChange={(e) => setFollowUpId(e.target.value)}
          />
        </div>
      </div>
      <div className="relative w-full my-6">
        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600 z-10"> Question </label>
        <QuizQuestion value={question} onChange={setQuestion} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      <div className="relative w-full">
        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600 z-10"> Option 1 </label>
        <QuizOption value={option1} onChange={setOption1} />
      </div>
      <div className="relative w-full">
        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600 z-10"> Option 2 </label>
        <QuizOption value={option2} onChange={setOption2} />
      </div>
      <div className="relative w-full">
        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600 z-10"> Option 3 </label>
        <QuizOption value={option3} onChange={setOption3} />
      </div>
      <div className="relative w-full">
        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600 z-10"> Correct Option </label>
        <QuizOption value={correctOption} onChange={setCorrectOption} />
      </div>
      </div>
      <div className="relative w-full">
        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600 z-10"> Question Solution </label>
        <QuizQuestionSolution value={solution} onChange={setSolution} />
      </div>
      <Button className="mt-4 px-4" onClick={handleAddQuestion}>
        Add Question
      </Button>
    </div>
  );
}
