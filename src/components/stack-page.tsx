import { Link } from "@tanstack/react-router";

const ROWS = [
  {
    n: "01",
    title: "Floor",
    stack: "A small basket and a small income come first. Survival is not priced at the door.",
    fiat: "Welfare is residual. It waits on eligibility, a fiscal fight, and a caseworker.",
  },
  {
    n: "02",
    title: "Mint",
    stack: "One scarce meter. Seigniorage is a listed price. No actor, including the state, prints off the schedule.",
    fiat: "The base stretches when a facility says so. The reaction is a mandate. The weekend toolkit is discovered in public after the fact.",
  },
  {
    n: "03",
    title: "Issue",
    stack: "Household, firm, and treasury issue named credit on the same rail. That paper is not money at par. Checkout converts it at a market discount.",
    fiat: "Licensed banks create deposits that clear at par with legal tender. Other paper is credit until a backstop makes it look like cash.",
  },
  {
    n: "04",
    title: "Tape",
    stack: "Title, mint, lien, agent act, revocation. If it cannot be shown, it is not policy.",
    fiat: "Bank books, land registries, courts, and statistics. A valid act can still be unpublished.",
  },
  {
    n: "05",
    title: "Agent",
    stack: "Software pays the floor, flags a price that leaves the book, and refuses a second print. It does not mint. It does not vote unsupervised.",
    fiat: "Offices with discretion. Audit is periodic. In a crisis the office can rewrite the mint.",
  },
  {
    n: "06",
    title: "Residual",
    stack: "After the floor and the listed risk charge, the rest is yours. That is profit.",
    fiat: "After-tax surplus, then occasional socialization of the tail. The charge arrives late.",
  },
];

export function StackPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Against fiat</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Same rules. Not the same mint.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Fiat already has a floor, a mint, credit, records, and agents. The difference is the bundle. Here the floor is
        senior, the mint is public, private paper does not clear at par, and an unpublished act is not policy.
      </p>
      <p className="mt-4 max-w-2xl text-muted">
        The working form stays the same.{" "}
        <Link to="/floor" hash="desk" className="text-fg underline decoration-border underline-offset-4">
          Reserve the floor, write the tape, then issue
        </Link>
        . This page is only the contrast.
      </p>

      <ol className="mt-12 space-y-4">
        {ROWS.map((row) => (
          <li key={row.n} className="rounded-lg border border-border bg-surface p-5">
            <p className="font-mono text-xs text-subtle">{row.n}</p>
            <h2 className="mt-2 font-display text-3xl">{row.title}</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <p className="font-mono text-xs tracking-widest text-subtle uppercase">This stack</p>
                <p className="mt-2 text-fg">{row.stack}</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest text-subtle uppercase">Fiat</p>
                <p className="mt-2 text-muted">{row.fiat}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">What that buys. What it costs.</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Rule symmetry. The treasury uses the same mint and the same tape as a household. Credit is marked as credit at
          checkout. Survival leaves the wage bargain.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          Fiat still clears ordinary payments at par. A discretionary mint can keep a payments system alive when discounts
          would otherwise gap to nothing. A single public tape needs a privacy rule this page does not write.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          The stack stands together. A hard mint without discounted paper starves trade. Discounted paper without a tape
          hides leverage. Agents with a mint become a second sovereign. A floor without a first claim on surplus is another
          unfunded mandate.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        Checkout hedging — how an invoice becomes basket units without pretending it is cash.{" "}
        <Link to="/hedge" className="text-fg underline decoration-border underline-offset-4">
          Read the conversion
        </Link>
        {" · "}
        <a href="/#thesis" className="text-fg underline decoration-border underline-offset-4">
          Back to the thesis
        </a>
        .
      </p>
    </div>
  );
}
