"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const description =
  "A forgot password page where users can submit their phone number to reset their password. If they have an account, they can be redirected to the login page.";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message
    setSuccess(false); // Reset success message
  
    // Send a request to the request password reset endpoint
    fetch("https://youthsthought.com/lms-backend/student-panel/student-auth/request_password_reset.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure content type is application/json
      },
      body: JSON.stringify({
        student_number: phone, // Send phone number for password reset
      }),
      credentials: "include",  // Ensure cookies are sent with the request (if needed)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // If OTP request is successful, redirect to OTP verification page
        setSuccess(true);
        router.push(`/auth/student/otp?phone=${phone}`);  // Redirect to OTP page, passing phone number
      } else {
        // If error occurs, display the error message
        setError(data.message || "An error occurred. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    })
    .finally(() => {
      setLoading(false); // Stop the loading spinner
    });
  };

  return (
    <div className="w-full min-h-[100vh] lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center mb-10">
              <img
                src="/ennovat-logo.png"
                alt="Ennovat Logo"
                className="w-48"
              />
            </div>
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your phone number below to receive a password reset link
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid">
            <div className="relative w-full my-3">
              {/* Label for Phone Number */}
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Phone Number
              </label>

              {/* Flex container for +88 and input field */}
              <div className="flex items-center border rounded-md h-full w-full focus-within:ring-1 focus-within:ring-primary focus-within:border-transparent">
                {/* Country code +88 */}
                <span className="pl-3 pr-0 py-2 text-md text-gray-600 rounded-l-md">
                  +88
                </span>

                {/* Input field */}
                <input
                  type="text"
                  className="text-md h-full w-full px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                  placeholder="01XXX-XXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>

            {/* Display error or success message */}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
          </form>
          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link href="/auth/student/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-primary"></div>
    </div>
  );
}
