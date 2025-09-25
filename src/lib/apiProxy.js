import { cookies } from "next/headers";

// Fonction générique pour proxy HTTP (POST, PUT)
export async function apiProxy({ request, targetUrl, method }) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const cookie = cookieStore.get("BEARER");

    const res = await fetch(targetUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        cookie: cookie?.value ? `BEARER=${cookie.value}` : "",
      },
      body: JSON.stringify(body),
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

// Fonction générique pour proxy HTTP (GET)
export async function apiProxyGet({ targetUrl }) {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("BEARER");

    const res = await fetch(targetUrl, {
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
