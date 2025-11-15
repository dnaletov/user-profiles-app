"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={logout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition disabled:opacity-60"
      disabled={loading}
      aria-label="Logout"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
