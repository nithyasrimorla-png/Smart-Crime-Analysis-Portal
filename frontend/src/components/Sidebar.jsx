import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Map,
  Info,
  X,
} from 'lucide-react';

function Sidebar({ isOpen, onClose }) {
  const navigation = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Crime Records',
      path: '/crime-records',
      icon: FileText,
    },
    {
      name: 'Crime Analytics',
      path: '/crime-analytics',
      icon: BarChart3,
    },
    {
      name: 'Crime Map',
      path: '/crime-map',
      icon: Map,
    },
    {
      name: 'About',
      path: '/about',
      icon: Info,
    },
  ];

  return (
    <aside
      className={`
        fixed
        top-0
        bottom-0
        left-0
        z-40
        w-64
        h-screen
        bg-white
        border-r
        border-slate-200
        flex
        flex-col
        transition-transform
        duration-300
        ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      {/* Logo Section */}
      <div className="flex-shrink-0 border-b border-slate-200 px-5 py-6">
        <div>
          <h1 className="text-base font-bold tracking-wide text-slate-800">
            SMART CRIME
          </h1>

          <h2 className="text-xs font-medium tracking-wide text-teal-700">
            ANALYSIS PORTAL
          </h2>
        </div>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-5 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 md:hidden"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? 'border-l-4 border-teal-600 bg-[#e8f0ea] text-teal-700'
                      : 'border-l-4 border-transparent text-slate-600 hover:bg-slate-50 hover:text-teal-700'
                  }
                  `
                }
              >
                <Icon size={20} strokeWidth={1.8} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="flex-shrink-0 border-t border-slate-200 px-5 py-5">
        <p className="text-xs font-semibold text-slate-800">
          Academic Project
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Data Analytics & Visualization
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;