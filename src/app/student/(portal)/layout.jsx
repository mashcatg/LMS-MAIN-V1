"use client";

import HeaderWithLogo from "@/components/student/HeaderWithLogo";
import React, { useState, useEffect } from "react";

const Layout = ({ children }) => {
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
      <div className={`flex-1 transition-all duration-300`}>
        <div className="grid w-full h-full ">
          <HeaderWithLogo />
        </div>
        <main className="w-full">
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
