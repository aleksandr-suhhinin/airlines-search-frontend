import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import AirportAutosuggest from './AirportAutosuggest';
import { Alert } from 'react-bootstrap';
import { routes } from './constants';

interface RouteFormProps {
  onRouteUpdate: (routeData: any) => void;
}


function RouteForm({ onRouteUpdate }: RouteFormProps) {
  const [srcAirport, setSrcAirport] = useState<string>('');
  const [destAirport, setDestAirport] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSearchRoute = async () => {
    setError(null);
    try {
      const response = await axios.get(`${routes}${srcAirport}/${destAirport}`);
      onRouteUpdate(response.data);  
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          setError('Data not found (404)');
        } else if (axiosError.message) {
          setError(`An error occurred: ${axiosError.message}`);
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };


  return (
    <>
    <div className="container mt-4 d-flex flex-row">
      <div className="form-group mx-2">
        <label>Source Airport</label>
        <AirportAutosuggest callback={setSrcAirport} />
      </div>

      <div className="form-group mx-2">
        <label className="block text-gray-700">Destination Airport</label>
        <AirportAutosuggest callback={setDestAirport}/>
      </div>

      <button 
        style={{height: "30px", paddingTop: "1px"}}
        className="btn btn-primary mt-4"
        onClick={handleSearchRoute}>Search Route</button>

    </div>
      { error ? 
        <Alert variant="danger" className="mt-4">
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
        </Alert> : null
      }
    </>
  );
}

export default RouteForm;