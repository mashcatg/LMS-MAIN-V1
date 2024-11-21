"use client";

import React, { useEffect, useState } from "react";
import { LayoutGrid, LayoutList } from "lucide-react"; // Import Lucide icons
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]); // Store all unique tags
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    // Fetch notes from backend
    const fetchNotes = async () => {
      try {
        const response = await fetch("https://youthsthought.com/lms-backend/student-panel/notes/fetch_notes.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setNotes(data.notes);
          setFilteredNotes(data.notes);

          // Extract unique tags from all notes
          const tags = data.notes.flatMap(note => note.note_tags.split(","));
          setAllTags([...new Set(tags)]); // Remove duplicates
        } else {
          console.error("Error fetching notes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  // Filter notes based on search term and selected tags
  useEffect(() => {
    const filtered = notes.filter((note) => {
      const matchesSearch = note.note_name.toLowerCase().includes(searchTerm.toLowerCase());
      const noteTags = note.note_tags.split(",");
      const matchesTags = selectedTags.every(tag => noteTags.includes(tag));
      return matchesSearch && matchesTags;
    });
    setFilteredNotes(filtered);
  }, [searchTerm, selectedTags, notes]);

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Search Bar, Tag Selection, and View Toggle */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30d1a0] focus:border-[#30d1a0]" // Added green focus border
          />

          {/* View Mode Toggle with Icons */}
          <div className="ml-4 flex space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full ${viewMode === "grid" ? "bg-[#30d1a0] text-white" : "bg-gray-200 text-gray-600"}`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full ${viewMode === "list" ? "bg-[#30d1a0] text-white" : "bg-gray-200 text-gray-600"}`}
              title="List View"
            >
              <LayoutList size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic Tag Filter Options */}
        <div className="flex flex-wrap gap-2 mb-4">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm ${selectedTags.includes(tag) ? "bg-[#30d1a0] text-white" : "bg-gray-200 text-gray-600"}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Notes Display */}
        <div className={`${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}>
          {filteredNotes.map((note) => (
            <div
              key={note.note_id}
              className="bg-white border border-gray-200 rounded-lg pt-0 pb-5 shadow-md hover:shadow-lg transition"
            >
              {/* Title and Card Header like previous design */}
              <div className="bg-primary text-white rounded-t-lg p-4 mb-3">
                <h4 className="text-lg font-semibold">{note.note_name}</h4>
              </div>

              <div className="px-5">
              <div className="flex flex-wrap gap-2 mb-2">
                {note.note_tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-[#e0f7f1] text-[#30d1a0] text-xs font-semibold rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

              <Button
                href={note.file_address}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="bg-white text-primary hover:bg-primary hover:text-white transition"
              >
                Download Note
              </Button>
            </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredNotes.length === 0 && (
          <p className="text-gray-600 text-center mt-4">No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
