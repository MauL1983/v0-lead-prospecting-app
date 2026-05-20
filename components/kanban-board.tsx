"use client";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanCard } from "@/components/kanban-card";
import { KanbanColumn } from "@/components/kanban-column";
import { Lead, PipelineStage, MOCK_LEADS } from "@/lib/mock-data";

const COLUMNS: { id: PipelineStage; label: string; color: string }[] = [
  { id: "new", label: "New", color: "text-blue-500 border-blue-500/30 bg-blue-500/5" },
  { id: "contacted", label: "Contacted", color: "text-amber-500 border-amber-500/30 bg-amber-500/5" },
  { id: "replied", label: "Replied", color: "text-violet-500 border-violet-500/30 bg-violet-500/5" },
  { id: "meeting_booked", label: "Meeting Booked", color: "text-emerald-500 border-emerald-500/30 bg-emerald-500/5" },
  { id: "closed", label: "Closed", color: "text-zinc-500 border-zinc-500/30 bg-zinc-500/5" },
];

const INITIAL_LEADS = MOCK_LEADS.map((l) => ({ ...l }));

export function KanbanBoard() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const activeLead = leads.find((l) => l.id === activeId);

  const handleDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;
    const overId = String(over.id);
    const colId = COLUMNS.find((c) => c.id === overId)?.id;
    if (colId && colId !== leads.find((l) => l.id === active.id)?.status) {
      setLeads((prev) =>
        prev.map((l) => (l.id === String(active.id) ? { ...l, status: colId } : l))
      );
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { over } = e;
    if (!over) return;
    const overId = String(over.id);
    const colId = COLUMNS.find((c) => c.id === overId)?.id;
    if (colId) {
      setLeads((prev) =>
        prev.map((l) => (l.id === String(e.active.id) ? { ...l, status: colId } : l))
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 h-full overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.id);
          return (
            <SortableContext
              key={col.id}
              items={colLeads.map((l) => l.id)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn id={col.id} label={col.label} color={col.color} count={colLeads.length}>
                {colLeads.map((lead) => (
                  <KanbanCard key={lead.id} lead={lead} />
                ))}
              </KanbanColumn>
            </SortableContext>
          );
        })}
      </div>
      <DragOverlay>
        {activeLead ? <KanbanCard lead={activeLead} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
