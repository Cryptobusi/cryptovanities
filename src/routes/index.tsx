import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: "Egonomic Anonymous" }],
  }),
});

function Home() {
  return (
    <SiteChrome>
      <HomePage />
    </SiteChrome>
  );
}
