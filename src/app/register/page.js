"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FlashMessageContext } from "@/context/FlashMessage";
import Link from "next/link";

export default function Register() {
  const { setFlashMessage } = useContext(FlashMessageContext);
  const router = useRouter();

  const handleSubmit = async function (e) {
    e.preventDefault();

    const data = {
      lastname: e.target.lastname.value,
      firstname: e.target.firstname.value,
      birthday: e.target.birthday.value,
      email: e.target.email.value,
      adresse: e.target.adresse.value,
      codePostal: e.target.codePostal.value,
      ville: e.target.ville.value,
      password: e.target.password.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      router.replace("/login");
    } catch (err) {
      setFlashMessage(err);
    }
  };

  return (
    <main className="py-20">
      <section className="mx-auto max-w-7xl p-8">
        <div className="bg-light border-body-light mx-auto max-w-xl rounded border p-8">
          <h1 className="sr-only">Formulaire d'enregistrement</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstname" className="mb-1 block">
                Prénom
              </label>
              <input type="text" id="firstname" name="firstname" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>
            <div>
              <label htmlFor="lastname" className="mb-1 block">
                Nom
              </label>
              <input type="text" id="lastname" name="lastname" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>
            <div>
              <label htmlFor="birthday" className="mb-1 block">
                Date de naissance
              </label>
              <input type="date" id="birthday" name="birthday" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block">
                Email
              </label>
              <input type="email" id="email" name="email" autoComplete="email" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>
            <div>
              <label htmlFor="adresse" className="mb-1 block">
                Adresse
              </label>
              <input type="text" id="adresse" name="adresse" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>
            <div>
              <label htmlFor="codePostal" className="mb-1 block">
                Code Postal
              </label>
              <input type="text" id="codePostal" name="codePostal" pattern="[0-9]{5}" title="Entrez un code postal à 5 chiffres" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>
            <div>
              <label htmlFor="ville" className="mb-1 block">
                Ville
              </label>
              <input type="text" id="ville" name="ville" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block">
                Password
              </label>
              <input type="password" id="password" name="password" autoComplete="new-password" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>
            <button type="submit" className="btn-primary-orange mt-4">
              {"S'inscrire"}
            </button>
          </form>
          <p className="mt-4">
            Déjà inscrit ?{" "}
            <Link href="/login" className="underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
