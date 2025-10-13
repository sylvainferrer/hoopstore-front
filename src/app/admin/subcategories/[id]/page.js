"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FlashMessageContext } from "@/context/FlashMessage";

export default function AdminSubCategoriesId() {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { setFlashMessage } = useContext(FlashMessageContext);

  const [data, setData] = useState({
    name: "",
  });

  const fetchSubCategoriesId = async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories/${params.id}`, {
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
    fetchSubCategoriesId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories/${params.id}`, {
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
      router.replace("/admin/subcategories");
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
              <Link href="/admin/subcategories" className="underline">
                Liste des sous-catégories
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">Sous-catégorie</li>
          </ul>
        </nav>

        <div className="bg-light border-body-light mx-auto mt-6 max-w-xl rounded border p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block">Nom</label>
              <input type="text" name="name" value={data.name} onChange={handleChange} readOnly={!isEditing} className={`border-body-light w-full rounded border px-4 py-2 ${isEditing ? "focus:outline" : "cursor-not-allowed opacity-60 focus:outline-none"}`} />
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
                  fetchSubCategoriesId();
                  setIsEditing(false);
                }}
                className={`text-light rounded bg-red-500 px-3 py-2 transition ${isEditing ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-15"}`}
              >
                Retour
              </button>

              <button type="button" disabled={isEditing} onClick={handleDelete} className={`text-light rounded bg-red-500 px-3 py-2 transition ${isEditing ? "cursor-not-allowed opacity-15" : "cursor-pointer opacity-100"}`}>
                {`Supprimer la sous-catégorie *`}
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
