"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // To redirect after success

export default function RegisterPage() {
  const router = useRouter();
  
  // 1. State Management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.type === 'text' ? 'name' : e.target.type]: e.target.value });
    // If you used 'name' attribute on inputs, use: [e.target.name]: e.target.value
  };

  // 3. Submit Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Success! Redirect to login or dashboard
        router.push("/login?message=Account created successfully");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 flex flex-col items-center">
      <Link href="/" className="mb-10 block transition-transform hover:scale-105">
        <div className="relative h-16 w-48 flex items-center justify-center">
          <Image src="/logo.png" alt="Inetz Logo" fill className="object-contain" />
        </div>
      </Link>

      <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-10 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Join Inetz</h1>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed text-sm">
           Take the first step towards your dream tech career today.
        </p>

        {/* Error Message Display */}
        {error && (
          <div className="mt-4 p-3 text-xs font-bold text-red-500 bg-red-50 border border-red-100 rounded-xl">
            {error}
          </div>
        )}

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <label className="block">
            <div className="text-sm font-medium">Full name</div>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400 dark:border-zinc-800 dark:bg-zinc-950"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium">Email</div>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400 dark:border-zinc-800 dark:bg-zinc-950"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium">Password</div>
            <input
              required
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400 dark:border-zinc-800 dark:bg-zinc-950"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            {loading ? "Processing..." : "Create account"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-xs text-zinc-500">
          Already have an account? <Link href="/login" className="text-zinc-900 dark:text-white font-bold underline">Login</Link>
        </p>
      </div>
    </div>
  );
}