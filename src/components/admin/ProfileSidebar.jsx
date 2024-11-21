import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Lock, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import ChangePassword from "@/app/admin/change-password/page";

export default function ProfileSidebar({ onClose, isClosing }) {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost/lms-admin/profile.php', {
            method: 'GET',
            credentials: 'include', 
        });

        const data = await response.json();
        console.log(data);
        if (data.error) {
            console.error('Failed to fetch profile data:', data.error);
        } else {
            setUser({
              name: data.admin_name,
              designation: data.admin_number,
            });
        }
      } catch (err) {
          console.error('An error occurred during profile data fetch:', err);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost/lms-admin/logout.php', {
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
            src={user?.profilePic || "/default-avatar.png"} // Safely accessing user.profilePic
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto border-2 border-gray-200"
          />
          <h3 className="mt-2 font-semibold text-lg">
            {user?.name || "User Name"}
          </h3>

          {/* Designation Badge */}
          <span className="inline-block mt-1 px-4 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
            {user?.designation || "Designation"}
          </span>
        </div>

        {/* Edit Profile Button */}
        <Button
          className="w-full mt-4 flex items-center justify-center"
          variant="secondary"
          onClick={() => {router.push('/admin/edit-profile/');}}
        >
          <Edit className="mr-2 w-4 h-4" />
          Edit Profile
        </Button>

        {/* Change Password Button */}
        <Button
          className="w-full mt-4 flex items-center justify-center"
          variant="default"
          onClick={() => {router.push('/admin/change-password/');}}
        >
          <Lock className="mr-2 w-4 h-4" />
          Change Password
        </Button>

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
