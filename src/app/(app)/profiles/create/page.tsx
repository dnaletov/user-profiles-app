"use client";

import ProfileForm from "@/components/ProfileForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { ProfileData } from "@/app/types/profile";

export default function CreateProfilePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ProfileData) => {
    try {
      await axios.post("/api/profiles", data, { withCredentials: true });
      router.push("/profiles");
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error);
      } else {
        setError("Unexpected error");
      }
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <ProfileForm onSubmit={handleSubmit} submitLabel="Create" />
    </div>
  );
}
