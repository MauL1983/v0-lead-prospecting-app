"use client";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  id: string;
  label: string;
  color: string;
  count: number;
  children: React.ReactNode;
}

export function KanbanColumn({ id, label, color, count, children }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex flex-col w-64 shrink-0">
      <div className={cn("flex items-center justify-between rounded-lg border px-3 py-2 mb-3", color)}>
        <span className="text-xs font-semibold">{label}</span>
        <span className="text-xs font-semibold opacity-70">{count}</span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-col gap-2 flex-1 rounded-xl border-2 border-dashed p-2 transition-colors min-h-40",
          isOver ? "border-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/20" : "border-transparent"
        )}
      >
        {children}
      </div>
    </div>
  );
}
