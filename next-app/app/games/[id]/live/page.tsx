"use client";

import { useState, useEffect, use, useCallback } from "react";
import Link from "next/link";

interface Game {
  id: number;
  home_school: string;
  away_school: string;
  home_score: number | null;
  away_score: number | null;
  home_team_id: number;
  away_team_id: number;
  status: string;
}

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  jersey_number: number;
  position: string | null;
  team_id: number;
}

interface StatLine {
  id: number;
  player_id: number;
  first_name: string;
  last_name: string;
  jersey_number: number;
  position: string | null;
  points: number;
  field_goals_made: number;
  field_goals_attempted: number;
  three_pointers_made: number;
  three_pointers_attempted: number;
  free_throws_made: number;
  free_throws_attempted: number;
  rebounds_offensive: number;
  rebounds_defensive: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
}

type StatKey =
  | "field_goals_made"
  | "three_pointers_made"
  | "free_throws_made"
  | "rebounds_offensive"
  | "rebounds_defensive"
  | "assists"
  | "steals"
  | "blocks"
  | "turnovers"
  | "fouls";

const STAT_BUTTONS: { key: StatKey; label: string; short: string; color: string }[] = [
  { key: "field_goals_made", label: "2PT Made", short: "2PT", color: "bg-green-600" },
  { key: "three_pointers_made", label: "3PT Made", short: "3PT", color: "bg-blue-600" },
  { key: "free_throws_made", label: "FT Made", short: "FT", color: "bg-purple-600" },
  { key: "rebounds_offensive", label: "Off Reb", short: "OREB", color: "bg-amber-600" },
  { key: "rebounds_defensive", label: "Def Reb", short: "DREB", color: "bg-amber-700" },
  { key: "assists", label: "Assist", short: "AST", color: "bg-cyan-600" },
  { key: "steals", label: "Steal", short: "STL", color: "bg-emerald-600" },
  { key: "blocks", label: "Block", short: "BLK", color: "bg-pink-600" },
  { key: "turnovers", label: "Turnover", short: "TO", color: "bg-red-600" },
  { key: "fouls", label: "Foul", short: "PF", color: "bg-orange-600" },
];

export default function LiveGame({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [game, setGame] = useState<Game | null>(null);
  const [stats, setStats] = useState<StatLine[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const loadData = useCallback(async () => {
    const [gameRes, statsRes, playersRes] = await Promise.all([
      fetch(`/api/games/${id}`).then((r) => r.json()),
      fetch(`/api/stats/${id}`).then((r) => r.json()),
      fetch("/api/players").then((r) => r.json()),
    ]);
    setGame(gameRes);
    setStats(statsRes);
    setPlayers(playersRes);
    setHomeScore(gameRes.home_score || 0);
    setAwayScore(gameRes.away_score || 0);
    setLoading(false);
  }, [id]);

  useEffect(() => { loadData(); }, [loadData]);

  const addPlayerToGame = async (playerId: number) => {
    await fetch(`/api/stats/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player_id: playerId }),
    });
    loadData();
  };

  const recordStat = async (statLine: StatLine, statKey: StatKey) => {
    const pointsMap: Partial<Record<StatKey, number>> = {
      field_goals_made: 2,
      three_pointers_made: 3,
      free_throws_made: 1,
    };

    const newValue = statLine[statKey] + 1;
    const update: Record<string, number> = { [statKey]: newValue };

    // Auto-increment attempts for shooting stats
    if (statKey === "field_goals_made") update.field_goals_attempted = statLine.field_goals_attempted + 1;
    if (statKey === "three_pointers_made") update.three_pointers_attempted = statLine.three_pointers_attempted + 1;
    if (statKey === "free_throws_made") update.free_throws_attempted = statLine.free_throws_attempted + 1;

    // Recalculate points
    const fgm = update.field_goals_made ?? statLine.field_goals_made;
    const tpm = update.three_pointers_made ?? statLine.three_pointers_made;
    const ftm = update.free_throws_made ?? statLine.free_throws_made;
    update.points = fgm * 2 + tpm * 3 + ftm * 1;

    await fetch(`/api/stats/${id}/${statLine.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });

    // Update score if it's a scoring stat
    if (statKey in pointsMap) {
      const pts = pointsMap[statKey]!;
      const newHomeScore = homeScore + pts;
      setHomeScore(newHomeScore);
      await fetch(`/api/games/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...game,
          home_score: newHomeScore,
          away_score: awayScore,
          status: "in_progress",
        }),
      });
    }

    loadData();
  };

  const startGame = async () => {
    await fetch(`/api/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...game, status: "in_progress", home_score: homeScore, away_score: awayScore }),
    });
    loadData();
  };

  const endGame = async () => {
    await fetch(`/api/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...game, status: "final", home_score: homeScore, away_score: awayScore }),
    });
    loadData();
  };

  const updateAwayScore = async (delta: number) => {
    const newScore = Math.max(0, awayScore + delta);
    setAwayScore(newScore);
    await fetch(`/api/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...game, home_score: homeScore, away_score: newScore, status: game?.status }),
    });
  };

  if (loading || !game) {
    return <div className="flex justify-center py-12"><p className="text-gray-500">Loading...</p></div>;
  }

  const rosterPlayers = players.filter(
    (p) => p.team_id === game.home_team_id && !stats.some((s) => s.player_id === p.id)
  );

  const selectedStat = stats.find((s) => s.player_id === selectedPlayer);

  return (
    <div className="space-y-4">
      <Link href="/games" className="text-duke-600 hover:underline text-sm">
        &larr; Back to Games
      </Link>

      {/* Scoreboard */}
      <div className="bg-gradient-to-br from-duke-700 to-duke-900 text-white rounded-lg p-4 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <p className="text-sm font-semibold opacity-75">{game.home_school}</p>
            <p className="text-4xl md:text-5xl font-black mt-1">{homeScore}</p>
          </div>
          <div className="text-center">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              game.status === "in_progress" ? "bg-yellow-500 text-black" :
              game.status === "final" ? "bg-green-500" : "bg-blue-500"
            }`}>
              {game.status === "in_progress" ? "LIVE" : game.status === "final" ? "FINAL" : "PRE-GAME"}
            </span>
            <p className="text-2xl font-bold mt-2">vs</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-sm font-semibold opacity-75">{game.away_school}</p>
            <p className="text-4xl md:text-5xl font-black mt-1">{awayScore}</p>
            <div className="flex justify-center gap-1 mt-2">
              <button onClick={() => updateAwayScore(1)} className="bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-xs font-bold">+1</button>
              <button onClick={() => updateAwayScore(2)} className="bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-xs font-bold">+2</button>
              <button onClick={() => updateAwayScore(3)} className="bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-xs font-bold">+3</button>
              <button onClick={() => updateAwayScore(-1)} className="bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-xs font-bold">-1</button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-4">
          {game.status === "scheduled" && (
            <button onClick={startGame} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
              Start Game
            </button>
          )}
          {game.status === "in_progress" && (
            <button onClick={endGame} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
              End Game
            </button>
          )}
        </div>
      </div>

      {/* Add Players */}
      {rosterPlayers.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Add player to game:</p>
          <div className="flex flex-wrap gap-2">
            {rosterPlayers.map((p) => (
              <button
                key={p.id}
                onClick={() => addPlayerToGame(p.id)}
                className="bg-gray-100 hover:bg-duke-100 border border-gray-300 px-3 py-1 rounded text-sm font-semibold"
              >
                #{p.jersey_number} {p.last_name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Player Select + Stat Buttons */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Player List */}
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="bg-duke-700 text-white px-4 py-2 text-sm font-semibold">
              Players
            </div>
            <div className="divide-y">
              {stats.map((s) => (
                <button
                  key={s.player_id}
                  onClick={() => setSelectedPlayer(s.player_id)}
                  className={`w-full text-left px-4 py-3 flex justify-between items-center transition ${
                    selectedPlayer === s.player_id
                      ? "bg-duke-100 border-l-4 border-duke-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <span className="font-bold text-duke-700 mr-2">#{s.jersey_number}</span>
                    <span className="font-semibold text-sm">{s.first_name} {s.last_name}</span>
                  </div>
                  <span className="text-lg font-black text-duke-700">{s.points}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stat Buttons */}
          <div className="lg:col-span-2">
            {selectedStat ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  <h3 className="font-bold text-lg mb-1">
                    #{selectedStat.jersey_number} {selectedStat.first_name} {selectedStat.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedStat.position || "—"}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {STAT_BUTTONS.map((btn) => (
                    <button
                      key={btn.key}
                      onClick={() => recordStat(selectedStat, btn.key)}
                      className={`${btn.color} hover:opacity-90 text-white rounded-lg p-3 text-center transition`}
                    >
                      <p className="text-lg font-black">{selectedStat[btn.key]}</p>
                      <p className="text-xs font-semibold mt-1">{btn.short}</p>
                    </button>
                  ))}
                </div>

                {/* Shooting Summary */}
                <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  <h4 className="font-semibold text-sm text-gray-600 mb-3">Shooting</h4>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <p className="text-gray-500">FG</p>
                      <p className="font-bold">{selectedStat.field_goals_made}/{selectedStat.field_goals_attempted}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">3PT</p>
                      <p className="font-bold">{selectedStat.three_pointers_made}/{selectedStat.three_pointers_attempted}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">FT</p>
                      <p className="font-bold">{selectedStat.free_throws_made}/{selectedStat.free_throws_attempted}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 border border-gray-200 text-center">
                <p className="text-gray-400 text-lg">Select a player to record stats</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
