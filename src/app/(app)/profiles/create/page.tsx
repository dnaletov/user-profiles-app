"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
// import PhotoUpload from "../../components/PhotoUpload";
import axios, { AxiosError } from "axios";
import RichTextEditor from "../../../../components/RichTextEditor";

export default function CreateProfilePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        "/api/profiles",
        { firstName, lastName, birthDate, photo, description },
        { withCredentials: true }
      );
      router.push("/profiles");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data?.error);
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
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
        <button className="bg-blue-500 text-white p-2 rounded w-full">
          Create
        </button>
      </form>
    </div>
  );
}
