'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sparkles, Check, Circle } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { EmailComposer } from '@/components/email-composer'
import { MOCK_LEADS, EMAIL_TEMPLATES } from '@/lib/mock-data'
import { cn, getAvatarColor } from '@/lib/utils'

function OutreachContent() {
  const searchParams = useSearchParams()
  const leadId = searchParams.get('lead')

  const [selectedLead, setSelectedLead] = useState(
    leadId ? MOCK_LEADS.find((l) => l.id === leadId) || MOCK_LEADS[0] : MOCK_LEADS[0]
  )
  const [tone, setTone] = useState('professional')
  const [emailType, setEmailType] = useState('cold')
  const [valueProp, setValueProp] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedEmail, setGeneratedEmail] = useState({
    subject: `Quick question about your sales stack at ${selectedLead.company}`,
    body: `Hi ${selectedLead.name.split(' ')[0]},

I noticed ${selectedLead.company}&apos;s sales team has scaled significantly over the past 12 months — congrats on the growth.

We help SaaS ${selectedLead.title} teams like yours reduce time spent on manual prospecting by 70%, so your reps can focus on closing. Most of our customers see their first qualified meeting within the first week.

Would it make sense to jump on a 15-minute call this week? I have Thursday 2pm or Friday 10am open.

Best,
[Your name]`,
  })

  useEffect(() => {
    if (leadId) {
      const lead = MOCK_LEADS.find((l) => l.id === leadId)
      if (lead) {
        setSelectedLead(lead)
        setGeneratedEmail({
          subject: `Quick question about your sales stack at ${lead.company}`,
          body: `Hi ${lead.name.split(' ')[0]},

I noticed ${lead.company}&apos;s sales team has scaled significantly over the past 12 months — congrats on the growth.

We help SaaS ${lead.title} teams like yours reduce time spent on manual prospecting by 70%, so your reps can focus on closing. Most of our customers see their first qualified meeting within the first week.

Would it make sense to jump on a 15-minute call this week? I have Thursday 2pm or Friday 10am open.

Best,
[Your name]`,
        })
      }
    }
  }, [leadId])

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      let newBody = ''
      const firstName = selectedLead.name.split(' ')[0]

      if (emailType === 'cold') {
        if (tone === 'professional') {
          newBody = `Hi ${firstName},

I noticed ${selectedLead.company} has been making significant strides in the ${selectedLead.industry} space. ${selectedLead.recentSignal} — impressive growth.

At LeadEngine, we help ${selectedLead.title} professionals like yourself reduce prospecting time by 70% while improving lead quality. ${valueProp ? `Specifically, ${valueProp}` : ''}

Would you be open to a brief 15-minute call this week to explore if there might be a fit?

Best regards,
[Your name]`
        } else if (tone === 'friendly') {
          newBody = `Hey ${firstName}!

I&apos;ve been following ${selectedLead.company}&apos;s journey and have to say — you all are crushing it! ${selectedLead.recentSignal}.

I work with ${selectedLead.title}s who are tired of spending hours on manual prospecting (aren&apos;t we all?). Our tool helps teams find qualified leads 70% faster.${valueProp ? ` Plus, ${valueProp}` : ''}

Fancy a quick chat? I promise to keep it short and valuable.

Cheers,
[Your name]`
        } else if (tone === 'direct') {
          newBody = `${firstName},

${selectedLead.company} is growing. Your sales team needs better leads, faster.

LeadEngine delivers:
• 70% reduction in prospecting time
• Higher quality leads with AI scoring
• ${valueProp || 'Seamless integration with your existing stack'}

15 minutes. This week. Worth your time?

[Your name]`
        } else {
          newBody = `Hi ${firstName},

Quick question: how much time does your team at ${selectedLead.company} spend on manual prospecting each week?

I ask because we&apos;ve been working with other ${selectedLead.industry} companies who were spending 15+ hours weekly on lead research. After implementing our AI prospecting tool, they cut that to under 5 hours.${valueProp ? ` ${valueProp}` : ''}

Curious to hear how you&apos;re currently approaching this?

[Your name]`
        }
      } else if (emailType === 'followup') {
        newBody = `Hi ${firstName},

Following up on my previous email about helping ${selectedLead.company}&apos;s sales team with lead prospecting.

I know you&apos;re busy, so I&apos;ll keep this brief: we just released a new feature that&apos;s particularly relevant for ${selectedLead.industry} companies — AI-powered intent signals that identify leads who are actively researching solutions like yours.

Would love to show you how it works. 15 minutes?

Best,
[Your name]`
      } else if (emailType === 'breakup') {
        newBody = `Hi ${firstName},

I&apos;ve reached out a few times about helping ${selectedLead.company} streamline lead prospecting, but I haven&apos;t heard back.

I&apos;ll assume the timing isn&apos;t right, so this will be my last email. If prospecting efficiency becomes a priority down the road, you know where to find me.

Wishing you and the team continued success.

Best,
[Your name]`
      } else {
        newBody = `Hi ${firstName},

I&apos;d love to schedule a quick call to show you how LeadEngine can help ${selectedLead.company}&apos;s sales team find better leads, faster.

Based on what I know about your role as ${selectedLead.title}, I think you&apos;d find our AI fit scoring particularly valuable — it helps prioritize the leads most likely to convert.

Do you have 30 minutes this week? I&apos;m flexible on timing.

Best,
[Your name]`
      }

      setGeneratedEmail({
        subject: emailType === 'cold'
          ? `Quick question about your sales stack at ${selectedLead.company}`
          : emailType === 'followup'
          ? `Following up: LeadEngine for ${selectedLead.company}`
          : emailType === 'breakup'
          ? `Closing the loop`
          : `Meeting request: ${selectedLead.company} x LeadEngine`,
        body: newBody,
      })
      setIsGenerating(false)
      toast.success('Email generated')
    }, 1000)
  }

  const fitIndicator = selectedLead.fitScore >= 80 ? 'Strong' : 'Good'
  const fitColor =
    selectedLead.fitScore >= 80 ? 'text-emerald-500' : 'text-amber-500'

  return (
    <div className="flex h-screen">
      {/* Left panel - Settings */}
      <div className="flex w-96 shrink-0 flex-col border-r border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold text-foreground">
          Compose Email
        </h2>

        <div className="flex-1 space-y-6 overflow-y-auto">
          {/* Lead selector */}
          <div className="space-y-2">
            <Label>Writing for</Label>
            <Select
              value={selectedLead.id}
              onValueChange={(id) => {
                const lead = MOCK_LEADS.find((l) => l.id === id)
                if (lead) {
                  setSelectedLead(lead)
                  setGeneratedEmail({
                    subject: `Quick question about your sales stack at ${lead.company}`,
                    body: generatedEmail.body.replace(
                      selectedLead.name.split(' ')[0],
                      lead.name.split(' ')[0]
                    ),
                  })
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

          {/* Tone selector */}
          <div className="space-y-2">
            <Label>Tone</Label>
            <div className="flex flex-wrap gap-2">
              {['professional', 'friendly', 'direct', 'curious'].map((t) => (
                <Button
                  key={t}
                  variant={tone === t ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTone(t)}
                  className="capitalize"
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          {/* Email type */}
          <div className="space-y-2">
            <Label>Email type</Label>
            <RadioGroup value={emailType} onValueChange={setEmailType}>
              {[
                { value: 'cold', label: 'Cold intro' },
                { value: 'followup', label: 'Follow-up' },
                { value: 'breakup', label: 'Break-up email' },
                { value: 'meeting', label: 'Meeting request' },
              ].map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Label htmlFor={type.value} className="cursor-pointer">
                    {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Value prop */}
          <div className="space-y-2">
            <Label htmlFor="valueProp">Key value prop</Label>
            <Textarea
              id="valueProp"
              placeholder="What problem does your product solve for this person?"
              value={valueProp}
              onChange={(e) => setValueProp(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Generate button */}
          <Button
            className="w-full"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Generating...
              </span>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate email
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                or choose a template
              </span>
            </div>
          </div>

          {/* Templates */}
          <div className="space-y-2">
            {EMAIL_TEMPLATES.map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer transition-all hover:border-primary/50"
                onClick={() => {
                  setEmailType('cold')
                  toast.info(`${template.name} template selected`)
                }}
              >
                <CardContent className="p-3">
                  <p className="text-sm font-medium text-foreground">
                    {template.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {template.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Email preview */}
      <div className="flex flex-1 flex-col overflow-hidden p-6">
        {/* AI confidence indicator */}
        <div className="mb-4 flex items-center gap-2">
          <Circle className={cn('h-3 w-3 fill-current', fitColor)} />
          <span className={cn('text-sm font-medium', fitColor)}>
            {fitIndicator} fit detected
          </span>
          <span className="text-sm text-muted-foreground">
            ({selectedLead.fitScore}% match)
          </span>
        </div>

        <div className="flex-1 overflow-hidden">
          <EmailComposer
            lead={selectedLead}
            initialSubject={generatedEmail.subject}
            initialBody={generatedEmail.body}
          />
        </div>
      </div>
    </div>
  )
}

export default function OutreachPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <OutreachContent />
    </Suspense>
  )
}
