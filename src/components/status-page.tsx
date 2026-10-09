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
        <h2 className="text-2xl text-fg">Contribution accounting</h2>
        <p className="mt-4">
          Optional gifts may be sent from an X wallet to the X wallet @trancesage. The site does not hold keys or take the transfer.
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs text-subtle">Public split</dt>
            <dd className="mt-1">Half floor / half development</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-subtle">Cadence</dt>
            <dd className="mt-1">Shown on this Status tape when gifts arrive</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-muted">
          The split is public. An unpublished accounting is not accounting. No quieter standard for the person who receives the gift.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Status tape — 9 October 2026 (update)</h2>
        <p className="mt-4 text-sm text-muted">Record of the ten recommended steps from the opening block. Each is a public line.</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>Done — Dated Status block published. Downloadable full report linked.</li>
          <li>Done — Notes stabilized as the single bound order. Chapters link out; desks implement the rule.</li>
          <li>Done — Worked invoice on Notes now shows all five tape lines explicitly.</li>
          <li>Done — Current basket figure ($1,470), named-surplus source, and on-the-clock schedule published on Floor.</li>
          <li>Done — Four agent duties listed as a public checklist. Agent never mints and never decides eligibility.</li>
          <li>Done — Public contribution split (half floor / half development) posted. Shown when gifts arrive.</li>
          <li>Done — Third Seat sitting checklist published (/third-seat): three numbers, five lines, write only when must be shown, HashPack for signature only.</li>
          <li>Done — Thin-book rule noted on Market: a thin book stays wide; inventing a tight price is a skipped line. Width is information.</li>
          <li>Done — Zero remainder and named-debt retirement clarified on Desert as public lines, not quiet adjustments.</li>
          <li>In force — Status remains the running public tape. An unpublished change is not a change.</li>
        </ol>
        <p className="mt-4 text-sm text-muted">
          No new mint. No quieter standard for any seat. Floor stays senior. Same rules bind state, firm, and person.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Full report</h2>
        <p className="mt-4">
          <a href="/status-2026-10-09.md" download className="underline">
            Download the full status report (Markdown, 9 October 2026)
          </a>
        </p>
        <p className="mt-4 text-sm text-muted">
          Includes the complete block, report under the block, ten next steps, and the continuation prompt.
          Voice of @trancesage. #LeGoMiEgo
        </p>
      </section>
    </PaperShell>
  );
}
