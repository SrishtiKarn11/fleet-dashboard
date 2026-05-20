export default function VehicleDetail({ vehicle }) {
  if (!vehicle) return (
    <div style={{ padding: '24px', color: '#999' }}>
      👈 Select a vehicle to see details
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginTop: 0 }}>{vehicle.name}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {[
            ['VIN', vehicle.id],
            ['Status', vehicle.status || 'Unknown'],
            ['Battery', vehicle.battery ? `${vehicle.battery}%` : 'N/A'],
            ['Lock Status', vehicle.lockStatus || 'N/A'],
            ['Charge Status', vehicle.chargeStatus || 'N/A'],
            ['Odometer', vehicle.odometer ? `${vehicle.odometer} km` : 'N/A'],
            ['Immobilized', vehicle.immobilized ? '⛔ Yes' : '✅ No'],
            ['Geofence Breach', vehicle.geofenceBreach || 'None'],
            ['Timefence Breach', vehicle.timefenceBreach || 'None'],
            ['Traccar Status', vehicle.traccarStatus || 'offline'],
            ['Last Updated', vehicle.lastUpdated
              ? new Date(vehicle.lastUpdated).toLocaleString()
              : 'N/A'],
          ].map(([label, value]) => (
            <tr key={label} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{
                padding: '10px 8px',
                fontWeight: 'bold',
                color: '#555',
                width: '140px',
                fontSize: '13px'
              }}>{label}</td>
              <td style={{
                padding: '10px 8px',
                fontSize: '13px'
              }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}