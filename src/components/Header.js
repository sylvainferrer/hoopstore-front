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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // (optionnel) empêcher le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

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
        <header>
          <div className="pt-16">
            <div className="flex justify-center py-4">
              <img className="max-w-[200px]" src="/images/hoopstore-logo.png" alt="Logo Hoopstore" />
            </div>

            {/* BARRE FIXE */}
            <div className="bg-primary fixed top-0 z-50 flex h-16 w-full items-center justify-between px-4 shadow-sm md:px-8">
              {/* Bouton burger visible uniquement en mobile */}
              <div>
                <button type="button" className="text-white md:hidden" aria-label="Ouvrir le menu" aria-expanded={isMenuOpen} aria-controls="mobile-menu" onClick={() => setIsMenuOpen((o) => !o)}>
                  {/* icône burger simple en SVG */}
                  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {isMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <>
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                      </>
                    )}
                  </svg>
                </button>

                {/* Nav desktop */}
                <nav className="relative hidden md:block">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                    <Link href="/" className="px-2 font-bold text-white">
                      Accueil
                    </Link>

                    {/* Accessoires */}
                    <div className="group relative">
                      <Link className="px-2 font-bold text-white" href="/products/category/accessoires">
                        Accessoires
                      </Link>
                      <ul className="block md:invisible md:absolute md:top-full md:left-0 md:z-50 md:min-w-48 md:translate-y-1 md:overflow-hidden md:border md:border-gray-100 md:bg-white md:opacity-0 md:transition md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100" role="menu">
                        <li>
                          <Link className="block px-4 py-2 hover:bg-orange-50 md:text-gray-900" href="/products/subcategory/ballons" role="menuitem">
                            Ballons
                          </Link>
                        </li>
                        <li>
                          <Link className="block px-4 py-2 hover:bg-orange-50 md:text-gray-900" href="/products/subcategory/paniers" role="menuitem">
                            Paniers
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Vêtements */}
                    <div className="group relative">
                      <Link className="px-2 font-bold text-white" href="/products/category/vetements">
                        Vêtements
                      </Link>
                      <ul className="block md:invisible md:absolute md:top-full md:left-0 md:z-50 md:min-w-48 md:translate-y-1 md:overflow-hidden md:border md:border-gray-100 md:bg-white md:opacity-0 md:transition md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100" role="menu">
                        <li>
                          <Link className="block px-4 py-2 hover:bg-orange-50 md:text-gray-900" href="/products/subcategory/maillots" role="menuitem">
                            Maillots
                          </Link>
                        </li>
                        <li>
                          <Link className="block px-4 py-2 hover:bg-orange-50 md:text-gray-900" href="/products/subcategory/shorts" role="menuitem">
                            Shorts
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Chaussures */}
                    <div className="group relative">
                      <Link className="px-2 font-bold text-white" href="/products/category/chaussures">
                        Chaussures
                      </Link>
                      <ul className="block md:invisible md:absolute md:top-full md:left-0 md:z-50 md:min-w-48 md:translate-y-1 md:overflow-hidden md:border md:border-gray-100 md:bg-white md:opacity-0 md:transition md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100" role="menu">
                        <li>
                          <Link className="block px-4 py-2 hover:bg-orange-50 md:text-gray-900" href="/products/subcategory/lifestyles" role="menuitem">
                            Lifestyles
                          </Link>
                        </li>
                        <li>
                          <Link className="block px-4 py-2 hover:bg-orange-50 md:text-gray-900" href="/products/subcategory/basketball" role="menuitem">
                            Basketball
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>

              {/* actions droite */}
              <div>
                <Link className="btn-secondary mx-2" href="/cart">
                  Panier
                </Link>
                {!prenom ? (
                  <Link href="/login" className="btn-primary mx-2">
                    Se connecter
                  </Link>
                ) : (
                  <div className="group relative hidden md:inline-block">
                    <button className="btn-primary flex items-center">
                      Bonjour {prenom} !
                      <svg className="text-primary ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="invisible absolute top-full right-0 translate-y-1 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="border border-gray-100 bg-white">
                        <Link href="/account" className="block px-4 py-2 hover:bg-orange-50">
                          Mon compte
                        </Link>
                        {(role === "ROLE_ADMIN" || role === "ROLE_SUPER_ADMIN") && (
                          <Link href="/admin" className="block px-4 py-2 hover:bg-orange-50">
                            Administration
                          </Link>
                        )}
                        <button onClick={handleLogout} className="text-primary w-full px-4 py-2 text-left font-bold hover:bg-orange-50">
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* MENU MOBILE : absolute, caché par défaut, visible au clic */}
            <div id="mobile-menu" className={`absolute top-16 right-0 left-0 z-40 pb-4 transition-all duration-200 md:hidden ${isMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`} aria-hidden={!isMenuOpen}>
              <div className="overflow-hidden bg-white">
                <nav className="flex flex-col items-center p-4">
                  <div className="p-2">
                    <Link href="/" className="text-md block font-semibold" onClick={closeMenu}>
                      Accueil
                    </Link>
                  </div>
                  {/* Accessoires */}
                  <div className="flex flex-col items-center p-2">
                    <Link href="/products/category/accessoires" className="text-md block font-semibold" onClick={closeMenu}>
                      Accessoires
                    </Link>
                    <div className="mt-1 grid grid-cols-1">
                      <Link href="/products/subcategory/ballons" className="text-md p-2 text-gray-700" onClick={closeMenu}>
                        Ballons
                      </Link>
                      <Link href="/products/subcategory/paniers" className="text-md p-2 text-gray-700" onClick={closeMenu}>
                        Paniers
                      </Link>
                    </div>
                  </div>

                  {/* Vêtements */}
                  <div className="flex flex-col items-center p-2">
                    <Link href="/products/category/vetements" className="text-md block rounded-md font-semibold" onClick={closeMenu}>
                      Vêtements
                    </Link>
                    <div className="mt-1 grid grid-cols-1">
                      <Link href="/products/subcategory/maillots" className="text-md p-2 text-gray-700" onClick={closeMenu}>
                        Maillots
                      </Link>
                      <Link href="/products/subcategory/shorts" className="text-md p-2 text-gray-700" onClick={closeMenu}>
                        Shorts
                      </Link>
                    </div>
                  </div>

                  {/* Chaussures */}
                  <div className="flex flex-col items-center">
                    <Link href="/products/category/chaussures" className="text-md block font-semibold" onClick={closeMenu}>
                      Chaussures
                    </Link>
                    <div className="mt-1 grid grid-cols-1">
                      <Link href="/products/subcategory/lifestyles" className="text-md p-2 text-gray-700" onClick={closeMenu}>
                        Lifestyles
                      </Link>
                      <Link href="/products/subcategory/basketball" className="text-md p-2 text-gray-700" onClick={closeMenu}>
                        Basketball
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    {!prenom ? (
                      <Link href="/login" className="text-md text-primary p-2" onClick={closeMenu}>
                        Se connecter
                      </Link>
                    ) : (
                      <>
                        <Link href="/account" className="text-md text-primary p-2" onClick={closeMenu}>
                          Mon compte
                        </Link>
                        {(role === "ROLE_ADMIN" || role === "ROLE_SUPER_ADMIN") && (
                          <Link href="/admin" className="text-md text-primary p-2" onClick={closeMenu}>
                            Administration
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            closeMenu();
                            handleLogout();
                          }}
                          className="text-primary text-md mt-2 font-bold"
                        >
                          Déconnexion
                        </button>
                      </>
                    )}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
