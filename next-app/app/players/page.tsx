"use client";

import { useState } from "react";
import PlayerCard from "@/components/PlayerCard";

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  number: number;
  position: string;
  team: string;
  career: {
    points: number;
    assists: number;
    rebounds: number;
  };
}

const DUMMY_PLAYERS: Player[] = [
  {
    id: 1,
    firstName: "Marcus",
    lastName: "Johnson",
    number: 5,
    position: "SG",
    team: "Central Middle School",
    career: { points: 144, assists: 28, rebounds: 42 },
  },
  {
    id: 2,
    firstName: "DeShawn",
    lastName: "Lee",
    number: 12,
    position: "PG",
    team: "Central Middle School",
    career: { points: 98, assists: 72, rebounds: 35 },
  },
  {
    id: 3,
    firstName: "Jamal",
    lastName: "Williams",
    number: 23,
    position: "SF",
    team: "Central Middle School",
    career: { points: 127, assists: 45, rebounds: 68 },
  },
  {
    id: 4,
    firstName: "Andre",
    lastName: "Davis",
    number: 14,
    position: "PF",
    team: "Central Middle School",
    career: { points: 89, assists: 18, rebounds: 94 },
  },
  {
    id: 5,
    firstName: "Chris",
    lastName: "Thompson",
    number: 31,
    position: "C",
    team: "Central Middle School",
    career: { points: 76, assists: 12, rebounds: 112 },
  },
  {
    id: 6,
    firstName: "Brandon",
    lastName: "Martinez",
    number: 10,
    position: "SG",
    team: "Central Middle School",
    career: { points: 65, assists: 35, rebounds: 28 },
  },
];

export default function Players() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = DUMMY_PLAYERS.filter((p) =>
    `${p.firstName} ${p.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Players
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {DUMMY_PLAYERS.length} on roster
          </p>
        </div>
        <button className="bg-duke-700 hover:bg-duke-800 text-white px-4 md:px-6 py-2 rounded-lg transition font-semibold text-sm md:text-base">
          Add Player
        </button>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duke-500 text-sm md:text-base"
        />
      </div>

      {/* Players Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              id={player.id}
              firstName={player.firstName}
              lastName={player.lastName}
              number={player.number}
              position={player.position}
              points={player.career.points}
              assists={player.career.assists}
              rebounds={player.career.rebounds}
              team={player.team}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No players found</p>
        </div>
      )}
    </div>
  );
}
