'use client'

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
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ANALYTICS_DATA } from '@/lib/mock-data'

export function LeadsOverTimeChart() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Leads contacted over time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ANALYTICS_DATA.leadsOverTime}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="date"
              className="text-xs fill-muted-foreground"
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
              axisLine={{ stroke: 'currentColor' }}
            />
            <YAxis
              className="text-xs fill-muted-foreground"
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
              axisLine={{ stroke: 'currentColor' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function RepliesByTypeChart() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Replies by email type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ANALYTICS_DATA.repliesByType}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="type"
              className="text-xs fill-muted-foreground"
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
              axisLine={{ stroke: 'currentColor' }}
            />
            <YAxis
              className="text-xs fill-muted-foreground"
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
              axisLine={{ stroke: 'currentColor' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar
              dataKey="replies"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
