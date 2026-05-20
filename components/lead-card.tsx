"use client";
import { useState } from "react";
import { Mail, Calendar, BookmarkPlus, ChevronDown, ExternalLink, Copy, Check } from "lucide-react";
import { Lead } from "@/lib/mock-data";
import { getInitialsColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FitScoreBadge } from "@/components/fit-score-badge";
import { showToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface LeadCardProps {
  lead: Lead;
  onEmailClick?: (lead: Lead) => void;
  onMeetingClick?: (lead: Lead) => void;
}

export function LeadCard({ lead, onEmailClick, onMeetingClick }: LeadCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    setSaved(true);
    showToast(`${lead.name} saved to pipeline`, "success");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(lead.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast("Email copied to clipboard", "success");
  };

  const handleEmail = () => {
    onEmailClick?.(lead);
    showToast(`Opening email composer for ${lead.name}`, "info");
  };

  const handleMeeting = () => {
    onMeetingClick?.(lead);
    showToast(`Opening meeting booker for ${lead.name}`, "info");
  };

  return (
    <div className="group border border-border rounded-xl bg-card transition-all duration-150 hover:border-border/80 hover:shadow-sm">
      <div
        className="flex items-center gap-4 px-4 py-3.5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-xs font-semibold",
            getInitialsColor(lead.name)
          )}
        >
          {lead.initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold">{lead.name}</span>
            <span className="text-xs text-muted-foreground truncate">{lead.title}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs font-medium text-foreground/80">{lead.company}</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
            <Badge variant="muted" className="text-[11px] py-0">{lead.industry}</Badge>
            <span className="text-xs text-muted-foreground">{lead.companySize} employees</span>
            <span className="text-xs text-muted-foreground">{lead.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <FitScoreBadge score={lead.fitScore} size="md" />
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              title="Compose email"
              onClick={(e) => { e.stopPropagation(); handleEmail(); }}
            >
              <Mail className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="Book meeting"
              onClick={(e) => { e.stopPropagation(); handleMeeting(); }}
            >
              <Calendar className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="Save to pipeline"
              onClick={(e) => { e.stopPropagation(); handleSave(); }}
              className={saved ? "text-indigo-600" : ""}
            >
              <BookmarkPlus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <ChevronDown
            className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", expanded && "rotate-180")}
          />
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border px-4 py-4 space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              About {lead.name.split(" ")[0]}
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">{lead.bio}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Company</p>
              <p className="text-sm font-medium">{lead.company}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Founded</p>
              <p className="text-sm font-medium">{lead.companyFounded}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">HQ</p>
              <p className="text-sm font-medium">{lead.companyHQ}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Website</p>
              <p className="text-sm font-medium text-indigo-500">{lead.companyWebsite}</p>
            </div>
          </div>

          <div className="rounded-lg bg-muted/40 border border-border px-3 py-2">
            <p className="text-xs text-muted-foreground mb-1">Recent signal</p>
            <p className="text-sm">{lead.recentSignal}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 flex-1">
              <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground/80 truncate">{lead.email}</span>
              <button
                onClick={handleCopyEmail}
                className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <a
              href={`https://${lead.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground/80 hover:bg-muted transition-colors"
            >
              LinkedIn <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              📞 Verify to reveal
            </div>
          </div>

          <div className="rounded-lg border border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/30 px-4 py-3">
            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
              ✦ Why this is a strong fit
            </p>
            <ul className="space-y-1.5">
              {lead.fitReasons.map((reason, i) => (
                <li key={i} className="text-sm text-indigo-800 dark:text-indigo-200 flex gap-2">
                  <span className="text-indigo-400 shrink-0 mt-0.5">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleEmail}>
              <Mail className="h-4 w-4" /> Generate email
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleMeeting}>
              <Calendar className="h-4 w-4" /> Book meeting
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
