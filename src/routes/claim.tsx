import { createFileRoute } from "@tanstack/react-router";
import { ClaimPage } from "@/components/claim-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/claim")({
  component: Claim,
  head: () => ({
    meta: [
      { title: "The floor is a claim. Not a rescue · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "The floor is a first claim on surplus already titled. Not a print. Not eligibility theater. Small on purpose.",
      },
    ],
  }),
});

function Claim() {
  return (
    <SiteChrome>
      <ClaimPage />
    </SiteChrome>
  );
}
