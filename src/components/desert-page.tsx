import { Link } from "@tanstack/react-router";

const RULES = [
  {
    n: "01",
    title: "After, not instead",
    body: "Desert is what remains when the floor take and the listed prices have been paid. It is not a replacement for the basket. Profit that skips the floor is a private mint against survival.",
  },
  {
    n: "02",
    title: "Titled when earned",
    body: "Once the order is paid, the residual is named to the issuer on the tape. A later recall because the board “should have been higher” is confiscation. Change the next schedule. Do not reopen the last title.",
  },
  {
    n: "03",
    title: "Not a tail to socialize",
    body: "Fiat leaves surplus in private hands and then socializes the loss. Here the charge was taken when the paper was written. The remaining gain and the remaining loss stay with the name that wrote it.",
  },
  {
    n: "04",
    title: "Shown as a remainder",
    body: "The tape shows floor paid, charge paid, seigniorage paid if units were bought, then the residual. A profit that cannot show that order is not Desert. It is a story about leftover cash.",
  },
];

const LAYERS = [
  {
    n: "01",
    title: "Floor",
    body: "Senior. Always. Desert does not vote on whether the basket runs this period. A residual that exists only because the floor was skipped is void.",
  },
  {
    n: "02",
    title: "Mint",
    body: "Seigniorage paid is not profit stolen. Recalling units to flatten a residual is a print in reverse. The meter does not exist to level outcomes.",
  },
  {
    n: "03",
    title: "Issue",
    body: "The invoice and the hedge can produce a residual. They can also produce a recorded loss. Both stay with the issuer. Paper is not a claim on someone else’s Desert.",
  },
  {
    n: "04",
    title: "Tape",
    body: "Title of the remainder is a line. Transfer of that remainder is a line. A partnership side letter that reallocates Desert off the tape is a hidden mint of claims.",
  },
  {
    n: "05",
    title: "Agent",
    body: "The agent does not harvest residuals to “rebalance fairness.” It does not hide a loss so a name keeps a profit. It records the remainder as it stands.",
  },
  {
    n: "06",
    title: "Residual",
    body: "This page. After the floor and the listed risk charge, the rest is yours. Confiscating it does not make the books fair.",
  },
];

export function DesertPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Remainder</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">After the prices, the rest is yours.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Desert is not a slogan for greed and it is not a spare welfare budget. It is the titled remainder after the floor
        and the listed charges. Fiat taxes first, socializes the tail later, and calls the interval profit. Here the order
        is public and the remainder stays with the name that earned it.
      </p>
      <p className="mt-4 max-w-2xl text-muted">
        <Link to="/charge" className="text-fg underline decoration-border underline-offset-4">
          The charge
        </Link>{" "}
        and{" "}
        <Link to="/mint" className="text-fg underline decoration-border underline-offset-4">
          the mint
        </Link>{" "}
        are prices. This page is what those prices are not allowed to reach back and take.
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
          A residual that exists only because the floor was skipped. A charge raised after title to claw the remainder
          back. An agent that levels Desert across names and calls it fairness. A mint that recalls units because one
          book looks too fat.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          If the remainder is small, the honest result is a small remainder. It is not a quiet claim on the next name’s
          Desert, and it is not a print.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link to="/mint" className="text-fg underline decoration-border underline-offset-4">
          The meter
        </Link>
        {" · "}
        <Link to="/charge" className="text-fg underline decoration-border underline-offset-4">
          Listed charge
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
