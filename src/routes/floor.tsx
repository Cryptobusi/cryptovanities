import { createFileRoute } from "@tanstack/react-router";
import { FloorPage } from "@/components/floor-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/floor")({
  component: Floor,
  head: () => ({
    meta: [
      { title: "The workable form · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "A public floor and a public tape. Private issue under the same rules. Hedera is the tape. Authority Trail checks the grant. HashPack mints.",
      },
    ],
  }),
});

function Floor() {
  return (
    <SiteChrome>
      <FloorPage />
    </SiteChrome>
  );
}
