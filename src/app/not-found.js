// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-white">
      <section className="p-8 text-center">
        <p className="text-xl text-gray-500 uppercase">Erreur 404</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page introuvable</h1>
        <p className="mx-auto mt-4 max-w-prose text-gray-600">Désolé, la page que tu cherches n’existe pas ou a été déplacée.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="btn-primary-orange">
            Retour à l’accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
