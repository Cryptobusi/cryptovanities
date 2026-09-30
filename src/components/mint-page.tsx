import { Link } from "@tanstack/react-router";

const RULES = [
  {
    n: "01",
    title: "One meter",
    body: "Basket units come from one schedule. A second schedule that looks like a facility is a second sovereign. The hedge does not print. The charge does not print.",
  },
  {
    n: "02",
    title: "Listed seigniorage",
    body: "The right to issue a new unit has a posted price. That price is public before the auction, not discovered in a press conference after the print.",
  },
  {
    n: "03",
    title: "No off-schedule actor",
    body: "Household, firm, and treasury buy the same window or they do not mint. A weekend toolkit is a confession that the schedule was optional.",
  },
  {
    n: "04",
    title: "Revocation is a line",
    body: "Units scheduled and not taken return to the schedule. Units issued in error are revoked on the tape. Silence is not a write-off.",
  },
];

const LAYERS = [
  {
    n: "01",
    title: "Floor",
    body: "New units do not arrive to rescue a missed basket. The floor is funded as a first claim on surplus already titled, not by stretching the meter.",
  },
  {
    n: "02",
    title: "Mint",
    body: "This page. Scarcity is the product. Seigniorage is the listed rent on that scarcity.",
  },
  {
    n: "03",
    title: "Issue",
    body: "Named paper is not a mint. It converts at a discount. Calling an invoice a unit is how par was smuggled in.",
  },
  {
    n: "04",
    title: "Tape",
    body: "Issued, scheduled, revoked. A unit that cannot show its origin is not a unit. A print that cannot show its price is not listed.",
  },
  {
    n: "05",
    title: "Agent",
    body: "The agent catches a double mint and refuses a settlement with no origin. It does not open a window because the book looks tight.",
  },
  {
    n: "06",
    title: "Residual",
    body: "Seigniorage paid is not profit stolen. What remains after the floor and the listed charges is Desert. Recalling units to flatten a residual is confiscation.",
  },
];

export function MintPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Meter</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">The mint is a price. Not a facility.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Fiat stretches the base when an office says the payments system requires it. The reaction is a mandate. The toolkit
        is explained after the fact. Here the only new units are the ones the schedule already named, sold at a listed
        seigniorage, written on the tape.
      </p>
      <p className="mt-4 max-w-2xl text-muted">
        <Link to="/charge" className="text-fg underline decoration-border underline-offset-4">
          The risk charge
        </Link>{" "}
        prices the writing of paper. This page prices the writing of units. Mixing them is how a shortfall becomes a print.
      </p>

      <ol className="mt-12 space-y-4">
        {RULES.map((row) => (
          <li key={row.n} className="rounded-lg border border-border bg-surface p-5">
            <p className="font-mono text-xs text-subtle">{row.n}</p>
            <h2 className="mt-2 font-display text-3xl">{row.title}</h2>
            <p className="mt-3 max-w-2xl text-muted">{row.body}</p>
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
          An emergency window is a second schedule. An agent that “covers” a failed hedge by minting is a second sovereign.
          A treasury that mints to pay its own floor contribution has charged the meter instead of the surplus.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          If the auction is thin, the honest result is a high listed price and few new units. It is not a quiet allocation
          to the names that can still clear at par.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link to="/charge" className="text-fg underline decoration-border underline-offset-4">
          Listed charge
        </Link>
        {" · "}
        <Link to="/hedge" className="text-fg underline decoration-border underline-offset-4">
          Conversion
        </Link>
        {" · "}
        <Link to="/stack" className="text-fg underline decoration-border underline-offset-4">
          Against fiat
        </Link>
        .
      </p>
    </div>
  );
}
