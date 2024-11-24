import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react"; // Icon for adding admin
import Select from "react-select";
import { Button } from "../ui/button";

const permissionOptions = [
  { value: "finance", label: "Finance" },
  { value: "notices", label: "Notices" },
  { value: "courses", label: "Courses" },
  { value: "exams", label: "Exams" },
  { value: "notices", label: "Notices" },
  { value: "class", label: "Classes" },
  { value: "live-class", label: "Live Classes" },
  { value: "live-class", label: "Live Classes" },
  { value: "quizzes", label: "Quizzes" },
  { value: "students", label: "Students" },
  { value: "notes", label: "Notes" },
  { value: "cards", label: "Cards" },
  { value: "attendance", label: "Attendance" },
  { value: "routine", label: "Routine" },
  { value: "materials", label: "Materials" },
  { value: "sms", label: "SMS" },
  { value: "admins", label: "Admins" },
  { value: "customize-website", label: "Website" },
  { value: "settings", label: "Settings" },
  { value: "logs", label: "Logs" },
  { value: "financial-numbers", label: "Financial Numbers" },
];

const AddAdmin = ({ refreshData, editAdmin, setEditAdmin, isSidebarOpen, closeSidebar }) => {
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [adminName, setAdminName] = useState("");
    const [adminNumber, setAdminNumber] = useState("");
  
    useEffect(() => {
      if (editAdmin) {
        setAdminName(editAdmin.admin_name);
        setAdminNumber(editAdmin.admin_number);
      } else {
        setAdminName("");
        setAdminNumber("");
      }
    }, [editAdmin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminData = { name: adminName, number: adminNumber, permissions: selectedPermissions };

        try {
            const url = editAdmin ? `http://lms.ennovat.com/lms-admin/admins/edit_admin.php` : `http://lms.ennovat.com/lms-admin/admins/add_admin.php`;
            const method = editAdmin ? "PUT" : "POST";
            const body = editAdmin ? { ...adminData, admin_id: editAdmin.admin_id } : adminData;

            const response = await fetch(url, {
                method,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            if (data.success) {
                refreshData(); // Refresh admin list
                setEditAdmin(null); // Clear edit mode
                closeSidebar(); // Close the sidebar after submission
            }
        } catch (error) {
            console.error("Error submitting admin data:", error);
        }
    };

    return (
        <div className="relative z-50">
            {/* Floating "Add" Button */}
            
            {/* Overlay to close sidebar when clicking outside */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-0" onClick={closeSidebar}></div>
            )}

            {/* Sidebar */}
            <nav className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">{editAdmin ? "Update " : "Add New "}Admin</h2>
                    <form onSubmit={handleSubmit}>
                        <p className="mb-10 text-muted-foreground">
                            Add new admin with page permissions.
                        </p>
                        <div className="relative w-full my-6">
                            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                                Admin Name
                            </label>
                            <input
                                type="text"
                                className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                                placeholder="Enter Admin Name"
                                value={adminName}
                                onChange={(e) => setAdminName(e.target.value)}
                            />
                        </div>
                        <div className="relative w-full my-6">
                            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                                Admin Number
                            </label>
                            <div className="flex items-center border rounded-md h-full w-full focus-within:ring-1 focus-within:ring-primary focus-within:border-transparent">
                                <span className="pl-3 pr-0 py-2 text-md text-gray-600 rounded-l-md">
                                    +88
                                </span>
                                <input
                                    type="text"
                                    className="text-md h-full w-full px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                                    placeholder="01XXX-XXXXXX"
                                    value={adminNumber}
                                    onChange={(e) => setAdminNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="relative w-full my-6">
                            <label className="absolute z-5 -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                                Manage Permissions (Select nothing for giving all permissions)
                            </label>
                            <Select
                                options={permissionOptions}
                                isMulti
                                value={selectedPermissions}
                                onChange={(selectedOptions) =>
                                    setSelectedPermissions(selectedOptions || [])
                                }
                                placeholder="Select Permissions"
                                className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                                isSearchable
                                isClearable
                            />
                        </div>
                        <Button className="mt-4 w-full" type="submit">Submit</Button>
                    </form>
                </div>
            </nav>
        </div>
    );
};

export default AddAdmin;
