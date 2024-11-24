"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react"; // Icon for adding classes
import Select from "react-select"; // Assuming you are using react-select for multi-select
import { Button } from "../ui/button"; // Button component

const AddClass = ({ onClassAdded, editingClass, setEditingClass, playlistId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classLink, setClassLink] = useState("");
  const [noteId, setNoteId] = useState("");
  const [notes, setNotes] = useState([]); // Assuming you will fetch notes
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://lms.ennovat.com/lms-admin/notes/fetch_notes.php", {
        credentials: "include",
      });
      const data = await response.json();
      setNotes(data.notes || []);
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (editingClass) {
      setClassName(editingClass.class_name);
      setClassDescription(editingClass.class_description);
      setClassLink(editingClass.class_link);
      setNoteId(editingClass.note_id);
      toggleSidebar();
    } else {
      setClassName("");
      setClassDescription("");
      setClassLink("");
      setNoteId("");
      closeSidebar();
    }
  }, [editingClass]);

  const handleNoteChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setSelectedNoteIds(selectedIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = editingClass ? `update_class.php?playlist_id=${playlistId}&class_id=${editingClass.class_id}` : `create_class.php?playlist_id=${playlistId}`; 
    const body = new URLSearchParams({
      class_name: className,
      class_description: classDescription,
      class_link: classLink,
      note_id: selectedNoteIds.join(","), 
    });

    const response = await fetch(`http://lms.ennovat.com/lms-admin/classes/${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const result = await response.json();
    if (result.success) {
      alert(editingClass ? "Class updated successfully!" : "Class added successfully!");
      closeSidebar();
      onClassAdded(); 
      setEditingClass(null); 
      // Reset form
      setClassName("");
      setClassDescription("");
      setClassLink("");
      setNoteId("");
      setSelectedNoteIds([]);
    } else {
      alert("Failed to save class: " + result.message);
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
            Add Class
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
          <h2 className="text-lg font-semibold mb-2">Add New Class</h2>
          <p className="mb-10 text-muted-foreground">Add new class with all information.</p>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Class Name</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Class Name"
              required
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Description</label>
            <textarea
              value={classDescription}
              onChange={(e) => setClassDescription(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Class Description"
              required
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Class Link</label>
            <input
              type="text"
              value={classLink}
              onChange={(e) => setClassLink(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Class Link"
              required
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Select Note</label>
            <Select
              isMulti
              options={notes.map(note => ({ value: note.note_id, label: note.note_name }))}
              onChange={handleNoteChange}
              placeholder="Select Notes"
              value={selectedNoteIds.map(id => ({
                value: id,
                label: notes.find(note => note.note_id === id)?.note_name,
              }))}
            />
          </div>

          <Button onClick={handleSubmit} className="mt-4 w-full">Submit</Button>
        </div>
      </nav>
    </div>
  );
};

export default AddClass;