import { createFileRoute } from "@tanstack/react-router";
import { HedgePage } from "@/components/hedge-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/hedge")({
  component: Hedge,
  head: () => ({
    meta: [
      { title: "Paper is not cash at the register · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "Checkout hedging. Named paper converts into basket units at a live discount. The hedge locks that conversion without a second mint.",
      },
    ],
  }),
});

function Hedge() {
  return (
    <SiteChrome>
      <HedgePage />
    </SiteChrome>
  );
}
