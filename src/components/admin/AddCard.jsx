import React, { useState, useEffect } from "react";

import { Plus, X } from "lucide-react";

import { Button } from "../ui/button";



const AddCard = ({ card, onCardAdded, onCardEdited, onClose }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [cardTitle, setCardTitle] = useState("");

  const [courseId, setCourseId] = useState("");

  const [availability, setAvailability] = useState(false);

  const [courses, setCourses] = useState([]);

  const [error, setError] = useState("");



  useEffect(() => {

    if (card) {

      setIsSidebarOpen(true);

      setCardTitle(card.card_title);

      setCourseId(card.course_id);

      setAvailability(card.availability === 'yes');

    }

  }, [card]);



  const toggleSidebar = () => {

    setIsSidebarOpen(!isSidebarOpen);

    if (!isSidebarOpen) {

      setCardTitle("");

      setCourseId("");

      setAvailability(false);

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

          "http://localhost/lms-admin/courses/fetch_courses.php",

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

    const url = card

      ? "http://localhost/lms-admin/cards/update_card.php"

      : "http://localhost/lms-admin/cards/create_card.php";



    try {

      const response = await fetch(url, {

        method: "POST",

        headers: {

          "Content-Type": "application/x-www-form-urlencoded",

        },

        body: new URLSearchParams({

          card_id: card?.card_id,

          card_title: cardTitle,

          course_id: courseId,

          availability: availability ? '1' : '0',

        }),

        credentials: "include",

      });



      const data = await response.json();



      if (!response.ok) {

        throw new Error(data.message || "Something went wrong");

      }



      if (data.success) {

        alert(card ? "Card Updated Successfully!" : "Card Added Successfully!");

        if (card) {

          onCardEdited({

            ...card,

            card_title: cardTitle,

            course_id: courseId,

            availability: availability ? 'yes' : 'no'

          });

        } else {

          onCardAdded();

        }

        closeSidebar();

        setCardTitle("");

        setCourseId("");

        setAvailability(false);

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

      <div className="fixed bottom-6 right-6">

        <button onClick={toggleSidebar} className="group relative flex h-10 w-10 items-center bg-primary text-white rounded-[0.5rem] p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-[150px] overflow-hidden">

          <div className="absolute left-0 flex justify-center items-center w-10 h-10 bg-primary rounded-[0.5rem]">

            <Plus className="transition-transform duration-300 group-hover:scale-110" />

          </div>

          <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"> Add Card </span>

        </button>

      </div>



      {isSidebarOpen && (

        <div className="fixed inset-0 bg-black bg-opacity-30" onClick={closeSidebar}></div>

      )}



      <nav className={`overflow-y-auto fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>

        <div className="p-4">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-lg font-semibold">{card ? "Edit Card" : "Add New Card"}</h2>

            <button onClick={closeSidebar} className="text-gray-500 hover:text-gray-700">

              <X size={24} />

            </button>

          </div>

          <p className="mb-10 text-muted-foreground">{card ? "Edit existing card details." : "Add new card for events in clicks."}</p>

          {error && <p className="text-red-500">{error}</p>}

          

          <form onSubmit={handleSubmit}>

            <div className="relative w-full my-6">

              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Card Name/Title</label>

              <input

                type="text"

                className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"

                placeholder="Enter Card Name/Title"

                value={cardTitle}

                onChange={(e) => setCardTitle(e.target.value)}

                required

              />

            </div>



            <div className="relative w-full my-6">

              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Course Name</label>

              <select

                className="border text-md h-full rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"

                value={courseId}

                onChange={(e) => setCourseId(e.target.value)}

                required

              >

                <option value="" disabled>Select Course</option>

                {courses.map(course => (

                  <option key={course.course_id} value={course.course_id}>

                    {course.course_name}

                  </option>

                ))}

              </select>

            </div>



            <div className="flex items-center space-x-3">

              <input

                type="checkbox"

                id="availability"

                checked={availability}

                onChange={(e) => setAvailability(e.target.checked)}

                className="form-checkbox h-5 w-5 text-primary border-gray-300 rounded"

              />

              <label htmlFor="availability" className="text-sm text-gray-700 select-none">Available in student panel?</label>

            </div>



            <Button className="mt-4 w-full" type="submit">

              {card ? "Update Card" : "Add Card"}

            </Button>

          </form>

        </div>

      </nav>

    </div>

  );

};



export default AddCard;


