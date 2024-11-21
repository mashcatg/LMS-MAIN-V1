import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react"; // Icon for adding expense
import { Button } from "../ui/button"; // Assuming you have a Button component

const AddExpense = ({ sectors, onExpenseAdded, existingExpense, isEditing, setIsEditing, setExistingExpense }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    sector_id: "",
    details: "",
  });

  const toggleSidebar = () => {
    setIsEditing(false); // Reset to "Add" mode
    setExistingExpense(null); // Clear any existing expense being edited
    setFormData({ amount: "", sector_id: "", details: "" }); // Clear form data
    setIsSidebarOpen(!isSidebarOpen); // Open or close the sidebar
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    resetForm(); // Reset form data when sidebar closes
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      sector_id: "",
      details: "",
    });
  };

  // Update form based on existingExpense if editing
  useEffect(() => {
    if (existingExpense) {
      setFormData({
        amount: existingExpense.expensed_amount || "",
        sector_id: existingExpense.sector_id || "",
        details: existingExpense.expense_details || "",
      });
      setIsSidebarOpen(true); // Open sidebar in edit mode
    } else {
      resetForm();
    }
  }, [existingExpense]);

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.amount || !formData.sector_id) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const endpoint = isEditing ? "edit_expense.php" : "create_expense.php";
      const response = await fetch(
        `http://localhost/lms-admin/finance/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            expense_id: existingExpense?.expense_id,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        onExpenseAdded(); // Notify parent component to refresh the list
        closeSidebar(); // Close sidebar after successful submission
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative z-50">
      {/* Floating "Add" Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleSidebar}
          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[160px] overflow-hidden"
        >
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add Expense
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
            {isEditing ? "Edit Expense" : "Add Expense"}
          </h2>
          <p className="mb-10 text-muted-foreground">
            {isEditing ? "Modify your expense details." : "Add a new expense."}
          </p>

          {/* Expense Amount Input */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Expense Amount
            </label>
            <input
              type="number"
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Expense Amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>

          {/* Expense Details Input */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Expense Details (Optional)
            </label>
            <textarea
              className="border text-md rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter details about the expense"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          {/* Expense Sector Dropdown */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Expense Sector
            </label>
            <select
              name="sector_id"
              value={formData.sector_id}
              onChange={handleInputChange}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            >
              <option value="" disabled>
                Select Sector
              </option>
              {sectors.map((sector) => (
                <option value={sector.sector_id} key={sector.sector_id}>
                  {sector.sector_name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <Button className="mt-4 w-full" onClick={handleSubmit}>
            {isEditing ? "Update" : "Submit"}
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default AddExpense;
