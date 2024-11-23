import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react"; // Icon for adding exams
import Select from "react-select";
import { Button } from "../ui/button";

const AddExam = ({ onExamAdded, exam, setEditingExam, isSidebarOpen, toggleSidebar }) => {
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [mcqMarks, setMcqMarks] = useState("");
  const [cqMarks, setCqMarks] = useState("");
  const [practicalMarks, setPracticalMarks] = useState("");
  const [bonusMarks, setBonusMarks] = useState("");
  const [studentVisibility, setStudentVisibility] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://lms.ennovat.com/lms-admin/courses/fetch_courses.php", {
        credentials: "include",
      });
      const data = await response.json();
      setCourses(data.courses || []);
    };
  
    fetchCourses(); 
  }, []);

  useEffect(() => {
    if (exam) {
      setExamName(exam.exam_name);
      setExamDate(exam.exam_date);
      setMcqMarks(exam.mcq_marks);
      setCqMarks(exam.cq_marks);
      setPracticalMarks(exam.practical_marks);
      setBonusMarks(exam.bonus_marks);
      setStudentVisibility(exam.student_visibility === "1");
      setSelectedCourseIds(exam.course_id.split(","));
    } else {
      // Reset fields if not in edit mode
      resetFields();
    }
  }, [exam]);

  const resetFields = () => {
    setExamName("");
    setExamDate("");
    setMcqMarks("");
    setCqMarks("");
    setPracticalMarks("");
    setBonusMarks("");
    setStudentVisibility(false);
    setSelectedCourseIds([]);
  };

  const handleCourseChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setSelectedCourseIds(selectedIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = exam ? "http://lms.ennovat.com/lms-admin/exams/update_exam.php" : "http://lms.ennovat.com/lms-admin/exams/create_exams.php";
    const body = new URLSearchParams({
      exam_id: exam?.exam_id, // Include exam_id only when updating
      exam_name: examName,
      exam_date: examDate,
      mcq_marks: mcqMarks,
      cq_marks: cqMarks,
      practical_marks: practicalMarks || "",
      bonus_marks: bonusMarks || "",
      student_visibility: studentVisibility ? "1" : "0",
      course_id: selectedCourseIds.join(","),
    });

    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const result = await response.json();
    if (result.success) {
      alert(`Exam ${exam ? "updated" : "added"} successfully!`);
      toggleSidebar(); // Close the sidebar after submission
      onExamAdded(); // Call the function to update the exam list without reloading
      resetFields();
    } else {
      alert(`Failed to ${exam ? "update" : "add"} exam: ` + result.message);
    }
  };

  return (
    <div className="relative z-50">
      {/* Floating "Add" Button */}
      <div className="fixed bottom-6 right-6">
      <button
          onClick={() => toggleSidebar()}
          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[150px] overflow-hidden"
        >
          {/* Circular Plus Icon */}
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          {/* Add Course Text (hidden until hover) */}
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add Exam
          </span>
        </button>
      </div>
      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-0"
          onClick={toggleSidebar}
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
        <h2 className="text-lg font-semibold mb-2">
          {exam ? "Edit Course" : "Add Course"}
        </h2>
        <p className="mb-10 text-muted-foreground">
          {exam ? "Edit course with all information." : "Add a new course with all information."}
        </p>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Exam Name</label>
            <input
              type="text"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Exam Name"
              required
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Exam Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">MCQ Marks</label>
            <input
              type="text"
              value={mcqMarks}
              onChange={(e) => setMcqMarks(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter MCQ Marks"
              required
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">CQ Marks</label>
            <input
              type="text"
              value={cqMarks}
              onChange={(e) => setCqMarks(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter CQ Marks"
              required
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Practical Marks</label>
            <input
              type="text"
              value={practicalMarks}
              onChange={(e) => setPracticalMarks(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Practical Marks"
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Bonus Marks</label>
            <input
              type="text"
              value={bonusMarks}
              onChange={(e) => setBonusMarks(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Bonus Marks"
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Courses</label>
            <Select
              isMulti
              options={courses.map(course => ({ value: course.course_id, label: course.course_name }))}
              onChange={handleCourseChange}
              placeholder="Select Courses"
              value={selectedCourseIds.map(id => ({
                value: id,
                label: courses.find(course => course.course_id === id)?.course_name,
              }))}
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={studentVisibility}
              onChange={() => setStudentVisibility(!studentVisibility)}
              className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
            />
            <label htmlFor="student-visibility" className="text-sm text-gray-700 select-none">
              Visible for students?
            </label>
          </div>

          <Button onClick={handleSubmit} className="mt-4 w-full">Submit</Button>
        </div>
      </nav>
    </div>
  );
};

export default AddExam;
