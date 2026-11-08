import { createFileRoute } from "@tanstack/react-router";
import { AiDltAgencyPage } from "@/components/ai-dlt-agency-page";

export const Route = createFileRoute("/ai-dlt-agency")({
  component: AiDltAgencyPage,
  head: () => ({
    meta: [{ title: "The Architecture of Human Agency: AI & DLT — Egonomic Anonymous" }],
  }),
});
