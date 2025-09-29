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
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Mon compte</h2>
      </div>

      <div className="mx-auto max-w-7xl space-y-10 px-2 py-8">
        <div className="flex flex-wrap justify-center gap-6">
          {/* Utilisateurs */}
          <div className="flex basis-full flex-col items-center rounded-lg border border-gray-300 bg-white p-6 sm:basis-1/2 lg:basis-1/3">
            <div className="mb-6 flex items-center">
              <span className="flex items-center text-2xl font-semibold text-gray-950">
                {/* UserIcon SVG inline */}
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 20c0-3 4-5 8-5s8 2 8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Profile
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Link href="/account/profile" className="btn-primary-black">
                Mes informations personnelles
              </Link>
            </div>
          </div>

          {/* Commandes */}
          <div className="flex basis-full flex-col items-center rounded-lg border border-gray-300 bg-white p-6 sm:basis-1/2 lg:basis-1/3">
            <div className="mb-6 flex items-center">
              <span className="flex items-center text-2xl font-semibold text-gray-950">
                {/* OrdersIcon SVG inline */}
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2">
                  <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="8" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Commandes
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Link href="/account/orders" className="btn-primary-black">
                Mes commandes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
