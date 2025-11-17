"use client";

import { Profile } from "@/app/types/profile";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import noPhotoImg from "../../public/nophoto.png";

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
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between w-auto h-96">
      <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
        <Image
          src={profile.photo || noPhotoImg}
          alt={profile.photo ? "profile photo" : "No Photo"}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="object-cover"
          loading="eager"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold truncate">
          {profile.firstName} {profile.lastName}
        </h2>

        <p className="text-gray-500 mt-1">
          {profile.birthDate
            ? new Date(profile.birthDate)
                .toLocaleDateString("en-GB")
                .replace(/\//g, ".")
            : ""}
        </p>

        <div
          className="mt-3 text-sm text-gray-700 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={{ __html: profile.description || "" }}
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/profiles/${profile.id}/edit`);
          }}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirm(true);
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
