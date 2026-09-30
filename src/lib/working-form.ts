export const FORM_KEY = "ea-working-form";
export const FORM_EVENT = "ea-working-form";

export type Inventory = {
  id: string;
  trail: string;
  name: string;
  unit: string;
  note: string;
  qty: string;
  price: string;
  impaired: boolean;
};

export type Basket = {
  shelter: string;
  food: string;
  care: string;
  connect: string;
  ubi: string;
};

export type InstrumentKind = "invoice" | "bond" | "escrow" | "option";

export type Instrument = {
  id: string;
  kind: InstrumentKind;
  baskets: string;
};

export type TapeKind =
  | "mark"
  | "revoke"
  | "restore"
  | "rules"
  | "issue"
  | "trade"
  | "reseed"
  | "refuse"
  | "mint"
  | "instrument"
  | "agent"
  | "settle";

export type TapeLine = {
  id: string;
  at: string;
  kind: TapeKind;
  text: string;
};

export type WorkingForm = {
  lines: Inventory[];
  basket: Basket;
  riskPct: string;
  symbol: string;
  supply: string;
  poolCoin: string;
  poolUsd: string;
  issued: boolean;
  marksPosted: boolean;
  floorPosted: boolean;
  lastIssueKey: string;
  baseSymbol: string;
  baseMinted: string;
  baseCap: string;
  baseTranche: string;
  seigniorage: string;
  instruments: Instrument[];
  floorPaid: boolean;
  tape: TapeLine[];
};

export const BASKET_FIELDS = [
  { key: "shelter", label: "Shelter" },
  { key: "food", label: "Staple food" },
  { key: "care", label: "Primary care" },
  { key: "connect", label: "Connectivity" },
  { key: "ubi", label: "Income" },
] as const;

export const INSTRUMENT_KINDS: InstrumentKind[] = ["invoice", "bond", "escrow", "option"];

export const OPENING_LINES: Inventory[] = [
  {
    id: "carbon",
    trail: "The credit",
    name: "Soil carbon, plot 14-N",
    unit: "t",
    note: "Origin signed before a credit exists. The method and the signer are bound to the plot.",
    qty: "40",
    price: "85",
    impaired: false,
  },
  {
    id: "grain",
    trail: "The shipment",
    name: "Grain lot, silo 7",
    unit: "t",
    note: "Weighed at the gate. A later invoice cannot quietly become the origin.",
    qty: "18",
    price: "240",
    impaired: false,
  },
  {
    id: "title",
    trail: "The credential",
    name: "Warehouse receipt, bearer S. Voss",
    unit: "title",
    note: "The title travels with the bearer. The dossier stays. The house may check, not take the file.",
    qty: "1",
    price: "4200",
    impaired: false,
  },
];

export function openingForm(): WorkingForm {
  return {
    lines: OPENING_LINES,
    basket: { shelter: "800", food: "280", care: "150", connect: "40", ubi: "200" },
    riskPct: "12",
    symbol: "NOTE",
    supply: "9196",
    poolCoin: "1000",
    poolUsd: "1000",
    issued: false,
    marksPosted: false,
    floorPosted: false,
    lastIssueKey: "",
    baseSymbol: "UNIT",
    baseMinted: "400",
    baseCap: "1000",
    baseTranche: "100",
    seigniorage: "1",
    instruments: [],
    floorPaid: false,
    tape: [],
  };
}

export function num(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function trim(value: number) {
  return String(Number(value.toPrecision(10)));
}

export function lineWorth(line: Inventory) {
  if (line.impaired) return 0;
  return Math.max(0, num(line.qty)) * Math.max(0, num(line.price));
}

export function basketCost(form: WorkingForm) {
  const basket = form.basket ?? openingForm().basket;
  return BASKET_FIELDS.reduce((sum, field) => sum + Math.max(0, num(basket[field.key])), 0);
}

export function books(form: WorkingForm) {
  const gross = form.lines.reduce((sum, line) => sum + lineWorth(line), 0);
  const basket = basketCost(form);
  const floorDue = Math.min(gross, basket);
  const floorGap = Math.max(0, basket - gross);
  const surplus = Math.max(0, gross - basket);
  const riskRate = Math.min(60, Math.max(0, num(form.riskPct))) / 100;
  const riskDue = surplus * riskRate;
  const residual = Math.max(0, surplus - riskDue);
  const base = residual;
  const supply = Math.max(0, num(form.supply));
  const book = supply > 0 ? residual / supply : 0;
  const coinsInPool = Math.max(0, num(form.poolCoin));
  const dollarsInPool = Math.max(0, num(form.poolUsd));
  const market = coinsInPool > 0 && dollarsInPool > 0 ? dollarsInPool / coinsInPool : 0;
  const capital = supply * market;
  const premium = book > 0 && market > 0 ? market / book - 1 : 0;
  const mark = form.symbol.trim() || "NOTE";
  const unit = (form.baseSymbol || "UNIT").trim() || "UNIT";
  const residualBaskets = basket > 0 ? residual / basket : 0;
  const coinBaskets = basket > 0 && market > 0 ? market / basket : 0;
  const discount = book > 0 && market > 0 ? market / book : 1;
  const over = floorGap > 0 || residual <= 0;
  const baseMinted = Math.max(0, num(form.baseMinted));
  const baseCap = Math.max(0, num(form.baseCap));
  const baseTranche = Math.max(0, num(form.baseTranche));
  const seigniorage = Math.max(0, num(form.seigniorage));
  return {
    gross,
    basket,
    floorDue,
    floorGap,
    surplus,
    riskRate,
    riskDue,
    residual,
    residualBaskets,
    base,
    supply,
    book,
    coinsInPool,
    dollarsInPool,
    market,
    capital,
    premium,
    mark,
    unit,
    coinBaskets,
    discount,
    over,
    baseMinted,
    baseCap,
    baseTranche,
    seigniorage,
  };
}

function stamp(form: WorkingForm, kind: TapeKind, text: string): WorkingForm {
  const line: TapeLine = { id: crypto.randomUUID(), at: new Date().toISOString(), kind, text };
  return { ...form, tape: [...form.tape, line] };
}

export function loadForm(): WorkingForm {
  const open = openingForm();
  try {
    const raw = localStorage.getItem(FORM_KEY);
    if (!raw) return open;
    const parsed = JSON.parse(raw) as Partial<WorkingForm>;
    if (!parsed || !Array.isArray(parsed.lines) || !Array.isArray(parsed.tape)) return open;
    return {
      ...open,
      ...parsed,
      basket: { ...open.basket, ...(parsed.basket ?? {}) },
      lines: parsed.lines,
      tape: parsed.tape,
      instruments: Array.isArray(parsed.instruments) ? parsed.instruments : [],
    };
  } catch {
    return open;
  }
}

export function saveForm(form: WorkingForm) {
  localStorage.setItem(FORM_KEY, JSON.stringify(form));
  window.dispatchEvent(new Event(FORM_EVENT));
}

function basketText(form: WorkingForm) {
  const basket = form.basket ?? openingForm().basket;
  return BASKET_FIELDS.map((field) => `${field.label} $${num(basket[field.key]).toFixed(2)}`).join(", ");
}

export function postMarks(form: WorkingForm) {
  const b = books(form);
  const parts = form.lines.map((line) =>
    line.impaired ? `${line.name} revoked` : `${line.name} ${line.qty} ${line.unit} at $${line.price}`,
  );
  const next = stamp(
    { ...form, marksPosted: true },
    "mark",
    `Marks posted. ${parts.join(". ")}. Gross $${b.gross.toFixed(2)}.`,
  );
  return { form: next, notice: "The marks are on the tape. A later edit is not policy until it is posted again." };
}

export function postRules(form: WorkingForm) {
  const b = books(form);
  if (!form.marksPosted) {
    const next = stamp(form, "refuse", "Floor refused. The marks are not on the tape.");
    return { form: next, notice: "Post the marks first. The floor cannot be policy before the pile is shown." };
  }
  if (b.floorGap > 0) {
    const next = stamp(
      form,
      "refuse",
      `Floor underfunded by $${b.floorGap.toFixed(2)}. Basket $${b.basket.toFixed(2)}, gross $${b.gross.toFixed(2)}. Issue refused.`,
    );
    return { form: next, notice: "The pile does not cover the basket and the income. The refusal is on the tape." };
  }
  const next = stamp(
    { ...form, floorPosted: true, floorPaid: false },
    "rules",
    `Floor posted. ${basketText(form)}. Claim $${b.floorDue.toFixed(2)} from surplus. Risk ${form.riskPct}% of the remainder is $${b.riskDue.toFixed(2)}. Residual $${b.residual.toFixed(2)}, ${b.residualBaskets.toFixed(2)} baskets. Not taken from ${b.unit}.`,
  );
  return { form: next, notice: "The basket and the income are on the tape. They are not the mint, and they are not in the pool." };
}

export function setImpaired(form: WorkingForm, id: string) {
  const line = form.lines.find((item) => item.id === id);
  if (!line) return { form, notice: "" };
  const impaired = !line.impaired;
  const nextLines = form.lines.map((item) => (item.id === id ? { ...item, impaired } : item));
  const draft = { ...form, lines: nextLines, marksPosted: true };
  const b = books(draft);
  const text = impaired
    ? `${line.name} revoked. Gross $${b.gross.toFixed(2)}. Residual $${b.residual.toFixed(2)}. Market stays $${b.market.toFixed(2)} until a trade. The earlier mark remains above this line.`
    : `${line.name} restored. Gross $${b.gross.toFixed(2)}. Residual $${b.residual.toFixed(2)}.`;
  return {
    form: stamp(draft, impaired ? "revoke" : "restore", text),
    notice: impaired ? "Revoked. The book moved. The market did not." : "Restored. Both lines stay on the tape.",
  };
}

export function issueCoin(form: WorkingForm) {
  const b = books(form);
  if (!form.marksPosted || !form.floorPosted) {
    const next = stamp(form, "refuse", `Issue of ${b.mark} refused. Marks posted: ${form.marksPosted}. Floor posted: ${form.floorPosted}.`);
    return { form: next, notice: "Post the marks and the floor before a coin exists. The refusal is on the tape." };
  }
  if (b.over || !(b.supply > 0)) {
    const next = stamp(form, "refuse", `Issue of ${b.mark} refused. Residual $${b.residual.toFixed(2)}. The floor is not skipped.`);
    return { form: next, notice: "Nothing is left after the basket and the risk charge." };
  }
  const key = `${b.mark}:${b.supply}`;
  if (form.lastIssueKey === key) {
    const next = stamp(form, "refuse", `Double mint refused. ${b.supply} ${b.mark} is already the standing issue. ${b.unit} was not printed.`);
    return { form: next, notice: "That supply is already on the tape. A second print does not add value." };
  }
  const next = stamp(
    { ...form, issued: true, lastIssueKey: key },
    "issue",
    `Issued ${b.supply.toFixed(2)} ${b.mark} against the residual, $${b.residual.toFixed(2)}, ${b.residualBaskets.toFixed(2)} baskets. Book $${b.book.toFixed(2)}. ${b.unit} stays at ${b.baseMinted}. This paper is not money at par.`,
  );
  return {
    form: next,
    notice: `${b.mark} is named credit on the residual. It did not mint ${b.unit}.`,
  };
}

export function mintBase(form: WorkingForm) {
  const b = books(form);
  if (!(b.baseTranche > 0) || !(b.baseCap > 0)) {
    return { form, notice: "The schedule needs a tranche and a cap." };
  }
  if (b.baseMinted + b.baseTranche > b.baseCap + 1e-9) {
    const next = stamp(
      form,
      "refuse",
      `Mint refused. ${b.unit} ${b.baseMinted} plus ${b.baseTranche} would pass the cap ${b.baseCap}. No one, including the desk, mints outside the schedule.`,
    );
    return { form: next, notice: `${b.unit} is at the cap. The refusal is on the tape.` };
  }
  const minted = b.baseMinted + b.baseTranche;
  const proceeds = b.baseTranche * b.seigniorage;
  const next = stamp(
    { ...form, baseMinted: trim(minted) },
    "mint",
    `Minted ${b.baseTranche} ${b.unit} on the schedule. Seigniorage listed at $${b.seigniorage.toFixed(2)}, proceeds $${proceeds.toFixed(2)}. Outstanding ${minted} of ${b.baseCap}. ${b.mark} was not increased.`,
  );
  return { form: next, notice: `${b.unit} increased by the tranche only. The personal coin did not.` };
}

export function issueInstrument(form: WorkingForm, kind: InstrumentKind) {
  const b = books(form);
  if (!form.marksPosted || !form.floorPosted) {
    const next = stamp(form, "refuse", `${kind} refused. The floor is not on the tape.`);
    return { form: next, notice: "Instruments wait until the marks and the floor are posted." };
  }
  const instrument: Instrument = { id: crypto.randomUUID(), kind, baskets: "1" };
  const checkout = b.basket * b.discount;
  const next = stamp(
    { ...form, instruments: [...form.instruments, instrument] },
    "instrument",
    `${kind} for 1 basket. Face $${b.basket.toFixed(2)}. Checkout $${checkout.toFixed(2)} at the market discount (${b.discount.toFixed(4)} of book). It does not clear as ${b.unit}.`,
  );
  return { form: next, notice: `The ${kind} is named credit. Checkout uses the market, not par.` };
}

export function reseedPool(form: WorkingForm) {
  const b = books(form);
  if (!form.issued) {
    const next = stamp(form, "refuse", "Re-seed refused. A pool is the residual. The coin is not issued.");
    return { form: next, notice: "Issue the coin first. Ambition does not open before the floor is on the tape." };
  }
  if (!(b.book > 0) || !(b.coinsInPool > 0)) {
    return { form, notice: "The pool needs coins in it, and the residual needs a supply." };
  }
  const poolUsd = trim(b.coinsInPool * b.book);
  const next = stamp(
    { ...form, poolUsd },
    "reseed",
    `Pool re-seeded at the book, $${b.book.toFixed(2)}, ${b.coinBaskets.toFixed(4)} baskets a coin once the market meets it. The floor was not moved. ${b.unit} was not moved.`,
  );
  return { form: next, notice: "Pool re-seeded at the book. The next trade is the market." };
}

export function tradePool(form: WorkingForm, side: "buy" | "sell", spend: string) {
  const amount = num(spend);
  const b = books(form);
  if (!form.issued) {
    const next = stamp(form, "refuse", `Trade refused. ${b.mark} is not issued. Ambition waits on the floor and the issue.`);
    return { form: next, notice: "The coin is not on the tape yet. Issue it. The refusal is recorded." };
  }
  if (!(amount > 0) || !(b.coinsInPool > 0) || !(b.dollarsInPool > 0)) {
    return { form, notice: "The pool needs both piles, and the trade needs an amount above zero." };
  }
  const k = b.coinsInPool * b.dollarsInPool;
  if (side === "buy") {
    const nextUsd = b.dollarsInPool + amount;
    const nextCoin = k / nextUsd;
    const out = b.coinsInPool - nextCoin;
    const draft = { ...form, poolUsd: trim(nextUsd), poolCoin: trim(nextCoin) };
    const price = nextUsd / nextCoin;
    const baskets = b.basket > 0 ? price / b.basket : 0;
    const next = stamp(
      draft,
      "trade",
      `Buy ${b.mark}. $${amount.toFixed(2)} in, ${out.toFixed(4)} ${b.mark} out. Market $${price.toFixed(4)}, ${baskets.toFixed(4)} baskets. Book stays $${b.book.toFixed(2)}. Floor and ${b.unit} untouched.`,
    );
    return { form: next, notice: `Bought ${b.mark}. The residual's price moved. The basket did not.` };
  }
  if (amount >= b.coinsInPool * 0.99) {
    return { form, notice: "Leave some of the coin in the pool." };
  }
  const nextCoin = b.coinsInPool + amount;
  const nextUsd = k / nextCoin;
  const out = b.dollarsInPool - nextUsd;
  const draft = { ...form, poolCoin: trim(nextCoin), poolUsd: trim(nextUsd) };
  const price = nextUsd / nextCoin;
  const baskets = b.basket > 0 ? price / b.basket : 0;
  const next = stamp(
    draft,
    "trade",
    `Sell ${b.mark}. ${amount.toFixed(4)} ${b.mark} in, $${out.toFixed(2)} out. Market $${price.toFixed(4)}, ${baskets.toFixed(4)} baskets. Book stays $${b.book.toFixed(2)}.`,
  );
  return { form: next, notice: `Sold ${b.mark}. The floor reserve was not spent.` };
}

export function settle(form: WorkingForm) {
  const b = books(form);
  const hasOrigin = form.tape.some((line) => line.kind === "mark");
  if (!hasOrigin) {
    const next = stamp(form, "refuse", "Settlement refused. No origin on the tape. If it cannot be shown, it is not policy.");
    return { form: next, notice: "No trail, no settle. The refusal is on the tape." };
  }
  const next = stamp(
    form,
    "settle",
    `Settlement allowed. Origin is on the tape. ${b.mark} book $${b.book.toFixed(2)}. Checkout of a 1-basket instrument is $${(b.basket * b.discount).toFixed(2)}, not par with ${b.unit}.`,
  );
  return { form: next, notice: "Settlement stands. The origin was already written." };
}

export function runAgent(form: WorkingForm) {
  const b = books(form);
  let next = form;
  const notes: string[] = [];

  if (form.lastIssueKey) {
    next = stamp(next, "agent", `Double mint checked. Standing issue ${form.lastIssueKey}. A repeat of that print is refused. The agent does not hold ${b.unit}.`);
    notes.push("No second print of the standing issue.");
  } else {
    next = stamp(next, "agent", `Double mint checked. Nothing is issued, so there is no second print to catch.`);
    notes.push("Nothing issued yet.");
  }

  if (b.book > 0 && b.market > 0 && Math.abs(b.premium) > 0.15) {
    next = stamp(
      next,
      "agent",
      `Basket arbitrage flagged. Market $${b.market.toFixed(4)} is ${Math.abs(b.premium * 100).toFixed(1)}% ${b.premium > 0 ? "rich" : "cheap"} to the book. The floor is a basket, not a loophole.`,
    );
    notes.push("Arbitrage flagged.");
  } else {
    next = stamp(next, "agent", "Basket arbitrage checked. The market is inside 15% of the book, or the pool is not open.");
    notes.push("No arbitrage flag.");
  }

  if (!form.floorPosted || b.floorGap > 0) {
    next = stamp(next, "refuse", "Floor disbursement refused. The basket is not posted, or the pile does not cover it. The agent does not choose who deserves it, and it does not print the gap.");
    notes.push("Floor not paid.");
  } else {
    next = stamp(
      { ...next, floorPaid: true },
      "agent",
      `Floor paid on the schedule. ${basketText(form)}. $${b.floorDue.toFixed(2)} from the reserve. The agent named no recipient. ${b.unit} was not minted to fund it.`,
    );
    notes.push("Floor paid.");
  }

  if (!form.tape.some((line) => line.kind === "mark") && !next.tape.some((line) => line.kind === "mark")) {
    next = stamp(next, "refuse", "Settlement check: no origin. The agent will not settle.");
    notes.push("Settlement refused.");
  } else {
    next = stamp(next, "agent", "Settlement check: an origin is on the tape. A settle may proceed. The agent did not invent one.");
    notes.push("Origin is shown.");
  }

  return { form: next, notice: notes.join(" ") };
}
