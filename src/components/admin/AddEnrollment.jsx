import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const AddEnrollment = ({ isFormOpen, onEnrollmentAdded, editData, onClose }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isFormOpen);
  const [isEditMode, setIsEditMode] = useState(false); // For managing add/edit modes
  const [selectedEnrollment, setSelectedEnrollment] = useState(null); // Store enrollment being edited
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [studentIndex, setStudentIndex] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState("");

  useEffect(() => {
    if (editData) {
      setIsEditMode(true);
      setIsSidebarOpen(true); // Open sidebar in edit mode
      setSelectedEnrollment(editData); // Store the selected enrollment
      setSelectedCourse(editData.course_id || "");
      setSelectedBatch(editData.batch_id || "");
      setStudentNumber(editData.student_number || ""); // Default to empty string if null
      setStudentIndex(editData.student_index || "");
      setCourseFee(editData.course_fee || "");
      setPaidAmount(editData.paid_amount || "");
      setDiscountedAmount(editData.discounted_amount || "");
      fetchBatches(editData.course_id); // Fetch batches for the selected course
    } else {
      resetForm(); // Reset the form in add mode
    }
  }, [editData]);

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
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    fetchCourses(); // Fetch courses when the component mounts
  }, []); // Removed dependency array to prevent multiple fetches

  const fetchBatches = async (courseId) => {
    try {
      const response = await fetch(
        `http://lms.ennovat.com/lms-admin/batches/fetch_course_batch.php?course_ids=${courseId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setBatches(data.batches || []);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);

    // Fetch batches for the selected course
    fetchBatches(courseId);

    // Find the course fee based on the selected course
    const selectedCourseData = courses.find(
      (course) => course.course_id === courseId
    );
    if (selectedCourseData) {
      setCourseFee(
        selectedCourseData.course_fee - selectedCourseData.discounted_amount
      );
    }
  };

  const resetForm = () => {
    setSelectedEnrollment(null);
    setSelectedCourse("");
    setSelectedBatch("");
    setCourseFee("");
    setStudentNumber(""); // Reset student number
    setStudentIndex("");
    setPaidAmount("");
    setDiscountedAmount("");
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false); // Close the sidebar
    resetForm(); // Clear the form when closing
    setIsEditMode(false); // Exit edit mode
  };
  const handleSubmit = async () => {
    const url = isEditMode
      ? `http://lms.ennovat.com/lms-admin/students/edit_enrollment.php?enrollment_id=${selectedEnrollment.enrollment_id}`
      : "http://lms.ennovat.com/lms-admin/students/create_enrollment.php";
    
    const payload = {
      student_number: studentNumber,
      student_index: studentIndex,
      course_id: selectedCourse,
      batch_id: selectedBatch,
      course_fee: courseFee, // Send course fee to the backend
      paid_amount: isEditMode ? null : paidAmount, // Don"t send paid amount if in edit mode
      discounted_amount: isEditMode ? null : discountedAmount, // Don"t send discounted amount if in edit mode
    };
    
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      if (data.success) {
        onEnrollmentAdded(); // Notify parent to refresh enrollments
        closeSidebar(); // Close sidebar after successful submission
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error submitting enrollment:", error);
    }
  };
  return (
    <div className="relative z-50">
      {/* Floating "Add" Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[190px] overflow-hidden"
        >
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Create Enrollment
          </span>
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Add/Edit Enrollment Sidebar */}
      <nav
        className={`overflow-y-auto fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">
            {isEditMode ? "Edit Enrollment" : "Create Enrollment"}
          </h2>
          <p className="mb-10 text-muted-foreground">
            {isEditMode
              ? "Edit the enrollment details"
              : "Add student enrollment with all information."}
          </p>

          {/* Form Fields */}
          {/* Student Number */}
          {isEditMode ? "" : 
            <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Student Number
            </label>
            <input
              type="text"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Student Number"
            />
            </div>
          }
          {/* Student Index */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Student Index
            </label>
            <input
              type="text"
              value={studentIndex}
              onChange={(e) => setStudentIndex(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Student Index"
            />
          </div>

          {/* Select Course */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Batch */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Select Batch
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch.batch_id} value={batch.batch_id}>
                  {batch.batch_name}
                </option>
              ))}
            </select>
          </div>

          {/* Course Fee */}
          {!isEditMode && (
            <div className="relative w-full my-6">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Course Fee
              </label>
              <input
                type="text"
                value={courseFee}
                onChange={(e) => setCourseFee(e.target.value)}
                className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                placeholder="Enter Course Fee"
              />
            </div>
          )}

          {/* Paid Amount */}
          {!isEditMode && (
            <div className="relative w-full my-6">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Paid Amount
              </label>
              <input
                type="text"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                placeholder="Enter Paid Amount"
              />
            </div>
          )}

          {/* Discounted Amount */}
          {!isEditMode && (
            <div className="relative w-full my-6">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Discounted Amount
              </label>
              <input
                type="text"
                value={discountedAmount}
                onChange={(e) => setDiscountedAmount(e.target.value)}
                className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                placeholder="Enter Discounted Amount"
              />
            </div>
          )}

          <Button className="mt-4 w-full" onClick={handleSubmit}>
            {isEditMode ? "Update Enrollment" : "Submit Enrollment"}
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default AddEnrollment;
