'use client'

import { useState } from 'react'
import {
  Sparkles,
  Undo,
  Redo,
  Copy,
  Send,
  FileText,
  Check,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn, getAvatarColor } from '@/lib/utils'
import type { Lead } from '@/lib/mock-data'

interface EmailComposerProps {
  lead: Lead
  initialSubject?: string
  initialBody?: string
}

export function EmailComposer({
  lead,
  initialSubject = '',
  initialBody = '',
}: EmailComposerProps) {
  const [subject, setSubject] = useState(initialSubject)
  const [body, setBody] = useState(initialBody)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const wordCount = body
    .trim()
    .split(/\s+/)
    .filter((w) => w).length
  const charCount = body.length

  const handleCopy = async () => {
    await navigator.clipboard.writeText(body)
    setCopied(true)
    toast.success('Email copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setBody(`Hi ${lead.name.split(' ')[0]},

I noticed ${lead.company} has been making waves in the ${lead.industry} space — congrats on the momentum!

I&apos;m reaching out because we help teams like yours at ${lead.company} streamline their outbound prospecting process. Our customers typically see a 70% reduction in time spent on manual lead qualification.

Given your role as ${lead.title}, I thought you might find this relevant. Would you be open to a quick 15-minute call this week to see if there&apos;s a fit?

Best,
[Your name]`)
      setSubject(`Quick question for ${lead.name.split(' ')[0]} at ${lead.company}`)
      setIsGenerating(false)
      toast.success('Email regenerated')
    }, 1000)
  }

  const handleSend = () => {
    toast.success('Email sent successfully via Gmail')
  }

  const handleSaveDraft = () => {
    toast.success('Draft saved')
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card">
      {/* To field */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Label className="text-sm text-muted-foreground">To:</Label>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback
              className={cn('text-xs text-white', getAvatarColor(lead.name))}
            >
              {lead.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">{lead.name}</span>
          <span className="text-sm text-muted-foreground">&lt;{lead.email}&gt;</span>
        </div>
      </div>

      {/* Subject field */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Label htmlFor="subject" className="text-sm text-muted-foreground">
          Subject:
        </Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
          placeholder="Enter subject line..."
        />
      </div>

      {/* Email body */}
      <div className="flex-1 p-4">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your email here..."
          className="h-full min-h-[300px] resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
        />
      </div>

      {/* Footer */}
      <div className="border-t border-border px-4 py-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {}}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {}}
            >
              <Redo className="h-4 w-4" />
            </Button>
            <div className="mx-2 h-4 w-px bg-border" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRegenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Generating...
                </span>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Regenerate
                </>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">
            {wordCount} words · {charCount} characters
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button className="flex-1" onClick={handleSend}>
            <Send className="mr-2 h-4 w-4" />
            Send via Gmail
          </Button>
          <Button variant="outline" onClick={handleSaveDraft}>
            <FileText className="mr-2 h-4 w-4" />
            Save as draft
          </Button>
        </div>
      </div>
    </div>
  )
}
