import { createFileRoute } from "@tanstack/react-router";
import { SigninPage } from "../pages/Signin";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SigninPage />;
}
