import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { isDark, toggleDarkMode } = useTheme()

  return (
    <nav className="bg-white dark:bg-slate-900 text-gray-800 dark:text-white shadow-lg sticky top-0 z-50 border-b dark:border-slate-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg md:text-xl font-bold text-duke-700 dark:text-gold-400">
            <span className="text-2xl">▶</span> Stats Tracker
          </Link>
          <div className="flex items-center gap-4 md:gap-8">
            <ul className="hidden md:flex gap-6 lg:gap-8">
              <li>
                <Link to="/" className="hover:text-duke-600 dark:hover:text-gold-300 transition text-sm lg:text-base">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/games" className="hover:text-duke-600 dark:hover:text-gold-300 transition text-sm lg:text-base">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/players" className="hover:text-duke-600 dark:hover:text-gold-300 transition text-sm lg:text-base">
                  Players
                </Link>
              </li>
              <li>
                <Link to="/league" className="hover:text-duke-600 dark:hover:text-gold-300 transition text-sm lg:text-base">
                  League
                </Link>
              </li>
            </ul>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <span className="text-xl">☀️</span>
              ) : (
                <span className="text-xl">🌙</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
