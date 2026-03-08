import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; statId: string }> }
) {
  const { statId } = await params;
  const db = getDb();
  const body = await request.json();

  const fields = [
    "minutes_played", "points", "field_goals_made", "field_goals_attempted",
    "three_pointers_made", "three_pointers_attempted", "free_throws_made",
    "free_throws_attempted", "rebounds_offensive", "rebounds_defensive",
    "assists", "steals", "blocks", "turnovers", "fouls",
  ];

  const setClauses: string[] = [];
  const values: (number | null)[] = [];

  for (const field of fields) {
    if (field in body) {
      setClauses.push(`${field} = ?`);
      values.push(body[field] ?? 0);
    }
  }

  if (setClauses.length > 0) {
    values.push(Number(statId));
    db.prepare(`UPDATE player_game_stats SET ${setClauses.join(", ")} WHERE id = ?`).run(...values);
  }

  return NextResponse.json({ ok: true });
}
