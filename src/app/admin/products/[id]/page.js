"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { FlashMessageContext } from "@/context/FlashMessage";
import Link from "next/link";

export default function AdminProductsId() {
  const productParams = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddVariant, setShowAddVariant] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const { setFlashMessage } = useContext(FlashMessageContext);
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
  }, []);

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

      setFlashMessage(json);
    } catch (err) {
      setFlashMessage(err);
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

      setFlashMessage(json);
      e.target.reset();
      setShowAddVariant(false);
      fetchIdWithVariants();
    } catch (err) {
      setFlashMessage(err);
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
            <li>Fiche produit</li>
          </ul>
        </nav>

        <div className="mt-8">
          <p>
            ID produit: <span className="font-bold">{data.id || "-"}</span>
          </p>
          <p>
            Date de création: <span className="font-bold">{data.date || "-"}</span>
          </p>
        </div>

        <div className="bg-light border-body-light mx-auto mt-6 max-w-xl rounded border p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block">Nom</label>
              <input type="text" name="name" value={data.name} onChange={handleChange} readOnly={!isEditing} className={`border-body-light w-full rounded border px-4 py-2 ${isEditing ? "focus:outline" : "cursor-not-allowed opacity-60 focus:outline-none"}`} />
            </div>

            <div>
              <label className="mb-1 block">
                Sous-catégorie
                <select name="subCategory" disabled={!isEditing} value={data.subCategory} onChange={handleChange} className={`border-body-light w-full rounded border px-4 py-2 ${isEditing ? "focus:outline" : "cursor-not-allowed opacity-60 focus:outline-none"}`}>
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
              <label className="mb-1 block">
                Genre
                <select name="genre" value={data.genre} onChange={handleChange} disabled={!isEditing} className={`border-body-light w-full rounded border px-4 py-2 ${isEditing ? "focus:outline" : "cursor-not-allowed opacity-60 focus:outline-none"}`}>
                  <option value="" disabled>
                    -- Sélectionner --
                  </option>
                  <option value="h">Homme</option>
                  <option value="f">Femme</option>
                  <option value="e">Enfant</option>
                  <option value="u">Unisex</option>
                </select>
              </label>
            </div>

            <div>
              <label className="mb-1 block">Prix en €</label>
              <input type="text" name="price" value={data.price} onChange={handleChange} readOnly={!isEditing} className={`border-body-light w-full rounded border px-4 py-2 ${isEditing ? "focus:outline" : "cursor-not-allowed opacity-60 focus:outline-none"}`} />
            </div>

            <div>
              <label className="mb-1 block">Description</label>
              <textarea name="description" value={data.description} onChange={handleChange} readOnly={!isEditing} rows={4} className={`border-body-light w-full rounded border px-4 py-2 ${isEditing ? "focus:outline" : "cursor-not-allowed opacity-60 focus:outline-none"}`} />
            </div>

            <div>
              <label className="mb-1 block">
                Image
                {data.imageUrl && (
                  <div className="mb-2">
                    <img src={data.imageUrl} alt={data.name} className="h-50 w-50 object-cover" />
                  </div>
                )}
                {isEditing && (
                  <input
                    type="file"
                    readOnly={!isEditing}
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
                    className={`border-body-light w-full rounded border px-4 py-2 ${isEditing ? "focus:outline" : "cursor-not-allowed opacity-60 focus:outline-none"}`}
                  />
                )}
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
                  fetchIdWithVariants();
                  setIsEditing(false);
                }}
                className={`text-light rounded bg-red-500 px-3 py-2 transition ${isEditing ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-15"}`}
              >
                Retour
              </button>

              <button type="button" disabled={isEditing} onClick={handleDelete} className={`text-light rounded bg-red-500 px-3 py-2 transition ${isEditing ? "cursor-not-allowed opacity-15" : "cursor-pointer opacity-100"}`}>
                {`Supprimer le produit *`}
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

      <section className="mx-auto max-w-7xl p-8">
        <div className="mt-8">
          <h2 className="text-dark text-2xl md:text-4xl">Déclinaisons</h2>
          <p className="mt-2">Pour mettre ce produit en ligne, créez ou activez au moins une déclinaison.</p>
        </div>

        <div className="mt-6 overflow-x-auto rounded">
          <table className="w-full text-left">
            <thead className="bg-body-light text-dark border-body-light border">
              <tr>
                <th className="p-2 align-middle">ID</th>
                <th className="p-2 align-middle">Taille</th>
                <th className="p-2 align-middle">Stock</th>
                <th className="p-2 align-middle">Actif</th>
                <th className="p-2 align-middle"></th>
              </tr>
            </thead>

            <tbody className="divide-body-light divide-y">
              {(!data || data.variants.length === 0) && (
                <tr>
                  <td colSpan={5} className="text-body p-2">
                    Aucune déclinaison pour le moment.
                  </td>
                </tr>
              )}

              {data.variants.map((variant, index) => (
                <tr key={variant.id}>
                  <td className="p-2 align-middle">{variant.id}</td>
                  <td className="p-2 align-middle">{variant.size === "no-size" ? "-" : variant.size}</td>
                  <td className="p-2 align-middle tabular-nums">{variant.stock}</td>
                  <td className="p-2 align-middle">
                    <span className={`block h-4 w-4 rounded-full ${variant.isActive ? "bg-green-500" : "bg-red-500"}`} aria-label={variant.isActive ? "Actif" : "Inactif"} />
                  </td>
                  <td className="p-2 text-right align-top">
                    <button onClick={() => router.push(`/admin/product-variants/${variant.id}`)} className="btn-primary-black" aria-label={`Voir les détails de la déclinaison ${variant.id}`}>
                      Éditer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!showAddVariant && (
            <button
              type="button"
              onClick={() => {
                setShowAddVariant(true);
              }}
              className="btn-primary-orange mt-6"
            >
              Créer une déclinaison
            </button>
          )}
        </div>
      </section>

      {showAddVariant && (
        <section className="mx-auto max-w-7xl p-8">
          <div className="mt-8">
            <h2 className="text-dark text-2xl md:text-4xl">Créer une déclinaison</h2>
          </div>

          <form onSubmit={handleSubmitVariant}>
            <input type="hidden" name="product" value={data.id} />

            <div className="mt-6 overflow-x-auto rounded">
              <table className="w-full text-left">
                <thead className="bg-body-light text-dark border-body-light border">
                  <tr>
                    <th className="p-2 align-middle">ID</th>
                    <th className="p-2 align-middle">Taille</th>
                    <th className="p-2 align-middle">Stock</th>
                    <th className="p-2 align-middle">Actif</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-2 align-middle">-</td>

                    <td className="p-2 align-middle">
                      <label className="sr-only" htmlFor="size">
                        Taille
                      </label>
                      <select id="size" name="size" defaultValue="no-size" className="border-body-light min-w-120 rounded border px-4 py-2 focus:outline">
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
                    </td>

                    <td className="p-2 align-middle">
                      <label className="sr-only" htmlFor="stock">
                        Stock
                      </label>
                      <input id="stock" name="stock" type="number" min={0} inputMode="numeric" className="border-body-light min-w-120 rounded border px-4 py-2 focus:outline" />
                    </td>

                    <td className="p-2 align-middle">
                      <label className="sr-only" htmlFor="active">
                        Actif
                      </label>
                      <input id="active" name="active" type="checkbox" className="h-5 w-5" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <button type="submit" className="btn-primary-orange">
                Ajouter
              </button>
              <button type="button" onClick={() => setShowAddVariant(false)} className="btn-secondary-orange">
                Annuler
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}
