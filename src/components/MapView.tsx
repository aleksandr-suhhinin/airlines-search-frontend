import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngBounds, LatLngExpression, LatLngTuple, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export interface Hop {
  iata: string;
  name: string; 
  location: {
    latitude: number; 
    longitude: number;
  }
}

interface MapViewProps {
  route: {
    hops: Hop[] | [];
  } | null;
}

interface ChangeViewProps {
  center: LatLngExpression;
  zoom: number;
}

const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const AutoZoom: React.FC<{ bounds: LatLngBounds }> = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
};


const MapView: React.FC<MapViewProps> = ({ route }) => {
  const [coordinates, setCoordinates] = useState<LatLngExpression[]>([]);
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const customMarkerIcon = new Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41], 
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  useEffect(() => {
    if (route && route.hops) {
      const coords = route.hops.map((hop) => [hop.location.latitude, hop.location.longitude] as LatLngTuple);
      setCoordinates(coords);

      const leafletBounds = new LatLngBounds(coords);
      setBounds(leafletBounds);
    }
  }, [route]);

  if (!coordinates.length || !bounds) return null;
  
  return (
    <div className="map-view" style={{ height: '500px', width: '100%' }}>
      <MapContainer style={{ height: '100%', width: '100%' }} zoom={5} center={coordinates[0]} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ChangeView center={coordinates[0]} zoom={5} />
        <AutoZoom bounds={bounds} />
        <Polyline positions={coordinates} pathOptions={{ color: 'blue' }} />

        {route?.hops.map((hop, idx) => (
          <Marker key={idx} position={[hop.location.latitude, hop.location.longitude]} icon={customMarkerIcon}>
            <Popup>{hop.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;