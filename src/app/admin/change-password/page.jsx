"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({
    new_password_error: "",
    confirm_password_error: "",
  });

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
    if (formData.new_password.length < 6) {
      setErrors({
        ...errors,
        new_password_error: "Password must be at least 6 characters long.",
      });
      return;
    } else {
      setErrors({ ...errors, new_password_error: "" });
    }

    if (formData.new_password !== formData.confirm_password) {
      setErrors({
        ...errors,
        confirm_password_error: "Passwords do not match.",
      });
      return;
    } else {
      setErrors({ ...errors, confirm_password_error: "" });
    }

    // Proceed with password change logic (e.g., API call)
    try {
      const response = await fetch("http://localhost/lms-admin/change-password.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          oldPass: formData.current_password,
          newPassword: formData.new_password,
          confirmNewPass: formData.confirm_password,
        }),
      });
      const data = await response.json();
      if (data.error) {
        alert(`Error changing password: ${data.error}`);
      } else {
        alert("Password updated successfully");
        setFormData({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again later.");
    }
  };
  
  return (
    <div className="p-6 flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 lg:w-[50%]">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Change Your Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                {/* Current Password */}
                <div className="relative mb-4">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Enter current password"
                    name="current_password"
                    value={formData.current_password}
                    onChange={handleChange}
                  />
                </div>

                {/* New Password */}
                <div className="relative mb-4">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Enter new password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                  />
                  {errors.new_password_error && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.new_password_error}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative mb-4">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Confirm new password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                  />
                  {errors.confirm_password_error && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirm_password_error}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="default">
                  Save Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}