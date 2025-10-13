"use client";
import { useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { AuthContext } from "./Auth";

export default function AuthQuerySync() {
  const { setUser } = useContext(AuthContext);
  const searchParams = useSearchParams();

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth === "required" || auth === "invalid") {
      setUser({ firstname: "", role: "" });
    }
  }, [searchParams, setUser]);

  return null;
}
