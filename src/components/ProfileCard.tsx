import { Profile } from "@/app/types/profile";
import React from "react";

const ProfileCard: React.FC<{ profile: Profile }> = ({ profile }) => {
  return (
    <div className="border p-4 rounded shadow">
      {profile.photo && (
        <img
          src={profile.photo}
          alt={`${profile.firstName} ${profile.lastName}`}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}
      <h2 className="font-bold text-lg">
        {profile.firstName} {profile.lastName}
      </h2>
      <p className="text-sm text-gray-500">Birthdate: {profile.birthDate}</p>
      {profile.description && (
        <p className="mt-2 text-gray-700">{profile.description}</p>
      )}
    </div>
  );
};

export default ProfileCard;
