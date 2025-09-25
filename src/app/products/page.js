"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const json = await res.json();

        if (!res.ok) {
          throw json;
        }

        setData(json);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="">
      <div className="w-full border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 md:text-2xl">Découvrez tous nos articles</h2>
      </div>

      <div className="px-5 py-8">
        <div className="-mx-4 flex flex-wrap">
          {data.map(function (item) {
            return (
              <div key={item.id} className="mb-8 w-full px-4 sm:w-1/2 md:w-1/3">
                <Link href={`/products/${item.id}`} className="group block h-full">
                  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                    <img src={item.imageUrl} alt={item.name} className="mb-4 h-48 w-full rounded-md object-cover" />
                    <h2 className="mb-2 text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="mb-2 text-sm text-gray-600">{item.subCategory}</p>
                    <p className="font-medium text-gray-800">{item.price} €</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
