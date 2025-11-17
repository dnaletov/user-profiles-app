"use client";

import { useState, FormEvent } from "react";
import { AxiosError } from "axios";

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

        <input
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 mb-4 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white p-2 rounded w-full">
          {submitText}
        </button>

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
