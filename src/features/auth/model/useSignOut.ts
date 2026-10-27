import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { queryClient } from "@shared/lib/query-client";
import { useAuthStore } from "@shared/auth";

export function useSignOut(): () => void {
  const navigate = useNavigate();
  const signOut = useAuthStore((state) => state.signOut);

  return useCallback(() => {
    signOut();
    queryClient.clear();
    navigate({ to: "/signin", replace: true });
  }, [navigate, signOut]);
}
