'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export const description =
  "An OTP verification page where users can enter the OTP sent to their phone number to reset their password.";

export default function OTPVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch phone number from query parameter
  useEffect(() => {
    const phoneFromUrl = searchParams.get('phone');
    if (phoneFromUrl) {
      setPhone(phoneFromUrl); // Set phone from the URL
    }
  }, [searchParams]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message
    setSuccess(false); // Reset success message

    // Send OTP verification request to the server
    fetch('https://youthsthought.com/lms-backend/student-panel/student-auth/verify_otp.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Ensure content type is application/json
      },
      body: JSON.stringify({
        phone: phone, // Send the phone number from the query parameter
        otp: otp, // OTP entered by the user
      }),
      credentials: 'include', // Ensure cookies are sent with the request (if needed)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // If OTP verification is successful, redirect to password reset page
          setSuccess(true);
          router.push('/student/');  // Redirect to reset password page
        } else {
          // If error occurs, display the error message
          setError(data.message || "Invalid OTP. Please try again.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError("An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Stop the loading spinner
      });
  };

  // If phone number is not available, show loading state until it's fetched
  if (!phone) {
    return <p>Loading...</p>; // Optional: Show loading state until phone number is available
  }

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
            <h1 className="text-3xl font-bold">OTP Verification</h1>
            <p className="text-balance text-muted-foreground">
              Enter the OTP sent to your phone number to proceed with the password reset.
            </p>
          </div>
          <form onSubmit={handleVerifyOtp} className="grid">
            <div className="relative w-full my-3">
              {/* Label for OTP Input */}
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                OTP
              </label>

              {/* OTP Input Field */}
              <input
                type="text"
                className="text-md h-full w-full px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </Button>

            {/* Display error or success message */}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            {success && <p className="mt-4 text-green-500 text-center">OTP Verified! Proceeding to reset password...</p>}
          </form>

          <div className="mt-4 text-center text-sm">
            Didn't receive the OTP?{" "}
            <button
              onClick={() => router.push(`forgot-password`)} // Redirect to Forgot Password page to resend OTP
              className="underline text-primary"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
      <div className="hidden lg:block h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-primary"></div>
    </div>
  );
}
