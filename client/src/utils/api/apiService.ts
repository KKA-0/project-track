import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE_URL = process.env.NEXT_PUBLIC_HOST; // Ensure this is set in .env.local

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch data (GET request)
const fetchData = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

// Function to post data (POST request) with a generic type
const postData = async <T>({ url, data }: { url: string; data: T }): Promise<T> => {
  const response = await api.post<T>(url, data);
  return response.data;
};

// Custom hook for GET requests using React Query
export const useFetch = <T>(key: string, url: string, options = {}) => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: () => fetchData(url),
    ...options,
  });
};

// Custom hook for POST requests using React Query
export const usePost = <T>(endpoint: string) => {
  const queryClient = useQueryClient();
  console.log(endpoint);
  return useMutation<T, Error, T>({
    mutationKey: [endpoint],
    mutationFn: (data) => postData({ url: endpoint, data }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });
};