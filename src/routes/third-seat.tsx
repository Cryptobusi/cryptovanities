import { createFileRoute } from "@tanstack/react-router";
import { ThirdSeatPage } from "@/components/third-seat-page";

export const Route = createFileRoute("/third-seat")({
  component: ThirdSeatPage,
  head: () => ({
    meta: [{ title: "Third Seat — Egonomic Anonymous" }],
  }),
});
