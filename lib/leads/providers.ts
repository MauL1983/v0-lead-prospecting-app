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

type ApolloOrganization = {
  id?: string;
  alexa_ranking?: number;
  annual_revenue_printed?: string;
  blog_url?: string;
  estimated_annual_revenue?: number;
  facebook_url?: string;
  keywords?: string[];
  name?: string;
  website_url?: string;
  primary_domain?: string;
  linkedin_url?: string;
  phone?: string;
  city?: string;
  short_description?: string;
  state?: string;
  country?: string;
  industry?: string;
  estimated_num_employees?: number;
  founded_year?: number;
};

type ApolloSearchOptions = {
  includeCompanySizes?: boolean;
  includeEmailStatus?: boolean;
  includeIndustries?: boolean;
  includeTechStack?: boolean;
  includeTitles?: boolean;
  keywords?: string;
  note: string;
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
        resultType: "leads",
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
    resultType: "leads",
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
  const attempts: ApolloSearchOptions[] = [
    {
      includeCompanySizes: true,
      includeEmailStatus: true,
      includeIndustries: true,
      includeTechStack: true,
      includeTitles: true,
      note: "Live Apollo people search is active.",
    },
    {
      includeCompanySizes: true,
      includeTitles: true,
      keywords: filters.query,
      note: "Live Apollo people search is active with relaxed enrichment filters.",
    },
    {
      includeTitles: true,
      keywords: buildBroadApolloQuery(filters),
      note: "Live Apollo people search is active with broad territory matching.",
    },
    {
      keywords: buildBroadApolloQuery(filters),
      note: "Live Apollo people search is active with broad company matching.",
    },
  ];

  for (const attempt of attempts) {
    const leads = await runApolloPeopleSearch(filters, attempt);
    if (leads.length > 0) {
      return {
        provider: "Apollo",
        providerMode: "live",
        resultType: "leads",
        total: leads.length,
        searchedAt: new Date().toISOString(),
        leads,
        notes: [
          attempt.note,
          "Results are ready to review, save, or export.",
        ],
      };
    }
  }

  const companies = await runApolloOrganizationSearch(filters);
  if (companies.length > 0) {
    return {
      provider: "Apollo",
      providerMode: "live",
      resultType: "accounts",
      total: companies.length,
      searchedAt: new Date().toISOString(),
      leads: companies,
      notes: [
        "Live Apollo company search is active.",
        "Showing matched companies first. Add target roles to find contacts inside these accounts.",
      ],
    };
  }

  return {
    provider: "Apollo",
    providerMode: "live",
    resultType: "leads",
    total: 0,
    searchedAt: new Date().toISOString(),
    leads: [],
    notes: [
      "Live Apollo people search is active, but this query returned 0 matches.",
      "Try a broader search such as mantenimiento Mexico, limpieza Mexico, seguridad Mexico, or property management Mexico.",
    ],
  };
}

async function runApolloOrganizationSearch(filters: SearchFilters) {
  const endpoint =
    process.env.APOLLO_ORGANIZATION_SEARCH_URL ??
    "https://api.apollo.io/api/v1/mixed_companies/search";
  const attempts = [
    {
      keywords: buildBroadApolloQuery(filters),
      industries: [
        "facilities services",
        "security and investigations",
        "consumer services",
        "construction",
        "environmental services",
        "business supplies and equipment",
      ],
      includeCompanySizes: true,
    },
    {
      keywords: "facility management OR facilities services OR mantenimiento OR limpieza OR seguridad privada OR servicios generales",
      industries: [],
      includeCompanySizes: true,
    },
    {
      keywords: "mantenimiento OR limpieza OR seguridad privada OR servicios generales",
      industries: [],
      includeCompanySizes: false,
    },
  ];

  for (const attempt of attempts) {
    const url = new URL(endpoint);

    appendParam(url, "q_keywords", attempt.keywords);
    inferCountries(filters).forEach((country) => {
      appendParam(url, "organization_locations[]", country);
    });
    if (attempt.includeCompanySizes) {
      filters.companySizes.map(mapEmployeeRangeToApollo).forEach((range) => {
        appendParam(url, "organization_num_employees_ranges[]", range);
      });
    }
    attempt.industries.forEach((industry) => {
      appendParam(url, "q_organization_keyword_tags[]", industry);
    });
    appendParam(url, "page", "1");
    appendParam(url, "per_page", "25");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "X-Api-Key": process.env.APOLLO_API_KEY ?? "",
      },
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Apollo organization search returned ${response.status}${details ? `: ${details}` : ""}`);
    }

    const payload = (await response.json()) as { organizations?: ApolloOrganization[] };
    const organizations = shouldApplyFacilityRelevance(filters)
      ? (payload.organizations ?? []).filter(isRelevantFacilityOrganization)
      : payload.organizations ?? [];
    if (organizations.length > 0) {
      return organizations.map((organization, index) =>
        normalizeApolloOrganization(organization, filters, index),
      );
    }
  }

  return [];
}

async function runApolloPeopleSearch(filters: SearchFilters, options: ApolloSearchOptions) {
  const endpoint =
    process.env.APOLLO_PEOPLE_SEARCH_URL ??
    "https://api.apollo.io/api/v1/mixed_people/api_search";
  const url = new URL(endpoint);

  appendParam(url, "q_keywords", options.keywords ?? filters.query);
  if (options.includeTitles) {
    filters.titles.flatMap(mapTitleToApolloTitles).forEach((title) => {
      appendParam(url, "person_titles[]", title);
    });
  }
  inferCountries(filters).forEach((country) => {
    appendParam(url, "organization_locations[]", country);
  });
  if (options.includeCompanySizes) {
    filters.companySizes.map(mapEmployeeRangeToApollo).forEach((range) => {
      appendParam(url, "organization_num_employees_ranges[]", range);
    });
  }
  if (options.includeIndustries) {
    filters.industries.filter((industry) => industry !== "Other").forEach((industry) => {
      appendParam(url, "q_organization_keyword_tags[]", industry);
    });
  }
  if (options.includeTechStack) {
    mapTechStackToApolloTechnologyUids(filters.techStack).forEach((uid) => {
      appendParam(url, "currently_using_any_of_technology_uids[]", uid);
    });
  }
  if (options.includeEmailStatus) {
    appendParam(url, "contact_email_status[]", "verified");
  }
  appendParam(url, "page", "1");
  appendParam(url, "per_page", "25");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "X-Api-Key": process.env.APOLLO_API_KEY ?? "",
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Apollo returned ${response.status}${details ? `: ${details}` : ""}`);
  }

  const payload = (await response.json()) as { people?: ApolloPerson[] };
  return (payload.people ?? []).map((person, index) =>
    normalizeApolloPerson(person, filters, index),
  );
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

function normalizeApolloOrganization(
  organization: ApolloOrganization,
  filters: SearchFilters,
  index: number,
): Lead {
  const company = organization.name ?? "Unknown company";
  const country = organization.country ?? filters.countries[0] ?? "Mexico";
  const city = organization.city ?? organization.state ?? "Mexico";
  const website = stripProtocol(organization.website_url ?? organization.primary_domain ?? "");
  const initials = company
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    id: organization.id ?? `apollo_org_${index}`,
    name: `${company} Leadership`,
    initials: initials || "CO",
    title: "Target account",
    company,
    industry: "Company Match",
    companySize: employeeRange(organization.estimated_num_employees),
    location: `${city}, ${country}`,
    email: "Add contact search",
    linkedin: stripProtocol(organization.linkedin_url ?? "linkedin.com"),
    fitScore: Math.max(70, 96 - index * 2),
    fitReasons: [
      "Matched facility-services search terms",
      "Account fits the selected Mexico territory",
      "Use this company as a target account for contact discovery",
    ],
    aiInsight: `${company} matches the account search. Next step: search operations, facilities, sales, or general management contacts at this company.`,
    recentSignal: "Found through live Apollo company search",
    status: "new",
    lastActivity: "Found just now",
    companyFounded: organization.founded_year ? String(organization.founded_year) : "Unknown",
    companyHQ: city,
    companyWebsite: website,
    bio: `${company} is a live Apollo company search result for the selected ICP.`,
    region: filters.geos[0] ?? "Latin America",
    country,
    techStack: [],
    verification: "not_requested",
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

function appendParam(url: URL, key: string, value?: string) {
  if (value) url.searchParams.append(key, value);
}

function mapEmployeeRangeToApollo(range: string) {
  const map: Record<string, string> = {
    "1–10": "1,10",
    "11–50": "11,50",
    "51–200": "51,200",
    "201–500": "201,500",
    "500–1000": "500,1000",
    "1000+": "1001,100000",
  };

  return map[range] ?? range.replace("–", ",").replace("+", ",100000");
}

function mapTechStackToApolloTechnologyUids(techStack: string[]) {
  const map: Record<string, string> = {
    HubSpot: "hubspot",
    Salesforce: "salesforce",
    "Microsoft Dynamics": "microsoft_dynamics",
    "Zoho CRM": "zoho_crm",
    SAP: "sap",
    Oracle: "oracle",
    "Microsoft 365": "microsoft_office_365",
    "Google Workspace": "google_workspace",
    ServiceNow: "servicenow",
    "Monday.com": "monday_com",
    Odoo: "odoo",
    NetSuite: "netsuite",
  };

  return [...new Set(techStack.map((tech) => map[tech]).filter(Boolean))];
}

function buildBroadApolloQuery(filters: SearchFilters) {
  if (!shouldApplyFacilityRelevance(filters)) {
    return filters.query;
  }

  return "facility management OR facilities services OR mantenimiento OR limpieza OR seguridad privada OR servicios generales";
}

function shouldApplyFacilityRelevance(filters: SearchFilters) {
  const query = filters.query.toLowerCase();
  const facilityTerms = [
    "facility management",
    "facilities management",
    "property management",
    "building maintenance",
    "facilities services",
    "mantenimiento",
    "limpieza",
    "seguridad privada",
    "servicios generales",
    "administracion de inmuebles",
    "mantenimiento industrial",
  ];

  return (
    facilityTerms.some((term) => query.includes(term)) ||
    query.includes("facility") ||
    query.includes("facilities")
  );
}

function isRelevantFacilityOrganization(organization: ApolloOrganization) {
  const allowedIndustries = [
    "facilities services",
    "security and investigations",
    "consumer services",
    "construction",
    "environmental services",
    "business supplies and equipment",
  ];
  const requiredTerms = [
    "facility",
    "facilities",
    "mantenimiento",
    "limpieza",
    "seguridad",
    "servicios generales",
    "janitorial",
    "cleaning",
    "security",
    "maintenance",
    "hvac",
    "cctv",
    "building services",
    "property services",
  ];
  const blockedTerms = [
    "forbes",
    "media",
    "publishing",
    "newspaper",
    "magazine",
    "real estate",
    "bank",
    "university",
  ];
  const haystack = [
    organization.name,
    organization.industry,
    organization.short_description,
    organization.website_url,
    organization.primary_domain,
    organization.linkedin_url,
    organization.blog_url,
    organization.facebook_url,
    organization.annual_revenue_printed,
    organization.keywords?.join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const industry = organization.industry?.toLowerCase() ?? "";

  if (blockedTerms.some((term) => haystack.includes(term))) return false;

  return (
    allowedIndustries.some((allowedIndustry) => industry.includes(allowedIndustry)) ||
    requiredTerms.some((term) => haystack.includes(term))
  );
}
