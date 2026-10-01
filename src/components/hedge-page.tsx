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
    body: "The hedge is not a second printer. It locks a conversion into basket units already issued or already scheduled. If the auction is the only way new units exist, the hedge prices that auction. It does not skip it.",
  },
  {
    n: "03",
    title: "Issue",
    body: "An invoice, a bond, an escrow, an option — named paper on the same rail. At checkout that paper takes a market discount into basket units. The hedge is a second named instrument sized by a posted ratio, not by a private regression.",
  },
  {
    n: "04",
    title: "Tape",
    body: "The receivable, the live discount, the posted ratio, the hedge, and the risk charge are on the ticket. If any line cannot be shown, checkout refuses. A private side letter is not a hedge. It is a story.",
  },
  {
    n: "05",
    title: "Agent",
    body: "The agent watches the conversion, not the firm's luck. It flags a discount that only works off the tape. A failed insured ratio is a recorded loss for the collective that posted it. The agent does not mint to cover it.",
  },
  {
    n: "06",
    title: "Residual",
    body: "The listed risk charge is taken before profit is titled. What remains after the floor take and that charge is Desert. A hedge that hides the charge is confiscation in reverse.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Write the receivable",
    body: "A firm issues an invoice on the rail. Face value is a number in paper, not in basket units. The due date is on the tape.",
  },
  {
    n: "02",
    title: "Read the live discount",
    body: "Checkout already publishes a conversion of that class of paper into basket units. Thin paper pays more. Known paper pays less. There is no par club.",
  },
  {
    n: "03",
    title: "Read the posted ratio",
    body: "Hedgers and risk-assessor collectives post a prevailing ratio for that class. They may insure it. The number sits on the calculation. Nobody at the register runs a volatility formula.",
  },
  {
    n: "04",
    title: "Pay the risk charge",
    body: "The charge is listed for that instrument class. It is taken when the hedge is written, not after a failure. The floor contribution is senior to both.",
  },
  {
    n: "05",
    title: "Settle at checkout",
    body: "Among posted quotes for that class on that day, checkout takes the most favorable after the listed charge. If the quote was insured, that collective pays the advertised gap. Face was never cash.",
  },
];

export function HedgePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Checkout</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Paper is not cash at the register.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Named credit may be issued by anyone. It does not clear at legal-tender par. Checkout converts it into basket
        units at a live discount. Cover size is a posted ratio. Collective insurance is one way to stand behind that
        ratio. It is not the only way, and it is not required for checkout to exist.
      </p>

      <ol id="steps" className="mt-12 scroll-mt-24 space-y-4">
        {STEPS.map((step) => (
          <li key={step.n} className="rounded-lg border border-border bg-surface p-5">
            <p className="font-mono text-xs text-subtle">{step.n}</p>
            <h2 className="mt-2 font-display text-3xl">{step.title}</h2>
            <p className="mt-3 max-w-2xl text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <section id="insurance" className="mt-14 rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-3xl">Collective insurance — an alternative</h2>
        <p className="mt-4 max-w-2xl text-muted">
          A named pool of hedgers and assessors posts a ratio and posts units (or paper that itself discounts) against
          the gap they advertised. Checkout can take that quote. It can also take a bilateral hedge with no pool. Both
          must show on the tape. Neither may mint.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          How realistic: same shape as a mutual, a P&I club, or a trade-credit insurer — people who know a class put
          capital behind a published number. It works when the class is written often enough that losses average, and
          when the pool cannot refill from the mint. It fails when one name is the whole book, when the pool is a front
          for treasury, or when "insured" means a promise with no posted units.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl">For</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>No volatility homework at the register.</li>
              <li>Ratio and charge sit on the same ticket.</li>
              <li>Loss lands on the names who posted, not on the floor and not on a silent mint.</li>
              <li>Thin class can simply refuse to insure — the haircut stays honest.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl">Against</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>A pool that never takes a loss is a club, not insurance.</li>
              <li>"Most favorable" without posted capital is a beauty contest.</li>
              <li>Correlation: one bad harvest can hit every mill invoice at once.</li>
              <li>Assessors who also issue the paper have a conflict the tape must show.</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 max-w-2xl font-mono text-sm text-fg">
          Optional. Checkout still runs with a bilateral hedge, or with haircut only.
        </p>
      </section>

      <section className="mt-14 rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-3xl">Posted ratio</h2>
        <p className="mt-4 max-w-2xl text-muted">
          One number per class on the ticket next to face and live d. Most favorable at checkout means the best live
          quote after the listed charge, among posts that still have capital on the tape. Not a private letter. Not last
          week's official rate.
        </p>
        <p className="mt-4 max-w-2xl font-mono text-sm text-fg">
          Register = conversion + payout − listed charge. Floor stays senior and outside the invoice.
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

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">What must not happen</h2>
        <p className="mt-4 max-w-2xl text-muted">
          A frozen discount is par. A ratio only the treasury can post is a charter. An agent that covers a failed pool
          by minting is a second sovereign. Insurance with no posted units is a story.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        Walk it on <Link to="/enter" className="text-fg underline decoration-border underline-offset-4">Enter</Link>
        {" · "}
        <Link to="/show" className="text-fg underline decoration-border underline-offset-4">Tape</Link>
        {" · "}
        <Link to="/charge" className="text-fg underline decoration-border underline-offset-4">Charge</Link>.
      </p>
    </div>
  );
}
