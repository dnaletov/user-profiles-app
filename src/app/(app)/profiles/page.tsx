"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "../../../components/ProfileCard";
import Modal from "../../../components/Modal";
import { Profile } from "@/types";
import { useProfiles } from "@/hooks/useProfiles";
import { Button } from "@/components/ui";
import { APP_ROUTES } from "@/constants/api";
import { ProfileDetails } from "@/components/ProfileDetails";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProfilesPage() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const { profiles, loading, error, fetchProfiles } = useProfiles();
  const { t } = useTranslation();

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">{t("yourProfiles")}</h1>
        <Button
          onClick={() => router.push(APP_ROUTES.PROFILES.CREATE)}
        >
          {t("createProfile")}
        </Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-gray-500">{t("loading")}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles?.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedProfile(p)}
            className="cursor-pointer"
          >
            <ProfileCard profile={p} onDelete={fetchProfiles} />
          </div>
        ))}
      </div>

      <Modal
        open={!!selectedProfile}
        onCancel={() => setSelectedProfile(null)}
        title={
          selectedProfile
            ? selectedProfile.firstName + " " + selectedProfile.lastName
            : ""
        }
        content={
          selectedProfile && (
            <ProfileDetails profile={selectedProfile} variant="full" />
          )
        }
      />
    </div>
  );
}
