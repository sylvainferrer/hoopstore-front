// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="py-20">
      <section className="mx-auto max-w-7xl p-8 text-center">
        <p className="uppercase">Erreur 404</p>
        <h1 className="text-dark mt-2 text-2xl md:text-4xl">Page introuvable</h1>
        <p className="">Désolé, la page que tu cherches n’existe pas ou a été déplacée.</p>
        <div className="mt-8">
          <Link href="/" className="btn-primary-orange">
            Retour à l’accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
