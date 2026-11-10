"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { FormButton } from "@/components/auth/formButton";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const loginStore = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const clearLoginForm = () => {
      if (sessionStorage.getItem("just_logged_out") === "true") {
        setEmail("");
        setPassword("");
        setErrorMessage("");

        sessionStorage.removeItem("just_logged_out");
      }
    };

    clearLoginForm();

    window.addEventListener("pageshow", clearLoginForm);

    return () => {
      window.removeEventListener("pageshow", clearLoginForm);
    };
  }, []);

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async () => {
      await loginStore({ email, password });
    },
    onSuccess: () => {
      router.push("/dashboard/analysis");
    },
    onError: (err: any) => {
      setErrorMessage(
        err.response?.data?.errors?.email?.[0] ||
          err.response?.data?.message ||
          err.message ||
          "Invalid email or password.",
      );
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    loginMutation();
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
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Please enter your details to sign in.
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
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="off"
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-900 focus:outline-none"
          />
        </div>
        <FormButton
          type="submit"
          disabled={isPending}
          size="sm"
          className="w-full"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </FormButton>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
