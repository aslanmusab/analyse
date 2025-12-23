import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './store';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Start } from './pages/Start';
import { Analyze } from './pages/Analyze';
import { Wizard } from './pages/Wizard';
import { Results } from './pages/Results';
import { Unlock } from './pages/Unlock';
import { Report } from './pages/Report';
import { Privacy } from './pages/Privacy';

function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Start />} />
            <Route path="/analyseren" element={<Analyze />} />
            <Route path="/vragen" element={<Wizard />} />
            <Route path="/resultaat" element={<Results />} />
            <Route path="/ontgrendel" element={<Unlock />} />
            <Route path="/rapport" element={<Report />} />
            <Route path="/voorbeeld" element={<Navigate to="/resultaat" replace />} /> {/* reusing logic for simplicity */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </StoreProvider>
  );
}

export default App;