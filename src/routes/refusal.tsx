import { createFileRoute } from "@tanstack/react-router";
import { RefusalPage } from "@/components/refusal-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/refusal")({
  component: Refusal,
  head: () => ({
    meta: [
      { title: "Sovereignty is the refusal · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "One floor, three actors. Claims only from recorded exchange. Liabilities only by consent. Settlement in equity, not coercive correction.",
      },
    ],
  }),
});

function Refusal() {
  return (
    <SiteChrome>
      <RefusalPage />
    </SiteChrome>
  );
}
