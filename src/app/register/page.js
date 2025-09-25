"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async function (e) {
    e.preventDefault();

    const data = {
      lastname: e.target.lastname.value,
      firstname: e.target.firstname.value,
      birthday: e.target.birthday.value,
      email: e.target.email.value,
      adresse: e.target.adresse.value,
      codePostal: e.target.codePostal.value,
      ville: e.target.ville.value,
      password: e.target.password.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login?auth=unauthorized";
          return;
        }
        throw json;
      }

      setErrorMessage(null);
      setSuccessMessage(json);
      e.target.reset();
    } catch (err) {
      setSuccessMessage(null);
      setErrorMessage(err);
    }
  };

  return (
    <>
      <div className="border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Inscription</h2>
      </div>
      <div className="px-5 py-8">
        <div className="border border-gray-200 bg-white p-8 shadow-sm">
          {successMessage && (
            <div role="status" aria-live="polite" aria-label="Succès du formulaire" className="mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800">
              <ul>
                {Object.values(successMessage).map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
                <li className="mt-2">
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Connectez-vous
                  </Link>
                  .
                </li>
              </ul>
            </div>
          )}

          {errorMessage && (
            <div role="alert" aria-live="assertive" aria-label="Erreurs de formulaire" className="mb-4 rounded border border-red-300 bg-red-100 p-4 text-red-800">
              <ul>
                {Object.values(errorMessage).map((msg, i) => (
                  <li key={i}>* {msg}</li>
                ))}
              </ul>
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstname" className="mb-1 block text-sm text-gray-700">
                Prénom
              </label>
              <input type="text" id="firstname" name="firstname" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="lastname" className="mb-1 block text-sm text-gray-700">
                Nom
              </label>
              <input type="text" id="lastname" name="lastname" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="birthday" className="mb-1 block text-sm text-gray-700">
                Date de naissance
              </label>
              <input type="date" id="birthday" name="birthday" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-gray-700">
                Email
              </label>
              <input type="email" id="email" name="email" autoComplete="email" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="adresse" className="mb-1 block text-sm text-gray-700">
                Adresse
              </label>
              <input type="text" id="adresse" name="adresse" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="codePostal" className="mb-1 block text-sm text-gray-700">
                Code Postal
              </label>
              <input type="text" id="codePostal" name="codePostal" pattern="[0-9]{5}" title="Entrez un code postal à 5 chiffres" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="ville" className="mb-1 block text-sm text-gray-700">
                Ville
              </label>
              <input type="text" id="ville" name="ville" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm text-gray-700">
                Password
              </label>
              <input type="password" id="password" name="password" autoComplete="new-password" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
            </div>
            <button type="submit" className="cursor-pointer rounded-md bg-gray-800 px-5 py-2 text-white transition hover:bg-gray-900">
              S'inscrire
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Déjà inscrit ?{" "}
            <Link href="/login" className="text-gray-800 hover:underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
