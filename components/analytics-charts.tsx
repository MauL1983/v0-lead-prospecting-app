"use client";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ANALYTICS_DATA, MOCK_LEADS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { FitScoreBadge } from "@/components/fit-score-badge";
import { getInitialsColor, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mail, Calendar } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  replied: "Replied",
  meeting_booked: "Meeting Booked",
  closed: "Closed",
};

const STATUS_COLORS: Record<string, string> = {
  new: "indigo",
  contacted: "warning",
  replied: "indigo",
  meeting_booked: "success",
  closed: "muted",
};

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: <span className="font-semibold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-semibold mb-4">Leads contacted over time</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ANALYTICS_DATA.leadsOverTime}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="leads"
                name="Leads"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#6366f1" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-semibold mb-4">Replies by email type</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ANALYTICS_DATA.repliesByType} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="type"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="replies" name="Replies" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <p className="text-sm font-semibold">Top performing leads</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Company</th>
              <th className="text-left px-4 py-3 font-medium">Score</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Last Activity</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_LEADS.slice(0, 7).map((lead) => (
              <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-[10px] font-semibold",
                        getInitialsColor(lead.name)
                      )}
                    >
                      {lead.initials}
                    </div>
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground/80">{lead.company}</td>
                <td className="px-4 py-3">
                  <FitScoreBadge score={lead.fitScore} size="sm" />
                </td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_COLORS[lead.status] as "muted" | "success" | "warning" | "indigo"}>
                    {STATUS_LABELS[lead.status]}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{lead.lastActivity}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Mail className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Calendar className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
