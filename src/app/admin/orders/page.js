"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminOrdersList() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const fetchOrdersList = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders`, {
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
            <li className="text-gray-500">Liste des commandes</li>
          </ul>
        </nav>

        <div className="mt-6 overflow-x-auto rounded">
          <table className="w-full text-left">
            <thead className="bg-body-light text-dark border-body-light border">
              <tr>
                <th className="p-2 align-middle">ID</th>
                <th className="p-2 align-middle">Prenom</th>
                <th className="p-2 align-middle">Nom</th>
                <th className="p-2 align-middle">Email</th>
                <th className="p-2 align-middle whitespace-nowrap">Total commande</th>
                <th className="p-2 align-middle">Statut</th>
                <th className="p-2 align-middle whitespace-nowrap">Stripe session ID</th>
                <th className="p-2 align-middle whitespace-nowrap">Stripe payment ID</th>
                <th className="p-2 align-middle whitespace-nowrap">Date de création</th>
                <th className="p-2 align-middle whitespace-nowrap">Date de paiement</th>
                <th className="p-2 align-middle"></th>
              </tr>
            </thead>

            <tbody className="divide-body-light divide-y">
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={11} className="text-body p-2">
                    Aucun utilisateur pour le moment.
                  </td>
                </tr>
              )}

              {data.map((order) => (
                <tr key={order.id}>
                  <td className="p-2 align-middle">{order.id}</td>
                  <td className="p-2 align-middle">{order.firstname}</td>
                  <td className="p-2 align-middle">{order.lastname}</td>
                  <td className="p-2 align-middle">{order.email}</td>
                  <td className="p-2 align-middle tabular-nums">{order.amount} €</td>
                  <td className="p-2 align-middle">{order.status}</td>
                  <td className="p-2 align-middle">{order.stripeSessionId}</td>
                  <td className="p-2 align-middle">{order.stripePaymentId}</td>
                  <td className="p-2 align-middle whitespace-nowrap">{order.createdAt}</td>
                  <td className="p-2 align-middle whitespace-nowrap">{order.paidAt}</td>
                  <td className="p-2 text-right align-middle">
                    <button onClick={() => router.push(`/admin/orders/${order.id}`)} className="btn-primary-black" aria-label={`Modifier le produit ${order.name}`}>
                      Détail
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
