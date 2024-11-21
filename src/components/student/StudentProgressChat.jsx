"use client";

import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with dots";

// Define chart configuration
const chartConfig = {
  position: {
    label: "Position",
    color: "hsl(var(--Primary))",
  },
};

export function StudentProgressChart() {
  const [chartData, setChartData] = useState([]);

  // Fetch percentage data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://youthsthought.com/lms-backend/student-panel/dashWidgets/fetch_all_percentage.php"
        );
        const data = await response.json();

        if (data && data.success) {
          // Assuming the response contains an array of exam data with exam_name and percentage
          const formattedData = data.exam_details.map((exam) => ({
            exam_name: exam.exam_name,
            percentage: exam.percentage, // assuming percentage is in the response
          }));

          setChartData(formattedData);
        } else {
          console.error("Error fetching data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Report</CardTitle>
        <CardDescription>Based on recent exams</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="exam_name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // If you want to abbreviate the exam name
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="percentage"
              type="natural"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--primary))",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
