import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();
  const body = await request.json();
  const { first_name, last_name, jersey_number, position, grade, active } = body;

  db.prepare(
    `UPDATE players SET first_name = ?, last_name = ?, jersey_number = ?,
     position = ?, grade = ?, active = ? WHERE id = ?`
  ).run(first_name, last_name, jersey_number, position || null, grade || null, active ?? 1, id);

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();
  db.prepare("UPDATE players SET active = 0 WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}
