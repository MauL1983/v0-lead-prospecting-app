import type { Region } from "./types";

export const REGIONS: Region[] = [
  "North America",
  "Latin America",
  "Europe",
  "Asia Pacific",
];

export const LATIN_AMERICA_COUNTRIES = [
  "Mexico",
  "Brazil",
  "Colombia",
  "Chile",
  "Argentina",
  "Peru",
];

export const COUNTRIES_BY_REGION: Record<Region, string[]> = {
  "North America": ["United States", "Canada"],
  "Latin America": LATIN_AMERICA_COUNTRIES,
  Europe: ["United Kingdom", "Netherlands", "Spain", "Germany", "France"],
  "Asia Pacific": ["Singapore", "Australia", "India", "Japan"],
};

export const INDUSTRIES = [
  "SaaS / Software",
  "Fintech",
  "Healthcare Tech",
  "E-commerce",
  "Marketing Tech",
  "HR Tech",
  "Cybersecurity",
  "Logistics Tech",
  "Other",
];

export const COMPANY_SIZES = [
  "1–10",
  "11–50",
  "51–200",
  "201–500",
  "500–1000",
  "1000+",
];

export const TITLES = [
  "Founder/CEO",
  "VP / Director",
  "Manager",
  "Revenue Operations",
  "Growth",
  "IC/Individual Contributor",
];
