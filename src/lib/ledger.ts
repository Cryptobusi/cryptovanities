export type TranceQuote = {
  text: string;
  url: string;
  tags: string[];
};

/** Lines taken from @Trancesage. The receipt quotes one of these, not a paraphrase. */
export const TRANCE_QUOTES: TranceQuote[] = [
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

const TRANCE_ID = "363356784";

export function messageToTrancesage(input: { email: string; message: string; role: string }) {
  const note = [
    "Ledger note from Egonomic Anonymous",
    `Seat: ${input.role}`,
    `From: ${input.email}`,
    "",
    input.message.trim().slice(0, 1500),
  ].join("\n");
  const params = new URLSearchParams({
    recipient_id: TRANCE_ID,
    text: note,
  });
  return `https://x.com/messages/compose?${params.toString()}`;
}

export function prepareLedger(input: { email: string; message: string; role: string }) {
  const quote = pickQuote(input.message, input.role);
  return { quote, dmUrl: messageToTrancesage(input) };
}

function scoreQuote(quote: TranceQuote, haystack: string) {
  let score = 0;
  for (const tag of quote.tags) {
    if (haystack.includes(tag)) score += tag.length > 4 ? 2 : 1;
  }
  return score;
}

export function pickQuote(message: string, role: string, now = new Date()): TranceQuote {
  const haystack = `${message} ${role}`.toLowerCase();
  const day = Math.floor(now.getTime() / 86_400_000);
  let bestIdx = day % TRANCE_QUOTES.length;
  let bestScore = scoreQuote(TRANCE_QUOTES[bestIdx], haystack);
  TRANCE_QUOTES.forEach((quote, index) => {
    const score = scoreQuote(quote, haystack);
    if (score > bestScore) {
      bestScore = score;
      bestIdx = index;
    }
  });
  return TRANCE_QUOTES[bestIdx];
}


