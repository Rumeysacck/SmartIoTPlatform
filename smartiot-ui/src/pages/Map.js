import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { User, ShieldCheck, MapPin } from 'lucide-react';

// Leaflet ikon hatasını düzeltmek için (Varsayılan ikon yolları bazen bozulabiliyor)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapPage = () => {
  // Simüle edilmiş konum verileri (Backend geldiğinde API'den çekilecek)
  const [trackedUsers] = useState([
    { id: 1, name: 'Rümeysa (Siz)', lat: 41.0082, lng: 28.9784, status: 'Evde', lastSeen: 'Şimdi' },
    { id: 2, name: 'Akıllı Takip Cihazı 1', lat: 41.0150, lng: 28.9850, status: 'Dışarıda', lastSeen: '5 dk önce' },
  ]);

  // Evin merkez konumu (Güvenli Bölge)
  const homeLocation = [41.0082, 28.9784];

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#1a1a1a', margin: 0 }}>Canlı Konum Takibi</h1>
        <div style={badgeStyle}>
          <ShieldCheck size={16} color="#10b981" />
          <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Güvenli Bölge Koruması Aktif</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', height: '75vh' }}>
        {/* SOL TARAF: LİSTE */}
        <div style={listContainerStyle}>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Takip Edilenler</h3>
          {trackedUsers.map(user => (
            <div key={user.id} style={userItemStyle}>
              <div style={avatarStyle}><User size={20} /></div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{user.name}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{user.status} • {user.lastSeen}</p>
              </div>
              <MapPin size={16} color={user.status === 'Evde' ? '#10b981' : '#f59e0b'} />
            </div>
          ))}
        </div>

        {/* SAĞ TARAF: HARİTA */}
        <div style={mapWrapperStyle}>
          <MapContainer center={homeLocation} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '15px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            
            {/* Güvenli Bölge Çemberi */}
            <Circle center={homeLocation} radius={1000} pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.1 }} />

            {/* İşaretçiler */}
            {trackedUsers.map(user => (
              <Marker key={user.id} position={[user.lat, user.lng]}>
                <Popup>
                  <strong>{user.name}</strong> <br />
                  Durum: {user.status} <br />
                  Son görülme: {user.lastSeen}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

// --- STİLLER ---
const mapWrapperStyle = { flex: 3, borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' };
const listContainerStyle = { flex: 1, backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflowY: 'auto' };
const userItemStyle = { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', marginBottom: '10px', border: '1px solid #f1f5f9' };
const avatarStyle = { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const badgeStyle = { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '8px 15px', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' };

export default MapPage;