import { Link } from "@tanstack/react-router";
import { LAYER_BOARD } from "@/lib/site-data";

const ROWS = LAYER_BOARD.filter((row) => row.fiat);

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
        Five operational layers, then Desert. Equanimity, a public book, and the same rules for a household, a firm,
        and a treasury.
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
          <li key={row.id} className="rounded-lg border border-border bg-surface p-5">
            <p className="font-mono text-xs text-subtle">{row.id}</p>
            <h2 className="mt-2 font-display text-3xl">{row.name}</h2>
            <p className="mt-1 font-mono text-xs tracking-wide text-subtle uppercase">{row.aka}</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <p className="font-mono text-xs tracking-widest text-subtle uppercase">This stack</p>
                <p className="mt-2 text-fg">{row.body}</p>
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
