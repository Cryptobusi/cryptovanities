import { createFileRoute } from "@tanstack/react-router";
import { MarketDeck } from "@/components/market-deck";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/market")({
  component: Market,
  head: () => ({
    meta: [
      { title: "Market deck · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "Price a personal fungible coin against HBAR and the currencies Coinbase and SaucerSwap publish. The deck does not hold coins or send a swap.",
      },
    ],
  }),
});

function Market() {
  return (
    <SiteChrome>
      <MarketDeck />
    </SiteChrome>
  );
}
