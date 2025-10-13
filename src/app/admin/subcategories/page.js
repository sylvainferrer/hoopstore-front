"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SubcategoriesList() {
  const [subCategories, setSubCategories] = useState([]);
  const router = useRouter();

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
            <li>Liste des sous-catégories</li>
          </ul>
        </nav>

        <div className="mx-auto mt-6 max-w-xl">
          {(!subCategories || subCategories.length === 0) && <p>Aucune sous-catégorie pour le moment.</p>}
          {subCategories.map((cat) => (
            <div className="mt-8 overflow-x-auto rounded" key={cat.categoryId}>
              <p className="bg-body-light text-dark mb-[1px] p-2 font-bold">{cat.categoryName}</p>
              <table className="w-full text-left">
                <thead className="bg-body-light text-dark border-body-light border">
                  <tr>
                    <th className="p-2 align-middle">ID</th>
                    <th className="p-2 align-middle whitespace-nowrap">Sous-catégorie</th>
                    <th className="p-2 align-middle"></th>
                  </tr>
                </thead>

                <tbody className="divide-body-light divide-y">
                  {cat.subCategories.map((subCat) => (
                    <tr key={subCat.subCategoryId}>
                      <td className="p-2 align-middle">{subCat.subCategoryId}</td>
                      <td className="p-2 align-middle">{subCat.subCategoryName}</td>
                      <td className="p-2 text-right align-middle">
                        <button onClick={() => router.push(`/admin/subcategories/${subCat.subCategoryId}`)} className="btn-primary-black" aria-label={`Voir les détails de la sous-catégorie ${subCat.subCategoryName}`}>
                          Modifier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
