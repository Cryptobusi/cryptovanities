import { createFileRoute } from "@tanstack/react-router";
import { LegalesePage } from "@/components/legalese-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/legalese")({
  component: Legalese,
  head: () => ({
    meta: [
      { title: "Legalese · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "Angela Walch on the mutable meaning of ‘immutable’ and the risks of unsettled blockchain vocabulary for law and ledgers.",
      },
    ],
  }),
});

function Legalese() {
  return (
    <SiteChrome>
      <LegalesePage />
    </SiteChrome>
  );
}
