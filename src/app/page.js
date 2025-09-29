"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import FlashMessage from "@/context/FlashMessage";

export default function Home() {
  const [data, setData] = useState([]);
  const { flashMessage } = useContext(FlashMessage);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/latest`, {
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
    <>
      {flashMessage && (
        <div className="width-full border border-green-300 bg-green-100 p-3 text-green-800">
          <ul>
            {Object.values(flashMessage).map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
      <main className="">
        <div className="flex min-h-[500px] w-full items-center justify-center bg-cover bg-top" style={{ backgroundImage: `url('/images/jordan.jpg')` }}>
          <div className="max-auto w-full max-w-7xl">
            <h1 className="px-4 text-6xl font-bold text-white">
              <span className="text-primary">HoopStore.com</span> <br />
              la référence du basketball
              <br />
              en ligne !
            </h1>
          </div>
        </div>

        <div className="bg-orange-50 px-8 py-6">
          <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Nouveautés</h2>
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
    </>
  );
}
