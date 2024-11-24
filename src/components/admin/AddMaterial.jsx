import React, { useState, useEffect } from "react";

import { Plus } from "lucide-react";

import { Button } from "../ui/button";



const AddMaterial = ({ material, onMaterialAdded, onMaterialEdited, onClose }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [materialName, setMaterialName] = useState("");

  const [courseId, setCourseId] = useState("");

  const [courses, setCourses] = useState([]);

  const [error, setError] = useState("");



  useEffect(() => {

    if (material) {

      setIsSidebarOpen(true);

      setMaterialName(material.material_name);

      setCourseId(material.course_id);

    }

  }, [material]);



  const toggleSidebar = () => {

    setIsSidebarOpen(!isSidebarOpen);

    if (!isSidebarOpen) {

      setMaterialName("");

      setCourseId("");

    }

  };



  const closeSidebar = () => {

    setIsSidebarOpen(false);
    if (onClose) onClose();
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(

          "http://lms.ennovat.com/lms-admin/courses/fetch_courses.php",

          {

            method: "GET",

            credentials: "include",

          }

        );

        const data = await response.json();

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

    fetchCourses();

  }, []);



  const handleSubmit = async (e) => {

    e.preventDefault();

    const url = material

      ? "http://lms.ennovat.com/lms-admin/materials/edit_material.php"

      : "http://lms.ennovat.com/lms-admin/materials/create_material.php";



    try {

      const response = await fetch(url, {

        method: "POST",

        headers: {

          "Content-Type": "application/x-www-form-urlencoded",

        },

        body: new URLSearchParams({

          material_id: material?.material_id,

          material_name: materialName,

          course_id: courseId,

        }),

        credentials: "include",

      });



      const data = await response.json();



      if (!response.ok) {

        throw new Error(data.message || "Something went wrong");

      }



      if (data.success) {

        alert(material ? "Material Updated Successfully!" : "Material Added Successfully!");

        if (material) {

          onMaterialEdited(data.material);

        } else {

          onMaterialAdded(data.material);

        }

        closeSidebar();

        setMaterialName("");

        setCourseId("");

      } else {

        alert(`Error: ${data.message || "Unknown error"}`);

      }

    } catch (error) {

      console.error("Error during submission:", error);

      alert(`Error: ${error.message}`);

    }

  };



  return (

    <div className="relative z-50">

      {/* Floating "Add" Button */}

      <div className="fixed bottom-6 right-6">

        <button

          onClick={toggleSidebar}

          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[170px] overflow-hidden"

        >

          {/* Circular Plus Icon */}

          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">

            <Plus className="transition-transform duration-300 group-hover:scale-110" />

          </div>



          {/* Add Course Text (hidden until hover) */}

          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">

            Add Material

          </span>

        </button>

      </div>



      {/* Overlay to close sidebar when clicking outside */}

      {isSidebarOpen && (

        <div

          className="fixed inset-0 bg-black bg-opacity-30"

          onClick={closeSidebar}

        ></div>

      )}



      {/* Sidebar */}

      <nav

        className={`overflow-y-auto fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform transform ${

          isSidebarOpen ? "translate-x-0" : "translate-x-full"

        }`}

      >

        {/* Sidebar Content */}

        <div className="p-4">

          <h2 className="text-lg font-semibold mb-4">{material ? "Edit Material" : "Add New Material"}</h2>

          <p className="mb-10 text-muted-foreground">{material ? "Edit existing material details." : "Add new material and distribute seamlessly."}</p>

          {error && <p className="text-red-500">{error}</p>}

          

          <form onSubmit={handleSubmit}>

            <div class="relative w-full  my-6">

              <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">

                Material Name

              </label>

              <input

                type="text"

                class="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"

                placeholder="Enter Material Name"

                value={materialName}

                onChange={(e) => setMaterialName(e.target.value)}

              />

            </div>

            <div className="relative w-full  my-6">

              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">

                Course Name

              </label>

              <select className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent" value={courseId} onChange={(e) => setCourseId(e.target.value)}>

                <option value="" disabled selected>

                  Select Course

                </option>

                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>{course.course_name}</option>
                ))}

              </select>

            </div>

            <Button className="mt-4 w-full" type="submit">

              {material ? "Update Material" : "Add Material"}

            </Button>

          </form>

        </div>

      </nav>

    </div>

  );

};



export default AddMaterial;


