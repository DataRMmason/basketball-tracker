import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export function GET() {
  const db = getDb();
  const games = db
    .prepare(
      `SELECT g.*,
        ht.name as home_team_name, ht.school as home_school,
        at.name as away_team_name, at.school as away_school
       FROM games g
       JOIN teams ht ON g.home_team_id = ht.id
       JOIN teams at ON g.away_team_id = at.id
       ORDER BY g.game_date DESC`
    )
    .all();
  return NextResponse.json(games);
}

export async function POST(request: NextRequest) {
  const db = getDb();
  const body = await request.json();
  const { season_id, home_team_id, away_team_id, game_date, game_time, location } = body;

  const result = db
    .prepare(
      "INSERT INTO games (season_id, home_team_id, away_team_id, game_date, game_time, location) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(season_id, home_team_id, away_team_id, game_date, game_time || null, location || null);

  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
