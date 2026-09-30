import { createFileRoute } from "@tanstack/react-router";
import { BoardPage } from "@/components/board-page";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/board")({
  component: Board,
  head: () => ({
    meta: [{ title: "The X board · Egonomic Anonymous" }],
  }),
});

function Board() {
  return (
    <SiteChrome>
      <BoardPage />
    </SiteChrome>
  );
}
