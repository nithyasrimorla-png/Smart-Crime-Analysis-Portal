import { useLocation } from 'react-router-dom';
import { MenuIcon, SearchIcon, BellIcon, UserIcon } from './Icons';

const PAGE_META = {
  '/': { title: 'Dashboard', description: 'Overview of historical crime records and analytical insights.' },
  '/crime-records': { title: 'Crime Records', description: 'Search, filter and explore historical crime records.' },
  '/crime-analytics': { title: 'Crime Analytics', description: 'Analytical insights derived from historical crime data.' },
  '/crime-map': { title: 'Crime Map', description: 'Geographic distribution of historical crime records.' },
  '/about': { title: 'About', description: 'Project overview, objectives, and technology stack.' },
};

function Header({ onMenuClick = () => {} }) {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] ?? { title: 'Smart Crime Analysis Portal', description: '' };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden text-slate-500 hover:text-slate-700"
          aria-label="Open menu"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-semibold text-slate-800 truncate">{meta.title}</h1>
          {meta.description && (
            <p className="hidden sm:block text-xs text-slate-400 truncate">{meta.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button type="button" className="text-slate-400 hover:text-slate-600" aria-label="Search">
          <SearchIcon className="h-5 w-5" />
        </button>
        <button type="button" className="text-slate-400 hover:text-slate-600" aria-label="Notifications">
          <BellIcon className="h-5 w-5" />
        </button>
        <div
          className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center"
          aria-label="Project account"
        >
          <UserIcon className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}

export default Header;