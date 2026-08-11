"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to auth once backend is in place
  }

  return (
    <div className="flex h-full w-full flex-col justify-center overflow-y-auto px-8 py-12 sm:px-16 lg:w-[45%] lg:px-20">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-10 flex items-center gap-2">
          <Image
            src="/logo-form.png"
            alt="BankDash"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-semibold text-(--color-heading)">
            BankDash.
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-(--color-heading)">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-(--color-text-secondary)">
          Sign in to continue to your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm text-(--color-text-secondary)"
            >
              Email
            </label>
            <div className="flex items-center gap-2 rounded-(--radius-input) border border-gray-200 px-3.5 py-2.5 focus-within:border-(--color-primary)">
              <Mail size={16} className="text-(--color-text-muted)" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full text-sm text-(--color-text-primary) outline-none placeholder:text-(--color-text-muted)"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm text-(--color-text-secondary)"
            >
              Password
            </label>
            <div className="flex items-center gap-2 rounded-(--radius-input) border border-gray-200 px-3.5 py-2.5 focus-within:border-(--color-primary)">
              <Lock size={16} className="text-(--color-text-muted)" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-sm text-(--color-text-primary) outline-none placeholder:text-(--color-text-muted)"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-(--color-text-muted)"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-(--color-text-secondary)">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 accent-(--color-primary)"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-(--color-primary) hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="mt-2 rounded-(--radius-input) bg-(--color-primary) py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Sign in
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-(--color-text-secondary)">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-(--color-primary) hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
