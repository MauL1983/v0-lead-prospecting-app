"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/kanban-board";
import { showToast } from "@/components/ui/toast";

export default function PipelinePage() {
  return (
    <div className="flex flex-col h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold">My Pipeline</h1>
          <p className="text-sm text-muted-foreground">42 active leads across all stages</p>
        </div>
        <Button onClick={() => showToast("Add lead dialog coming soon", "info")}>
          <Plus className="h-4 w-4" /> Add lead
        </Button>
      </div>
      <div className="flex-1 overflow-x-auto">
        <KanbanBoard />
      </div>
    </div>
  );
}
