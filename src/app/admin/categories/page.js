"use client";
import React, { useState, useEffect, useContext } from "react";
import FlashMessage from "@/context/FlashMessage";
import Link from "next/link";

export default function CategoriesList() {
  const [data, setData] = useState([]);
  const { flashMessage } = useContext(FlashMessage);

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
    <>
      <div className="bg-orange-50 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Liste des catégories</h2>
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
            <li className="text-gray-500">Liste des catégories</li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-2 py-8">
        {flashMessage && (
          <div className="mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800">
            <ul>
              {Object.values(flashMessage).map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-4 font-bold">ID</th>
                <th className="px-4 py-4 font-bold">Nom</th>
                <th className="px-4 py-4 font-bold"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={3} className="px-2 py-4 text-gray-500">
                    Aucune catégorie pour le moment.
                  </td>
                </tr>
              )}

              {data.map((category, index) => (
                <tr key={category.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} transition-colors hover:bg-gray-100`}>
                  <td className="px-4 py-4 align-top">{category.id}</td>
                  <td className="px-4 py-4 align-top">{category.name}</td>
                  <td className="px-4 py-4 text-right align-top">
                    <Link href={`/admin/categories/${category.id}`} className="btn-secondary-black">
                      Modifier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
