import { cookies } from "next/headers";

export async function GET(request, { params }) {
  try {
    const subCategoryParams = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories/${subCategoryParams.id}`, {
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

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const subCategoryParams = await params;
    const cookieStore = await cookies();
    const cookie = cookieStore.get("BEARER");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/subcategories/${subCategoryParams.id}`, {
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

export async function DELETE(request, { params }) {
  try {
    const cookieStore = await cookies();
    const userParams = await params;
    const cookie = cookieStore.get("BEARER");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/subcategories/${userParams.id}`, {
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
