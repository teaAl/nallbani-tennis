"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuthPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setError("Please enter a password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        if (res.status === 403) {
          // Blocked
          setError(data.message || "Access blocked. Please try again later.");
          setRemainingAttempts(0);
        } else if (res.status === 401) {
          // Wrong password
          setError(data.message || "Invalid password");
          setRemainingAttempts(data.remainingAttempts ?? null);
        } else {
          setError("An error occurred. Please try again.");
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 min-h-screen flex items-center justify-center bg-[linear-gradient(to_right,rgba(16,24,40,0.9),rgba(16,24,40,0.9)),url('/images/parallax-4.jpg')] bg-fixed bg-bottom bg-no-repeat">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 animate-fade animate-once animate-ease-in shadow-lg rounded-lg p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-pear text-4xl font-poppins font-bold text-shadow-2xs">Admin Access</h1>
            <p className="mt-2 text-sm text-white">
              Enter admin password to continue
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-foreground text-sm font-bold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || remainingAttempts === 0}
                className="w-full px-3 py-2 border border-foreground/10 bg-gray-800 rounded-md focus:outline-none focus:shadow-[2px_2px_3px_0px_#cddc3b39] transition-all duration-200 text-foreground"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-800">{error}</p>
                {remainingAttempts !== null && remainingAttempts > 0 && (
                  <p className="text-xs text-red-600 mt-1">
                    {remainingAttempts} {remainingAttempts === 1 ? "attempt" : "attempts"} remaining
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || remainingAttempts === 0}
              className="w-full bg-pear text-gray-900 py-2 px-4 rounded-md hover:bg-gray-800 hover:text-pear hover:ring-1 hover:ring-pear focus:outline-none focus:ring-1 focus:ring-pear disabled:bg-gray-500 disabled:text-gray-800 transition-all duration-200 cursor-pointer"
            >
              {loading ? "Verifying..." : "Access Admin Panel"}
            </button>
          </form>

          <div className="text-center">
            <a
              href="/"
              className="text-sm text-pear/90 hover:text-gray-900 transition"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}