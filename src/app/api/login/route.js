export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login_check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    const bearerCookie = res.headers.get("set-cookie");

    return new Response(JSON.stringify(json), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `${bearerCookie}`,
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Une erreur technique est survenue" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
