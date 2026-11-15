import { NextResponse } from "next/server";
import { buildPlan, failedPlan } from "@/lib/mock";

// Mock trip-planner endpoint. Body: { prompt: string, index: number, fail?: boolean }
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { index?: number; fail?: boolean };
  if (body.fail) return NextResponse.json(failedPlan);
  return NextResponse.json(buildPlan(Number(body.index) || 0));
}
