"use client";

import { useState, FormEvent } from "react";
import { AxiosError } from "axios";
import { Input, Button } from "./ui";
import { useTranslation } from "@/hooks/useTranslation";

interface AuthFormProps {
  title: string;
  submitText: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  footerText: string;
  footerAction: () => void;
}

export default function AuthForm({
  title,
  submitText,
  onSubmit,
  footerText,
  footerAction,
}: AuthFormProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await onSubmit(email, password);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">{title}</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="mb-2">
          <Input
            placeholder={t("email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" fullWidth>
          {submitText}
        </Button>

        <p
          className="text-blue-500 cursor-pointer mt-3 text-center"
          onClick={footerAction}
        >
          {footerText}
        </p>
      </form>
    </div>
  );
}
