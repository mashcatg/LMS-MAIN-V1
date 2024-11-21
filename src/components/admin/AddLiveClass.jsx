// AddLiveClass.js
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const AddLiveClass = ({ onLiveClassAdded, editingLiveClass, setEditingLiveClass }) => {
  const [liveClassName, setLiveClassName] = useState("");
  const [liveClassDesc, setLiveClassDesc] = useState("");
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
    setEditingLiveClass(null); // Reset editing state
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
    if (editingLiveClass) {
      setLiveClassName(editingLiveClass.live_class_name);
      setLiveClassDesc(editingLiveClass.live_class_desc);
      setSelectedCourseIds(editingLiveClass.course_ids ? editingLiveClass.course_ids.split(",") : []);
      setSelectedBatchIds(editingLiveClass.batch_ids ? editingLiveClass.batch_ids.split(",") : []);
      toggleSidebar();
    } else {
      setLiveClassName("");
      setLiveClassDesc("");
      setSelectedCourseIds([]);
      setSelectedBatchIds([]);
      closeSidebar();
    }
  }, [editingLiveClass]);

  const handleCourseChange = async (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setSelectedCourseIds(selectedIds);

    // Fetch batches for selected courses
    if (selectedIds.length) {
        const courseIds = selectedIds.join(",");
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

  const handleBatchChange = (selectedOptions) => {
    setSelectedBatchIds(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedCourseIdsStr = selectedCourseIds.join(",");
    const selectedBatchIdsStr = selectedBatchIds.join(",");

    const formData = new FormData();
    formData.append("live_class_name", liveClassName);
    formData.append("live_class_desc", liveClassDesc);
    formData.append("course_id", selectedCourseIdsStr);
    formData.append("batch_id", selectedBatchIdsStr);
  
    const response = await fetch(editingLiveClass ? `http://localhost/lms-admin/live-classes/update_live_class.php?live_class_id=${editingLiveClass.live_class_id}` : "http://localhost/lms-admin/live-classes/create_live_class.php", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
  
    if (!response.ok) {
      alert("Failed to add/update live class.");
      return;
    }
  
    const result = await response.json();
    console.log(result); // Log the response for debugging
    if (result.success) {
        alert(editingLiveClass ? "Live Class updated successfully!" : "Live Class added successfully!");
        onLiveClassAdded();
        closeSidebar();
    } else {
        alert("Failed to add/update live class. " + result.message); // Show the error message
    }
};

  return (
    <div className="relative z-50">
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleSidebar}
          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[150px] overflow-hidden"
        >
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add Live Class
          </span>
        </button>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-0" onClick={closeSidebar}></div>
      )}

      <nav className={`overflow-y-auto fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Add New Live Class</h2>
          <p className="mb-10 text-muted-foreground">Fill in the details below to add a new live class.</p>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Live Class Name</label>
            <input
              type="text"
              value={liveClassName}
              onChange={(e) => setLiveClassName(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Live Class Name"
              required
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Live Class Description</label>
            <textarea
              value={liveClassDesc}
              onChange={(e) => setLiveClassDesc(e.target.value)}
              className="border text-md rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Live Class Description"
              required
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

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Batches</label>
            <Select
              isMulti
              options={batches.map(batch => ({ value: batch.batch_id, label: batch.batch_name }))}
              onChange={handleBatchChange}
              placeholder="Select Batches"
              value={selectedBatchIds.map(id => ({
                value: id,
                label: batches.find(batch => batch.batch_id === id)?.batch_name,
              }))}
            />
          </div>

          <Button onClick={handleSubmit} className="mt-4 w-full">Add Live Class</Button>
        </div>
      </nav>
    </div>
  );
};

export default AddLiveClass;
