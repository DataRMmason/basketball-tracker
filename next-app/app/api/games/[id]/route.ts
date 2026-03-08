import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();
  const game = db
    .prepare(
      `SELECT g.*,
        ht.name as home_team_name, ht.school as home_school,
        at.name as away_team_name, at.school as away_school
       FROM games g
       JOIN teams ht ON g.home_team_id = ht.id
       JOIN teams at ON g.away_team_id = at.id
       WHERE g.id = ?`
    )
    .get(id);

  if (!game) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(game);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();
  const body = await request.json();
  const { home_team_id, away_team_id, game_date, game_time, location, home_score, away_score, status } = body;

  db.prepare(
    `UPDATE games SET home_team_id = ?, away_team_id = ?, game_date = ?, game_time = ?,
     location = ?, home_score = ?, away_score = ?, status = ? WHERE id = ?`
  ).run(home_team_id, away_team_id, game_date, game_time || null, location || null,
        home_score ?? null, away_score ?? null, status, id);

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM player_game_stats WHERE game_id = ?").run(id);
  db.prepare("DELETE FROM games WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}
