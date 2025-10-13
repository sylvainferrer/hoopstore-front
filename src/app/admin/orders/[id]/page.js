"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminOrderId() {
  const orderParams = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAdminOrderId = async function () {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderParams.id}`, {
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
    fetchAdminOrderId();
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
            <li>
              <Link href="/admin/orders" className="underline">
                Liste des commandes
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">Détails de la commande</li>
          </ul>
        </nav>

        <div className="mt-6 overflow-x-auto rounded">
          <table className="w-full text-left">
            <thead className="bg-body-light text-dark border-body-light border">
              <tr>
                <th className="p-2 align-middle">ID</th>
                <th className="p-2 align-middle">Produit</th>
                <th className="p-2 align-middle">Taille</th>
                <th className="p-2 align-middle">Prix</th>
                <th className="p-2 align-middle">Quantité</th>
                <th className="p-2 align-middle">Total</th>
              </tr>
            </thead>

            <tbody className="divide-body-light divide-y">
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={6} className="text-body p-2">
                    Aucun détail pour le moment.
                  </td>
                </tr>
              )}

              {data.map((od) => (
                <tr key={od.id}>
                  <td className="p-2 align-middle">{od.id}</td>
                  <td className="p-2 align-middle">{od.name}</td>
                  <td className="p-2 align-middle">{od.size}</td>
                  <td className="p-2 align-middle tabular-nums">{od.price} €</td>
                  <td className="p-2 align-middle tabular-nums">{od.quantity}</td>
                  <td className="p-2 align-middle tabular-nums">{od.total} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
