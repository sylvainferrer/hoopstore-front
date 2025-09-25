"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import UserName from "@/context/UserName";
import FlashMessage from "@/context/FlashMessage";
import Link from "next/link";

export default function AdminUsersId() {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { role } = useContext(UserName);
  const { setFlashMessage } = useContext(FlashMessage);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
    email: "",
    password: "",
    role: "",
    adresse: "",
    codePostal: "",
    ville: "",
  });

  const fetchUsersId = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.id}`, {
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
    fetchUsersId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
      roles: [value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.id}`, {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.id}`, {
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
      router.replace("/admin/users");
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
      <div className="w-full border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Fiche utilisateur</h2>
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
            <li>
              <Link href="/admin/users" className="font-medium text-gray-700 hover:underline">
                Liste des utilisateurs
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">Fiche utilisateur</li>
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
            <div className="col-span-1">
              <label className="mb-1 block text-sm text-gray-700">
                Prénom
                <input type="text" name="firstname" value={data.firstname || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
              </label>
            </div>
            <div className="col-span-1">
              <label className="mb-1 block text-sm text-gray-700">
                Nom
                <input type="text" name="lastname" value={data.lastname || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
              </label>
            </div>

            <div className="col-span-1">
              <label className="mb-1 block text-sm text-gray-700">
                Date de naissance
                <input type="date" name="birthday" value={data.birthday || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
              </label>
            </div>
            <div className="col-span-1">
              <label className="mb-1 block text-sm text-gray-700">
                Rôle
                <select name="role" value={data.role || ""} onChange={handleChange} disabled={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`}>
                  <option value="" disabled>
                    -- Sélectionner --
                  </option>
                  <option key="ROLE_USER" value="ROLE_USER">
                    Client
                  </option>
                  <option key="ROLE_ADMIN" value="ROLE_ADMIN">
                    Administrateur
                  </option>
                </select>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-gray-700">
                Email
                <input type="email" name="email" value={data.email || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-gray-700">
                Adresse
                <input type="text" name="adresse" value={data.adresse || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Code Postal
                <input type="text" name="codePostal" value={data.codePostal || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Ville
                <input type="text" name="ville" value={data.ville || ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed bg-gray-100 text-gray-500"}`} />
              </label>
            </div>

            {role === "ROLE_SUPER_ADMIN" && (
              <>
                <div className="flex justify-start gap-4 md:col-span-2">
                  <button
                    type="button"
                    disabled={isEditing}
                    onClick={() => {
                      setIsEditing(true);
                    }}
                    className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "cursor-not-allowed bg-blue-300 text-white opacity-50" : "cursor-pointer bg-blue-600 text-white hover:bg-blue-700"}`}
                  >
                    Éditer
                  </button>

                  <button type="submit" disabled={!isEditing} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "bg-gray-800 text-white hover:bg-gray-900" : "bg-gray-400 text-white opacity-50"}`}>
                    Enregistrer
                  </button>

                  <button
                    type="button"
                    disabled={!isEditing}
                    onClick={() => {
                      fetchUsersId();
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
                <div className="mt-4">
                  <p disabled={isEditing} className={`text-sm ${isEditing ? "text-gray-300" : "text-black"}`}>
                    * Attention : Cette action est irréversible !
                  </p>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
