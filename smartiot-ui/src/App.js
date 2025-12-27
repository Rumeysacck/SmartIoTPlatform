import React, { useState } from 'react';
import { 
  Thermometer, Droplets, Lightbulb, Clock, 
  UserCheck, UserX, Wifi, WifiOff, Activity, RefreshCw 
} from 'lucide-react';

const App = () => {
  // --- DURUMLAR ---
  const [lightStatus, setLightStatus] = useState(false);
  
  // Donanım Bağlantı Durumları
  const [connectionStatus, setConnectionStatus] = useState({
    lightModule: true,
    environmentSensors: false, 
    entrySystem: true
  });

  // Bağlantı kurma simülasyonu
  const handleReconnect = (module) => {
    console.log(`${module} için bağlantı isteği gönderiliyor...`);
    setTimeout(() => {
      setConnectionStatus(prev => ({ ...prev, [module]: true }));
    }, 1500); 
  };

  const [sensorData] = useState({ temp: 24.5, humidity: 45 });
  
  // Son Hareketler Verisi
  const [logs] = useState([
    { time: '18:45', action: 'Giriş Yapıldı', type: 'in' },
    { time: '08:15', action: 'Çıkış Yapıldı', type: 'out' },
  ]);

  return (
    <div style={{ padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1a1a1a', margin: 0 }}>SmartIoT Kontrol Paneli</h1>
        <StatusBadge label="Sistem Altyapısı Aktif" online={true} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* --- DONANIM MERKEZİ --- */}
        <div style={cardStyle}>
          <h3 style={cardTitle}><Activity size={20} /> Donanım Merkezi</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <DeviceActionRow 
                name="Aydınlatma Modülü" 
                online={connectionStatus.lightModule} 
                onConnect={() => handleReconnect('lightModule')}
            />
            <DeviceActionRow 
                name="Sıcaklık/Nem Sensörü" 
                online={connectionStatus.environmentSensors} 
                onConnect={() => handleReconnect('environmentSensors')}
            />
            <DeviceActionRow 
                name="Giriş Kontrol Sistemi" 
                online={connectionStatus.entrySystem} 
                onConnect={() => handleReconnect('entrySystem')}
            />
          </div>
        </div>

        {/* --- ORTAM VERİLERİ --- */}
        <div style={cardStyle}>
          <h3 style={cardTitle}><Thermometer size={20} /> Sensör Verileri</h3>
          {!connectionStatus.environmentSensors && <OfflineOverlay onRetry={() => handleReconnect('environmentSensors')} />}
          <div style={dataRow}>
            <div style={dataItem}>
              <Thermometer color="#ff4d4d" size={32} />
              <div><p style={label}>Sıcaklık</p><p style={value}>{sensorData.temp}°C</p></div>
            </div>
            <div style={dataItem}>
              <Droplets color="#3399ff" size={32} />
              <div><p style={label}>Nem</p><p style={value}>%{sensorData.humidity}</p></div>
            </div>
          </div>
        </div>

        {/* --- AYDINLATMA --- */}
        <div style={cardStyle}>
          <h3 style={cardTitle}><Lightbulb size={20} /> Aydınlatma</h3>
          {!connectionStatus.lightModule && <OfflineOverlay onRetry={() => handleReconnect('lightModule')} />}
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <Lightbulb size={64} color={lightStatus ? '#ffcc00' : '#d1d1d1'} fill={lightStatus ? '#ffcc00' : 'none'} />
            <p style={{ margin: '15px 0', fontWeight: 'bold' }}>Işık: {lightStatus ? 'AÇIK' : 'KAPALI'}</p>
            <button 
              disabled={!connectionStatus.lightModule}
              onClick={() => setLightStatus(!lightStatus)}
              style={{ ...btnStyle, backgroundColor: lightStatus ? '#ff4d4d' : '#4CAF50', opacity: connectionStatus.lightModule ? 1 : 0.5 }}
            >
              {lightStatus ? 'Kapat' : 'Aç'}
            </button>
          </div>
        </div>

        {/* --- SON HAREKETLER (Giriş/Çıkış) --- */}
        <div style={cardStyle}>
          <h3 style={cardTitle}><Clock size={20} /> Son Hareketler</h3>
          {!connectionStatus.entrySystem && <OfflineOverlay onRetry={() => handleReconnect('entrySystem')} />}
          <div style={{ marginTop: '10px' }}>
            {logs.map((log, index) => (
              <div key={index} style={logRow}>
                {log.type === 'in' ? <UserCheck color="#10b981" size={18}/> : <UserX color="#ef4444" size={18}/>}
                <span style={{ fontWeight: 'bold', width: '60px', fontSize: '14px' }}>{log.time}</span>
                <span style={{ fontSize: '14px', color: '#334155' }}>{log.action}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- YARDIMCI BİLEŞENLER ---

const DeviceActionRow = ({ name, online, onConnect }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: `1px solid ${online ? '#e2e8f0' : '#fecaca'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {online ? <Wifi size={18} color="#10b981" /> : <WifiOff size={18} color="#ef4444" />}
            <span style={{ fontSize: '14px', fontWeight: '600' }}>{name}</span>
        </div>
        {!online ? (
            <button onClick={onConnect} style={smallBtnStyle}>
                <RefreshCw size={12} /> Bağlan
            </button>
        ) : (
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold' }}>AKTİF</span>
        )}
    </div>
);

const OfflineOverlay = ({ onRetry }) => (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1, textAlign: 'center' }}>
        <WifiOff size={32} color="#ef4444" style={{ marginBottom: '8px' }} />
        <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: 'bold', margin: '0 0 10px 0' }}>BAĞLANTI KESİLDİ</p>
        <button onClick={onRetry} style={smallBtnStyle}>Yeniden Dene</button>
    </div>
);

const StatusBadge = ({ label, online }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '8px 15px', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: online ? '#10b981' : '#ef4444' }} />
        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{label}</span>
    </div>
);

// --- STİLLER ---
const cardStyle = { position: 'relative', backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' };
const cardTitle = { display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 20px 0', borderBottom: '1px solid #eee', paddingBottom: '10px', fontSize: '16px', fontWeight: 'bold' };
const btnStyle = { padding: '10px 25px', borderRadius: '20px', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' };
const smallBtnStyle = { display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '15px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' };
const dataRow = { display: 'flex', justifyContent: 'space-around', alignItems: 'center' };
const dataItem = { display: 'flex', alignItems: 'center', gap: '15px' };
const label = { margin: 0, color: '#666', fontSize: '13px' };
const value = { margin: 0, fontSize: '22px', fontWeight: 'bold' };
const logRow = { display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 0', borderBottom: '1px solid #f1f5f9' };

export default App;