"use client";
import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState({ products: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    if (raw) {
      setCart(JSON.parse(raw));
    }
  }, []);

  const updateQty = (variantId, nextQty) => {
    const qty = Math.max(1, Number(nextQty) || 1);
    setCart((prev) => {
      const next = {
        ...prev,
        products: prev.products.map((p) => (String(p.variantId) === String(variantId) ? { ...p, quantity: qty } : p)),
      };
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
  };

  const removeItem = (variantId) => {
    setCart((prev) => {
      const next = {
        ...prev,
        products: prev.products.filter((p) => String(p.variantId) !== String(variantId)),
      };
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
  };

  const handleCheckout = async function () {
    try {
      setLoading(true);

      const data = cart.products
        .filter((p) => p?.variantId && (p?.quantity || 1) > 0)
        .map((p) => ({
          productVariantId: Number(p.variantId),
          quantity: Number(p.quantity || 1),
        }));
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ data }),
      });

      const json = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login?auth=unauthorized";
          return;
        }
        throw json;
      }
      if (json.checkout_url) {
        window.location.href = json.checkout_url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-orange-50 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Mon panier</h2>
      </div>
      <div className="mx-auto max-w-7xl p-2 py-8">
        <div className="border border-gray-300 bg-white p-8">
          {cart.products.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            <ul className="divide-y">
              {cart.products.map((product, i) => (
                <li key={i} className="flex justify-between py-4">
                  <div>
                    <div className="font-medium">ID Produit: {product.variantId}</div>
                    <div>Nom: {product.name}</div>
                    <div>Size: {product.size}</div>
                    <div>Prix: {product.price}</div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label className="text-sm text-gray-700" htmlFor={`qty-${product.variantId}`}>
                        Quantité
                      </label>
                      <input id={`qty-${product.variantId}`} type="number" min={1} className="w-20 rounded border border-gray-300 px-2 py-1 text-sm" value={product.quantity} onChange={(e) => updateQty(product.variantId, e.target.value)} />
                      <button onClick={() => removeItem(product.variantId)} className="rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50">
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={handleCheckout} disabled={loading || cart.products.length === 0} className="inline-block rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50">
            {loading ? "Redirection vers Stripe..." : "Payer"}
          </button>
        </div>
      </div>
    </>
  );
}
