import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export function GET() {
  const db = getDb();
  const seasons = db.prepare("SELECT * FROM seasons ORDER BY year DESC").all();
  return NextResponse.json(seasons);
}
