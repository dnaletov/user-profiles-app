'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError, AxiosResponse } from 'axios';
import { APP_ROUTES } from '@/constants/api';

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const execute = async (apiCall: () => Promise<AxiosResponse<T>>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiCall();
      setData(res.data);
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error || 'An error occurred');
        if (err.response?.status === 401) {
          router.replace(APP_ROUTES.LOGIN);
        }
      } else {
        setError('Unknown error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { data, loading, error, execute, reset };
}
