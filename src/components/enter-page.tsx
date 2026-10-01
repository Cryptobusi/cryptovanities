import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TRUST_TOKEN } from "@/lib/site-data";

type Seat = "witness" | "household" | "firm" | "treasury" | "agent";
type Line = { n: string; title: string; body: string };

const SEATS: { id: Seat; title: string; fee: string }[] = [
  { id: "witness", title: "Witness", fee: "Free" },
  { id: "household", title: "Household", fee: "$0.001" },
  { id: "firm", title: "Firm", fee: "$0.001" },
  { id: "treasury", title: "Treasury", fee: "Same window" },
  { id: "agent", title: "Agent", fee: "1 seat" },
];

const STEPS = [
  {
    n: "01",
    title: "Reserve the floor",
    why: "Survival leaves the wage bargain before anyone issues. The 200 basket units are a first claim on surplus already titled. They are not printed to cover this invoice.",
    do: "Press Reserve. The tape writes one line. A missed floor is not rescued by a mint.",
  },
  {
    n: "02",
    title: "Name the paper",
    why: "Household, firm, and treasury issue on the same rail. Face is paper, not basket units. A witness may watch. An agent may not invent the invoice.",
    do: "Set face and class. Treasury does not get a tighter class. Thin class quotes wider later.",
  },
  {
    n: "03",
    title: "Write the receivable",
    why: "The due date and the face go on the tape before checkout. Without this line there is no conversion. A write is about $0.001 in $Trust. This mock does not sign Hedera.",
    do: "Press Write receivable. The line names issuer, face, and class.",
  },
  {
    n: "04",
    title: "Read the live discount",
    why: "Checkout haircuts paper into basket units. Value is face times (1 minus d). A frozen d is par by another name. Move the slider. Width is information.",
    do: "Read d. Do not lock last week's official rate.",
  },
  {
    n: "05",
    title: "Lock the hedge and pay the charge",
    why: "The hedge is a second named claim that pays the gap if live d moves past the strike. The risk charge is the posted price of writing the class. It is not the haircut and not seigniorage. Taken when written.",
    do: "Press Lock. Charge leaves the book now. The put does not print the gap.",
  },
  {
    n: "06",
    title: "Settle at the register",
    why: "Invoice converts at the live discount. The put pays or takes the gap. The register records basket units. Face was never cash. Desert is what remains after floor and listed prices — not this page's job to level.",
    do: "Press Settle. Four lines or the agent refuses.",
  },
] as const;

function money(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export function EnterPage() {
  const [seat, setSeat] = useState<Seat>("firm");
  const [step, setStep] = useState(0);
  const [face, setFace] = useState(10000);
  const [klass, setKlass] = useState("30-day mill paper");
  const [discount, setDiscount] = useState(0.14);
  const [reserved, setReserved] = useState(false);
  const [written, setWritten] = useState(false);
  const [locked, setLocked] = useState(false);
  const [settled, setSettled] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [note, setNote] = useState("Pick a seat. The desk does not print.");

  const strike = 0.1;
  const chargeRate = 0.015;
  const floor = 200;

  const quote = useMemo(() => {
    const conversion = face * (1 - discount);
    const hedge = locked ? face * Math.max(0, discount - strike) : 0;
    const charge = locked ? face * chargeRate : 0;
    const register = conversion + hedge;
    return { conversion, hedge, charge, register };
  }, [face, discount, locked]);

  function add(line: Line) {
    setLines((prev) => [...prev, line]);
  }

  function reserve() {
    if (seat === "agent") {
      setNote("An agent pays the floor on the clock. It does not choose who deserves the basket.");
    }
    setReserved(true);
    add({ n: "F", title: "Floor reserved", body: `${floor} basket units senior to this paper.` });
    setNote("Floor is reserved from surplus already titled. New units did not arrive.");
    setStep(1);
  }

  function writeReceivable() {
    if (seat === "witness") {
      setNote("A witness reads. They do not issue. Switch seat to household, firm, or treasury.");
      return;
    }
    if (!reserved) {
      setNote("Reserve the floor first. Issue does not jump the claim.");
      return;
    }
    setWritten(true);
    add({
      n: "R",
      title: "Receivable",
      body: `${seat} wrote ${money(face)} ${klass}. Not cash.`,
    });
    setNote("Face is on the tape. It still is not basket units.");
    setStep(3);
  }

  function lock() {
    if (!written) {
      setNote("No receivable, no hedge. The agent would refuse this.");
      return;
    }
    setLocked(true);
    add({
      n: "H",
      title: "Hedge",
      body: `Put struck at ${(strike * 100).toFixed(0)}%. Pays the gap if d moves past the strike.`,
    });
    add({
      n: "C",
      title: "Risk charge",
      body: `${money(face * chargeRate)} taken now. Class price, not a friend price.`,
    });
    setNote("Charge taken at signature. The put does not mint the gap.");
    setStep(5);
  }

  function settle() {
    if (seat === "agent" && (!written || !locked || !reserved)) {
      add({ n: "X", title: "Refusal", body: "Missing line. No checkout. The refusal stays." });
      setNote("Agent refused. A missing line is not a quiet exception.");
      return;
    }
    if (!locked) {
      setNote("Lock the hedge and pay the charge before the register.");
      return;
    }
    setSettled(true);
    add({
      n: "S",
      title: "Checkout",
      body: `Live d ${(discount * 100).toFixed(0)}%. Register ${money(quote.register)} basket units. Face was never cash.`,
    });
    setNote("Settled. Desert is the remainder after floor and listed prices. This mock does not title it.");
    setStep(5);
  }

  function reset() {
    setStep(0);
    setReserved(false);
    setWritten(false);
    setLocked(false);
    setSettled(false);
    setLines([]);
    setDiscount(0.14);
    setNote("Desk cleared. The last refusal, if any, would have stayed on a real tape.");
  }

  const current = STEPS[step];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Working desk · mock</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Enter. Then walk the invoice.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        A local desk. Numbers move. Lines append. Nothing here signs Hedera, moves X Money, or mints a unit. A listed write
        on the real rail is about $0.001 in $Trust ({TRUST_TOKEN}), after the account associates the token.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {SEATS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSeat(item.id)}
            className={
              seat === item.id
                ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg"
                : "rounded-full border border-border px-4 py-2 text-sm text-fg"
            }
          >
            {item.title}
            <span className="ml-2 font-mono text-xs opacity-80">{item.fee}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-lg border border-border bg-surface p-5">
          <p className="font-mono text-xs text-subtle">
            Step {current.n} · {seat}
          </p>
          <h2 className="mt-2 font-display text-4xl">{current.title}</h2>
          <p className="mt-4 text-muted">{current.why}</p>
          <p className="mt-3 text-sm text-fg">{current.do}</p>

          {step >= 1 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-muted">
                Face (paper)
                <input
                  type="number"
                  min={100}
                  step={100}
                  value={face}
                  onChange={(event) => setFace(Number(event.target.value) || 0)}
                  className="mt-2 w-full rounded-md border border-border bg-bg px-3 py-3 text-fg outline-none"
                />
              </label>
              <label className="text-sm text-muted">
                Class
                <select
                  value={klass}
                  onChange={(event) => setKlass(event.target.value)}
                  className="mt-2 w-full rounded-md border border-border bg-bg px-3 py-3 text-fg outline-none"
                >
                  <option>30-day mill paper</option>
                  <option>household receivable</option>
                  <option>treasury bill</option>
                  <option>thin new class</option>
                </select>
              </label>
            </div>
          ) : null}

          {step >= 3 ? (
            <label className="mt-5 block text-sm text-muted">
              Live discount d = {(discount * 100).toFixed(0)}%
              <input
                type="range"
                min={4}
                max={22}
                value={Math.round(discount * 100)}
                onChange={(event) => setDiscount(Number(event.target.value) / 100)}
                className="mt-3 w-full accent-primary"
              />
              <span className="mt-1 block text-xs">
                Conversion {money(quote.conversion)} = {money(face)} × (1 − d). Strike stays at 10%.
              </span>
            </label>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            {step === 0 ? (
              <button type="button" onClick={reserve} className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
                Reserve the floor
              </button>
            ) : null}
            {step >= 1 && step < 3 ? (
              <button type="button" onClick={writeReceivable} className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
                Write receivable
              </button>
            ) : null}
            {step >= 3 && !locked ? (
              <button type="button" onClick={lock} className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
                Lock hedge and pay charge
              </button>
            ) : null}
            {locked && !settled ? (
              <button type="button" onClick={settle} className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
                Settle at checkout
              </button>
            ) : null}
            <button type="button" onClick={reset} className="rounded-full border border-border px-4 py-3 text-sm text-fg">
              Clear desk
            </button>
          </div>
          <p className="mt-4 text-sm text-gold">{note}</p>
        </section>

        <aside className="rounded-lg border border-border bg-bg p-5">
          <p className="font-mono text-xs tracking-widest text-subtle uppercase">Register</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Floor reserved</dt>
              <dd>{reserved ? `${floor} units` : "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Live conversion</dt>
              <dd>{written ? money(quote.conversion) : "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Hedge pays</dt>
              <dd>{locked ? money(quote.hedge) : "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Charge already taken</dt>
              <dd>{locked ? money(quote.charge) : "—"}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-border pt-3 font-display text-2xl">
              <dt>Register</dt>
              <dd>{settled ? money(quote.register) : "—"}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-muted">
            Register = conversion + hedge. Charge was paid at lock, not subtracted again. Floor stays senior and is not
            inside the invoice.
          </p>
          <ol className="mt-6 space-y-3 border-t border-border pt-4">
            {lines.length === 0 ? <li className="text-sm text-muted">Tape empty.</li> : null}
            {lines.map((line, index) => (
              <li key={`${line.n}-${index}`} className="text-sm">
                <span className="font-mono text-xs text-subtle">{line.n}</span>
                <span className="ml-2 text-fg">{line.title}</span>
                <p className="text-muted">{line.body}</p>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <ol className="mt-8 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {STEPS.map((item, index) => (
          <li key={item.n}>
            <button
              type="button"
              onClick={() => setStep(index)}
              className={
                index === step
                  ? "w-full rounded-md border border-primary px-3 py-3 text-left text-sm text-fg"
                  : "w-full rounded-md border border-border px-3 py-3 text-left text-sm text-muted"
              }
            >
              <span className="font-mono text-xs">{item.n}</span>
              <span className="mt-1 block">{item.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">What this mock will not do</h2>
        <p className="mt-4 max-w-2xl text-muted">
          It will not freeze d. It will not open a mint window for the treasury. It will not let the agent cover the gap
          with new units. Associate {TRUST_TOKEN} in HashPack before a real write. Sealroom remains a local seal.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/#ledger" className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
            Begin the ledger
          </a>
          <Link to="/hedge" className="rounded-full border border-border px-4 py-3 text-sm text-fg">
            Invoice note
          </Link>
          <Link to="/demo" className="rounded-full border border-border px-4 py-3 text-sm text-fg">
            Sealroom
          </Link>
          <a href="https://www.hashpack.app/" target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-3 text-sm text-fg">
            HashPack
          </a>
        </div>
      </section>
    </div>
  );
}
