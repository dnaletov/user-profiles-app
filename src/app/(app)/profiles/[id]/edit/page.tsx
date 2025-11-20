"use client";

import { useEffect, useState } from "react";
import ProfileForm from "@/components/ProfileForm";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ProfileData } from "@/types";
import { useProfile } from "@/hooks/useProfile";
import { useApi } from "@/hooks/useApi";
import { formatDateForInput } from "@/utils/formatters";
import { API_ROUTES, APP_ROUTES } from "@/constants/api";
import { useTranslation } from "@/hooks/useTranslation";

export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { profile, loading, error: fetchError } = useProfile(id);
  const { t } = useTranslation();
  
  const { error: updateError, execute } = useApi<ProfileData>();
  const [initialData, setInitialData] = useState<Partial<ProfileData>>({});

  useEffect(() => {
    if (profile) {
      setInitialData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthDate: formatDateForInput(profile.birthDate),
        photo: profile.photo || "",
        description: profile.description || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (data: ProfileData) => {
    if (!id) return;

    try {
      await execute(() =>
        axios.put(API_ROUTES.PROFILES.BY_ID(id), data, { withCredentials: true })
      );
      router.push(APP_ROUTES.PROFILES.LIST);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <p className="p-6">{t("loading")}</p>;
  if (fetchError) return <p className="p-6 text-red-500">{fetchError}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t("edit")} Profile</h1>
      {updateError && <p className="text-red-500 mb-2">{updateError}</p>}
      <ProfileForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel={t("saveChanges")}
      />
    </div>
  );
}
