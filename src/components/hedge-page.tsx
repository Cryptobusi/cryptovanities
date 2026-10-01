import { Link } from "@tanstack/react-router";

const LAYERS = [
  {
    n: "01",
    title: "Floor",
    body: "The hedge does not buy survival. The basket is already funded as a first claim. A firm that cannot convert paper still owes the floor contribution. The worker is not the shock absorber.",
  },
  {
    n: "02",
    title: "Mint",
    body: "The hedge is not a second printer. A short book takes a recorded loss. The agent does not mint to cover it.",
  },
  {
    n: "03",
    title: "Issue",
    body: "Invoice and cover are two named instruments. Cover size is the posted ratio on a subscription book for that class.",
  },
  {
    n: "04",
    title: "Tape",
    body: "Receivable, live d, posted ratio, each line of the book, and the listed charge. Missing line, no checkout.",
  },
  {
    n: "05",
    title: "Agent",
    body: "Refuse a ratio with no Funds on the tape. Record a failed line as a loss. Do not print.",
  },
  {
    n: "06",
    title: "Residual",
    body: "Charge is taken before Desert is titled. A pretty ratio that hides the charge is confiscation in reverse.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Write the receivable",
    body: "Face is paper. Due date on the tape.",
  },
  {
    n: "02",
    title: "Read live d",
    body: "Conversion = face × (1 − d). No par club.",
  },
  {
    n: "03",
    title: "Read the class book",
    body: "Default cover is a subscription book for that class. Several named lines. Posted Funds. Posted ratio. Not a private letter and not a volatility worksheet.",
  },
  {
    n: "04",
    title: "Pay the listed charge",
    body: "Taken when written. Senior only to Desert. Junior to the floor.",
  },
  {
    n: "05",
    title: "Settle",
    body: "Among live books with Funds still posted, take the quote that leaves the holder better after the charge. That is most favorable. Not last week's official rate.",
  },
];

export function HedgePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Checkout</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Paper is not cash at the register.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Highest stable ratio is not the biggest number. It is the cover a book will still honor after a shock, with Funds
        on the tape and no mint behind it.
      </p>

      <section id="chosen" className="mt-12 rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-3xl">Chosen cover</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Subscription class book. Lloyd's-shaped lines on a mutual-shaped class: several named stamps share one invoice
          class, each with posted Funds, a modest posted ratio, and a listed charge. Members of a line can be called if
          that line is short. The floor cannot be called. The mint cannot refill the book.
        </p>
        <p className="mt-4 max-w-2xl font-mono text-sm text-fg">
          Desk default ratio for known 30-day mill paper: 0.60. Thin new class: no book, haircut only.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          Why not 1.00: that is par. Why not a lone mutual: one harvest hits every member at once. Why not a lone Name:
          one failure kills the post. Why not h* from a spreadsheet: the register does not run a regression. Lines plus a
          posted 0.60 survive a bad year better than a smiling 0.95 that vanishes.
        </p>
      </section>

      <ol id="steps" className="mt-12 scroll-mt-24 space-y-4">
        {STEPS.map((step) => (
          <li key={step.n} className="rounded-lg border border-border bg-surface p-5">
            <p className="font-mono text-xs text-subtle">{step.n}</p>
            <h2 className="mt-2 font-display text-3xl">{step.title}</h2>
            <p className="mt-3 max-w-2xl text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-14">
        <h2 className="font-display text-3xl">Options reviewed</h2>
        <ol className="mt-6 space-y-3 text-sm text-muted">
          <li><span className="text-fg">Haircut only.</span> Most honest when no book will post. Ratio = 0. Stable. No cover.</li>
          <li><span className="text-fg">Bilateral put.</span> Fine for one name. Dies with that name.</li>
          <li><span className="text-fg">Computed h*.</span> Highest on a calm sample. Unusable at the register.</li>
          <li><span className="text-fg">Single mutual.</span> Good calls. Bad correlation. Supplement lands on the same class that just failed.</li>
          <li><span className="text-fg">Subscription class book.</span> Chosen. Split lines, posted Funds, ratio capped at what a call can defend. Default 0.60 on known mill paper.</li>
        </ol>
      </section>

      <section id="insurance" className="mt-14 rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-3xl">Still optional</h2>
        <p className="mt-4 max-w-2xl text-muted">
          A bilateral hedge or haircut-only checkout remains valid. Collective insurance remains a way to stand behind a
          line. None of them get a mint window. Register = conversion + book payout − listed charge. Floor stays outside.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">Across the layers</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {LAYERS.map((row) => (
            <li key={row.n} className="rounded-lg border border-border bg-bg p-5">
              <p className="font-mono text-xs text-subtle">{row.n}</p>
              <h3 className="mt-2 font-display text-2xl">{row.title}</h3>
              <p className="mt-3 text-sm text-muted">{row.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-10 text-sm text-muted">
        Walk it on <Link to="/enter" className="text-fg underline decoration-border underline-offset-4">Enter</Link>
        {" · "}
        <Link to="/charge" className="text-fg underline decoration-border underline-offset-4">Charge</Link>
        {" · "}
        <Link to="/show" className="text-fg underline decoration-border underline-offset-4">Tape</Link>.
      </p>
    </div>
  );
}
