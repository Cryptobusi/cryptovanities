import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/catalog-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/catalog")({
  component: Catalog,
  head: () => ({
    meta: [
      { title: "Catalog · Egonomic Anonymous" },
      {
        name: "description",
        content: "BUI catalog draws listed hedge bands. Luxury lets the buyer choose the line.",
      },
    ],
  }),
});

function Catalog() {
  return (
    <SiteChrome>
      <CatalogPage />
    </SiteChrome>
  );
}
