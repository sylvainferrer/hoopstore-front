"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminSubcategoriesCreate() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategoriesList = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        method: "GET",
      });
      const json = await res.json();
      if (!res.ok) {
        throw json;
      }
      setCategories(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategoriesList();
  }, []);

  const handleSubmit = async function (e) {
    e.preventDefault();

    const data = {
      category: e.target.category.value,
      name: e.target.subcategory.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories/create`, {
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
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Créer une sous-catégorie</h2>
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
            <li className="text-gray-500">Créer une sous-catégorie</li>
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
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Nom de la sous-catégorie
                <input type="text" name="subcategory" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Associer à une catégorie existante
                <select name="category" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required>
                  <option value="">-- Sélectionner --</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <small className="mt-1 block text-xs text-gray-500">Une sous-catégorie doit toujours être rattachée à une catégorie existante.</small>
            </div>

            <div className="flex justify-start gap-4">
              <button type="submit" className="w-auto rounded-md bg-gray-800 px-5 py-2 text-white transition hover:bg-gray-900">
                Ajouter la sous-catégorie
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
