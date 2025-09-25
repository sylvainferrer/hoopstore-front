"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserName from "@/context/UserName";
import FlashMessage from "@/context/FlashMessage";

export default function Header() {
  const router = useRouter();
  const { prenom, setPrenom, role, setRole, loading } = useContext(UserName);
  const { setFlashMessage } = useContext(FlashMessage);

  const handleLogout = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      setFlashMessage(json);
      setRole(null);
      setPrenom(null);
      router.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {!loading && (
        <header className="w-full border-b border-gray-300 bg-gray-100">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div className="text-xl text-gray-800">
              <span className="font-bold">Hoop</span>Store
            </div>

            <div className="flex items-center space-x-6 text-gray-700">
              <nav className="relative">
                <div className="flex items-center gap-6">
                  <Link href="/" className="px-2 py-4 hover:text-gray-900">
                    Accueil
                  </Link>

                  <div className="group relative">
                    <Link className="px-2 py-4 hover:text-gray-900" href="/products/category/accessoires">
                      Accessoires
                    </Link>
                    <ul className="invisible absolute top-full left-0 z-50 mt-2 min-w-48 translate-y-1 border border-gray-200 bg-white opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100" role="menu">
                      <li>
                        <Link className="block px-4 py-2 hover:bg-gray-100" href="/products/subcategory/ballons" role="menuitem">
                          Ballons
                        </Link>
                      </li>
                      <li>
                        <Link className="block px-4 py-2 hover:bg-gray-100" href="/products/subcategory/paniers" role="menuitem">
                          Paniers
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="group relative">
                    <Link className="px-2 py-4 hover:text-gray-900" href="/products/category/vetements">
                      Vêtements
                    </Link>
                    <ul className="invisible absolute top-full left-0 z-50 mt-2 min-w-48 translate-y-1 border border-gray-200 bg-white opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100" role="menu">
                      <li>
                        <Link className="block px-4 py-2 hover:bg-gray-100" href="/products/subcategory/maillots" role="menuitem">
                          Maillots
                        </Link>
                      </li>
                      <li>
                        <Link className="block px-4 py-2 hover:bg-gray-100" href="/products/subcategory/shorts" role="menuitem">
                          Shorts
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="group relative">
                    <Link className="px-2 py-4 hover:text-gray-900" href="/products/category/chaussures">
                      Chaussures
                    </Link>
                    <ul className="invisible absolute top-full left-0 z-50 mt-2 min-w-48 translate-y-1 border border-gray-200 bg-white opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100" role="menu">
                      <li>
                        <Link className="block px-4 py-2 hover:bg-gray-100" href="/products/subcategory/lifestyles" role="menuitem">
                          Lifestyles
                        </Link>
                      </li>
                      <li>
                        <Link className="block px-4 py-2 hover:bg-gray-100" href="/products/subcategory/basketball" role="menuitem">
                          Basketball
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

              <button className="hover:text-gray-900" aria-label="Rechercher">
                🔍
              </button>
              <Link className="relative rounded border border-gray-400 px-3 py-1 text-sm transition hover:bg-gray-200 hover:text-gray-900" href="/cart">
                Panier
              </Link>
              {!prenom ? (
                <Link href="/login" className="rounded border border-gray-400 px-3 py-1 text-sm transition hover:bg-gray-200 hover:text-gray-900">
                  S’identifier
                </Link>
              ) : (
                <div className="group relative">
                  <button className="flex items-center rounded border border-gray-400 px-3 py-1 text-sm font-bold transition hover:bg-gray-200">
                    Bonjour {prenom} !
                    <svg className="ml-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="invisible absolute top-full right-0 translate-y-1 rounded pt-2 opacity-0 shadow-md transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded border border-gray-300 bg-white shadow-md">
                      <Link href="/account" className="block px-4 py-2 hover:bg-gray-100">
                        Mon compte
                      </Link>
                      {(role === "ROLE_ADMIN" || role === "ROLE_SUPER_ADMIN") && (
                        <Link href="/admin" className="block px-4 py-2 hover:bg-gray-100">
                          Administration
                        </Link>
                      )}
                      <button onClick={handleLogout} className="w-full px-4 py-2 text-left hover:bg-gray-100">
                        Déconnexion
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
}
