"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import FlashMessage from "@/context/FlashMessage";

export default function AdminSubCategoriesId() {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { setFlashMessage } = useContext(FlashMessage);

  const [data, setData] = useState({
    name: "",
  });

  const fetchSubCategoriesId = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories/${params.id}`, {
        method: "GET",
      });
      const json = await res.json();
      if (!res.ok) {
        throw json;
      }
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubCategoriesId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories/${params.id}`, {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories/${params.id}`, {
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
      router.replace("/admin/subcategories");
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
      <div className="bg-orange-50 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Sous-catégorie</h2>
      </div>

      <div className="px-8 py-6">
        <nav className="text-sm text-gray-600">
          <ol className="list-reset flex flex-wrap">
            <li>
              <Link href="/admin" className="font-medium text-gray-700 hover:underline">
                Administration
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="/admin/subcategories" className="font-medium text-gray-700 hover:underline">
                Liste des sous-catégories
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">Sous-catégorie</li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-2 py-8">
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

        <div className="border border-gray-300 bg-white p-8">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Nom
                <input type="text" name="name" value={data.name} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border px-4 py-2 focus:outline-none ${isEditing ? "border-gray-300 focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"}`} />
              </label>
            </div>

            <div className="flex flex-wrap justify-start gap-4">
              <button type="button" disabled={isEditing} onClick={() => setIsEditing(true)} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "cursor-not-allowed bg-blue-300 text-white opacity-50" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                Éditer
              </button>
              <button type="submit" disabled={!isEditing} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "bg-gray-800 text-white hover:bg-gray-900" : "bg-gray-400 text-white opacity-50"}`}>
                Enregistrer
              </button>
              <button
                type="button"
                disabled={!isEditing}
                onClick={() => {
                  fetchSubCategoriesId();
                  setIsEditing(false);
                  setErrorMessage(null);
                }}
                className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "bg-red-500 text-white hover:bg-red-600" : "bg-red-300 text-white opacity-50"}`}
              >
                Retour
              </button>
              <button type="button" disabled={isEditing} onClick={handleDelete} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "cursor-not-allowed bg-red-300 text-white opacity-50" : "cursor-pointer bg-red-500 text-white hover:bg-red-600"}`}>
                Supprimer la sous-catégorie&nbsp;*
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
