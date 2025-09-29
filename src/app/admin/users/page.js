"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import FlashMessage from "@/context/FlashMessage";
import Link from "next/link";

export default function AdminUsersList() {
  const [data, setData] = useState([]);
  const { flashMessage } = useContext(FlashMessage);

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
    <>
      <div className="bg-orange-50 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Liste des utilisateurs</h2>
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
            <li className="text-gray-500">Liste des utilisateurs</li>
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
          <table className="w-full text-left text-base text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-4 font-bold">ID</th>
                <th className="px-4 py-4 font-bold">Prénom</th>
                <th className="px-4 py-4 font-bold">Nom</th>
                <th className="px-4 py-4 font-bold">Email</th>
                <th className="px-4 py-4 font-bold">Rôle</th>
                <th className="px-4 py-4 font-bold"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    Aucun utilisateur pour le moment.
                  </td>
                </tr>
              )}

              {data.map((user, index) => (
                <tr key={user.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} transition-colors hover:bg-gray-100`}>
                  <td className="px-4 py-5 align-middle">{user.id}</td>
                  <td className="px-4 py-5 align-middle">{user.firstname}</td>
                  <td className="px-4 py-5 align-middle">{user.lastname}</td>
                  <td className="px-4 py-5 align-middle">{user.email}</td>
                  <td className="px-4 py-5 align-middle">{user?.role === "ROLE_SUPER_ADMIN" ? "Super admin" : user?.role === "ROLE_ADMIN" ? "Admin" : "Client"}</td>
                  <td className="px-4 py-5 text-right align-middle">
                    <Link href={`/admin/users/${user.id}`} className="btn-secondary-black" aria-label={`Afficher l'utilisateur ${user.firstname} ${user.lastname}`}>
                      Afficher
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
