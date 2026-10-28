import {
  setForbiddenHandler,
  setTokenProvider,
  setUnauthorizedHandler,
} from "@shared/lib/http";
import { getAccessToken, initAuthSync, useAuthStore } from "@shared/auth";
import { queryClient } from "@shared/lib/query-client";
import { meKeys } from "@features/authorization";

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

  setForbiddenHandler(() => {
    void queryClient.invalidateQueries({ queryKey: meKeys.all });
  });

  initAuthSync();
}
