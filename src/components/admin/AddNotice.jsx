import React, { useState } from "react";
import { Plus } from "lucide-react"; 
import { Button } from "../ui/button";

const AddNotice = ({ onNoticeAdded }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("Public"); // Default notice type

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/lms-admin/notices/create_notice.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams({
          notice: notice,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        closeSidebar();
        setNotice("");
        onNoticeAdded(); // Trigger the callback to refresh notices
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the notice.");
    }
  };
  

  return (
    <div className="relative z-50">
      {/* Floating "Add" Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleSidebar}
          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[150px] overflow-hidden"
        >
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add Notice
          </span>
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-0"
          onClick={closeSidebar}
        ></div>
      )}

      <nav
        className={`overflow-y-auto fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Add Notice</h2>
          <p className="mb-10 text-muted-foreground">
            Add notice to whoever you want.
          </p>
          <form onSubmit={handleSubmit} className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Message
            </label>
            <textarea
              value={notice}
              onChange={(e) => setNotice(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Notice Message"
            />
            
            <Button type="submit" className="mt-4 w-full">Submit</Button>
          </form>
          <div className="flex items-center justify-center mt-4">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-4 text-gray-500 text-sm">Or</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          <Button className="mt-4 w-full" variant="secondary">
            Filter Audience
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default AddNotice;
