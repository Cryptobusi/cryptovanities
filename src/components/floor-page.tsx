import { FloorDesk } from "@/components/floor-desk";

const ORDER = [
  {
    n: "01",
    title: "Floor",
    body: "Survival is a small basket, funded in the open. This site states the rule. The payment, when it runs, is a transfer on the tape. Anyone can see who was paid. The agent does not choose who deserves it.",
  },
  {
    n: "02",
    title: "Tape",
    body: "Hedera is the shared book. A household and a treasury pay the same listed fee and wait the same few seconds. After consensus, the line cannot be edited, including by the people who run the nodes.",
  },
  {
    n: "03",
    title: "Same rules",
    body: "Authority Trail, on DOVU, is the grant. A role, a ceiling, a window. Closing the window does not erase what was done inside it. An agent that fails the check does not get a quieter standard than a person.",
  },
  {
    n: "04",
    title: "Private issue",
    body: "HashPack is where a person mints a fungible coin. The keys stay with that account. The coin is named credit. It is not money at par, and it does not skip the floor.",
  },
  {
    n: "05",
    title: "Ambition",
    body: "After the floor and the risk charge, the residual is profit. The market deck, and SaucerSwap when a pool exists, let that coin meet other currencies in public. A price that only works off the tape is not a price.",
  },
] as const;

export function FloorPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">The workable form</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">A public floor and a public tape.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">Private issue and private ambition, under the same rules.</p>
      <p className="mt-4 max-w-2xl text-muted">
        The basket comes first, so survival is not priced at the door. Credit, currency, and title are written where
        every participant can read them. Profit is allowed after the floor and the shared risk charge, not instead of
        them. Software may enforce that order. It may not hold the treasury, and it may not become a second sovereign.
      </p>

      <section className="mt-10 rounded-xl border border-border bg-surface p-5 sm:p-8">
        <p className="font-mono text-xs tracking-widest text-subtle uppercase">Recommended</p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">Hedera</h2>
        <p className="mt-4 max-w-2xl text-muted">
          One public tape is the piece the rest of the form cannot fake. Without it, each office keeps a private book
          and calls the difference a rule. Hedera is the network that already does the shared part: the same fee, the
          same finality, carbon-negative, and a write cheap enough that hiding it is not a saving. Open it for the
          network. Read any line on HashScan. Neither site pays the basket, and neither should be asked to govern.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://hedera.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg"
          >
            Open Hedera
          </a>
          <a
            href="https://hashscan.io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-sm text-fg underline decoration-border underline-offset-4"
          >
            Read the tape
          </a>
        </div>
      </section>

      <ol className="mt-10 grid gap-4 md:grid-cols-2">
        {ORDER.map((step) => (
          <li key={step.n} className="rounded-lg border border-border bg-bg p-5">
            <p className="font-mono text-xs text-subtle">{step.n}</p>
            <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
            <p className="mt-3 text-sm text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-display text-3xl">The other two doors</h2>
        <p className="mt-3 text-muted">
          Hedera holds the line. These two keep private action and public permission from collapsing into one office.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a href="https://authority.dovu.ai" target="_blank" rel="noreferrer" className="rounded-lg border border-border bg-surface p-5">
            <h3 className="font-display text-2xl">Authority Trail</h3>
            <p className="mt-2 text-sm text-muted">
              DOVU. Who was allowed, in which role, for how long. The agent checks the grant. It does not keep the keys.
            </p>
            <p className="mt-3 font-mono text-xs text-subtle">authority.dovu.ai</p>
          </a>
          <a href="https://www.hashpack.app/" target="_blank" rel="noreferrer" className="rounded-lg border border-border bg-surface p-5">
            <h3 className="font-display text-2xl">HashPack</h3>
            <p className="mt-2 text-sm text-muted">
              The wallet. Mint a personal coin, hold it, send it. Private issue, on the same tape as everyone else.
            </p>
            <p className="mt-3 font-mono text-xs text-subtle">hashpack.app</p>
          </a>
        </div>
        <p className="mt-6 text-sm text-muted">
          Coins, the market deck, and the Sealroom on this site are the doors onto those rails. The desk below is the
          mock-up of the form itself: inventories in, a coin out, a price that has to stand next to every other one.
        </p>
      </section>
      <FloorDesk />
    </div>
  );
}
