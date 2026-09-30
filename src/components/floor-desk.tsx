import { useEffect, useMemo, useState } from "react";
import { useWorkingForm } from "@/lib/use-working-form";
import { books, BASKET_FIELDS, INSTRUMENT_KINDS, issueCoin, issueInstrument, lineWorth, mintBase, num, postMarks, postRules, reseedPool, runAgent, setImpaired, settle, tradePool, type WorkingForm } from "@/lib/working-form";

const CURRENCIES = ["EUR", "GBP", "JPY", "CHF", "BTC", "ETH", "HBAR", "SOL", "USDT"] as const;

const INSTRUMENTS = [
  { id: "0.0.456858", symbol: "USDC", name: "USD Coin" },
  { id: "0.0.731861", symbol: "SAUCE", name: "SaucerSwap" },
  { id: "0.0.4794920", symbol: "PACK", name: "HashPack" },
  { id: "0.0.10607411", symbol: "TRUST", name: "$Trust" },
] as const;

function fmt(value: number) {
  if (!Number.isFinite(value) || value === 0) return "—";
  const abs = Math.abs(value);
  if (abs >= 1000) return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (abs >= 1) return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (abs >= 0.0001) return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
  return value.toExponential(2);
}

function usd(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `$${fmt(value)}`;
}

export function FloorDesk() {
  const { form, commit } = useWorkingForm();
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [spend, setSpend] = useState("100");
  const [notice, setNotice] = useState("");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [listed, setListed] = useState<{ symbol: string; name: string; usd: number }[]>([]);
  const [asOf, setAsOf] = useState("");

  function apply(result: { form: WorkingForm; notice: string }) {
    commit(result.form);
    if (result.notice) setNotice(result.notice);
  }

  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        const [fx, ...rows] = await Promise.all([
          fetch("https://api.coinbase.com/v2/exchange-rates?currency=USD"),
          ...INSTRUMENTS.map((token) => fetch(`https://api.saucerswap.finance/tokens/${token.id}`)),
        ]);
        if (!fx.ok) return;
        const body = (await fx.json()) as { data?: { rates?: Record<string, string> } };
        const parsed: Record<string, number> = { USD: 1 };
        for (const [code, raw] of Object.entries(body.data?.rates ?? {})) {
          const value = Number(raw);
          if (Number.isFinite(value) && value > 0) parsed[code] = value;
        }
        const books: { symbol: string; name: string; usd: number }[] = [];
        await Promise.all(
          rows.map(async (response, index) => {
            if (!response.ok) return;
            const token = (await response.json()) as { priceUsd?: number | string };
            const price = Number(token.priceUsd);
            if (!Number.isFinite(price) || price <= 0) return;
            books.push({ symbol: INSTRUMENTS[index].symbol, name: INSTRUMENTS[index].name, usd: price });
          }),
        );
        if (cancel) return;
        setRates(parsed);
        setListed(books);
        setAsOf(new Date().toISOString());
      } catch {
        /* the desk still prices off the inventories */
      }
    }
    void load();
    return () => {
      cancel = true;
    };
  }, []);

  const model = form ? books(form) : null;
  const market = model?.market ?? 0;

  const compares = useMemo(() => {
    if (!(market > 0)) return [];
    const rows: { code: string; detail: string; yours: number }[] = [
      { code: "USD", detail: "dollar", yours: market },
    ];
    for (const code of CURRENCIES) {
      const perDollar = rates[code];
      if (!perDollar) continue;
      rows.push({ code, detail: "currency", yours: market * perDollar });
    }
    for (const token of listed) {
      rows.push({ code: token.symbol, detail: token.name, yours: market / token.usd });
    }
    return rows;
  }, [listed, market, rates]);

  if (!form || !model) {
    return (
      <section id="desk" className="mt-16 border-t border-border pt-14">
        <p className="text-sm text-muted">The tape is opening.</p>
      </section>
    );
  }

  const desk = form;
  const lines = desk.lines;
  const { gross, floorDue, riskDue, base, basket, residualBaskets, coinBaskets, supply, book, capital, premium, mark, unit, over, baseMinted, baseCap, discount } = model;

  function patch(id: string, next: Partial<(typeof lines)[number]>) {
    commit({ ...desk, marksPosted: false, lines: desk.lines.map((line) => (line.id === id ? { ...line, ...next } : line)) });
  }

  function fitSupply() {
    if (!(base > 0)) {
      setNotice("Nothing is left to issue. Lower the floor or the risk charge, or restore an inventory.");
      return;
    }
    commit({ ...desk, supply: String(Number(base.toPrecision(10))) });
    setNotice("Supply set so the book is one dollar. Issue it before the pool will trade.");
  }

  const floorWidth = gross > 0 ? (floorDue / gross) * 100 : 0;
  const riskWidth = gross > 0 ? (riskDue / gross) * 100 : 0;
  const baseWidth = gross > 0 ? (base / gross) * 100 : 0;

  return (
    <section id="desk" className="mt-16 border-t border-border pt-14">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">The working desk</p>
      <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">A public floor and a public tape.</h2>
      <p className="mt-4 max-w-2xl text-muted">
        Private issue and private ambition, under the same rules. The basket and a small income come first. A scarce base unit mints only on its schedule. Named credit — the coin, or an invoice, bond, escrow, or option — sits on the residual and does not clear at par. The agent pays the floor, flags a price that leaves the book, and refuses a second print. It cannot mint.
      </p>

      <ol className="mt-8 grid gap-3 sm:grid-cols-4">
        {[
          ["01", "Origin", "Inventories marked"],
          ["02", "Allowed", "Floor and risk first"],
          ["03", "Action", "Coin issued, pool open"],
          ["04", "Revoke", "Impair a line. The book moves."],
        ].map(([n, title, body]) => (
          <li key={n} className="rounded-lg border border-border bg-surface p-4">
            <p className="font-mono text-xs text-subtle">{n}</p>
            <p className="mt-1 font-display text-xl">{title}</p>
            <p className="mt-1 text-sm text-muted">{body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {lines.map((line) => {
          const worth = lineWorth(line);
          return (
            <article key={line.id} className="flex flex-col rounded-xl border border-border bg-bg p-5">
              <p className="font-mono text-xs tracking-widest text-subtle uppercase">{line.trail}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight">{line.name}</h3>
              <p className="mt-2 text-sm text-muted">{line.note}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="text-sm text-muted">
                  Qty ({line.unit})
                  <input
                    value={line.qty}
                    disabled={line.impaired}
                    onChange={(event) => patch(line.id, { qty: event.target.value })}
                    inputMode="decimal"
                    className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 font-mono text-fg outline-none focus:border-primary disabled:opacity-50"
                  />
                </label>
                <label className="text-sm text-muted">
                  $/unit
                  <input
                    value={line.price}
                    disabled={line.impaired}
                    onChange={(event) => patch(line.id, { price: event.target.value })}
                    inputMode="decimal"
                    className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 font-mono text-fg outline-none focus:border-primary disabled:opacity-50"
                  />
                </label>
              </div>
              <p className="mt-3 font-display text-2xl">{line.impaired ? "Revoked" : usd(worth)}</p>
              <button
                type="button"
                onClick={() => apply(setImpaired(desk, line.id))}
                className="mt-3 w-fit text-sm text-fg underline decoration-border underline-offset-4"
              >
                {line.impaired ? "Restore the line" : "Revoke this line"}
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface p-5">
        <h3 className="font-display text-2xl">Floor, then residual</h3>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          The floor is a basket plus an income, taken from the pile before anyone’s ambition. It is not a percent, and it is not the mint. Risk is charged on what remains. The residual is what a personal coin may represent.
        </p>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-subtle">
          <div className="flex h-full">
            <div className="bg-primary" style={{ width: `${floorWidth}%` }} />
            <div className="bg-fg/40" style={{ width: `${riskWidth}%` }} />
            <div className="bg-fg" style={{ width: `${baseWidth}%` }} />
          </div>
        </div>
        <dl className="mt-4 grid gap-3 sm:grid-cols-4">
          <div>
            <dt className="font-mono text-xs text-subtle">Gross</dt>
            <dd className="mt-1 font-display text-2xl">{usd(gross)}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-subtle">Floor</dt>
            <dd className="mt-1 font-display text-2xl">{usd(floorDue)}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-subtle">Risk</dt>
            <dd className="mt-1 font-display text-2xl">{usd(riskDue)}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-subtle">Residual</dt>
            <dd className="mt-1 font-display text-2xl">{usd(base)}</dd>
            <dd className="text-sm text-muted">{fmt(residualBaskets)} baskets</dd>
          </div>
        </dl>
        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {BASKET_FIELDS.map((field) => (
            <label key={field.key} className="text-sm text-muted">
              {field.label}
              <input
                value={desk.basket[field.key]}
                onChange={(event) =>
                  commit({ ...desk, floorPosted: false, basket: { ...desk.basket, [field.key]: event.target.value } })
                }
                inputMode="decimal"
                className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-fg outline-none focus:border-primary"
              />
            </label>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">Basket and income {usd(basket)}. Editing a band unposts the floor until you post it again.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <label className="text-sm text-muted">
            Risk %
            <input
              value={desk.riskPct}
              onChange={(event) => commit({ ...desk, riskPct: event.target.value })}
              inputMode="decimal"
              className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-fg outline-none focus:border-primary"
            />
          </label>
          <label className="text-sm text-muted">
            Symbol
            <input
              value={desk.symbol}
              onChange={(event) => commit({ ...desk, symbol: event.target.value.slice(0, 8) })}
              className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-fg outline-none focus:border-primary"
            />
          </label>
          <label className="text-sm text-muted">
            Supply
            <input
              value={desk.supply}
              onChange={(event) => commit({ ...desk, supply: event.target.value })}
              inputMode="decimal"
              className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-fg outline-none focus:border-primary"
            />
          </label>
        </div>
        {over ? <p className="mt-3 text-sm text-fg">The pile does not cover the basket, or nothing is left after the risk charge. Nothing may be issued.</p> : null}
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => apply(postMarks(desk))} className="min-h-11 rounded-full border border-border px-4 text-sm text-fg">
            Post marks to the tape
          </button>
          <button type="button" onClick={() => apply(postRules(desk))} className="min-h-11 rounded-full border border-border px-4 text-sm text-fg">
            Post the floor
          </button>
          <button type="button" onClick={() => apply(issueCoin(desk))} className="min-h-11 rounded-full bg-primary px-4 text-sm font-medium text-primary-fg">
            {desk.issued ? "Record the issue again" : "Issue on the tape"}
          </button>
        </div>
        <button type="button" onClick={fitSupply} className="mt-4 text-sm text-fg underline decoration-border underline-offset-4">
          Fit the supply so the book is $1
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-surface p-5">
          <h3 className="font-display text-2xl">The mint</h3>
          <p className="mt-2 text-sm text-muted">
            {unit} is the scarce public meter. The next tranche is {desk.baseTranche}. The cap is {fmt(baseCap)}. Seigniorage is listed at {usd(num(desk.seigniorage))} a unit. Issuing {mark} does not increase it.
          </p>
          <p className="mt-3 font-display text-3xl">
            {fmt(baseMinted)} <span className="text-lg text-muted">of {fmt(baseCap)}</span>
          </p>
          <button type="button" onClick={() => apply(mintBase(desk))} className="mt-4 min-h-11 rounded-full border border-border px-4 text-sm text-fg">
            Mint the tranche
          </button>
        </section>
        <section className="rounded-xl border border-border bg-surface p-5">
          <h3 className="font-display text-2xl">Named credit</h3>
          <p className="mt-2 text-sm text-muted">
            One basket face is {usd(basket)}. At the market discount a checkout pays {usd(basket * discount)}. That is not par with {unit}.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {INSTRUMENT_KINDS.map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => apply(issueInstrument(desk, kind))}
                className="min-h-11 rounded-full border border-border px-4 text-sm text-fg capitalize"
              >
                {kind}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">{desk.instruments.length} on the tape.</p>
        </section>
      </div>

      <section className="mt-4 rounded-xl border border-border bg-surface p-5">
        <h3 className="font-display text-2xl">The agent</h3>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          It checks the standing issue, flags a market more than 15% off the book, pays the posted floor without naming a recipient, and will not settle a line with no origin. It does not mint {unit}.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => apply(runAgent(desk))} className="min-h-11 rounded-full bg-primary px-4 text-sm font-medium text-primary-fg">
            Run the agent
          </button>
          <button type="button" onClick={() => apply(settle(desk))} className="min-h-11 rounded-full border border-border px-4 text-sm text-fg">
            Settle
          </button>
        </div>
        {desk.floorPaid ? <p className="mt-3 text-sm text-fg">The floor has been paid from the reserve.</p> : null}
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-xl border border-border bg-surface p-5">
          <h3 className="font-display text-2xl">Book and market</h3>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-bg p-4">
              <dt className="font-mono text-xs text-subtle">Book</dt>
              <dd className="mt-1 font-display text-3xl">{usd(book)}</dd>
              <dd className="mt-1 text-sm text-muted">Residual divided by supply. One coin is {fmt(book > 0 && basket > 0 ? book / basket : 0)} baskets at the book.</dd>
            </div>
            <div className="rounded-lg border border-border bg-bg p-4">
              <dt className="font-mono text-xs text-subtle">Market</dt>
              <dd className="mt-1 font-display text-3xl">{usd(market)}</dd>
              <dd className="mt-1 text-sm text-muted">
                {book > 0 && market > 0
                  ? `${premium >= 0 ? `${fmt(premium * 100)}% rich` : `${fmt(Math.abs(premium) * 100)}% cheap`} · ${fmt(coinBaskets)} baskets`
                  : "Pool not open"}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-muted">
            Personal capital, the residual, at the market: {usd(capital)} across {fmt(supply)} {mark}. At the book it is {usd(base)}, {fmt(residualBaskets)} baskets. {unit} is not this coin.
          </p>
          <p className="mt-3 text-sm text-fg">
            {book > 1
              ? "Fewer units than dollars of residual. Each coin is thicker than a dollar."
              : book > 0 && book < 1
                ? "The ceiling is the residual. Extra units did not add value. They thinned the coin."
                : "No residual, no coin."}
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-5">
          <h3 className="font-display text-2xl">Open market</h3>
          <p className="mt-2 text-sm text-muted">
            Private ambition. The pool may trade only after the coin is issued. Its dollars are not the floor reserve.
            Revoke a line and the book moves at once. The market moves only when a trade is written on the tape.
            {desk.issued ? "" : " Issue the coin first."}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-sm text-muted">
              {mark} in the pool
              <input
                value={desk.poolCoin}
                onChange={(event) => commit({ ...desk, poolCoin: event.target.value })}
                inputMode="decimal"
                className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-fg outline-none focus:border-primary"
              />
            </label>
            <label className="text-sm text-muted">
              Dollars in the pool
              <input
                value={desk.poolUsd}
                onChange={(event) => commit({ ...desk, poolUsd: event.target.value })}
                inputMode="decimal"
                className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-fg outline-none focus:border-primary"
              />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={side === "buy"}
              onClick={() => setSide("buy")}
              className={
                side === "buy"
                  ? "rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
                  : "rounded-full border border-border px-3 py-2 text-sm text-fg"
              }
            >
              Buy {mark}
            </button>
            <button
              type="button"
              aria-pressed={side === "sell"}
              onClick={() => setSide("sell")}
              className={
                side === "sell"
                  ? "rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
                  : "rounded-full border border-border px-3 py-2 text-sm text-fg"
              }
            >
              Sell {mark}
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              value={spend}
              onChange={(event) => setSpend(event.target.value)}
              inputMode="decimal"
              aria-label={side === "buy" ? "Dollars to spend" : `${mark} to sell`}
              className="min-h-11 flex-1 rounded-md border border-border bg-bg px-3 font-mono text-fg outline-none focus:border-primary"
            />
            <button type="button" onClick={() => apply(tradePool(desk, side, spend))} className="min-h-11 rounded-full bg-primary px-4 text-sm font-medium text-primary-fg">
              {side === "buy" ? "Spend dollars" : `Sell ${mark}`}
            </button>
          </div>
          <button type="button" onClick={() => apply(reseedPool(desk))} className="mt-3 text-sm text-muted underline decoration-border underline-offset-4">
            Re-seed the pool at the book
          </button>
          {notice ? <p className="mt-4 text-sm text-fg">{notice}</p> : null}
        </section>
      </div>

      <section className="mt-4 overflow-hidden rounded-xl border border-border">
        <div className="border-b border-border bg-surface px-4 py-3">
          <h3 className="font-display text-2xl">Competing on the open book</h3>
          <p className="mt-1 text-sm text-muted">
            One {mark} at the market price, changed into currencies and into instruments that already trade.
            {asOf ? ` Rates ${new Date(asOf).toLocaleTimeString()}.` : " Reading live rates."} A real listing would be
            HashPack for the coin and SaucerSwap for the pool. This table is the mock of that quote.
          </p>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="font-mono text-xs tracking-wide text-subtle uppercase">
            <tr>
              <th className="px-4 py-2 font-normal">Instrument</th>
              <th className="px-4 py-2 text-right font-normal">1 {mark} buys</th>
            </tr>
          </thead>
          <tbody>
            {compares.map((row) => (
              <tr key={row.code} className="border-t border-border">
                <td className="px-4 py-2">
                  {row.code} <span className="text-muted">{row.detail}</span>
                </td>
                <td className="px-4 py-2 text-right font-mono">{fmt(row.yours)}</td>
              </tr>
            ))}
            {book > 0 && gross > 0 ? (
              <tr className="border-t border-border">
                <td className="px-4 py-2">
                  Basket <span className="text-muted">share of gross</span>
                </td>
                <td className="px-4 py-2 text-right font-mono">{fmt((book / gross) * 100)}%</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </section>
      <p className="mt-4 max-w-2xl text-sm text-subtle">
        Recording the issue on Hedera is about $0.001. That fee is not the value of the coin. The value is the base,
        and then whatever the pool will pay.
      </p>
      <section className="mt-8 rounded-xl border border-border bg-surface p-5">
        <h3 className="font-display text-2xl">Public tape</h3>
        <p className="mt-2 text-sm text-muted">
          {desk.tape.length} {desk.tape.length === 1 ? "line" : "lines"}. Append only. The market deck writes the same
          tape when it trades this coin.
        </p>
        {desk.tape.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Nothing posted. Post the marks, post the floor, then issue.</p>
        ) : (
          <ol className="mt-4 max-h-96 space-y-3 overflow-auto">
            {desk.tape.map((line, index) => (
              <li key={line.id} className="border-t border-border pt-3 text-sm">
                <p className="font-mono text-xs text-subtle">
                  {String(index + 1).padStart(2, "0")} · {line.kind} · {new Date(line.at).toLocaleString()}
                </p>
                <p className="mt-1 text-fg">{line.text}</p>
              </li>
            ))}
          </ol>
        )}
      </section>
    </section>
  );
}
