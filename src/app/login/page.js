"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AuthContext } from "@/context/Auth";
import { FlashMessageContext } from "@/context/FlashMessage";
import Link from "next/link";

export default function LoginInner() {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const { setFlashMessage } = useContext(FlashMessageContext);

  async function handleSubmit(e) {
    e.preventDefault();

    router.replace("/login");

    const login = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        throw json;
      }

      const resMe = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        method: "GET",
        credentials: "include",
      });

      if (resMe.ok) {
        const me = await resMe.json();
        setUser({ firstname: me.firstname || "", role: me.role || "" });
      } else {
        setUser({ firstname: "", role: "" });
      }

      router.replace("/");
    } catch (err) {
      setFlashMessage(err);
    }
  }

  return (
    <main className="py-20">
      <section className="mx-auto max-w-7xl p-8">
        <div className="bg-light border-body-light mx-auto max-w-lg rounded border p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-1 block">
                Email
              </label>
              <input type="email" id="email" name="email" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block">
                Mot de passe
              </label>
              <input type="password" id="password" name="password" className="border-body-light w-full rounded border px-4 py-2" required />
            </div>

            <button type="submit" className="btn-primary-orange mt-4">
              Se connecter
            </button>
          </form>

          <p className="mt-4">
            Pas de compte ?{" "}
            <Link href="/register" className="underline">
              Inscrivez-vous
            </Link>
            <br />
            Mot de passe perdu ?{" "}
            <Link href="/password/forgot" className="underline">
              Cliquez ici
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
