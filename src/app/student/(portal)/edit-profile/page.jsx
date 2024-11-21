"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, User } from "lucide-react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    student_name: "",
    student_image: "",
    student_number: "",
    father_name: "",
    father_number: "",
    mother_name: "",
    mother_number: "",
    student_institution: "",
    student_address: "",
    student_date_of_birth: "",
    bio: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the student profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://www.youthsthought.com/lms-backend/student-panel/student-auth/profile.php"); // Adjust the URL accordingly
        const data = await response.json();

        if (data.success) {
          setFormData(data.student);
          setPreviewImage(data.student.student_image); // Set the initial image preview
        } else {
          setError(data.error || "Error fetching profile data.");
        }
      } catch (error) {
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, student_image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = {
      student_name: formData.student_name,
      student_image: previewImage,  // Base64 image string
      student_institution: formData.student_institution,
      father_name: formData.father_name,
      mother_name: formData.mother_name,
      student_address: formData.student_address,
      student_date_of_birth: formData.student_date_of_birth,
    };

    try {
      const response = await fetch("https://www.youthsthought.com/lms-backend/student-panel/student-auth/update_profile.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSubmit),
      });

      const data = await response.json();

      if (data.success) {
        alert("Profile updated successfully!");
      } else {
        alert(data.error || "Error updating profile.");
      }
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  {/* Profile Image Input */}
                  <div className="relative mb-6 col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image
                    </label>
                    <div className="flex items-center justify-center">
                      <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center shadow-inner mr-4">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Profile Preview"
                            className="w-full h-full rounded-full object-cover shadow-lg"
                          />
                        ) : (
                          <User className="h-12 w-12 text-gray-400" />
                        )}
                      </div>

                      <div className="flex flex-col justify-center">
                        <label htmlFor="profile-image-upload" className="cursor-pointer">
                          <input
                            id="profile-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                          <div className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out">
                            <Upload className="h-5 w-5 mr-2" />
                            Upload New Profile Image
                          </div>
                        </label>

                        <p className="mt-2 text-sm text-gray-500">
                          JPEG or PNG, max size 2MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Student Name Input */}
                  <div className="relative mb-4">
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                      Student Name
                    </label>
                    <input
                      type="text"
                      className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your name"
                      name="student_name"
                      value={formData.student_name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Student Number Input (Disabled if value exists) */}
                  <div className="relative mb-4">
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                      Student Number
                    </label>
                    <input
                      type="text"
                      className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your student number"
                      name="student_number"
                      value={formData.student_number}
                      onChange={handleChange}
                      disabled={!!formData.student_number}
                    />
                  </div>

                  {/* Father Name Input (Editable) */}
                  <div className="relative mb-4">
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      placeholder="Enter father's name"
                      name="father_name"
                      value={formData.father_name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Father Number Input (Disabled) */}
                  <div className="relative mb-4">
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                      Father's Number
                    </label>
                    <input
                      type="text"
                      className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      placeholder="Enter father's number"
                      name="father_number"
                      value={formData.father_number}
                      onChange={handleChange}
                      disabled
                    />
                  </div>

                  {/* Mother Name Input (Editable) */}
                  <div className="relative mb-4">
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                      Mother's Name
                    </label>
                    <input
                      type="text"
                      className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      placeholder="Enter mother's name"
                      name="mother_name"
                      value={formData.mother_name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Mother Number Input (Disabled) */}
                  <div className="relative mb-4">
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                      Mother's Number
                    </label>
                    <input
                      type="text"
                      className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      placeholder="Enter mother's number"
                      name="mother_number"
                      value={formData.mother_number}
                      onChange={handleChange}
                      disabled
                    />
                  </div>

                  {/* Student Institution Input */}
                  <div className="relative mb-4">
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                      Student Institution
                    </label>
                    <input
                      type="text"
                      className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      placeholder="Enter institution name"
                      name="student_institution"
                      value={formData.student_institution}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Date of Birth Input */}
                  <div className="relative mb-4">
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      name="student_date_of_birth"
                      value={formData.student_date_of_birth}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Student Address Input */}
                  <div className="relative mb-4 col-span-2">
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                      Student Address
                    </label>
                    <textarea
                      className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      placeholder="Enter student address"
                      name="student_address"
                      value={formData.student_address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button variant="default" type="submit" disabled={loading}>
                  Save Changes
                </Button>
              </form>

              {error && (
                <div className="text-red-600 mt-4">{error}</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
