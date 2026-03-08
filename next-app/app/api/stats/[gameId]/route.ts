import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await params;
  const db = getDb();
  const stats = db
    .prepare(
      `SELECT s.*, p.first_name, p.last_name, p.jersey_number, p.position
       FROM player_game_stats s
       JOIN players p ON s.player_id = p.id
       WHERE s.game_id = ?
       ORDER BY p.jersey_number`
    )
    .all(gameId);
  return NextResponse.json(stats);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await params;
  const db = getDb();
  const body = await request.json();
  const { player_id } = body;

  const existing = db
    .prepare("SELECT id FROM player_game_stats WHERE game_id = ? AND player_id = ?")
    .get(gameId, player_id);

  if (existing) {
    return NextResponse.json({ error: "Player already has stats for this game" }, { status: 409 });
  }

  const result = db
    .prepare("INSERT INTO player_game_stats (game_id, player_id) VALUES (?, ?)")
    .run(gameId, player_id);

  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
