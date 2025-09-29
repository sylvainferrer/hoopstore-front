"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductsId() {
  const params = useParams();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState({
    name: "",
    category: "",
    subCategory: "",
    genre: "",
    description: "",
    price: "",
    date: "",
    imageUrl: "",
    variants: [],
  });

  const fetchProductsId = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`, {
        method: "GET",
      });
      const json = await res.json();
      if (!res.ok) {
        throw json;
      }
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductsId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const variantId = form.variant.value;
    const quantity = Number(form.quantity.value);
    const selectedVariant = data.variants.find((v) => String(v.id) === String(variantId));

    const product = {
      productId: data.id,
      name: data.name,
      price: data.price,
      size: selectedVariant.size === "no-size" ? "Pas de taille" : selectedVariant.size,
      variantId,
      quantity,
    };

    const cart = JSON.parse(localStorage.getItem("cart") || '{"products":[]}');
    const existing = cart.products.find((p) => p.variantId === variantId);

    if (existing) {
      existing.quantity = Number(existing.quantity) + quantity;
    } else {
      cart.products.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setSuccessMessage("Produit ajouté avec succès");
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <>
      <div className="px-8 py-6">
        <nav className="">
          <ol className="list-reset flex">
            <li>
              <Link href="/products" className="font-medium text-gray-950 hover:underline">
                Retour vers tous les produits
              </Link>
            </li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl p-2 py-8">
        <div className="rounded-2xl border border-orange-200 p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>{data.imageUrl ? <img src={data.imageUrl} alt={data.name} className="aspect-square w-full rounded-2xl border border-gray-200 object-cover" /> : <div className="grid aspect-square w-full place-items-center rounded-2xl bg-gray-100 text-gray-500">Aucune image</div>}</div>

            <div className="flex flex-col">
              <div className="flex items-baseline justify-between gap-4">
                <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">{data.name}</h1>
                <div className="text-xl font-bold text-gray-900 md:text-2xl">{data.price} €</div>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-sm font-medium text-gray-700">Description</h3>
                <p className="leading-relaxed whitespace-pre-line text-gray-700">{data.description || "—"}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {data.category && <span className="bg-orange-100 px-3 py-1 text-gray-700">Catégorie : {data.category}</span>}
                {data.subCategory && <span className="bg-orange-100 px-3 py-1 text-gray-700">Sous-catégorie : {data.subCategory}</span>}
                {data.genre && <span className="bg-orange-100 px-3 py-1 text-gray-700">{data.genre}</span>}
              </div>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="productVariantId" value={data.id || ""} />
                <input type="hidden" name="name" value={data.name || ""} />

                {data.variants?.length === 1 && data.variants[0].size === "no-size" ? (
                  <input type="hidden" name="variant" value={data.variants[0].id} />
                ) : (
                  <div className="mt-8">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Taille</label>
                    <select name="variant" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-gray-400/40 focus:outline-none">
                      {data.variants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {variant.size === "no-size" ? "Pas de taille" : variant.size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="mt-4">
                  <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-gray-950">
                    Quantité
                  </label>
                  <input type="number" id="quantity" name="quantity" min={1} defaultValue={1} className="w-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none" />
                </div>

                {successMessage && (
                  <div className="mt-4 mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800">
                    <p>{successMessage}</p>
                  </div>
                )}

                <div className="mt-8">
                  <button type="submit" className="rounded-xl bg-gray-950 px-6 py-3 text-white transition hover:bg-gray-800">
                    Ajouter au panier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
