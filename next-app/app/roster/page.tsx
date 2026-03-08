"use client";

import { useState, useEffect } from "react";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  jersey_number: number;
  position: string | null;
  grade: number | null;
  team_id: number;
  school: string;
}

const POSITIONS = ["PG", "SG", "SF", "PF", "C"];
const GRADES = [6, 7, 8];

export default function Roster() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    jersey_number: "",
    position: "",
    grade: "",
  });

  const loadPlayers = () => {
    fetch("/api/players")
      .then((r) => r.json())
      .then((data) => { setPlayers(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadPlayers(); }, []);

  const resetForm = () => {
    setForm({ first_name: "", last_name: "", jersey_number: "", position: "", grade: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (p: Player) => {
    setForm({
      first_name: p.first_name,
      last_name: p.last_name,
      jersey_number: String(p.jersey_number),
      position: p.position || "",
      grade: p.grade ? String(p.grade) : "",
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      team_id: 1,
      first_name: form.first_name,
      last_name: form.last_name,
      jersey_number: Number(form.jersey_number),
      position: form.position || null,
      grade: form.grade ? Number(form.grade) : null,
      active: 1,
    };

    if (editingId) {
      await fetch(`/api/players/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    resetForm();
    loadPlayers();
  };

  const handleRemove = async (id: number) => {
    if (!confirm("Remove this player from the roster?")) return;
    await fetch(`/api/players/${id}`, { method: "DELETE" });
    loadPlayers();
  };

  if (loading) {
    return <div className="flex justify-center py-12"><p className="text-gray-500">Loading...</p></div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Roster</h1>
          <p className="text-gray-600 text-sm mt-1">{players.length} players</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-duke-700 hover:bg-duke-800 text-white px-4 md:px-6 py-2 rounded-lg transition font-semibold text-sm md:text-base"
        >
          Add Player
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Player" : "Add Player"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Jersey #</label>
                <input
                  type="number"
                  value={form.jersey_number}
                  onChange={(e) => setForm({ ...form, jersey_number: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  required
                  min={0}
                  max={99}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Position</label>
                <select
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">—</option>
                  {POSITIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Grade</label>
                <select
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">—</option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-duke-700 hover:bg-duke-800 text-white px-6 py-2 rounded-lg font-semibold text-sm transition"
              >
                {editingId ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold text-sm transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Roster Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-duke-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-center">Position</th>
                <th className="px-4 py-3 text-center">Grade</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, idx) => (
                <tr key={p.id} className={`border-t ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <td className="px-4 py-3 font-bold text-duke-700">{p.jersey_number}</td>
                  <td className="px-4 py-3 font-semibold">{p.first_name} {p.last_name}</td>
                  <td className="px-4 py-3 text-center">{p.position || "—"}</td>
                  <td className="px-4 py-3 text-center">{p.grade || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => startEdit(p)} className="text-duke-600 hover:underline text-sm mr-3">Edit</button>
                    <button onClick={() => handleRemove(p.id)} className="text-red-600 hover:underline text-sm">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-2 p-4">
          {players.map((p) => (
            <div key={p.id} className="p-4 rounded-lg border-l-4 border-duke-700 bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{p.first_name} {p.last_name}</p>
                  <p className="text-xs text-gray-500">#{p.jersey_number} • {p.position || "—"} • Grade {p.grade || "—"}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className="text-duke-600 text-xs font-semibold">Edit</button>
                  <button onClick={() => handleRemove(p.id)} className="text-red-600 text-xs font-semibold">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
