"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import ProfileCard from "../../../components/ProfileCard";
import { Profile } from "../../types/profile";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchProfiles = async () => {
    try {
      const res = await axios.get("/api/profiles", { withCredentials: true });
      setProfiles(res.data);
      setError(null);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error);
        if (err.response?.status === 401) {
          router.replace("/login");
        }
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchProfiles();
    };
    load();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Profiles</h1>
        <button
          onClick={() => router.push("/profiles/create")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Profile
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((p) => (
          <ProfileCard key={p.id} profile={p} onDelete={fetchProfiles} />
        ))}
      </div>
    </div>
  );
}
