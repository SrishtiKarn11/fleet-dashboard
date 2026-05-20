import { useState } from 'react';
import axios from 'axios';

export default function CommandPanel({ selectedVehicle }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!selectedVehicle) return null;

  const sendCommand = async (type) => {
    setLoading(true);
    setMessage('');
    try {
      await axios.post(`http://localhost:3000/api/commands/${type}`, {
        vins: [selectedVehicle.id]
      });
      setMessage(`✅ ${type} command sent successfully!`);
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{
      padding: '16px',
      borderTop: '1px solid #eee',
      background: '#fafafa'
    }}>
      <h4 style={{ margin: '0 0 12px 0' }}>⚡ Commands</h4>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => sendCommand('immobilize')}
          disabled={loading}
          style={{
            background: '#f44336',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '13px'
          }}>
          ⛔ Immobilize
        </button>
        <button
          onClick={() => sendCommand('remobilize')}
          disabled={loading}
          style={{
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '13px'
          }}>
          ✅ Remobilize
        </button>
      </div>
      {loading && <p style={{ color: '#999', fontSize: '13px' }}>⏳ Sending command...</p>}
      {message && <p style={{ fontSize: '13px', marginTop: '8px' }}>{message}</p>}
    </div>
  );
}