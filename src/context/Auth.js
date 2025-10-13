"use client";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({ firstname: "", role: "" });

  useEffect(() => {
    async function fetchAuth() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          setUser({ firstname: "", role: "" });
          return;
        }
        const json = await res.json();
        setUser({ firstname: json.firstname, role: json.role });
      } catch (err) {
        setUser({ firstname: "", role: "" });
      }
    }

    fetchAuth();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
export default AuthProvider;
