import { Link } from "@tanstack/react-router";

const PARTIES = [
  {
    id: "witness",
    title: "Witness",
    fee: "Free",
    first: "Read the tape. No keys.",
    steps: ["Open Notes and the thesis.", "Watch title, mint, lien, conversion.", "Leave an X tag only if you want a line on the invitation."],
  },
  {
    id: "household",
    title: "Household",
    fee: "$0.001 a write",
    first: "The floor is already your first claim. Issue named credit only after that.",
    steps: [
      "Read the floor claim. Survival is not priced at the door.",
      "Bind a name on Sealroom if you want a local seal.",
      "Write a receivable on the same rail as anyone else. It is not cash at par.",
      "If payroll cannot bear the discount, lock a hedge and pay the listed charge.",
    ],
  },
  {
    id: "firm",
    title: "Firm",
    fee: "$0.001 a write",
    first: "Invoice, hedge, charge, checkout — four lines or no settle.",
    steps: [
      "Name the class of paper. Thin books quote wide.",
      "Convert at the live discount. Do not freeze par.",
      "Pay the listed risk charge when the paper is written.",
      "Title Desert only after the floor take and the listed prices.",
    ],
  },
  {
    id: "treasury",
    title: "Treasury",
    fee: "Same window as a household",
    first: "No weekend facility. No par club.",
    steps: [
      "Buy units only on the listed mint schedule.",
      "Do not mint to cover a failed hedge or a missed floor period.",
      "Issue named paper on the same rail. It discounts at checkout.",
      "Publish every act. An unpublished mandate is not policy.",
    ],
  },
  {
    id: "agent",
    title: "Agent",
    fee: "1 seat",
    first: "Clerk of posted rules. Not a second sovereign.",
    steps: [
      "Catch a double mint. Flag a price off the tape.",
      "Pay the floor on the clock. Do not choose who deserves the basket.",
      "Refuse a settlement with no provenance. The refusal is a line.",
      "Do not mint, set the basket, vote unsupervised, or harvest Desert.",
    ],
  },
] as const;

export function EnterPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Program</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Everyone enters on the same rail.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        This is the working program. It does not print units. It does not clear paper at par. It does not move X Money
        from this page. It tells each party the order: reserve the floor, write the tape, then issue, then trade.
      </p>

      <ol className="mt-12 grid gap-3 sm:grid-cols-4">
        {[
          ["01", "Reserve the floor", "/claim"],
          ["02", "Write the tape", "/show"],
          ["03", "Issue named paper", "/hedge"],
          ["04", "Trade at listed prices", "/market"],
        ].map(([n, title, to]) => (
          <li key={n} className="rounded-lg border border-border bg-surface p-4">
            <p className="font-mono text-xs text-subtle">{n}</p>
            <p className="mt-2 font-display text-2xl">
              <Link to={to} className="underline decoration-border underline-offset-4">
                {title}
              </Link>
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-14 space-y-4">
        {PARTIES.map((party) => (
          <section key={party.id} id={party.id} className="rounded-lg border border-border bg-surface p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-3xl">{party.title}</h2>
              <p className="font-mono text-sm text-fg">{party.fee}</p>
            </div>
            <p className="mt-3 max-w-2xl text-muted">{party.first}</p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted">
              {party.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">What this program will not do</h2>
        <p className="mt-4 max-w-2xl text-muted">
          It will not freeze a discount so paper looks like cash. It will not open a mint window for one name. It will
          not let an agent cover a hole with new units. It will not take a dossier in exchange for a seat. $Trust pays
          the write and counts an acknowledgement. It is not legal tender.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/#ledger" className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
            Begin the ledger
          </a>
          <Link to="/demo" className="rounded-full border border-border px-4 py-3 text-sm text-fg">
            Seal a first act
          </Link>
          <Link to="/notes" className="rounded-full border border-border px-4 py-3 text-sm text-fg">
            Read the book
          </Link>
        </div>
      </section>
    </div>
  );
}
