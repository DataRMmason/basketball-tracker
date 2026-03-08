import Link from "next/link";
import GameForm from "@/components/GameForm";

export default function NewGame() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/games" className="text-duke-600 hover:underline text-sm">
          &larr; Back to Games
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Add Game</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <GameForm />
      </div>
    </div>
  );
}
