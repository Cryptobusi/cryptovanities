import { useState } from "react";
import { FLOORS, HANDLE, TRAILS, TRUST_TOKEN } from "@/lib/site-data";

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs tracking-widest text-subtle uppercase">{children}</p>;
}

export function Opening() {
  return (
    <section id="opening" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Kicker>From @{HANDLE}</Kicker>
        <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          They printed the money. I am keeping the book.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Gold and silver were already money: durable, scarce. A bank then charged interest on paper it had just
          invented. The price stopped telling the truth. Same rails. Anyone may issue. No one may hide the print.
        </p>
        <p className="mt-5 max-w-2xl text-muted">
          That book is Providence Through Provenance: an origin no one can rewrite. A public ledger. AI cheap enough to
          audit the powerful.
        </p>
        <div className="mt-10 max-w-3xl">
          <h3 className="font-display text-2xl">If it cannot be shown, it is only a story.</h3>
          <p className="mt-3 text-muted">
            Claim, title, price, transfer — a trail neither of us owns, on Hedera. Cheap intelligence makes equal
            standing a query, not a speech. Interest paid out returns, or the books drain.
          </p>
          <p className="mt-3 text-muted">
            Menger, Mises, Hume, Diamond’s <span className="text-fg">Collapse</span> — arguments I record, not a model I
            invent.
          </p>
        </div>
        <p className="mt-10 max-w-3xl border-l border-primary pl-5 font-display text-2xl leading-snug text-fg">
          I have not beaten the printer. #LeGoMiEgo marks the unfinished work.
        </p>
        <p className="mt-6 font-mono text-xs text-subtle">
          <a
            href="https://x.com/trancesage"
            target="_blank"
            rel="noreferrer"
            className="text-fg underline decoration-border underline-offset-4"
          >
            @{HANDLE}
          </a>
        </p>
      </div>
    </section>
  );
}

export function Hero() {
  const [trailId, setTrailId] = useState(TRAILS[0].id);
  const trail = TRAILS.find((item) => item.id === trailId) ?? TRAILS[0];

  return (
    <section id="top" className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
      <div className="lg:col-span-7">
        <Kicker>Secure · Transparent · Fair</Kicker>
        <h1 className="mt-4 font-display text-5xl leading-none font-medium tracking-tight text-fg sm:text-7xl">
          The Providence Through Provenance
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          I got tired of a self filed in someone else’s cabinet. If I became it, the record can show it.
        </p>
        <p className="mt-4 max-w-xl text-muted">
          Same rails. Anyone may issue. No one may hide the print. A write is about <span className="text-fg">$0.001</span>.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/floor#desk" className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-fg">
            Issue on the tape
          </a>
          <a href="#agents" className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-fg">
            Put an agent on the tape
          </a>
          <a href="#ledger" className="rounded-full border border-border px-5 py-3 text-sm text-fg">
            Begin the ledger
          </a>
        </div>
        <p className="mt-8 font-mono text-xs text-subtle">
          Hedera token {TRUST_TOKEN} · $Trust · Self-sovereignty
        </p>
      </div>
      <aside className="rounded-xl border border-border bg-surface p-5 lg:col-span-5">
        <p className="font-mono text-xs tracking-wide text-subtle uppercase">Authority trail · illustrative</p>
        <p className="mt-2 font-display text-2xl">Nobody has to take your word for it.</p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Example trails">
          {TRAILS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === trail.id}
              onClick={() => setTrailId(item.id)}
              className={
                item.id === trail.id
                  ? "rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
                  : "rounded-full border border-border px-3 py-2 text-sm text-fg"
              }
            >
              {item.label}
            </button>
          ))}
        </div>
        <ol className="mt-6 space-y-4">
          {trail.steps.map((step) => (
            <li key={step.n} className="grid grid-cols-[3rem_1fr] gap-3 border-t border-border pt-4">
              <span className="font-mono text-xs text-subtle">{step.n}</span>
              <div>
                <p className="text-sm font-medium text-fg">{step.title}</p>
                <p className="text-sm text-fg">{step.body}</p>
                <p className="mt-1 text-sm text-muted">{step.why}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t border-border pt-4 text-sm text-muted">
          <span className="font-medium text-fg">Why it matters. </span>
          {trail.matters}
        </p>
        <p className="mt-3 text-sm text-subtle">
          Written by neither party. Checked by anyone. Anchored on Hedera — 3–5 second finality, carbon-negative,
          ~$0.001 a write.
        </p>
      </aside>
    </section>
  );
}

export function Thesis() {
  return (
    <section id="thesis" className="border-t border-border bg-bg/25">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Kicker>The thesis</Kicker>
        <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          Same rules. A public floor. A public tape.
        </h2>
        <p className="mt-5 max-w-2xl text-muted">
          Private issue and private ambition stay. They sit on top of the floor, not in place of it.{" "}
          <a href="/floor#desk" className="text-fg underline decoration-border underline-offset-4">
            The working form
          </a>{" "}
          keeps that order: reserve the floor, write the tape, then issue, then trade.{" "}
          <a href="/stack" className="text-fg underline decoration-border underline-offset-4">
            How this differs from fiat
          </a>
          .
        </p>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {FLOORS.map((item) => (
            <li key={item.n} className="rounded-lg border border-border bg-bg p-5">
              <p className="font-mono text-xs text-subtle">{item.n}</p>
              <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
