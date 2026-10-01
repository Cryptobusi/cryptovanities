import { Link } from "@tanstack/react-router";

const RULES = [
  {
    n: "01",
    title: "Senior to paper",
    body: "The basket and the small income come out of surplus already titled, before the risk charge and before Desert. An invoice that cannot convert does not pause the floor.",
  },
  {
    n: "02",
    title: "Not a print",
    body: "New units do not arrive to rescue a missed period. Funding the floor by stretching the meter is an unfunded mandate with a nicer name.",
  },
  {
    n: "03",
    title: "Not eligibility theater",
    body: "Fiat welfare waits on a caseworker and a fiscal fight. Here the claim is posted and the agent pays it on the clock. The agent does not choose who deserves it this week.",
  },
  {
    n: "04",
    title: "Small on purpose",
    body: "A small basket and a small income. Survival leaves the wage bargain. Ambition stays private and sits on top of the floor, not in place of it.",
  },
];

export function ClaimPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Senior</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">The floor is a claim. Not a rescue.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Survival is not priced at the door. The basket is funded first, in the open, from surplus the tape can already
        show. That is why a thin invoice book does not get to draft the worker, and why a fat residual does not get to
        skip the take.
      </p>
      <p className="mt-4 max-w-2xl text-muted">
        The working form stays the same.{" "}
        <Link to="/floor" hash="desk" className="text-fg underline decoration-border underline-offset-4">
          Reserve the floor, write the tape, then issue
        </Link>
        . This page is only why that order is senior.
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

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">What must not happen</h2>
        <p className="mt-4 max-w-2xl text-muted">
          A floor paid by minting. A floor delayed so a vendor can clear at a friendlier discount. A floor that grows
          itself without a listed vote on the next schedule. A residual titled before the take.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          If surplus this period cannot carry a larger basket, the honest result is the posted small basket. It is not a
          silent print, and it is not a caseworker.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link to="/thin" className="text-fg underline decoration-border underline-offset-4">
          Thin books
        </Link>
        {" · "}
        <Link to="/floor" hash="desk" className="text-fg underline decoration-border underline-offset-4">
          The desk
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
