// File: components/RegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // Redirect to login page
      router.push("/login?registered=true");
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto p-6 backdrop-blur-xs bg-gray-800/5 rounded-t-lg border-b border-b-pear shadow-md">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-900/80 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-pear backdrop-blur-lg rounded-md focus:outline-none focus:shadow-2xl transition-all duration-300"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-900/80 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-pear backdrop-blur-lg rounded-md focus:outline-none focus:shadow-2xl transition-all duration-300"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-900/80 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-pear backdrop-blur-lg rounded-md focus:outline-none focus:shadow-2xl transition-all duration-300"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-900 text-pear uppercase py-2 px-4 rounded-md hover:shadow-2xl cursor-pointer disabled:bg-foreground transition-all duration-300"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      <div className="w-full max-w-md mt-4 text-center border-t border-t-pear flex flex-col gap-4 backdrop-blur-xs shadow-md p-4 rounded-b-md bg-gray-800/5">
        <p className="pt-4">
          Already a member?{" "}
          {/* <Link href="/login" className="text-blue-500 hover:text-blue-700">
        Login
      </Link> */}
        </p>
        <button className="w-full bg-gray-900 text-pear uppercase py-2 px-4 rounded-md hover:shadow-2xl cursor-pointer disabled:bg-foreground transition-all duration-300">
          Login
        </button>
      </div>
    </>
  );
}
