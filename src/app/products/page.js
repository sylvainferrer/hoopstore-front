"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Products() {
  const [data, setData] = useState([]);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="">
      <div className="bg-orange-50 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Découvrez tous nos articles</h2>
      </div>

      <div className="mx-auto max-w-7xl px-2 py-8">
        <div className="-mx-4 flex flex-wrap">
          {data.map(function (item) {
            return (
              <div key={item.id} className="mb-8 w-full px-4 sm:w-1/2 md:w-1/3">
                <Link href={`/products/${item.id}`} className="group block h-full">
                  <div className="rounded-2xl bg-orange-50 p-4">
                    <img src={item.imageUrl} alt={item.name} className="mb-4 h-68 w-full rounded-tl-2xl rounded-tr-2xl object-cover" />
                    <h2 className="mb-2 text-lg text-gray-950">{item.name}</h2>
                    <p className="text-primary mb-2 text-sm">{item.subCategory}</p>
                    <p className="text-lg font-bold text-gray-950">{item.price}€</p>
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
