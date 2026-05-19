'use client'

import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Calendar,
  BookmarkPlus,
  ExternalLink,
  Copy,
  Sparkles,
  Check,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { FitScoreBadge } from '@/components/fit-score-badge'
import { cn, getAvatarColor } from '@/lib/utils'
import type { Lead } from '@/lib/mock-data'

interface LeadCardProps {
  lead: Lead
  onCompose?: (lead: Lead) => void
  onBook?: (lead: Lead) => void
  onSave?: (lead: Lead) => void
}

export function LeadCard({ lead, onCompose, onBook, onSave }: LeadCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(lead.email)
    setCopiedEmail(true)
    toast.success('Email copied to clipboard')
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleSave = () => {
    onSave?.(lead)
    toast.success(`${lead.name} added to pipeline`)
  }

  return (
    <div
      className={cn(
        'group rounded-xl border border-border bg-card transition-all duration-150',
        isExpanded ? 'shadow-md' : 'hover:border-primary/20 hover:shadow-sm'
      )}
    >
      <div
        className="flex cursor-pointer items-center gap-4 p-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className={cn('text-sm text-white', getAvatarColor(lead.name))}>
            {lead.initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold text-foreground">
              {lead.name}
            </span>
            <span className="truncate text-sm text-muted-foreground">
              {lead.title}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              {lead.company}
              <ExternalLink className="h-3 w-3" />
            </span>
            <Badge variant="secondary" className="text-xs">
              {lead.industry}
            </Badge>
            <span className="text-muted-foreground">{lead.companySize}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {lead.locationFlag} {lead.location}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FitScoreBadge score={lead.fitScore} size="md" />

          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onCompose?.(lead)
              }}
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onBook?.(lead)
              }}
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                handleSave()
              }}
            >
              <BookmarkPlus className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-border px-4 pb-4 pt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium text-foreground">
                About {lead.name.split(' ')[0]}
              </h4>
              <p className="text-sm text-muted-foreground">{lead.bio}</p>

              <h4 className="mb-2 mt-4 text-sm font-medium text-foreground">
                Company Details
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Founded:</span>{' '}
                  <span className="text-foreground">
                    {lead.companyDetails.founded}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">HQ:</span>{' '}
                  <span className="text-foreground">
                    {lead.companyDetails.hq}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Website:</span>{' '}
                  <a
                    href={`https://${lead.companyDetails.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {lead.companyDetails.website}
                  </a>
                </div>
                <div>
                  <span className="text-muted-foreground">Recent Signal:</span>{' '}
                  <span className="text-amber-500">{lead.recentSignal}</span>
                </div>
              </div>

              <h4 className="mb-2 mt-4 text-sm font-medium text-foreground">
                Contact Info
              </h4>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{lead.email}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleCopyEmail}
                  >
                    {copiedEmail ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <a
                  href={`https://${lead.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LinkedIn
                </a>
                {lead.phone ? (
                  <span className="text-muted-foreground">{lead.phone}</span>
                ) : (
                  <span className="text-muted-foreground">
                    Phone: Verify to reveal
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-lg bg-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-medium text-foreground">
                    Why this lead is a strong fit
                  </h4>
                </div>
                <ul className="space-y-2">
                  {lead.fitReasons.map((reason, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {reason}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-muted-foreground">
                  {lead.aiInsight}
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <Button className="flex-1" onClick={() => onCompose?.(lead)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate email
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onBook?.(lead)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book meeting
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
