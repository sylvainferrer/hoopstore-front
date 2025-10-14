"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FlashMessageContext } from "@/context/FlashMessage";
import { AuthContext } from "@/context/Auth";

export default function Header() {
  const router = useRouter();
  const { setFlashMessage } = useContext(FlashMessageContext);
  const { user, setUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Empêcher le scroll quand le menu mobile est ouvert + fermer avec Échap
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    const onKey = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
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
        throw json;
      }
      setFlashMessage(json);
      setUser("");
      //window.location.href = "/";
      router.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header>
        {/* Spacer pour la barre fixe */}
        {/* BARRE FIXE */}
        <div className="bg-light fixed top-0 z-99 w-full shadow-xs">
          <div className="flex items-center justify-between px-8 py-4 lg:py-0">
            {/* --- Zone gauche (desktop): logo + nav --- */}
            <div className="flex flex-1 items-center">
              {/* Logo à gauche (toujours visible) */}
              <div>
                <Link className="" href="/">
                  <img src="/images/logo-hoopstore.svg" alt="Logo HoopStore" className="min-w-32" />
                </Link>
              </div>

              {/* Navigation desktop en ligne */}
              <nav className="ml-6 hidden lg:block">
                <ul className="flex flex-wrap items-center">
                  {/* Tous les produits */}
                  <li className="px-4 py-6">
                    <Link className="hover:text-primary" href="/products">
                      Tous les produits
                    </Link>
                  </li>

                  {/* Accessoires */}
                  <li className="group relative px-4 py-6">
                    <Link className="hover:text-primary" href="/products?category=accessoires">
                      Accessoires
                    </Link>
                    <ul className="bg-light invisible absolute top-full left-0 z-50 translate-y-1 overflow-hidden opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100" role="menu">
                      <li>
                        <Link href="/products?subcategory=ballons" className="hover:text-primary block px-6 py-3" role="menuitem">
                          Ballons
                        </Link>
                      </li>
                      <li>
                        <Link href="/products?subcategory=paniers" className="hover:text-primary block px-6 py-3" role="menuitem">
                          Paniers
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Vêtements */}
                  <li className="group relative px-4 py-6">
                    <Link className="group hover:text-primary" href="/products?category=vêtements">
                      Vêtements
                    </Link>
                    <ul className="bg-light invisible absolute top-full left-0 z-50 translate-y-1 overflow-hidden opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100" role="menu">
                      <li>
                        <Link href="/products?subcategory=maillots" className="hover:text-primary block px-6 py-3" role="menuitem">
                          Maillots
                        </Link>
                      </li>
                      <li>
                        <Link href="/products?subcategory=shorts" className="hover:text-primary block px-6 py-3" role="menuitem">
                          Shorts
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Chaussures */}
                  <li className="group relative px-4 py-6">
                    <Link className="group hover:text-primary" href="/products?category=chaussures">
                      Chaussures
                    </Link>
                    <ul className="bg-light invisible absolute top-full left-0 z-50 translate-y-1 overflow-hidden opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100" role="menu">
                      <li>
                        <Link href="/products?subcategory=lifestyles" className="hover:text-primary block px-6 py-3" role="menuitem">
                          Lifestyles
                        </Link>
                      </li>
                      <li>
                        <Link href="/products?subcategory=basketball" className="hover:text-primary block px-6 py-3" role="menuitem">
                          Basketball
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>

            {/* --- Zone droite : boutons --- */}
            <div className="flex items-center gap-3">
              {/* Desktop: afficher les 2 boutons à droite + panier */}
              <div className="hidden items-center gap-3 lg:flex">
                <Link href="/cart" aria-label="Panier" className="px-3 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#030712" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </Link>

                {!user.firstname ? (
                  <>
                    <Link className="btn-secondary-orange" href="/register">
                      {`S'inscrire`}
                    </Link>

                    <Link href="/login" className="btn-primary-orange">
                      {`S'identifier`}
                    </Link>
                  </>
                ) : (
                  <div className="group relative">
                    <button className="btn-primary-orange flex items-center" aria-haspopup="menu" aria-expanded="false">
                      Bonjour&nbsp;<span className="font-bold">{user.firstname}</span>
                      <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="invisible absolute top-full right-0 translate-y-1 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="bg-light shadow-lg">
                        <Link href="/account" className="hover:text-primary block px-6 py-3">
                          Mon compte
                        </Link>
                        {(user.role === "ROLE_ADMIN" || user.role === "ROLE_SUPER_ADMIN") && (
                          <Link href="/admin" className="hover:text-primary block px-6 py-3">
                            Administration
                          </Link>
                        )}
                        <button onClick={handleLogout} className="hover:text-primary w-full px-6 py-3 text-left font-bold">
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile: bouton burger (ouvre tout le menu: nav + boutons) */}
              <button type="button" className="text-primary lg:hidden" aria-label="Ouvrir le menu" aria-expanded={isMenuOpen} aria-controls="mobile-menu" onClick={() => setIsMenuOpen((o) => !o)}>
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
            </div>
          </div>
        </div>

        {/* MENU MOBILE : panneau plein écran avec nav + boutons */}
        <div id="mobile-menu" className={`fixed inset-0 z-999 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden ${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!isMenuOpen} onClick={closeMenu}>
          <div className={`bg-light ml-auto h-full w-[85%] max-w-sm overflow-y-auto px-4 pt-4 pb-12 shadow-xl transition-transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Menu">
            <div className="mb-4 text-right">
              <button aria-label="Fermer le menu" onClick={closeMenu}>
                <svg className="h-8 w-8 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-2 text-black">
              <Link href="/" className="block rounded px-3 py-2 text-lg font-semibold" onClick={closeMenu}>
                Accueil
              </Link>

              {/* Accessoires */}
              <div className="text-lg">
                <Link href="/products?category=accessoires" className="block rounded px-3 py-2 font-semibold" onClick={closeMenu}>
                  Accessoires
                </Link>
                <div className="space-y-1">
                  <Link href="/products?subcategory=ballons" className="block rounded px-3 py-2" onClick={closeMenu}>
                    Ballons
                  </Link>
                  <Link href="/products?subcategory=paniers" className="block rounded px-3 py-2" onClick={closeMenu}>
                    Paniers
                  </Link>
                </div>
              </div>

              {/* Vêtements */}
              <div className="text-lg">
                <Link href="/products?category=vetements" className="block rounded px-3 py-2 font-semibold" onClick={closeMenu}>
                  Vêtements
                </Link>
                <div className="space-y-1">
                  <Link href="/products?subcategory=maillots" className="block rounded px-3 py-2" onClick={closeMenu}>
                    Maillots
                  </Link>
                  <Link href="/products?subcategory=shorts" className="block rounded px-3 py-2" onClick={closeMenu}>
                    Shorts
                  </Link>
                </div>
              </div>

              {/* Chaussures */}
              <div className="text-lg">
                <Link href="/products?category=chaussures" className="block rounded px-3 py-2 font-semibold" onClick={closeMenu}>
                  Chaussures
                </Link>
                <div className="space-y-1">
                  <Link href="/products?subcategory=lifestyles" className="block rounded px-3 py-2" onClick={closeMenu}>
                    Lifestyles
                  </Link>
                  <Link href="/products?subcategory=basketball" className="block rounded px-3 py-2" onClick={closeMenu}>
                    Basketball
                  </Link>
                </div>
              </div>
            </nav>

            <hr className="my-4 text-gray-300" />

            {/* Boutons (mobile) */}
            <div className="space-y-2">
              <Link href="/cart" aria-label="Panier" className="px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="#030712" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </Link>

              {!user.firstname ? (
                <>
                  <Link href="/login" className="btn-secondary-orange block w-full text-center" onClick={closeMenu}>
                    {`S'identifier`}
                  </Link>

                  <Link href="/login" className="btn-primary-orange block w-full text-center" onClick={closeMenu}>
                    Se connecter
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/account" className="btn-secondary-black block w-full text-center" onClick={closeMenu}>
                    Mon compte
                  </Link>

                  {(user.role === "ROLE_ADMIN" || user.role === "ROLE_SUPER_ADMIN") && (
                    <Link href="/admin" className="btn-secondary-black block w-full text-center" onClick={closeMenu}>
                      Administration
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    className="btn-primary-black block w-full text-center font-bold"
                  >
                    Déconnexion
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
