import axios from 'axios';
import queryString from 'query-string';
import { ClockInterface, ClockGetQueryInterface } from 'interfaces/clock';
import { GetQueryInterface } from '../../interfaces';

export const getClocks = async (query?: ClockGetQueryInterface) => {
  const response = await axios.get(`/api/clocks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createClock = async (clock: ClockInterface) => {
  const response = await axios.post('/api/clocks', clock);
  return response.data;
};

export const updateClockById = async (id: string, clock: ClockInterface) => {
  const response = await axios.put(`/api/clocks/${id}`, clock);
  return response.data;
};

export const getClockById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/clocks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteClockById = async (id: string) => {
  const response = await axios.delete(`/api/clocks/${id}`);
  return response.data;
};
