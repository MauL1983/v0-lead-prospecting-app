import { NextResponse } from "next/server";
import { searchLeads } from "@/lib/leads/providers";
import { defaultFilters } from "@/lib/leads/search";
import type { SearchFilters } from "@/lib/leads/types";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<SearchFilters>;
  const filters: SearchFilters = {
    ...defaultFilters,
    ...body,
    industries: body.industries ?? defaultFilters.industries,
    companySizes: body.companySizes ?? defaultFilters.companySizes,
    titles: body.titles ?? defaultFilters.titles,
    geos: body.geos ?? defaultFilters.geos,
    countries: body.countries ?? defaultFilters.countries,
    techStack: body.techStack ?? defaultFilters.techStack,
    intentOnly: body.intentOnly ?? defaultFilters.intentOnly,
  };

  return NextResponse.json(await searchLeads(filters));
}
