"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import FlashMessage from "@/context/FlashMessage";
import Link from "next/link";

export default function AdminProductsId() {
  const productParams = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddVariant, setShowAddVariant] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successVariantMessage, setSuccessVariantMessage] = useState(null);
  const [errorVariantMessage, setErrorVariantMessage] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const { flashMessage, setFlashMessage } = useContext(FlashMessage);
  const [data, setData] = useState({
    id: "",
    name: "",
    subCategory: "",
    subCategoryId: "",
    genre: "",
    description: "",
    price: "",
    date: "",
    imageUrl: "",
    variants: [],
  });

  const fetchIdWithVariants = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${productParams.id}`, {
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
    fetchIdWithVariants();
  }, [fetchIdWithVariants]);

  useEffect(() => {
    const fetchSubCategoriesGrouped = async function () {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories`, {
          method: "GET",
        });
        const json = await res.json();
        if (!res.ok) {
          throw json;
        }
        setSubCategories(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubCategoriesGrouped();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${productParams.id}`, {
        method: "POST",
        credentials: "include",
        body: formData,
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

  const handleSubmitVariant = async function (e) {
    e.preventDefault();

    const dataVariant = {
      product: e.target.product.value,
      size: e.target.size.value || null,
      stock: parseInt(e.target.stock.value, 10) || 0,
      active: e.target.active.checked,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/product-variants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataVariant),
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

      setErrorVariantMessage(null);
      setSuccessVariantMessage(json);
      e.target.reset();
      setShowAddVariant(false);
      fetchIdWithVariants();
    } catch (err) {
      setSuccessVariantMessage(null);
      setErrorVariantMessage(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${productParams.id}`, {
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
      router.replace("/admin/products");
    } catch (err) {
      setErrorMessage(err);
    }
  };

  useEffect(() => {
    if (!successMessage && !successVariantMessage) return;
    const t = setTimeout(() => {
      if (successMessage) setSuccessMessage(null);
      if (successVariantMessage) setSuccessVariantMessage(null);
    }, 3000);
    return () => clearTimeout(t);
  }, [successMessage, successVariantMessage]);

  return (
    <>
      <div className="bg-orange-50 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-950 md:text-4xl">Fiche produit</h2>
      </div>

      <div className="px-5 py-8">
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
            <li className="text-gray-500">Fiche produit</li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-2 py-8">
        <p className="text-xl text-gray-700">
          ID produit: <span className="font-bold">{data.id || "-"}</span>
        </p>
        <p className="mt-2 text-xl text-gray-700">
          Date de création: <span className="font-bold">{data.date || "-"}</span>
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-2 py-8">
        {flashMessage && (
          <div className="mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800">
            <ul>
              {Object.values(flashMessage).map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

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
          <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Nom
                <input type="text" name="name" value={data.name} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border px-4 py-2 focus:outline-none ${isEditing ? "border-gray-300 focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"}`} />
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Sous-catégorie
                <select name="subCategory" disabled={!isEditing} value={data.subCategory} onChange={handleChange} className={`w-full rounded-md border px-4 py-2 focus:outline-none ${isEditing ? "border-gray-300 focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"}`}>
                  <option value="" disabled>
                    -- Sélectionner --
                  </option>
                  {Array.isArray(subCategories) &&
                    subCategories.map((cat) => (
                      <optgroup key={cat.categoryId} label={cat.categoryName}>
                        {cat.subCategories?.map((sc) => (
                          <option key={sc.subCategoryId} value={sc.subCategoryId}>
                            {sc.subCategoryName}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                </select>
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Genre
                <select name="genre" value={data.genre} onChange={handleChange} disabled={!isEditing} className={`w-full rounded-md border px-4 py-2 focus:outline-none ${isEditing ? "border-gray-300 focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"}`}>
                  <option value="" disabled>
                    -- Sélectionner --
                  </option>
                  <option value="H">Homme</option>
                  <option value="F">Femme</option>
                  <option value="E">Enfant</option>
                  <option value="U">Unisex</option>
                </select>
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Prix en Euros (€)
                <input type="text" name="price" value={data.price} onChange={handleChange} readOnly={!isEditing} className={`w-full rounded-md border px-4 py-2 focus:outline-none ${isEditing ? "border-gray-300 focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"}`} />
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Description
                <textarea name="description" value={data.description} onChange={handleChange} readOnly={!isEditing} rows={4} className={`w-full rounded-md border px-4 py-2 focus:outline-none ${isEditing ? "border-gray-300 focus:ring-2 focus:ring-gray-400" : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"}`} />
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-700">
                Image
                {data.imageUrl && (
                  <div className="mb-2">
                    <img src={data.imageUrl} alt={data.name} className="h-50 w-50 object-cover" />
                  </div>
                )}
                {isEditing && (
                  <input
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setData((prev) => ({
                          ...prev,
                          imageFile: file,
                        }));
                      }
                    }}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-gray-300 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-400"
                  />
                )}
              </label>
            </div>

            <div className="flex flex-wrap justify-start gap-4 md:col-span-2">
              <button type="button" disabled={isEditing} onClick={() => setIsEditing(true)} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "cursor-not-allowed bg-blue-300 text-white opacity-50" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                Éditer
              </button>
              <button type="submit" disabled={!isEditing} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "bg-gray-800 text-white hover:bg-gray-900" : "bg-gray-400 text-white opacity-50"}`}>
                Enregistrer
              </button>
              <button
                type="button"
                disabled={!isEditing}
                onClick={() => {
                  fetchIdWithVariants();
                  setIsEditing(false);
                  setErrorMessage(null);
                }}
                className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "bg-red-500 text-white hover:bg-red-600" : "bg-red-300 text-white opacity-50"}`}
              >
                Retour
              </button>

              <button type="button" disabled={isEditing} onClick={handleDelete} className={`w-auto rounded-md px-5 py-2 transition ${isEditing ? "cursor-not-allowed bg-red-300 text-white opacity-50" : "cursor-pointer bg-red-500 text-white hover:bg-red-600"}`}>
                Supprimer le produit&nbsp;*
              </button>
            </div>
            <div>
              <p disabled={isEditing} className={`text-sm ${isEditing ? "text-gray-300" : "text-gray-600"}`}>
                * Attention : Cette action est irréversible !
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full border-b border-gray-300 px-5 py-2">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Déclinaisons</h2>
        <p className="mt-2 text-sm text-gray-500">Pour mettre ce produit en ligne, créez ou activez au moins une déclinaison.</p>
      </div>

      {successVariantMessage && (
        <div className="mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800">
          <ul>
            {Object.values(successVariantMessage).map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {errorVariantMessage && (
        <div className="mb-4 rounded border border-red-300 bg-red-100 p-4 text-red-800">
          <ul>
            {Object.values(errorVariantMessage).map((msg, i) => (
              <li key={i}>* {msg}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="px-5 py-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-4 font-bold">ID</th>
                <th className="px-4 py-4 font-bold">Taille</th>
                <th className="px-4 py-4 font-bold">Stock</th>
                <th className="px-4 py-4 font-bold">Actif</th>
                <th className="px-4 py-4 font-bold"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {(!data || data.variants.length) === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-gray-500">
                    Aucune déclinaison pour le moment.
                  </td>
                </tr>
              )}

              {data.variants.map((variant, index) => (
                <tr key={variant.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} transition-colors hover:bg-gray-100`}>
                  <td className="px-4 py-4 align-top">{variant.id}</td>
                  <td className="px-4 py-4 align-top">{variant.size === "no-size" ? "-" : variant.size}</td>
                  <td className="px-4 py-4 align-top tabular-nums">{variant.stock}</td>
                  <td className="px-4 py-4 align-top">
                    <span className={`block h-4 w-4 rounded-full ${variant.isActive ? "bg-green-500" : "bg-red-500"}`} aria-label={variant.isActive ? "Actif" : "Inactif"} />
                  </td>
                  <td className="px-4 py-4 text-right align-top">
                    <Link href={`/admin/product-variants/${variant.id}`} className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                      Éditer
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          {!showAddVariant && (
            <button
              type="button"
              onClick={() => {
                setShowAddVariant(true);
              }}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Créer une déclinaison
            </button>
          )}
        </div>
      </div>
      {showAddVariant && (
        <>
          <div className="w-full border-b border-gray-300 px-5 py-2">
            <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Créer une déclinaison</h2>
          </div>
          <div className="px-5 py-8">
            <div className="overflow-x-auto">
              <form onSubmit={handleSubmitVariant}>
                <input type="hidden" name="product" value={data.id} />

                <table className="w-full text-left text-sm text-gray-800">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 font-bold">ID</th>
                      <th className="px-4 py-2 font-bold">Taille</th>
                      <th className="px-4 py-2 font-bold">Stock</th>
                      <th className="px-4 py-2 font-bold">Actif</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {/* Ligne de saisie (nouveau variant) */}
                    <tr className="bg-white">
                      <td className="px-4 py-3 align-top text-gray-500">
                        <span className="font-semibold">-</span>
                      </td>

                      <td className="px-4 py-3 align-top">
                        <label className="sr-only" htmlFor="size">
                          Taille
                        </label>
                        <select id="size" name="size" defaultValue="no-size" className="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-gray-400/40 focus:outline-none">
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

                        <p className="mt-1 text-xs text-gray-500">Si le produit n’a pas de taille, laissez “Aucune taille”.</p>
                      </td>

                      <td className="px-4 py-3 align-top">
                        <label className="sr-only" htmlFor="stock">
                          Stock
                        </label>
                        <input id="stock" name="stock" type="number" min={0} inputMode="numeric" className="mt-1 w-28 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-gray-400/40 focus:outline-none" />
                      </td>

                      <td className="px-4 py-3 align-top">
                        <label className="inline-flex items-center gap-2">
                          <span className="font-semibold">Actif :</span>
                          <input name="active" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-6 flex items-center gap-2">
                  <button type="submit" className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60">
                    Ajouter
                  </button>
                  <button type="button" onClick={() => setShowAddVariant(false)} className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
