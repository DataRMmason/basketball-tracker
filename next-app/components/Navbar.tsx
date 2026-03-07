import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-duke-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg md:text-xl font-bold"
          >
            <span className="text-2xl">▶</span> Stats Tracker
          </Link>
          <ul className="hidden md:flex gap-6 lg:gap-8">
            <li>
              <Link
                href="/"
                className="hover:text-duke-200 transition text-sm lg:text-base"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/games"
                className="hover:text-duke-200 transition text-sm lg:text-base"
              >
                Games
              </Link>
            </li>
            <li>
              <Link
                href="/players"
                className="hover:text-duke-200 transition text-sm lg:text-base"
              >
                Players
              </Link>
            </li>
            <li>
              <Link
                href="/league"
                className="hover:text-duke-200 transition text-sm lg:text-base"
              >
                League
              </Link>
            </li>
          </ul>
          <div className="md:hidden text-sm">Menu</div>
        </div>
      </div>
    </nav>
  );
}
