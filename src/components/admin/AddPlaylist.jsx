import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react"; // Icon for adding playlists
import Select from "react-select";
import { Button } from "../ui/button";

const AddPlaylist = ({ onPlaylistAdded, playlist, setEditingPlaylist }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://lms.ennovat.com/lms-admin/courses/fetch_courses.php", {
        credentials: "include",
      });
      const data = await response.json();
      setCourses(data.courses || []);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (playlist) {
      setPlaylistName(playlist.playlist_name);
      if (playlist.course_ids) {
        setSelectedCourseIds(playlist.course_ids.split(",")); // Set selected courses
      } else {
        setSelectedCourseIds([]); 
      }
      toggleSidebar();
    } else {
      setPlaylistName("");
      setSelectedCourseIds([]);
      closeSidebar();
    }
  }, [playlist]);

  const handleCourseChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setSelectedCourseIds(selectedIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = playlist ? "update_playlists.php" : "create_playlists.php"; // Use different endpoints
    const body = new URLSearchParams({
      playlist_name: playlistName,
      course_id: selectedCourseIds.join(","),
      ...(playlist && { id: playlist.playlist_id }), // Add ID if editing
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
      alert(playlist ? "Playlist updated successfully!" : "Playlist added successfully!");
      closeSidebar();
      onPlaylistAdded();
      setEditingPlaylist(null);
      setPlaylistName("");
      setSelectedCourseIds([]);
    } else {
      alert("Failed to save playlist: " + result.message);
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
            Add Playlist
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
          <h2 className="text-lg font-semibold mb-2">Add New Playlist</h2>
          <p className="mb-10 text-muted-foreground">Add new playlist with all information.</p>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Playlist Name</label>
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Playlist Name"
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

          <Button onClick={handleSubmit} className="mt-4 w-full">Submit</Button>
        </div>
      </nav>
    </div>
  );
};

export default AddPlaylist;