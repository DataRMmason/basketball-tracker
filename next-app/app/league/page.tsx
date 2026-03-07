interface TeamStanding {
  id: number;
  name: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  winPercentage: number;
}

const DUMMY_STANDINGS: TeamStanding[] = [
  {
    id: 1,
    name: "Central Middle School",
    wins: 6,
    losses: 2,
    pointsFor: 487,
    pointsAgainst: 445,
    winPercentage: 0.75,
  },
  {
    id: 2,
    name: "Jefferson Middle School",
    wins: 5,
    losses: 3,
    pointsFor: 465,
    pointsAgainst: 453,
    winPercentage: 0.625,
  },
  {
    id: 3,
    name: "Lincoln Middle School",
    wins: 4,
    losses: 4,
    pointsFor: 478,
    pointsAgainst: 482,
    winPercentage: 0.5,
  },
  {
    id: 4,
    name: "Roosevelt Middle School",
    wins: 3,
    losses: 5,
    pointsFor: 412,
    pointsAgainst: 445,
    winPercentage: 0.375,
  },
  {
    id: 5,
    name: "Washington Middle School",
    wins: 2,
    losses: 6,
    pointsFor: 398,
    pointsAgainst: 468,
    winPercentage: 0.25,
  },
];

export default function League() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          League Standings
        </h1>
        <p className="text-gray-600 text-sm mt-1">2025-2026 Season</p>
      </div>

      {DUMMY_STANDINGS.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-duke-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Team</th>
                  <th className="px-4 py-3 text-center">W</th>
                  <th className="px-4 py-3 text-center">L</th>
                  <th className="px-4 py-3 text-center">Win %</th>
                  <th className="px-4 py-3 text-center">PF</th>
                  <th className="px-4 py-3 text-center">PA</th>
                  <th className="px-4 py-3 text-center">Diff</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_STANDINGS.map((team, index) => (
                  <tr
                    key={team.id}
                    className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {team.name}
                    </td>
                    <td className="px-4 py-3 text-center text-green-600 font-bold">
                      {team.wins}
                    </td>
                    <td className="px-4 py-3 text-center text-red-600 font-bold">
                      {team.losses}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold">
                      {(team.winPercentage * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">
                      {team.pointsFor}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">
                      {team.pointsAgainst}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={
                          team.pointsFor - team.pointsAgainst > 0
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {team.pointsFor - team.pointsAgainst > 0 ? "+" : ""}
                        {team.pointsFor - team.pointsAgainst}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-2 p-4">
            {DUMMY_STANDINGS.map((team, index) => (
              <div
                key={team.id}
                className={`p-4 rounded-lg border-l-4 border-duke-700 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-sm">
                    {team.name}
                  </h3>
                  <span className="text-lg font-bold text-duke-700">
                    {team.wins}-{team.losses}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Win %</p>
                    <p className="font-semibold">
                      {(team.winPercentage * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">PF</p>
                    <p className="font-semibold">{team.pointsFor}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">PA</p>
                    <p className="font-semibold">{team.pointsAgainst}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Diff</p>
                    <p
                      className={`font-semibold ${team.pointsFor - team.pointsAgainst > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {team.pointsFor - team.pointsAgainst > 0 ? "+" : ""}
                      {team.pointsFor - team.pointsAgainst}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No standings data available</p>
        </div>
      )}

      {/* League Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-blue-50 rounded-lg p-4 md:p-6 border-l-4 border-blue-600">
          <h3 className="font-bold text-sm md:text-lg text-blue-900 mb-2">
            Teams
          </h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">
            {DUMMY_STANDINGS.length}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 md:p-6 border-l-4 border-green-600">
          <h3 className="font-bold text-sm md:text-lg text-green-900 mb-2">
            Total Games
          </h3>
          <p className="text-2xl md:text-3xl font-bold text-green-600">
            {Math.round(
              (DUMMY_STANDINGS.reduce(
                (sum, t) => sum + t.wins + t.losses,
                0
              ) /
                DUMMY_STANDINGS.length) *
                (DUMMY_STANDINGS.length / 2)
            )}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 md:p-6 border-l-4 border-purple-600">
          <h3 className="font-bold text-sm md:text-lg text-purple-900 mb-2">
            Avg PPG
          </h3>
          <p className="text-2xl md:text-3xl font-bold text-purple-600">
            {Math.round(
              DUMMY_STANDINGS.reduce((sum, t) => sum + t.pointsFor, 0) /
                DUMMY_STANDINGS.length
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
