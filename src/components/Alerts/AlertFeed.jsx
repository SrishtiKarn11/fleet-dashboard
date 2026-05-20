import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function AlertFeed() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('vehicle:update', (data) => {
      const newAlerts = [];
      if (data.geofenceBreach) newAlerts.push({
        id: Date.now(),
        type: 'geofence',
        message: `🚨 Geofence breach: ${data.vehicleId}`,
        time: new Date().toLocaleTimeString()
      });
      if (data.timefenceBreach) newAlerts.push({
        id: Date.now() + 1,
        type: 'timefence',
        message: `⏰ Timefence breach: ${data.vehicleId}`,
        time: new Date().toLocaleTimeString()
      });
      if (data.immobilized) newAlerts.push({
        id: Date.now() + 2,
        type: 'immobilized',
        message: `⛔ Vehicle immobilized: ${data.vehicleId}`,
        time: new Date().toLocaleTimeString()
      });
      if (newAlerts.length > 0) {
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 50));
      }
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div style={{
      padding: '16px',
      borderTop: '1px solid #eee'
    }}>
      <h4 style={{ margin: '0 0 12px 0' }}>🔔 Live Alerts</h4>
      {alerts.length === 0 && (
        <p style={{ color: '#999', fontSize: '13px' }}>No alerts yet...</p>
      )}
      {alerts.map(alert => (
        <div key={alert.id} style={{
          padding: '8px 12px',
          marginBottom: '6px',
          borderRadius: '6px',
          fontSize: '13px',
          background: alert.type === 'geofence' ? '#fff3e0' :
                      alert.type === 'timefence' ? '#e3f2fd' : '#ffebee',
          borderLeft: `4px solid ${
            alert.type === 'geofence' ? '#ff9800' :
            alert.type === 'timefence' ? '#2196F3' : '#f44336'
          }`
        }}>
          <span>{alert.message}</span>
          <span style={{
            float: 'right',
            color: '#999',
            fontSize: '11px'
          }}>{alert.time}</span>
        </div>
      ))}
    </div>
  );
}