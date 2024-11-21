"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartConfig = {
  views: {
    label: "Page Views",
  },
  admin: {
    label: "Admin",
    color: "hsl(var(--primary))",
  },
  student: {
    label: "Student",
    color: "hsl(var(--secondary))",
  },
};

export function WebsiteTraffic() {
  const [activeChart, setActiveChart] = React.useState("admin");
  const [chartData, setChartData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("http://localhost/lms-admin/dash/fetch_traffic.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        // Transform the data into the format you need
        const formattedData = data.map(item => ({
          date: item.date,
          admin: item.admin || 0,
          student: item.student || 0,
        }));

        setChartData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  // UseMemo for calculating the totals
  const total = React.useMemo(
    () => ({
      admin: chartData.reduce((acc, curr) => acc + curr.admin, 0),
      student: chartData.reduce((acc, curr) => acc + curr.student, 0),
    }),
    [chartData]
  );

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while data is fetched
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 z-10 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>WebApp Traffic</CardTitle>
          <CardDescription>
            Showing total visitors for the last 30 Days
          </CardDescription>
        </div>
        <div className="flex">
          {["admin", "student"].map((key) => {
            return (
              <button
                key={key}
                data-active={activeChart === key}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(key)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[key].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
