import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export function GET() {
  const db = getDb();
  const players = db
    .prepare(
      `SELECT p.*, t.name as team_name, t.school
       FROM players p
       JOIN teams t ON p.team_id = t.id
       WHERE p.active = 1
       ORDER BY p.last_name, p.first_name`
    )
    .all();
  return NextResponse.json(players);
}

export async function POST(request: NextRequest) {
  const db = getDb();
  const body = await request.json();
  const { team_id, first_name, last_name, jersey_number, position, grade } = body;

  const result = db
    .prepare(
      "INSERT INTO players (team_id, first_name, last_name, jersey_number, position, grade) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(team_id, first_name, last_name, jersey_number, position || null, grade || null);

  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
