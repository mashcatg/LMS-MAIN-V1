import React, {useEffect, useState} from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";




export default function IncomeChart() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://lms.ennovat.com/lms-admin/dash/fetch_income_dash.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log("Fetched payments:", data); // Log the fetched data
        if (data.error) {
          console.error("Failed to fetch payments:", data.error);
        } else {
          setPayments(data.payments);
        }
      } catch (error) {
        console.error("An error occurred during payments fetch:", error);
      }
    };
  
    fetchPayments();
  }, []);

  // Transform payments data into the format required for the chart
  const chartData = payments.map(payment => ({
    date: payment.date,
    income: payment.income,
  }));

  const chartConfig = {
    income: {
      label: "Income",
      color: "hsl(var(--primary))",
    },
  };

  const totalIncome = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.income, 0),
    [chartData] // Include chartData in the dependency array
  );

  const lastMonthIncome = chartData.length > 0 ? chartData[chartData.length - 1].income : 0; // Income for the most recent month
  const previousMonthIncome = chartData.length > 1 ? chartData[chartData.length - 2].income : 0; // Income for the previous month

  // Calculate percentage change if previousMonthIncome is not zero
  const percentageChange = previousMonthIncome
    ? ((lastMonthIncome - previousMonthIncome) / previousMonthIncome) * 100
    : 0;

  return (
    <Card className="w-full flex flex-row justify-between">
      <div className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalIncome.toLocaleString()} BDT
          </div>
          <p className="text-xs text-muted-foreground">
            {percentageChange > 0 ? "+" : ""}
            {percentageChange.toFixed(2)}% from last month
          </p>
        </CardContent>
      </div>
      <div className="w-[120px] h-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="70%">
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
                top: 0, // Optional: Adjust top margin if needed
                bottom: 0, // Remove bottom margin to center vertically
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                hide={true} // Hides the XAxis labels
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="income"
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
                dataKey="income"
                fill={`var(--color-income)`}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
