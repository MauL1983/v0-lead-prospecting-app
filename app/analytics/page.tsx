'use client'

import { useState } from 'react'
import {
  Users,
  Mail,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  LeadsOverTimeChart,
  RepliesByTypeChart,
} from '@/components/analytics-charts'
import { FitScoreBadge } from '@/components/fit-score-badge'
import { ANALYTICS_DATA, MOCK_LEADS, PIPELINE_STAGES } from '@/lib/mock-data'
import { cn, getAvatarColor } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ReactNode
}

function KPICard({ title, value, change, icon }: KPICardProps) {
  const isPositive = change && change > 0

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            {icon}
          </div>
          {change !== undefined && (
            <div
              className={cn(
                'flex items-center gap-1 text-sm font-medium',
                isPositive ? 'text-emerald-500' : 'text-red-500'
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d')

  const getStatusBadge = (status: string) => {
    const stage = PIPELINE_STAGES.find((s) => s.id === status)
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      green: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      gray: 'bg-muted text-muted-foreground border-border',
    }
    return (
      <Badge
        variant="outline"
        className={cn('text-xs', colors[stage?.color || 'gray'])}
      >
        {stage?.label || status}
      </Badge>
    )
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Leads found"
            value={ANALYTICS_DATA.kpis.leadsFound}
            change={12}
            icon={<Users className="h-5 w-5 text-primary" />}
          />
          <KPICard
            title="Emails sent"
            value={ANALYTICS_DATA.kpis.emailsSent}
            change={8}
            icon={<Mail className="h-5 w-5 text-primary" />}
          />
          <KPICard
            title="Reply rate"
            value={`${ANALYTICS_DATA.kpis.replyRate}%`}
            change={-2}
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
          />
          <KPICard
            title="Meetings booked"
            value={ANALYTICS_DATA.kpis.meetingsBooked}
            change={15}
            icon={<Calendar className="h-5 w-5 text-primary" />}
          />
        </div>

        {/* Charts */}
        <div className="flex gap-6">
          <LeadsOverTimeChart />
          <RepliesByTypeChart />
        </div>

        {/* Top Performing Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Top performing leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_LEADS.slice(0, 5).map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            className={cn(
                              'text-xs text-white',
                              getAvatarColor(lead.name)
                            )}
                          >
                            {lead.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">
                            {lead.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lead.title}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell>
                      <FitScoreBadge
                        score={lead.fitScore}
                        size="sm"
                        animate={false}
                      />
                    </TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {lead.lastActivity}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Send email</DropdownMenuItem>
                          <DropdownMenuItem>Book meeting</DropdownMenuItem>
                          <DropdownMenuItem>View profile</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
