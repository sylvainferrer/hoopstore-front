"use client";
import { useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AuthContext } from "@/context/Auth";

export default function AuthQuerySync() {
  const { setUser } = useContext(AuthContext);
  const searchParams = useSearchParams();

  useEffect(() => {
    const authParam = searchParams.get("auth");
    if (authParam === "unauthorized" || authParam === "required" || authParam === "invalid") {
      setUser({ firstname: "", role: "" });
    }
  }, [searchParams, setUser]);

  return null;
}
