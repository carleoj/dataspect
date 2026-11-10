"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { INVALID_AUTH_RESPONSE_ERROR } from "@/services/authService";
import { FormButton } from "@/components/auth/formButton";

export default function SignupPage() {
  const router = useRouter();
  const registerStore = useAuthStore((state) => state.register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: async () => {
      await registerStore({ name, email, password });
    },
    onSuccess: () => {
      router.push("/dashboard/analysis");
    },
    onError: (err: unknown) => {
      const response = axios.isAxiosError(err) ? err.response : undefined;

      setErrorMessage(
        err instanceof Error && err.message === INVALID_AUTH_RESPONSE_ERROR
          ? "Unable to create your account. Check your credentials."
          : response?.data?.message ||
              (err instanceof Error ? err.message : undefined) ||
              "Something went wrong during registration.",
      );
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    signupMutation();
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center text-center rounded-full px-2">
        <Image
          src="/logo-navy-dark.svg"
          alt=""
          width={44}
          height={44}
          priority
        />
        <h1 className="mt-4 text-xl font-semibold tracking-tight text-gray-900">
          Create an account
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Start inspecting your datasets today.
        </p>
      </div>

      {errorMessage && (
        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full name
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-900 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-900 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-900 focus:outline-none"
          />
        </div>

        <FormButton
          type="submit"
          disabled={isPending}
          size="sm"
          className="w-full"
        >
          {isPending ? "Creating account..." : "Create account"}
        </FormButton>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
