import { setTokenProvider, setUnauthorizedHandler } from "@shared/lib/http";
import { getAccessToken, initAuthSync, useAuthStore } from "@shared/auth";
import { queryClient } from "@shared/lib/query-client";

type SetupAuthOptions = {
  onUnauthorized?: () => void;
};

let isSetup = false;

export function setupAuth({ onUnauthorized }: SetupAuthOptions = {}): void {
  if (isSetup) return;

  isSetup = true;

  setTokenProvider(getAccessToken);
  setUnauthorizedHandler(() => {
    useAuthStore.getState().signOut();
    queryClient.clear();
    onUnauthorized?.();
  });

  initAuthSync();
}
