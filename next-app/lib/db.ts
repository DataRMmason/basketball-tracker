import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "..", "basketball.db");
const SCHEMA_PATH = path.join(process.cwd(), "..", "schema.sql");

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    const exists = fs.existsSync(DB_PATH);
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");

    if (!exists) {
      const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
      db.exec(schema);
      seed(db);
    }
  }
  return db;
}

function seed(db: Database.Database) {
  const insertSeason = db.prepare(
    "INSERT INTO seasons (name, year, league, start_date, end_date) VALUES (?, ?, ?, ?, ?)"
  );
  insertSeason.run("2025-2026", 2026, "Middle School League", "2025-11-01", "2026-03-15");

  const insertTeam = db.prepare(
    "INSERT INTO teams (name, school, is_our_team) VALUES (?, ?, ?)"
  );
  insertTeam.run("Central Wildcats", "Central Middle School", 1);
  insertTeam.run("Lincoln Lions", "Lincoln Middle School", 0);
  insertTeam.run("Jefferson Eagles", "Jefferson Middle School", 0);
  insertTeam.run("Roosevelt Bears", "Roosevelt Middle School", 0);
  insertTeam.run("Washington Hawks", "Washington Middle School", 0);

  const insertPlayer = db.prepare(
    "INSERT INTO players (team_id, first_name, last_name, jersey_number, position, grade, active) VALUES (?, ?, ?, ?, ?, ?, 1)"
  );
  insertPlayer.run(1, "Marcus", "Johnson", 5, "SG", 8);
  insertPlayer.run(1, "DeShawn", "Lee", 12, "PG", 7);
  insertPlayer.run(1, "Jamal", "Williams", 23, "SF", 8);
  insertPlayer.run(1, "Andre", "Davis", 14, "PF", 8);
  insertPlayer.run(1, "Chris", "Thompson", 31, "C", 7);
  insertPlayer.run(1, "Brandon", "Martinez", 10, "SG", 6);

  const insertGame = db.prepare(
    "INSERT INTO games (season_id, home_team_id, away_team_id, game_date, game_time, location, home_score, away_score, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );
  insertGame.run(1, 1, 2, "2026-03-05", "18:30", "Central Gym", 62, 58, "final");
  insertGame.run(1, 3, 1, "2026-03-02", "18:00", "Jefferson Gym", 55, 61, "final");
  insertGame.run(1, 1, 4, "2026-03-10", "18:00", "Central Gym", null, null, "scheduled");
  insertGame.run(1, 5, 1, "2026-03-14", "19:00", "Washington Gym", null, null, "scheduled");
}
