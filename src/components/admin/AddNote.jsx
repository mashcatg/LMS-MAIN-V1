import React, { useEffect, useState } from "react";
import FileUploader from "../ui/FileUploader";
import Select from "react-select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CreatableSelect from "react-select/creatable";

const AddNote = ({ onNoteAdded, note, setEditingNote }) => {
    const [noteName, setNoteName] = useState("");
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
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
        setNoteName("");
                setFile(null); // Clear the file uploader after submission
                setSelectedTags([]);
                setSelectedCourseIds([]);
                setSelectedBatchIds([]);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch("http://localhost/lms-admin/courses/fetch_courses.php", {
                credentials: "include",
            });
            const data = await response.json();
            setCourses(data.courses || []);
        };

        const fetchTags = async () => {
            const response = await fetch("http://localhost/lms-admin/notes/select_box_fetch_notes.php", {
                credentials: "include",
            });
            const data = await response.json();
            const tagsArray = Object.values(data.tags || {});
            setTags(tagsArray.map(tag => ({ value: tag, label: tag })));
        };

        fetchCourses();
        fetchTags();
    }, []);

    useEffect(() => {
        if (note) {
            setNoteName(note.note_name);
            setSelectedTags(note.note_tags ? note.note_tags.split(",") : []);
            setSelectedCourseIds(note.course_ids ? note.course_ids.split(",") : []);
            setSelectedBatchIds(note.batch_ids ? note.batch_ids.split(",") : []);
            toggleSidebar();
        } else {
            setNoteName("");
            setSelectedTags([]);
            setSelectedCourseIds([]);
            setSelectedBatchIds([]);
            closeSidebar();
        }
    }, [note]);

    const handleCourseChange = (selectedOptions) => {
        const selectedIds = selectedOptions.map(option => option.value);
        setSelectedCourseIds(selectedIds);
        if (selectedIds.length) {
            const courseIds = selectedIds.join(',');
            fetch(`http://localhost/lms-admin/batches/fetch_course_batch.php?course_ids=${courseIds}`, {
                credentials: "include",
            })
                .then(response => response.json())
                .then(data => {
                    setBatches(data.batches || []);
                });
        } else {
            setBatches([]);
            setSelectedBatchIds([]);
        }
    };

    const handleBatchChange = (selectedOptions) => {
        setSelectedBatchIds(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedCourseIdsStr = selectedCourseIds.join(",");
        const selectedBatchIdsStr = selectedBatchIds.join(",");
        const selectedTagsStr = selectedTags.join(",");
        const formData = new FormData();
        formData.append("note_name", noteName);
        formData.append("note_tags", selectedTagsStr);
        formData.append("course_id", selectedCourseIdsStr || '');
        formData.append("batch_id", selectedBatchIdsStr || '');

        // Only append the file if it is selected
        if (file) {
            formData.append("file_address", file);
        }

        try {
            const url = note ? `http://localhost/lms-admin/notes/update_note.php?note_id=${note.note_id}` : "http://localhost/lms-admin/notes/create_note.php";
            if (note) {
                formData.append("note_id", note.note_id);
            }

            const response = await fetch(url, {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            const result = await response.json();
            if (result.success) {
                alert(note ? "Note updated successfully!" : "Note added successfully!");
                onNoteAdded();
                closeSidebar();
                
            } else {
                alert("Failed to add/update note.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error while processing request.");
        }
    };

    return (
        <div className="relative z-50">
            {/* Floating "Add" Button */}
            <div className="fixed bottom-6 right-6">
                <button onClick={toggleSidebar} className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[150px] overflow-hidden">
                    <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
                        <Plus className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"> Add Note </span>
                </button>
            </div>
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-0" onClick={closeSidebar}></div>
            )}
            <nav className={`overflow-y-auto fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">{note ? "Add" : "Edit"} New Note</h2>
                    <p className="mb-10 text-muted-foreground">{note ? "Add a new" : "Edit Existing"} note with all required information.</p>
                    <div className="relative w-full my-6">
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600"> Note Name </label>
                        <input type="text" value={noteName} onChange={(e) => setNoteName(e.target.value)} className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent" placeholder="Enter Note Name" required />
                    </div>
                    <FileUploader onChange={(selectedFile) => {
                        setFile(selectedFile);
                    }} />
                    <div className="relative w-full my-6">
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600"> Note Tags </label>
                        <CreatableSelect isMulti options={tags} onChange={handleTagChange} onCreateOption={(inputValue) => {
                            const newTag = { value: inputValue, label: inputValue };
                            setTags((prevTags) => [...prevTags, newTag]);
                            setSelectedTags((prevSelectedTags) => [...prevSelectedTags, inputValue]);
                        }} placeholder="Select or create tags" value={selectedTags.map((tag) => ({ value: tag, label: tag }))} />
                    </div>
                    <div className="relative w-full my-6">
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600"> Courses </label>
                        <Select isMulti options={courses.map(course => ({ value: course.course_id, label: course.course_name }))} onChange={handleCourseChange} placeholder="Select Courses" value={selectedCourseIds.map(id => ({ value: id, label: courses.find(course => course.course_id === id)?.course_name }))} />
                    </div>
                    <div className="relative w-full my-6">
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600"> Batches </label>
                        <Select isMulti options={batches.map(batch => ({ value: batch.batch_id, label: batch.batch_name }))} onChange={handleBatchChange} placeholder="Select Batches" value={selectedBatchIds.map(id => ({ value: id, label: batches.find(batch => batch.batch_id === id)?.batch_name }))} />
                    </div>
                    <Button onClick={handleSubmit} className="mt-4 w-full">Add Note</Button>
                </div>
            </nav>
        </div>
    );
};

export default AddNote;
