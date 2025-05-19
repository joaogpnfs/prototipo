"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  requiredProfiles = [],
}: {
  children: React.ReactNode;
  requiredProfiles?: string[];
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (
      !loading &&
      user &&
      requiredProfiles.length > 0 &&
      !requiredProfiles.includes(user.perfil)
    ) {
      router.push("/acesso-negado");
    }
  }, [user, loading, router, requiredProfiles]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return null;
  }

  if (requiredProfiles.length > 0 && !requiredProfiles.includes(user.perfil)) {
    return null;
  }

  return <>{children}</>;
}
