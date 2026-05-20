"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Mail, Calendar, Archive } from "lucide-react";
import { Lead } from "@/lib/mock-data";
import { getInitialsColor, cn } from "@/lib/utils";
import { FitScoreBadge } from "@/components/fit-score-badge";
import { showToast } from "@/components/ui/toast";

interface KanbanCardProps {
  lead: Lead;
  isDragging?: boolean;
}

export function KanbanCard({ lead, isDragging }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } =
    useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "group rounded-xl border border-border bg-card p-3 cursor-grab active:cursor-grabbing transition-all duration-150 hover:border-border/80 hover:shadow-sm",
        (isDragging || isSortableDragging) && "opacity-50 shadow-lg rotate-1"
      )}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-[10px] font-semibold",
            getInitialsColor(lead.name)
          )}
        >
          {lead.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{lead.name}</p>
          <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
        </div>
        <FitScoreBadge score={lead.fitScore} size="sm" />
      </div>
      <p className="text-xs text-muted-foreground mb-2">{lead.lastActivity}</p>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); showToast(`Opening email for ${lead.name}`, "info"); }}
          className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); showToast(`Opening calendar for ${lead.name}`, "info"); }}
          className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <Calendar className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); showToast(`${lead.name} archived`, "info"); }}
          className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <Archive className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
