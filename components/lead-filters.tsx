"use client";
import { useState } from "react";
import { Search, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  COMPANY_SIZES,
  COUNTRIES_BY_REGION,
  INDUSTRIES,
  REGIONS,
  TITLES,
} from "@/lib/leads/regions";
import type { Region, SearchFilters } from "@/lib/leads/types";

interface LeadFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
}

export function LeadFilters({ filters, onFiltersChange, onSearch }: LeadFiltersProps) {
  const [techInput, setTechInput] = useState("");

  const setFilters = (updater: (filters: SearchFilters) => SearchFilters) => {
    onFiltersChange(updater(filters));
  };

  const toggleItem = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const toggleGeo = (geo: Region) => {
    setFilters((prev) => {
      const isActive = prev.geos.includes(geo);
      const regionCountries = COUNTRIES_BY_REGION[geo] ?? [];
      return {
        ...prev,
        geos: isActive ? prev.geos.filter((item) => item !== geo) : [...prev.geos, geo],
        countries: isActive
          ? prev.countries.filter((country) => !regionCountries.includes(country))
          : [...new Set([...prev.countries, ...regionCountries])],
      };
    });
  };

  const addTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techInput.trim()) {
      setFilters((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTech = (tag: string) => {
    setFilters((prev) => ({ ...prev, techStack: prev.techStack.filter((t) => t !== tag) }));
  };

  const clearFilters = () => {
    onFiltersChange({ query: "", industries: [], companySizes: [], titles: [], geos: [], countries: [], techStack: [], intentOnly: false });
    setTechInput("");
  };

  const visibleCountries = filters.geos.flatMap((geo) => COUNTRIES_BY_REGION[geo] ?? []);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-5 flex-1 space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <label className="text-xs font-semibold text-foreground">Search query</label>
            <Badge variant="indigo" className="text-[10px] py-0 px-1.5">AI-powered</Badge>
          </div>
          <Textarea
            rows={3}
            placeholder={"Fintech revenue leaders in Latin America using HubSpot or Salesforce"}
            value={filters.query}
            onChange={(e) => setFilters((p) => ({ ...p, query: e.target.value }))}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground block mb-2">Industry</label>
          <div className="space-y-1.5">
            {INDUSTRIES.map((ind) => (
              <label key={ind} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.industries.includes(ind)}
                  onChange={() => toggleItem("industries", ind)}
                  className="h-3.5 w-3.5 rounded border-border accent-indigo-600"
                />
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{ind}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground block mb-2">Company size</label>
          <div className="flex flex-wrap gap-1.5">
            {COMPANY_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => toggleItem("companySizes", size)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium border transition-all duration-150",
                  filters.companySizes.includes(size)
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "border-border bg-background text-foreground/70 hover:border-indigo-400 hover:text-foreground"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground block mb-2">Job title / Seniority</label>
          <div className="space-y-1.5">
            {TITLES.map((title) => (
              <label key={title} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.titles.includes(title)}
                  onChange={() => toggleItem("titles", title)}
                  className="h-3.5 w-3.5 rounded border-border accent-indigo-600"
                />
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{title}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground block mb-2">Geography</label>
          <div className="space-y-1.5">
            {REGIONS.map((geo) => (
              <label key={geo} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.geos.includes(geo)}
                  onChange={() => toggleGeo(geo)}
                  className="h-3.5 w-3.5 rounded border-border accent-indigo-600"
                />
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{geo}</span>
              </label>
            ))}
          </div>
        </div>

        {visibleCountries.length > 0 && (
          <div>
            <label className="text-xs font-semibold text-foreground block mb-2">Countries</label>
            <div className="flex flex-wrap gap-1.5">
              {[...new Set(visibleCountries)].map((country) => (
                <button
                  key={country}
                  onClick={() => toggleItem("countries", country)}
                  className={cn(
                    "px-3 py-1 rounded-md text-xs font-medium border transition-all duration-150",
                    filters.countries.includes(country)
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "border-border bg-background text-foreground/70 hover:border-indigo-400 hover:text-foreground"
                  )}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-foreground block mb-2">Tech stack</label>
          <input
            type="text"
            placeholder="Type a tool and press Enter (e.g. HubSpot)"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={addTech}
            className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {filters.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {filters.techStack.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium"
                >
                  {tag}
                  <button onClick={() => removeTech(tag)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            <div>
              <p className="text-sm font-medium">Intent signals</p>
              <p className="text-xs text-muted-foreground">Only show high-intent leads</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {filters.intentOnly && (
              <Badge variant="warning" className="text-[10px] py-0 px-1.5">Signal-based</Badge>
            )}
            <Switch
              checked={filters.intentOnly}
              onCheckedChange={(v) => setFilters((p) => ({ ...p, intentOnly: v }))}
            />
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-border space-y-2">
        <Button className="w-full" onClick={onSearch}>
          <Search className="h-4 w-4" /> Find Leads
        </Button>
        <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={clearFilters}>
          Clear filters
        </Button>
        <p className="text-center text-xs text-muted-foreground">Searching verified B2B contacts across the Americas</p>
      </div>
    </div>
  );
}
