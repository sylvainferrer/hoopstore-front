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
    <main className="py-20">
      <section className="mx-auto max-w-7xl p-8">
        <div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.imageUrl ? <img src={data.imageUrl} alt={data.name} className="aspect-square w-full object-cover" /> : <div className="flex aspect-square w-full items-center justify-center">Pas d’image</div>}

            <div className="flex flex-col">
              <div className="flex items-baseline justify-between gap-4">
                <h1 className="text-dark text-2xl md:text-3xl">{data.name}</h1>
                <div className="text-dark text-xl font-bold md:text-2xl">{data.price}&nbsp;€</div>
              </div>

              <div className="mt-6">
                <p className="leading-relaxed whitespace-pre-line">{data.description}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {data.category && <span className="bg-primary-light rounded px-3 py-1">{data.category}</span>}
                {data.subCategory && <span className="bg-primary-light rounded px-3 py-1">{data.subCategory}</span>}
                {data.genre && <span className="bg-primary-light rounded px-3 py-1">{data.genre}</span>}
              </div>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="productVariantId" value={data.id || ""} />
                <input type="hidden" name="name" value={data.name || ""} />

                {data.variants?.length === 1 && data.variants[0].size === "no-size" ? (
                  <input type="hidden" name="variant" value={data.variants[0].id} />
                ) : (
                  <div className="mt-8">
                    <label htmlFor="variant" className="mb-1">
                      Taille
                    </label>
                    <select name="variant" className="bg-light border-body-light w-full rounded border px-3 py-2">
                      {data.variants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {variant.size === "no-size" ? "Pas de taille" : variant.size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="mt-4">
                  <label htmlFor="quantity" className="mb-1">
                    Quantité
                  </label>
                  <input type="number" id="quantity" name="quantity" min={1} defaultValue={1} className="bg-light border-body-light w-full rounded border px-3 py-2" />
                </div>

                {successMessage && (
                  <div className="mt-4 mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800">
                    <p>{successMessage}</p>
                  </div>
                )}

                <div className="mt-8">
                  <button type="submit" className="btn-primary-black">
                    Ajouter au panier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
