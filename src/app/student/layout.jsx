"use client";

import Header from "@/components/student/Header";
import Sidebar from "@/components/student/Sidebar";
import React, { useState, useEffect } from "react";
import useAuth from "./useAuth"; // Import your custom hook for authentication check
import { useRouter } from "next/navigation"; // For handling route changes

const Layout = ({ children }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true); // Sidebar collapsed state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  
  // Destructure checkAuth from the useAuth hook
  const { checkAuth } = useAuth(setIsLoading, setIsAuthenticated);

  // Check authentication on initial load and when path changes
  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth(); // Check if the user is authenticated
    };

    checkUserAuth(); // Check on initial render

    // Handle path change to check auth again
  }, [router.asPath]);

  // Show loading state until auth check is complete
  if (isLoading) {
    return (
      <div>Loading...</div> // You can replace this with a loading spinner or animation
    );
  }

  // If not authenticated, redirect to login page or show some restricted content
  if (!isAuthenticated) {
    router.push("/login"); // Or show an error message instead
    return null; // Prevent rendering protected content if not authenticated
  }

  return (
    <div >
      {children}
    </div>
  );
};

export default Layout;
