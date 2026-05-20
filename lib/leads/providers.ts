import type { Lead } from "@/lib/mock-data";
import { demoSearch, inferCountries } from "./search";
import type { IntegrationStatus, LeadSearchResponse, SearchFilters } from "./types";

type ApolloPerson = {
  id?: string;
  first_name?: string;
  last_name?: string;
  title?: string;
  email?: string;
  linkedin_url?: string;
  city?: string;
  country?: string;
  organization?: {
    name?: string;
    website_url?: string;
    industry?: string;
    estimated_num_employees?: number;
  };
};

export async function searchLeads(
  filters: SearchFilters,
): Promise<LeadSearchResponse> {
  if (process.env.LEAD_DATA_PROVIDER === "apollo" && process.env.APOLLO_API_KEY) {
    try {
      return await searchApollo(filters);
    } catch (error) {
      const leads = demoSearch(filters);
      return {
        provider: "Apollo",
        providerMode: "demo",
        total: leads.length,
        searchedAt: new Date().toISOString(),
        leads,
        notes: [
          "Apollo request failed, so demo results were returned.",
          error instanceof Error ? error.message : "Unknown Apollo error",
        ],
      };
    }
  }

  const leads = demoSearch(filters);
  return {
    provider: "Demo lead graph",
    providerMode: "demo",
    total: leads.length,
    searchedAt: new Date().toISOString(),
    leads,
    notes: [
      "Set LEAD_DATA_PROVIDER=apollo and APOLLO_API_KEY to run live people search.",
      "Latin America is enabled across Mexico, Brazil, Colombia, Chile, Argentina, and Peru.",
    ],
  };
}

export function getIntegrationStatus(): IntegrationStatus[] {
  return [
    {
      key: "apollo",
      label: "Apollo",
      purpose: "Live people search and person/company enrichment",
      configured: Boolean(process.env.APOLLO_API_KEY),
      envVars: ["LEAD_DATA_PROVIDER=apollo", "APOLLO_API_KEY"],
    },
    {
      key: "email-verification",
      label: "Hunter or NeverBounce",
      purpose: "Verify emails before export or outreach",
      configured: Boolean(process.env.HUNTER_API_KEY || process.env.NEVERBOUNCE_API_KEY),
      envVars: ["HUNTER_API_KEY", "NEVERBOUNCE_API_KEY"],
    },
    {
      key: "technographics",
      label: "Wappalyzer",
      purpose: "Confirm tech-stack filters such as Salesforce, HubSpot, or Shopify",
      configured: Boolean(process.env.WAPPALYZER_API_KEY),
      envVars: ["WAPPALYZER_API_KEY"],
    },
    {
      key: "crm",
      label: "HubSpot",
      purpose: "Create CRM contacts and pipeline records",
      configured: Boolean(process.env.HUBSPOT_PRIVATE_APP_TOKEN),
      envVars: ["HUBSPOT_PRIVATE_APP_TOKEN"],
    },
  ];
}

async function searchApollo(filters: SearchFilters): Promise<LeadSearchResponse> {
  const endpoint =
    process.env.APOLLO_PEOPLE_SEARCH_URL ??
    "https://api.apollo.io/api/v1/mixed_people/search";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "X-Api-Key": process.env.APOLLO_API_KEY ?? "",
    },
    body: JSON.stringify({
      q_keywords: filters.query,
      person_titles: filters.titles.flatMap(mapTitleToApolloTitles),
      organization_locations: inferCountries(filters),
      organization_num_employees_ranges: filters.companySizes,
      q_organization_keyword_tags: filters.industries,
      page: 1,
      per_page: 25,
    }),
  });

  if (!response.ok) {
    throw new Error(`Apollo returned ${response.status}`);
  }

  const payload = (await response.json()) as { people?: ApolloPerson[] };
  const leads = (payload.people ?? []).map((person, index) =>
    normalizeApolloPerson(person, filters, index),
  );

  return {
    provider: "Apollo",
    providerMode: "live",
    total: leads.length,
    searchedAt: new Date().toISOString(),
    leads,
    notes: [
      "Live Apollo people search is active.",
      "Add Hunter or NeverBounce to verify emails before export.",
    ],
  };
}

function normalizeApolloPerson(
  person: ApolloPerson,
  filters: SearchFilters,
  index: number,
): Lead {
  const firstName = person.first_name ?? "Unknown";
  const lastName = person.last_name ?? "Prospect";
  const company = person.organization?.name ?? "Unknown company";
  const country = person.country ?? filters.countries[0] ?? "Unknown";
  const city = person.city ?? "Unknown";
  const website = stripProtocol(person.organization?.website_url ?? "");

  return {
    id: person.id ?? `apollo_${index}`,
    name: `${firstName} ${lastName}`,
    initials: `${firstName[0] ?? "?"}${lastName[0] ?? ""}`.toUpperCase(),
    title: person.title ?? "Revenue leader",
    company,
    industry: person.organization?.industry ?? filters.industries[0] ?? "Unknown",
    companySize: employeeRange(person.organization?.estimated_num_employees),
    location: `${city}, ${country}`,
    email: person.email ?? "locked@apollo.io",
    linkedin: stripProtocol(person.linkedin_url ?? "linkedin.com"),
    fitScore: Math.max(70, 96 - index * 3),
    fitReasons: [
      "Matched the ICP search filters",
      "Company and role map to the selected outbound motion",
      "Regional fit aligns with current territory focus",
    ],
    aiInsight: `${firstName} matches the selected ICP for ${company}. Use enrichment and email verification before outreach.`,
    recentSignal: filters.intentOnly
      ? "Matched high-intent search criteria"
      : "Found through live Apollo search",
    status: "new",
    lastActivity: "Found just now",
    companyFounded: "Unknown",
    companyHQ: city,
    companyWebsite: website,
    bio: `${firstName} ${lastName} is a live search result from Apollo for the selected ICP.`,
    region: filters.geos[0] ?? "Latin America",
    country,
    techStack: filters.techStack,
    verification: person.email ? "not_requested" : "unknown",
    source: "apollo",
  };
}

function mapTitleToApolloTitles(title: string) {
  const map: Record<string, string[]> = {
    "Founder/CEO": ["CEO", "Founder"],
    "VP / Director": ["VP Sales", "Director of Sales", "Head of Growth"],
    Manager: ["Sales Manager", "Growth Manager"],
    "Revenue Operations": ["Revenue Operations", "Sales Operations"],
    Growth: ["Head of Growth", "Growth Lead"],
    "IC/Individual Contributor": ["Account Executive", "Sales Representative"],
  };

  return map[title] ?? [title];
}

function employeeRange(count?: number) {
  if (!count) return "Unknown";
  if (count <= 10) return "1–10";
  if (count <= 50) return "11–50";
  if (count <= 200) return "51–200";
  if (count <= 500) return "201–500";
  if (count <= 1000) return "500–1000";
  return "1000+";
}

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
