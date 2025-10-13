"use client";
import React, { useContext } from "react";
import { FlashMessageContext } from "@/context/FlashMessage";
import Link from "next/link";

export default function AdminUsersCreate() {
  const { setFlashMessage } = useContext(FlashMessageContext);

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
      role: e.target.role.value,
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

      setFlashMessage(json);
      e.target.reset();
    } catch (err) {
      setFlashMessage(err);
    }
  };

  return (
    <main className="py-20">
      <section className="mx-auto max-w-7xl">
        <nav className="mt-6">
          <ul className="list-reset flex flex-wrap">
            <li>
              <Link href="/admin" className="underline">
                Administration
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>Créer un utilisateur</li>
          </ul>
        </nav>

        <div className="bg-light border-body-light mx-auto mt-6 max-w-xl rounded border p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block">Prénom</label>
              <input type="text" id="firstname" name="firstname" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required />
            </div>

            <div>
              <label className="mb-1 block">Nom</label>
              <input type="text" id="lastname" name="lastname" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required />
            </div>

            <div>
              <label className="mb-1 block">Date de naissance</label>
              <input type="date" id="birthday" name="birthday" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required />
            </div>

            <div>
              <label className="mb-1 block">
                Rôle
                <select name="role" defaultValue="" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required>
                  <option value="" disabled>
                    -- Sélectionner --
                  </option>
                  <option value="ROLE_USER">Client</option>
                  <option value="ROLE_ADMIN">Administrateur</option>
                </select>
              </label>
            </div>

            <div>
              <label className="mb-1 block">Email</label>
              <input type="email" id="email" name="email" autoComplete="email" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required />
            </div>

            <div>
              <label className="mb-1 block">Adresse</label>
              <input autoComplete="off" type="text" id="adresse" name="adresse" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required />
            </div>

            <div>
              <label className="mb-1 block">Code Postal</label>
              <input type="text" id="codePostal" name="codePostal" pattern="[0-9]{5}" title="Entrez un code postal à 5 chiffres" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required />
            </div>

            <div>
              <label className="mb-1 block">Ville</label>
              <input type="text" id="ville" name="ville" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required />
            </div>

            <div>
              <label className="mb-1 block">Nouveau mot de passe</label>
              <input type="password" name="password" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required />
            </div>

            <button type="submit" className="btn-primary-black">
              {"Ajouter l'utilisateur"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
