"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CategoriesList() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const fetchCategoriesList = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
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
    fetchCategoriesList();
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
            <li>Liste des catégories</li>
          </ul>
        </nav>

        <div className="mx-auto mt-6 max-w-xl overflow-x-auto rounded">
          <table className="w-full text-left">
            <thead className="bg-body-light text-dark border-body-light border">
              <tr>
                <th className="p-2 align-middle">ID</th>
                <th className="p-2 align-middle">Nom</th>
                <th className="p-2 align-middle"></th>
              </tr>
            </thead>

            <tbody className="divide-body-light divide-y">
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={6} className="text-body p-2">
                    Aucune catégorie pour le moment.
                  </td>
                </tr>
              )}

              {data.map((category) => (
                <tr key={category.id}>
                  <td className="p-2 align-middle">{category.id}</td>
                  <td className="p-2 align-middle">{category.name}</td>
                  <td className="p-2 text-right align-middle">
                    <button onClick={() => router.push(`/admin/categories/${category.id}`)} className="btn-primary-black" aria-label={`Voir les détails de la catégorie ${category.name}`}>
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
