import React, { useState } from 'react';
import { Bell, AlertTriangle, Info, ShieldAlert, CheckCircle, Trash2 } from 'lucide-react';

const NotificationsPage = () => {
  // Simüle edilmiş bildirim verileri
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'security',
      title: 'Güvenlik Uyarısı',
      message: 'Eve izinsiz giriş denemesi algılandı! Kapı kartsız açıldı.',
      time: '10 dk önce',
      status: 'unread'
    },
    {
      id: 2,
      type: 'check-in',
      title: 'Rutin Kontrolü',
      message: 'Her şey yolunda mı? Genelde bu saatlerde evde olurdunuz ama henüz giriş yapılmadı.',
      time: '1 saat önce',
      status: 'unread'
    },
    {
      id: 3,
      type: 'environment',
      title: 'Sıcaklık Değişimi',
      message: 'Sıcaklık değeri normalin üzerine çıktı (30.5°C). Klimayı açmak ister misiniz?',
      time: '3 saat önce',
      status: 'read'
    }
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'security': return <ShieldAlert color="#ef4444" size={24} />;
      case 'environment': return <AlertTriangle color="#f59e0b" size={24} />;
      case 'check-in': return <Info color="#3b82f6" size={24} />;
      default: return <Bell size={24} />;
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1a1a1a', margin: 0 }}>Bildirim Merkezi</h1>
        <button 
          onClick={() => setNotifications([])}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}
        >
          <Trash2 size={18} /> Tümünü Temizle
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {notifications.length > 0 ? (
          notifications.map(note => (
            <div key={note.id} style={{ ...notificationStyle, borderLeft: `5px solid ${note.status === 'unread' ? '#3b82f6' : '#e2e8f0'}` }}>
              <div style={iconContainerStyle}>{getIcon(note.type)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{note.title}</h4>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>{note.time}</span>
                </div>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{note.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>
            <CheckCircle size={48} style={{ marginBottom: '10px', opacity: 0.5 }} />
            <p>Harika! Okunmamış bildiriminiz bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Stiller
const notificationStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  transition: '0.3s'
};

const iconContainerStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '12px',
  backgroundColor: '#f8fafc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default NotificationsPage;