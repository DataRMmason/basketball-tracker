import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export function GET() {
  const db = getDb();
  const teams = db.prepare("SELECT * FROM teams ORDER BY name").all();
  return NextResponse.json(teams);
}
