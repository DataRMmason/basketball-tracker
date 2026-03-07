import { useParams, Link } from 'react-router-dom'

interface PlayerStats {
  id: number
  firstName: string
  lastName: string
  number: number
  position: string
  team: string
  grade: number
  stats: {
    gamesPlayed: number
    points: number
    assists: number
    rebounds: number
    steals: number
    blocks: number
    fouls: number
    turnovers: number
    fieldGoalPercentage: number
    threePointPercentage: number
    freeThrowPercentage: number
  }
}

const DUMMY_PLAYER_STATS: Record<number, PlayerStats> = {
  1: {
    id: 1,
    firstName: 'Marcus',
    lastName: 'Johnson',
    number: 5,
    position: 'SG',
    team: 'Central Middle School',
    grade: 8,
    stats: {
      gamesPlayed: 8,
      points: 144,
      assists: 28,
      rebounds: 42,
      steals: 16,
      blocks: 4,
      fouls: 18,
      turnovers: 21,
      fieldGoalPercentage: 42.5,
      threePointPercentage: 28.3,
      freeThrowPercentage: 68.0,
    }
  },
  2: {
    id: 2,
    firstName: 'DeShawn',
    lastName: 'Lee',
    number: 12,
    position: 'PG',
    team: 'Central Middle School',
    grade: 8,
    stats: {
      gamesPlayed: 8,
      points: 98,
      assists: 72,
      rebounds: 35,
      steals: 24,
      blocks: 2,
      fouls: 16,
      turnovers: 32,
      fieldGoalPercentage: 38.2,
      threePointPercentage: 22.5,
      freeThrowPercentage: 75.0,
    }
  },
}

export default function PlayerDetail() {
  const { id } = useParams<{ id: string }>()
  const playerId = id ? parseInt(id) : null
  const player = playerId && DUMMY_PLAYER_STATS[playerId] ? DUMMY_PLAYER_STATS[playerId] : null

  if (!player) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Player not found</p>
        <Link to="/players" className="text-duke-600 hover:underline text-sm md:text-base">
          Back to Players
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <Link to="/players" className="text-duke-600 hover:underline mb-4 inline-block text-sm md:text-base">
        ← Back to Players
      </Link>

      {/* Player Header */}
      <div className="bg-gradient-to-br from-duke-700 to-duke-900 text-white rounded-lg shadow-lg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {player.firstName} {player.lastName}
            </h1>
            <p className="text-duke-200 mt-2 text-sm md:text-base">{player.team}</p>
            <p className="text-duke-300 text-xs md:text-sm">Grade {player.grade}</p>
          </div>
          <div className="text-center bg-white bg-opacity-20 rounded-lg p-4 min-w-20">
            <p className="text-4xl md:text-5xl font-bold">#{player.number}</p>
            <p className="text-sm font-semibold mt-2">{player.position}</p>
          </div>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-t-4 border-duke-700">
          <p className="text-gray-500 text-xs md:text-sm">Games</p>
          <p className="text-2xl md:text-3xl font-bold text-duke-700">{player.stats.gamesPlayed}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-t-4 border-duke-700">
          <p className="text-gray-500 text-xs md:text-sm">PPG</p>
          <p className="text-2xl md:text-3xl font-bold text-duke-700">{(player.stats.points / player.stats.gamesPlayed).toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-t-4 border-blue-600">
          <p className="text-gray-500 text-xs md:text-sm">APG</p>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{(player.stats.assists / player.stats.gamesPlayed).toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-t-4 border-green-600">
          <p className="text-gray-500 text-xs md:text-sm">RPG</p>
          <p className="text-2xl md:text-3xl font-bold text-green-600">{(player.stats.rebounds / player.stats.gamesPlayed).toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-t-4 border-purple-600">
          <p className="text-gray-500 text-xs md:text-sm">Steals</p>
          <p className="text-2xl md:text-3xl font-bold text-purple-600">{player.stats.steals}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-t-4 border-pink-600">
          <p className="text-gray-500 text-xs md:text-sm">Blocks</p>
          <p className="text-2xl md:text-3xl font-bold text-pink-600">{player.stats.blocks}</p>
        </div>
      </div>

      {/* Shooting Percentages */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Shooting Percentages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 mb-2 text-sm">Field Goal %</p>
            <div className="w-full bg-gray-200 rounded-full h-3 md:h-4">
              <div
                className="bg-duke-700 h-3 md:h-4 rounded-full transition-all"
                style={{ width: `${player.stats.fieldGoalPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm font-semibold mt-2 text-duke-700">{player.stats.fieldGoalPercentage.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2 text-sm">Three Point %</p>
            <div className="w-full bg-gray-200 rounded-full h-3 md:h-4">
              <div
                className="bg-blue-600 h-3 md:h-4 rounded-full transition-all"
                style={{ width: `${player.stats.threePointPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm font-semibold mt-2 text-blue-600">{player.stats.threePointPercentage.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2 text-sm">Free Throw %</p>
            <div className="w-full bg-gray-200 rounded-full h-3 md:h-4">
              <div
                className="bg-green-600 h-3 md:h-4 rounded-full transition-all"
                style={{ width: `${player.stats.freeThrowPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm font-semibold mt-2 text-green-600">{player.stats.freeThrowPercentage.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Other Stats */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Other Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded p-4">
            <p className="text-gray-600 text-sm">Total Points</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{player.stats.points}</p>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-gray-600 text-sm">Total Assists</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{player.stats.assists}</p>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-gray-600 text-sm">Total Rebounds</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{player.stats.rebounds}</p>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-gray-600 text-sm">Turnovers</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{player.stats.turnovers}</p>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-gray-600 text-sm">Fouls</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">{player.stats.fouls}</p>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-gray-600 text-sm">Avg TO/Game</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{(player.stats.turnovers / player.stats.gamesPlayed).toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
