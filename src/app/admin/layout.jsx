"use client";

import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import React, { useState, useEffect } from "react";
import useAuth from "./useAuth"; // Adjust the path as necessary
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { checkAuth } = useAuth(setLoading, setIsAuthenticated);

  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth();
    };

    checkUserAuth(); // Check authentication on initial render

    // Check on path change
  }, [router.asPath]);

  // This effect handles checking auth on component mount
  useEffect(() => {
    const handleRouteChange = async () => {
      await checkAuth();
    };
  }, [router.asPath]); // Check on path change

  if (loading) {
    return (
      <html lang="en">
        <body>
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering of protected content
  }

  return (
    <div className="flex items-start justify-between w-full h-full">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 transition-all duration-300`}>
        <div className={`grid w-full h-full ${!isCollapsed ? "md:ml-[240px]" : "ml-[80px]"}`}>
          <Header />
        </div>
        <main className={`w-[calc(100%-80px)] h-full p-4 ml-[80px] ${!isCollapsed ? "md:ml-[240px] md:w-[calc(100%-240px)]" : "ml-[80px]"}`}>
          <div className="mt-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
