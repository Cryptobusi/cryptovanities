import { createFileRoute } from "@tanstack/react-router";
import { StatusPage } from "@/components/status-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/status")({
  component: Status,
  head: () => ({
    meta: [
      { title: "Status · Egonomic Anonymous" },
      {
        name: "description",
        content: "Dated status tape for Egonomic Anonymous. Floor first. If it cannot be shown, it is not policy.",
      },
    ],
  }),
});

function Status() {
  return (
    <SiteChrome>
      <StatusPage />
    </SiteChrome>
  );
}
