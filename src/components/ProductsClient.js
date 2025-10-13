"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Card from "@/components/card";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  async function fetchProducts() {
    try {
      const queryString = searchParams.toString();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products${queryString ? `?${queryString}` : ""}`, {
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
    setSelectedGenre(searchParams.get("genre") ?? "");
    setSelectedSort(searchParams.get("sort") ?? "");

    fetchProducts();
  }, [searchParams.toString()]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (selectedGenre === "") {
      params.delete("genre");
    } else {
      params.set("genre", selectedGenre);
    }

    if (selectedSort === "") {
      params.delete("sort");
    } else {
      params.set("sort", selectedSort);
    }

    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  };

  return (
    <main className="py-20">
      <section className="mx-auto max-w-7xl p-8">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
            <select className="border-body-light rounded border px-4 py-2" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
              <option value="">Genre</option>
              <option value="h">Homme</option>
              <option value="f">Femme</option>
              <option value="e">Enfant</option>
              <option value="u">Unisex</option>
            </select>
            <select className="border-body-light rounded border px-4 py-2" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
              <option value="">Trier par</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
            </select>
            <button className="btn-primary-black" type="submit">
              Appliquer
            </button>
          </form>
        </div>
        <div className="-mx-4 flex flex-wrap">{data == null ? <p className="w-full px-4 text-center">Chargement en cours...</p> : data.length === 0 ? <p className="w-full px-4 text-center">Aucun produit disponible</p> : data.map((product) => <Card key={product.id} id={product.id} img={product.imageUrl} name={product.name} subCategory={product.subCategory} price={product.price} />)}</div>
      </section>
    </main>
  );
}
