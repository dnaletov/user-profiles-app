import { Profile } from "@/types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";
import { ProfileDetails } from "./ProfileDetails";
import { Button } from "./ui";
import { API_ROUTES } from "@/constants/api";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProfileCard({
  profile,
  onDelete,
}: {
  profile: Profile;
  onDelete: () => void;
}) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const { t } = useTranslation();

  const confirmDelete = async () => {
    setShowConfirm(false);
    await axios.delete(API_ROUTES.PROFILES.BY_ID(profile.id), {
      withCredentials: true,
    });
    onDelete();
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between w-auto h-96">
      <ProfileDetails profile={profile} variant="card" />

      <div className="flex justify-between mt-4">
        <Button
          variant="warning"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/profiles/${profile.id}/edit`);
          }}
          className="px-3 py-1 min-w-[90px]"
        >
          {t("edit")}
        </Button>
        <Button
          variant="danger"
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirm(true);
          }}
          className="px-3 py-1 min-w-[90px]"
        >
          {t("delete")}
        </Button>
      </div>
      <Modal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title={t("deleteProfile")}
        content={t("confirmDelete")}
      />
    </div>
  );
}
