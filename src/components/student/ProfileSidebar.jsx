import React, {useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Edit, Lock, LogOut } from "lucide-react"; // Importing icons from lucide-react
import Link from "next/link";

export default function ProfileSidebar({ onClose, isClosing }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  // Fetch the student profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://www.youthsthought.com/lms-backend/student-panel/student-auth/profile.php"); // Adjust the URL accordingly
        const data = await response.json();

        if (data.success) {
          setUser(data.student);
          setPreviewImage(data.student.student_image); // Set the initial image preview
        } else {
          setError(data.error || "Error fetching profile data.");
        }
      } catch (error) {
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleLogout = async () => {
    try {
        const response = await fetch('https://www.youthsthought.com/lms-backend/student-panel/student-auth/logout.php', {
            method: 'POST',
            credentials: 'include',
        });

        const data = await response.json();

        if (data.error) {
            console.error('Logout failed:', data.error);
        } else {
            // Redirect the user to the login page or homepage after logout
            router.push('/auth/admin/login');
        }
    } catch (err) {
        console.error('An error occurred during logout:', err);
    }
  };

 
  return (
    <aside
      className={`fixed z-50 right-0 top-0 w-64 h-full bg-white shadow-lg transform ${
        isClosing ? "animate-slide-out" : "animate-slide-in"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold">Profile</h2>

        {/* User Info Section */}
        <div className="my-4 text-center">
          <img
            src={user?.student_image || "/default-avatar.png"} // Safely accessing user.profilePic
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto border-2 border-gray-200"
          />
          <h3 className="mt-2 font-semibold text-lg">
            {user?.student_name || "User Name"}
          </h3>

          {/* Designation Badge */}
          <span className="inline-block mt-1 px-4 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
            {user?.designation || "Student"}
          </span>
        </div>

        {/* Edit Profile Button */}

        <Link href="/student/edit-profile">
          <Button
            className="w-full mt-4 flex items-center justify-center"
            variant="secondary"
          >
            <Edit className="mr-2 w-4 h-4" />
            Edit Profile
          </Button>
        </Link>

        {/* Change Password Button */}

        <Link href="/student/change-password">
          <Button
            className="w-full mt-4 flex items-center justify-center"
            variant="default"
          >
            <Lock className="mr-2 w-4 h-4" />
            Change Password
          </Button>
        </Link>
        {/* Edit Profile Button */}
        <Button onClick={handleLogout}
        className="w-full mt-4 flex items-center justify-center bg-[#ff5757] text-white hover:bg-[#ff7171]"
        variant="secondary"
        >
        <LogOut className="mr-2 w-4 h-4" />
        Logout
        </Button>
      </div>
    </aside>
  );
}
