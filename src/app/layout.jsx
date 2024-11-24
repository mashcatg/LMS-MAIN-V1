"use client"
import React, { useEffect, useState } from "react";
import "./globals.scss";

export default function RootLayout({ children }) {
  const [colors, setColors] = useState(null);

  useEffect(() => {
    const sendCurrentURLToBackend = async () => {
      const currentURL = window.location.href; 
      try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/setServiceSession.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ url: currentURL }), // Send the URL in the request body
        });

        if (!response.ok) {
          console.error("Failed to send URL to the backend");
        }
      } catch (error) {
        console.error("Error sending URL to backend:", error);
      }
    };

    sendCurrentURLToBackend();
  }, []);

  useEffect(() => {
    const fetchCustomColors = async () => {
      try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/setCustomColor.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.success && data.colors) {
          setColors(data.colors); // Set the fetched colors
        } else {
          console.error("Failed to fetch colors.");
        }
      } catch (error) {
        console.error("An error occurred while fetching colors:", error);
      }
    };

    fetchCustomColors();
  }, []);

  useEffect(() => {
    if (colors && typeof window !== 'undefined') {
      document.documentElement.style.setProperty("--background", colors.background_color);
      document.documentElement.style.setProperty("--foreground", colors.text_color);
      document.documentElement.style.setProperty("--primary", colors.primary_color);
      document.documentElement.style.setProperty("--accent", colors.accent_color);
      document.documentElement.style.setProperty("--text", colors.text_color);
    }
  }, [colors]);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
