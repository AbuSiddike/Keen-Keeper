import { NavLink } from 'react-router-dom'
import { HomeIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="font-semibold text-2xl tracking-tight text-gray-900">
            KeenKeeper
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`
            }
          >
            <HomeIcon className="w-5 h-5" />
            Home
          </NavLink>

          <NavLink
            to="/timeline"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`
            }
          >
            <ClockIcon className="w-5 h-5" />
            Timeline
          </NavLink>

          <NavLink
            to="/stats"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`
            }
          >
            <ChartBarIcon className="w-5 h-5" />
            Stats
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar