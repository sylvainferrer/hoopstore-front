import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("BEARER");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
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

export async function PUT(request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const cookie = cookieStore.get("BEARER");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
      method: "PUT",
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

export async function DELETE(request) {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("BEARER");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
      method: "DELETE",
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
