import { Link } from "@tanstack/react-router";

const RULES = [
  {
    n: "01",
    title: "A wide number is an answer",
    body: "Thin paper, a new class, an empty auction — the honest quote is a wide discount, a high listed charge, or few new units. Width is information. It is not a defect to be patched overnight.",
  },
  {
    n: "02",
    title: "No quiet club",
    body: "A small circle that still clears at a tight number while the board is empty is par by invitation. That club is a charter. Publish the width or do not trade.",
  },
  {
    n: "03",
    title: "No emergency print",
    body: "A gap in discounts is not a reason to mint. A thin seigniorage book is not a reason to open a second window. The floor still pays from surplus already titled.",
  },
  {
    n: "04",
    title: "No frozen official rate",
    body: "Holding last week's discount because this week's book is thin is par by another name. The live number can be ugly. An official number that ignores the book is a lie.",
  },
];

export function ThinPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Book</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Thin is a wide number. Not a club.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Fiat treats a gap in par clearing as an emergency and then discovers a facility. Here a thin book raises the posted
        prices and leaves the window open. The floor still runs. Residual still waits. Nobody prints to make the quote look
        tight.
      </p>
      <p className="mt-4 max-w-2xl text-muted">
        This is the same rule already named on{" "}
        <Link to="/hedge" className="text-fg underline decoration-border underline-offset-4">conversion</Link>,{" "}
        <Link to="/charge" className="text-fg underline decoration-border underline-offset-4">charge</Link>, and{" "}
        <Link to="/mint" className="text-fg underline decoration-border underline-offset-4">mint</Link>.
        This page is only the book when almost no one is in it.
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
          An agent that invents tightness. A treasury that allocates cheap units to the names that can still look like par.
          A charge waived “until the class is seasoned.” A discount frozen for payroll week.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        Next note: the floor is a first claim on surplus already titled.{" "}
        <Link to="/claim" className="text-fg underline decoration-border underline-offset-4">
          Read the claim
        </Link>
        {" · "}
        <Link to="/agent" className="text-fg underline decoration-border underline-offset-4">
          Duty
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
