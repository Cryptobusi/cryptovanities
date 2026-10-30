import { createFileRoute } from "@tanstack/react-router";
import { EnclosurePage } from "@/components/enclosure-page";

export const Route = createFileRoute("/operating-system-of-enclosure")({
  component: EnclosurePage,
  head: () => ({
    meta: [{ title: "Operating System of Enclosure — Egonomic Anonymous" }],
  }),
});
