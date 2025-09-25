"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function MeOrderId() {
  const orderParams = useParams();
  const [data, setData] = useState([]);

  const fetchMeOrderId = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderParams.id}`, {
        method: "GET",
        credentials: "include",
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
    fetchMeOrderId();
  }, []);

  return (
    <>
      <div className="w-full border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Détails de la commande</h2>
      </div>

      <div className="px-8 py-6">
        <nav className="text-sm text-gray-600">
          <ol className="list-reset flex">
            <li>
              <Link href="/account" className="font-medium text-gray-700 hover:underline">
                Mon compte
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="/account/orders" className="font-medium text-gray-700 hover:underline">
                Mes commandes
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">Détails de ma commande</li>
          </ol>
        </nav>
      </div>
      <div className="px-5 py-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-bold">ID</th>
                <th className="px-4 py-2 font-bold">Produit</th>
                <th className="px-4 py-2 font-bold">Taille</th>
                <th className="px-4 py-2 font-bold">Prix</th>
                <th className="px-4 py-2 font-bold">Quantité</th>
                <th className="px-4 py-2 font-bold">Total</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-2 py-4 text-gray-500">
                    Aucun détail pour le moment.
                  </td>
                </tr>
              )}

              {data.map((od, index) => (
                <tr key={od.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} transition-colors hover:bg-gray-100`}>
                  <td className="px-4 py-2 align-top">{od.id}</td>
                  <td className="px-4 py-2 align-top">{od.name}</td>
                  <td className="px-4 py-2 align-top">{od.size}</td>
                  <td className="px-4 py-2 align-top tabular-nums">{od.price} €</td>
                  <td className="px-4 py-2 align-top tabular-nums">{od.quantity}</td>
                  <td className="px-4 py-2 align-top tabular-nums">{od.total} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
