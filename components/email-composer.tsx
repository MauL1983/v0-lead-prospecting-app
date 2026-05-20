"use client";
import { useState } from "react";
import { Sparkles, RotateCcw, Copy, Send, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MOCK_LEADS, Lead } from "@/lib/mock-data";
import { getInitialsColor, cn } from "@/lib/utils";
import { showToast } from "@/components/ui/toast";

const TONES = ["Professional", "Friendly", "Direct", "Curious"];

const EMAIL_TYPES = [
  { value: "cold", label: "Cold intro" },
  { value: "followup", label: "Follow-up" },
  { value: "breakup", label: "Break-up email" },
  { value: "meeting", label: "Meeting request" },
];

const TEMPLATES = [
  {
    name: "Short & punchy",
    preview: "Hi [Name], quick question — are you still evaluating tools to improve outbound pipeline velocity at [Company]?",
  },
  {
    name: "Story-led",
    preview: "We helped a company like [Company] cut prospecting time by 70% in their first month. Here's how...",
  },
  {
    name: "Question-based",
    preview: "What would it mean for your team if your reps spent 3x more time on calls and 3x less on list-building?",
  },
];

const SAMPLE_EMAIL = `Hi Sarah,

I noticed Notion's sales team has scaled significantly over the past 12 months — congrats on the growth.

We help SaaS VP of Sales teams like yours reduce time spent on manual prospecting by 70%, so your reps can focus on closing. Most of our customers see their first qualified meeting within the first week.

Would it make sense to jump on a 15-minute call this week? I have Thursday 2pm or Friday 10am open.

Best,
[Your name]`;

export function EmailComposer() {
  const [selectedLead, setSelectedLead] = useState<Lead>(MOCK_LEADS[0]);
  const [tone, setTone] = useState("Professional");
  const [emailType, setEmailType] = useState("cold");
  const [valueProp, setValueProp] = useState("");
  const [subject, setSubject] = useState("Quick question about your sales stack at Notion");
  const [body, setBody] = useState(SAMPLE_EMAIL);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setBody(SAMPLE_EMAIL);
      setGenerating(false);
      showToast("Email generated successfully", "success");
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast("Email copied to clipboard", "success");
  };

  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  const charCount = body.length;

  return (
    <div className="flex h-full gap-0 divide-x divide-border">
      <div className="w-72 shrink-0 flex flex-col overflow-y-auto">
        <div className="p-5 flex-1 space-y-5">
          <div>
            <label className="text-xs font-semibold block mb-2">Writing for</label>
            <select
              value={selectedLead.id}
              onChange={(e) => {
                const found = MOCK_LEADS.find((l) => l.id === e.target.value);
                if (found) setSelectedLead(found);
              }}
              className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {MOCK_LEADS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} — {l.company}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold block mb-2">Tone</label>
            <div className="grid grid-cols-2 gap-1.5">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150",
                    tone === t
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "border-border bg-background text-foreground/70 hover:border-indigo-400 hover:text-foreground"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold block mb-2">Email type</label>
            <div className="space-y-1.5">
              {EMAIL_TYPES.map((t) => (
                <label key={t.value} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="emailType"
                    value={t.value}
                    checked={emailType === t.value}
                    onChange={() => setEmailType(t.value)}
                    className="accent-indigo-600"
                  />
                  <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                    {t.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold block mb-2">Key value prop</label>
            <Textarea
              rows={3}
              placeholder="What problem does your product solve for this person?"
              value={valueProp}
              onChange={(e) => setValueProp(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleGenerate} disabled={generating}>
            {generating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate email
              </>
            )}
          </Button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            or choose a template
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-2">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.name}
                onClick={() => { setBody(tpl.preview); showToast(`Template "${tpl.name}" applied`, "info"); }}
                className="w-full text-left rounded-lg border border-border p-3 hover:border-indigo-400 hover:bg-muted/40 transition-all duration-150"
              >
                <p className="text-xs font-semibold mb-1">{tpl.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{tpl.preview}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-4">
        <div className="rounded-xl border border-border bg-card p-5 flex-1 flex flex-col space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-xs font-semibold",
                getInitialsColor(selectedLead.name)
              )}
            >
              {selectedLead.initials}
            </div>
            <div>
              <p className="text-sm font-medium">{selectedLead.name}</p>
              <p className="text-xs text-muted-foreground">{selectedLead.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground shrink-0 w-14">Subject:</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 text-sm bg-transparent focus:outline-none border-b border-transparent focus:border-border transition-colors pb-1"
            />
          </div>

          <div className="flex-1 relative">
            <Textarea
              className="h-full min-h-48 text-sm leading-relaxed"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
              {wordCount} words · {charCount} chars
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" title="Undo">
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleGenerate} disabled={generating}>
                <Sparkles className="h-3.5 w-3.5" /> Regenerate
              </Button>
              <Button variant="ghost" size="icon" title="Copy" onClick={handleCopy}>
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground">Strong fit detected</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1"
            onClick={() => showToast("Email sent via Gmail!", "success")}
          >
            <Send className="h-4 w-4" /> Send via Gmail
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => showToast("Draft saved", "info")}
          >
            <Save className="h-4 w-4" /> Save as draft
          </Button>
        </div>
      </div>
    </div>
  );
}
