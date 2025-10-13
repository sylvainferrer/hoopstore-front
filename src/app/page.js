"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/card";

export default function Home() {
  const [data, setData] = useState(null);

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
    <main>
      <div className="flex min-h-[80vh] w-full items-center justify-center bg-cover bg-top" style={{ backgroundImage: `url('/images/jordan.jpg')` }}>
        <section className="mx-auto w-full max-w-7xl p-8">
          <h1 className="text-light text-6xl">
            la référence du <span className="text-primary">basketball</span>
            <br />
            en ligne !
          </h1>
        </section>
      </div>

      <section className="mx-auto max-w-7xl p-8">
        <h2 className="text-dark text-2xl md:text-4xl">Nouveautés</h2>
        <div className="flex flex-wrap">{data == null ? <p className="w-full px-4 text-center">Chargement en cours...</p> : data.length === 0 ? <p className="w-full px-4 text-center">Aucun produit disponible</p> : data.map((product) => <Card key={product.id} id={product.id} img={product.imageUrl} name={product.name} subCategory={product.subCategory} price={product.price} />)}</div>
      </section>
    </main>
  );
}
