import React, { useState, useRef } from "react";

const FileUploader = ({ onChange }) => {
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the hidden file input

  // Handle file upload (selection or drag-and-drop)
  const handleFileUpload = (event) => {
    event.preventDefault();
    setError(null);

    let file;
    if (event.dataTransfer) {
      file = event.dataTransfer.files[0]; // Handling dropped file
    } else {
      file = event.target.files[0]; // Handling input selection
    }

    // Only allow file types (you can specify more types as needed)
    if (file) {
      setFileName(file.name);
      onChange(file); // Pass the selected file to parent component
    } else {
      setError("Please upload a valid file.");
    }
  };

  // Handle drag over to highlight the drop zone
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Trigger file input on click
  const handleClick = () => {
    fileInputRef.current.click(); // Simulate file input click when upload area is clicked
  };

  return (
    <div className="flex flex-col items-center">
      {/* Drop area */}
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 w-full h-36 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
        onClick={handleClick} // Open file picker when clicked
        onDrop={handleFileUpload} // Handle file drop
        onDragOver={handleDragOver}
      >
        {!fileName ? (
          <p className="text-gray-500">Click or Drag & drop a file to upload</p>
        ) : (
          <p className="text-gray-800">{fileName}</p>
        )}
      </div>

      {/* Hidden input field for choosing a file */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden" // Hide the input field
      />

      {/* Error message */}
      {error && <p className="text-primary mt-2">{error}</p>}
    </div>
  );
};

export default FileUploader;
