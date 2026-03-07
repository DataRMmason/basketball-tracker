import Link from "next/link";

interface PlayerStats {
  id: number;
  firstName: string;
  lastName: string;
  number: number;
  position: string;
  team: string;
  grade: number;
  stats: {
    gamesPlayed: number;
    points: number;
    assists: number;
    rebounds: number;
    steals: number;
    blocks: number;
    fouls: number;
    turnovers: number;
    fieldGoalPercentage: number;
    threePointPercentage: number;
    freeThrowPercentage: number;
  };
}

const DUMMY_PLAYERS: Record<string, PlayerStats> = {
  "1": {
    id: 1,
    firstName: "Marcus",
    lastName: "Johnson",
    number: 5,
    position: "SG",
    team: "Central Middle School",
    grade: 8,
    stats: {
      gamesPlayed: 8,
      points: 144,
      assists: 28,
      rebounds: 42,
      steals: 15,
      blocks: 4,
      fouls: 18,
      turnovers: 22,
      fieldGoalPercentage: 48.5,
      threePointPercentage: 35.2,
      freeThrowPercentage: 72.0,
    },
  },
  "2": {
    id: 2,
    firstName: "DeShawn",
    lastName: "Lee",
    number: 12,
    position: "PG",
    team: "Central Middle School",
    grade: 7,
    stats: {
      gamesPlayed: 8,
      points: 98,
      assists: 72,
      rebounds: 35,
      steals: 24,
      blocks: 2,
      fouls: 12,
      turnovers: 28,
      fieldGoalPercentage: 42.1,
      threePointPercentage: 30.8,
      freeThrowPercentage: 68.5,
    },
  },
  "3": {
    id: 3,
    firstName: "Jamal",
    lastName: "Williams",
    number: 23,
    position: "SF",
    team: "Central Middle School",
    grade: 8,
    stats: {
      gamesPlayed: 8,
      points: 127,
      assists: 45,
      rebounds: 68,
      steals: 18,
      blocks: 8,
      fouls: 20,
      turnovers: 15,
      fieldGoalPercentage: 51.2,
      threePointPercentage: 28.6,
      freeThrowPercentage: 75.0,
    },
  },
  "4": {
    id: 4,
    firstName: "Andre",
    lastName: "Davis",
    number: 14,
    position: "PF",
    team: "Central Middle School",
    grade: 8,
    stats: {
      gamesPlayed: 8,
      points: 89,
      assists: 18,
      rebounds: 94,
      steals: 8,
      blocks: 16,
      fouls: 24,
      turnovers: 12,
      fieldGoalPercentage: 55.3,
      threePointPercentage: 15.0,
      freeThrowPercentage: 62.0,
    },
  },
  "5": {
    id: 5,
    firstName: "Chris",
    lastName: "Thompson",
    number: 31,
    position: "C",
    team: "Central Middle School",
    grade: 7,
    stats: {
      gamesPlayed: 8,
      points: 76,
      assists: 12,
      rebounds: 112,
      steals: 5,
      blocks: 22,
      fouls: 28,
      turnovers: 18,
      fieldGoalPercentage: 58.1,
      threePointPercentage: 0.0,
      freeThrowPercentage: 55.0,
    },
  },
  "6": {
    id: 6,
    firstName: "Brandon",
    lastName: "Martinez",
    number: 10,
    position: "SG",
    team: "Central Middle School",
    grade: 6,
    stats: {
      gamesPlayed: 6,
      points: 65,
      assists: 35,
      rebounds: 28,
      steals: 12,
      blocks: 3,
      fouls: 10,
      turnovers: 20,
      fieldGoalPercentage: 40.5,
      threePointPercentage: 33.3,
      freeThrowPercentage: 70.0,
    },
  },
};

export default async function PlayerDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = DUMMY_PLAYERS[id];

  if (!player) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Player not found</p>
        <Link href="/players" className="text-basketball-600 hover:underline">
          Back to Players
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/players"
        className="text-basketball-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Players
      </Link>

      {/* Player Header */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              {player.firstName} {player.lastName}
            </h1>
            <p className="text-gray-600 mt-2">
              {player.team} &bull; Grade {player.grade}
            </p>
          </div>
          <div className="text-center bg-basketball-100 rounded-lg p-4">
            <p className="text-5xl font-bold text-basketball-600">
              #{player.number}
            </p>
            <p className="text-lg font-semibold text-basketball-700 mt-2">
              {player.position}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-gray-500 text-sm">Games Played</p>
          <p className="text-3xl font-bold text-basketball-600">
            {player.stats.gamesPlayed}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-gray-500 text-sm">Points</p>
          <p className="text-3xl font-bold text-basketball-600">
            {player.stats.points}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-gray-500 text-sm">Assists</p>
          <p className="text-3xl font-bold text-blue-600">
            {player.stats.assists}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-gray-500 text-sm">Rebounds</p>
          <p className="text-3xl font-bold text-green-600">
            {player.stats.rebounds}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-gray-500 text-sm">Steals</p>
          <p className="text-3xl font-bold text-purple-600">
            {player.stats.steals}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-gray-500 text-sm">Blocks</p>
          <p className="text-3xl font-bold text-pink-600">
            {player.stats.blocks}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-gray-500 text-sm">Turnovers</p>
          <p className="text-3xl font-bold text-red-600">
            {player.stats.turnovers}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-gray-500 text-sm">Fouls</p>
          <p className="text-3xl font-bold text-orange-600">
            {player.stats.fouls}
          </p>
        </div>
      </div>

      {/* Shooting Percentages */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Shooting Percentages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 mb-2">Field Goal %</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-basketball-600 h-4 rounded-full"
                style={{
                  width: `${player.stats.fieldGoalPercentage}%`,
                }}
              ></div>
            </div>
            <p className="text-sm font-semibold mt-2">
              {player.stats.fieldGoalPercentage.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Three Point %</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{
                  width: `${player.stats.threePointPercentage}%`,
                }}
              ></div>
            </div>
            <p className="text-sm font-semibold mt-2">
              {player.stats.threePointPercentage.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Free Throw %</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full"
                style={{
                  width: `${player.stats.freeThrowPercentage}%`,
                }}
              ></div>
            </div>
            <p className="text-sm font-semibold mt-2">
              {player.stats.freeThrowPercentage.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
