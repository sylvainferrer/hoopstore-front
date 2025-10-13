// app/products/page.js  (Server Component)
import { Suspense } from "react";
import ProductsClient from "@/components/ProductsClient";

export default function Products() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ProductsClient />
    </Suspense>
  );
}
