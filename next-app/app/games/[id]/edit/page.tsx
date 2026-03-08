"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import GameForm from "@/components/GameForm";

interface GameData {
  id: number;
  season_id: number;
  home_team_id: number;
  away_team_id: number;
  game_date: string;
  game_time: string;
  location: string;
  home_score: number | null;
  away_score: number | null;
  status: string;
}

export default function EditGame({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [game, setGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/games/${id}`)
      .then((r) => r.json())
      .then((data) => { setGame(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="flex justify-center py-12"><p className="text-gray-500">Loading...</p></div>;
  }

  if (!game) {
    return <div className="text-center py-12"><p className="text-gray-500">Game not found</p></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/games" className="text-duke-600 hover:underline text-sm">
          &larr; Back to Games
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Edit Game</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <GameForm
          gameId={game.id}
          initialData={{
            season_id: game.season_id,
            home_team_id: game.home_team_id,
            away_team_id: game.away_team_id,
            game_date: game.game_date,
            game_time: game.game_time || "",
            location: game.location || "",
            home_score: game.home_score,
            away_score: game.away_score,
            status: game.status,
          }}
        />
      </div>
    </div>
  );
}
