import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = (setLoading, setIsAuthenticated) => {
  const router = useRouter();

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://www.youthsthought.com/lms-backend/student-panel/student-auth/check_auth.php", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }
  
      const data = await response.json();
      
      if (!data.success) {
        router.replace("/auth/student/login"); // Redirect to login page
      } else {
        setIsAuthenticated(true); // Set authentication to true if successful
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    checkAuth(); // Check authentication on initial load
  }, []); // Empty array means it runs once when the component mounts

  return { checkAuth };
};

export default useAuth;
