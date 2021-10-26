import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Message } from 'shared';

export interface Property {
  address: string;
  bathrooms: number;
  bedrooms: number;
  city: string;
  create_at: Date;
  description?: string;
  garage: number;
  id: number;
  images: string[] | null;
  postcode: string;
  price: number;
  street: string;
  title: string;
  type: string;
  update_at: Date;
}

interface PropertyContextModel {
  properties: Property[];
  createProperty: (property: Property) => Promise<string>;
}

export const PropertyContext = createContext<PropertyContextModel>({} as PropertyContextModel);

export const PropertyProvider: FC = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);

  const fetchProperties = async () => {
    const res = await axios.get<never, AxiosResponse<{ results: Property[] }>>(`${process.env.REACT_APP_API_URL}api/properties`);
    setProperties(res.data.results);
  };

  const createProperty = useCallback(async (property: Property) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}api/properties`, property);
      await fetchProperties();
      return Promise.resolve(Message.Success.PropertyCreated);
    } catch (err) {
      return Promise.reject(Message.Error.Common);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, []);

  const value = useMemo(() => ({ properties, createProperty }), [properties, createProperty]);

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
};

export const useProperty = () => useContext(PropertyContext);
