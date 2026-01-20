// components/auth/AuthProvider.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../../../zustand/store";
import axios from "../../../libs/axios";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, setAccessToken } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      if (accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("re attempt")
        const response = await axios.post("/auth/refresh");
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.warn("Session recovery failed",error);
        router.push("/Login");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [accessToken, setAccessToken, router]);

  useEffect(()=>{
  },[pathname])
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}