"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import UserName from "@/context/UserName";
import Link from "next/link";

export default function AdminHome() {
  const router = useRouter();
  const { role } = useContext(UserName);

  return (
    <div>
      {/* Header */}
      <div className="bg-orange-50 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Administration</h2>
      </div>

      <div className="mx-auto max-w-7xl space-y-10 px-2 py-8">
        <div className="flex flex-wrap justify-center gap-6">
          {/* Utilisateurs */}
          <div className="flex basis-full flex-col items-center rounded-lg border border-gray-300 bg-white p-6 sm:basis-1/2 lg:basis-1/3">
            <div className="mb-6 flex items-center">
              <span className="text-primary flex items-center text-2xl font-semibold">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 20c0-3 4-5 8-5s8 2 8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Utilisateurs
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Link href="/admin/users" className="btn-primary-black">
                Liste des utilisateurs
              </Link>
              {role === "ROLE_SUPER_ADMIN" && (
                <Link href="/admin/users/create" className="btn-secondary-black">
                  Création d’un utilisateur
                </Link>
              )}
            </div>
          </div>

          {/* Produits */}
          <div className="flex basis-full flex-col items-center rounded-lg border border-gray-300 bg-white p-6 sm:basis-1/2 lg:basis-1/3">
            <div className="mb-6 flex items-center">
              <span className="flex items-center text-2xl font-semibold text-gray-950">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 3v18" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M3 12h18" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 4.5c2.5 2 2.5 13 0 15" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M17 4.5c-2.5 2-2.5 13 0 15" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Produits
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Link href="/admin/products" className="btn-primary-black">
                Liste des produits
              </Link>
              {role === "ROLE_SUPER_ADMIN" && (
                <Link href="/admin/products/create" className="btn-secondary-black">
                  Création d’un produit
                </Link>
              )}
            </div>
          </div>

          {/* Catalogue */}
          <div className="flex basis-full flex-col items-center rounded-lg border border-gray-300 bg-white p-6 sm:basis-1/2 lg:basis-1/3">
            <div className="mb-6 flex items-center">
              <span className="flex items-center text-2xl font-semibold text-gray-950">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2">
                  <path d="M4 4h16v5H4V4zM4 15h7v5H4v-5zM13 15h7v5h-7v-5zM4 10h16v3H4v-3z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Catalogue
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/admin/categories" className="btn-primary-black">
                Liste des catégories
              </Link>
              {role === "ROLE_SUPER_ADMIN" && (
                <Link href="/admin/categories/create" className="btn-secondary-black">
                  Création d’une catégorie
                </Link>
              )}
            </div>

            <div className="mt-6 flex flex-col justify-center gap-4">
              <Link href="/admin/subcategories" className="btn-primary-black">
                Liste des sous-catégories
              </Link>
              {role === "ROLE_SUPER_ADMIN" && (
                <Link href="/admin/subcategories/create" className="btn-secondary-black">
                  Création d’une sous-catégorie
                </Link>
              )}
            </div>
          </div>

          {/* Commandes */}
          <div className="flex basis-full flex-col items-center rounded-lg border border-gray-300 bg-white p-6 sm:basis-1/2 lg:basis-1/3">
            <div className="mb-6 flex items-center">
              <span className="flex items-center text-2xl font-semibold text-gray-950">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2">
                  <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="8" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Commandes
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-6">
              <Link href="/admin/orders" className="btn-primary-black">
                Liste des commandes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
