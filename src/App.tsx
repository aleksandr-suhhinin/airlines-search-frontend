import React, { useState } from 'react';
import RouteForm from './components/RouteForm';
import MapView, { Hop } from './components/MapView';
import RouteDisplay from './components/RouteDisplay';

interface RouteData {
  hops: Hop[];
  distance: number;
}

function App() {
  const [route, setRoute] = useState<RouteData | null>(null); // Хранение данных о маршруте

  const handleRouteUpdate = (routeData: RouteData) => {
    setRoute(routeData);
  };

  return (
    <div className="App">
      <RouteForm onRouteUpdate={handleRouteUpdate} />
      {route && <RouteDisplay route={route} />}
      <MapView route={route} />
    </div>
  );
}

export default App;