import { Link } from 'react-router-dom'

interface PlayerCardProps {
  id: number
  firstName: string
  lastName: string
  number: number
  position: string
  points?: number
  assists?: number
  rebounds?: number
  team: string
}

export default function PlayerCard({
  id,
  firstName,
  lastName,
  number,
  position,
  points = 0,
  assists = 0,
  rebounds = 0,
  team
}: PlayerCardProps) {
  return (
    <Link to={`/players/${id}`}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition border-t-4 border-duke-700 dark:border-gold-500">
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">{team}</p>
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
              {firstName} {lastName}
            </h3>
          </div>
          <div className="text-center bg-duke-700 dark:bg-gold-700 text-white dark:text-slate-900 rounded-lg p-1 md:p-2 min-w-12">
            <p className="text-xl md:text-2xl font-bold">#{number}</p>
            <p className="text-xs font-semibold">{position}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Points</p>
            <p className="text-xl md:text-2xl font-bold text-duke-700 dark:text-gold-400">{points}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Assists</p>
            <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-300">{assists}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Rebounds</p>
            <p className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-300">{rebounds}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
