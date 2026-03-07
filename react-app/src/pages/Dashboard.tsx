import StatCard from '../components/StatCard'
import GameCard from '../components/GameCard'

// Dummy data
const LAST_GAME = {
  homeTeam: 'Central Middle School',
  awayTeam: 'Lincoln Middle School',
  homeScore: 62,
  awayScore: 58,
  date: 'March 5, 2026',
  time: '6:30 PM',
  status: 'final' as const,
  location: 'Central Gym',
  topPerformers: [
    { name: 'Marcus Johnson', points: 18, rebounds: 7 },
    { name: 'DeShawn Lee', points: 14, assists: 6 },
  ]
}

const UPCOMING_GAME = {
  homeTeam: 'Central Middle School',
  awayTeam: 'Roosevelt Middle School',
  date: 'March 10, 2026',
  time: '6:00 PM',
  status: 'scheduled' as const,
  location: 'Central Gym',
}

const SEASON_STATS = {
  gamesPlayed: 8,
  wins: 6,
  losses: 2,
  pointsPerGame: 61,
  leadingScorer: 'Marcus Johnson (18 PPG)',
  winPercentage: 0.75,
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-1">Central Middle School Basketball</p>
      </div>

      {/* Upcoming Game - FIRST */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-800 dark:text-white">NEXT GAME</h2>
        <GameCard
          homeTeam={UPCOMING_GAME.homeTeam}
          awayTeam={UPCOMING_GAME.awayTeam}
          date={UPCOMING_GAME.date}
          time={UPCOMING_GAME.time}
          status={UPCOMING_GAME.status}
          location={UPCOMING_GAME.location}
        />
      </div>

      {/* Last Game Highlight */}
      <div className="bg-gradient-to-br from-duke-700 to-duke-900 dark:from-slate-800 dark:to-slate-900 text-white rounded-lg shadow-lg p-6 dark:border dark:border-gold-700">
        <p className="text-sm font-semibold opacity-90 mb-4">LAST GAME</p>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <p className="text-2xl md:text-3xl font-bold">{LAST_GAME.homeTeam}</p>
            <p className="text-4xl md:text-5xl font-black mt-2">{LAST_GAME.homeScore}</p>
          </div>
          <div className="text-center px-4">
            <p className="text-sm opacity-75">FINAL</p>
            <p className="text-2xl font-bold mt-1">vs</p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-2xl md:text-3xl font-bold">{LAST_GAME.awayTeam}</p>
            <p className="text-4xl md:text-5xl font-black mt-2">{LAST_GAME.awayScore}</p>
          </div>
        </div>
        
        {/* Top Performers */}
        <div className="border-t border-duke-500 dark:border-gold-700 pt-4">
          <p className="text-xs font-semibold opacity-75 mb-3">TOP PERFORMERS</p>
          <div className="grid grid-cols-2 gap-3">
            {LAST_GAME.topPerformers.map((player, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 dark:bg-slate-700 dark:bg-opacity-40 rounded p-3">
                <p className="text-sm font-semibold">{player.name}</p>
                <p className="text-xs opacity-75 mt-1">{player.points} Pts • {player.rebounds || player.assists} {player.rebounds ? 'Reb' : 'Ast'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Game */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-3">NEXT GAME</h2>
        <GameCard
          homeTeam={UPCOMING_GAME.homeTeam}
          awayTeam={UPCOMING_GAME.awayTeam}
          date={UPCOMING_GAME.date}
          time={UPCOMING_GAME.time}
          status={UPCOMING_GAME.status}
          location={UPCOMING_GAME.location}
        />
      </div>

      {/* Upcoming Game */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-800 dark:text-white">SEASON STATS</h2>
        <GameCard
          homeTeam={UPCOMING_GAME.homeTeam}
          awayTeam={UPCOMING_GAME.awayTeam}
          date={UPCOMING_GAME.date}
          time={UPCOMING_GAME.time}
          status={UPCOMING_GAME.status}
          location={UPCOMING_GAME.location}
        />
      </div>
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-3">SEASON STATS</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <StatCard
            label="Games"
            value={SEASON_STATS.gamesPlayed}
            color="duke"
          />
          <StatCard
            label="Wins"
            value={SEASON_STATS.wins}
            color="green"
          />
          <StatCard
            label="Losses"
            value={SEASON_STATS.losses}
            color="gray"
          />
          <StatCard
            label="Win %"
            value={`${(SEASON_STATS.winPercentage * 100).toFixed(0)}%`}
            color="blue"
          />
          <StatCard
            label="PPG"
            value={SEASON_STATS.pointsPerGame}
            color="duke"
          />
          <StatCard
            label="Lead Scorer"
            value={SEASON_STATS.leadingScorer}
            color="green"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-gold-700 rounded-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-4 text-blue-900 dark:text-gold-400">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          <button className="bg-duke-700 dark:bg-gold-700 hover:bg-duke-800 dark:hover:bg-gold-600 text-white dark:text-slate-900 py-2 px-3 md:py-2 md:px-4 rounded text-sm md:text-base font-semibold transition">
            Log Game
          </button>
          <button className="bg-duke-700 dark:bg-gold-700 hover:bg-duke-800 dark:hover:bg-gold-600 text-white dark:text-slate-900 py-2 px-3 md:py-2 md:px-4 rounded text-sm md:text-base font-semibold transition">
            Add Stats
          </button>
          <button className="bg-duke-700 dark:bg-gold-700 hover:bg-duke-800 dark:hover:bg-gold-600 text-white dark:text-slate-900 py-2 px-3 md:py-2 md:px-4 rounded text-sm md:text-base font-semibold transition">
            View Stats
          </button>
          <button className="bg-duke-700 dark:bg-gold-700 hover:bg-duke-800 dark:hover:bg-gold-600 text-white dark:text-slate-900 py-2 px-3 md:py-2 md:px-4 rounded text-sm md:text-base font-semibold transition">
            Export
          </button>
        </div>
      </div>
    </div>
  )
}
