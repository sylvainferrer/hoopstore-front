"use client";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function AdminHome() {
  const router = useRouter();

  return (
    <main className="py-20">
      <section className="mx-auto max-w-7xl p-8">
        <h2 className="text-dark text-2xl md:text-4xl">Mon compte</h2>

        <div className="mt-6 flex flex-wrap">
          <div className="mb-8 w-full p-0 md:w-1/3 md:p-3">
            <div className="border-body-light bg-light rounded border p-4">
              <div className="text-dark flex flex-col items-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 20c0-3 4-5 8-5s8 2 8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                <Link href="/account/profile" className="btn-primary-black mt-3 block w-full text-center">
                  Mes informations personnelles
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-8 w-full p-0 md:w-1/3 md:p-3">
            <div className="border-body-light bg-light rounded border p-4">
              <div className="text-dark flex flex-col items-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                  <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="8" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="1.2" />
                </svg>

                <Link href="/account/orders" className="btn-primary-black mt-3 block w-full text-center">
                  Mes commandes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
