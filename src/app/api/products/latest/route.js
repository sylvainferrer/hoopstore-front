export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/latest`, {
      method: "GET",
    });
    const json = await res.json();
    return new Response(JSON.stringify(json), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Une erreur technique est survenue" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
