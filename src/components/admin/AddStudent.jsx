import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react"; // Icon for closing the sidebar
import ImageUploader from "../ui/ImageUploader";
import { Button } from "../ui/button";

const AddStudent = ({ onStudentAdded, student, setEditingStudent }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    phoneNumber: "",
    dateOfBirth: "",
    institution: "",
    fathersName: "",
    fathersPhoneNumber: "",
    mothersName: "",
    mothersPhoneNumber: "",
    homeAddress: ""
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.student_name || "",
        image: student.student_image || "",
        phoneNumber: student.student_number || "",
        dateOfBirth: student.student_date_of_birth || "",
        institution: student.student_institution || "",
        fathersName: student.father_name || "",
        fathersPhoneNumber: student.father_number || "",
        mothersName: student.mother_name || "",
        mothersPhoneNumber: student.mother_number || "",
        homeAddress: student.student_address || ""
      });
      setIsSidebarOpen(true);
    }
  }, [student]);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if(student){
    formDataToSend.append("student_id", student.student_id);
    }
    formDataToSend.append("student_name", formData.name);
    formDataToSend.append("student_number", formData.phoneNumber);
    formDataToSend.append("student_institution", formData.institution);
    formDataToSend.append("student_date_of_birth", formData.dateOfBirth);
    formDataToSend.append("father_name", formData.fathersName);
    formDataToSend.append("father_number", formData.fathersPhoneNumber);
    formDataToSend.append("mother_name", formData.mothersName);
    formDataToSend.append("mother_number", formData.mothersPhoneNumber);
    formDataToSend.append("student_address", formData.homeAddress);
    formDataToSend.append("student_image", formData.image); 

    try {
        let response;
        if (student) {
            // Update student if editing
            response = await fetch(`http://lms.ennovat.com/lms-admin/students/edit_student.php?student_id=${student.student_id}`, {
                method: "POST",
                body: formDataToSend,
                credentials: "include",
            });
        } else {
            // Add a new student if not editing
            response = await fetch("http://lms.ennovat.com/lms-admin/students/create_student.php", {
                method: "POST",
                body: formDataToSend,
                credentials: "include",
            });
        }

        const result = await response.json();
        if (result.success) {
            alert(student ? "Student updated successfully!" : "Student added successfully!");
            onStudentAdded(); // Callback to refresh the student list
            closeSidebar();   // Close the sidebar after submission
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Error submitting form", error);
    }
};

const closeSidebar = () => {
    setIsSidebarOpen(false);
    setEditingStudent(null); // Reset the student being edited
    setFormData({
        name: "",
        image: "",
        phoneNumber: "",
        dateOfBirth: "",
        institution: "",
        fathersName: "",
        fathersPhoneNumber: "",
        mothersName: "",
        mothersPhoneNumber: "",
        homeAddress: ""
    });
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className="relative z-50">
      {/* Floating "Add" Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleSidebar}
          className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[150px] overflow-hidden"
        >
          {/* Circular Plus Icon */}
          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">
            <Plus className="transition-transform duration-300 group-hover:scale-110" />
          </div>

          {/* Add Course Text (hidden until hover) */}
          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {student ? "Edit Student" : "Add Student"}
          </span>
        </button>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-0"
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
          <h2 className="text-lg font-semibold mb-2">
            {student ? "Edit Student" : "Add New Student"}
          </h2>
          <p className="mb-10 text-muted-foreground">
            {student
              ? "Edit student details below."
              : "Add new student with all information."}
          </p>

          {/* Student Name */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Student Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Student Name"
              required
            />
          </div>

          {/* Student Image */}
          <div className="relative w-full my-4">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Student Image
            </label>
            <ImageUploader
              image={formData.image}
              setImage={(image) => setFormData({ ...formData, image })}
            />
          </div>

          {/* Student Number */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Student Number
            </label>
            <div className="flex items-center border rounded-md h-full w-full focus-within:ring-1 focus-within:ring-primary focus-within:border-transparent">
              <span className="pl-3 pr-0 py-2 text-md text-gray-600 rounded-l-md">
                +88
              </span>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="text-md h-full w-full px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                placeholder="01XXX-XXXXXX"
                required
              />
            </div>
          </div>

          {/* More Form Fields (Date of Birth, Institution, etc.) */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* father&apos;s Name */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              father&apos;s Name
            </label>
            <input
              type="text"
              name="fathersName"
              value={formData.fathersName}
              onChange={handleInputChange}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter father&apos;s Name"
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              father&apos;s Phone Number
            </label>
            <input
              type="text"
              name="fathersPhoneNumber"
              value={formData.fathersPhoneNumber}
              onChange={handleInputChange}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter father&apos;s Phone Number"
            />
          </div>

          {/* mother&apos;s Name */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              mother&apos;s Name
            </label>
            <input
              type="text"
              name="mothersName"
              value={formData.mothersName}
              onChange={handleInputChange}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter mother&apos;s Name"
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              mother&apos;s Phone Number
            </label>
            <input
              type="text"
              name="mothersPhoneNumber"
              value={formData.mothersPhoneNumber}
              onChange={handleInputChange}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter mother&apos;s Phone Number"
            />
          </div>

          {/* Institution */}
          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Institution
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleInputChange}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Institution Name"
            />
          </div>

          <div className="relative w-full my-6">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
              Home Address
            </label>
            <input
              type="text"
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleInputChange}
              className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              placeholder="Enter Address"
            />
          </div>

          
          {/* Submit Button */}
          <div className="mt-6">
            <Button onClick={handleFormSubmit}>
              {student ? "Update Student" : "Add Student"}
            </Button>
          </div>

          {/* Close Sidebar Button */}
          <button
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-primary"
            onClick={closeSidebar}
          >
            <X />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AddStudent;
//Course Selection
{/* <div className="relative w-full my-6">
<label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
  Course
</label>
<select
  name="course"
  value={formData.course}
  onChange={handleInputChange}
  className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
>
  <option value="" disabled>
    Select Course
  </option>
  {courses.map((course) => (
    <option key={course.course_id} value={course.course_id}>
      {course.course_name}
    </option>
  ))}
</select>
</div>

<div className="relative w-full my-6">
<label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
  Batch
</label>
<select
  name="batch"
  value={formData.batch}
  onChange={handleInputChange}
  className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
>
  <option value="" disabled>
    Select Batch
  </option>
  {batches.map((batch) => (
    <option key={batch.batch_id} value={batch.batch_id}>
      {batch.batch_name}
    </option>
  ))}
</select>
</div>

<div className="relative w-full my-6">
<label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
  Course Fee
</label>
<input
  type="text"
  name="courseFee"
  value={formData.courseFee}
  onChange={handleInputChange}
  className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
  placeholder="Enter Course Fee"
/>
</div>

<div className="relative w-full my-6">
<label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
  Paid Amount
</label>
<input
  type="text"
  name="paidAmount"
  value={formData.paidAmount}
  onChange={handleInputChange}
  className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
  placeholder="Enter Paid Amount"
/>
</div>

<div className="relative w-full my-6">
<label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
  Discount Amount
</label>
<input
  type="text"
  name="discountedAmount"
  value={formData.discountedAmount}
  onChange={handleInputChange}
  className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
  placeholder="Enter Discount Amount"
/>
</div> */}
