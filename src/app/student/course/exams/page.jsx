"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ExamResults() {
  // State to hold the exam data fetched from the API
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/student-panel/exams/fetch_exams.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.success) {
          setExams(data.exams); // Set the fetched exams
        } else {
          setError("Failed to fetch exams.");
        }
      } catch (error) {
        setError("An error occurred while fetching exams.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return <div>Loading exams...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Function to calculate the total marks
  const calculateTotalMarks = (exam) => {
    const mcqMarks = parseInt(exam.mcq_marks) || 0;
    const cqMarks = parseInt(exam.cq_marks) || 0;
    const practicalMarks = parseInt(exam.practical_marks) || 0;
    const bonusMarks = parseInt(exam.bonus_marks) || 0;

    return mcqMarks + cqMarks + practicalMarks + bonusMarks;
  };

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {exams.map((exam) => (
        <Card key={exam.exam_id} className="border rounded-lg shadow-lg">
          {/* Exam Header */}
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="text-lg font-semibold">
              <div className="flex justify-between items-center">
                <span>{exam.exam_name}</span>
                <div className="flex flex-col">
                <span className="text-sm">{exam.exam_date}</span>
                <span className="text-sm ">Total Marks: {exam.total_exam_marks}</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>

          {/* Card Content */}
          <CardContent>
            {/* 3x2 Grid for Marks */}
            <div className="grid grid-cols-3 gap-4 mb-4 pt-6">
              {/* MCQ Marks */}
              <div className="flex flex-col items-center justify-center border-b-2 pb-2">
                <span className="text-4xl font-bold">{exam.mcq_marks}</span>
                <span className="text-sm text-muted-foreground">MCQ Marks</span>
              </div>

              {/* CQ Marks */}
              <div className="flex flex-col items-center justify-center border-b-2 pb-2">
                <span className="text-4xl font-bold">{exam.cq_marks}</span>
                <span className="text-sm text-muted-foreground">CQ Marks</span>
              </div>

              {/* Practical Marks */}
              <div className="flex flex-col items-center justify-center border-b-2 pb-2">
                <span className="text-4xl font-bold">{exam.practical_marks}</span>
                <span className="text-sm text-muted-foreground">Practical Marks</span>
              </div>
            </div>

            {/* Bottom 2 Numbers (Bonus Marks and Total Marks) */}
            <div className="grid grid-cols-2 gap-4">
              {/* Bonus Marks */}
              <div className="flex flex-col items-center justify-center border-r-2">
                <span className="text-4xl font-bold">{exam.bonus_marks}</span>
                <span className="text-sm text-muted-foreground">Bonus Marks</span>
              </div>

              {/* Total Marks */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{calculateTotalMarks(exam)}</span>
                <span className="text-sm text-muted-foreground">Obtained Marks</span>
              </div>
            </div>

            {/* View Leaderboard Button */}
            <div className="flex justify-center mt-4">
              <Button variant="secondary" className="w-full">
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}

export default function Page() {
  return (
    <main>
      <Tabs defaultValue="exam-results">
        <TabsList className="mb-2">
          <TabsTrigger value="exam-results">Exam Results</TabsTrigger>
          <TabsTrigger value="combined-results" disabled>
            Combined Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exam-results">
          <ExamResults />
        </TabsContent>
      </Tabs>
    </main>
  );
}
