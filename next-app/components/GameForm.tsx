"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Team {
  id: number;
  name: string;
  school: string;
}

interface Season {
  id: number;
  name: string;
}

interface GameFormProps {
  initialData?: {
    season_id: number;
    home_team_id: number;
    away_team_id: number;
    game_date: string;
    game_time: string;
    location: string;
    home_score: number | null;
    away_score: number | null;
    status: string;
  };
  gameId?: number;
}

export default function GameForm({ initialData, gameId }: GameFormProps) {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    season_id: initialData?.season_id || 0,
    home_team_id: initialData?.home_team_id || 0,
    away_team_id: initialData?.away_team_id || 0,
    game_date: initialData?.game_date || "",
    game_time: initialData?.game_time || "",
    location: initialData?.location || "",
    home_score: initialData?.home_score ?? "",
    away_score: initialData?.away_score ?? "",
    status: initialData?.status || "scheduled",
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/teams").then((r) => r.json()),
      fetch("/api/seasons").then((r) => r.json()),
    ]).then(([t, s]) => {
      setTeams(t);
      setSeasons(s);
      if (!initialData && s.length > 0) {
        setForm((f) => ({ ...f, season_id: s[0].id }));
      }
    });
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      home_score: form.home_score === "" ? null : Number(form.home_score),
      away_score: form.away_score === "" ? null : Number(form.away_score),
    };

    if (gameId) {
      await fetch(`/api/games/${gameId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    router.push("/games");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Season</label>
        <select
          value={form.season_id}
          onChange={(e) => setForm({ ...form, season_id: Number(e.target.value) })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          required
        >
          <option value={0} disabled>Select season</option>
          {seasons.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Home Team</label>
          <select
            value={form.home_team_id}
            onChange={(e) => setForm({ ...form, home_team_id: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            required
          >
            <option value={0} disabled>Select team</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.school}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Away Team</label>
          <select
            value={form.away_team_id}
            onChange={(e) => setForm({ ...form, away_team_id: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            required
          >
            <option value={0} disabled>Select team</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.school}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={form.game_date}
            onChange={(e) => setForm({ ...form, game_date: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
          <input
            type="time"
            value={form.game_time}
            onChange={(e) => setForm({ ...form, game_time: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          placeholder="e.g. Central Gym"
        />
      </div>

      {gameId && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Home Score</label>
              <input
                type="number"
                value={form.home_score}
                onChange={(e) => setForm({ ...form, home_score: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Away Score</label>
              <input
                type="number"
                value={form.away_score}
                onChange={(e) => setForm({ ...form, away_score: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="final">Final</option>
            </select>
          </div>
        </>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-duke-700 hover:bg-duke-800 text-white px-6 py-2 rounded-lg font-semibold text-sm transition disabled:opacity-50"
        >
          {saving ? "Saving..." : gameId ? "Update Game" : "Create Game"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/games")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold text-sm transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
