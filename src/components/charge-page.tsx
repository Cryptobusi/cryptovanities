import { Link } from "@tanstack/react-router";

const RULES = [
  {
    n: "01",
    title: "Listed first",
    body: "The charge for a class of paper is posted before anyone writes that paper. A fee invented after a miss is a fine. A fine is not this page.",
  },
  {
    n: "02",
    title: "Taken when written",
    body: "The charge is paid when the hedge or the invoice is signed onto the rail. It is not collected from the wreck. The floor take is senior even to this.",
  },
  {
    n: "03",
    title: "By class, not by friend",
    body: "Same tenor, same collateral, same tape quality — same schedule. A private rebate is a second mint. A treasury exemption is a charter.",
  },
  {
    n: "04",
    title: "Visible at checkout",
    body: "The conversion quote names the discount and the charge as two numbers. Rolling them into one rate is how fiat hid the privilege of par.",
  },
];

const LAYERS = [
  {
    n: "01",
    title: "Floor",
    body: "The charge does not fund survival by accident. The floor is a first claim on surplus. If the book cannot pay both, the charge waits. The worker does not.",
  },
  {
    n: "02",
    title: "Mint",
    body: "Seigniorage is its own listed price. The risk charge is not a license to print. Using a charge shortfall as a reason to mint is the weekend toolkit.",
  },
  {
    n: "03",
    title: "Issue",
    body: "Named paper carries the charge of its class. Household, firm, and treasury read the same board. Paper that cannot pay the charge does not issue.",
  },
  {
    n: "04",
    title: "Tape",
    body: "The posted schedule, the payment, and any later change of class are lines. A schedule that lives in a circular is not listed.",
  },
  {
    n: "05",
    title: "Agent",
    body: "The agent applies the posted class. It does not invent a surcharge to punish a name. It does not waive a charge to save a name.",
  },
  {
    n: "06",
    title: "Residual",
    body: "After the floor and this charge, the rest is titled to the issuer. That is Desert. Recalling it because the charge was set too low is confiscation.",
  },
];

export function ChargePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Price</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">The charge is listed. Then you issue.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Discount is the market’s haircut of paper into basket units. The risk charge is the posted price of writing that
        paper at all. Fiat folded both into interest and then socialized the tail. Here they stay two numbers, both on
        the tape, both taken before residual title.
      </p>
      <p className="mt-4 max-w-2xl text-muted">
        <Link to="/hedge" hash="steps" className="text-fg underline decoration-border underline-offset-4">
          Checkout
        </Link>{" "}
        already converts at a live discount. This page is the fee that sits beside that conversion — not inside it.
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
          A charge that moves after the signature is a trap. A charge that only some names pay is a charter. A charge
          swept into the mint is seigniorage in costume. A charge hidden inside the discount is par by another route.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          If the class is new, the honest board is a wide posted charge, not a quiet waiver until the book looks safe.
          Thin markets raise the number. They do not close the window and print.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link to="/show" className="text-fg underline decoration-border underline-offset-4">
          What the tape shows
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
