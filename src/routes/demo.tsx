import { createFileRoute } from "@tanstack/react-router";
import { SealApp } from "@/components/seal-app";

export const Route = createFileRoute("/demo")({
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
  component: Demo,
});

function Demo() {
  return (
    <div className="seal">
      <SealApp />
    </div>
  );
}
