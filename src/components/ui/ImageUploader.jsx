import React, { useState, useRef } from "react";

const ImageUploader = ({ onFileChange }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    event.preventDefault();
    setError(null);

    let file;
    if (event.dataTransfer) {
      file = event.dataTransfer.files[0];
    } else {
      file = event.target.files[0];
    }

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }

      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_SIZE) {
        setError("File size exceeds the limit of 2MB.");
        return;
      }

      // Show preview of the image
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        if (onFileChange) onFileChange(file); // Notify parent with the selected file
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const resetImage = () => {
    setImage(null);
    setError(null);
    if (onFileChange) onFileChange(null); // Notify parent that image has been reset
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 w-full h-36 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
        onClick={handleClick}
        onDrop={handleImageUpload}
        onDragOver={handleDragOver}
        role="button"
        aria-label="Upload Image"
      >
        {!image ? (
          <p className="text-gray-500">
            Click or Drag & drop an image to upload
          </p>
        ) : (
          <img
            src={image}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {error && <p className="text-primary mt-2">{error}</p>}

      {image && (
        <button onClick={resetImage} className="mt-2 text-blue-500">
          Remove Image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
