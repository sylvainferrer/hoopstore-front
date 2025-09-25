"use client";
import { createContext, useState, useEffect } from "react";

const UserName = createContext();

export function UserNameProvider({ children }) {
  const [prenom, setPrenom] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          setPrenom(null);
          setRole(null);
          setLoading(false);
          return;
        }
        const json = await res.json();
        setPrenom(json.firstname ?? null);
        setRole(json.role ?? null);
        setLoading(false);
      } catch (err) {
        setPrenom(null);
        setRole(null);
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return <UserName.Provider value={{ prenom, setPrenom, role, setRole, loading }}>{children}</UserName.Provider>;
}

export default UserName;
