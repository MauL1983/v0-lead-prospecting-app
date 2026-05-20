"use client";
import { useState } from "react";
import { TrendingUp, Mail, MessageSquare, Calendar } from "lucide-react";
import { AnalyticsCharts } from "@/components/analytics-charts";
import { cn } from "@/lib/utils";

const DATE_RANGES = ["Last 7 days", "Last 30 days", "Last 90 days", "Custom"];

const KPI_CARDS = [
  {
    label: "Leads found",
    value: "347",
    change: "+23%",
    positive: true,
    icon: TrendingUp,
  },
  {
    label: "Emails sent",
    value: "89",
    change: "+12%",
    positive: true,
    icon: Mail,
  },
  {
    label: "Reply rate",
    value: "18.2%",
    change: "+4.1%",
    positive: true,
    icon: MessageSquare,
  },
  {
    label: "Meetings booked",
    value: "11",
    change: "+2",
    positive: true,
    icon: Calendar,
  },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState("Last 30 days");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Track your prospecting performance over time</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {DATE_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
                range === r
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {KPI_CARDS.map((card) => (
          <div key={card.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
              <div className="h-7 w-7 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <card.icon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <p className="text-2xl font-bold tracking-tight">{card.value}</p>
            <p
              className={cn(
                "text-xs mt-1 font-medium",
                card.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
              )}
            >
              {card.change} vs last period
            </p>
          </div>
        ))}
      </div>

      <AnalyticsCharts />
    </div>
  );
}
