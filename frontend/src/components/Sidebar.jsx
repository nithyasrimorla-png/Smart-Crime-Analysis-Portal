import { NavLink } from 'react-router-dom';
import { DashboardIcon, RecordsIcon, AnalyticsIcon, MapIcon, InfoIcon, CloseIcon } from './Icons';

const navItems = [
  { to: '/', label: 'Dashboard', icon: DashboardIcon, end: true },
  { to: '/crime-records', label: 'Crime Records', icon: RecordsIcon },
  { to: '/crime-analytics', label: 'Crime Analytics', icon: AnalyticsIcon },
  { to: '/crime-map', label: 'Crime Map', icon: MapIcon },
  { to: '/about', label: 'About', icon: InfoIcon },
];

function Sidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-line flex flex-col transform transition-transform duration-200 ease-in-out
      md:translate-x-0 md:static md:z-auto
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex items-center justify-between px-5 py-5 border-b border-line">
        <div>
          <p className="text-charcoal font-semibold text-sm leading-tight tracking-wide">SMART CRIME</p>
          <p className="text-teal text-xs leading-tight tracking-wide font-medium">ANALYSIS PORTAL</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="md:hidden text-muted hover:text-charcoal"
          aria-label="Close menu"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border-l-4 ${
                isActive
                  ? 'bg-pale text-teal border-teal'
                  : 'border-transparent text-muted hover:text-charcoal hover:bg-pale/60'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-line">
        <p className="text-xs font-medium text-charcoal">Academic Project</p>
        <p className="text-xs text-muted mt-0.5">Data Analytics &amp; Visualization</p>
      </div>
    </aside>
  );
}

export default Sidebar;