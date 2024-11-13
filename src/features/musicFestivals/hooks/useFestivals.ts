import { useQuery } from '@tanstack/react-query';
import { mockData } from '../../../mockData/mockData';
import { Festival } from '../types/festivalsType';

const rootUrl = process.env.REACT_APP_ROOT_URL;

const getFestivals = async (): Promise<Festival[]> => {
  const response = await fetch(`${rootUrl}/api/v1/festivals`);
  return await response.json();
};

const getMockFestivals = () => mockData;

export const useFestivals = () => {
  return useQuery<Festival[], { message: string }>({
    queryKey: ['festivals'],
    queryFn: getMockFestivals,
    retry: false,
  });
};
