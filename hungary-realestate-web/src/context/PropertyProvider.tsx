import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import samplePropertiesData from './properties.json';

export interface Property {
  id: number;
  title: string;
  description?: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  price: number;
  type: string;
  images?: string[] | null;
}

interface PropertyContextModel {
  properties: Property[];
  add: (property: Property) => void;
}

export const PropertyContext = createContext<PropertyContextModel>({} as PropertyContextModel);

export const PropertyProvider: FC = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(samplePropertiesData);

  const add = useCallback(
    (property: Property) => {
      setProperties([...properties, property]);
    },
    [properties],
  );

  useEffect(() => {
    // fetch properties
    const fetchProperties = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/properties`);
      console.log(res);
    };
    fetchProperties();
  }, []);

  const value = useMemo(() => ({ properties, add }), [properties, add]);

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
};

export const useProperty = () => useContext(PropertyContext);
