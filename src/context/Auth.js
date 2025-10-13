// "use client";
// import { createContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState({ firstname: "", role: "" });
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     async function fetchAuth() {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
//           method: "GET",
//           credentials: "include",
//         });
//         if (!res.ok) {
//           setUser({ firstname: "", role: "" });
//           return;
//         }
//         const json = await res.json();
//         setUser({ firstname: json.firstname, role: json.role });
//       } catch (err) {
//         setUser({ firstname: "", role: "" });
//       }
//     }

//     fetchAuth();
//   }, []);

//   useEffect(() => {
//     const authParam = searchParams.get("auth");
//     if (authParam === "required" || authParam === "invalid") {
//       setUser({ firstname: "", role: "" });
//     }
//   }, [searchParams]);

//   return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
// }

// export { AuthContext };
// export default AuthProvider;
"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({ firstname: "", role: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/users/me`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) return setUser({ firstname: "", role: "" });
        const json = await res.json();
        setUser({ firstname: json.firstname || "", role: json.role || "" });
      } catch {
        setUser({ firstname: "", role: "" });
      }
    })();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
