export const HANDLE = "trancesage";
export const RECIPIENT_ID = "363356784";
export const TRUST_TOKEN = "0.0.10607411";
export const CLUB_ACCOUNT = "0.0.527206";
export const LEDGER_KEY = "ea-ledger-note";

export const MARKS = [
  {
    href: "https://hedera.com",
    src: "/hedera-coin.webp",
    alt: "Hedera Hashgraph coin with white lightning breaking out of the gold H",
  },
  {
    href: "https://x.com/trancesage",
    src: "/seal-rays.webp",
    alt: "Egonomic Anonymous seal with gold rays, dollar club Hbar, hashtag legomiego, Providence Through Provenance",
  },
  {
    href: "https://hol.org",
    src: "/hederica-seal.webp",
    alt: "Egonomic Anonymous seal: Hederica, hashtag legomiego, at Trancesage, Ignoramius Rokedamius Maximus",
  },
  {
    href: "https://dovu.ai",
    src: "/hederica-mark.webp",
    alt: "Hederica and hashtag legomiego in gold, at Trancesage, inside a purple and pink frame",
  },
] as const;

export type TrailStep = { n: string; title: string; body: string; why: string };
export type Trail = { id: string; label: string; steps: TrailStep[]; matters: string };

export const TRAILS: Trail[] = [
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
];

export const FLOORS = [
  { n: "01", title: "Floor", body: "Nobody's survival is a bargaining chip. A small basket, funded in the open, not by a silent print." },
  { n: "02", title: "Mint", body: "A scarce public meter. It does not stretch in secret. Seigniorage is a listed price." },
  { n: "03", title: "Issue", body: "Equal facility on the same rail. Named credit is not money at par." },
  { n: "04", title: "Tape", body: "One append-only ledger. If it cannot be shown, it is not policy." },
  { n: "05", title: "Residual", body: "After the floor and the risk charge, the rest is yours. That is profit. Confiscating it does not make the books fair." },
];

/** Live eight-layer board and the stack contrast. Bodies state the operational stack. */
export const LAYER_BOARD = [
  {
    id: "01",
    name: "Floor",
    aka: "UBI + basic basket",
    body: "A mandatory public floor, so nobody's survival is a bargaining chip. A small income plus a defined basket: shelter band, staple food, primary care, basic connectivity. Funded by a first claim on preference-economy surplus and by auctioned issuance, not by unbacked printing.",
    fiat: "Welfare is residual. It waits on eligibility, a fiscal fight, and a caseworker.",
  },
  {
    id: "02",
    name: "Mint",
    aka: "One or few base units",
    body: "A scarce public meter that does not stretch in secret. New units follow a hard schedule or a public auction, at a listed seigniorage price. No actor, including the state, mints outside the published rules.",
    fiat: "The base stretches when a facility says so. The reaction is a mandate. The weekend toolkit is discovered in public after the fact.",
  },
  {
    id: "03",
    name: "Issue",
    aka: "Open credit",
    body: "Every actor has equal facility on the same programmable rail: invoices, bonds, escrow, options. Private instruments do not clear at legal-tender par. Checkout converts them into basket units at a dynamic market discount.",
    fiat: "Licensed banks create deposits that clear at par with legal tender. Other paper is credit until a backstop makes it look like cash.",
  },
  {
    id: "04",
    name: "Tape",
    aka: "DLT provenance",
    body: "One append-only ledger records title, minting, liens, agency actions, and revocations. If it cannot be shown, it is not policy.",
    fiat: "Bank books, land registries, courts, and statistics. A valid act can still be unpublished.",
  },
  {
    id: "05",
    name: "Charge",
    aka: "Listed risk price",
    body: "The risk charge is posted beside the discount, not folded inside it. Paid when the instrument is written. Transparent. Not a fee discovered after the fact.",
    fiat: null,
  },
  {
    id: "06",
    name: "Agent",
    aka: "Public-good agency",
    body: "Peer agents watch the ledger and carry mandated public duties: disburse the floor, flag basket arbitrage, catch a double mint. Every act leaves an audit trail. No privileged mint. No unsupervised vote.",
    fiat: "Offices with discretion. Audit is periodic. In a crisis the office can rewrite the mint.",
  },
  {
    id: "07",
    name: "Thin",
    aka: "Honest books",
    body: "Width is information. No quiet club, no emergency print, no frozen official rate. A book you cannot read is not a rule.",
    fiat: null,
  },
  {
    id: "08",
    name: "Desert",
    aka: "Residuals",
    body: "Private profit and market ambition sit on the floor. Residuals are owned and tradable after the transparent risk charge and the floor contribution.",
    fiat: "After-tax surplus, then occasional socialization of the tail. The charge arrives late.",
  },
] as const;

export const WORK = [
  { title: "One timeline, many auditors", body: "A shipment, credit, or identity assertion is written once. Authorized parties see the same append-only history instead of reconciling local copies." },
  { title: "Authority that can be revoked", body: "Who was allowed to act, in which role, during which window, and whether that grant was later withdrawn becomes public, queryable state. The past is not erased." },
  { title: "Identity that travels", body: "Credentials reusable across issuance, trade, and collateral. Repeat KYC is a failure of memory. We remember without hoarding the file." },
  { title: "Passports for things", body: "Origin, quality, certificates, and due-diligence events bound to a decentralized identifier. Regulators inspect a product without a central clerk." },
  { title: "Agents, accountable at the act", body: "When software acts, the trail records decision, context, and human sign-off at the time of action — not reconstructed for the auditor later." },
  { title: "Trustless, auditless, fair", body: "Inspect without permission. Profit after the floor. Not instead of it." },
];

export const STATS = [
  { value: "~10,000", label: "TPS on Hedera" },
  { value: "3–5s", label: "Absolute finality" },
  { value: "Carbon−", label: "Certified negative" },
  { value: "$0.001", label: "Average write" },
];

export const AGENT_DUTIES = [
  { title: "Catch a double mint", body: "Two prints of the same unit, one tape. The second fails in public." },
  { title: "Flag basket arbitrage", body: "The floor is a basket, not a loophole. A price that only works off the tape gets marked." },
  { title: "Pay the floor on schedule", body: "The disbursement runs on the clock. The agent does not choose who deserves it." },
  { title: "Refuse a settlement with no provenance", body: "No trail, no settle. The refusal is itself a line on the tape." },
];

export const SEATS = [
  {
    id: "witness",
    name: "Witness",
    fee: "Free",
    unit: "",
    blurb: "Read the tape. No keys required.",
    points: ["Inspect public origin records", "Query authority state", "No keys required to see"],
    cta: "Begin the ledger",
  },
  {
    id: "issuer",
    name: "Issuer",
    fee: "$0.001",
    unit: "a write",
    blurb: "Household, firm, or treasury. Named credit on the same rail. Not money at par.",
    points: ["Invoices, escrow, and named credit", "A listed write, about $0.001", "Issuance priced, not granted", "Not legal tender at par"],
    cta: "Issue on the tape",
  },
  {
    id: "agent",
    name: "Agent",
    fee: "1 seat",
    unit: "per agent",
    blurb: "Duties with a trail. Writes stay about $0.001. The agent does not mint.",
    points: ["Catch a double mint", "Flag basket arbitrage", "Pay the floor on schedule", "Refuse a settlement with no provenance"],
    cta: "Put an agent on the tape",
  },
] as const;

export const SUPPLY = [
  ["Minted so far", "100,000,000,000"],
  ["Ceiling tonight", "100,264,486,301"],
  ["Still unminted", "264,486,301"],
  ["Circulating", "8,427,795,535"],
  ["Still in vesting contracts", "91,572,204,464"],
] as const;

export const HOLDERS = [
  ["Ecosystem", "40 billion", "No cliff, then 3 years", "36.57 billion"],
  ["Community", "25 billion", "180-day cliff, then 2 years", "All of it"],
  ["Treasury", "15 billion", "1-year cliff, then 4 years", "All of it"],
  ["Team", "10 billion", "1-year cliff, then 3 years", "All of it"],
  ["Partners", "5 billion", "180-day cliff, then 3 years", "All of it"],
  ["Liquidity", "5 billion", "Released at launch", "None. All 5 billion was claimed"],
] as const;

export type Quote = { text: string; url: string; tags: string[] };

export const QUOTES: Quote[] = [
  {
    text: "More lights within you illuminate, as the less shadows cast upon the gazes you stipulate, accept all as is, less should.",
    url: "https://x.com/Trancesage/status/2102172595655229459",
    tags: ["light", "shadow", "accept", "life", "change", "self", "should", "witness", "gaze"],
  },
  {
    text: "Garbage in, garbage out; no amount of plausible deniability will overcome the faculty of certainty. Only the immutable proactive provenance of all that goes in, and the process verified, can raise the confidence. Providence Through Provenance.",
    url: "https://x.com/Trancesage/status/2102168639616979422",
    tags: ["garbage", "trust", "audit", "proof", "work", "sign", "certainty", "deniability", "verify"],
  },
  {
    text: "The Providence through immutable provenance; trustless, auditless and secure from shenanigans in all matters of accounting is available now. The Absurdity Contained.",
    url: "https://x.com/Trancesage/status/2102114261279621221",
    tags: ["account", "audit", "trust", "money", "ledger", "prove", "secure", "count"],
  },
  {
    text: "The magic of money can be made true, no longer need the intermediary of abuse. The Providence through provenance, peer to peer, of immutable trustless accountings, secured by the desire to be benevolent.",
    url: "https://x.com/Trancesage/status/2102110803985842188",
    tags: ["money", "gift", "hbar", "pay", "coin", "fee", "give", "love", "benevolent"],
  },
  {
    text: "Ownership with no responsibility. Control with little accountability. Fellowship with all deniability. Providence Through Provenance to work, give the appearance of freedom not taken away even a little bit.",
    url: "https://x.com/Trancesage/status/2102415928772235583",
    tags: ["council", "corporation", "work", "accountability", "responsibility", "freedom", "own"],
  },
  {
    text: "Unless the essence of your time is omnipotent in veil, just enough to guard-rail you against the very freedom that turns into freedumb. The Providence Through Provenance.",
    url: "https://x.com/Trancesage/status/2101863844096233593",
    tags: ["freedom", "free", "sovereign", "key", "choice", "time", "guard"],
  },
  {
    text: "Vaccinate through provenance. Egonomic Anonymous. I becomes why, why becomes how, how becomes Wheee.",
    url: "https://x.com/Trancesage/status/2101342391961596357",
    tags: ["why", "how", "path", "ego", "become", "wheee", "life", "i"],
  },
  {
    text: "Egonomic Anonymous. Self cure through provenance.",
    url: "https://x.com/Trancesage/status/2101330755183919281",
    tags: ["cure", "self", "ego", "help", "hope", "heal", "anonymous"],
  },
  {
    text: "I am helpless but not hopeless and really dangerous. Providence Through Provenance, back to business of goods and honors.",
    url: "https://x.com/Trancesage/status/2101343345402351857",
    tags: ["honor", "goods", "business", "hope", "danger", "helpless"],
  },
];

export const BOARD = [
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
    href: "https://x.com/Trancesage/status/2102114261279621221",
    text: "The Providence through immutable provenance; trustless, auditless and secure from shenanigans in all matters of accounting is available now. The Absurdity Contained.",
  },
  {
    date: "21 Sep",
    href: "https://x.com/Trancesage/status/2102110803985842188",
    text: "The magic of money can be made true, no longer need the intermediary of abuse. The Providence through provenance, peer to peer, of immutable trustless accountings.",
  },
  {
    date: "21 Sep",
    href: "https://x.com/Trancesage/status/2101863844096233593",
    text: "Unless the essence of your time is omnipotented in veil, just enough to guard rail you against the very freedom turns into freedumb. The Providence Through Provenance.",
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
    href: "https://x.com/Trancesage/status/2101330755183919281",
    text: "Egonomic Anonymous. Self cure through provenance.",
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
];

export const HOME_POSTS = [
  "2102415928772235583",
  "2101863844096233593",
  "2102168639616979422",
  "2102110803985842188",
  "2101343345402351857",
  "2101342391961596357",
  "2101326419745812780",
  "2100683502572146843",
]
  .map((id) => BOARD.find((post) => post.href.endsWith(id)))
  .filter((post): post is (typeof BOARD)[number] => Boolean(post));

function scoreQuote(quote: Quote, hay: string) {
  let n = 0;
  for (const tag of quote.tags) if (hay.includes(tag)) n += tag.length > 4 ? 2 : 1;
  return n;
}

export function pickQuote(message: string, role: string, now = new Date()) {
  const hay = `${message} ${role}`.toLowerCase();
  let best = Math.floor(now.getTime() / 86_400_000) % QUOTES.length;
  let bestScore = scoreQuote(QUOTES[best], hay);
  QUOTES.forEach((quote, index) => {
    const score = scoreQuote(quote, hay);
    if (score > bestScore) {
      bestScore = score;
      best = index;
    }
  });
  return QUOTES[best];
}

export function dmUrl(email: string, message: string, role: string) {
  const text = [
    "Ledger note from Egonomic Anonymous",
    `Seat: ${role}`,
    `From: ${email}`,
    "",
    message.trim().slice(0, 1500),
  ].join("\n");
  return `https://x.com/messages/compose?${new URLSearchParams({
    recipient_id: RECIPIENT_ID,
    text,
  }).toString()}`;
}

export const EVENT_KINDS = [
  { id: "phone", label: "Phone", where: "This phone", hint: "This phone" },
  { id: "visit", label: "Visit", where: "Page", hint: "https://example.com/pricing" },
  { id: "message", label: "Message", where: "To", hint: "ada@archive.test" },
  { id: "file", label: "File", where: "File", hint: "q3-statement.pdf" },
  { id: "form", label: "Form", where: "Form", hint: "https://example.com/apply" },
  { id: "note", label: "Note", where: "About", hint: "Phone call, 4 minutes" },
] as const;

export const OPENING_CENTS = 2000;
export const STOP_CENTS = 500;

export function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function sessionBill(eventCount: number) {
  const coins = eventCount * 0.0008 + 0.05;
  const bill = coins * 2;
  return { coins, bill, cents: Math.max(1, Math.round(bill * 100)) };
}
