import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import DriftMarker from 'react-leaflet-drift-marker';
import 'leaflet/dist/leaflet.css';
import './RescueDashboard.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

const RescueLocations = () => {
  const mapRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);

  const emergencies = [
    {
      id: 'SOS001',
      name: 'Sarah Johnson',
      location: [14.5995, 121.0244],
    },
  ];

  const rescuerLocation = [14.6000, 121.0250];
  const [dronePosition, setDronePosition] = useState([14.6020, 121.0270]);

  const rescuerIcon = new L.Icon({
    iconUrl: require('./rescuergps.png'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const userIcon = new L.Icon({
    iconUrl: require('./usergps-icon.png'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const droneIcon = new L.Icon({
    iconUrl: require('./drone-icon.png'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    if (mapRef.current) setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      const routeControl = L.Routing.control({
        waypoints: [
          L.latLng(rescuerLocation),
          L.latLng(emergencies[0].location),
        ],
        routeWhileDragging: false,
        createMarker: () => null,
        lineOptions: {
          styles: [{ color: 'blue', weight: 4 }],
        },
      }).addTo(mapRef.current);

      routeControl.on('routesfound', (e) => {
        const summary = e.routes[0].summary;
        console.log(`Route found: ${summary.totalDistance}m, ${summary.totalTime}s`);
      });

      return () => {
        mapRef.current.removeControl(routeControl);
      };
    }
  }, [mapLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDronePosition((prevPosition) => [
        prevPosition[0] + 0.0001,
        prevPosition[1] + 0.0001,
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="map-view">
      <h2>Emergency Locations in Quezon City</h2>
      <div className="map-container">
        <MapContainer
          center={[14.5995, 121.0244]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {emergencies.map((emergency) =>
            emergency?.location?.length ? (
              <Marker
                key={emergency.id}
                position={emergency.location}
                icon={userIcon}
              >
                <Popup>{emergency.name}</Popup>
              </Marker>
            ) : null
          )}

          <Marker position={rescuerLocation} icon={rescuerIcon}>
            <Popup>Rescuer</Popup>
          </Marker>

          <DriftMarker
            position={dronePosition}
            duration={5000}
            icon={droneIcon}
          >
            <Popup>Drone Monitoring</Popup>
          </DriftMarker>
        </MapContainer>
      </div>
    </div>
  );
};

export default RescueLocations;
