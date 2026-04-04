"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Local State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Check for registration success message in URL
  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) setSuccessMsg(msg);
  }, [searchParams]);

  // 3. Login Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        sessionStorage.setItem("user", JSON.stringify(data));
        router.push("/");
        router.refresh(); // Forces a refresh to update middleware state
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setError("Server connection failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 flex flex-col items-center">
      <Link
        href="/"
        className="mb-10 block transition-transform hover:scale-105"
      >
        <div className="relative h-16 w-48 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Inetz Logo"
            fill
            className="object-contain"
          />
        </div>
      </Link>

      <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-10 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Welcome back
        </h1>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed text-sm">
          Log in to access your program dashboard and resources.
        </p>

        {/* Feedback Messages */}
        {error && (
          <div className="mt-5 p-3 text-xs font-bold text-red-500 bg-red-50 border border-red-100 rounded-xl">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mt-5 p-3 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl">
            {successMsg}
          </div>
        )}

        <form className="mt-10 space-y-6" onSubmit={handleLogin}>
          <label className="block">
            <div className="text-sm font-medium">Email</div>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400 dark:border-zinc-800 dark:bg-zinc-950"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium">Password</div>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400 dark:border-zinc-800 dark:bg-zinc-950"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            {loading ? "Verifying..." : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-zinc-900 dark:text-white font-bold underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
