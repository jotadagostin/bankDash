"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: conectar ao endpoint de signup quando o backend estiver pronto
  }

  return (
    <div className="flex h-full w-full flex-col justify-center overflow-y-auto px-8 py-12 sm:px-16 lg:w-[45%] lg:px-20">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-10 flex items-center gap-2">
          <Image
            src="/logo.png"
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
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-(--color-text-secondary)">
          Start managing your finances in one place.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-sm text-(--color-text-secondary)"
            >
              Full name
            </label>
            <div className="flex items-center gap-2 rounded-(--radius-input) border border-gray-200 px-3.5 py-2.5 focus-within:border-(--color-primary)">
              <User size={16} className="text-(--color-text-muted)" />
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Charlene Reed"
                className="w-full text-sm text-(--color-text-primary) outline-none placeholder:text-(--color-text-muted)"
              />
            </div>
          </div>

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
              className="text-sm text-[var(--color-text-secondary)]"
            >
              Password
            </label>
            <div className="flex items-center gap-2 rounded-[var(--radius-input)] border border-gray-200 px-3.5 py-2.5 focus-within:border-[var(--color-primary)]">
              <Lock size={16} className="text-[var(--color-text-muted)]" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-[var(--color-text-muted)]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 cursor-pointer rounded-[var(--radius-input)] bg-[var(--color-primary)] py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Create account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--color-primary)] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
