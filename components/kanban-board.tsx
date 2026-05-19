'use client'

import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { KanbanCard } from '@/components/kanban-card'
import { cn } from '@/lib/utils'
import { PIPELINE_STAGES, MOCK_LEADS, type Lead, type PipelineStage } from '@/lib/mock-data'

interface KanbanColumnProps {
  stage: typeof PIPELINE_STAGES[number]
  leads: Lead[]
  children: React.ReactNode
}

function KanbanColumn({ stage, leads, children }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id })

  const colorClasses: Record<string, string> = {
    blue: 'border-blue-500/50 bg-blue-500/5',
    amber: 'border-amber-500/50 bg-amber-500/5',
    purple: 'border-purple-500/50 bg-purple-500/5',
    green: 'border-emerald-500/50 bg-emerald-500/5',
    gray: 'border-muted-foreground/30 bg-muted/30',
  }

  const badgeClasses: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    green: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    gray: 'bg-muted text-muted-foreground border-border',
  }

  return (
    <div className="flex w-72 shrink-0 flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{stage.label}</h3>
          <Badge variant="outline" className={cn('text-xs', badgeClasses[stage.color])}>
            {leads.length}
          </Badge>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 space-y-3 rounded-xl border-2 border-dashed p-3 transition-all',
          colorClasses[stage.color],
          isOver && 'border-primary bg-primary/5'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function KanbanBoard() {
  const [leads, setLeads] = useState<Lead[]>(() => {
    const stageAssignments: Record<string, PipelineStage> = {
      '1': 'new',
      '2': 'contacted',
      '3': 'replied',
      '4': 'meeting_booked',
      '5': 'new',
      '6': 'contacted',
      '7': 'new',
      '8': 'closed',
      '9': 'replied',
      '10': 'new',
    }
    return MOCK_LEADS.map((lead) => ({
      ...lead,
      status: stageAssignments[lead.id] || lead.status,
    }))
  })

  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const getLeadsByStage = (stageId: PipelineStage) =>
    leads.filter((lead) => lead.status === stageId)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeLead = leads.find((l) => l.id === activeId)
    if (!activeLead) return

    // Check if dropped on a column
    const targetStage = PIPELINE_STAGES.find((s) => s.id === overId)
    if (targetStage) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === activeId
            ? { ...lead, status: targetStage.id as PipelineStage }
            : lead
        )
      )
      toast.success(`Moved ${activeLead.name} to ${targetStage.label}`)
      return
    }

    // Check if dropped on another card
    const overLead = leads.find((l) => l.id === overId)
    if (overLead && activeLead.status !== overLead.status) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === activeId ? { ...lead, status: overLead.status } : lead
        )
      )
      const stage = PIPELINE_STAGES.find((s) => s.id === overLead.status)
      toast.success(`Moved ${activeLead.name} to ${stage?.label}`)
      return
    }

    // Reorder within same column
    if (overLead && activeLead.status === overLead.status) {
      const stageLeads = getLeadsByStage(activeLead.status)
      const oldIndex = stageLeads.findIndex((l) => l.id === activeId)
      const newIndex = stageLeads.findIndex((l) => l.id === overId)

      if (oldIndex !== newIndex) {
        const reordered = arrayMove(stageLeads, oldIndex, newIndex)
        const otherLeads = leads.filter((l) => l.status !== activeLead.status)
        setLeads([...otherLeads, ...reordered])
      }
    }
  }

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = getLeadsByStage(stage.id)
          return (
            <KanbanColumn key={stage.id} stage={stage} leads={stageLeads}>
              <SortableContext
                items={stageLeads.map((l) => l.id)}
                strategy={verticalListSortingStrategy}
              >
                {stageLeads.length === 0 ? (
                  <div className="flex h-32 items-center justify-center">
                    <p className="text-xs text-muted-foreground">
                      Drop leads here
                    </p>
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <KanbanCard
                      key={lead.id}
                      lead={lead}
                      isDragging={activeId === lead.id}
                    />
                  ))
                )}
              </SortableContext>
            </KanbanColumn>
          )
        })}
      </div>

      <DragOverlay>
        {activeLead ? <KanbanCard lead={activeLead} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}
