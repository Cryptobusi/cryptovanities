import { createFileRoute } from "@tanstack/react-router";
import { StackPage } from "@/components/stack-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/stack")({
  component: Stack,
  head: () => ({
    meta: [
      { title: "Same rules. Not the same mint. · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "The stack against fiat. A senior floor, a public mint, named credit that does not clear at par, and a tape that makes unpublished acts non-policy.",
      },
    ],
  }),
});

function Stack() {
  return (
    <SiteChrome>
      <StackPage />
    </SiteChrome>
  );
}
