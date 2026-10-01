import { createFileRoute } from "@tanstack/react-router";
import { EnterPage } from "@/components/enter-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/enter")({
  component: Enter,
  head: () => ({
    meta: [
      { title: "Enter the desk · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "A working program for witness, household, firm, treasury, and agent to enter the stack. Same rails. No hidden print.",
      },
    ],
  }),
});

function Enter() {
  return (
    <SiteChrome>
      <EnterPage />
    </SiteChrome>
  );
}
