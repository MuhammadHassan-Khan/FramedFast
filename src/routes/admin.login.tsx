import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

const LOGIN_RATE_LIMIT_WINDOW = 60_000;
const LOGIN_RATE_LIMIT_MAX = 5;

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login — FramedFast" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginAttempts = useRef<number[]>([]);

  function checkLoginRateLimit(): boolean {
    const now = Date.now();
    const windowStart = now - LOGIN_RATE_LIMIT_WINDOW;
    loginAttempts.current = loginAttempts.current.filter((t) => t > windowStart);
    if (loginAttempts.current.length >= LOGIN_RATE_LIMIT_MAX) return false;
    loginAttempts.current.push(now);
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!checkLoginRateLimit()) {
      setError("Too many login attempts. Please wait a minute and try again.");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    router.navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen bg-[#0b0b0c] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-[#FA680A] text-black font-black text-xl">
            F
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-white tracking-tight">
            FramedFast Admin
          </h1>
          <p className="mt-1 text-sm text-white/50">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@framefast.com"
              required
              className="w-full bg-white/5 border border-white/10 focus:border-[#FA680A] outline-none text-white px-4 py-3 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-white/5 border border-white/10 focus:border-[#FA680A] outline-none text-white px-4 py-3 rounded-lg text-sm"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FA680A] text-black font-semibold py-3 rounded-lg text-sm hover:bg-[#e05e08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
