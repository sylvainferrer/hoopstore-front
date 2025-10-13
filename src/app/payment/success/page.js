import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <main className="py-20">
      <section className="mx-auto max-w-xl p-8">
        <div className="border-body-light bg-light rounded border p-8 text-center">
          <div className="rounded border border-green-300 bg-green-100 p-4 text-green-800">
            <h1 className="text-3xl">Commande enregistrée</h1>
          </div>

          <p className="mt-4">Merci pour votre commande. Elle est en cours de traitement et son statut sera mis à jour automatiquement après confirmation du paiement.</p>
          <div className="mt-8">
            <Link href="/account/orders" className="btn-primary-black">
              Voir mes commandes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
