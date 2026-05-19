'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Calendar, CalendarDays } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MeetingBooker, MeetingCard } from '@/components/meeting-booker'
import { MOCK_LEADS, MOCK_MEETINGS } from '@/lib/mock-data'

function MeetingsContent() {
  const searchParams = useSearchParams()
  const leadId = searchParams.get('lead')
  const initialLead = leadId
    ? MOCK_LEADS.find((l) => l.id === leadId)
    : undefined

  return (
    <div className="h-screen overflow-hidden p-6">
      <Tabs defaultValue="book" className="flex h-full flex-col">
        <div className="mb-6 flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="book" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Book a meeting
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Upcoming meetings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="book" className="mt-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl">
            <MeetingBooker initialLead={initialLead} />
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-0 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {MOCK_MEETINGS.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <CalendarDays className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  No upcoming meetings
                </h3>
                <p className="text-sm text-muted-foreground">
                  Book a meeting with a lead to get started.
                </p>
              </div>
            ) : (
              MOCK_MEETINGS.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function MeetingsPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <MeetingsContent />
    </Suspense>
  )
}
