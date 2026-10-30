import { createFileRoute } from "@tanstack/react-router";
import { HumanNaturePage } from "@/components/human-nature-page";

export const Route = createFileRoute("/human-nature-synthesis")({
  component: HumanNaturePage,
  head: () => ({
    meta: [{ title: "Human Nature — Egonomic Anonymous" }],
  }),
});
