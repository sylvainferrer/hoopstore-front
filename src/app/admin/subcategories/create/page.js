"use client";
import React, { useContext, useState, useEffect } from "react";
import { FlashMessageContext } from "@/context/FlashMessage";
import Link from "next/link";

export default function AdminSubcategoriesCreate() {
  const [categories, setCategories] = useState([]);
  const { setFlashMessage } = useContext(FlashMessageContext);

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
            <li>Créer une sous-catégorie</li>
          </ul>
        </nav>

        <div className="bg-light border-body-light mx-auto mt-6 max-w-xl rounded border p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block">Nom de la sous-catégorie</label>
              <input type="text" name="subcategory" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required />
            </div>

            <div>
              <label className="mb-1 block">
                Associer à une catégorie existante
                <select name="category" className="border-body-light w-full rounded border px-4 py-2 focus:outline" required>
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

            <div>
              <button type="submit" className={`btn-primary-black mt-6`}>
                Ajouter la sous-catégorie
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
