import { PaperShell } from "@/components/paper-shell";

export function StatusPage() {
  return (
    <PaperShell
      folio="Status"
      title="Site Status — 9 October 2026"
      abstract="Beta (#LeGoMiEgo). Public bookkeeping and visibility rules. The person is the third seat."
    >
      <section>
        <h2 className="text-2xl text-fg">Central thesis</h2>
        <blockquote className="mt-4 border-l-2 border-border pl-4">
          <p>“They printed the money. I am keeping the book.”</p>
          <p>Same rails. Anyone may issue. No one may hide the print.</p>
          <p>If it cannot be shown, it is not policy.</p>
          <p>Sovereignty is the refusal.</p>
        </blockquote>
      </section>

      <section>
        <h2 className="text-2xl text-fg">The three seats</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li><strong>First seat (State)</strong>: Can tax and expand the base. Must follow a posted minting schedule.</li>
          <li><strong>Second seat (Firm)</strong>: Can issue credit. Losses stay on the book. Paper does not clear at par.</li>
          <li><strong>Third seat (Person)</strong>: Reads the tape, pays the basket first, refuses a skipped line. Same rules.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl text-fg">The order</h2>
        <p className="mt-4 font-mono">Floor → Mint → Issue → Tape → Charge → Agent → Thin → Desert</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li><strong>Floor</strong> — Basket paid first from named surplus (~$1,470 example).</li>
          <li><strong>Mint</strong> — Public schedule only. No private window.</li>
          <li><strong>Issue</strong> — Named credit. Not cash at the register.</li>
          <li><strong>Tape</strong> — Title, mint, lien, conversion, agent act must be shown.</li>
          <li><strong>Charge</strong> — Discount and risk named before residual.</li>
          <li><strong>Agent</strong> — Clerk of the rules. Does not mint.</li>
          <li><strong>Thin</strong> — Width is information. No invented tight price.</li>
          <li><strong>Desert</strong> — Remainder titled, including zero.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl text-fg">What is live</h2>
        <p className="mt-4">
          Interactive browser models (Floor desk, Market, Enter, Catalog, Sealroom). Notes, Third Seat, whitepaper, refusal.
          No custody. Writes ~$0.001 on Hedera when a line must be shown. Reading is free.
        </p>
        <p className="mt-4">
          Recent posts continue the same language. No new mint. No quieter standard.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Recommended next steps</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>Publish this dated block on the Status tape.</li>
          <li>Stabilize Notes as the single bound order; link desks back to chapters.</li>
          <li>Post one fully worked public invoice example with all five tape lines.</li>
          <li>Publish the current basket figure and its funding source.</li>
          <li>List the four agent duties as a public checklist.</li>
          <li>Post the gift split (floor / development) on a cadence if gifts arrive.</li>
          <li>Expand the Third Seat sitting checklist.</li>
          <li>Note on Market that a thin book stays wide.</li>
          <li>Clarify zero remainder and named-debt retirement.</li>
          <li>Keep Status as a running public tape. An unpublished change is not a change.</li>
        </ol>
      </section>

      <section>
        <p className="mt-6 text-sm text-muted">
          Full report available in the working book and notes. Voice of @trancesage. #LeGoMiEgo
        </p>
      </section>
    </PaperShell>
  );
}
