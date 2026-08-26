import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Dashboard from './pages/Dashboard';
import CrimeRecords from './pages/CrimeRecords';
import CrimeAnalytics from './pages/CrimeAnalytics';
import CrimeMap from './pages/CrimeMap';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/crime-records"
            element={<CrimeRecords />}
          />
          <Route
            path="/crime-analytics"
            element={<CrimeAnalytics />}
          />
          <Route
            path="/crime-map"
            element={<CrimeMap />}
          />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;