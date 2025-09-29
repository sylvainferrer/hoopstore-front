"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
//import Image from "next/image";

export default function AdminProductsCreate() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  const fetchSubCategoriesGrouped = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories`, {
        method: "GET",
      });
      const json = await res.json();
      if (!res.ok) {
        throw json;
      }
      setSubCategories(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubCategoriesGrouped();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/create`, {
        method: "POST",
        credentials: "include",
        body: formData,
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
      e.target.reset();
    } catch (err) {
      setErrorMessage(err);
      setSuccessMessage(null);
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
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Créer un produit</h2>
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
            <li className="text-gray-500">Créer un produit</li>
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
            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Nom
                <input type="text" name="name" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            {/* <div>
              <label className="mb-1 block text-sm text-gray-700">
                Référence produit
                <input type="text" name="referenceProduct" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div> */}

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Sous-catégorie
                <select name="subCategory" className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none`}>
                  <option value="">-- Sélectionner --</option>
                  {Array.isArray(subCategories) &&
                    subCategories.map((cat) => (
                      <optgroup key={cat.categoryId} label={cat.categoryName}>
                        {cat.subCategories?.map((sc) => (
                          <option key={sc.subCategoryId} value={sc.subCategoryId}>
                            {sc.subCategoryName}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                </select>
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Genre
                <select name="genre" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required>
                  <option value="">-- Sélectionner --</option>
                  <option value="H">Homme</option>
                  <option value="F">Femme</option>
                  <option value="E">Enfant</option>
                  <option value="U">Unisex</option>
                </select>
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Prix en Euros (€)
                <input type="text" name="price" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Description
                <textarea name="description" rows={4} className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none" required />
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Image
                <input type="file" name="imageFile" accept="image/*" className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-gray-300 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-400" required />
              </label>
            </div>

            <div className="flex justify-start gap-4 md:col-span-2">
              <button type="submit" className="w-auto rounded-md bg-gray-800 px-5 py-2 text-white transition hover:bg-gray-900">
                Ajouter le produit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
