import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("BEARER");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders`, {
      method: "GET",
      headers: { cookie: cookie?.value ? `BEARER=${cookie.value}` : "" },
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
