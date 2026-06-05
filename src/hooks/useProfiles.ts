"use client";

import axios from "axios";
import { useApi } from "./useApi";
import { Profile } from "@/types";
import { API_ROUTES } from "@/constants/api";

export function useProfiles() {
  const { data, loading, error, execute } = useApi<Profile[]>();

  const fetchProfiles = (signal?: AbortSignal) =>
    execute(
      (s) =>
        axios.get(API_ROUTES.PROFILES.LIST, {
          withCredentials: true,
          signal: s || signal,
        }),
      signal,
    );

  return { profiles: data, loading, error, fetchProfiles };
}
