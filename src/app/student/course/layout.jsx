"use client";

import Header from "@/components/student/Header";
import Sidebar from "@/components/student/Sidebar";
import React, { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Start with true for collapsed
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Simulate page loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after a delay (simulating page load time)
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clear the timer on unmount to avoid memory leaks
  }, [children]); // Trigger loading every time `children` changes (i.e., page switches)

  return (
    <div className="flex items-start justify-between w-full h-full">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 transition-all duration-300`}>
        <div
          className={`grid w-full h-full ${
            !isCollapsed ? "md:ml-[240px]" : "ml-[80px]"
          }`}
        >
          <Header />
        </div>
        <main
          className={`w-[calc(100%-80px)] h-full p-4 ml-[80px] ${
            !isCollapsed ? "md:ml-[240px] md:w-[calc(100%-240px)]" : "ml-[80px]"
          }`}
        >
          <div className="mt-12">
            {isLoading ? (
              <div className="flex justify-center items-center h-[90vh]">
                {/* Modern pulsating loader */}
                <div className="pulsating-loader"></div>
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
