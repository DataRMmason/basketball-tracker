"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GameCard from "@/components/GameCard";

interface Game {
  id: number;
  home_school: string;
  away_school: string;
  home_score: number | null;
  away_score: number | null;
  game_date: string;
  game_time: string | null;
  status: "scheduled" | "in_progress" | "final";
  location: string | null;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatTime(timeStr: string | null) {
  if (!timeStr) return undefined;
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h > 12 ? h - 12 : h || 12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [filter, setFilter] = useState<"all" | "scheduled" | "final">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/games")
      .then((r) => r.json())
      .then((data) => { setGames(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this game?")) return;
    await fetch(`/api/games/${id}`, { method: "DELETE" });
    setGames(games.filter((g) => g.id !== id));
  };

  const filteredGames = games.filter((g) => {
    if (filter === "all") return true;
    return g.status === filter;
  });

  if (loading) {
    return <div className="flex justify-center py-12"><p className="text-gray-500">Loading...</p></div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Games</h1>
          <p className="text-gray-600 text-sm mt-1">{filteredGames.length} games</p>
        </div>
        <Link
          href="/games/new"
          className="bg-duke-700 hover:bg-duke-800 text-white px-4 md:px-6 py-2 rounded-lg transition font-semibold text-sm md:text-base text-center"
        >
          Add Game
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {(["all", "scheduled", "final"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 md:px-4 py-2 rounded-lg transition capitalize text-sm md:text-base font-semibold whitespace-nowrap ${
              filter === f
                ? "bg-duke-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredGames.length > 0 ? (
        <div className="space-y-3 md:space-y-4">
          {filteredGames.map((game) => (
            <div key={game.id} className="relative">
              <GameCard
                homeTeam={game.home_school}
                awayTeam={game.away_school}
                homeScore={game.home_score ?? undefined}
                awayScore={game.away_score ?? undefined}
                date={formatDate(game.game_date)}
                time={formatTime(game.game_time)}
                status={game.status}
                location={game.location ?? undefined}
              />
              <div className="absolute top-2 right-2 flex gap-1">
                {(game.status === "scheduled" || game.status === "in_progress") && (
                  <Link
                    href={`/games/${game.id}/live`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1 rounded font-semibold"
                  >
                    Live
                  </Link>
                )}
                <Link
                  href={`/games/${game.id}/edit`}
                  className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded font-semibold"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(game.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold"
                >
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No games found</p>
        </div>
      )}
    </div>
  );
}
