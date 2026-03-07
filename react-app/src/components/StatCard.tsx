interface StatCardProps {
  label: string
  value: string | number
  icon?: string
  color?: 'duke' | 'blue' | 'green' | 'gray'
}

export default function StatCard({ label, value, icon, color = 'duke' }: StatCardProps) {
  const colorClasses = {
    duke: 'bg-duke-100 dark:bg-slate-700 border-duke-300 dark:border-gold-600 text-duke-700 dark:text-gold-400',
    blue: 'bg-blue-100 dark:bg-slate-700 border-blue-300 dark:border-blue-500 text-blue-700 dark:text-blue-300',
    green: 'bg-green-100 dark:bg-slate-700 border-green-300 dark:border-green-500 text-green-700 dark:text-green-300',
    gray: 'bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300',
  }

  return (
    <div className={`${colorClasses[color]} border-l-4 p-4 md:p-6 rounded-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs md:text-sm font-semibold opacity-75">{label}</p>
          <p className="text-2xl md:text-3xl font-bold mt-2">{value}</p>
        </div>
        {icon && <span className="text-2xl md:text-4xl">{icon}</span>}
      </div>
    </div>
  )
}
