'use client'

import { Mail, Calendar, Archive } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { FitScoreBadge } from '@/components/fit-score-badge'
import { cn, getAvatarColor } from '@/lib/utils'
import type { Lead } from '@/lib/mock-data'

interface KanbanCardProps {
  lead: Lead
  isDragging?: boolean
}

export function KanbanCard({ lead, isDragging }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: lead.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'group cursor-grab rounded-lg border border-border bg-card p-3 transition-all duration-150 hover:border-primary/30 hover:shadow-sm',
        isDragging && 'shadow-lg opacity-50'
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback
            className={cn('text-xs text-white', getAvatarColor(lead.name))}
          >
            {lead.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {lead.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">{lead.company}</p>
        </div>
        <FitScoreBadge score={lead.fitScore} size="sm" animate={false} />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">{lead.lastActivity}</p>

      <div className="mt-3 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Mail className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Calendar className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Archive className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
