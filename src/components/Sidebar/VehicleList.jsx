import VehicleCard from './VehicleCard';

export default function VehicleList({ vehicles, onSelect, selectedVehicle }) {
  return (
    <div style={{
      width: '300px',
      height: '100vh',
      overflowY: 'auto',
      background: '#f5f5f5',
      borderRight: '1px solid #ddd'
    }}>
      <div style={{
        padding: '16px',
        background: '#1a1a2e',
        color: 'white'
      }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>🛵 Fleet Dashboard</h2>
        <p style={{ margin: '4px 0', fontSize: '13px', opacity: 0.7 }}>
          {vehicles.length} vehicles
        </p>
      </div>
      {vehicles.length === 0 && (
        <p style={{ padding: '16px', color: '#999' }}>
          No vehicles found...
        </p>
      )}
      {vehicles.map(v => (
        <VehicleCard
          key={v.id}
          vehicle={v}
          onSelect={onSelect}
          isSelected={selectedVehicle?.id === v.id}
        />
      ))}
    </div>
  );
}