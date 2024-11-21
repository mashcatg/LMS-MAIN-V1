"use client";

import React, {useState, useEffect} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  DollarSign,
  Users,
  School,
  Shapes,
  Calendar,
  School2,
  Component,
  TvMinimalPlay,
  FilePenLine,
  SquareCheck,
} from "lucide-react";
import WelcomeCard from "@/components/student/WelcomeCard";
import CourseSummary from "@/components/student/CTACard";
import { StudentProgressChart } from "@/components/student/StudentProgressChat";
import DashboardChatBox from "@/components/student/DashboardChatBox";

export default function Home() {
  const [dashWidget, setDashWidget] = useState([]);
  const [error, setError] = useState([]);
  
 // Fetch notes function, moved outside useEffect
const fetchDashWidget = async () => {
  try {
    const response = await fetch("https://youthsthought.com/lms-backend/student-panel/dashWidgets/dash_widgets.php", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      setDashWidget(data.totals || []);
    }
  } catch (error) {
    console.error("Error fetching totals:", error);
    setError("Error fetching totals");
  }
};
  // Fetch courses on component mount
  useEffect(() => {
    fetchDashWidget();
  }, []); 
  return (
    <div className="p-6 space-y-6 z-1">
      {/* Welcome Card */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <WelcomeCard />
        <CourseSummary />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card x-chunk="dashboard-01-chunk-0">
          <div className="flex flex-row justify-between items-center">
            {/* Left side with title and stats */}
            <div className="flex-1">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{dashWidget.classes}</div>
              </CardContent>
            </div>

            {/* Right side with the Users icon */}
            <div className="h-full top-0 p-4">
              <TvMinimalPlay className="h-12 w-12 text-green-600 bg-green-100 p-2 rounded-[0.5rem]" />
            </div>
          </div>
        </Card>

        <Card x-chunk="dashboard-01-chunk-0">
          <div className="flex flex-row justify-between items-center">
            {/* Left side with title and stats */}
            <div className="flex-1">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{dashWidget.exams}</div>
              </CardContent>
            </div>

            {/* Right side with the Users icon */}
            <div className="h-full top-0 p-4">
              <FilePenLine className="h-12 w-12 text-sky-600 bg-sky-100 p-2 rounded-[0.5rem]" />
            </div>
          </div>
        </Card>

        <Card x-chunk="dashboard-01-chunk-0">
          <div className="flex flex-row justify-between items-center">
            {/* Left side with title and stats */}
            <div className="flex-1">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{dashWidget.quizzes}</div>
              </CardContent>
            </div>

            {/* Right side with the Users icon */}
            <div className="h-full top-0 p-4">
              <SquareCheck className="h-12 w-12 text-orange-600 bg-orange-100 p-2 rounded-[0.5rem]" />
            </div>
          </div>
        </Card>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="w-full lg:w-1/2">
          <StudentProgressChart />
        </div>
        <div className="w-full lg:w-1/2">
          <DashboardChatBox />
        </div>
      </div>
    </div>
  );
}
