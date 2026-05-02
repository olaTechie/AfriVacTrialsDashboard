import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppLayout from './layouts/AppLayout.jsx';
import About from './pages/About.jsx';
import Analytics from './pages/Analytics.jsx';
import DataExplorer from './pages/DataExplorer.jsx';
import Home from './pages/Home.jsx';
import References from './pages/References.jsx';
import Reports from './pages/Reports.jsx';
import Trends from './pages/Trends.jsx';

export default function App() {
  const location = useLocation();

  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/explorer" element={<DataExplorer />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/references" element={<References />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </AppLayout>
  );
}
