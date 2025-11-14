"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import ProfileCard from "../../components/ProfileCard";
import { Profile } from "../types/profile";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfiles();
  }, []);

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

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    try {
      await axios.delete(`/api/profiles/${id}`, { withCredentials: true });
      fetchProfiles();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error);
      } else {
        setError("Unknown error occurred while deleting the profile");
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      router.replace("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profiles</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-3 gap-4">
        {profiles.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <ProfileCard profile={p} />
            <div className="flex justify-between mt-2">
              <button
                className="bg-yellow-400 text-white px-2 py-1 rounded"
                onClick={() => router.push(`/profiles/${p.id}/edit`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </button>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-2 rounded mt-3"
            >
              Logout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
