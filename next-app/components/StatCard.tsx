interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: "duke" | "blue" | "green" | "gray";
}

export default function StatCard({
  label,
  value,
  icon,
  color = "duke",
}: StatCardProps) {
  const colorClasses = {
    duke: "bg-duke-100 border-duke-300 text-duke-700",
    blue: "bg-blue-100 border-blue-300 text-blue-700",
    green: "bg-green-100 border-green-300 text-green-700",
    gray: "bg-gray-100 border-gray-300 text-gray-700",
  };

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
  );
}
