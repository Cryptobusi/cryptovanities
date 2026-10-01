import { createFileRoute } from "@tanstack/react-router";
import { AgentPage } from "@/components/agent-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/agent")({
  component: Agent,
  head: () => ({
    meta: [
      { title: "Software does not get a quieter standard · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "Agents pay the floor, flag an off-tape price, and refuse a second print. They do not mint, set the basket, or vote unsupervised.",
      },
    ],
  }),
});

function Agent() {
  return (
    <SiteChrome>
      <AgentPage />
    </SiteChrome>
  );
}
