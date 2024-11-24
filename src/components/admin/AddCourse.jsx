import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ImageUploader from "../ui/ImageUploader";
import TextEditor from "../ui/texteditor";
import Select from "react-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import CourseDescription from "./CourseDescription";
// Function to generate options for the next 48 months
const generateMonthOptions = () => {
  const options = [];
  const currentDate = new Date();
  for (let i = 0; i < 48; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i);
    const monthLabel = date.toLocaleString("default", { month: "long", year: "numeric" });
    options.push({ value: monthLabel, label: monthLabel });
  }
  return options;
};

const AddCourse = ({ editingCourse, onCourseAdded, onCourseEdited, onClose }) => {
  const monthOptions = generateMonthOptions();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courseName, setCourseName] = useState(editingCourse?.course_name || "");
  const [courseId, setCourseId] = useState(editingCourse?.course_id || "");
  const [courseDescription, setCourseDescription] = useState(editingCourse?.course_description || "");
  const [feeType, setFeeType] = useState(editingCourse?.fee_type || "");
  const [courseFee, setCourseFee] = useState(editingCourse?.course_fee || "");
  const [discountedAmount, setDiscountedAmount] = useState(editingCourse?.discounted_amount || "");
  const [activeMonths, setActiveMonths] = useState(editingCourse?.active_months?.split(",") || []);
  const [acceptingAdmission, setAcceptingAdmission] = useState(editingCourse?.accepting_admission === "Yes");
  const [bannerFile, setBannerFile] = useState(null);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    onClose();
  };
  useEffect(() => {
    if (editingCourse) {
      setCourseId(editingCourse.course_id || "");
      setCourseName(editingCourse.course_name || "");
      setCourseDescription(editingCourse.course_description || "");
      setFeeType(editingCourse.fee_type || "");
      setCourseFee(editingCourse.course_fee || "");
      setDiscountedAmount(editingCourse.discounted_amount || "");
      setActiveMonths(editingCourse.active_months?.split(",") || []);
      setAcceptingAdmission(editingCourse.accepting_admission === "Yes");
      setIsSidebarOpen(true);
    } else {
      setCourseName("");
      setCourseDescription("");
      setFeeType("");
      setCourseFee("");
      setDiscountedAmount("");
      setActiveMonths([]);
      setAcceptingAdmission("");
    }
  }, [editingCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("course_id", courseId);
    formData.append("course_name", courseName);
    formData.append("course_description", courseDescription);
    formData.append("fee_type", feeType);
    formData.append("course_fee", courseFee);
    formData.append("discounted_amount", discountedAmount);
    formData.append("active_months", activeMonths.join(","));
    formData.append("accepting_admission", acceptingAdmission ? "Yes" : "No");

    if (bannerFile) formData.append("course_banner", bannerFile);

    try {
      const url = editingCourse ? "http://lms.ennovat.com/lms-admin/courses/edit_course.php" : "http://lms.ennovat.com/lms-admin/courses/create_course.php";
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      if (data.message == "Course updated successfully") {
        alert("Course edited successfully!");
        onCourseEdited();
        closeSidebar();
      } else {
        alert("Course added successfully!");
        onCourseAdded();
        closeSidebar();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  // Function to handle file change for the course banner
const handleFileChange = (file) => {
  setBannerFile(file);
};
  return (
    <div className="relative z-50">
      {/* Floating "Add" Button */}
      <div className="fixed bottom-6 right-6">
      <button
          onClick={() => setIsSidebarOpen(true)}
          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[150px] overflow-hidden"
        >
          {/* Circular Plus Icon */}
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          {/* Add Course Text (hidden until hover) */}
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add Course
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
        <h2 className="text-lg font-semibold mb-2">
          {editingCourse ? "Edit Course" : "Add Course"}
        </h2>
        <p className="mb-10 text-muted-foreground">
          {editingCourse ? "Edit course with all information." : "Add a new course with all information."}
        </p>

          {/* Course Name */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Course Name
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Course Name"
            />
          </div>

          {/* Course Banner */}
          <div className="relative w-full my-4">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Course Banner
            </label>
            <ImageUploader onFileChange={handleFileChange} />
          </div>

          {/* Description */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600 z-10">
              Description
            </label>
            <CourseDescription onChange={(value) => setCourseDescription(value)} />
          </div>

          {/* Fee Type */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Fee Type
            </label>
            <select
              value={feeType}
              onChange={(e) => setFeeType(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            >
              <option value="" disabled>Select Course Fee Type</option>
              <option value="installment">Installment</option>
              <option value="monthly">Monthly</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Select Months */}
          <div className="relative w-full my-6">
            <label className="absolute z-5 -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Select Months
            </label>
            <Select
              options={monthOptions}
              isMulti
              onChange={(selectedOptions) => setActiveMonths(selectedOptions.map(option => option.value))}
              placeholder="Applicable Months"
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              isSearchable
              isClearable
            />
          </div>

          {/* Course Fee */}
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

          {/* Discounted Fee */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Discounted Fee
            </label>
            <input
              type="text"
              value={discountedAmount}
              onChange={(e) => setDiscountedAmount(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter fee after discount if applicable"
            />
          </div>

          {/* Accepting Admission Checkbox */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="accepting-admission"
              checked={acceptingAdmission}
              onChange={() => setAcceptingAdmission(!acceptingAdmission)}
              className="text-primary border-primary focus:ring-primary focus:border-primary"
            />
            <label htmlFor="accepting-admission" className="text-sm text-gray-700 select-none">
              Currently accepting Admission?
            </label>
          </div>

          {/* Submit Button */}
          <Button className="mt-4 w-full" onClick={handleSubmit}>Submit</Button>
        </div>
      </nav>
    </div>
  );
};

export default AddCourse;
