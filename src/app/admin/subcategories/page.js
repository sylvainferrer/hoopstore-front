"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import FlashMessage from "@/context/FlashMessage";

export default function SubcategoriesList() {
  const [subCategories, setSubCategories] = useState([]);
  const { flashMessage } = useContext(FlashMessage);

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
    <>
      <div className="w-full border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Liste des sous-catégories</h2>
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
            <li className="text-gray-500">Liste des sous-catégories</li>
          </ol>
        </nav>
      </div>

      <div className="px-5 py-8">
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
          {(!subCategories || subCategories.length === 0) && <p className="text-gray-500">Aucune sous-catégorie pour le moment.</p>}
          {subCategories.map((cat) => (
            <div key={cat.categoryId} className="mb-8">
              {/* Titre de la catégorie */}
              <div className="border-b border-gray-300 px-4 py-2 text-base text-gray-700">
                Catégorie: <span className="font-semibold">{cat.categoryName}</span>
              </div>

              {/* Table des sous-catégories */}
              <table className="w-full text-left text-sm text-gray-800">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 font-bold">ID</th>
                    <th className="px-4 py-2 font-bold">Sous-catégorie</th>
                    <th className="px-4 py-2 font-bold"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {cat.subCategories?.map((subCat, subIndex) => (
                    <tr key={subCat.subCategoryId} className={`${subIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} transition-colors hover:bg-gray-100`}>
                      <td className="px-4 py-2 align-top">{subCat.subCategoryId}</td>
                      <td className="px-4 py-2 align-top">{subCat.subCategoryName}</td>
                      <td className="px-4 py-2 text-right align-top">
                        <Link href={`/admin/subcategories/${subCat.subCategoryId}`} className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                          Modifier
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
