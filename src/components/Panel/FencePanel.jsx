import { useState } from 'react';
import axios from 'axios';

export default function FencePanel({ selectedVehicle }) {
  const [activeTab, setActiveTab] = useState('geofence');

  // Geofence state
  const [lat, setLat] = useState('17.385');
  const [lon, setLon] = useState('78.4867');
  const [radius, setRadius] = useState('1');

  // Timefence state
  const [days, setDays] = useState([]);
  const [fromTime, setFromTime] = useState('08:00');
  const [toTime, setToTime] = useState('20:00');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!selectedVehicle) return null;

  const allDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const toggleDay = (day) => {
    setDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const setGeofence = async () => {
    setLoading(true);
    setMessage('');
    try {
      await axios.post('http://localhost:3000/api/commands/geofence', {
        vins: [selectedVehicle.id],
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        radius: parseFloat(radius)
      });
      setMessage('✅ Geofence set successfully!');
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
    setLoading(false);
  };

  const setTimefence = async () => {
    if (days.length === 0) {
      setMessage('❌ Please select at least one day');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await axios.post('http://localhost:3000/api/commands/timefence', {
        vins: [selectedVehicle.id],
        days,
        from: fromTime,
        to: toTime
      });
      setMessage('✅ Timefence set successfully!');
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '16px', borderTop: '1px solid #eee' }}>
      <h4 style={{ margin: '0 0 12px 0' }}>🗺️ Fence Settings</h4>

      {/* Tabs */}
      <div style={{ display: 'flex', marginBottom: '16px' }}>
        {['geofence', 'timefence'].map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setMessage(''); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 'bold',
              background: activeTab === tab ? '#1a1a2e' : '#f0f0f0',
              color: activeTab === tab ? 'white' : '#555',
              borderRadius: tab === 'geofence' ? '6px 0 0 6px' : '0 6px 6px 0'
            }}>
            {tab === 'geofence' ? '📍 Geofence' : '⏰ Timefence'}
          </button>
        ))}
      </div>

      {/* Geofence Tab */}
      {activeTab === 'geofence' && (
        <div>
          <p style={{ fontSize: '12px', color: '#999', marginBottom: '12px' }}>
            Set a circular boundary for {selectedVehicle.name}
          </p>
          {[
            { label: 'Latitude', value: lat, setter: setLat, placeholder: '17.385' },
            { label: 'Longitude', value: lon, setter: setLon, placeholder: '78.4867' },
            { label: 'Radius (km)', value: radius, setter: setRadius, placeholder: '1' }
          ].map(({ label, value, setter, placeholder }) => (
            <div key={label} style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '12px', color: '#555', display: 'block', marginBottom: '4px' }}>
                {label}
              </label>
              <input
                type="number"
                value={value}
                onChange={e => setter(e.target.value)}
                placeholder={placeholder}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}
              />
            </div>
          ))}
          <button
            onClick={setGeofence}
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              background: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px'
            }}>
            📍 Set Geofence
          </button>
        </div>
      )}

      {/* Timefence Tab */}
      {activeTab === 'timefence' && (
        <div>
          <p style={{ fontSize: '12px', color: '#999', marginBottom: '12px' }}>
            Restrict riding hours for {selectedVehicle.name}
          </p>

          {/* Day selector */}
          <label style={{ fontSize: '12px', color: '#555', display: 'block', marginBottom: '6px' }}>
            Select Days:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
            {allDays.map(day => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                style={{
                  padding: '4px 8px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  background: days.includes(day) ? '#1a1a2e' : '#f0f0f0',
                  color: days.includes(day) ? 'white' : '#555'
                }}>
                {day}
              </button>
            ))}
          </div>

          {/* Time range */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color: '#555', display: 'block', marginBottom: '4px' }}>
                From
              </label>
              <input
                type="time"
                value={fromTime}
                onChange={e => setFromTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color: '#555', display: 'block', marginBottom: '4px' }}>
                To
              </label>
              <input
                type="time"
                value={toTime}
                onChange={e => setToTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}
              />
            </div>
          </div>

          <button
            onClick={setTimefence}
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              background: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px'
            }}>
            ⏰ Set Timefence
          </button>
        </div>
      )}

      {loading && <p style={{ color: '#999', fontSize: '13px', marginTop: '8px' }}>⏳ Sending...</p>}
      {message && <p style={{ fontSize: '13px', marginTop: '8px' }}>{message}</p>}
    </div>
  );
}