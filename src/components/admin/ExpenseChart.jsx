import React, {useState, useEffect} from "react";
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

export default function ExpenseChart() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost/lms-admin/dash/fetch_expense_dash.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log("Fetched expenses:", data); // Log the fetched data
        if (data.error) {
          console.error("Failed to fetch expenses:", data.error);
        } else {
          setExpenses(data.expenses); // Assuming the same structure as income
        }
      } catch (error) {
        console.error("An error occurred during expenses fetch:", error);
      }
    };

    fetchExpenses();
  }, []);
// Transform payments data into the format required for the chart
const chartData = expenses.map(expense => ({
  date: expense.date,
  expense: expense.expense,
}));
  const totalExpense = React.useMemo(
    () => expenses.reduce((acc, curr) => acc + curr.expense, 0),
    [expenses]
  );

  const lastMonthExpense = expenses.length > 0 ? expenses[expenses.length - 1].expense : 0; // Expense for the most recent month
  const previousMonthExpense = expenses.length > 1 ? expenses[expenses.length - 2].expense : 0; // Expense for the previous month

  // Calculate percentage change
  const percentageChange =
    previousMonthExpense !== 0
      ? ((lastMonthExpense - previousMonthExpense) / previousMonthExpense) * 100
      : 0;

  const chartConfig = {
    expense: {
      label: "Expense",
      color: "hsl(var(--secondary))",
    },
  };


  return (
    <Card className="w-full flex flex-row justify-between">
      <div className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Total Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalExpense.toLocaleString()} BDT
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
                    nameKey="expense"
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
                dataKey="expense"
                fill={`var(--color-expense)`}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
