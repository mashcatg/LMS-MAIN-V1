import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react"; // Icon for closing the sidebar
import ImageUploader from "../ui/ImageUploader";
import TextEditor from "../ui/texteditor";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";


const AddQuiz = ({ onQuizAdded, editingQuiz, setEditingQuiz }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [quizDuration, setQuizDuration] = useState("");
  const [questionsPerQuiz, setQuestionsPerQuiz] = useState("");
  const [marksPerQuestion, setMarksPerQuestion] = useState("");
  const [negativeMarks, setNegativeMarks] = useState("");
  const [isMultipleAvailability, setIsMultipleAvailability] = useState(false);
  const [studentVisibility, setStudentVisibility] = useState(false); // Added checkbox for student visibility
  const [courseId, setCourseId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [courses, setCourses] = useState([]); // State to hold fetched courses

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSetEditingQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setIsSidebarOpen(true);
};


  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setEditingQuiz(null); // Reset editing state
  };

  useEffect(() => {
    const fetchCourses = async () => {
    try {
      const response = await fetch(
        "http://lms.ennovat.com/lms-admin/courses/fetch_courses.php",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

    fetchCourses(); // Call the function to fetch courses

    if (editingQuiz) {
      setQuizName(editingQuiz.quiz_name);
      setQuizDescription(editingQuiz.quiz_description);
      setAvailableFrom(editingQuiz.available_from);
      setAvailableTo(editingQuiz.available_to);
      setQuizDuration(editingQuiz.quiz_duration);
      setQuestionsPerQuiz(editingQuiz.questions_per_quiz);
      setMarksPerQuestion(editingQuiz.marks_per_question);
      setNegativeMarks(editingQuiz.negative_marks);
      setIsMultipleAvailability(editingQuiz.is_multiple_availability);
      setStudentVisibility(editingQuiz.student_visibility); // Set student visibility from editingQuiz
      setCourseId(editingQuiz.course_id);
      setServiceId(editingQuiz.service_id);
      toggleSidebar();
    } else {
      setQuizName("");
      setQuizDescription("");
      setAvailableFrom("");
      setAvailableTo("");
      setQuizDuration("");
      setQuestionsPerQuiz("");
      setMarksPerQuestion("");
      setNegativeMarks("");
      setIsMultipleAvailability(false);
      setStudentVisibility(false); // Reset student visibility
      setCourseId("");
      setServiceId("");
      closeSidebar();
    }
  }, [editingQuiz]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newQuizData = {
      quiz_id: editingQuiz ? editingQuiz.quiz_id : null,
      quiz_name: quizName,
      quiz_description: quizDescription,
      available_from: availableFrom,
      available_to: availableTo,
      quiz_duration: quizDuration,
      questions_per_quiz: questionsPerQuiz,
      marks_per_question: marksPerQuestion,
      negative_marks: negativeMarks,
      is_multiple_availability: isMultipleAvailability,
      student_visibility: studentVisibility, // Add student visibility to newQuizData
      course_id: courseId,
      service_id: serviceId,
    };
  
    console.log("Submitting quiz data:", newQuizData); // Debugging line
  
    try {
      const response = await fetch(editingQuiz ? "http://lms.ennovat.com/lms-admin/quizzes/edit_quiz.php" : "http://lms.ennovat.com/lms-admin/quizzes/create_quiz.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newQuizData),
      });
  
      const data = await response.json();
      console.log("Response data:", data); // Debugging line
  
      if (data.success) {
        alert(editingQuiz ? "Quiz updated successfully!" : "Quiz added successfully!");
        onQuizAdded(); // Refresh the quiz list
        // Reset form fields
        closeSidebar(); // Close sidebar after submission
      } else {
        alert("Failed to save quiz: " + data.message);
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Error saving quiz");
    }
  };
  
  return (
    <div className="relative z-50">
      {/* Floating "Add" Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleSidebar}
          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[140px] overflow-hidden"
        >
          {/* Circular Plus Icon */}
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>

          {/* Add Course Text (hidden until hover) */}
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add Quiz
          </span>
        </button>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-0"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`overflow-y-auto fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{editingQuiz ? "Edit Quiz" : "Add New Quiz"}</h2>
          <p className="mb-10 text-muted-foreground">
            {editingQuiz ? "Edit the quiz details." : "Add new quiz with all informations."}
          </p>
          <form onSubmit={handleSubmit}>
          <div class="relative w-full  my-6">
            <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Quiz Name
            </label>
            <input
              type="text"
              class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Quiz Name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
          </div>
          <div class="relative w-full  my-6">
            <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Quiz Description
            </label>
            <textarea
              type="text"
              class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Quiz Description"
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
            />
          </div>
          <div class="relative w-full  my-6">
            <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Available From
            </label>
            <input
              type="date"
              class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </div>
          <div class="relative w-full  my-6">
            <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Available To
            </label>
            <input
              type="date"
              class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              value={availableTo}
              onChange={(e) => setAvailableTo(e.target.value)}
            />
          </div>
          <div class="relative w-full  my-6">
            <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Quiz Duration(Minutes)
            </label>
            <input
              type="number"
              class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Duration in Minutes"
              value={quizDuration}
              onChange={(e) => setQuizDuration(e.target.value)}
            />
          </div>
          <div class="relative w-full  my-6">
            <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Question per Quiz
            </label>
            <input
              type="number"
              class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Questions per Quiz"
              value={questionsPerQuiz}
              onChange={(e) => setQuestionsPerQuiz(e.target.value)}
            />
          </div>
          <div class="relative w-full  my-6">
            <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Marks per Question
            </label>
            <input
              type="number"
              class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Marks per Question"
              value={marksPerQuestion}
              onChange={(e) => setMarksPerQuestion(e.target.value)}
            />
          </div>
          <div class="relative w-full  my-6">
            <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Marks for Wrong Answer
            </label>
            <input
              type="number"
              class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Marks for Wrong Answer"
              value={negativeMarks}
              onChange={(e) => setNegativeMarks(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="multiple-availability"
              className="text-primary border-primary focus:ring-primary focus:border-primary"
              checked={isMultipleAvailability === "1"}
              onChange={(e) => setIsMultipleAvailability(e.target.checked ? "1" : "0")}
            />
            <label
              htmlFor="multiple-availability"
              className="text-sm text-gray-700 select-none"
            >
              Attempt Multiple Times
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="student-visibility"
              className="text-primary border-primary focus:ring-primary focus:border-primary"
              checked={studentVisibility === "1"}
              onChange={(e) => setStudentVisibility(e.target.checked ? "1" : "0")}
            />
            <label
              htmlFor="student-visibility"
              className="text-sm text-gray-700 select-none"
            >
              Student Visibility
            </label>
          </div>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.course_name}
              </option>
            ))}
          </select>
          <Button className="mt-4 w-full" type="submit">{editingQuiz ? "Update" : "Submit"}</Button>
          </form>
          </div>
      </nav>
    </div>
  );
};

export default AddQuiz;
