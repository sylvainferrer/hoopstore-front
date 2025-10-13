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
    <main className="py-20">
      <section className="mx-auto max-w-xl p-8">
        <div className="border-body-light bg-light rounded border p-8">
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
              <label htmlFor="email" className="mb-1 block">
                Email
              </label>
              <input type="email" id="email" name="email" className="border-body-light w-full rounded border px-4 py-2" placeholder="Votre email" required />
            </div>
            <button type="submit" className="btn-primary-black mt-6">
              Envoyer le lien
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
