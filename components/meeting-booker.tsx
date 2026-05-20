"use client";
import { useState } from "react";
import { Video, RefreshCw, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MOCK_LEADS, MOCK_MEETINGS, Lead } from "@/lib/mock-data";
import { getInitialsColor, cn } from "@/lib/utils";
import { showToast } from "@/components/ui/toast";

const MEETING_TYPES = [
  { value: "discovery", label: "Discovery call (30 min)", duration: "30 min" },
  { value: "demo", label: "Product demo (45 min)", duration: "45 min" },
  { value: "followup", label: "Follow-up (15 min)", duration: "15 min" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const AVAILABLE_SLOTS = [
  { day: "Mon", time: "10:00 AM" },
  { day: "Wed", time: "11:00 AM" },
  { day: "Thu", time: "2:00 PM" },
  { day: "Thu", time: "4:00 PM" },
  { day: "Fri", time: "10:00 AM" },
];

const STATUS_STYLES = {
  confirmed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  cancelled: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

export function MeetingBooker() {
  const [activeTab, setActiveTab] = useState<"book" | "upcoming">("book");
  const [selectedLead, setSelectedLead] = useState<Lead>(MOCK_LEADS[0]);
  const [meetingType, setMeetingType] = useState("discovery");
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>({ day: "Thu", time: "2:00 PM" });
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("Discovery call — Sarah Chen / leadRX10");

  const isAvailable = (day: string, time: string) =>
    AVAILABLE_SLOTS.some((s) => s.day === day && s.time === time);

  const isSelected = (day: string, time: string) =>
    selectedSlot?.day === day && selectedSlot?.time === time;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-muted rounded-lg p-1 flex gap-1">
          {(["book", "upcoming"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150",
                activeTab === tab
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === "book" ? "Book a meeting" : "Upcoming meetings"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "book" && (
        <div className="flex gap-6 flex-1 min-h-0">
          <div className="w-72 shrink-0 space-y-5">
            <div>
              <label className="text-xs font-semibold block mb-2">Lead</label>
              <select
                value={selectedLead.id}
                onChange={(e) => {
                  const found = MOCK_LEADS.find((l) => l.id === e.target.value);
                  if (found) {
                    setSelectedLead(found);
                    setTitle(`Discovery call — ${found.name} / leadRX10`);
                  }
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
              <label className="text-xs font-semibold block mb-2">Meeting type</label>
              <div className="space-y-2">
                {MEETING_TYPES.map((t) => (
                  <label key={t.value} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="meetingType"
                      value={t.value}
                      checked={meetingType === t.value}
                      onChange={() => setMeetingType(t.value)}
                      className="accent-indigo-600"
                    />
                    <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                      {t.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {selectedSlot && (
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground mb-0.5">Selected slot</p>
                <p className="text-sm font-medium">
                  {selectedSlot.day}, May 22 · {selectedSlot.time} –{" "}
                  {MEETING_TYPES.find((t) => t.value === meetingType)?.duration}
                </p>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold block mb-2">Meeting title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-2">Notes (optional)</label>
              <Textarea
                rows={3}
                placeholder="Add any context or agenda items..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Button
                className="w-full"
                onClick={() => showToast("Meeting invite sent via Gmail!", "success")}
                disabled={!selectedSlot}
              >
                <Video className="h-4 w-4" /> Send invite via Gmail
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => { navigator.clipboard.writeText("https://cal.leadengine.io/meet/xyz"); showToast("Meeting link copied!", "success"); }}
              >
                Copy meeting link
              </Button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="grid grid-cols-6 divide-x divide-border border-b border-border text-xs font-medium">
                <div className="p-3 text-muted-foreground" />
                {DAYS.map((day) => (
                  <div key={day} className="p-3 text-center font-semibold">{day}</div>
                ))}
              </div>
              <div className="overflow-y-auto max-h-96">
                {TIMES.map((time) => (
                  <div key={time} className="grid grid-cols-6 divide-x divide-border border-b border-border last:border-b-0">
                    <div className="p-2 text-xs text-muted-foreground flex items-center">{time}</div>
                    {DAYS.map((day) => {
                      const avail = isAvailable(day, time);
                      const sel = isSelected(day, time);
                      return (
                        <button
                          key={day}
                          disabled={!avail}
                          onClick={() => avail && setSelectedSlot({ day, time })}
                          className={cn(
                            "p-2 text-xs transition-all duration-150 text-center",
                            sel
                              ? "bg-indigo-600 text-white font-medium"
                              : avail
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 cursor-pointer"
                              : "text-muted-foreground/30 cursor-default"
                          )}
                        >
                          {avail && !sel ? "Free" : sel ? "Selected" : ""}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "upcoming" && (
        <div className="grid grid-cols-2 gap-4">
          {MOCK_MEETINGS.map((meeting) => (
            <div key={meeting.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-xs font-semibold",
                    getInitialsColor(meeting.lead.name)
                  )}
                >
                  {meeting.lead.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{meeting.lead.name}</p>
                  <p className="text-xs text-muted-foreground">{meeting.lead.company}</p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                    STATUS_STYLES[meeting.status]
                  )}
                >
                  {meeting.status === "confirmed" && <Check className="h-3 w-3" />}
                  {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{meeting.date}</p>
                <p className="text-xs text-muted-foreground">{meeting.time}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{meeting.type}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => showToast("Joining meeting...", "info")}>
                  <Video className="h-3.5 w-3.5" /> Join
                </Button>
                <Button size="sm" variant="outline" onClick={() => showToast("Reschedule request sent", "info")}>
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => showToast("Meeting cancelled", "error")}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
