"use client";

import React, { useState } from "react";
import { Phone, ShieldCheck, Loader2, AlertCircle } from "lucide-react";

interface PhoneLinkModalProps {
  isOpen: boolean;
  onSuccess: () => void;
}

export default function PhoneLinkModal({ isOpen, onSuccess }: PhoneLinkModalProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/student/link-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || "Failed to link phone number.");
      }
    } catch {
      setError("An error occurred while linking your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-zinc-100">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
            <Phone size={24} />
          </div>
          <h2 className="text-lg font-bold text-zinc-900">Link Your Student Record</h2>
          <p className="text-xs text-zinc-500">
            Please enter your registered mobile number to fetch your enrolled internship domain, courses, and payment receipts.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle size={15} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Mobile Phone Number *</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 text-zinc-400" size={15} />
              <input
                type="tel"
                required
                placeholder="10-digit registered number (e.g. 7093792955)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />} Verify & Link Account
          </button>
        </form>
      </div>
    </div>
  );
}