import React, { useState } from 'react';
import { Brain, Fingerprint, Activity, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const AiAnalysis = () => {
  // Simüle edilmiş AI analiz verileri
  const data = [
    { name: 'Normal Veri', value: 85 },
    { name: 'Anomali', value: 15 },
  ];
  const COLORS = ['#10b981', '#ef4444'];

  const performanceData = [
    { subject: 'Güvenlik', A: 120, fullMark: 150 },
    { subject: 'Enerji Tasarrufu', A: 98, fullMark: 150 },
    { subject: 'Konfor', A: 86, fullMark: 150 },
    { subject: 'Cihaz Sağlığı', A: 99, fullMark: 150 },
    { subject: 'Tahminleme', A: 85, fullMark: 150 },
  ];

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <Brain size={32} color="#8b5cf6" />
        <h1 style={{ color: '#1a1a1a', margin: 0 }}>AI Akıllı Analiz</h1>
        <div style={aiBadgeStyle}><Sparkles size={14} /> AI Engine v1.0</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
        
        {/* AI DURUM ÖZETİ */}
        <div style={cardStyle}>
          <h3 style={cardTitle}><Fingerprint size={18} /> Veri Analiz Raporu</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Sistem son 24 saati analiz etti ve <b>%85</b> oranında rutin dışı bir durum bulmadı.</p>
          </div>
        </div>

        {/* PERFORMANS RADARI */}
        <div style={cardStyle}>
          <h3 style={cardTitle}><Activity size={18} /> Ev Verimlilik Skoru</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" fontSize={12} />
                <PolarRadiusAxis hide />
                <Radar name="Skor" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI TAVSİYELERİ */}
      <div style={{ ...cardStyle, marginTop: '20px' }}>
        <h3 style={cardTitle}><Zap size={18} /> AI Önerileri</h3>
        <div style={adviceBox}>
          <p>💡 <b>Enerji Tasarrufu:</b> Klima kullanım alışkanlıklarınıza göre, sıcaklığı 1 derece artırmak faturanızda %5 tasarruf sağlayabilir.</p>
        </div>
        <div style={adviceBox}>
          <p>🛡️ <b>Güvenlik:</b> Son 3 gündür saat 14:00'te kapı kilidi açık bırakılmış. Otomatik kilitleme özelliğini aktif etmemi ister misiniz?</p>
        </div>
      </div>
    </div>
  );
};

// --- STİLLER ---
const cardStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', position: 'relative' };
const cardTitle = { display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 20px 0', fontSize: '16px', fontWeight: 'bold', color: '#1e293b' };
const aiBadgeStyle = { backgroundColor: '#f5f3ff', color: '#8b5cf6', padding: '5px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' };
const adviceBox = { padding: '15px', borderRadius: '10px', backgroundColor: '#f8fafc', marginBottom: '10px', borderLeft: '4px solid #8b5cf6', fontSize: '14px' };
const Tooltip = () => null; // Basit yer tutucu

export default AiAnalysis;