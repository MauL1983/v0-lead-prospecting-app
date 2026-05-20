import { NextResponse } from "next/server";
import { getIntegrationStatus } from "@/lib/leads/providers";

export function GET() {
  return NextResponse.json({ integrations: getIntegrationStatus() });
}
