// useAuth.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = (setLoading, setIsAuthenticated) => {
  const router = useRouter();

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://lms.ennovat.com/lms-admin/check_auth.php", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        
      });
      const data = await response.json();
      
      if (!data.logged_in) {
        router.replace("/auth/admin/login/");
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { checkAuth };
};

export default useAuth;
