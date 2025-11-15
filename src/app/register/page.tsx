"use client";

import { validateEmail, validatePassword } from "@/utils/validation";
import AuthForm from "../../components/AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    validateEmail(email);
    validatePassword(password);

    await axios.post(
      "/api/auth/register",
      { email, password },
      { withCredentials: true }
    );

    router.push("/login");
  };

  return (
    <AuthForm
      title="Register"
      submitText="Register"
      onSubmit={handleRegister}
      footerText="Already have an account?"
      footerAction={() => router.push("/login")}
    />
  );
}
