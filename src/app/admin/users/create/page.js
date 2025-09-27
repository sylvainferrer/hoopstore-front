"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminUsersCreate() {
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
      roles: e.target.roles.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/create`, {
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

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <>
      <div className="w-full border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Créer un utilisateur</h2>
      </div>

      <div className="px-8 py-6">
        <nav className="text-sm text-gray-600">
          <ol className="list-reset flex">
            <li>
              <Link href="/admin" className="font-medium text-gray-700 hover:underline">
                Administration
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">Créer un utilisateur</li>
          </ol>
        </nav>
      </div>

      <div className="px-5 py-8">
        {successMessage && (
          <div className="mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800">
            <ul>
              {Object.values(successMessage).map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
              <li className="mt-2"></li>
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

        <div className="border border-gray-200 bg-white p-8 shadow-sm">
          <form autoComplete="off" className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="col-span-1">
              <label htmlFor="firstname" className="mb-1 block text-sm text-gray-700">
                Prénom
                <input type="text" id="firstname" name="firstname" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            <div className="col-span-1">
              <label htmlFor="lastname" className="mb-1 block text-sm text-gray-700">
                Nom
                <input type="text" id="lastname" name="lastname" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            <div className="col-span-1">
              <label htmlFor="birthday" className="mb-1 block text-sm text-gray-700">
                Date de naissance
                <input type="date" id="birthday" name="birthday" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            <div className="col-span-1">
              <label className="mb-1 block text-sm text-gray-700">
                Rôle
                <select name="roles" defaultValue="" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none" required>
                  <option value="" disabled>
                    -- Sélectionner --
                  </option>
                  <option value="ROLE_USER">Client</option>
                  <option value="ROLE_ADMIN">Administrateur</option>
                </select>
              </label>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="email" className="mb-1 block text-sm text-gray-700">
                Email
                <input type="email" id="email" name="email" autoComplete="email" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="adresse" className="mb-1 block text-sm text-gray-700">
                Adresse
                <input autoComplete="off" type="text" id="adresse" name="adresse" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            <div className="col-span-1">
              <label htmlFor="codePostal" className="mb-1 block text-sm text-gray-700">
                Code Postal
                <input type="text" id="codePostal" name="codePostal" pattern="[0-9]{5}" title="Entrez un code postal à 5 chiffres" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            <div className="col-span-1">
              <label htmlFor="ville" className="mb-1 block text-sm text-gray-700">
                Ville
                <input type="text" id="ville" name="ville" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="password" className="mb-1 block text-sm text-gray-700">
                Mot de passe
                <input type="password" id="password" name="password" autoComplete="new-password" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="w-auto cursor-pointer rounded-md bg-gray-800 px-5 py-2 text-white transition hover:bg-gray-900">
                {"Ajouter l'utilisateur"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
