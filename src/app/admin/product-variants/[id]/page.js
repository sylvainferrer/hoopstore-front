"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import FlashMessage from "@/context/FlashMessage";
//import Image from "next/image";

export default function AdminProductsVariantId() {
  const variantParams = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { setFlashMessage } = useContext(FlashMessage);

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
  }, [fetchProductVariantId]);

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

      setSuccessMessage(json);
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(err);
      setSuccessMessage(null);
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
      setFlashMessage(json);
      router.replace(`/admin/products/${data.product}`);
    } catch (err) {
      setErrorMessage(err);
    }
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
      <div className="bg-orange-50 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Détails</h2>
      </div>

      <div className="px-8 py-6">
        <nav className="text-sm text-gray-600">
          <ol className="list-reset flex flex-wrap">
            <li>
              <Link href="/admin" className="font-medium text-gray-700 hover:underline">
                Administration
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="/admin/products" className="font-medium text-gray-700 hover:underline">
                Liste des produits
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={`/admin/products/${data.product}`} className="font-medium text-gray-700 hover:underline">
                Fiche produit
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">Détail</li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-2 py-8">
        {successMessage && (
          <div className="mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800">
            <ul>
              {Object.values(successMessage).map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 rounded border border-red-300 bg-red-100 p-4 text-red-800">
            <ul>
              {Object.values(errorMessage).map((msg, i) => (
                <li key={i}>* {msg}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="border border-gray-300 bg-white p-8">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Taille* :
                <select name="size" disabled={!isEditing} className={`w-full rounded-md border px-4 py-2 focus:outline-none ${isEditing ? "border-gray-300 focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"}`} value={data.size || ""} onChange={handleChange}>
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
              <p className="text-sm">* Laissez vide si ce produit n’a pas de taille.</p>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Stock
                <input type="number" disabled={!isEditing} name="stock" value={data.stock ?? ""} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border px-4 py-2 focus:outline-none ${isEditing ? "border-gray-300 focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"}`} />
              </label>
            </div>

            <div>
              <label className="mb-1 flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="active" checked={data.active || false} onChange={handleChange} disabled={!isEditing} className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 ${isEditing ? "" : "cursor-not-allowed"}`} />
                Actif
              </label>
            </div>

            <div className="flex flex-wrap justify-start gap-4">
              <button type="button" disabled={isEditing} onClick={() => setIsEditing(true)} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "cursor-not-allowed bg-blue-300 text-white opacity-50" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                Modifier
              </button>
              <button type="submit" disabled={!isEditing} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "bg-gray-800 text-white hover:bg-gray-900" : "bg-gray-400 text-white opacity-50"}`}>
                Enregistrer
              </button>
              <button
                type="button"
                disabled={!isEditing}
                onClick={() => {
                  fetchProductVariantId();
                  setIsEditing(false);
                  setErrorMessage(null);
                }}
                className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "bg-red-500 text-white hover:bg-red-600" : "bg-red-300 text-white opacity-50"}`}
              >
                Retour
              </button>
              <button type="button" disabled={isEditing} onClick={handleDelete} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "cursor-not-allowed bg-red-300 text-white opacity-50" : "cursor-pointer bg-red-500 text-white hover:bg-red-600"}`}>
                Supprimer la sous-catégorie&nbsp;*
              </button>
            </div>
          </form>
          <div className="mt-4">
            <p disabled={isEditing} className={`text-sm ${isEditing ? "text-gray-300" : "text-black"}`}>
              * Attention : Cette action est irréversible !
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
