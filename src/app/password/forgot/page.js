"use client";
import { useState, useEffect } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const email = {
      email: e.target.email.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/password/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
        cache: "no-store",
      });

      const json = await res.json();

      if (!res.ok) {
        throw json;
      }
      setMessage(json);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <>
      <div className="bg-orange-50 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Mot de passe oublié</h2>
      </div>

      <div className="mx-auto max-w-7xl p-2 py-8">
        <div className="border border-gray-300 bg-white p-8">
          {message && (
            <div className="mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800">
              <ul>
                {Object.values(message).map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-gray-700">
                Email
              </label>
              <input type="email" id="email" name="email" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" placeholder="Votre email" required />
            </div>
            <button type="submit" className="cursor-pointer rounded-md bg-gray-950 px-5 py-2 text-white transition hover:bg-gray-900">
              Envoyer le lien
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
