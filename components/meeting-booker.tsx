'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  Send,
  Link as LinkIcon,
  Video,
  RefreshCw,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MOCK_LEADS, MEETING_TYPES } from '@/lib/mock-data'
import { cn, getAvatarColor } from '@/lib/utils'
import type { Lead } from '@/lib/mock-data'

interface MeetingBookerProps {
  initialLead?: Lead
}

const AVAILABLE_SLOTS = [
  { day: 'Mon', slots: ['10:00', '14:00'] },
  { day: 'Tue', slots: ['09:00', '11:00', '15:00'] },
  { day: 'Wed', slots: ['10:00', '13:00'] },
  { day: 'Thu', slots: ['09:00', '14:00', '16:00'] },
  { day: 'Fri', slots: ['10:00', '11:00'] },
]

const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

export function MeetingBooker({ initialLead }: MeetingBookerProps) {
  const [selectedLead, setSelectedLead] = useState(initialLead || MOCK_LEADS[0])
  const [meetingType, setMeetingType] = useState(MEETING_TYPES[0])
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string
    time: string
  } | null>(null)
  const [title, setTitle] = useState(
    `Discovery call — ${selectedLead.name} / LeadEngine`
  )
  const [notes, setNotes] = useState('')

  const isSlotAvailable = (day: string, time: string) => {
    const dayData = AVAILABLE_SLOTS.find((d) => d.day === day)
    return dayData?.slots.includes(time) || false
  }

  const handleSelectSlot = (day: string, time: string) => {
    if (isSlotAvailable(day, time)) {
      setSelectedSlot({ day, time })
    }
  }

  const handleSendInvite = () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot')
      return
    }
    toast.success('Meeting invite sent via Gmail')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://meet.leadengine.io/abc123')
    toast.success('Meeting link copied to clipboard')
  }

  const formatSelectedTime = () => {
    if (!selectedSlot) return ''
    const days: Record<string, string> = {
      Mon: 'Monday, May 19',
      Tue: 'Tuesday, May 20',
      Wed: 'Wednesday, May 21',
      Thu: 'Thursday, May 22',
      Fri: 'Friday, May 23',
    }
    const endTime = parseInt(selectedSlot.time.split(':')[0]) + Math.ceil(meetingType.duration / 60)
    const endMinutes = meetingType.duration % 60
    return `${days[selectedSlot.day]} · ${selectedSlot.time} – ${endTime}:${endMinutes.toString().padStart(2, '0')} (${meetingType.duration} min)`
  }

  return (
    <div className="space-y-6">
      {/* Lead selector */}
      <div className="space-y-2">
        <Label>Book with</Label>
        <Select
          value={selectedLead.id}
          onValueChange={(id) => {
            const lead = MOCK_LEADS.find((l) => l.id === id)
            if (lead) {
              setSelectedLead(lead)
              setTitle(`${meetingType.name} — ${lead.name} / LeadEngine`)
            }
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MOCK_LEADS.map((lead) => (
              <SelectItem key={lead.id} value={lead.id}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback
                      className={cn(
                        'text-xs text-white',
                        getAvatarColor(lead.name)
                      )}
                    >
                      {lead.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    {lead.name} · {lead.company}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Meeting type */}
      <div className="space-y-2">
        <Label>Meeting type</Label>
        <div className="flex flex-wrap gap-2">
          {MEETING_TYPES.map((type) => (
            <Button
              key={type.id}
              variant={meetingType.id === type.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setMeetingType(type)
                setTitle(`${type.name} — ${selectedLead.name} / LeadEngine`)
              }}
            >
              {type.name} ({type.duration} min)
            </Button>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="space-y-2">
        <Label>Available slots</Label>
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-6 border-b border-border bg-muted/50">
            <div className="p-2 text-xs font-medium text-muted-foreground"></div>
            {AVAILABLE_SLOTS.map((day) => (
              <div
                key={day.day}
                className="p-2 text-center text-xs font-medium text-foreground"
              >
                {day.day}
              </div>
            ))}
          </div>
          <div className="max-h-64 overflow-y-auto">
            {TIME_SLOTS.map((time) => (
              <div
                key={time}
                className="grid grid-cols-6 border-b border-border last:border-0"
              >
                <div className="p-2 text-xs text-muted-foreground">{time}</div>
                {AVAILABLE_SLOTS.map((day) => {
                  const isAvailable = isSlotAvailable(day.day, time)
                  const isSelected =
                    selectedSlot?.day === day.day && selectedSlot?.time === time
                  return (
                    <button
                      key={`${day.day}-${time}`}
                      className={cn(
                        'p-2 text-center text-xs transition-all',
                        isAvailable
                          ? isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'cursor-pointer bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400'
                          : 'cursor-not-allowed bg-muted/30 text-muted-foreground/50'
                      )}
                      onClick={() => handleSelectSlot(day.day, time)}
                      disabled={!isAvailable}
                    >
                      {isAvailable ? (isSelected ? 'Selected' : 'Open') : '—'}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected time display */}
      {selectedSlot && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <p className="text-sm font-medium text-foreground">
            {formatSelectedTime()}
          </p>
        </div>
      )}

      {/* Meeting title */}
      <div className="space-y-2">
        <Label htmlFor="title">Meeting title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Add notes (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Anything specific you want to discuss..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[80px] resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1" onClick={handleSendInvite}>
          <Send className="mr-2 h-4 w-4" />
          Send invite via Gmail
        </Button>
        <Button variant="outline" onClick={handleCopyLink}>
          <LinkIcon className="mr-2 h-4 w-4" />
          Copy meeting link
        </Button>
      </div>
    </div>
  )
}

interface MeetingCardProps {
  meeting: {
    id: string
    lead: Lead
    date: string
    time: string
    duration: number
    type: string
    status: 'confirmed' | 'pending' | 'cancelled'
    title: string
  }
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const statusColors = {
    confirmed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  const handleJoin = () => {
    toast.info('Opening video call...')
  }

  const handleReschedule = () => {
    toast.info('Opening reschedule dialog...')
  }

  const handleCancel = () => {
    toast.error('Meeting cancelled')
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback
            className={cn('text-sm text-white', getAvatarColor(meeting.lead.name))}
          >
            {meeting.lead.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold text-foreground">
              {meeting.lead.name}
            </span>
            <span className="truncate text-sm text-muted-foreground">
              · {meeting.lead.company}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDate(meeting.date)} · {meeting.time} · {meeting.duration} min
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {meeting.type}
            </span>
            <span
              className={cn(
                'rounded-md border px-2 py-0.5 text-xs capitalize',
                statusColors[meeting.status]
              )}
            >
              {meeting.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleJoin}>
            <Video className="mr-2 h-4 w-4" />
            Join
          </Button>
          <Button variant="outline" size="sm" onClick={handleReschedule}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reschedule
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
