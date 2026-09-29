import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { prepareLedger } from "@/lib/ledger";

export const Route = createFileRoute("/")({ component: Home });

const SCENARIOS = [
  {
    id: "credit",
    label: "The credit",
    steps: [
      {
        n: "01",
        title: "Origin",
        body: "Soil carbon, plot 14-N — signed",
        why: "The plot, the method, and the signer are bound before a credit exists. Origin is not a story told later to fit the sale.",
      },
      {
        n: "02",
        title: "Allowed",
        body: "Priya Morgan · limit 5,000 $Trust",
        why: "Authority is a grant with a ceiling, not a blank key. She may issue up to the limit. She may not invent a larger one.",
      },
      {
        n: "03",
        title: "Action",
        body: "Atlas agent issued the credit",
        why: "The agent acted inside that grant. The act is timestamped with the permission it used. Software does not get a quieter standard than a person.",
      },
      {
        n: "04",
        title: "Revoke",
        body: "Limit closed. The history remains.",
        why: "Closing the limit does not erase the credit. Both facts stay: what was allowed, and when it stopped being allowed.",
      },
    ],
    matters:
      "Without the trail, the buyer takes a registry’s word, and the registry takes Priya’s. With it, anyone reads the same order of events. A dispute becomes a query, not a reconstruction from inboxes.",
  },
  {
    id: "shipment",
    label: "The shipment",
    steps: [
      {
        n: "01",
        title: "Origin",
        body: "Grain lot, silo 7 — weighed at the gate",
        why: "Weight, lot, and the hand that signed are written once. A later invoice cannot quietly become the origin.",
      },
      {
        n: "02",
        title: "Allowed",
        body: "Harbor clerk · 48-hour release, this buyer only",
        why: "The clerk may release this lot, in this window, to this buyer. Not reprice it. Not substitute another silo.",
      },
      {
        n: "03",
        title: "Action",
        body: "Released. Buyer and seller read the same line.",
        why: "The shipment and the permission travel together. The buyer does not wait on a PDF from the seller’s office.",
      },
      {
        n: "04",
        title: "Revoke",
        body: "Window closed at dawn. The release stands.",
        why: "After the window, a second release against the same lot cannot be backdated. What already moved is not undone.",
      },
    ],
    matters:
      "A shipment argued from inboxes is a negotiation. A shipment with one append-only trail is a fact both sides already share. Proving compliance costs as much as reading — not as much as hiring another office to retell it.",
  },
  {
    id: "credential",
    label: "The credential",
    steps: [
      {
        n: "01",
        title: "Origin",
        body: "S. Voss · credential issued, keys kept",
        why: "The credential is issued once and stays with the bearer. A second institution does not become the new origin of the person.",
      },
      {
        n: "02",
        title: "Allowed",
        body: "The house may check validity. It may not take the file.",
        why: "Permission to inspect is not permission to collect. The grant names what may be asked, and nothing more.",
      },
      {
        n: "03",
        title: "Action",
        body: "Checked. The door opens. The dossier stays.",
        why: "The check is written at the moment it happens. Nobody reconstructs, later, what was shown and what was withheld.",
      },
      {
        n: "04",
        title: "Revoke",
        body: "Withdrawn twelve minutes later. The check remains.",
        why: "The past check stands. A check after the withdrawal fails. Both are on the trail. The file was never surrendered.",
      },
    ],
    matters:
      "Repeat proof is a failure of memory. The trail remembers the grant without hoarding the person. You are not a dossier. You are a lineage that can be proven — and closed.",
  },
] as const;

const WORK = [
  {
    title: "Demo",
    body: "Sealroom. Notarize my stuff, my actions. Timestamped, immutably recorded in NFTs.",
    href: "/demo",
  },
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
  { value: "$0.001", label: "Average write" },
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
    href: "https://x.com/Trancesage/status/2101863844096233593",
    text: "Unless the essence of your time is omnipotented in veil, just enough to guard rail you against the very freedom turns into freedumb. The Providence Through Provenance.",
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
    href: "https://x.com/Trancesage/status/2101343345402351857",
    text: "I am helpless but not hopeless and really dangerous. Providence Through Provenance, back to business of goods and honors.",
  },
  {
    date: "19 Sep",
    href: "https://x.com/Trancesage/status/2101342391961596357",
    text: "Vaccinate through provenance. Egonomic Anonymous. I becomes why, why becomes how, how becomes Wheee. Providence Through Provenance.",
  },
  {
    date: "19 Sep",
    href: "https://x.com/Trancesage/status/2101326419745812780",
    text: "This time lets make it self accountable, responsible every words uttered. Providence Through Provenance, promises kept in perpetuity.",
  },
  {
    date: "17 Sep",
    href: "https://x.com/Trancesage/status/2100683502572146843",
    text: "The economy became egonomy? Lets learn to count and account accurately first. Providence Through Provenance.",
  },
] as const;

const LOVE_ACCOUNT = import.meta.env.VITE_HEDERA_ACCOUNT_ID || "0.0.527206";
const TOKEN = "0.0.10607411";
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
        <HeroMarks />
        <Opening />
        <Hero />
        <Thesis />
        <Provenance />
        <Refrain where="middle" />
        <Path />
        <Give />
        <Witnesses />
        <Board />
        <LedgerForm />
        <Refrain where="end" />
      </main>
      <SiteFooter />
    </div>
  );
}

function HeroMarks() {
  const marks = [
    {
      src: "/hedera-coin.webp",
      href: "https://hedera.com",
      alt: "Hedera Hashgraph coin with white lightning breaking out of the gold H",
      square: true,
    },
    {
      src: "/seal-rays.webp?v=5",
      href: `https://x.com/${X_HANDLE}`,
      alt: "Egonomic Anonymous seal with gold rays, dollar club Hbar, hashtag legomiego, Providence Through Provenance",
      square: false,
    },
    {
      src: "/hederica-seal.webp",
      href: "https://hol.org",
      alt: "Egonomic Anonymous seal: Hederica, hashtag legomiego, at Trancesage, Ignoramius Rokedamius Maximus",
      square: false,
    },
    {
      src: "/hederica-mark.webp",
      href: "https://dovu.ai",
      alt: "Hederica and hashtag legomiego in gold, at Trancesage, inside a purple and pink frame",
      square: false,
    },
  ];

  return (
    <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 pt-6 sm:px-8">
      {marks.map((mark) => (
        <a
          key={mark.src}
          href={mark.href}
          target="_blank"
          rel="noreferrer"
          className="w-0 min-w-0 flex-1"
        >
          <img
            src={mark.src}
            alt={mark.alt}
            className={
              mark.square
                ? "sky-blend aspect-square w-full object-contain"
                : "h-auto w-full object-contain"
            }
          />
        </a>
      ))}
    </div>
  );
}

function Opening() {
  return (
    <section id="opening" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Eyebrow>From @Trancesage</Eyebrow>
        <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          They printed the money. I am keeping the book.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Gold and silver were already money: durable, scarce. A bank then charged interest on paper
          it had just invented. The price stopped telling the truth. I mean to stand where a state
          stands.
        </p>
        <p className="mt-5 max-w-2xl text-muted">
          That book is Providence Through Provenance: an origin no one can rewrite. A public ledger.
          AI cheap enough to audit the powerful.
        </p>
        <div className="mt-10 max-w-3xl">
          <h3 className="font-display text-2xl">If it cannot be shown, it is only a story.</h3>
          <p className="mt-3 text-muted">
            Claim, title, price, transfer — a trail neither of us owns, on Hedera. Cheap intelligence
            makes equal standing a query, not a speech. Interest paid out returns, or the books
            drain.
          </p>
          <p className="mt-3 text-muted">
            Menger, Mises, Hume, Diamond’s <span className="text-fg">Collapse</span> — arguments I
            record, not a model I invent.
          </p>
        </div>
        <p className="mt-10 max-w-3xl border-l border-primary pl-5 font-display text-2xl leading-snug text-fg">
          I have not beaten the printer. #LeGoMiEgo marks the unfinished work.
        </p>
        <p className="mt-6 font-mono text-xs text-subtle">
          <a
            href={`https://x.com/${X_HANDLE}`}
            target="_blank"
            rel="noreferrer"
            className="text-fg underline decoration-border underline-offset-4"
          >
            @{X_HANDLE}
          </a>
        </p>
      </div>
    </section>
  );
}

function Refrain({ where }: { where: "middle" | "end" }) {
  const end = where === "end";
  return (
    <section
      id={end ? "recall-end" : "recall"}
      className="border-y border-border bg-bg/25"
      aria-label={end ? "The account, a last time" : "The account, again"}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Eyebrow>{end ? "Once more, so it stays" : "Again, with the detail"}</Eyebrow>
        <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          They printed the money. I am keeping the book.
        </h2>
        {end ? (
          <p className="mt-5 max-w-2xl text-lg text-muted">
            You have met this line. Meet it again. A thing said once is a slogan. A thing said
            three times, with the embarrassing part left in, is how a person remembers.
          </p>
        ) : null}
        <p className="mt-5 max-w-2xl text-muted">
          {end
            ? "Gold and silver were money before anyone booked a room to announce them. The bank invented the paper, then charged rent for the invention. I would applaud. It was my purchasing power leaving by the side door."
            : "Gold and silver did the job without a committee, a logo, or a man in a lanyard explaining the logo. Then a bank charged interest on paper it had printed that morning. I have seen restaurant bills with more shame, and the restaurant at least fed me. The price stopped telling the truth and then asked to be trusted. That is not a market. That is a witness coaching itself."}
        </p>
        <p className="mt-3 max-w-2xl text-muted">
          {end
            ? "Providence Through Provenance is the name, not a spell. Foresight you can check. An origin that does not grow new memories after you sign. The ledger is public. A private book is a diary, and diaries are for crushes."
            : "That book is Providence Through Provenance: an origin no one gets to edit after the sale, including me, which is the annoying part. A public ledger. A private one is a diary with a lock and a better lawyer. I am not here for the feelings, and the lawyer can wait in the hall."}
        </p>
        <p className="mt-3 max-w-2xl text-muted">
          {end
            ? "The intelligence does not tire, does not golf, and does not lose the file in a merger. Auditing the powerful stops being a career. It becomes a Tuesday."
            : "AI cheap enough that auditing the powerful is no longer a profession with a lobby, a retreat, and a tote bag. It is a Tuesday. Tuesdays do not take a percentage."}
        </p>
        <h3 className="mt-10 font-display text-2xl">If it cannot be shown, it is only a story.</h3>
        <p className="mt-3 max-w-2xl text-muted">
          {end
            ? "Claim, title, price, transfer. I have heard enough stories from people with letterhead. The trail sits on Hedera, owned by neither of us. A clerk who must be believed is a confident folder. Interest that only leaves is not a system. It is a hole with a lobbyist."
            : "Claim, title, price, transfer — a trail neither of us owns, on Hedera. A clerk you must believe is a folder with opinions and a pension. I have nothing against the pension. I have something against the opinions. Cheap intelligence makes equal standing a query, not a speech with a microphone. Interest paid out returns, or the books are a drain with excellent manners."}
        </p>
        <p className="mt-3 max-w-2xl text-muted">
          {end
            ? "Menger said where money came from. Mises said what happens when no one can calculate. Hume and Diamond’s Collapse brought the warning. They did the thinking. I am only writing it where a footnote cannot wander off."
            : "Menger, Mises, Hume, Diamond’s Collapse. They did the hard thinking. I am nailing it to the wall so it cannot retire into a footnote, which is where a good argument goes to be praised, cited, and ignored."}
        </p>
        <p className="mt-10 max-w-3xl border-l border-primary pl-5 font-display text-2xl leading-snug text-fg">
          {end
            ? "I have not beaten the printer. Anyone who says they have is selling you a newer printer. #LeGoMiEgo marks the work while the ink is wet. If one line survives the walk to the door, let it be the first."
            : "I have not beaten the printer. It had a head start, better stationery, and a building named after the confidence. The building can stay. The book is coming with me. #LeGoMiEgo marks the unfinished work, which is a polite way to say I am not done annoying it."}
        </p>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-xs tracking-widest text-subtle uppercase">{children}</p>;
}

function Hero() {
  const [scenarioId, setScenarioId] = useState<(typeof SCENARIOS)[number]["id"]>("credit");
  const scenario = SCENARIOS.find((item) => item.id === scenarioId) ?? SCENARIOS[0];

  return (
    <section id="top" className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
      <div className="lg:col-span-7">
        <Eyebrow>Secure · Transparent · Fair</Eyebrow>
        <h1 className="mt-4 font-display text-5xl leading-none font-medium tracking-tight text-fg sm:text-7xl">
          The Providence Through Provenance
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          I got tired of a self filed in someone else’s cabinet. If I became it, the record can show
          it.
        </p>
        <p className="mt-4 max-w-xl text-muted">
          I built Egonomic Anonymous to count origin, authority, and honor in the open. Hedera keeps
          the clock. DOVU keeps the work inspectable. Fees settle in{" "}
          <span className="text-fg">$Trust</span>.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#ledger"
            className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-fg"
          >
            Begin the ledger
          </a>
          <a
            href="/demo"
            className="rounded-full border border-border px-5 py-3 text-sm text-fg"
          >
            Sealroom demo
          </a>
          <a
            href="#thesis"
            className="rounded-full border border-border px-5 py-3 text-sm text-fg"
          >
            Read the thesis
          </a>
        </div>
        <p className="mt-8 font-mono text-xs text-subtle">
          Hedera token {TOKEN} · $Trust · Self-sovereignty
        </p>
      </div>
      <aside className="rounded-xl border border-border bg-surface p-5 lg:col-span-5">
        <p className="font-mono text-xs tracking-wide text-subtle uppercase">
          Authority trail · illustrative
        </p>
        <p className="mt-2 font-display text-2xl">Nobody has to take your word for it.</p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Example trails">
          {SCENARIOS.map((item) => {
            const selected = item.id === scenario.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setScenarioId(item.id)}
                className={
                  selected
                    ? "rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
                    : "rounded-full border border-border px-3 py-2 text-sm text-fg"
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <ol className="mt-6 space-y-4">
          {scenario.steps.map((step) => (
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
          {scenario.matters}
        </p>
        <p className="mt-3 text-sm text-subtle">
          Written by neither party. Checked by anyone. Anchored on Hedera — 3–5 second finality,
          carbon-negative, ~$0.001 a write.
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
        {WORK.map((item) => {
          const card = (
            <>
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </>
          );
          if ("href" in item && item.href) {
            return (
              <a
                key={item.title}
                href={item.href}
                className="bg-[#6e6c66] p-5 text-[#f3f0e8] transition-colors hover:bg-[#7d7b74] sm:col-span-2"
              >
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-[#e7e4dc]">{item.body}</p>
              </a>
            );
          }
          return (
            <article key={item.title} className="bg-bg p-5">
              {card}
            </article>
          );
        })}
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
          Vaccinate through provenance. Egonomic anonymous — not as disappearance, but as the
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

function Give() {
  return (
    <section id="give" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <h2 className="font-display text-4xl text-fg sm:text-5xl">Invitation:</h2>
      <div className="mt-6 flex items-center gap-4 sm:gap-8">
        <a
          href="https://discord.gg/club-hbar"
          target="_blank"
          rel="noreferrer"
          aria-label="Club H Bar on Discord"
          className="shrink-0"
        >
          <img
            src="/club-hbar.webp"
            alt="Gold pin stamped Club H Bar"
            className="sky-blend w-28 object-contain sm:w-40"
          />
        </a>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <p className="font-mono text-[11px] tracking-widest text-subtle uppercase">
            Purchase $Trust
          </p>
          <a
            href="https://www.hashpack.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border bg-surface/70 px-3 py-2.5"
          >
            <img
              src="/hashpack-mark.png"
              alt=""
              className="h-11 w-11 shrink-0 rounded-md object-cover"
            />
            <span className="min-w-0">
              <span className="block text-sm text-fg">HashPack</span>
              <span className="block truncate font-mono text-[11px] text-muted">www.hashpack.app</span>
            </span>
          </a>
          <a
            href="https://www.saucerswap.finance/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border bg-surface/70 px-3 py-2.5"
          >
            <img
              src="/saucerswap-logo.png"
              alt=""
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
            <span className="min-w-0">
              <span className="block text-sm text-fg">SaucerSwap</span>
              <span className="block truncate font-mono text-[11px] text-muted">
                www.saucerswap.finance
              </span>
            </span>
          </a>
        </div>
      </div>
      <p className="max-w-3xl text-lg leading-snug text-fg">
        One Coin Represents One Acknowledgement In Sovereignty, One Care In Community, One
        Determination In Count Of{"\u00A0\u00A0"}Humanity Back To Rightful Providence.
      </p>
      <p className="mt-5 max-w-3xl text-lg leading-snug text-fg sm:text-xl">
        Send $Trust {TOKEN} Coins to{" "}
        <span className="whitespace-nowrap font-sans tracking-tighter">ClubHbar.ℏ</span> {LOVE_ACCOUNT}
      </p>
      <p className="mt-5 max-w-3xl text-lg text-muted">
        Lets Start The Exercise Counting{"\u00A0\u00A0"}Courage To Change.
      </p>
      <p className="mt-5 max-w-3xl text-lg text-fg">Fuel The Project,</p>
      <p className="mt-3 whitespace-nowrap font-display text-[clamp(0.95rem,4.1vw,2.75rem)] leading-none text-fg">
        The Providence Through Provenance
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
        The public board is the account. Only the posts and replies on Providence Through Provenance.
      </p>
      <p className="mt-4">
        <a href="/board" className="text-sm text-fg underline decoration-border underline-offset-4">
          See this week's board →
        </a>
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
    const next = email.trim().replace(/^@+/, "");
    const note = message.trim();
    if (!/^[A-Za-z0-9_]{1,15}$/.test(next)) {
      setError("Leave a real X tag.");
      return;
    }
    const tag = `@${next}`;
    if (note.length < 2) {
      setError("Leave a message. A blank note cannot choose a line.");
      return;
    }
    if (note.length > 2000) {
      setError("Keep the message under 2,000 characters.");
      return;
    }
    if (company.trim()) return;
    const result = prepareLedger({ email: tag, message: note, role });
    window.open(result.dmUrl, "_blank", "noopener,noreferrer");
    const entry: LedgerEntry = {
      email: tag,
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
            Leave an X tag and a message. Joining opens a direct message to @Trancesage with
            your note already written — you send it from your own X account. The tag is not
            sold and not stacked into a dossier.
          </p>
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
            <label htmlFor="ledger-tag" className="text-sm text-muted">
              X tag
            </label>
            <input
              id="ledger-tag"
              type="text"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
