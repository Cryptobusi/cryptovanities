import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { HashgraphMark } from "@/components/mark";
import { prepareLedger } from "@/lib/ledger";

export const Route = createFileRoute("/")({ component: Home });

const NAV = [
  { href: "#thesis", label: "Thesis" },
  { href: "#provenance", label: "Provenance" },
  { href: "#tiers", label: "Tiers" },
  { href: "#give", label: "Coins" },
  { href: "#board", label: "Board" },
] as const;

const TRAIL = [
  { n: "01", title: "Origin", body: "Soil carbon, plot 14-N — signed" },
  { n: "02", title: "Allowed", body: "Priya Morgan · limit 5,000 $Club Hbar" },
  { n: "03", title: "Action", body: "Atlas agent issued the credit" },
  { n: "04", title: "Revoke", body: "Limit closed. The history remains." },
];

const WORK = [
  {
    title: "One timeline, many auditors",
    body: "A shipment, credit, or identity assertion is written once. Authorized parties see the same append-only history instead of reconciling local copies.",
  },
  {
    title: "Authority that can be revoked",
    body: "Who was allowed to act, in which role, during which window, and whether that grant was later withdrawn becomes public, queryable state. The past is not erased.",
  },
  {
    title: "Identity that travels",
    body: "Credentials reusable across issuance, trade, and collateral. Repeat KYC is a failure of memory. We remember without hoarding the file.",
  },
  {
    title: "Passports for things",
    body: "Origin, quality, certificates, and due-diligence events bound to a decentralized identifier. Regulators inspect a product without a central clerk.",
  },
  {
    title: "Agents, accountable at the act",
    body: "When software acts, the trail records decision, context, and human sign-off at the time of action — not reconstructed for the auditor later.",
  },
  {
    title: "Trustless, auditless, fair",
    body: "Inspect without permission. Count honestly, immutably, fully accessible to every bearer. Profit denatured from deceit.",
  },
];

const PATH = [
  {
    roman: "I",
    title: "I",
    body: "Name yourself without a registry’s mercy. The true I is not found like an object. It is awakened — and the identifier you hold is yours to carry.",
  },
  {
    roman: "II",
    title: "Why",
    body: "Live the questions now. Motive, method, and honor become visible. Inner untruthfulness ends when the record can no longer flatter you.",
  },
  {
    roman: "III",
    title: "How",
    body: "Sign the work as it happens. Flows, runs, records: an operator publishes a process; participants sign; completed work becomes an indexed provenance asset.",
  },
  {
    roman: "IV",
    title: "Wheee",
    body: "Freedom that is accountable, not abandoned. Self-cure through provenance. Let go the ego; keep the duty. The door was never locked — you may check.",
  },
];

const TIERS = [
  {
    id: "witness",
    name: "Witness",
    fee: "$TBD",
    unit: "US",
    chosen: false,
    body: "Look. Do not take anyone’s word. The public trail is already yours.",
    points: [
      "Inspect public origin records",
      "Query authority state",
      "Read carbon and credit passports",
      "No keys required to see",
    ],
    cta: "Enter as witness",
  },
  {
    id: "sovereign",
    name: "Sovereign",
    fee: "$TBD",
    unit: "US",
    chosen: true,
    body: "You keep the keys. You sign the work. You become capable of being the self you name.",
    points: [
      "Self-sovereign identifier & credentials",
      "Signed workflows — flows, runs, records",
      "Reusable KYC that does not leak the file",
      "Personal authority trail",
      "Fees in dollars through X Money",
    ],
    cta: "Claim sovereignty",
  },
  {
    id: "council",
    name: "Council",
    fee: "$TBD",
    unit: "US",
    chosen: false,
    body: "For houses that must remain accountable to themselves as they make everything else accountable.",
    points: [
      "Organization authority trails",
      "Agent accountability at the act",
      "MRV issuance and retirement",
      "Multi-signer flows & revocation",
      "Priority provenance writes",
    ],
    cta: "Seat the council",
  },
] as const;

const STATS = [
  { value: "~10,000", label: "TPS on Hedera" },
  { value: "3–5s", label: "Absolute finality" },
  { value: "Carbon−", label: "Certified negative" },
  { value: "$0.0001", label: "Average write" },
];

const WITNESSES = [
  {
    quote:
      "We documented the soil once. The credit, the buyer, the auditor — they all read the same trail. I stopped hiring a paperwork office to prove that the land had done its work.",
    name: "Mara Ellison",
    role: "Soil steward · Veteran’s acres",
  },
  {
    quote:
      "I no longer reconstruct a process from inboxes. I query an authority state. The agent acted within a limit that was revoked twelve minutes later. Both facts remain. That is what a court can hold.",
    name: "Julian Okoye",
    role: "Examiner · public ledger",
  },
  {
    quote:
      "They had convinced me the door did not open. Provenance did not set me free; it showed me I had never checked the latch. I keep my credentials. I do not surrender the file.",
    name: "S. Voss",
    role: "Sovereign · bearer of keys",
  },
];

const BOARD = [
  {
    date: "22 Sep",
    href: "https://x.com/Trancesage/status/2102415928772235583",
    text: "Ownership with no responsibility. Management with segmented accountability. Fellowship with all manners of deniability. Providence Through Provenance to work, give the appearance of freedom not taken away even a little bit. With that most work becomes a play.",
  },
  {
    date: "21 Sep",
    href: "https://x.com/Trancesage/status/2102172595655229459",
    text: "More lights within you illuminate, as the less shadows cast upon the gazes you stipulate, accept all as is, less should.",
  },
  {
    date: "21 Sep",
    href: "https://x.com/Trancesage/status/2102168639616979422",
    text: "Garbage in, garbage out; no amount of plausible deniability will overcome the faculty of certainty. Only the immutable proactive provenance of all that goes in, and the process verified, can raise the confidence. Providence Through Provenance.",
  },
  {
    date: "21 Sep",
    href: "https://x.com/Trancesage/status/2102110803985842188",
    text: "The magic of money can be made true, no longer need the intermediary of abuse. The Providence through provenance, peer to peer, of immutable trustless accountings.",
  },
  {
    date: "19 Sep",
    href: "https://x.com/Trancesage/status/2101342391961596357",
    text: "Vaccinate through provenance. Economic Anonymous. I becomes why, why becomes how, how becomes Wheee.",
  },
  {
    date: "19 Sep",
    href: "https://x.com/Trancesage/status/2101330755183919281",
    text: "Egonomic Anonymous. Self cure through provenance.",
  },
] as const;

const LOVE_ACCOUNT = import.meta.env.VITE_HEDERA_ACCOUNT_ID || "0.0.527206";
const TOKEN = import.meta.env.VITE_CLUB_TOKEN_ID || "0.0.4432765";
const X_HANDLE = import.meta.env.VITE_X_HANDLE || "trancesage";
const LEDGER_KEY = "egonomic-ledger";

type LedgerEntry = {
  email: string;
  message: string;
  role: (typeof TIERS)[number]["id"];
  at: string;
  quote: string;
  quoteUrl: string;
  dmUrl: string;
};

function Home() {
  return (
    <div className="relative min-h-dvh text-fg">
      <SiteNav />
      <main>
        <Hero />
        <Thesis />
        <Provenance />
        <Path />
        <Tiers />
        <Give />
        <Witnesses />
        <Board />
        <LedgerForm />
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-fg">
          <HashgraphMark className="size-7" />
          <span className="font-display text-lg tracking-tight">Egonomic Anonymous</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-fg">
              {item.label}
            </a>
          ))}
          <a
            href="#ledger"
            className="rounded-full bg-primary px-4 py-2 font-medium text-primary-fg"
          >
            Begin the ledger
          </a>
        </nav>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md border border-border text-fg md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-3 text-muted"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#ledger"
            className="mt-1 rounded-full bg-primary px-4 py-3 text-center font-medium text-primary-fg"
            onClick={() => setOpen(false)}
          >
            Begin the ledger
          </a>
        </nav>
      ) : null}
    </header>
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-xs tracking-widest text-subtle uppercase">{children}</p>;
}

function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
      <div className="lg:col-span-7">
        <div className="mb-6 flex items-center gap-2">
          <img
            src="/hedera-coin.webp"
            alt="Hedera Hashgraph coin with white lightning breaking out of the gold H"
            className="sky-blend aspect-square w-32 shrink-0 object-contain sm:w-40"
          />
          <img
            src="/seal-rays.webp?v=4"
            alt="Egonomic Anonymous seal with gold rays, dollar club Hbar, hashtag legomiego, Providence Through Provenance"
            className="h-auto w-40 shrink-0 sm:w-52"
          />
        </div>
        <Eyebrow>Secure · Transparent · Fair</Eyebrow>
        <h1 className="mt-4 font-display text-5xl leading-none font-medium tracking-tight text-fg sm:text-7xl">
          The Providence Through Provenance
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          You do not find the self as an object hidden in a drawer. You become capable of being
          it — and the record of that becoming can be proven.
        </p>
        <p className="mt-4 max-w-xl text-muted">
          Egonomic Anonymous returns the prerogative of counting honestly: origin, authority,
          honor. Built on Hedera’s public clock and DOVU’s inspectable workflows. Fees settled
          in coins of <span className="text-fg">$Club Hbar</span>.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#ledger"
            className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-fg"
          >
            Begin the ledger
          </a>
          <a
            href="#thesis"
            className="rounded-full border border-border px-5 py-3 text-sm text-fg"
          >
            Read the thesis
          </a>
        </div>
        <p className="mt-8 font-mono text-xs text-subtle">
          Hedera token {TOKEN} · $Club Hbar · Self-sovereignty
        </p>
      </div>
      <aside className="rounded-xl border border-border bg-surface p-5 lg:col-span-5">
        <p className="font-mono text-xs tracking-wide text-subtle uppercase">
          Authority trail · illustrative
        </p>
        <p className="mt-2 font-display text-2xl">Nobody has to take your word for it.</p>
        <ol className="mt-6 space-y-4">
          {TRAIL.map((step) => (
            <li key={step.n} className="grid grid-cols-[3rem_1fr] gap-3 border-t border-border pt-4">
              <span className="font-mono text-xs text-subtle">{step.n}</span>
              <div>
                <p className="text-sm font-medium text-fg">{step.title}</p>
                <p className="text-sm text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-subtle">
          Written by neither party. Checked by anyone. Anchored on Hedera — 3–5 second finality,
          carbon-negative, ~$0.0001 a write.
        </p>
      </aside>
    </section>
  );
}

function Thesis() {
  const cards = [
    {
      title: "A common clock",
      body: "Hedera Consensus Service records that an event happened, when, and in what order. Absolute finality in seconds. Council-governed. Carbon-negative. Not another database — a public proof layer.",
    },
    {
      title: "Evidence, not PDFs",
      body: "DOVU turns each signed step into a queryable trail: who did what, who allowed it, under which authority, and whether that authority still stands. The buyer inspects; they do not take a registry’s word.",
    },
    {
      title: "The keys remain yours",
      body: "Decentralized identifiers and verifiable credentials travel with you. A second institution validates without collecting the file again. You are not a dossier. You are a lineage that can be proven.",
    },
  ];

  return (
    <section id="thesis" className="border-t border-border bg-bg/25">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Eyebrow>The thesis</Eyebrow>
        <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          Bureaucracy is the cost of not knowing.
        </h2>
        <p className="mt-5 max-w-2xl text-muted">
          Not knowing where a thing came from, and who was allowed to move it. Shared,
          timestamped origin records replace stacked paperwork, bilateral checks, and
          after-the-fact reconciliation. That is providence through provenance: provision that
          does not wait on another filing.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-lg border border-border bg-bg p-5">
              <h3 className="font-display text-2xl">{card.title}</h3>
              <p className="mt-3 text-sm text-muted">{card.body}</p>
            </article>
          ))}
        </div>
        <blockquote className="mt-10 max-w-3xl border-l border-primary pl-5">
          <p className="font-display text-2xl italic text-fg">
            “There is a way of becoming that does not wait for a clerk. You keep the questions.
            You keep the keys.”
          </p>
          <footer className="mt-3 font-mono text-xs text-subtle">
            Egonomic Anonymous · from the open thesis
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

function Provenance() {
  return (
    <section id="provenance" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <Eyebrow>The work</Eyebrow>
      <h2 className="mt-3 font-display text-4xl sm:text-5xl">What provenance restores.</h2>
      <p className="mt-5 max-w-2xl text-muted">
        Hedera supplies the public proof layer. DOVU turns workflows into searchable evidence.
        Together they shrink the cost of proving — they do not write the law. Garbage in remains
        garbage on-chain unless physical checks, credentials, and human sign-off are part of the
        flow.
      </p>
      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
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

function Path() {
  return (
    <section id="path" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Eyebrow>The path</Eyebrow>
        <h2 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">
          I becomes why, why becomes how, how becomes Wheee.
        </h2>
        <p className="mt-5 max-w-2xl text-muted">
          Vaccinate through provenance. Economic anonymous — not as disappearance, but as the
          end of being qualified only by numbers in someone else’s account. You remain. The cage
          does not.
        </p>
        <img
          src="/path.jpg"
          alt="A figure on a gold road toward a Hedera gate, with cubes marked dollar hbar, dollar dovu, and trust"
          className="sky-blend mt-10 aspect-square w-full max-w-56 rounded-full object-cover"
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {PATH.map((step) => (
            <li key={step.roman} className="rounded-lg border border-border bg-surface p-5">
              <p className="font-mono text-xs text-subtle">{step.roman}</p>
              <h3 className="mt-2 font-display text-3xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl text-muted">
          Let goodness intent free from don’ts and deaths. Free speak, free act, through
          responsibility, accountability, honors of the duty. Promises kept in perpetuity.
        </p>
      </div>
    </section>
  );
}

function Tiers() {
  return (
    <section id="tiers" className="border-t border-border bg-bg/25">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Eyebrow>The settlement</Eyebrow>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">Fees.</h2>
        <p className="mt-5 max-w-2xl text-muted">
          A season is a cycle of ninety days. Send{"\u00A0\u00A0"}$TBD through X Money to @{X_HANDLE}.
        </p>
        <div className="mt-8 max-w-md text-sm">
          <div className="grid grid-cols-2 gap-3 border-b border-border pb-2 font-mono text-xs tracking-wide text-subtle uppercase">
            <span>Tier</span>
            <span>$</span>
          </div>
          {TIERS.map((tier) => (
            <div key={tier.id} className="grid grid-cols-2 gap-3 border-b border-border py-3">
              <span className="text-fg">{tier.name}</span>
              <span>{tier.fee}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <article
              key={tier.id}
              className={
                tier.chosen
                  ? "rounded-xl border border-primary bg-bg p-5"
                  : "rounded-xl border border-border bg-bg p-5"
              }
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-3xl">{tier.name}</h3>
                {tier.chosen ? (
                  <span className="font-mono text-xs tracking-wide text-subtle uppercase">
                    Chosen
                  </span>
                ) : null}
              </div>
              <p className="mt-4 font-display text-4xl">{tier.fee}</p>
              <p className="mt-3 text-sm text-muted">{tier.body}</p>
              <ul className="mt-4 space-y-2 text-sm text-fg">
                {tier.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={`https://x.com/${X_HANDLE}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg"
                >
                  Send{"\u00A0\u00A0"}{tier.fee} with X Money
                </a>
                <a
                  href="#ledger"
                  className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-fg"
                >
                  {tier.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-fg">
          Send{"\u00A0\u00A0"}$TBD through X Money to @{X_HANDLE}.
        </p>
        <p className="mt-4 font-mono text-xs text-subtle">
          Hedera Token Service · $Club Hbar · {TOKEN} ·{" "}
          <a
            className="text-fg underline decoration-border underline-offset-4"
            href="https://hashscan.io/mainnet/token/0.0.4432765"
            target="_blank"
            rel="noreferrer"
          >
            View on HashScan
          </a>
        </p>
      </div>
    </section>
  );
}

function Give() {
  return (
    <section id="give" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <img
        src="/club-hbar.webp"
        alt="Gold pin stamped Club H Bar"
        className="sky-blend mb-8 w-full max-w-40 object-contain"
      />
      <p className="max-w-3xl font-display text-3xl text-fg sm:text-4xl">
        Send Club Hbar {TOKEN} Coins to Clubhbar.ℏ {LOVE_ACCOUNT}
      </p>
      <p className="mt-5 max-w-3xl text-lg text-muted">
        Lets The Practice Counting Coins In Collective to Fuel the Project: Providence Through
        Provenance.
      </p>
    </section>
  );
}

function Witnesses() {
  return (
    <section id="witnesses" className="border-t border-border bg-bg/25">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Eyebrow>Witnesses</Eyebrow>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">You must change your life.</h2>
        <p className="mt-5 max-w-2xl text-muted">
          Not as despair — as truth. The moment you stop pretending, something becomes possible.
          The false centre loosens. A deeper individuality begins to emerge, and it can be proven.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {WITNESSES.map((item) => (
            <figure key={item.name} className="rounded-lg border border-border bg-bg p-5">
              <blockquote className="text-sm text-muted">“{item.quote}”</blockquote>
              <figcaption className="mt-5">
                <p className="text-sm text-fg">{item.name}</p>
                <p className="font-mono text-xs text-subtle">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Board() {
  return (
    <section id="board" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>The X board</Eyebrow>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Writings from @Trancesage.</h2>
        </div>
        <a
          href={`https://x.com/${X_HANDLE}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border px-4 py-2 text-sm text-fg"
        >
          Open on X
        </a>
      </div>
      <p className="mt-5 max-w-2xl text-muted">
        The public board is the account. These are the recent lines, kept here so the thesis can
        be read without leaving the page.
      </p>
      <ol className="mt-10 divide-y divide-border border-y border-border">
        {BOARD.map((post) => (
          <li key={post.href}>
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="grid gap-2 py-5 sm:grid-cols-[5rem_1fr] sm:gap-6"
            >
              <time className="font-mono text-xs text-subtle">{post.date}</time>
              <p className="text-fg">{post.text}</p>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function LedgerForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState<(typeof TIERS)[number]["id"]>("sovereign");
  const [saved, setSaved] = useState<LedgerEntry | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LEDGER_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as LedgerEntry;
      if (parsed?.email && parsed.role && parsed.quote && parsed.dmUrl) setSaved(parsed);
    } catch {
      /* ignore a corrupt local note */
    }
  }, []);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = email.trim();
    const note = message.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next)) {
      setError("Leave a real address. We will not stack it into a dossier.");
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
    if (company.trim()) return;
    const result = prepareLedger({ email: next, message: note, role });
    window.open(result.dmUrl, "_blank", "noopener,noreferrer");
    const entry: LedgerEntry = {
      email: next,
      message: note,
      role,
      at: new Date().toISOString(),
      quote: result.quote.text,
      quoteUrl: result.quote.url,
      dmUrl: result.dmUrl,
    };
    localStorage.setItem(LEDGER_KEY, JSON.stringify(entry));
    setSaved(entry);
    setError("");
  }

  const tier = TIERS.find((item) => item.id === (saved?.role ?? role)) ?? TIERS[1];

  return (
    <section id="ledger" className="border-t border-border bg-bg/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div>
          <Eyebrow>The invitation</Eyebrow>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">
            Write your name toward the next season.
          </h2>
          <p className="mt-5 text-muted">
            Leave an address and a message. Joining opens a direct message to @Trancesage with
            your note already written — you send it from your own X account. The address is not
            sold and not stacked into a dossier.
          </p>
          <div className="mt-6 max-w-md text-sm">
            <div className="grid grid-cols-2 gap-3 border-b border-border pb-2 font-mono text-xs tracking-wide text-subtle uppercase">
              <span>Tier</span>
              <span>$</span>
            </div>
            {TIERS.map((tier) => (
              <div key={tier.id} className="grid grid-cols-2 gap-3 border-b border-border py-2 text-fg">
                <span>{tier.name}</span>
                <span>{tier.fee}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-fg">Send{"\u00A0\u00A0"}$TBD through X Money to @{X_HANDLE}.</p>
        </div>
        {saved ? (
          <Receipt
            saved={saved}
            tierName={tier.name}
            fee={`${tier.fee} ${tier.unit}`}
            onReset={() => {
              localStorage.removeItem(LEDGER_KEY);
              setSaved(null);
              setMessage("");
            }}
          />
        ) : (
          <form onSubmit={onSubmit} className="rounded-xl border border-border bg-bg p-6">
            <label htmlFor="ledger-email" className="text-sm text-muted">
              Email
            </label>
            <input
              id="ledger-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-3 text-fg outline-none focus:border-ring"
              placeholder="you@domain"
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
            <label className="absolute -left-[9999px]" aria-hidden="true">
              Company
              <input
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </label>
            <fieldset className="mt-5">
              <legend className="text-sm text-muted">Seat</legend>
              <div className="mt-2 grid gap-2">
                {TIERS.map((item) => (
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
            {error ? <p className="mt-3 text-sm text-muted">{error}</p> : null}
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg"
            >
              Send to @Trancesage
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Receipt({
  saved,
  tierName,
  fee,
  onReset,
}: {
  saved: LedgerEntry;
  tierName: string;
  fee: string;
  onReset: () => void;
}) {
  return (
    <div className="rounded-xl border border-primary bg-bg p-6">
      <p className="font-mono text-xs tracking-wide text-subtle uppercase">Receipt</p>
      <h3 className="mt-2 font-display text-3xl">You are written as a bearer.</h3>
      <p className="mt-3 text-sm text-muted">
        {saved.email} · {tierName} · {fee}
      </p>
      <p className="mt-4 text-sm text-fg">{saved.message}</p>
      <blockquote className="mt-5 border-l border-primary pl-4">
        <p className="font-display text-xl italic">“{saved.quote}”</p>
        <footer className="mt-2 font-mono text-xs text-subtle">
          Quote of the day ·{" "}
          <a href={saved.quoteUrl} className="text-fg" target="_blank" rel="noreferrer">
            @Trancesage
          </a>
        </footer>
      </blockquote>
      <p className="mt-4 text-sm text-muted">
        Your note is addressed to @Trancesage. Send it in the X window that opened. It arrives
        under Messages, in Requests, until it is accepted. If the window did not open, use the
        link.
      </p>
      <a
        href={saved.dmUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg"
      >
        Open the message to @Trancesage
      </a>
      <button
        type="button"
        className="mt-6 block text-sm text-fg underline decoration-border underline-offset-4"
        onClick={onReset}
      >
        Write a different name
      </button>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="https://egonomicanonymous.live" className="font-display text-2xl">
            EgonomicAnonymous.live
          </a>
          <p className="mt-2 max-w-md text-sm text-muted">
            The Providence Through Provenance. Empowering self-sovereignty. Secure, transparent,
            and fair.
          </p>
          <p className="mt-3 font-mono text-xs text-subtle">#LeGoMiEgo</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <a href="#give" className="hover:text-fg">
            Coins
          </a>
          <a href="https://hedera.com" className="hover:text-fg" target="_blank" rel="noreferrer">
            Hedera
          </a>
          <a href="#board" className="hover:text-fg">
            X board
          </a>
          <a href="https://dovu.ai" className="hover:text-fg" target="_blank" rel="noreferrer">
            DOVU
          </a>
          <a href="#ledger" className="hover:text-fg">
            Ledger
          </a>
          <a
            href={`https://x.com/${X_HANDLE}`}
            className="hover:text-fg"
            target="_blank"
            rel="noreferrer"
          >
            @{X_HANDLE}
          </a>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-10 text-xs text-subtle sm:px-8">
        Rails drawn from Hedera and DOVU; voice from the open writings of{" "}
        <a href={`https://x.com/${X_HANDLE}`} className="text-muted">
          @{X_HANDLE}
        </a>
        , kept as an X post board. Fees through X Money. Gifts in $Club Hbar. Ledgers do not repeal law. They
        shrink the cost of proving compliance. Isolated pilots recreate the mess they were meant
        to replace.
      </p>
    </footer>
  );
}
