import { createFileRoute } from "@tanstack/react-router";
import { ShowPage } from "@/components/show-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/show")({
  component: Show,
  head: () => ({
    meta: [
      { title: "If it cannot be shown, it is not policy · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "The tape rule. Title, mint, lien, conversion, and agent act must be shown. The body file and the raw inbox stay off the public line.",
      },
    ],
  }),
});

function Show() {
  return (
    <SiteChrome>
      <ShowPage />
    </SiteChrome>
  );
}
