import { createFileRoute } from "@tanstack/react-router";
import { DesertPage } from "@/components/desert-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/desert")({
  component: Desert,
  head: () => ({
    meta: [
      { title: "After the prices, the rest is yours · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "Desert. Residual title after the floor and the listed charges. Not a spare welfare budget. Not a tail to socialize.",
      },
    ],
  }),
});

function Desert() {
  return (
    <SiteChrome>
      <DesertPage />
    </SiteChrome>
  );
}
