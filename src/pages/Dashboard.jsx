import { useEffect, useState } from 'react';
import axios from 'axios';
import FleetMap from '../components/Map/FleetMap';
import VehicleList from '../components/Sidebar/VehicleList';
import VehicleDetail from '../components/Panel/VehicleDetail';
import CommandPanel from '../components/Panel/CommandPanel';
import FencePanel from '../components/Panel/FencePanel';
import AlertFeed from '../components/Alerts/AlertFeed';

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
    // Refresh every 30 seconds
    const interval = setInterval(fetchVehicles, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/vehicles');
      setVehicles(res.data);
    } catch (err) {
      console.error('Failed to fetch vehicles:', err);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* LEFT SIDEBAR — Vehicle List */}
      <VehicleList
        vehicles={vehicles}
        onSelect={setSelectedVehicle}
        selectedVehicle={selectedVehicle}
      />

      {/* CENTER — Map */}
      <div style={{ flex: 1, position: 'relative' }}>
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: '18px',
            color: '#999'
          }}>
            ⏳ Loading fleet data...
          </div>
        ) : (
          <FleetMap
            vehicles={vehicles}
            onSelectVehicle={setSelectedVehicle}
          />
        )}
      </div>

      {/* RIGHT PANEL — Vehicle Detail + Commands + Fence + Alerts */}
      <div style={{
        width: '320px',
        height: '100vh',
        overflowY: 'auto',
        borderLeft: '1px solid #ddd',
        background: '#fff'
      }}>
        <VehicleDetail vehicle={selectedVehicle} />
        <CommandPanel selectedVehicle={selectedVehicle} />
        <FencePanel selectedVehicle={selectedVehicle} />
        <AlertFeed />
      </div>

    </div>
  );
}