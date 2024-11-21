"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There"s a Forgot your password link and a link to sign up if you do not have an account. The second column has a cover image.";

export default function Dashboard() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message
  
    fetch("https://youthsthought.com/lms-backend/student-panel/student-auth/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",  // Ensure proper content type
        },
        body: JSON.stringify({
            phone: phone,
            password: password,
        }),
        credentials: "include"  
    })
    .then(response => response.json())
    .then(data => {
      // If login is successful (data.success is true)
      if (data.success) {
        // Redirect to student dashboard page
        router.push("/student/");
      } else {
        // Handle error - for example, display error message
        setError(data.message || "Invalid login credentials.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    })
    .finally(() => {
      setLoading(false);  // Stop the loading spinner
    });
  };
  return (
    <div className="w-full min-h-[100vh] lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center mb-10 ">
              <img
                src="/ennovat-logo.png"
                alt="Ennovat Logo"
                className="w-48"
              />
            </div>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your number and password below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid">
            <div className="relative w-full  my-3">
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

            <div class="relative w-full  my-3">
              <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Password
              </label>
              <input
                type="password"
                class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-right text-sm mb-4 text-primary">
              <Link href="forgot-password">Forgot Password?</Link>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* Display error message */}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/student/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-primary"></div>
    </div>
  );
}
