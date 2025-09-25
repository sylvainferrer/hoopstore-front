"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import FlashMessage from "@/context/FlashMessage";
import UserName from "@/context/UserName";
import Link from "next/link";

export default function Account() {
  const router = useRouter();
  const { setFlashMessage } = useContext(FlashMessage);
  const { setPrenom, setRole } = useContext(UserName);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
    email: "",
    adresse: "",
    codePostal: "",
    ville: "",
  });

  const fetchUsersMe = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        method: "GET",
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

      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsersMe();
  }, []);

  const handleChange = function (e) {
    const name = e.target.name;
    const value = e.target.value;
    setData(function (prevData) {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login?auth=unauthorized";
          return;
        }
        throw json;
      }

      setSuccessMessage(json);
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(err);
      setSuccessMessage(null);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        method: "DELETE",
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
      setRole(null);
      setPrenom(null);
      router.replace("/");
    } catch (err) {
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
      <div className="border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Mes informations personnelles</h2>
      </div>

      <div className="px-8 py-6">
        <nav className="text-sm text-gray-600">
          <ol className="list-reset flex">
            <li>
              <Link href="/account" className="font-medium text-gray-700 hover:underline">
                Mon compte
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">Mes informations personnelles</li>
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
          <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
            {/* Prénom + Nom */}
            <div>
              <label className="mb-1 block text-sm text-gray-700">Prénom</label>
              <input type="text" name="firstname" value={data.firstname || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">Nom</label>
              <input type="text" name="lastname" value={data.lastname || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
            </div>

            {/* Date de naissance + Email */}
            <div>
              <label className="mb-1 block text-sm text-gray-700">Date de naissance</label>
              <input type="date" name="birthday" value={data.birthday || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">Email</label>
              <input type="email" name="email" value={data.email || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
            </div>

            {/* Adresse sur toute la ligne */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-gray-700">Adresse</label>
              <input type="text" name="adresse" value={data.adresse || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
            </div>

            {/* Code Postal + Ville */}
            <div>
              <label className="mb-1 block text-sm text-gray-700">Code Postal</label>
              <input type="text" name="codePostal" value={data.codePostal || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">Ville</label>
              <input type="text" name="ville" value={data.ville || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
            </div>

            {/* Mot de passe sur toute la largeur */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-gray-700">Nouveau mot de passe (laisser vide pour ne pas changer)</label>
              <input type="password" name="password" value={data.password || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
            </div>

            {/* Boutons, inchangés */}
            <div className="flex justify-start gap-4 md:col-span-2">
              <button
                type="button"
                disabled={isEditing}
                onClick={() => {
                  setIsEditing(true);
                }}
                className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "cursor-not-allowed bg-blue-300 text-white opacity-50" : "cursor-pointer bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                Modifier
              </button>

              <button type="submit" disabled={!isEditing} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "bg-gray-800 text-white hover:bg-gray-900" : "bg-gray-400 text-white opacity-50"}`}>
                Enregistrer les modifications
              </button>

              <button
                type="button"
                disabled={!isEditing}
                onClick={() => {
                  fetchUsersMe();
                  setIsEditing(false);
                  setErrorMessage(null);
                }}
                className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "cursor-pointer bg-red-500 text-white hover:bg-red-600" : "cursor-not-allowed bg-red-300 text-white opacity-50"}`}
              >
                Retour
              </button>

              <button type="button" disabled={isEditing} onClick={handleDelete} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "cursor-not-allowed bg-red-300 text-white opacity-50" : "cursor-pointer bg-red-500 text-white hover:bg-red-600"}`}>
                Supprimer l'utilisateur&nbsp;*
              </button>
            </div>
          </form>
          <div className="mt-4">
            <p disabled={isEditing} className={`text-sm ${isEditing ? "text-gray-300" : "text-black"}`}>
              * Attention : Cette action est irréversible !
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
