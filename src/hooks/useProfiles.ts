'use client';

import axios from 'axios';
import { useApi } from './useApi';
import { Profile } from '@/types';
import { API_ROUTES } from '@/constants/api';

export function useProfiles() {
  const { data, loading, error, execute } = useApi<Profile[]>();
  
  const fetchProfiles = () => execute(() => 
    axios.get(API_ROUTES.PROFILES.LIST, { withCredentials: true })
  );
  
  return { profiles: data, loading, error, fetchProfiles };
}
