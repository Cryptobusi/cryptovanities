import { createFileRoute } from "@tanstack/react-router";
import { RiemannPage } from "@/components/riemann-page";

export const Route = createFileRoute("/riemann")({
  component: RiemannPage,
});
