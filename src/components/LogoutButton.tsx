import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";
import { Button } from "./ui";
import { useTranslation } from "@/hooks/useTranslation";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const { t } = useTranslation();

  const confirmLogout = async () => {
    setLoading(true);
    setShowConfirm(false);
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="px-4 py-2 min-w-[120px]"
      >
        {loading ? t("loggingOut") : t("logout")}
      </Button>
      <Modal
        open={showConfirm}
        title={t("logout")}
        content={t("confirmLogout")}
        onConfirm={confirmLogout}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
