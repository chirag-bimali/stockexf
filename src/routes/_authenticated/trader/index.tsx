import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/trader/")({
  component: () => <h3 className="text-lg font-semibold">Trader overview</h3>,
});
