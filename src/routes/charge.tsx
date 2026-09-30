import { createFileRoute } from "@tanstack/react-router";
import { ChargePage } from "@/components/charge-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/charge")({
  component: Charge,
  head: () => ({
    meta: [
      { title: "The charge is listed. Then you issue · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "The listed risk charge. Posted by class, taken when the paper is written, senior only to residual title, never a second mint.",
      },
    ],
  }),
});

function Charge() {
  return (
    <SiteChrome>
      <ChargePage />
    </SiteChrome>
  );
}
