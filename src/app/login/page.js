"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useContext, useEffect, Suspense } from "react";
import Link from "next/link";
import UserName from "@/context/UserName";

export default function Login() {
  return (
    <Suspense fallback={<div>Chargement…</div>}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [expiredMessage, setExpiredMessage] = useState(null);
  const { setPrenom, setRole } = useContext(UserName);
  const searchParams = useSearchParams();

  useEffect(() => {
    const auth = searchParams.get("auth");

    if (auth === "unauthorized" || auth === "required" || auth === "invalid") {
      setExpiredMessage("Veuillez vous (re)connecter.");
      setPrenom(null);
      setRole(null);
    } else {
      setExpiredMessage(null);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    router.replace("/login");
    setExpiredMessage(null);

    const login = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        throw json;
      }
      setRole(json.role);
      setPrenom(json.firstname);
      router.push(`${process.env.NEXT_PUBLIC_API_URL}`);
    } catch (err) {
      setErrorMessage(err);
    }
  }

  return (
    <>
      <div className="border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Connexion</h2>
      </div>
      <div className="px-5 py-8">
        <div className="border border-gray-200 bg-white p-8 shadow-sm">
          {errorMessage && (
            <div className="mb-4 rounded border border-red-300 bg-red-100 p-4 text-red-800">
              <ul>
                {Object.values(errorMessage).map((msg, i) => (
                  <li key={i}>* {msg}</li>
                ))}
              </ul>
            </div>
          )}
          {expiredMessage && <div className="mb-4 rounded border border-yellow-300 bg-yellow-100 p-3 text-yellow-800">{expiredMessage}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-gray-700">
                Email
              </label>
              <input type="email" id="email" name="email" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm text-gray-700">
                Mot de passe
              </label>
              <input type="password" id="password" name="password" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>

            <button type="submit" className="cursor-pointer rounded-md bg-gray-800 px-5 py-2 text-white transition hover:bg-gray-900">
              Se connecter
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Pas de compte ?{" "}
            <Link href="/register" className="text-gray-800 hover:underline">
              Inscrivez-vous
            </Link>
            <br />
            Mot de passe perdu ?{" "}
            <Link href="/password/forgot" className="text-gray-800 hover:underline">
              Cliquez ici
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
