import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { autosuggestions } from './constants';

export interface Airport {
  id: string;
  icao: string;
  iata: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface AirportAutosuggestProps {
    callback: Function,
}


const fetchSuggestions = async (input: string): Promise<Airport[]> => {
  const response = await axios.get(`${autosuggestions}${input}`);
  return response.data;
};

const AirportAutosuggest = ({callback}: AirportAutosuggestProps) => {
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [value, setValue] = useState<string>('');

  const getSuggestionValue = (suggestion: Airport) => suggestion.iata;

  const renderSuggestion = (suggestion: Airport) => (
    <div>
      {suggestion.iata} - {suggestion.name}
    </div>
  );

  const onSuggestionsFetchRequested = async ({ value }: { value: string }) => {
    if (value.length > 2) {
      const suggestions = await fetchSuggestions(value);
      setSuggestions(suggestions);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event: React.FormEvent<any>, { newValue }: any) => {
    setValue(newValue);
    callback(newValue);
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: 'Type an airport...',
        value,
        onChange
      }}
    />
  );
};

export default AirportAutosuggest;