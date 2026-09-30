import {
  AGENT_DUTIES,
  STATS,
  WORK,
} from "@/lib/site-data";
import { Kicker } from "@/components/home-front";

export function Provenance() {
  return (
    <section id="provenance" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <Kicker>The work</Kicker>
      <h2 className="mt-3 font-display text-4xl sm:text-5xl">What provenance restores.</h2>
      <p className="mt-5 max-w-2xl text-muted">
        Hedera supplies the public proof layer. DOVU turns workflows into searchable evidence. Together they shrink the
        cost of proving — they do not write the law. Garbage in remains garbage on-chain unless physical checks,
        credentials, and human sign-off are part of the flow.
      </p>
      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        <a href="/demo" className="bg-subtle p-5 text-fg transition-colors hover:bg-muted sm:col-span-2">
          <h3 className="font-display text-2xl">Demo</h3>
          <p className="mt-2 text-sm text-primary">
            Sealroom. Notarize my stuff, my actions. Timestamped, immutably recorded in NFTs.
          </p>
        </a>
        {WORK.map((item) => (
          <article key={item.title} className="bg-bg p-5">
            <h3 className="font-display text-2xl">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.body}</p>
          </article>
        ))}
      </div>
      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-surface p-4">
            <dt className="font-display text-3xl text-fg">{stat.value}</dt>
            <dd className="mt-1 font-mono text-xs text-subtle">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Agents() {
  return (
    <section id="agents" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Kicker>Agents</Kicker>
        <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          Software does not get a quieter standard than a person.
        </h2>
        <p className="mt-5 max-w-2xl text-muted">
          Each act leaves who authorized it, which rule, which window, and whether a person signed. Agents do not mint,
          do not set the basket, and do not become a second sovereign. False flags stay. Missed double mints stay. The
          next agent is scored against that record.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {AGENT_DUTIES.map((item) => (
            <article key={item.title} className="rounded-lg border border-border bg-surface p-5">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Sealroom is a person notarizing their own acts.{" "}
          <a href="/demo" className="text-fg underline decoration-border underline-offset-4">
            Open the demo
          </a>
          . An agent does a public duty beside them, under the same clock.
        </p>
      </div>
    </section>
  );
}
