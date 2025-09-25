"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params?.token;

  const router = useRouter();

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const password = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    console.log("API_URL =", process.env.NEXT_PUBLIC_API_URL);
    console.log("URL appelée =", `${process.env.NEXT_PUBLIC_API_URL}/api/password/reset`);

    if (password !== confirmPassword) {
      setErrorMessage({ message: "Les mots de passe ne correspondent pas." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
        cache: "no-store",
      });

      const json = await res.json();

      if (!res.ok) {
        throw json;
      }
      setErrorMessage(null);
      setSuccessMessage(json);
      setTimeout(() => router.replace("/login"), 1500);
    } catch (err) {
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Réinitialiser le mot de passe</h2>
      </div>

      <div className="px-5 py-8">
        <div className="border border-gray-200 bg-white p-8 shadow-sm">
          {successMessage && (
            <div className="mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800">
              <ul>
                {Object.values(successMessage).map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 rounded border border-red-300 bg-red-100 p-4 text-red-800">
              <ul>
                {Object.values(errorMessage).map((msg, i) => (
                  <li key={i}>* {msg}</li>
                ))}
              </ul>
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newPassword" className="mb-1 block text-sm text-gray-700">
                Nouveau mot de passe
              </label>
              <input type="password" minLength={1} id="newPassword" name="newPassword" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm text-gray-700">
                Confirmer le mot de passe
              </label>
              <input type="password" id="confirmPassword" name="confirmPassword" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>

            <button type="submit" disabled={loading} className="cursor-pointer rounded-md bg-gray-800 px-5 py-2 text-white transition hover:bg-gray-900 disabled:opacity-60">
              {loading ? "Validation..." : "Réinitialiser"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
