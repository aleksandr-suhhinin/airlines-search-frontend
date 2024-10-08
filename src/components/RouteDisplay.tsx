import React from 'react';

interface RouteDisplayProps {
  route: {
    hops: { name: string }[];
    distance: number;
  };
}

function RouteDisplay({ route }: RouteDisplayProps) {
  return (
    <div className="route-display">
      <h3>Route:</h3>
      <p>{route.hops.map(hop => hop.name).join(' -> ')}</p>
      <p>Distance: {route.distance} km</p>
    </div>
  );
}

export default RouteDisplay;