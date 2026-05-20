import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function FleetMap({ vehicles, onSelectVehicle }) {
  const [liveData, setLiveData] = useState({});

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('vehicle:update', (data) => {
      setLiveData(prev => ({
        ...prev,
        [data.vehicleId]: data
      }));
    });
    return () => socket.disconnect();
  }, []);

  return (
    <MapContainer
      center={[17.385, 78.4867]}
      zoom={12}
      style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {vehicles.map(v => {
        const live = liveData[v.id] || v;
        if (!live.location) return null;
        return (
          <Marker
            key={v.id}
            position={[live.location.latitude, live.location.longitude]}
            eventHandlers={{ click: () => onSelectVehicle(v) }}>
            <Popup>
              <b>{v.name}</b><br />
              Battery: {live.battery}%<br />
              Status: {live.status}<br />
              {live.immobilized && <span style={{ color: 'red' }}>⛔ IMMOBILIZED</span>}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}