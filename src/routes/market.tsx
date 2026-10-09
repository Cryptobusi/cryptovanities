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
      <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
        <p className="font-mono text-xs tracking-widest text-subtle uppercase">Thin books</p>
        <p className="mt-3 max-w-2xl text-muted">
          A thin book stays wide. Inventing a tight price when the board is empty is a skipped line. Width is information.
        </p>
      </section>
      <MarketDeck />
    </SiteChrome>
  );
}
