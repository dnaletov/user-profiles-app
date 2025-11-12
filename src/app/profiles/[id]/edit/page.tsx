"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
// import PhotoUpload from "../../../../../components/PhotoUpload";
import axios from "axios";
import RichTextEditor from "../../../../../components/RichTextEditor";

export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!id) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/profiles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setBirthDate(data.birthDate ? data.birthDate.split("T")[0] : "");
        setPhoto(data.photo || "");
        setDescription(data.description || "");
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.error || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!id) return;

    try {
      await axios.put(
        `/api/profiles/${id}`,
        { firstName, lastName, birthDate, photo, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push("/profiles");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.error || "Failed to update profile");
    }
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
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        {/* <PhotoUpload onUpload={setPhoto} /> */}
        <RichTextEditor value={description} onChange={setDescription} />
        <button className="bg-green-500 text-white p-2 rounded w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}
