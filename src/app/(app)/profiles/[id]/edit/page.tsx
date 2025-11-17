"use client";

import { useEffect, useState } from "react";
import ProfileForm from "@/components/ProfileForm";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Profile, ProfileData } from "@/app/types/profile";

export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [initialData, setInitialData] = useState<Partial<ProfileData>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get<Profile>(`/api/profiles/${id}`, {
          withCredentials: true,
        });
        const data = res.data;

        setInitialData({
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate.split("T")[0],
          photo: data.photo || "",
          description: data.description || "",
        });
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.error);
        } else {
          setError("An unexpected error occurred");
        }
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleSubmit = async (data: ProfileData) => {
    if (!id) return;

    try {
      await axios.put(`/api/profiles/${id}`, data, { withCredentials: true });
      router.push("/profiles");
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error);
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <ProfileForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}
