"use client";

import React, {useEffect, useState} from "react";
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
} from "lucide-react";
import { WebsiteTraffic } from "@/components/admin/WebsiteTraffic";
import WelcomeCard from "@/components/admin/WelcomeCard";
import CourseSummary from "@/components/admin/CourseSummery";
import IncomeChart from "@/components/admin/IncomeChart";
import ExpenseChart from "@/components/admin/ExpenseChart";
import { useRouter } from "next/navigation";
export default function Home() {
  const [dash, setDash] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchDash = async () => {
      try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/dash/fetch_dash_widget.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log("Fetched widgets:", data); // Log the fetched data
        if (data.error) {
          console.error("Failed to fetch widgets:", data.error);
        } else {
          setDash(data.widgets[0]);
        }
      } catch (error) {
        console.error("An error occurred during widget fetch:", error);
      }
    };
  
    fetchDash();
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
                  Total Enrollments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{dash.total_students}</div>
                <p className="text-xs text-muted-foreground">
                by {dash.total_students} Students
                </p>
              </CardContent>
            </div>

            {/* Right side with the Users icon */}
            <div className="h-full top-0 p-4">
              <Users className="h-12 w-12 text-green-600 bg-green-100 p-2 rounded-[0.5rem]" />
            </div>
          </div>
        </Card>

        <Card x-chunk="dashboard-01-chunk-0">
          <div className="flex flex-row justify-between items-center">
            {/* Left side with title and stats */}
            <div className="flex-1">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{dash.total_courses}</div>
              </CardContent>
            </div>

            {/* Right side with the Users icon */}
            <div className="h-full top-0 p-4">
              <School className="h-12 w-12 text-sky-600 bg-sky-100 p-2 rounded-[0.5rem]" />
            </div>
          </div>
        </Card>

        <Card x-chunk="dashboard-01-chunk-0">
          <div className="flex flex-row justify-between items-center">
            {/* Left side with title and stats */}
            <div className="flex-1">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Batches
                </CardTitle>
              </ CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{dash.total_batches}</div>
              </CardContent>
            </div>

            {/* Right side with the Users icon */}
            <div className="h-full top-0 p-4">
              <Component className="h-12 w-12 text-orange-600 bg-orange-100 p-2 rounded-[0.5rem]" />
            </div>
          </div>
        </ Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <IncomeChart />
        <ExpenseChart />
      </div>

      {/* Website Traffic Chart */}
      <WebsiteTraffic />
    </div>
  );
}
