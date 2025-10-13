"use client";
import React, { useState, useEffect, useContext } from "react";
import { FlashMessageContext } from "@/context/FlashMessage";
import Link from "next/link";

export default function AdminProductsCreate() {
  const { setFlashMessage } = useContext(FlashMessageContext);
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

      setFlashMessage(json);
      e.target.reset();
    } catch (err) {
      setFlashMessage(err);
    }
  };

  return (
    <main className="py-20">
      <section className="mx-auto max-w-7xl p-8">
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
            <li>Créer un produit</li>
          </ul>
        </nav>

        <div className="bg-light border-body-light mx-auto mt-6 max-w-xl rounded border p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block">Nom</label>
              <input type="text" name="name" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required />
            </div>

            <div>
              <label className="mb-1 block">Sous-catégorie</label>
              <select name="subCategory" className={`border-body-light w-full rounded border px-4 py-2 focus:outline`}>
                <option value="">- Sélectionner -</option>
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
            </div>

            <div>
              <label className="mb-1 block">Genre</label>
              <select name="genre" className={`border-body-light w-full rounded border px-4 py-2 focus:outline`} required>
                <option value="">- Sélectionner -</option>
                <option value="h">Homme</option>
                <option value="f">Femme</option>
                <option value="e">Enfant</option>
                <option value="u">Unisex</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block">Prix en €</label>
              <input type="text" name="price" className={`border-body-light w-full rounded border px-4 py-2 focus:outline`} required />
            </div>

            <div>
              <label className="mb-1 block">Description</label>
              <textarea name="description" className={`border-body-light w-full rounded border px-4 py-2 focus:outline`} rows={4} required />
            </div>

            <div>
              <label className="mb-1 block">Image</label>
              <input type="file" name="imageFile" accept="image/*" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required />
            </div>

            <div>
              <button type="submit" className="btn-primary-black mt-6">
                Ajouter le produit
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
