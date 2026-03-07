"use client";

import { useState } from "react";
import GameCard from "@/components/GameCard";

interface Game {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time?: string;
  status: "scheduled" | "in_progress" | "final";
  location?: string;
}

const DUMMY_GAMES: Game[] = [
  {
    id: 1,
    homeTeam: "Central Middle School",
    awayTeam: "Lincoln Middle School",
    homeScore: 62,
    awayScore: 58,
    date: "March 5, 2026",
    time: "6:30 PM",
    status: "final",
    location: "Central Gym",
  },
  {
    id: 2,
    homeTeam: "Jefferson Middle School",
    awayTeam: "Central Middle School",
    homeScore: 55,
    awayScore: 61,
    date: "March 2, 2026",
    time: "6:00 PM",
    status: "final",
    location: "Jefferson Gym",
  },
  {
    id: 3,
    homeTeam: "Central Middle School",
    awayTeam: "Roosevelt Middle School",
    date: "March 10, 2026",
    time: "6:00 PM",
    status: "scheduled",
    location: "Central Gym",
  },
  {
    id: 4,
    homeTeam: "Washington Middle School",
    awayTeam: "Central Middle School",
    date: "March 14, 2026",
    time: "7:00 PM",
    status: "scheduled",
    location: "Washington Gym",
  },
];

export default function Games() {
  const [filter, setFilter] = useState<"all" | "scheduled" | "final">("all");

  const filteredGames = DUMMY_GAMES.filter((g) => {
    if (filter === "all") return true;
    return g.status === filter;
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Games
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {filteredGames.length} games
          </p>
        </div>
        <button className="bg-duke-700 hover:bg-duke-800 text-white px-4 md:px-6 py-2 rounded-lg transition font-semibold text-sm md:text-base">
          Log New Game
        </button>
      </div>

      {/* Filter Buttons */}
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

      {/* Games List */}
      {filteredGames.length > 0 ? (
        <div className="space-y-3 md:space-y-4">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              homeTeam={game.homeTeam}
              awayTeam={game.awayTeam}
              homeScore={game.homeScore}
              awayScore={game.awayScore}
              date={game.date}
              time={game.time}
              status={game.status}
              location={game.location}
            />
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
