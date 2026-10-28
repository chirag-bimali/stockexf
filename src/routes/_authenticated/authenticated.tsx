import { ForbiddenPage } from "@pages/Forbidden";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForbiddenPage />;
}
