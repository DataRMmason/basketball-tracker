import Link from "next/link";

interface PlayerCardProps {
  id: number;
  firstName: string;
  lastName: string;
  number: number;
  position: string;
  points?: number;
  assists?: number;
  rebounds?: number;
  team: string;
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
  team,
}: PlayerCardProps) {
  return (
    <Link href={`/players/${id}`}>
      <div className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition border-t-4 border-duke-700">
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div>
            <p className="text-gray-500 text-xs md:text-sm">{team}</p>
            <h3 className="text-base md:text-lg font-bold">
              {firstName} {lastName}
            </h3>
          </div>
          <div className="text-center bg-duke-700 text-white rounded-lg p-1 md:p-2 min-w-12">
            <p className="text-xl md:text-2xl font-bold">#{number}</p>
            <p className="text-xs font-semibold">{position}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div>
            <p className="text-gray-500 text-xs">Points</p>
            <p className="text-xl md:text-2xl font-bold text-duke-700">
              {points}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Assists</p>
            <p className="text-xl md:text-2xl font-bold text-blue-600">
              {assists}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Rebounds</p>
            <p className="text-xl md:text-2xl font-bold text-green-600">
              {rebounds}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
