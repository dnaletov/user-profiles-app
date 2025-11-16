"use client";

import { validateEmail, validatePassword } from "@/utils/validation";
import AuthForm from "../../../components/AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    validateEmail(email);
    validatePassword(password);

    await axios.post(
      "/api/auth/login",
      { email, password },
      { withCredentials: true }
    );
    router.push("/profiles");
  };

  return (
    <AuthForm
      title="Login"
      submitText="Login"
      onSubmit={handleLogin}
      footerText="Create account"
      footerAction={() => router.push("/register")}
    />
  );
}
