import { MOCK_LEADS, type Lead } from "@/lib/mock-data";
import { COUNTRIES_BY_REGION } from "./regions";
import type { SearchFilters } from "./types";

const titleTerms: Record<string, string[]> = {
  "Founder/CEO": ["founder", "ceo", "chief executive"],
  "VP / Director": ["vp", "director", "head"],
  Manager: ["manager", "lead"],
  "Revenue Operations": ["revenue operations", "revops", "sales ops"],
  Growth: ["growth", "marketing"],
  "IC/Individual Contributor": ["account executive", "sales"],
};

export const defaultFilters: SearchFilters = {
  query: "Fintech revenue leaders in Latin America using HubSpot or Salesforce",
  industries: ["Fintech"],
  companySizes: ["201–500", "500–1000"],
  titles: ["VP / Director", "Revenue Operations", "Growth"],
  geos: ["Latin America"],
  countries: ["Mexico", "Brazil", "Colombia", "Chile", "Argentina", "Peru"],
  techStack: ["HubSpot", "Salesforce"],
  intentOnly: true,
};

export function applyLeadFilters(leads: Lead[], filters: SearchFilters): Lead[] {
  return leads
    .filter((lead) => matchesFilters(lead, filters))
    .map((lead) => ({ ...lead, fitScore: scoreLead(lead, filters) }))
    .sort((a, b) => b.fitScore - a.fitScore);
}

export function inferCountries(filters: SearchFilters) {
  const countries = new Set(filters.countries);
  filters.geos.forEach((geo) => {
    COUNTRIES_BY_REGION[geo]?.forEach((country) => countries.add(country));
  });
  return [...countries];
}

function matchesFilters(lead: Lead, filters: SearchFilters) {
  const query = filters.query.toLowerCase().trim();
  const haystack = [
    lead.name,
    lead.title,
    lead.company,
    lead.industry,
    lead.companySize,
    lead.location,
    lead.country,
    lead.region,
    lead.techStack?.join(" "),
    lead.recentSignal,
    lead.fitReasons.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const queryMatch =
    !query ||
    query
      .split(/\s+/)
      .filter((term) => term.length > 2)
      .some((term) => haystack.includes(term));
  const industryMatch =
    filters.industries.length === 0 || filters.industries.includes(lead.industry);
  const sizeMatch =
    filters.companySizes.length === 0 ||
    filters.companySizes.includes(lead.companySize);
  const geoMatch =
    filters.geos.length === 0 ||
    (lead.region ? filters.geos.includes(lead.region) : false);
  const countryMatch =
    filters.countries.length === 0 ||
    (lead.country ? filters.countries.includes(lead.country) : false);
  const techMatch =
    filters.techStack.length === 0 ||
    filters.techStack.some((tech) =>
      lead.techStack?.some((leadTech) =>
        leadTech.toLowerCase().includes(tech.toLowerCase()),
      ),
    );
  const titleMatch =
    filters.titles.length === 0 ||
    filters.titles.some((title) =>
      titleTerms[title]?.some((term) =>
        lead.title.toLowerCase().includes(term),
      ),
    );
  const intentMatch = !filters.intentOnly || lead.fitReasons.length > 0;

  return (
    queryMatch &&
    industryMatch &&
    sizeMatch &&
    geoMatch &&
    countryMatch &&
    techMatch &&
    titleMatch &&
    intentMatch
  );
}

function scoreLead(lead: Lead, filters: SearchFilters) {
  let score = lead.fitScore;

  if (lead.region === "Latin America") score += 4;
  if (lead.country && filters.countries.includes(lead.country)) score += 5;
  if (filters.industries.includes(lead.industry)) score += 4;
  if (filters.companySizes.includes(lead.companySize)) score += 3;
  if (
    filters.techStack.some((tech) =>
      lead.techStack?.some((leadTech) =>
        leadTech.toLowerCase().includes(tech.toLowerCase()),
      ),
    )
  ) {
    score += 4;
  }
  if (filters.intentOnly && lead.fitReasons.length > 0) score += 3;

  return Math.min(score, 99);
}

export function demoSearch(filters: SearchFilters) {
  return applyLeadFilters(MOCK_LEADS, filters);
}
