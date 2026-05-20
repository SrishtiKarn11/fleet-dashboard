export default function VehicleCard({ vehicle, onSelect, isSelected }) {
  return (
    <div
      onClick={() => onSelect(vehicle)}
      style={{
        padding: '12px',
        margin: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
        border: isSelected ? '2px solid #4CAF50' : '1px solid #ddd',
        background: isSelected ? '#f0fff0' : '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
      <h4 style={{ margin: 0 }}>{vehicle.name}</h4>
      <p style={{ margin: '4px 0', fontSize: '13px', color: '#666' }}>
        VIN: {vehicle.id}
      </p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
        <span style={{
          background: vehicle.traccarStatus === 'online' ? '#4CAF50' : '#999',
          color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '12px'
        }}>
          {vehicle.traccarStatus || 'offline'}
        </span>
        {vehicle.battery !== null && vehicle.battery !== undefined && (
          <span style={{
            background: vehicle.battery > 20 ? '#2196F3' : '#f44336',
            color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '12px'
          }}>
            🔋 {vehicle.battery}%
          </span>
        )}
        {vehicle.immobilized && (
          <span style={{
            background: '#f44336',
            color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '12px'
          }}>
            ⛔ Immobilized
          </span>
        )}
      </div>
    </div>
  );
}