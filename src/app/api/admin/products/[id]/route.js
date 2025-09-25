import { cookies } from "next/headers";

export async function GET(request, { params }) {
  try {
    const productParams = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productParams.id}`, {
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

export async function POST(request, { params }) {
  try {
    const formData = await request.formData();
    const productParams = await params;
    const cookieStore = await cookies();
    const cookie = cookieStore.get("BEARER");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products/${productParams.id}`, {
      method: "POST",
      headers: {
        cookie: cookie?.value ? `BEARER=${cookie.value}` : "",
      },
      body: formData,
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

export async function DELETE(request, { params }) {
  try {
    const cookieStore = await cookies();
    const productParams = await params;
    const cookie = cookieStore.get("BEARER");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products/${productParams.id}`, {
      method: "DELETE",
      headers: {
        cookie: cookie?.value ? `BEARER=${cookie.value}` : "",
      },
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
