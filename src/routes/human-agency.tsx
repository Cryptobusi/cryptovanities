import { createFileRoute } from "@tanstack/react-router";
import { HumanAgencyPage } from "@/components/human-agency-page";

export const Route = createFileRoute("/human-agency")({
  component: HumanAgencyPage,
  head: () => ({
    meta: [{ title: "Human Agency — Egonomic Anonymous" }],
  }),
});
