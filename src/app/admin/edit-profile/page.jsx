"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ChangeProfile() {
  const [formData, setFormData] = useState({
    admin_name: "",
    admin_number: "",
    admin_password: "",
  });

  const [errors, setErrors] = useState({
    admin_name_error: "",
    admin_number_error: "",
    admin_password_error: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost/lms-admin/profile.php', {
            method: 'GET',
            credentials: 'include', 
        });

        const data = await response.json();
        console.log(data);
        if (data.error) {
            console.error('Failed to fetch profile data:', data.error);
        } else {
            setFormData({
              admin_name: data.admin_name,
              admin_number: data.admin_number,
              admin_password: data.admin_password, // Assuming admin_password is available in the response
            });
        }
      } catch (err) {
          console.error('An error occurred during profile data fetch:', err);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (formData.admin_name.trim() === "") {
      setErrors({
        ...errors,
        admin_name_error: "Name is required.",
      });
      return;
    } else {
      setErrors({ ...errors, admin_name_error: "" });
    }

    if (formData.admin_number.trim() === "") {
      setErrors({
        ...errors,
        admin_number_error: "Admin number is required.",
      });
      return;
    } else {
      setErrors({ ...errors, admin_number_error: "" });
    }

    if (formData.admin_password.trim() === "") {
      setErrors({
        ...errors,
        admin_password_error: "Password is required.",
      });
      return;
    } else {
      setErrors({ ...errors, admin_password_error: "" });
    }

    try {
      const response = await fetch('http://localhost/lms-admin/edit-profile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          adminName: formData.admin_name,
          adminNumber: formData.admin_number,
          adminPassword: formData.admin_password,
        }),
      });
      const data = await response.json();
      if (data.error) {
        alert(`Error changing profile: ${data.error}`);
      } else {
        alert('Profile updated successfully');
        setFormData({
          admin_password: "",
        });
      }
    } catch (error) {
      console.error('Error changing profile:', error);
      alert('Failed to change profile. Please try again later.');
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 lg:w-[50%]">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Change Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                {/* Admin Name */}
                <div className="relative mb-4">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                    Admin Name
                  </label>
                  <input
                    type="text"
                    className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Enter admin name"
                    name="admin_name"
                    value={formData.admin_name}
                    onChange={handleChange}
                    required
                  />
                  {errors.admin_name_error && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.admin_name_error}
                    </p>
                  )}
                </div>

                {/* Admin Number */}
                <div className="relative mb-4">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                    Admin Number
                  </label>
                  <input
                    type="text"
                    className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Enter admin number"
                    name="admin_number"
                    value={formData.admin_number}
                    onChange={handleChange}
                    required
                  />
                  {errors.admin_number_error && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.admin_number_error}
                    </p>
                  )}
                </div>

                {/* Admin Password */}
                <div className="relative mb-4">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                    Your Password
                  </label>
                  <input
                    type="password"
                    className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your password to verify"
                    name="admin_password"
                    value={formData.admin_password}
                    onChange={handleChange}
                    required
                  />
                  {errors.admin_password_error && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.admin_password_error}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="default">
                  Save Changes
                </Button>

                {/* Link to Change Password */}
                <div className="mt-4">
                  Do you want to change you password?
                  <a href="./admin/change-password/" className="text-primary">
                    &nbsp;Change Password
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}