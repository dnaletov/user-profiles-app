"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import Modal from "@/components/Modal";
import { Profile } from "@/types";
import { useProfiles } from "@/hooks/useProfiles";
import { Button, Skeleton } from "@/components/ui";
import { APP_ROUTES } from "@/constants/api";
import { ProfileDetails } from "@/components/ProfileDetails";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProfilesPage() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const { profiles, loading, error, fetchProfiles } = useProfiles();
  const { t } = useTranslation();

  useEffect(() => {
    const controller = new AbortController();
    fetchProfiles(controller.signal);
    return () => controller.abort();
  }, [fetchProfiles]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("yourProfiles")}</h1>
        <Link href={APP_ROUTES.PROFILES.CREATE}>
          <Button className="min-w-[120px]">{t("createProfile")}</Button>
        </Link>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="w-full h-96 rounded-xl" />
          ))}
        </div>
      )}
      {!loading && profiles && profiles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProfile(p)}
              className="cursor-pointer h-96"
            >
              <ProfileCard profile={p} onDelete={fetchProfiles} />
            </div>
          ))}
        </div>
      )}
      {!loading && profiles && profiles.length === 0 && (
        <p className="text-gray-500 mt-8 text-center bg-gray-50 py-10 rounded-xl border border-dashed border-gray-300">
          No profiles found.
        </p>
      )}
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
