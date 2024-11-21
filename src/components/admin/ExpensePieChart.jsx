"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Config to set color for each sector
const chartConfig = {
  Rent: {
    label: "Rent",
    color: "hsl(var(--chart-1))",
  },
  Utilities: {
    label: "Utilities",
    color: "hsl(var(--chart-2))",
  },
  Groceries: {
    label: "Groceries",
    color: "hsl(var(--chart-3))",
  },
  Transportation: {
    label: "Transportation",
    color: "hsl(var(--chart-4))",
  },
  Entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-5))",
  },
  Healthcare: {
    label: "Healthcare",
    color: "hsl(var(--chart-6))",
  },
};

// Function to dynamically fetch the CSS variable for --primary
const getPrimaryColor = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary").trim();
  return primaryColor;
};

// Parse the --primary CSS variable and adjust brightness
const parseHSL = (hslString) => {
  const [hue, saturation, lightness] = hslString.replace("deg", "").split(" ") || [];
  return { hue: parseFloat(hue), saturation, lightness };
};

// Adjust lightness for sector variation
const adjustColorBrightness = (hsl, adjustment) => {
  const { hue, saturation, lightness } = hsl;
  const lightnessValue = parseFloat(lightness.replace("%", ""));
  const newLightness = Math.max(0, Math.min(100, lightnessValue + adjustment));
  return `hsl(${hue}, ${saturation}, ${newLightness}%)`;
};

// Generate random color for each sector based on primary color
const generateSectorColor = (index, adjustment = -10) => {
  const primaryColor = getPrimaryColor();
  const parsedHSL = parseHSL(primaryColor);
  return adjustColorBrightness(parsedHSL, adjustment * index);
};

// Update to accept sectors and expenses as props
export function ExpensePieChart({ sectors, expenses }) {
  // Group and sum expenses by sector
  const sectorExpenses = React.useMemo(() => {
    return sectors.map((sector) => {
      const totalExpense = expenses
        .filter((expense) => expense.sector_name === sector.sector_name)
        .reduce((acc, curr) => acc + parseFloat(curr.expensed_amount), 0);
      return {
        sector: sector.sector_name,
        expense: totalExpense,
      };
    });
  }, [sectors, expenses]);

  const totalExpenses = React.useMemo(() => {
    return sectorExpenses.reduce((acc, curr) => acc + curr.expense, 0);
  }, [sectorExpenses]);

  const sectorsWithColors = sectorExpenses.map((data, index) => ({
    ...data,
    fill: generateSectorColor(index),
  }));

  return (
    <Card className="flex flex-col w-full md:w-[34%]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Expense</CardTitle>
        <CardDescription>by Expense Sectors</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={sectorsWithColors}
              dataKey="expense"
              nameKey="sector"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalExpenses.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
