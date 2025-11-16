"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

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
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition disabled:opacity-60"
        disabled={loading}
        aria-label="Logout"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
      <Modal
        open={showConfirm}
        title="Logout"
        message="Are you sure you want to logout?"
        onConfirm={confirmLogout}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
