import { createFileRoute } from "@tanstack/react-router";
import { MintPage } from "@/components/mint-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/mint")({
  component: Mint,
  head: () => ({
    meta: [
      { title: "The mint is a price. Not a facility · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "One scarce meter. Seigniorage is listed before the auction. No actor, including the treasury, prints off the schedule.",
      },
    ],
  }),
});

function Mint() {
  return (
    <SiteChrome>
      <MintPage />
    </SiteChrome>
  );
}
