"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FlashMessageContext } from "@/context/FlashMessage";

export default function AdminProductsVariantId() {
  const variantParams = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { setFlashMessage } = useContext(FlashMessageContext);

  const [data, setData] = useState({
    product: "",
    size: "",
    stock: null,
    active: false,
  });

  const fetchProductVariantId = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/product-variants/${variantParams.id}`, {
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
    fetchProductVariantId();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      product: data.product,
      size: data.size,
      stock: data.stock,
      active: data.active,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/product-variants/${variantParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login?auth=unauthorized";
          return;
        }
        throw json;
      }

      setFlashMessage(json);
    } catch (err) {
      setFlashMessage(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/product-variants/${variantParams.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login?auth=unauthorized";
          return;
        }
        throw json;
      }
      router.replace(`/admin/products/${data.product}`);
      setFlashMessage(json);
    } catch (err) {
      setFlashMessage(err);
    }
  };

  return (
    <main className="py-20">
      <section className="mx-auto max-w-7xl p-8">
        <nav className="mt-6">
          <ul className="list-reset flex flex-wrap">
            <li>
              <Link href="/admin" className="underline">
                Administration
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="/admin/products" className="underline">
                Liste des produits
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={`/admin/products/${data.product}`} className="underline">
                Fiche produit
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">Détail</li>
          </ul>
        </nav>

        <div className="bg-light border-body-light mx-auto mt-6 max-w-xl rounded border p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block">
                Taille
                <select name="size" value={data.size || ""} onChange={handleChange} disabled={!isEditing} className={`border-body-light w-full rounded border px-4 py-2 ${isEditing ? "focus:outline" : "cursor-not-allowed opacity-60 focus:outline-none"}`}>
                  <option value="no-size">— Aucune taille —</option>

                  <optgroup label="Tailles vêtements">
                    <option value="TU">TU</option>
                    <option value="XXS">XXS</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                  </optgroup>

                  <optgroup label="Tailles chaussures">
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                  </optgroup>
                </select>
              </label>
            </div>

            <div>
              <label className="mb-1 block">
                Stock
                <input type="number" disabled={!isEditing} name="stock" value={data.stock ?? ""} onChange={handleChange} readOnly={!isEditing} className={`border-body-light w-full rounded border px-4 py-2 ${isEditing ? "focus:outline" : "cursor-not-allowed opacity-60 focus:outline-none"}`} />
              </label>
            </div>

            <div>
              <label className="mb-1 flex items-center gap-2">
                <input type="checkbox" name="active" checked={data.active || false} onChange={handleChange} disabled={!isEditing} className={`h-5 w-5 ${isEditing ? "opacity-100" : "cursor-not-allowed opacity-60"}`} />
                Actif
              </label>
            </div>

            <div className="flex flex-wrap justify-start gap-4">
              <button
                type="button"
                disabled={isEditing}
                onClick={() => {
                  setIsEditing(true);
                }}
                className={`text-light rounded bg-blue-500 px-5 py-2 transition ${isEditing ? "cursor-not-allowed opacity-15" : "cursor-pointer opacity-100"}`}
              >
                Modifier
              </button>

              <button type="submit" disabled={!isEditing} className={`btn-primary-black transition ${isEditing ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-15"}`}>
                Enregistrer les modifications
              </button>

              <button
                type="button"
                disabled={!isEditing}
                onClick={() => {
                  fetchProductVariantId();
                  setIsEditing(false);
                }}
                className={`text-light rounded bg-red-500 px-3 py-2 transition ${isEditing ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-15"}`}
              >
                Retour
              </button>

              <button type="button" disabled={isEditing} onClick={handleDelete} className={`text-light rounded bg-red-500 px-3 py-2 transition ${isEditing ? "cursor-not-allowed opacity-15" : "cursor-pointer opacity-100"}`}>
                {`Supprimer la déclinaison *`}
              </button>
              <div className="mt-4">
                <p disabled={isEditing} className={`text-body ${isEditing ? "opacity-15" : "opacity-100"}`}>
                  * Attention : Cette action est irréversible !
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
