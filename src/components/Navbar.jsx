import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ClockIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" onClick={closeMenu}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="font-semibold text-2xl tracking-tight text-gray-900">
                KeenKeeper
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              onClick={closeMenu}
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
              onClick={closeMenu}
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
              onClick={closeMenu}
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

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-4 text-base">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <HomeIcon className="w-6 h-6" />
                Home
              </NavLink>

              <NavLink
                to="/timeline"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <ClockIcon className="w-6 h-6" />
                Timeline
              </NavLink>

              <NavLink
                to="/stats"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <ChartBarIcon className="w-6 h-6" />
                Stats
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
