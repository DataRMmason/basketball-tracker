interface GameCardProps {
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  date: string
  time?: string
  status: 'scheduled' | 'in_progress' | 'final'
  location?: string
}

export default function GameCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  date,
  time,
  status,
  location
}: GameCardProps) {
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-yellow-100 text-yellow-700',
    final: 'bg-green-100 text-green-700',
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 md:p-6 border-l-4 border-duke-700 dark:border-gold-500">
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">{date}{time && ` at ${time}`}</p>
          {location && <p className="text-gray-600 dark:text-gray-500 text-xs mt-1">{location}</p>}
        </div>
        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
          {status === 'in_progress' ? 'Live' : status === 'scheduled' ? 'Upcoming' : 'Final'}
        </span>
      </div>
      
      <div className="flex items-center justify-between gap-2 md:gap-4">
        <div className="flex-1 text-center">
          <p className="font-bold text-sm md:text-lg text-gray-800 dark:text-white">{homeTeam}</p>
          {homeScore !== undefined && (
            <p className="text-2xl md:text-3xl font-bold text-duke-700 dark:text-gold-400 mt-2">{homeScore}</p>
          )}
        </div>
        
        <div className="text-gray-400 dark:text-gray-500 font-bold text-xs md:text-base">vs</div>
        
        <div className="flex-1 text-center">
          <p className="font-bold text-sm md:text-lg text-gray-800 dark:text-white">{awayTeam}</p>
          {awayScore !== undefined && (
            <p className="text-2xl md:text-3xl font-bold text-duke-700 dark:text-gold-400 mt-2">{awayScore}</p>
          )}
        </div>
      </div>
    </div>
  )
}
