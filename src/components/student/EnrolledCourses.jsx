import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { School, BookPlus, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [coursesEnrolled, setCoursesEnrolled] = useState([]);
  
// Fetch notes function, moved outside useEffect
const fetchCourses = async () => {
  try {
    const response = await fetch("https://youthsthought.com/lms-backend/student-panel/courses/fetch_all_courses.php", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      setCourses(data.courses || []);
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    setError("Error fetching courses");
  }
};
  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch("https://youthsthought.com/lms-backend/student-panel/courses/fetch_enrolled_courses.php", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log("Enrolled Courses Response:", data);
  
      if (data.error) {
        setError(data.error);
      } else {
        setCoursesEnrolled(data.coursesEnrolled || []);
        console.log("Updated coursesEnrolled state:", data.coursesEnrolled);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Error fetching courses");
    }
  };
  useEffect(() => {
    fetchEnrolledCourses();
  }, [])
  const handleOpenPortal = async (course_id) => {
    try {
      const response = await fetch("https://youthsthought.com/lms-backend/student-panel/courses/set_course.php", {
        method: "POST",
        credentials: "include", // to send cookies
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          course_id: course_id,
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        // Redirect to the course portal page
        Router.push (`/student/course/${course_id}`);
      } else {
        // Handle error
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error opening portal:", error);
    }
  };
  return (
    <div className="w-full py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Your Courses</h2>
          <p className="text-gray-600">
            Explore your courses and use course materials
          </p>
        </div>
        <Button variant="ghost">
          View All Courses <ChevronRight className="ml-2" />
        </Button>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesEnrolled.map((course, index) => (
        <Card key={index}>
          <div className="relative">
            {/* Course Banner */}
            <img
              src={course.course_banner || "/placeholder-banner.jpg"} // Fallback image for missing banners
              alt={`${course.course_name} banner`}
              className="w-full h-40 object-cover rounded-t-lg"
            />
          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold">
              {course.course_name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {/* Open Portal Button */}
            <Link href={`/student/course/`}>
              <Button variant="secondary" size="sm" className="w-full">
                Open Portal
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}

      </div>
    </div>
  );
}
