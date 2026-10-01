import { Link } from "@tanstack/react-router";
import { PaperShell } from "@/components/paper-shell";

export function HedgePage() {
  return (
    <PaperShell
      folio="III. Checkout"
      title="Paper is not cash at the register."
      abstract="Short-term cost stability is a window lock: this write's ratio and charge stay put until the due date. That is the minimum change. The rest of the protocol stays as titled. Read this note on the published domain if an in-chat preview host is down."
    >
      <section id="window">
        <h2 className="text-2xl text-fg">3.1 Window lock</h2>
        <p className="mt-4">
          At write, the class book posts 0.60 on known mill paper and the listed charge for this window only. Payroll for
          that due date can be counted. Next window may requote. Live d still moves at checkout; the book, not the mint,
          pays up to the locked ratio.
        </p>
        <p className="mt-4 font-sans text-sm text-fg">
          Near-term cost = conversion at live d + book up to 0.60 − charge locked at write.
        </p>
        <p className="mt-4">
          A Desert sliver is not used for ordinary weeks. It covers only the tail above 0.60 after Funds are empty, from
          Desert already titled, cap 25% of last titled sliver. Empty sliver is issuer loss. The floor is never the
          backstop.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">3.2 Procedure</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5">
          <li>Write the receivable. Face is paper. Due date on the tape.</li>
          <li>Read live d. Conversion = face × (1 − d). No par club.</li>
          <li>Lock this window. Ratio and charge are listed at write.</li>
          <li>Pay the listed charge once. No second protocol fee.</li>
          <li>Settle at live d. Book pays up to the locked ratio. Tail only if a Desert sliver was already posted.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl text-fg">3.3 What was not built</h2>
        <p className="mt-4">
          No new layer, no second sovereign, no frozen d, no compulsory Desert tithe, no spreadsheet h*. Subscription
          book remains the chosen cover. Floor and mint do not move.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">3.4 Layers</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5">
          <li>Floor — senior. Not a stability tool for invoices.</li>
          <li>Mint — listed window only. No refill for a short book.</li>
          <li>Issue — invoice plus optional class-book cover. Thin class: haircut only.</li>
          <li>Tape — receivable, live d, window ratio, window charge, each book line.</li>
          <li>Agent — lock the window at write. Refuse a ratio with no Funds.</li>
          <li>Residual — ordinary stability does not spend Desert.</li>
        </ol>
      </section>

      <p className="font-sans text-sm">
        Desk: <Link to="/enter" className="text-fg underline underline-offset-4">Enter</Link>
        {" · "}
        <Link to="/catalog" className="text-fg underline underline-offset-4">Catalog</Link>
        {" · "}
        <Link to="/notes" className="text-fg underline underline-offset-4">Notes</Link>.
      </p>
    </PaperShell>
  );
}
