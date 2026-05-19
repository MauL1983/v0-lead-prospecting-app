'use client'

import { useState, type KeyboardEvent } from 'react'
import { Search, Zap, X, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  INDUSTRIES,
  COMPANY_SIZES,
  SENIORITY_LEVELS,
  GEOGRAPHIES,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface LeadFiltersProps {
  onSearch: () => void
  onClear: () => void
  isSearching: boolean
}

interface FilterState {
  query: string
  industries: string[]
  companySize: string
  seniority: string[]
  geographies: string[]
  techStack: string[]
  highIntent: boolean
}

export function LeadFilters({ onSearch, onClear, isSearching }: LeadFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    industries: [],
    companySize: '',
    seniority: [],
    geographies: [],
    techStack: [],
    highIntent: false,
  })
  const [techInput, setTechInput] = useState('')

  const toggleArrayFilter = (
    key: 'industries' | 'seniority' | 'geographies',
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }))
  }

  const addTechTag = () => {
    if (techInput.trim() && !filters.techStack.includes(techInput.trim())) {
      setFilters((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }))
      setTechInput('')
    }
  }

  const removeTechTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tag),
    }))
  }

  const handleTechKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTechTag()
    }
  }

  const handleClear = () => {
    setFilters({
      query: '',
      industries: [],
      companySize: '',
      seniority: [],
      geographies: [],
      techStack: [],
      highIntent: false,
    })
    onClear()
  }

  return (
    <div className="flex h-full flex-col border-r border-border bg-card p-6">
      <div className="mb-6 flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">Define your ICP</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 cursor-help text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">
                Your Ideal Customer Profile helps us find leads that match your
                target audience. The more specific, the better results.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto">
        {/* Search Query */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="query">Search query</Label>
            <Badge variant="secondary" className="text-xs">
              AI-powered
            </Badge>
          </div>
          <Textarea
            id="query"
            placeholder='SaaS VP of Sales, 50–500 employees, US, using Salesforce'
            className="min-h-[80px] resize-none"
            value={filters.query}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, query: e.target.value }))
            }
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label>Industry</Label>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((industry) => (
              <Badge
                key={industry}
                variant={
                  filters.industries.includes(industry) ? 'default' : 'outline'
                }
                className="cursor-pointer transition-all"
                onClick={() => toggleArrayFilter('industries', industry)}
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>

        {/* Company Size */}
        <div className="space-y-2">
          <Label>Company size</Label>
          <div className="flex flex-wrap gap-1">
            {COMPANY_SIZES.map((size) => (
              <Button
                key={size}
                variant={filters.companySize === size ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    companySize: prev.companySize === size ? '' : size,
                  }))
                }
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Seniority */}
        <div className="space-y-2">
          <Label>Job title / seniority</Label>
          <div className="flex flex-wrap gap-2">
            {SENIORITY_LEVELS.map((level) => (
              <Badge
                key={level}
                variant={filters.seniority.includes(level) ? 'default' : 'outline'}
                className="cursor-pointer transition-all"
                onClick={() => toggleArrayFilter('seniority', level)}
              >
                {level}
              </Badge>
            ))}
          </div>
        </div>

        {/* Geography */}
        <div className="space-y-2">
          <Label>Geography</Label>
          <div className="flex flex-wrap gap-2">
            {GEOGRAPHIES.map((geo) => (
              <Badge
                key={geo}
                variant={filters.geographies.includes(geo) ? 'default' : 'outline'}
                className="cursor-pointer transition-all"
                onClick={() => toggleArrayFilter('geographies', geo)}
              >
                {geo}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <Label htmlFor="tech">Tech stack</Label>
          <div className="flex gap-2">
            <Input
              id="tech"
              placeholder="e.g., HubSpot"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleTechKeyDown}
              className="flex-1"
            />
            <Button variant="outline" size="sm" onClick={addTechTag}>
              Add
            </Button>
          </div>
          {filters.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {filters.techStack.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeTechTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Intent Signals */}
        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            <Label htmlFor="intent" className="cursor-pointer">
              Only show high-intent leads
            </Label>
            {filters.highIntent && (
              <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                Signal-based
              </Badge>
            )}
          </div>
          <Switch
            id="intent"
            checked={filters.highIntent}
            onCheckedChange={(checked) =>
              setFilters((prev) => ({ ...prev, highIntent: checked }))
            }
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          className="w-full"
          onClick={onSearch}
          disabled={isSearching}
        >
          {isSearching ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Searching...
            </span>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Find Leads
            </>
          )}
        </Button>
        <Button variant="ghost" className="w-full" onClick={handleClear}>
          Clear filters
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Searching 275M+ verified B2B contacts
        </p>
      </div>
    </div>
  )
}
