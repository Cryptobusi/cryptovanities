import { Link } from "@tanstack/react-router";
import { PaperShell } from "@/components/paper-shell";

export function ThirdSeatPage() {
  return (
    <PaperShell
      folio="Third Seat"
      title="Start with nothing, or with an existing room."
      abstract="The person is the third seat. Same rules. Read the tape. Pay the basket first. Refuse a skipped line."
    >
      <section>
        <h2 className="text-2xl text-fg">Sitting checklist</h2>
        <ol className="mt-6 list-decimal space-y-4 pl-5">
          <li>
            <strong>Post three numbers.</strong> Basket, fee, remainder. The floor is senior. The fee is the listed price of the write. The remainder is what is left after both.
          </li>
          <li>
            <strong>Keep the tape to five lines.</strong> Title, mint, lien, conversion, agent act. Private life stays off. If it cannot be shown, it is not policy.
          </li>
          <li>
            <strong>Write on-chain only when a line must be shown.</strong> Most work stays in the browser. A write is about $0.001 in $Trust. Reading is free. An unpublished act is a story.
          </li>
          <li>
            <strong>Use HashPack for signature only.</strong> The keys stay with the account. The site does not hold them. The agent does not mint and does not decide eligibility.
          </li>
        </ol>
        <p className="mt-6 text-sm text-muted">
          Start with an existing room that already collects dues if you have one. Post the three numbers, keep the tape limited, and write only when a line must be shown. Sovereignty is the refusal.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Bound order</h2>
        <p className="mt-4">
          The single source is <Link to="/notes" className="underline">Notes</Link>. Desks model the steps; they do not rewrite the order.
        </p>
      </section>
    </PaperShell>
  );
}
