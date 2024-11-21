import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";

const AddBatch = ({ onBatchAdded, onBatchEdited, editingBatch, onClose }) => {
  const [batchName, setBatchName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAcceptingAdmission, setIsAcceptingAdmission] = useState(false);
  
  // Define state for courses and branches
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost/lms-admin/courses/fetch_courses.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.error("Error fetching courses:", data.error);
        } else {
          setCourses(data.courses || []); // Use setCourses here
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await fetch(
          "http://localhost/lms-admin/branches/fetch_branches.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.error("Error fetching branches:", data.error);
        } else {
          setBranches(data.branches || []); // Use setBranches here
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchCourses();
    fetchBranches();
  }, []);

  useEffect(() => {
    if (editingBatch) {
      setBatchName(editingBatch.batch_name);
      setSelectedCourse(editingBatch.course_id);
      setSelectedBranch(editingBatch.branch_id);
      setIsAcceptingAdmission(editingBatch.accepting_admission);
      setIsSidebarOpen(true); // Ensure the sidebar is open when editing a batch
    } else {
      setBatchName("");
      setSelectedCourse("");
      setSelectedBranch("");
      setIsAcceptingAdmission(false);
      setIsSidebarOpen(false); // Ensure the sidebar is closed when not editing a batch
    }
  }, [editingBatch]);

  const handleSubmit = async () => {
    if (!batchName || !selectedCourse || !selectedBranch) {
      console.error("All fields are required");
      return;
    }

    const payload = {
      batch_name: batchName,
      course_id: selectedCourse,
      branch_id: selectedBranch,
      accepting_admission: isAcceptingAdmission,
      batch_id: editingBatch?.batch_id, // Make sure batch_id is included for editing
    };

    try {
      const response = await fetch(
        "http://localhost/lms-admin/batches/edit_batch.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        if (editingBatch) {
          onBatchEdited(payload); // Call onBatchEdited for editing
        } else {
          onBatchAdded(payload); // Call onBatchAdded for adding a new batch
        }
        onClose();
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleBatchNameChange = (e) => {
    setBatchName(e.target.value);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleAcceptingAdmissionChange = (e) => {
    setIsAcceptingAdmission(e.target.checked);
  };


  return (
    <div className="relative z-50">
      {/* Floating "Add" Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleSidebar}
          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[150px] overflow-hidden"
        >
          {/* Circular Plus Icon */}
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>

          {/* Add Course Text (hidden until hover) */}
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add Batch
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
          <h2 className="text-lg font-semibold mb-2">{editingBatch ? "Edit Batch" : "Add New Batch"}</h2>
          <p className="mb-10 text-muted-foreground">
            {editingBatch ? "Edit the batch details" : "Add new batch with all informations."}
          </p>
          <div class="relative w-full  my-6">
            <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Batch Name
            </label>
            <input
              type="text"
              class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Batch Name"
              value={batchName}
              onChange={handleBatchNameChange}
            />
          </div>
          <div className="relative w-full  my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Course Name
            </label>
            <select className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent" value={selectedCourse} onChange={handleCourseChange}>
              <option value="" disabled selected>
                Select Course
              </option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full  my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Branch Name
            </label>
            <select className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent" value={selectedBranch} onChange={handleBranchChange}>
              <option value="" disabled selected>
                Select Branch
              </option>
              {branches.map((branch) => (
                <option key={branch.branch_id} value={branch.branch_id}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="accepting-admission"
              className="text-primary border-primary focus:ring-primary focus:border-primary"
              checked={isAcceptingAdmission}
              onChange={handleAcceptingAdmissionChange}
            />
            <label
              htmlFor="accepting-admission"
              className="text-sm text-gray-700 select-none"
            >
              Currently accepting Admission?
            </label>
          </div>
          <Button className="mt-4 w-full" onClick={handleSubmit}>{editingBatch ? "Save Changes" : "Submit"}</Button>
        </div>
      </nav>
    </div>
  );
};

export default AddBatch;
