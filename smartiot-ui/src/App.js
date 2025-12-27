import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/Map';
import EnergyPage from './pages/Energy';
import NotificationsPage from './pages/Notifications';
import AiAnalysis from './pages/AiAnalysis';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sabit Sol Menü */}
        <Sidebar />
        
        {/* Değişken İçerik Alanı (Sidebar genişliği kadar soldan boşluk bırakır) */}
        <main style={{ marginLeft: '240px', flex: 1, minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<MapPage />} /> {/* Burayı güncelledik */}
            <Route path="/energy" element={<EnergyPage />} />
            <Route path="/settings" element={<div style={{padding: '30px'}}><h2>Ayarlar</h2></div>} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/ai" element={<AiAnalysis />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;