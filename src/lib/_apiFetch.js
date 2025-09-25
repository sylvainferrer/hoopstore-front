export default async function apiFetch({ targetUrl, method, body = null, onSuccess = console.log, onError = console.error }) {
  try {
    const res = await fetch(targetUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    const json = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        window.location.href = "/login?auth=unauthorized";
        return;
      }
      throw json;
    }

    onSuccess(json);
  } catch (err) {
    onError(err);
  }
}
