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
    <main className="py-20">
      <section className="mx-auto max-w-7xl p-8">
        <div className="border-body-light bg-light rounded border p-4">
          {cart.products.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            <div className="divide-body-light divide-y">
              {cart.products.map((product, i) => (
                <div key={i} className="flex flex-wrap items-end justify-between">
                  <div className="p-4">
                    <div>
                      Réference Produit: <span className="font-bold">{product.variantId}</span>
                    </div>
                    <div>
                      Nom: <span className="font-bold">{product.name}</span>
                    </div>
                    <div>
                      Size: <span className="font-bold">{product.size}</span>
                    </div>
                    <div>
                      Prix: <span className="font-bold">{product.price} €</span>
                    </div>
                    <div>
                      <label className="" htmlFor={`qty-${product.variantId}`}>
                        Quantité
                      </label>
                      <input id={`qty-${product.variantId}`} type="number" min={1} className="border-body-light w-full rounded border px-4 py-2 focus:outline" value={product.quantity} onChange={(e) => updateQty(product.variantId, e.target.value)} />
                    </div>
                  </div>
                  <div className="p-4">
                    <button onClick={() => removeItem(product.variantId)} className="rounded border border-red-300 px-3 py-2 text-red-600">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={handleCheckout} disabled={loading || cart.products.length === 0} className="btn-primary-black">
            {loading ? "Redirection vers Stripe..." : "Payer"}
          </button>
        </div>
      </section>
    </main>
  );
}
