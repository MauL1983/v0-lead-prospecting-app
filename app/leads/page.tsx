"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import { LeadFilters } from "@/components/lead-filters";
import { LeadCard } from "@/components/lead-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_LEADS } from "@/lib/mock-data";
import { showToast } from "@/components/ui/toast";

type LeadStatus = "idle" | "loading" | "results";

export default function LeadsPage() {
  const [status, setStatus] = useState<LeadStatus>("results");
  const [sortBy, setSortBy] = useState("best");

  const handleSearch = () => {
    setStatus("loading");
    setTimeout(() => setStatus("results"), 1500);
  };

  const sortedLeads = [...MOCK_LEADS].sort((a, b) => {
    if (sortBy === "best") return b.fitScore - a.fitScore;
    if (sortBy === "company") return a.company.localeCompare(b.company);
    return 0;
  });

  return (
    <div className="flex h-screen">
      <div className="w-80 shrink-0 border-r border-border flex flex-col h-full">
        <div className="p-5 border-b border-border">
          <h1 className="text-base font-semibold">Define your ICP</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Set filters to find your ideal customer profile</p>
        </div>
        <LeadFilters onSearch={handleSearch} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          {status === "results" ? (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{MOCK_LEADS.length} leads</span> found
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Searching...</p>
          )}
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best">Best match</SelectItem>
                <SelectItem value="company">Company size</SelectItem>
                <SelectItem value="recent">Recently added</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast("Exporting leads to CSV...", "info")}
            >
              <Download className="h-3.5 w-3.5" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {status === "loading" && (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border p-4 flex items-center gap-4">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-72" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              ))}
            </div>
          )}

          {status === "results" && (
            <div className="space-y-2">
              {sortedLeads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
              <div className="pt-4 text-center">
                <Button variant="outline" onClick={() => showToast("Loading more leads...", "info")}>
                  Load more
                </Button>
              </div>
            </div>
          )}

          {status === "idle" && (
            <div className="flex flex-col items-center justify-center h-full text-center py-24">
              <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-base font-semibold mb-2">Define your ICP to get started</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Use the filters on the left to describe your ideal customer profile and click Find Leads.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
