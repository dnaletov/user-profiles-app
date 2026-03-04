"use client";

import { useEffect } from "react";
import axios from "axios";
import { useApi } from "./useApi";
import { Profile } from "@/types";
import { API_ROUTES } from "@/constants/api";

export function useProfile(id: string | undefined) {
  const { data, loading, error, execute } = useApi<Profile>();

  useEffect(() => {
    if (id) {
      const controller = new AbortController();
      execute(
        (signal) =>
          axios.get(API_ROUTES.PROFILES.BY_ID(id), {
            withCredentials: true,
            signal,
          }),
        controller.signal,
      );
      return () => controller.abort();
    }
  }, [id, execute]);

  return { profile: data, loading, error };
}
