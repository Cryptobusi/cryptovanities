import { createFileRoute } from "@tanstack/react-router";
import { NotesPage } from "@/components/notes-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/notes")({
  component: Notes,
  head: () => ({
    meta: [
      { title: "Thesis notes · Egonomic Anonymous" },
      {
        name: "description",
        content:
          "Complete thesis of the Equitable Economic Stack. Index, notes, and a download request that opens a message to @trancesage.",
      },
    ],
  }),
});

function Notes() {
  return (
    <SiteChrome>
      <NotesPage />
    </SiteChrome>
  );
}
