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
    body: "An invoice, a bond, an escrow, an option — named paper on the same rail. At checkout that paper takes a market discount into basket units. The hedge is a second named instrument: a forward, a put, or an escrowed pile of units that pays the difference when the discount moves.",
  },
  {
    n: "04",
    title: "Tape",
    body: "The receivable, the hedge, the risk charge, and the conversion are four lines. If any line cannot be shown, checkout refuses. A private side letter is not a hedge. It is a story.",
  },
  {
    n: "05",
    title: "Agent",
    body: "The agent watches the conversion, not the firm’s luck. It flags a discount that only works off the tape. It refuses a settlement with no provenance. A failed hedge is a recorded loss. The agent does not mint to cover it.",
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
    title: "Lock the conversion",
    body: "The firm buys or writes a hedge that settles in basket units on the due date. The counterparty posts units or posts other paper that itself discounts in public. Both sides are named.",
  },
  {
    n: "04",
    title: "Pay the risk charge",
    body: "The charge is listed for that instrument class. It is taken when the hedge is written, not after a failure. The floor contribution is senior to both.",
  },
  {
    n: "05",
    title: "Settle at checkout",
    body: "On the day, the invoice converts at the live discount. The hedge pays or takes the gap. The register sees basket units. Nobody is asked to pretend the invoice was cash.",
  },
];

export function HedgePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Checkout</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Paper is not cash at the register.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Named credit may be issued by anyone. It does not clear at legal-tender par. Checkout converts it into basket
        units at a live discount. A hedge is how a payroll or an inventory still closes when that discount moves.
      </p>
      <p className="mt-4 max-w-2xl text-muted">
        Fiat hides this inside par deposits and then socializes the gap. Here the gap is priced in public, written on the
        tape, and charged before residual title.{" "}
        <Link to="/stack" className="text-fg underline decoration-border underline-offset-4">
          The stack contrast
        </Link>{" "}
        is the rule. This page is the conversion.
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
          A frozen discount is par by another name. A hedge that only the treasury can write is a charter. An agent that
          covers a failed hedge by minting is a second sovereign. A conversion that cannot be shown is not checkout.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          If the market for discounts is thin, the honest result is a wide haircut, not a quiet club. The floor still
          pays. The residual still waits.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link to="/floor" hash="desk" className="text-fg underline decoration-border underline-offset-4">
          The working form
        </Link>
        {" · "}
        <Link to="/stack" className="text-fg underline decoration-border underline-offset-4">
          Against fiat
        </Link>
        {" · "}
        <a href="/#thesis" className="text-fg underline decoration-border underline-offset-4">
          Thesis
        </a>
        .
      </p>
    </div>
  );
}
