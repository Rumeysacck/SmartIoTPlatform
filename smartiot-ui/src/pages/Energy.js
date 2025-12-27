import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { Zap, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';

const EnergyPage = () => {
  // Simüle edilmiş tüketim verileri (Son 24 saat)
  const [hourlyData] = useState([
    { time: '00:00', consumption: 0.5 }, { time: '04:00', consumption: 0.3 },
    { time: '08:00', consumption: 1.2 }, { time: '12:00', consumption: 2.1 },
    { time: '16:00', consumption: 1.8 }, { time: '20:00', consumption: 2.5 },
    { time: '23:59', consumption: 1.1 },
  ]);

  // Cihaz bazlı tüketim
  const [deviceUsage] = useState([
    { name: 'Klima', value: 45, color: '#3b82f6' },
    { name: 'Aydınlatma', value: 15, color: '#fbbf24' },
    { name: 'Buzdolabı', value: 25, color: '#10b981' },
    { name: 'Diğer', value: 15, color: '#94a3b8' },
  ]);

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ color: '#1a1a1a', marginBottom: '30px' }}>Enerji Analizi</h1>

      {/* ÜST ÖZET KARTLARI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard icon={<Zap color="#3b82f6" />} label="Anlık Tüketim" value="1.2 kW" subValue="+12% geçen saate göre" />
        <StatCard icon={<TrendingUp color="#10b981" />} label="Günlük Toplam" value="14.5 kWh" subValue="Hedefin %80'i" />
        <StatCard icon={<DollarSign color="#fbbf24" />} label="Tahmini Fatura" value="₺185.50" subValue="Bu ay sonu tahmini" />
        <StatCard icon={<AlertTriangle color="#ef4444" />} label="Verimlilik" value="B+" subValue="Optimize edilebilir" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* TÜKETİM GRAFİĞİ */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Günün Tüketim Özeti (kWh)</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="consumption" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCons)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CİHAZ BAZLI DAĞILIM */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Cihaz Dağılımı (%)</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceUsage} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} width={80} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                  {deviceUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

// Alt Bileşenler
const StatCard = ({ icon, label, value, subValue }) => (
  <div style={cardStyle}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
      {icon}
      <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>{label}</span>
    </div>
    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>{value}</div>
    <div style={{ fontSize: '12px', color: '#10b981', marginTop: '5px' }}>{subValue}</div>
  </div>
);

const cardStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' };
const cardTitle = { margin: '0 0 20px 0', fontSize: '16px', color: '#1e293b', fontWeight: 'bold' };

export default EnergyPage;