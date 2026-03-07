PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS seasons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    year INTEGER NOT NULL,
    league TEXT,
    start_date TEXT,
    end_date TEXT
);

CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    school TEXT,
    is_our_team INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id INTEGER NOT NULL REFERENCES teams(id),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    jersey_number INTEGER,
    position TEXT CHECK(position IN ('PG', 'SG', 'SF', 'PF', 'C')),
    grade INTEGER CHECK(grade IN (6, 7, 8)),
    active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    season_id INTEGER NOT NULL REFERENCES seasons(id),
    home_team_id INTEGER NOT NULL REFERENCES teams(id),
    away_team_id INTEGER NOT NULL REFERENCES teams(id),
    game_date TEXT NOT NULL,
    game_time TEXT,
    location TEXT,
    home_score INTEGER,
    away_score INTEGER,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'in_progress', 'final')),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS player_game_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL REFERENCES games(id),
    player_id INTEGER NOT NULL REFERENCES players(id),
    minutes_played INTEGER,
    points INTEGER NOT NULL DEFAULT 0,
    field_goals_made INTEGER NOT NULL DEFAULT 0,
    field_goals_attempted INTEGER NOT NULL DEFAULT 0,
    three_pointers_made INTEGER NOT NULL DEFAULT 0,
    three_pointers_attempted INTEGER NOT NULL DEFAULT 0,
    free_throws_made INTEGER NOT NULL DEFAULT 0,
    free_throws_attempted INTEGER NOT NULL DEFAULT 0,
    rebounds_offensive INTEGER NOT NULL DEFAULT 0,
    rebounds_defensive INTEGER NOT NULL DEFAULT 0,
    assists INTEGER NOT NULL DEFAULT 0,
    steals INTEGER NOT NULL DEFAULT 0,
    blocks INTEGER NOT NULL DEFAULT 0,
    turnovers INTEGER NOT NULL DEFAULT 0,
    fouls INTEGER NOT NULL DEFAULT 0,
    UNIQUE(game_id, player_id)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_players_team ON players(team_id);
CREATE INDEX IF NOT EXISTS idx_games_season ON games(season_id);
CREATE INDEX IF NOT EXISTS idx_games_date ON games(game_date);
CREATE INDEX IF NOT EXISTS idx_stats_game ON player_game_stats(game_id);
CREATE INDEX IF NOT EXISTS idx_stats_player ON player_game_stats(player_id);
