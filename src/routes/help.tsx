import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/components/help-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/help")({
  component: Help,
  head: () => ({
    meta: [
      { title: "Help · Egonomic Anonymous" },
      {
        name: "description",
        content: "Index, instructions, and explanations for the floor, the basket, the UNIT mint, the tape, and the market.",
      },
    ],
  }),
});

function Help() {
  return (
    <SiteChrome>
      <HelpPage />
    </SiteChrome>
  );
}
