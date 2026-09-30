import { useEffect, useState } from "react";
import {
  AGENT_DUTIES,
  CLUB_ACCOUNT,
  dmUrl,
  FLOORS,
  HANDLE,
  HOME_POSTS,
  LEDGER_KEY,
  MARKS,
  pickQuote,
  SEATS,
  STATS,
  SUPPLY,
  HOLDERS,
  TRAILS,
  TRUST_TOKEN,
  WORK,
  type Quote,
} from "@/lib/site-data";

type SavedNote = {
  email: string;
  message: string;
  role: string;
  at: string;
  quote: string;
  quoteUrl: string;
  dmUrl: string;
};

export function HomePage() {
  return (
    <>
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 pt-6 sm:px-8">
        {MARKS.map((mark) => {
          const external = mark.href.startsWith("http");
          return (
            <a
              key={mark.src}
              href={mark.href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="w-0 min-w-0 flex-1"
            >
              <img src={mark.src} alt={mark.alt} className="sky-blend aspect-square h-auto w-full object-contain" />
            </a>
          );
        })}
      </div>
      <Opening />
      <Hero />
      <Thesis />
      <Provenance />
      <Agents />
      <Price />
      <BoardPreview />
      <Invitation />
    </>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs tracking-widest text-subtle uppercase">{children}</p>;
}

function Opening() {
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

function Hero() {
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

function Thesis() {
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
          keeps that order: reserve the floor, write the tape, then issue, then trade.
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

function Provenance() {
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

function Agents() {
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

function Price() {
  const [open, setOpen] = useState(false);
  return (
    <section id="give" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <Kicker>The price</Kicker>
      <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">A listed write. Not a gift.</h2>
      <p className="mt-5 max-w-2xl text-muted">
        About $0.001 a write. Issuance is priced. The witness seat is free. Profit is what remains after the floor and
        the risk charge.
      </p>
      <div className="mt-8 flex items-center gap-4 sm:gap-8">
        <a href="https://hedera.kiloscribe.com/" target="_blank" rel="noreferrer" aria-label="Explore on Kiloscribe" className="shrink-0">
          <img src="/club-hbar.webp" alt="Gold pin stamped Club H Bar" className="sky-blend w-28 object-contain sm:w-40" />
        </a>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <p className="font-mono text-xs tracking-widest text-subtle uppercase">Purchase $Trust</p>
          <a
            href="https://www.hashpack.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border bg-surface/70 px-3 py-2.5"
          >
            <img src="/hashpack-mark.png" alt="" className="h-11 w-11 shrink-0 rounded-md object-cover" />
            <span className="min-w-0">
              <span className="block text-sm text-fg">HashPack</span>
              <span className="block truncate font-mono text-xs text-muted">www.hashpack.app</span>
            </span>
          </a>
          <a
            href="https://www.saucerswap.finance/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border bg-surface/70 px-3 py-2.5"
          >
            <img src="/saucerswap-logo.png" alt="" className="h-11 w-11 shrink-0 rounded-full object-cover" />
            <span className="min-w-0">
              <span className="block text-sm text-fg">SaucerSwap</span>
              <span className="block truncate font-mono text-xs text-muted">www.saucerswap.finance</span>
            </span>
          </a>
        </div>
      </div>
      <div className="mt-8 max-w-3xl">
        <h3 className="font-display text-2xl">Mint a personal coin</h3>
        <p className="mt-3 text-sm text-muted">
          The coin is created in HashPack. This page does not mint it and does not take the keys. You sign. Your
          account is the treasury. HashPack shows the network fee before you confirm — a new fungible token is about
          one dollar in HBAR.
        </p>
        <ol className="mt-5 space-y-3 text-sm">
          <li>
            <span className="font-medium text-fg">01. </span>
            Open HashPack on the account that will hold the supply. Leave HBAR for the fee the app shows.
          </li>
          <li>
            <span className="font-medium text-fg">02. </span>
            Open the menu. Choose Advanced Tools, then Token Creator Tools.
          </li>
          <li>
            <span className="font-medium text-fg">03. </span>
            Create a fungible token. Set the name, a short symbol, the decimals, and the initial supply. That supply
            is minted to your account.
          </li>
          <li>
            <span className="font-medium text-fg">04. </span>
            Keys. Keep the supply key if you will mint more later. An admin key can change the token after you sign.
            Leave freeze, wipe, pause, and KYC off unless you mean to lock other holders out.
          </li>
          <li>
            <span className="font-medium text-fg">05. </span>
            Read the summary. Sign only if the name, the symbol, the supply, and the keys match what you meant. HashPack
            returns a token id, 0.0.something. Copy it.
          </li>
          <li>
            <span className="font-medium text-fg">06. </span>
            The coin shows under Assets. Another account must associate that token id before it can receive any.
          </li>
          <li>
            <span className="font-medium text-fg">07. </span>
            Paste the id into the market deck. A SaucerSwap pool, if one exists, is the listed price. If none exists,
            two piles on the desk discover the ratio.
          </li>
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="https://www.hashpack.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg"
          >
            Open HashPack
          </a>
          <a
            href="https://docs.hashpack.app/token-creators/token-creator-tool"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-sm text-fg underline decoration-border underline-offset-4"
          >
            Token Creator notes
          </a>
          <a href="/market" className="inline-flex min-h-11 items-center text-sm text-fg underline decoration-border underline-offset-4">
            Market deck
          </a>
        </div>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {SEATS.map((seat) => (
          <article key={seat.id} className="flex flex-col rounded-lg border border-border bg-surface p-5">
            <h3 className="font-display text-2xl">{seat.name}</h3>
            <p className="mt-2 font-mono text-sm text-fg">
              {seat.fee}
              {seat.unit ? ` ${seat.unit}` : ""}
            </p>
            <p className="mt-3 text-sm text-muted">{seat.blurb}</p>
            <ul className="mt-4 space-y-2 text-sm text-fg">
              {seat.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <a href="#ledger" className="mt-6 inline-flex w-fit rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg">
              {seat.cta}
            </a>
          </article>
        ))}
      </div>
      <div className="mt-10 max-w-3xl">
        <h3 className="font-display text-2xl">What $Trust is for</h3>
        <p className="mt-3 text-muted">
          $Trust is the fee and the acknowledgement unit. It is not a second printer, and it is not legal tender.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-fg">Pay a write</dt>
            <dd className="mt-1 text-sm text-muted">A line on the tape is about $0.001, settled in $Trust.</dd>
          </div>
          <div>
            <dt className="text-sm text-fg">Count an acknowledgement</dt>
            <dd className="mt-1 text-sm text-muted">One coin, one acknowledgement. A count, not a share of the treasury.</dd>
          </div>
          <div>
            <dt className="text-sm text-fg">State a limit</dt>
            <dd className="mt-1 text-sm text-muted">Authority is a ceiling in $Trust. The grant may not grow itself.</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-muted">
          Fungible on Hedera,{" "}
          <a
            href={`https://hashscan.io/mainnet/token/${TRUST_TOKEN}`}
            target="_blank"
            rel="noreferrer"
            className="text-fg underline decoration-border underline-offset-4"
          >
            {TRUST_TOKEN}
          </a>
          , created 2026-06-25. The supply minted so far is 100,000,000,000 TRUST. At 4 decimals the chain stores
          1,000,000,000,000,000 smallest units. The issuer's ceiling is a separate rule. Fees settle to{" "}
          <span className="font-sans tracking-tighter text-fg">ClubHbar.ℏ</span> {CLUB_ACCOUNT}. Buy it in HashPack or
          on SaucerSwap. This page does not take it at checkout. It does not vote and it does not pay a yield.
        </p>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="trust-tokenomics"
          onClick={() => setOpen((value) => !value)}
          className="mt-6 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg"
        >
          TRUST Tokenomics
        </button>
        {open ? <Tokenomics /> : null}
      </div>
    </section>
  );
}

function Tokenomics() {
  return (
    <div id="trust-tokenomics" className="mt-6 max-w-3xl space-y-8 rounded-lg border border-border bg-bg p-5">
      <div>
        <h3 className="font-display text-2xl">What it pays for</h3>
        <p className="mt-3 text-sm text-muted">
          $TRUST is DOVU’s meter for writing authority state on Hedera. Reading that record is free. Changing it is what
          the token is for. The supply rules are published at{" "}
          <a href="https://trust.dovu.ai/" target="_blank" rel="noreferrer" className="text-fg underline decoration-border underline-offset-4">
            trust.dovu.ai
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-muted">
          On Authority Trail, a write is a change to shared authority: registering an identity, publishing a role list,
          granting a role, denying a request, or revoking one. The developer page prices examples at 100, 2,500, and
          10,000 TRUST. Those fees are the demand. The token is not a share of DOVU, not a vote, and not a claim on the
          treasury.
        </p>
        <p className="mt-3 text-sm text-muted">
          On this site it is used more narrowly. A listed write is about $0.001, settled in $TRUST, and one coin can
          count as one acknowledgement. That dollar price is this site’s price. It is not the protocol’s fee, and it
          does not change how many tokens exist.
        </p>
      </div>
      <div>
        <h3 className="font-display text-2xl">Supply</h3>
        <p className="mt-3 text-sm text-muted">
          Genesis on 25 June 2026 was 100,000,000,000 TRUST. Nothing has been minted since. The chain still shows that
          same total. The Hedera token record itself has no max supply. The cap is the issuer’s contract: supply may
          not exceed genesis × 1.01ⁿ, compounding once a year from that date. There is no vote to raise the rate.
        </p>
        <dl className="mt-4 divide-y divide-border border-y border-border">
          {SUPPLY.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 py-2 text-sm">
              <dt className="text-muted">{label}</dt>
              <dd className="font-mono text-fg">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-muted">
          The ceiling grows by about 2.7 million TRUST a day. That headroom is not circulating. It is minted only when
          claimed, and only to one fixed recipient. Until then, the total stays 100 billion.
        </p>
      </div>
      <div>
        <h3 className="font-display text-2xl">Who holds the 100 billion</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="font-mono text-xs tracking-wide text-subtle uppercase">
              <tr>
                <th className="py-2 pr-3 font-normal">Bucket</th>
                <th className="py-2 pr-3 font-normal">Share</th>
                <th className="py-2 pr-3 font-normal">Unlock</th>
                <th className="py-2 font-normal">Still in the contract</th>
              </tr>
            </thead>
            <tbody>
              {HOLDERS.map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  <td className="py-2 pr-3 text-fg">{row[0]}</td>
                  <td className="py-2 pr-3 text-muted">{row[1]}</td>
                  <td className="py-2 pr-3 text-muted">{row[2]}</td>
                  <td className="py-2 text-muted">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted">
          About 97.6 million has vested to the ecosystem and not been claimed. Community, treasury, team, and partners
          have not started vesting. The first of those cliffs is 180 days from 25 June 2026.
        </p>
        <p className="mt-3 text-sm text-muted">
          The 8.43 billion circulating is exactly two claimed amounts: 3.43 billion from the ecosystem and the 5 billion
          liquidity release. The SaucerSwap DOVU/TRUST pool holds about 2.8 billion of that. It is inventory, not a
          second mint.
        </p>
        <p className="mt-3 text-sm text-muted">
          Two treasuries are easy to mix up. Account 0.0.10607410 is the issuance controller and holds none. The 15
          billion treasury allocation sits in a different contract, 0.0.10607423.
        </p>
      </div>
    </div>
  );
}

function BoardPreview() {
  return (
    <section id="board" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker>The X board</Kicker>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Writings from @{HANDLE}.</h2>
        </div>
        <a href="https://x.com/trancesage" target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm text-fg">
          Open on X
        </a>
      </div>
      <p className="mt-5 max-w-2xl text-muted">
        The public board is the account. Only the posts and replies on Providence Through Provenance.
      </p>
      <p className="mt-4">
        <a href="/board" className="text-sm text-fg underline decoration-border underline-offset-4">
          See this week's board →
        </a>
      </p>
      <ol className="mt-10 divide-y divide-border border-y border-border">
        {HOME_POSTS.map((post) => (
          <li key={post.href}>
            <a href={post.href} target="_blank" rel="noreferrer" className="grid gap-2 py-5 sm:grid-cols-[5rem_1fr] sm:gap-6">
              <time className="font-mono text-xs text-subtle">{post.date}</time>
              <p className="text-fg">{post.text}</p>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Invitation() {
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  const [role, setRole] = useState<(typeof SEATS)[number]["id"]>("witness");
  const [saved, setSaved] = useState<SavedNote | null>(null);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LEDGER_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedNote;
        if (parsed?.email && parsed.role && parsed.quote && parsed.dmUrl) setSaved(parsed);
      }
    } catch {
      /* ignore a bad local note */
    }
    setReady(true);
  }, []);

  const seat = SEATS.find((item) => item.id === (saved?.role ?? role)) ?? SEATS[0];

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const handle = tag.trim().replace(/^@+/, "");
    const note = message.trim();
    if (!/^[A-Za-z0-9_]{1,15}$/.test(handle)) {
      setError("Leave a real X tag.");
      return;
    }
    if (note.length < 2) {
      setError("Leave a message. A blank note cannot choose a line.");
      return;
    }
    if (note.length > 2000) {
      setError("Keep the message under 2,000 characters.");
      return;
    }
    if (honey.trim()) return;
    const email = `@${handle}`;
    const quote: Quote = pickQuote(note, role);
    const url = dmUrl(email, note, role);
    const next: SavedNote = {
      email,
      message: note,
      role,
      at: new Date().toISOString(),
      quote: quote.text,
      quoteUrl: quote.url,
      dmUrl: url,
    };
    localStorage.setItem(LEDGER_KEY, JSON.stringify(next));
    setSaved(next);
    setError("");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="ledger" className="border-t border-border bg-bg/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div>
          <Kicker>The invitation</Kicker>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Write your name toward the next season.</h2>
          <p className="mt-5 text-muted">
            Leave an X tag and a message. Joining opens a direct message to @{HANDLE} with your note already written —
            you send it from your own X account. The tag is not sold and not stacked into a dossier.
          </p>
          <p className="mt-4 text-sm text-fg">Witness is free. A write is about $0.001.</p>
        </div>
        {!ready ? (
          <div className="rounded-xl border border-border bg-bg p-6 text-sm text-muted">The ledger is opening.</div>
        ) : saved ? (
          <div className="rounded-xl border border-border bg-bg p-6">
            <p className="font-mono text-xs tracking-widest text-subtle uppercase">Noted</p>
            <h3 className="mt-2 font-display text-3xl">{saved.email}</h3>
            <p className="mt-2 text-sm text-muted">
              Seat {seat.name}
              {seat.fee ? ` · ${[seat.fee, seat.unit].filter(Boolean).join(" ")}` : ""}
            </p>
            <blockquote className="mt-5 border-l border-primary pl-4 font-display text-2xl leading-snug">
              {saved.quote}
            </blockquote>
            <a href={saved.quoteUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-fg underline decoration-border underline-offset-4">
              The line the note matched
            </a>
            <p className="mt-4 text-sm text-muted">
              A direct message to @{HANDLE} should be open. Send it from your own X account. Nothing here is stored
              except on this browser.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={saved.dmUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
                Open the message again
              </a>
              <button
                type="button"
                className="rounded-full border border-border px-4 py-3 text-sm text-fg"
                onClick={() => {
                  localStorage.removeItem(LEDGER_KEY);
                  setSaved(null);
                  setMessage("");
                }}
              >
                Write another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-xl border border-border bg-bg p-6">
            <label htmlFor="ledger-tag" className="text-sm text-muted">
              X tag
            </label>
            <input
              id="ledger-tag"
              type="text"
              autoComplete="username"
              required
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-3 text-fg outline-none focus:border-ring"
              placeholder="@yourtag"
              spellCheck={false}
            />
            <label htmlFor="ledger-message" className="mt-5 block text-sm text-muted">
              Message
            </label>
            <textarea
              id="ledger-message"
              required
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-2 w-full resize-y rounded-md border border-border bg-surface px-3 py-3 text-fg outline-none focus:border-ring"
              placeholder="What are you bringing to the ledger?"
            />
            <label className="absolute -left-[9999px]" aria-hidden>
              Company
              <input tabIndex={-1} autoComplete="off" value={honey} onChange={(event) => setHoney(event.target.value)} />
            </label>
            <fieldset className="mt-5">
              <legend className="text-sm text-muted">Seat</legend>
              <div className="mt-2 grid gap-2">
                {SEATS.map((item) => (
                  <label
                    key={item.id}
                    className={
                      role === item.id
                        ? "flex cursor-pointer items-center justify-between rounded-md border border-primary px-3 py-3"
                        : "flex cursor-pointer items-center justify-between rounded-md border border-border px-3 py-3"
                    }
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="role"
                        value={item.id}
                        checked={role === item.id}
                        onChange={() => setRole(item.id)}
                        className="accent-primary"
                      />
                      {item.name}
                    </span>
                    <span className="font-mono text-sm text-fg">{item.fee}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {error ? <p className="mt-4 text-sm text-gold">{error}</p> : null}
            <button type="submit" className="mt-6 w-full rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
              Send to @{HANDLE}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
