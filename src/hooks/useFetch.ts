import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/axiosConfig';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFetchResult<T> extends FetchState<T> {
  refetch: () => Promise<void>;
}

function useFetch<T>(url: string, options?: RequestInit): UseFetchResult<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await apiClient.get<T>(url, options);
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('An unknown error occurred'),
      });
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}

export default useFetch;