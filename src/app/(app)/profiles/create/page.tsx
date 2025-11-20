"use client";

import ProfileForm from "@/components/ProfileForm";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ProfileData } from "@/types";
import { useApi } from "@/hooks/useApi";
import { API_ROUTES, APP_ROUTES } from "@/constants/api";
import { useTranslation } from "@/hooks/useTranslation";

export default function CreateProfilePage() {
  const router = useRouter();
  const { error, execute } = useApi<ProfileData>();
  const { t } = useTranslation();

  const handleSubmit = async (data: ProfileData) => {
    try {
      await execute(() => 
        axios.post(API_ROUTES.PROFILES.LIST, data, { withCredentials: true })
      );
      router.push(APP_ROUTES.PROFILES.LIST);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t("createProfile")}</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <ProfileForm onSubmit={handleSubmit} submitLabel={t("createProfile")} />
    </div>
  );
}
