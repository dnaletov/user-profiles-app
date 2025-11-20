'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { useApi } from './useApi';
import { Profile } from '@/types';
import { API_ROUTES } from '@/constants/api';

export function useProfile(id: string | undefined) {
  const { data, loading, error, execute } = useApi<Profile>();
  
  useEffect(() => {
    if (id) {
      execute(() => 
        axios.get(API_ROUTES.PROFILES.BY_ID(id), { withCredentials: true })
      );
    }
  }, [id]);
  
  return { profile: data, loading, error };
}
