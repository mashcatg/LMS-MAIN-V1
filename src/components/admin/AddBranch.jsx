import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react"; // Icon for adding
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const AddBranch = ({ onBranchAdded, onBranchEdited, editingBranch, onClose }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [branchDetails, setBranchDetails] = useState("");
  const [branchLocation, setBranchLocation] = useState("");

  useEffect(() => {
    if (editingBranch) {
      setBranchName(editingBranch.branch_name);
      setBranchDetails(editingBranch.branch_details);
      setBranchLocation(editingBranch.branch_location);
      setIsSidebarOpen(true);
    }
  }, [editingBranch]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("branch_name", branchName);
    formData.append("branch_details", branchDetails);
    formData.append("branch_location", branchLocation);
    
    if (editingBranch) {
      formData.append("branch_id", editingBranch.branch_id); // Include branch_id for edit
    }

    try {
      const response = await fetch(editingBranch ? "http://lms.ennovat.com/lms-admin/branches/edit_branch.php" : "http://lms.ennovat.com/lms-admin/branches/create_branch.php", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        closeSidebar();
        const newBranch = {
          branch_name: branchName,
          branch_details: branchDetails,
          branch_location: branchLocation,
          branch_id: editingBranch ? editingBranch.branch_id : result.branch_id, // Assume the response returns new branch ID
        };
        if (editingBranch) {
          onBranchEdited(); // Call onBranchEdited for updating
        } else {
          onBranchAdded(); // Call onBranchAdded for adding
        }
      } else {
        console.error("Failed to submit branch:", result.message);
      }
    } catch (error) {
      console.error("Error submitting branch", error);
    }
  };

  return (
    <div className="relative z-50">
      {/* Floating "Add" Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[150px] overflow-hidden"
        >
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add Branch
          </span>
        </button>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`overflow-y-auto fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">
            {editingBranch ? "Edit Branch" : "Add New Branch"}
          </h2>
          <p className="mb-10 text-muted-foreground">
            {editingBranch ? "Edit branch information." : "Add new branch with all information."}
          </p>
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Branch Name
            </label>
            <input
              type="text"
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Branch Name"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
          </div>
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Branch Details
            </label>
            <Textarea
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Branch Details"
              value={branchDetails}
              onChange={(e) => setBranchDetails(e.target.value)}
            />
          </div>
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Branch Location
            </label>
            <input
              type="text"
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Branch Location"
              value={branchLocation}
              onChange={(e) => setBranchLocation(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmit} className="mt-4 w-full">
            {editingBranch ? "Edit Branch" : "Submit"}
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default AddBranch;
