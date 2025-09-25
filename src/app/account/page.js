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
      <div className="border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Mon compte</h2>
      </div>

      <div className="px-5 py-8">
        {/* Utilisateurs */}
        <div>
          <div className="mb-3 flex items-center">
            <span className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-lg font-semibold text-gray-800">
              {/* UserIcon SVG inline */}
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 20c0-3 4-5 8-5s8 2 8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Profile
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/account/profile" className="mb-2 flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-3 text-center text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:text-lg" style={{ minWidth: 180 }}>
              Mes informations personnelles
            </Link>
          </div>
        </div>

        {/* Commandes */}
        <div>
          <div className="mb-3 flex items-center">
            <span className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-lg font-semibold text-gray-800">
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
          <div className="flex flex-wrap gap-4">
            <Link href="/account/orders" className="mb-2 flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-3 text-center text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:text-lg" style={{ minWidth: 180 }}>
              Mes commandes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
