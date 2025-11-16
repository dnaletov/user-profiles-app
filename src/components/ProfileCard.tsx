"use client";

import { Profile } from "@/app/types/profile";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";

export default function ProfileCard({
  profile,
  onDelete,
}: {
  profile: Profile;
  onDelete: () => void;
}) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const confirmDelete = async () => {
    setShowConfirm(false);
    await axios.delete(`/api/profiles/${profile.id}`, {
      withCredentials: true,
    });
    onDelete();
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold">
        {profile.firstName} {profile.lastName}
      </h2>

      <p className="text-gray-500 mt-1">{profile.birthDate?.split("T")[0]}</p>

      <div
        className="mt-3 text-sm text-gray-700"
        dangerouslySetInnerHTML={{ __html: profile.description || "" }}
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={() => router.push(`/profiles/${profile.id}/edit`)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => setShowConfirm(true)}
        >
          Delete
        </button>
      </div>
      <Modal
        open={showConfirm}
        title="Delete Profile"
        message="Are you sure you want to delete this profile?"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
