"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import RichTextEditor from "../../../../components/RichTextEditor";
import PhotoUpload from "@/components/PhotoUpload";
import { ProfileData } from "@/app/types/profile";

export default function CreateProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    photo: "",
    description: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("/api/profiles", formData, { withCredentials: true });
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
      <PhotoUpload
        value={formData.photo}
        onChange={(val) => handleChange("photo", val)}
      />

      <h1 className="text-2xl font-bold mb-4">Create Profile</h1>

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

        <RichTextEditor
          value={formData.description || ""}
          onChange={(val) => handleChange("description", val)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="bg-blue-500 text-white p-2 rounded w-full">
          Create
        </button>
      </form>
    </div>
  );
}
