import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <>
      {/* Header */}
      <div className="border-b border-gray-300 bg-gray-100 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Paiement</h2>
      </div>

      {/* Contenu principal */}
      <div className="px-5 py-8">
        <div className="border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="rounded border border-green-300 bg-green-100 p-4 text-green-800">
            <h1 className="text-3xl text-gray-800">Commande enregistrée</h1>
          </div>

          <p className="mt-4 text-gray-700">Merci pour votre commande. Elle est en cours de traitement et son statut sera mis à jour automatiquement après confirmation du paiement.</p>
          <Link href="/account/orders" className="m-4 inline-block rounded-md bg-gray-800 px-5 py-2 text-white transition hover:bg-gray-900">
            Voir mes commandes
          </Link>
        </div>
      </div>
    </>
  );
}
