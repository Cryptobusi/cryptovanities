import { createFileRoute } from "@tanstack/react-router";
import { ThinPage } from "@/components/thin-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/thin")({
  component: Thin,
  head: () => ({
    meta: [
      { title: "Thin is a wide number. Not a club · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "When the book is thin the honest quote is wide. No quiet club, no emergency print, no frozen official rate.",
      },
    ],
  }),
});

function Thin() {
  return (
    <SiteChrome>
      <ThinPage />
    </SiteChrome>
  );
}
