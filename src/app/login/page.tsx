  "use client";

  import React, { useState, useEffect, Suspense, useMemo } from "react";
  import Image from "next/image";
  import Link from "next/link";
  import { useRouter, useSearchParams } from "next/navigation";
  import { Mail, Lock, Loader2, ArrowLeft, ShieldCheck, Terminal, Code2 } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { AnimatePresence, motion } from "framer-motion";

  function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // Developer Quotes
    const quotes = [
      "Welcome back, Commander. Ready to push some code?",
      "Every great developer was once where you are now.",
      "Compiling your workspace... please wait.",
      "First, solve the problem. Then, write the code.",
      "System.out.println('Welcome Developer');"
    ];
    const randomQuote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);

    useEffect(() => {
      const msg = searchParams.get("message");
      if (msg) setSuccessMsg(msg);
    }, [searchParams]);

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

      if (res.ok) {
        // Store user session
        sessionStorage.setItem("user", JSON.stringify(data));
        
        // --- FIX FOR THE 404 ERROR ---
        // 1. Get the raw callback parameter
        const rawCallback = searchParams.get("callback");
        
        // 2. Decode it to turn things like "%2Fapply%3Ftrack" back into "/apply?track"
        // 3. Fallback to home if no callback exists
        const destination = rawCallback ? decodeURIComponent(rawCallback) : "/";
        
        router.push(destination);
        router.refresh();
      } else {
        setError(data.error || "Authentication failed. Check your credentials.");
      }
    } catch (err) {
      setError("Network error. The server is unreachable.");
    } finally {
      setLoading(false);
    }
  };
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Back Button - Scaled down */}
        <div className="fixed top-6 left-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-xs font-bold uppercase tracking-tighter"
          >
            <ArrowLeft className="w-3 h-3" />
            Return
          </Link>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-4">
            <Link href="/" className="relative h-10 w-32">
              <Image
                src="/logo.png"
                alt="Inetz Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>
          <h2 className="text-center text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Student <span className="text-orange-500">Developer</span> Portal
          </h2>
          <p className="mt-1.5 text-center text-[11px] text-zinc-500 dark:text-zinc-400 font-medium italic">
            {randomQuote}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[400px]">
          <div className="bg-white dark:bg-zinc-900/40 py-8 px-6 shadow-xl shadow-zinc-200/40 dark:shadow-none border border-zinc-100 dark:border-zinc-800 rounded-3xl backdrop-blur-md">
            
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 text-[10px] font-bold"
                >
                  <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                  {error}
                </motion.div>
              )}
              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-2 text-emerald-600 text-[10px] font-bold"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  {successMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5 ml-1">
                  Student Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-orange-500 transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@student.inetz.com"
                    className="block w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5 ml-1">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Access Key
                  </label>
                  <Link href="#" className="text-[9px] font-bold text-zinc-400 hover:text-zinc-900 transition-colors">
                    Reset?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-orange-500 transition-colors">
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-[11px] font-black uppercase tracking-widest text-white bg-zinc-900 hover:bg-black focus:outline-none transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Terminal className="w-3.5 h-3.5" />
                    Initialize Session
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <p className="text-center text-[10px] text-zinc-500 uppercase tracking-tight">
                Don't have an ID?{" "}
                <Link
                  href="/register"
                  className="font-black text-orange-600 hover:text-orange-700 underline underline-offset-4"
                >
                  Join the Academy
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-zinc-300">
              <Code2 className="w-4 h-4" />
              <div className="h-px w-12 bg-zinc-100" />
              <Terminal className="w-4 h-4" />
            </div>
            <p className="text-center text-[9px] font-bold text-zinc-400 uppercase tracking-widest opacity-60">
              Inetz Technologies • Build. Deploy. Scale.
            </p>
          </div>
        </div>
      </div>
    );
  }

  export default function LoginPage() {
    return (
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Loading IDE...</span>
          </div>
        </div>
      }>
        <LoginContent />
      </Suspense>
    );
  }