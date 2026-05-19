'use client'

import { Plus, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { KanbanBoard } from '@/components/kanban-board'

export default function PipelinePage() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">My Pipeline</h1>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            42 active leads
          </span>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add lead
        </Button>
      </div>

      <div className="flex-1 overflow-hidden p-6">
        <KanbanBoard />
      </div>
    </div>
  )
}
