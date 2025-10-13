"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";

export default function LoginInner() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [expiredMessage, setExpiredMessage] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const auth = searchParams.get("auth");

    if (auth === "unauthorized" || auth === "required" || auth === "invalid") {
      setExpiredMessage("Veuillez vous (re)connecter.");
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
      window.location.href = "/";
    } catch (err) {
      setErrorMessage(err);
    }
  }

  return (
    <main className="py-20">
      <section className="mx-auto max-w-7xl p-8">
        <div className="bg-light border-body-light mx-auto max-w-lg rounded border p-8">
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
              <label htmlFor="email" className="mb-1 block">
                Email
              </label>
              <input type="email" id="email" name="email" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block">
                Mot de passe
              </label>
              <input type="password" id="password" name="password" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>

            <button type="submit" className="btn-primary-orange mt-4">
              Se connecter
            </button>
          </form>

          <p className="mt-4">
            Pas de compte ?{" "}
            <Link href="/register" className="underline">
              Inscrivez-vous
            </Link>
            <br />
            Mot de passe perdu ?{" "}
            <Link href="/password/forgot" className="underline">
              Cliquez ici
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
