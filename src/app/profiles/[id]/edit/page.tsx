"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
// import PhotoUpload from "../../../../../components/PhotoUpload";
import axios, { AxiosError } from "axios";
import RichTextEditor from "../../../../components/RichTextEditor";
import { Profile, ProfileData } from "@/app/types/profile";

export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [formData, setFormData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    photo: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get<Profile>(`/api/profiles/${id}`, {
          withCredentials: true,
        });
        const data = res.data;
        setFormData({
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    try {
      await axios.put(`/api/profiles/${id}`, formData, {
        withCredentials: true,
      });
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

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="date"
          value={formData.birthDate}
          onChange={(e) => handleChange("birthDate", e.target.value)}
        />
        {/* <PhotoUpload onUpload={(val) => handleChange("photo", val)} /> */}
        <RichTextEditor
          value={formData.description || ""}
          onChange={(val) => handleChange("description", val)}
        />
        <button className="bg-green-500 text-white p-2 rounded w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}
