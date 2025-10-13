"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { FlashMessageContext } from "@/context/FlashMessage";
import Link from "next/link";

export default function AdminProductsList() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { flashMessage } = useContext(FlashMessageContext);

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
            <li>Liste des produits</li>
          </ul>
        </nav>

        {flashMessage && (
          <div className="mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800">
            <ul>
              {Object.values(flashMessage).map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 overflow-x-auto rounded">
          <table className="w-full text-left">
            <thead className="bg-body-light text-dark border-body-light border">
              <tr>
                <th className="p-2 align-middle">ID</th>
                <th className="p-2 align-middle">Image</th>
                <th className="p-2 align-middle">Nom</th>
                <th className="p-2 align-middle">Catégorie</th>
                <th className="p-2 align-middle whitespace-nowrap">Sous-catégorie</th>
                <th className="p-2 align-middle">Genre</th>
                <th className="p-2 align-middle">Description</th>
                <th className="p-2 align-middle">Prix €</th>
                <th className="p-2 align-middle whitespace-nowrap">Date de création</th>
                <th className="p-2 align-middle"></th>
              </tr>
            </thead>

            <tbody className="divide-body-light divide-y">
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={10} className="text-body p-2">
                    Aucun utilisateur pour le moment.
                  </td>
                </tr>
              )}

              {data.map((product) => (
                <tr key={product.id}>
                  <td className="p-2 align-middle">{product.id}</td>
                  <td className="p-2 align-middle">
                    <div className="h-20 w-20 overflow-hidden">
                      <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="p-2 align-middle">
                    <div className="line-clamp-2" title={product.name}>
                      {product.name}
                    </div>
                  </td>
                  <td className="p-2 align-middle">{product.category}</td>
                  <td className="p-2 align-middle">{product.subCategory}</td>
                  <td className="p-2 align-middle">{product.genre}</td>
                  <td className="p-2 align-middle">
                    <div className="line-clamp-2" title={product.description}>
                      {product.description}
                    </div>
                  </td>
                  <td className="p-2 align-middle tabular-nums">{product.price}</td>
                  <td className="p-2 align-middle">{product.date}</td>
                  <td className="p-2 text-right align-middle">
                    <button onClick={() => router.push(`/admin/products/${product.id}`)} className="btn-primary-black" aria-label={`Modifier le produit ${product.id}`}>
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
