"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/Auth";

export default function AdminHome() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  return (
    <main className="py-20">
      <section className="mx-auto max-w-7xl p-8">
        <h2 className="text-dark text-2xl md:text-4xl">Administration</h2>

        <div className="mt-6 flex flex-wrap">
          <div className="mb-8 w-full p-0 md:w-1/3 md:p-3">
            <div className="border-body-light bg-light rounded border p-4">
              <div className="text-dark flex flex-col items-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 20c0-3 4-5 8-5s8 2 8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <Link href="/admin/users" className="btn-primary-black mt-3 block w-full text-center">
                  Liste des utilisateurs
                </Link>
                {user.role === "ROLE_SUPER_ADMIN" && (
                  <Link href="/admin/users/create" className="btn-secondary-black mt-3 block w-full text-center">
                    Création d’un utilisateur
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8 w-full p-0 md:w-1/3 md:p-3">
            <div className="border-body-light bg-light rounded border p-4">
              <div className="text-dark flex flex-col items-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 3v18" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M3 12h18" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 4.5c2.5 2 2.5 13 0 15" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M17 4.5c-2.5 2-2.5 13 0 15" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <Link href="/admin/products" className="btn-primary-black mt-3 block w-full text-center">
                  Liste des produits
                </Link>
                {user.role === "ROLE_SUPER_ADMIN" && (
                  <Link href="/admin/products/create" className="btn-secondary-black mt-3 block w-full text-center">
                    Création d’un produit
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8 w-full p-0 md:w-1/3 md:p-3">
            <div className="border-body-light bg-light rounded border p-4">
              <div className="text-dark flex flex-col items-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                  <path d="M4 4h16v5H4V4zM4 15h7v5H4v-5zM13 15h7v5h-7v-5zM4 10h16v3H4v-3z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <Link href="/admin/categories" className="btn-primary-black mt-3 block w-full text-center">
                  Liste des catégories
                </Link>
                {user.role === "ROLE_SUPER_ADMIN" && (
                  <Link href="/admin/categories/create" className="btn-secondary-black mt-3 block w-full text-center">
                    Création d’une catégorie
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8 w-full p-0 md:w-1/3 md:p-3">
            <div className="border-body-light bg-light rounded border p-4">
              <div className="text-dark flex flex-col items-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                  <path d="M4 4h16v5H4V4zM4 15h7v5H4v-5zM13 15h7v5h-7v-5zM4 10h16v3H4v-3z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <Link href="/admin/subcategories" className="btn-primary-black mt-3 block w-full text-center">
                  Liste des sous-catégories
                </Link>
                {user.role === "ROLE_SUPER_ADMIN" && (
                  <Link href="/admin/subcategories/create" className="btn-secondary-black mt-3 block w-full text-center">
                    Création d’une sous-catégorie
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8 w-full p-0 md:w-1/3 md:p-3">
            <div className="border-body-light bg-light rounded border p-4">
              <div className="text-dark flex flex-col items-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="mr-2">
                  <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="8" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <Link href="/admin/orders" className="btn-primary-black mt-3 block w-full text-center">
                  Liste des commandes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
