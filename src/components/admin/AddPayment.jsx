import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react"; // Icon for closing the sidebar
import ImageUploader from "../ui/ImageUploader";
import TextEditor from "../ui/texteditor";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";

const AddPayment = ({ onPaymentAdd, payment, isEditing, setIsEditing, isSidebarOpen, setIsSidebarOpen }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isEditing) {
      setFormData(payment);
      setIsSidebarOpen(true); // Ensure sidebar opens when editing
    }
  }, [isEditing, payment, setIsSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = isEditing 
      ? `http://localhost/lms-admin/finance/edit_payment.php` 
      : `http://localhost/lms-admin/finance/create_payment.php`;
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (data.success) {
        closeSidebar(); // Close the sidebar on success
        onPaymentAdd(); // Refresh the list after creation or update
        setIsEditing(false); // Reset editing state
        setFormData({}); // Blank out the form data after submission
      } else {
        console.error(`Error ${isEditing ? "updating" : "creating"} payment:`, data.message);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "creating"} payment:`, error);
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
          {/* Circular Plus Icon */}
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>

          {/* Add Course Text (hidden until hover) */}
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Make Payment
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
          <h2 className="text-lg font-semibold mb-2">{isEditing ? "Edit Payment" : "Make new Payment"}</h2>
          <p className="mb-10 text-muted-foreground">
            {isEditing ? "Edit the payment details and submit the form." : "Make student payment and print invoice."}
          </p>
          {!isEditing && (
            <div class="relative w-full  my-6">
              <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Student Index
              </label>
              <input
                type="text"
                class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                placeholder="Enter Student Index"
                value={formData.student_index || ""}
                onChange={(e) => setFormData({ ...formData, student_index: e.target.value })}
              />
            </div>
          )}
          <div class="relative w-full  my-6">
            <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Paid Amount
            </label>
            <input
              type="text"
              class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Paid Amount"
              value={formData.paid_amount || ""}
              onChange={(e) => setFormData({ ...formData, paid_amount: e.target.value })}
            />
          </div>
          <div class="relative w-full  my-6">
            <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Discounted Amount
            </label>
            <input
              type="text"
              class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Discounted Amount"
              value={formData.discounted_amount || ""}
              onChange={(e) => setFormData({ ...formData, discounted_amount: e.target.value })}
            />
          </div>
          <Button className="mt-4 w-full" onClick={handleFormSubmit}>
            {isEditing ? "Update" : "Submit"}
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default AddPayment;
