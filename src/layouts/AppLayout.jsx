import { BarChart3, BookOpen, Compass, FileText, Home, Info, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FilterPanel from '../components/FilterPanel.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { useData } from '../data/DataContext';

const navItems = [
  { to: '/', label: 'Overview', icon: Home },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/trends', label: 'Trends', icon: Compass },
  { to: '/explorer', label: 'Data Explorer', icon: Search },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/references', label: 'References', icon: BookOpen },
  { to: '/about', label: 'About', icon: Info },
];

export default function AppLayout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const { loading, error, filteredRows, trialRows } = useData();

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <div className="fatal-state">
        <h1>Unable to load trial data</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <nav className={`side-nav ${navOpen ? 'is-open' : ''}`}>
        <div className="brand">
          <span>AV</span>
          <div>
            <strong>AfriVac Trials</strong>
            <small>Evidence atlas</small>
          </div>
        </div>

        <div className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setNavOpen(false)}
                className={({ isActive }) => (isActive ? 'is-active' : undefined)}
              >
                <Icon size={18} aria-hidden="true" />
                {item.label}
              </NavLink>
            );
          })}
        </div>

        <FilterPanel />
      </nav>

      <div className="content-shell">
        <header className="topbar">
          <button
            type="button"
            className="icon-button"
            onClick={() => setNavOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            <Menu size={20} />
          </button>
          <div>
            <span>{filteredRows.length.toLocaleString()}</span>
            <small>of {trialRows.length.toLocaleString()} trials in view</small>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
