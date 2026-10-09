import { Link } from "@tanstack/react-router";

const DUTIES = [
  {
    n: "01",
    title: "Pay the floor on the clock",
    body: "The disbursement runs when the schedule says. The agent does not choose who deserves the basket this period.",
  },
  {
    n: "02",
    title: "Flag a side price",
    body: "A discount or a charge that only works in a side book is marked. The mark is a line. It is not a quiet call to the issuer.",
  },
  {
    n: "03",
    title: "Refuse a second print",
    body: "Two prints of the same unit, one tape. The second fails in public. The agent does not open a second window to make the books match.",
  },
  {
    n: "04",
    title: "Refuse a settlement with no provenance",
    body: "No receivable, no hedge, no charge, no conversion — no checkout. The refusal is itself a line.",
  },
];

const RULES = [
  {
    n: "01",
    title: "Does not mint",
    body: "A failed hedge is a recorded loss. Covering it with new units is a second sovereign. The agent has no window.",
  },
  {
    n: "02",
    title: "Does not set the basket or decide eligibility",
    body: "The floor is a posted claim, not a mood. An agent that reallocates the basket to ‘those who need it more’ has left the duty.",
  },
  {
    n: "03",
    title: "Does not vote unsupervised",
    body: "Each act names who authorized it, which rule, which clock, and whether a person signed. Silence is not consent.",
  },
  {
    n: "04",
    title: "Does not harvest Desert",
    body: "Leveling residuals across names is not fairness. It is an unpublished tax. The agent records the remainder. It does not redistribute it.",
  },
];

export function AgentPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Duty</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Software does not get a quieter standard.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Fiat gives offices discretion and audits them later. In a crisis the office can rewrite the mint. Here an agent is
        a clerk of the posted rules. It pays the floor, flags a price that leaves the book, and refuses a second print.
        It does not become a second sovereign.
      </p>
      <p className="mt-4 max-w-2xl text-muted">
        Sealroom is a person notarizing their own acts. An agent does a public duty beside them, under the same clock.{" "}
        <Link to="/demo" className="text-fg underline decoration-border underline-offset-4">
          Open the demo
        </Link>
        .
      </p>

      <section className="mt-12">
        <h2 className="font-display text-3xl">The four duties — public checklist</h2>
        <p className="mt-2 text-sm text-muted">An agent never mints and never decides eligibility.</p>
        <ol className="mt-6 space-y-4">
          {DUTIES.map((row) => (
            <li key={row.n} className="rounded-lg border border-border bg-surface p-5">
              <p className="font-mono text-xs text-subtle">{row.n}</p>
              <h3 className="mt-2 font-display text-3xl">{row.title}</h3>
              <p className="mt-3 max-w-2xl text-muted">{row.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">The limit</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {RULES.map((row) => (
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
          An agent that deanonymizes a witness to “help the tape.” An agent that waives a charge to save a name. An agent
          that invents a surcharge to punish one. An agent whose refusal is unpublished.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          False flags stay on the record. Missed double mints stay. The next agent is scored against that tape. A clean
          memory is not a virtue here.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        Next notes:{" "}
        <Link to="/thin" className="text-fg underline decoration-border underline-offset-4">
          thin books
        </Link>
        {" · "}
        <Link to="/claim" className="text-fg underline decoration-border underline-offset-4">
          the floor claim
        </Link>
        {" · "}
        <Link to="/desert" className="text-fg underline decoration-border underline-offset-4">
          Desert
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
