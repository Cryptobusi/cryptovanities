import { createFileRoute } from "@tanstack/react-router";
import { Sealroom } from "@/components/sealroom";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/demo")({
  component: Demo,
  head: () => ({
    meta: [
      { title: "Sealroom demo · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "Demo desk for Sealroom. A phone-first private-party notary. Coins are recorded from HashPack clubhbar.ℏ. This demo does not move X Money.",
      },
    ],
  }),
});

function Demo() {
  return (
    <SiteChrome>
      <Sealroom />
    </SiteChrome>
  );
}
