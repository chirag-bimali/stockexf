import { createFileRoute } from "@tanstack/react-router";
import { redirectToLandingArea } from "@features/authorization";

// "/" has no page of its own: it sends the user to their area.
export const Route = createFileRoute("/_authenticated/")({
  beforeLoad: () => redirectToLandingArea(),
});
