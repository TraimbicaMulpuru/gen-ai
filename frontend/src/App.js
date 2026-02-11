import React, { useState } from 'react';

function App() {
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // These are the interactive slots for your presentation
  const [filters, setFilters] = useState({ 
    gender: "Male",
    occasion: "Wedding", 
    budget: "Luxury" 
  });

  const API_KEY = "ac3ee875e6671be2fe94250fb3ad3b5e";
  const AUTO_CITY = "Hyderabad"; 

  const getStyle = async () => {
    setLoading(true);
    try {
      // 1. Weather Logic
      const wRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${AUTO_CITY}&units=metric&appid=${API_KEY}`);
      const wData = await wRes.json();
      
      let season = "Summer";
      if (wData.main && wData.main.temp < 18) season = "Winter";
      else if (wData.main && wData.main.temp < 25) season = "Spring";

      // 2. Python Backend Connection (Port 5002)
      const res = await fetch('http://127.0.0.1:5002/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...filters, season: season })
      });
      
      const data = await res.json();
      
      // SAFETY CHECK: Prevents the "join" crash
      if (data && data.items) {
        setOutfit(data);
      } else {
        alert("No exact match found in database for this specific combination.");
      }
    } catch (err) {
      alert("Backend Not Responding! Make sure 'python app.py' is running on port 5002.");
    }
    setLoading(false);
  };

  return (
    <div style={s.page}>
      <div style={s.mainCard}>
        
        {/* LEFT PANEL: Professional Controls */}
        <div style={s.sidebar}>
          <h1 style={s.brand}>STYLE<span style={{color: '#D4AF37'}}>SENSE</span></h1>
          <p style={s.subtitle}>AI LUXURY FASHION CURATOR</p>

          <div style={s.form}>
            <div style={s.field}>
              <label style={s.label}>GENDER</label>
              <select style={s.select} value={filters.gender} onChange={e => setFilters({...filters, gender: e.target.value})}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div style={s.field}>
              <label style={s.label}>OCCASION</label>
              <select style={s.select} value={filters.occasion} onChange={e => setFilters({...filters, occasion: e.target.value})}>
                <option>Wedding</option>
                <option>Gym</option>
                <option>Party</option>
                <option>Office</option>
                <option>Date</option>
              </select>
            </div>

            <div style={s.field}>
              <label style={s.label}>BUDGET LEVEL</label>
              <select style={s.select} value={filters.budget} onChange={e => setFilters({...filters, budget: e.target.value})}>
                <option>Luxury</option>
                <option>Mid-Range</option>
                <option>Budget</option>
              </select>
            </div>
          </div>

          <button onClick={getStyle} style={s.btn}>
            {loading ? "ANALYZING..." : "CURATE SELECTION"}
          </button>
        </div>

        {/* RIGHT PANEL: Result Area */}
        <div style={s.display}>
          {outfit ? (
            <div style={s.resultContainer}>
              <p style={s.matchBadge}>PERFECT MATCH • {AUTO_CITY.toUpperCase()}</p>
              <h2 style={{ ...s.outfitTitle, color: outfit.color || '#111' }}>{outfit.name}</h2>
              <div style={s.divider}></div>
              
              <p style={s.itemsText}>
                {outfit.items ? outfit.items.join(' • ') : "Fetching components..."}
              </p>
              
              <p style={s.description}>{outfit.description}</p>
            </div>
          ) : (
            <div style={s.emptyState}>
              <h3 style={{fontWeight: '300'}}>Tailoring Your Perspective</h3>
              <p style={{fontSize: '14px', color: '#999'}}>Click Curate to generate an AI-powered look.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4F4' },
  mainCard: { display: 'flex', width: '900px', height: '580px', backgroundColor: '#FFF', borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', overflow: 'hidden' },
  sidebar: { width: '350px', backgroundColor: '#1C1C1C', color: '#FFF', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  brand: { fontSize: '28px', letterSpacing: '4px', margin: '0', fontWeight: 'bold' },
  subtitle: { fontSize: '9px', color: '#888', letterSpacing: '2px', marginBottom: '40px' },
  form: { marginBottom: '30px' },
  field: { marginBottom: '20px' },
  label: { fontSize: '10px', color: '#D4AF37', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px', display: 'block' },
  select: { width: '100%', padding: '12px', background: '#2D2D2D', color: '#FFF', border: '1px solid #3D3D3D', borderRadius: '8px', outline: 'none' },
  btn: { width: '100%', padding: '18px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' },
  display: { flex: 1, padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  resultContainer: { textAlign: 'center' },
  matchBadge: { fontSize: '11px', color: '#D4AF37', fontWeight: 'bold', letterSpacing: '2px' },
  outfitTitle: { fontSize: '42px', margin: '15px 0', fontWeight: 'bold' },
  divider: { height: '2px', width: '50px', background: '#EEE', margin: '20px auto' },
  itemsText: { fontSize: '18px', color: '#444', fontWeight: '600' },
  description: { color: '#888', fontStyle: 'italic', marginTop: '15px', lineHeight: '1.6' },
  emptyState: { textAlign: 'center', color: '#BBB' }
};

export default App;