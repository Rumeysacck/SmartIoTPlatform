import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Tüm ikonları buradan tek seferde import ediyoruz
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Zap, 
  Settings, 
  Bell, 
  Brain 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  // Menü elemanları listesi
  const menuItems = [
    { name: 'Ana Ekran', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Harita', path: '/map', icon: <MapIcon size={20} /> },
    { name: 'Enerji', path: '/energy', icon: <Zap size={20} /> },
    { name: 'AI Analiz', path: '/ai', icon: <Brain size={20} /> },
    { 
      name: 'Bildirimler', 
      path: '/notifications', 
      icon: <Bell size={20} />, 
      hasBadge: true // Bildirim olduğunu belirten işaret
    },
  ];

  return (
    <div style={sidebarStyle}>
      {/* Logo Alanı */}
      <div style={{ padding: '25px 20px', textAlign: 'center', borderBottom: '1px solid #334155' }}>
        <h2 style={{ color: '#3b82f6', fontSize: '22px', margin: 0, fontWeight: '800', letterSpacing: '1px' }}>
          Smart<span style={{ color: 'white' }}>IoT</span>
        </h2>
      </div>
      
      {/* Ana Navigasyon */}
      <nav style={{ flex: 1, padding: '20px 0' }}>
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            style={linkStyle(location.pathname === item.path)}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              {item.icon}
              {/* Bildirim rozeti (hasBadge true ise görünür) */}
              {item.hasBadge && (
                <span style={badgeStyle} />
              )}
            </div>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Alt Menü (Ayarlar) */}
      <div style={{ padding: '20px', borderTop: '1px solid #334155' }}>
        <Link 
          to="/settings" 
          style={linkStyle(location.pathname === '/settings')}
        >
          <Settings size={20} />
          <span>Ayarlar</span>
        </Link>
      </div>
    </div>
  );
};

// --- STİLLER ---

const sidebarStyle = {
  width: '240px',
  backgroundColor: '#1e293b',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 100,
  boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
};

const linkStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 20px',
  textDecoration: 'none',
  color: isActive ? '#3b82f6' : '#cbd5e1',
  backgroundColor: isActive ? '#334155' : 'transparent',
  borderLeft: isActive ? '4px solid #3b82f6' : '4px solid transparent',
  transition: 'all 0.2s ease',
  fontWeight: isActive ? '600' : '400',
  marginBottom: '4px'
});

const badgeStyle = {
  position: 'absolute',
  top: -2,
  right: -2,
  width: '8px',
  height: '8px',
  backgroundColor: '#ef4444',
  borderRadius: '50%',
  border: '2px solid #1e293b'
};

export default Sidebar;