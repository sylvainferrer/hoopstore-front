"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrdersList() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const fetchOrdersList = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
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
    fetchOrdersList();
  }, []);

  return (
    <>
      <div className="w-full border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Liste des commandes</h2>
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
            <li className="text-gray-500">Liste des commandes</li>
          </ol>
        </nav>
      </div>
      <div className="px-5 py-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-bold">ID</th>
                <th className="px-4 py-2 font-bold">Prenom</th>
                <th className="px-4 py-2 font-bold">Nom</th>
                <th className="px-4 py-2 font-bold">Email</th>
                <th className="px-4 py-2 font-bold whitespace-nowrap">Total commande</th>
                <th className="px-4 py-2 font-bold whitespace-nowrap">Date de paiement</th>
                <th className="px-4 py-2 font-bold">Statut</th>
                <th className="px-4 py-2 font-bold"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={10} className="px-2 py-4 text-gray-500">
                    Aucune commande pour le moment.
                  </td>
                </tr>
              )}

              {data.map((order, index) => (
                <tr key={order.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} transition-colors hover:bg-gray-100`}>
                  <td className="px-4 py-2 align-top">{order.id}</td>
                  <td className="px-4 py-2 align-top">{order.firstname}</td>
                  <td className="px-4 py-2 align-top">{order.lastname}</td>
                  <td className="px-4 py-2 align-top">{order.email}</td>
                  <td className="px-4 py-2 align-top tabular-nums">{order.amount} €</td>
                  <td className="px-4 py-2 align-top whitespace-nowrap">{order.paidAt}</td>
                  <td className="px-4 py-2 align-top">{order.status === "PENDING" ? "En attente" : order.status === "PAID" ? "Payé" : order.status === "CANCELED" ? "Annulé" : order.status}</td>
                  <td className="px-4 py-2 text-right align-top">
                    <button onClick={() => router.push(`/account/orders/${order.id}`)} className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300" aria-label={`Modifier le produit ${order.name}`}>
                      Détail
                    </button>
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
