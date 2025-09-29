"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import FlashMessage from "@/context/FlashMessage";
import Link from "next/link";

export default function AdminProductsList() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { flashMessage } = useContext(FlashMessage);

  const fetchProductsList = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`, {
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
    fetchProductsList();
  }, []);

  return (
    <>
      <div className="bg-orange-50 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Liste des produits</h2>
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
            <li className="text-gray-500">Liste des produits</li>
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
          <table className="w-full text-left text-sm text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-bold">ID</th>
                <th className="px-4 py-2 font-bold">Image</th>
                <th className="px-4 py-2 font-bold">Nom</th>
                <th className="px-4 py-2 font-bold">Catégorie</th>
                <th className="px-4 py-2 font-bold whitespace-nowrap">Sous-catégorie</th>
                <th className="px-4 py-2 font-bold">Genre</th>
                <th className="px-4 py-2 font-bold">Description</th>
                <th className="px-4 py-2 font-bold">Prix</th>
                <th className="px-4 py-2 font-bold whitespace-nowrap">Date de création</th>
                <th className="px-4 py-2 font-bold"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-gray-500">
                    Aucun produit pour le moment.
                  </td>
                </tr>
              )}

              {data.map((product, index) => (
                <tr key={product.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} transition-colors hover:bg-gray-100`}>
                  <td className="px-4 py-2 align-top">{product.id}</td>
                  <td className="px-4 py-2 align-top">
                    <div className="h-20 w-20 overflow-hidden rounded">
                      <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-2 align-top">
                    <div className="line-clamp-2 font-medium" title={product.name}>
                      {product.name}
                    </div>
                  </td>
                  <td className="px-4 py-2 align-top">{product.category}</td>
                  <td className="px-4 py-2 align-top">{product.subCategory}</td>
                  <td className="px-4 py-2 align-top">{product.genre}</td>
                  <td className="max-w-[200px] px-4 py-2 align-top">
                    <div className="line-clamp-2" title={product.description}>
                      {product.description}
                    </div>
                  </td>
                  <td className="px-4 py-2 align-top tabular-nums">{product.price}</td>
                  <td className="px-4 py-2 align-top">{product.date}</td>
                  <td className="align-center px-4 py-2 text-right">
                    <Link href={`/admin/products/${product.id}`} className="btn-secondary-black" aria-label={`Modifier le produit ${product.name}`}>
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
