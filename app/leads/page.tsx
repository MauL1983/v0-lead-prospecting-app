'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Download, ArrowUpDown, Search, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { LeadFilters } from '@/components/lead-filters'
import { LeadCard } from '@/components/lead-card'
import { MOCK_LEADS } from '@/lib/mock-data'

function LeadCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-72" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        No leads found yet
      </h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        Define your ideal customer profile in the filters panel and click
        &quot;Find Leads&quot; to discover high-quality B2B prospects.
      </p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Zap className="h-4 w-4 text-amber-500" />
        Try enabling &quot;high-intent leads&quot; for better conversion rates
      </div>
    </div>
  )
}

export default function LeadsPage() {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [leads, setLeads] = useState(MOCK_LEADS)
  const [sortBy, setSortBy] = useState('best-match')
  const [displayCount, setDisplayCount] = useState(10)

  const handleSearch = () => {
    setIsSearching(true)
    setHasSearched(false)
    setTimeout(() => {
      setIsSearching(false)
      setHasSearched(true)
      setLeads(MOCK_LEADS)
    }, 1500)
  }

  const handleClear = () => {
    setHasSearched(false)
    setLeads([])
  }

  const handleSort = (value: string) => {
    setSortBy(value)
    const sorted = [...leads]
    switch (value) {
      case 'score':
        sorted.sort((a, b) => b.fitScore - a.fitScore)
        break
      case 'company-size':
        sorted.sort((a, b) => {
          const sizeOrder = ['1–10', '11–50', '51–200', '201–500', '501–1000', '1000+']
          return sizeOrder.indexOf(b.companySize) - sizeOrder.indexOf(a.companySize)
        })
        break
      case 'recent':
        sorted.reverse()
        break
    }
    setLeads(sorted)
  }

  const handleCompose = (lead: typeof MOCK_LEADS[0]) => {
    router.push(`/outreach?lead=${lead.id}`)
  }

  const handleBook = (lead: typeof MOCK_LEADS[0]) => {
    router.push(`/meetings?lead=${lead.id}`)
  }

  const displayedLeads = leads.slice(0, displayCount)

  return (
    <div className="flex h-screen">
      <div className="w-80 shrink-0">
        <LeadFilters
          onSearch={handleSearch}
          onClear={handleClear}
          isSearching={isSearching}
        />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <p className="text-sm text-muted-foreground">
            {hasSearched ? `${leads.length} leads found` : 'Start a search to find leads'}
          </p>
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-40">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-match">Best match</SelectItem>
                <SelectItem value="score">Fit score</SelectItem>
                <SelectItem value="company-size">Company size</SelectItem>
                <SelectItem value="recent">Recently added</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" disabled={!hasSearched}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isSearching ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <LeadCardSkeleton key={i} />
              ))}
            </div>
          ) : hasSearched ? (
            <div className="space-y-4">
              {displayedLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onCompose={handleCompose}
                  onBook={handleBook}
                />
              ))}
              {displayCount < leads.length && (
                <div className="flex justify-center pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setDisplayCount((prev) => prev + 10)}
                  >
                    Load more
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  )
}
