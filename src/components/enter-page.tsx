import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HANDLE, TRUST_TOKEN } from "@/lib/site-data";

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
      "Read the floor claim.",
      "Bind a name on Sealroom if you want a local seal.",
      "Write a receivable. It is not cash at par.",
      "If payroll cannot bear the discount, lock a hedge and pay the listed charge.",
    ],
  },
  {
    id: "firm",
    title: "Firm",
    fee: "$0.001 a write",
    first: "Invoice, hedge, charge, checkout — four lines or no settle.",
    steps: ["Name the class of paper.", "Convert at the live discount.", "Pay the listed charge when written.", "Title Desert only after the takes."],
  },
  {
    id: "treasury",
    title: "Treasury",
    fee: "Same window as a household",
    first: "No weekend facility. No par club.",
    steps: ["Buy units only on the listed mint.", "Do not mint to cover a hole.", "Issue named paper that discounts.", "Publish every act."],
  },
  {
    id: "agent",
    title: "Agent",
    fee: "1 seat",
    first: "Clerk of posted rules. Not a second sovereign.",
    steps: ["Catch a double mint.", "Pay the floor on the clock.", "Refuse a settlement with no provenance.", "Do not mint or harvest Desert."],
  },
] as const;

const MILE = [
  { id: "read", label: "Read the thesis and one note" },
  { id: "seat", label: "Pick a seat: witness, household, firm, treasury, or agent" },
  { id: "tag", label: "Leave an X tag on the ledger (optional for witness)" },
  { id: "associate", label: "Associate $Trust 0.0.10607411 in HashPack if you will pay a write" },
  { id: "seal", label: "Seal one act on Sealroom (local record; not a Hedera write)" },
  { id: "invoice", label: "If you issue: write face, due date, class — four lines at checkout" },
] as const;

const KEY = "ea-enter-mile";

export function EnterPage() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* ignore */
    }
  }, []);

  function toggle(id: string) {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Program</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Everyone enters on the same rail.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Public-goods desks use a short first mile: values, a seat, a first task. Trade-credit clubs submit headline
        invoices to a shared book. Hedera requires a token association before a unit can arrive. This page takes those
        three. It refuses a stamp dossier and a matching pool that reprints the mint.
      </p>

      <section className="mt-10 rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-3xl">First mile</h2>
        <p className="mt-3 text-sm text-muted">Checked on this browser only. Not a dossier.</p>
        <ul className="mt-5 space-y-3">
          {MILE.map((item) => (
            <li key={item.id}>
              <label className="flex cursor-pointer items-start gap-3 text-muted">
                <input type="checkbox" checked={Boolean(done[item.id])} onChange={() => toggle(item.id)} className="mt-1 accent-primary" />
                <span>{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-3xl">Associate the fee unit</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Hedera will not receive {TRUST_TOKEN} until the account associates it. HashPack: Assets → Add Token → paste
          the id → Associate. A listed write is about $0.001. This page does not take the keys.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="https://www.hashpack.app/" target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm text-fg">
            HashPack
          </a>
          <a href={`https://hashscan.io/mainnet/token/${TRUST_TOKEN}`} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm text-fg">
            Hashscan {TRUST_TOKEN}
          </a>
          <a href="https://www.saucerswap.finance/" target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm text-fg">
            SaucerSwap
          </a>
        </div>
      </section>

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
        <h2 className="font-display text-3xl">Taken. Refused.</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Taken: a first-mile checklist; a seat before a task; headline invoice fields; a required token association.
          Refused: Gitcoin-style stamp harvesting, a matching pool that reprints the meter, a club that clears at par,
          a typeform dossier. @{HANDLE} receives a drafted note only if you send it.
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
