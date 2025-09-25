import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("BEARER");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {
      method: "POST",
      headers: {
        cookie: cookie?.value ? `BEARER=${cookie.value}` : "",
      },
    });

    const bearerCookie = res.headers.get("set-cookie");
    const json = await res.json();

    return new Response(JSON.stringify(json), {
      status: res.status,
      headers: {
        "Set-Cookie": `${bearerCookie}`,
        "Clear-Site-Data": '"cookies", "storage"',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Une erreur technique est survenue" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
