"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProfileCard from "../../../components/ProfileCard";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log({ token });

      const res = await axios.get("/api/profiles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    await axios.delete(`/api/profiles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProfiles();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profiles</h1>
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
          </div>
        ))}
      </div>
    </div>
  );
}
