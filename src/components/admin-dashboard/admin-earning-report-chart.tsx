"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const chartData = [
  { channel: "Website", sales: 65, fill: "#dc2626" },
  { channel: "Wholesale", sales: 20, fill: "#f87171" },
  { channel: "Direct", sales: 15, fill: "#fca5a5" },
]

const chartConfig = {
  sales: {
    label: "Sales",
  },
  Website: {
    label: "Retail Store",
    color: "#dc2626",
  },
  Wholesale: {
    label: "Wholesale Portal",
    color: "#f87171",
  },
  Direct: {
    label: "Direct Inquiries",
    color: "#fca5a5",
  },
} satisfies ChartConfig

export function AdminEarningReportChart() {
  const customerBreakdown = [
    {
      id: 1,
      channel: "Retail Store",
      borderColor: "bg-red-600",
      earning: "Rs. 1,835,600",
      growthPercentage: "+4.7%",
      isPositive: true,
    },
    {
      id: 2,
      channel: "Wholesale Portal",
      borderColor: "bg-red-400",
      earning: "Rs. 510,400",
      growthPercentage: "+2.1%",
      isPositive: true,
    },
    {
      id: 3,
      channel: "Direct Inquiries",
      borderColor: "bg-red-300",
      earning: "Rs. 438,500",
      growthPercentage: "-1.7%",
      isPositive: false,
    },
  ]

  return (
    <Card className="h-full w-full py-6 gap-6 rounded-2xl border bg-white">
      <CardHeader className="px-6">
        <CardTitle>
          <h4 className="text-lg font-semibold text-card-foreground">Earning Reports</h4>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-2 flex-1 px-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[250px] min-h-[220px] mx-auto w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="sales"
              nameKey="channel"
              innerRadius={65}
              strokeWidth={50}
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
                          y={(viewBox.cy || 0) - 10}
                          className="fill-muted-foreground text-xs"
                        >
                          Total Revenue
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 15}
                          className="fill-foreground text-lg font-semibold"
                        >
                          Rs. 2.78M
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-3 pt-2">
          {customerBreakdown.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(item.borderColor, "w-1.5 h-4 rounded-full")}
                />
                <span className="text-sm font-medium text-foreground leading-tight">
                  {item.channel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {item.earning}
                </span>
                <Badge
                  className={cn(
                    "shadow-none font-normal text-xs",
                    item.isPositive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-red-50 text-red-600 border-red-200"
                  )}
                >
                  {item.growthPercentage}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
