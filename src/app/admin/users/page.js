"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { FlashMessageContext } from "@/context/FlashMessage";
import Link from "next/link";

export default function AdminUsersList() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { flashMessage } = useContext(FlashMessageContext);

  const fetchUsersList = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "GET",
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login?auth=unauthorized";
          return;
        }
        throw json;
      }

      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsersList();
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
            <li>Liste des utilisateurs</li>
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
                <th className="p-2 align-middle">Prénom</th>
                <th className="p-2 align-middle">Nom</th>
                <th className="p-2 align-middle">Email</th>
                <th className="p-2 align-middle">Rôle</th>
                <th className="p-2 align-middle"></th>
              </tr>
            </thead>

            <tbody className="divide-body-light divide-y">
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={6} className="text-body p-2">
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
                  <td className="p-2 align-middle">{order?.role === "ROLE_SUPER_ADMIN" ? "Super admin" : order?.role === "ROLE_ADMIN" ? "Admin" : "Client"}</td>
                  <td className="p-2 text-right align-middle">
                    <button onClick={() => router.push(`/admin/users/${order.id}`)} className="btn-primary-black" aria-label={`Voir les détails de l'utilisateur ${order.id}`}>
                      Afficher
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
