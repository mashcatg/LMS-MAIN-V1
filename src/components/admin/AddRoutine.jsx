import React, { useEffect, useState } from "react";
import FileUploader from "../ui/FileUploader"; // Assuming FileUploader is your custom component
import Select from "react-select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const AddRoutine = ({ onBatchAdded, editingRoutine, setEditingRoutine }) => {
  const [routineName, setRoutineName] = useState("");
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [selectedBatchIds, setSelectedBatchIds] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setEditingRoutine(null); // Reset editing state
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://localhost/lms-admin/courses/fetch_courses.php", {
        credentials: "include",
      });
      const data = await response.json();
      setCourses(data.courses || []);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchBatches = async () => {
      if (selectedCourseIds.length) {
        const courseIds = selectedCourseIds.join(",");
        const response = await fetch(`http://localhost/lms-admin/batches/fetch_course_batch.php?course_ids=${courseIds}`, {
          credentials: "include",
        });
        const data = await response.json();
        setBatches(data.batches || []);
      } else {
        setBatches([]);
        setSelectedBatchIds([]);
      }
    };

    fetchBatches();
  }, [selectedCourseIds]); // Fetch batches whenever selectedCourseIds changes

  useEffect(() => {
    if (editingRoutine) {
      setRoutineName(editingRoutine.routine_name);
      setSelectedCourseIds(editingRoutine.course_ids ? editingRoutine.course_ids.split(",") : []);
      setSelectedBatchIds(editingRoutine.batch_ids ? editingRoutine.batch_ids.split(",") : []);
      setFile(null); // Reset file input for editing
      toggleSidebar();
    } else {
      setRoutineName("");
      setSelectedCourseIds([]);
      setSelectedBatchIds([]);
      setFile(null); // Reset file input when not editing
      closeSidebar();
    }
  }, [editingRoutine]);

  const handleCourseChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setSelectedCourseIds(selectedIds);
  };

  const handleBatchChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setSelectedBatchIds(selectedIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!routineName) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("routine_name", routineName);
    formData.append("course_id", selectedCourseIds.join(",")); // Multiple courses
    formData.append("batch_id", selectedBatchIds.join(",")); // Multiple batches
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(editingRoutine ? `http://localhost/lms-admin/routines/update_routine.php?routine_id=${editingRoutine.routine_id}` : "http://localhost/lms-admin/routines/create_routine.php", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        alert(editingRoutine ? "Routine updated successfully!" : "Routine added successfully!");
        onBatchAdded(); // Refresh the routine list
        setRoutineName("");
        setFile(null);
        setSelectedCourseIds([]);
        setSelectedBatchIds([]);
        closeSidebar(); // Close sidebar after submission
      } else {
        alert("Failed to save routine: " + result.message);
      }
    } catch (error) {
      console.error("Error saving routine:", error);
      alert("Error saving routine");
    }
  };

  return (
    <div className="relative z-50">
      {/* Floating "Add" Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleSidebar}
          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[170px] overflow-hidden"
        >
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add Routine
          </span>
        </button>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-0" onClick={closeSidebar}></div>
      )}

      <nav
        className={`overflow-y-auto fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Add New Routine</h2>
          <p className="mb-10 text-muted-foreground">Add and share a new routine.</p>

          {/* Routine Name Input */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Routine Name
            </label>
            <input
              type="text"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Routine Name"
              required
            />
          </div>

          {/* File Uploader */}
          <FileUploader onChange={setFile} />

          {/* Multi Course Selector */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Courses
            </label>
            <Select
              isMulti
              options={courses.map((course) => ({
                value: course.course_id,
                label: course.course_name,
              }))}
              onChange={handleCourseChange}
              placeholder="Select Courses"
              value={selectedCourseIds.map((id) => ({
                value: id,
                label: courses.find((course) => course.course_id === id)?.course_name,
              }))}
            />
          </div>

          {/* Multi Batch Selector */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Batches
            </label>
            <Select
              isMulti
              options={batches.map((batch) => ({
                value: batch.batch_id,
                label: batch.batch_name,
              }))}
              onChange={handleBatchChange}
              placeholder="Select Batches"
              value={selectedBatchIds.map((id) => ({
                value: id,
                label: batches.find((batch) => batch.batch_id === id)?.batch_name,
              }))}
            />
          </div>

          {/* Submit Button */}
          <Button className="mt-4 w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default AddRoutine;
