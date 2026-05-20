export type Region =
  | "North America"
  | "Latin America"
  | "Europe"
  | "Asia Pacific";

export type EmailVerification = "valid" | "risky" | "unknown" | "not_requested";

export type SearchFilters = {
  query: string;
  industries: string[];
  companySizes: string[];
  titles: string[];
  geos: Region[];
  countries: string[];
  techStack: string[];
  intentOnly: boolean;
};

export type LeadSearchResponse = {
  provider: string;
  providerMode: "live" | "demo";
  resultType?: "leads" | "accounts";
  total: number;
  searchedAt: string;
  notes: string[];
  leads: import("@/lib/mock-data").Lead[];
};

export type IntegrationStatus = {
  key: string;
  label: string;
  purpose: string;
  configured: boolean;
  envVars: string[];
};
