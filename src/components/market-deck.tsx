import { useEffect, useMemo, useState } from "react";
import { books, tradePool } from "@/lib/working-form";
import { useWorkingForm } from "@/lib/use-working-form";

const HEDERA = [
  { id: "0.0.731861", symbol: "SAUCE", name: "SaucerSwap" },
  { id: "0.0.456858", symbol: "USDC", name: "USD Coin" },
  { id: "0.0.4794920", symbol: "PACK", name: "HashPack" },
  { id: "0.0.834116", symbol: "HBARX", name: "Stader" },
  { id: "0.0.1460200", symbol: "XSAUCE", name: "xSAUCE" },
  { id: "0.0.2672057", symbol: "SENTX", name: "SentX" },
  { id: "0.0.10607411", symbol: "TRUST", name: "$Trust" },
] as const;

const FEATURED = ["USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "CNY", "INR", "BRL", "MXN", "BTC", "ETH", "SOL", "XRP", "ADA", "DOGE", "USDT"];

type Listed = { id: string; symbol: string; name: string; usd: number };

function fmt(value: number) {
  if (!Number.isFinite(value) || value === 0) return "—";
  const abs = Math.abs(value);
  if (abs >= 1000) return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (abs >= 1) return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
  if (abs >= 0.0001) return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
  return value.toExponential(2);
}

function trim(value: number) {
  return String(Number(value.toPrecision(10)));
}

export function MarketDeck() {
  const [symbol, setSymbol] = useState("MINE");
  const [coinName, setCoinName] = useState("Personal coin");
  const [tokenId, setTokenId] = useState("");
  const [coins, setCoins] = useState("1000");
  const [hbars, setHbars] = useState("10");
  const [listedUsd, setListedUsd] = useState<number | null>(null);
  const [useListed, setUseListed] = useState(false);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [hedera, setHedera] = useState<Listed[]>([]);
  const [loadedAt, setLoadedAt] = useState("");
  const [bookError, setBookError] = useState("");
  const [reading, setReading] = useState(false);
  const [notice, setNotice] = useState("");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [spend, setSpend] = useState("1");
  const [showAll, setShowAll] = useState(false);

  async function loadBook() {
    setBookError("");
    try {
      const [fx, ...rows] = await Promise.all([
        fetch("https://api.coinbase.com/v2/exchange-rates?currency=USD"),
        ...HEDERA.map((token) => fetch(`https://api.saucerswap.finance/tokens/${token.id}`)),
      ]);
      if (!fx.ok) throw new Error("rates");
      const body = (await fx.json()) as { data?: { rates?: Record<string, string> } };
      const parsed: Record<string, number> = {};
      for (const [code, raw] of Object.entries(body.data?.rates ?? {})) {
        const value = Number(raw);
        if (Number.isFinite(value) && value > 0) parsed[code] = value;
      }
      if (!parsed.HBAR) throw new Error("rates");
      parsed.USD = parsed.USD || 1;
      const listed: Listed[] = [];
      await Promise.all(
        rows.map(async (response, index) => {
          if (!response.ok) return;
          const token = (await response.json()) as { priceUsd?: number | string };
          const usd = Number(token.priceUsd);
          if (!Number.isFinite(usd) || usd <= 0) return;
          listed.push({ ...HEDERA[index], usd });
        }),
      );
      listed.sort((a, b) => a.symbol.localeCompare(b.symbol));
      setRates(parsed);
      setHedera(listed);
      setLoadedAt(new Date().toISOString());
    } catch {
      setBookError("The rate book did not answer. The desk ratio is still here. Try again.");
    }
  }

  useEffect(() => {
    void loadBook();
  }, []);

  const coinReserve = Number(coins);
  const hbarReserve = Number(hbars);
  const hbarUsd = rates.HBAR ? 1 / rates.HBAR : null;
  const deskUsd = hbarUsd && coinReserve > 0 && hbarReserve > 0 ? (hbarReserve / coinReserve) * hbarUsd : null;
  const priceUsd = useListed && listedUsd != null ? listedUsd : deskUsd;
  const mark = symbol.trim() || "coin";

  const featuredRows = useMemo(() => {
    if (priceUsd == null) return [];
    return FEATURED.filter((code) => rates[code]).map((code) => ({
      code,
      yours: priceUsd * rates[code],
      theirs: 1 / (priceUsd * rates[code]),
    }));
  }, [priceUsd, rates]);

  const hederaRows = useMemo(() => {
    if (priceUsd == null) return [];
    return hedera
      .filter((token) => token.id !== tokenId.trim())
      .map((token) => ({
        code: token.symbol,
        detail: token.id,
        yours: priceUsd / token.usd,
        theirs: token.usd / priceUsd,
      }));
  }, [hedera, priceUsd, tokenId]);

  const rest = useMemo(() => {
    if (priceUsd == null) return [];
    const skip = new Set(FEATURED);
    return Object.keys(rates)
      .filter((code) => !skip.has(code) && code !== "HBAR")
      .sort()
      .map((code) => ({ code, yours: priceUsd * rates[code] }));
  }, [priceUsd, rates]);

  async function readToken() {
    const id = tokenId.trim();
    if (!/^\d+\.\d+\.\d+$/.test(id)) {
      setNotice("A Hedera token id looks like 0.0.1234567.");
      return;
    }
    setReading(true);
    setNotice("");
    try {
      const mirror = await fetch(`https://mainnet.mirrornode.hedera.com/api/v1/tokens/${id}`);
      if (!mirror.ok) {
        setNotice("No token with that id on mainnet.");
        setListedUsd(null);
        return;
      }
      const token = (await mirror.json()) as { name?: string; symbol?: string; decimals?: number; total_supply?: string; type?: string };
      if (token.type && token.type !== "FUNGIBLE_COMMON") {
        setNotice("That id is not a fungible coin. Mint one in HashPack, then come back.");
        setListedUsd(null);
        return;
      }
      const decimals = token.decimals ?? 0;
      const supply = Number(token.total_supply ?? "0") / 10 ** decimals;
      if (token.symbol) setSymbol(token.symbol);
      if (token.name) setCoinName(token.name);
      const sauce = await fetch(`https://api.saucerswap.finance/tokens/${id}`);
      let listed: number | null = null;
      if (sauce.ok) {
        const body = (await sauce.json()) as { priceUsd?: number | string };
        const usd = Number(body.priceUsd);
        if (Number.isFinite(usd) && usd > 0) listed = usd;
      }
      setListedUsd(listed);
      setUseListed(listed != null);
      setNotice(
        listed != null
          ? `${token.symbol || id} is listed. SaucerSwap prints $${fmt(listed)}. Supply on the mirror is ${fmt(supply)}.`
          : `${token.symbol || id} is on the mirror, supply ${fmt(supply)}, and has no SaucerSwap pool. The desk ratio is the price until someone lists it.`,
      );
    } catch {
      setNotice("The mirror did not answer. Check the id and try again.");
    } finally {
      setReading(false);
    }
  }

  function trade() {
    const amount = Number(spend);
    if (!(amount > 0) || !(coinReserve > 0) || !(hbarReserve > 0)) {
      setNotice("The pool needs a coin pile, an HBAR pile, and an amount above zero.");
      return;
    }
    const k = coinReserve * hbarReserve;
    if (side === "buy") {
      const nextHbar = hbarReserve + amount;
      const nextCoin = k / nextHbar;
      const out = coinReserve - nextCoin;
      setHbars(trim(nextHbar));
      setCoins(trim(nextCoin));
      setNotice(`Desk trade: ${fmt(amount)} HBAR in, ${fmt(out)} ${mark} out. The ratio moved. Nothing left this browser.`);
      return;
    }
    if (amount >= coinReserve * 0.99) {
      setNotice("Leave some of the coin in the pool. A pool that gives up its whole pile has no price.");
      return;
    }
    const nextCoin = coinReserve + amount;
    const nextHbar = k / nextCoin;
    const out = hbarReserve - nextHbar;
    setCoins(trim(nextCoin));
    setHbars(trim(nextHbar));
    setNotice(`Desk trade: ${fmt(amount)} ${mark} in, ${fmt(out)} HBAR out. The ratio moved. Nothing left this browser.`);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Market deck</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">A price is a meeting.</h1>
      <p className="mt-5 max-w-2xl text-muted">
        Your coin discovers a price when a pile of it meets a pile of something else. This deck reads live rates and
        prints your coin against them. It does not hold the coin, and it does not send a swap.
      </p>
      <IssuedOnTheTape />

      <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-display text-2xl">Your coin</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm text-muted">
              Symbol
              <input
                value={symbol}
                onChange={(event) => setSymbol(event.target.value.slice(0, 12))}
                className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-3 text-fg outline-none focus:border-primary"
              />
            </label>
            <label className="block text-sm text-muted">
              Name
              <input
                value={coinName}
                onChange={(event) => setCoinName(event.target.value.slice(0, 40))}
                className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-3 text-fg outline-none focus:border-primary"
              />
            </label>
          </div>
          <form
            className="mt-3 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              void readToken();
            }}
          >
            <label className="block flex-1 text-sm text-muted">
              Hedera token id
              <input
                value={tokenId}
                onChange={(event) => setTokenId(event.target.value.trim())}
                placeholder="0.0.10607411"
                spellCheck={false}
                className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-fg outline-none focus:border-primary"
              />
            </label>
            <button type="submit" className="min-h-11 self-end rounded-full bg-primary px-4 text-sm font-medium text-primary-fg">
              {reading ? "Reading…" : "Read coin"}
            </button>
          </form>
          <p className="mt-4 font-mono text-xs tracking-widest text-subtle uppercase">Desk pool</p>
          <p className="mt-2 text-sm text-muted">
            Two piles. Constant product. Price in HBAR is the HBAR pile divided by the coin pile. Change either pile,
            or run a desk trade, and the price moves.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm text-muted">
              {mark} in the pool
              <input
                value={coins}
                onChange={(event) => setCoins(event.target.value)}
                inputMode="decimal"
                className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-fg outline-none focus:border-primary"
              />
            </label>
            <label className="block text-sm text-muted">
              HBAR in the pool
              <input
                value={hbars}
                onChange={(event) => setHbars(event.target.value)}
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
              Buy {mark} with HBAR
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
              Sell {mark} for HBAR
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              value={spend}
              onChange={(event) => setSpend(event.target.value)}
              inputMode="decimal"
              aria-label={side === "buy" ? "HBAR to spend" : `${mark} to sell`}
              className="min-h-11 flex-1 rounded-md border border-border bg-bg px-3 font-mono text-fg outline-none focus:border-primary"
            />
            <button type="button" onClick={trade} className="min-h-11 rounded-full bg-primary px-4 text-sm font-medium text-primary-fg">
              Run desk trade
            </button>
          </div>
          {notice ? <p className="mt-4 text-sm text-fg">{notice}</p> : null}
        </section>

        <section className="rounded-xl border border-border bg-surface p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl">{coinName || mark}</h2>
              <p className="mt-1 font-mono text-xs text-subtle">
                {loadedAt ? `Rates ${new Date(loadedAt).toLocaleTimeString()}` : "Reading the book…"}
                {hbarUsd ? ` · HBAR $${fmt(hbarUsd)}` : ""}
              </p>
            </div>
            <button type="button" onClick={() => void loadBook()} className="text-sm text-fg underline decoration-border underline-offset-4">
              Refresh rates
            </button>
          </div>
          {bookError ? <p className="mt-3 text-sm text-muted">{bookError}</p> : null}
          <dl className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-bg p-4">
              <dt className="font-mono text-xs text-subtle">Desk</dt>
              <dd className="mt-1 font-display text-3xl">{deskUsd != null ? `$${fmt(deskUsd)}` : "—"}</dd>
              <dd className="mt-1 text-sm text-muted">
                {deskUsd != null && hbarUsd ? `${fmt(deskUsd / hbarUsd)} HBAR` : "Set both piles"}
              </dd>
            </div>
            <div className="rounded-lg border border-border bg-bg p-4">
              <dt className="font-mono text-xs text-subtle">Listed</dt>
              <dd className="mt-1 font-display text-3xl">{listedUsd != null ? `$${fmt(listedUsd)}` : "None"}</dd>
              <dd className="mt-1 text-sm text-muted">{listedUsd != null ? "SaucerSwap pool" : "No pool read yet"}</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={!useListed || listedUsd == null}
              disabled={deskUsd == null}
              onClick={() => setUseListed(false)}
              className={
                !useListed || listedUsd == null
                  ? "rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-fg disabled:opacity-50"
                  : "rounded-full border border-border px-3 py-2 text-sm text-fg"
              }
            >
              Compare the desk
            </button>
            <button
              type="button"
              aria-pressed={useListed && listedUsd != null}
              disabled={listedUsd == null}
              onClick={() => setUseListed(true)}
              className={
                useListed && listedUsd != null
                  ? "rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
                  : "rounded-full border border-border px-3 py-2 text-sm text-fg disabled:opacity-50"
              }
            >
              Compare the listing
            </button>
          </div>
          <p className="mt-4 text-sm text-muted">
            {priceUsd == null
              ? "Waiting on a price."
              : `1 ${mark} = $${fmt(priceUsd)} on ${useListed && listedUsd != null ? "the listing" : "the desk"}. The rows below are that dollar, changed into each currency.`}
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <a href="https://www.hashpack.app/" target="_blank" rel="noreferrer" className="text-fg underline decoration-border underline-offset-4">
              Open HashPack
            </a>
            <a href="https://www.saucerswap.finance/" target="_blank" rel="noreferrer" className="text-fg underline decoration-border underline-offset-4">
              Open SaucerSwap
            </a>
            {/^\d+\.\d+\.\d+$/.test(tokenId.trim()) ? (
              <a
                href={`https://hashscan.io/mainnet/token/${tokenId.trim()}`}
                target="_blank"
                rel="noreferrer"
                className="text-muted underline decoration-border underline-offset-4"
              >
                HashScan
              </a>
            ) : null}
          </div>
        </section>
      </div>

      <section className="mt-8 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <caption className="border-b border-border bg-surface px-4 py-3 text-left font-display text-2xl text-fg">
            Against the book
          </caption>
          <thead className="font-mono text-xs tracking-wide text-subtle uppercase">
            <tr>
              <th className="px-4 py-2 font-normal">Currency</th>
              <th className="px-4 py-2 text-right font-normal">1 {mark}</th>
              <th className="px-4 py-2 text-right font-normal">1 unit buys</th>
            </tr>
          </thead>
          <tbody>
            {hbarUsd && priceUsd != null ? (
              <tr className="border-t border-border">
                <td className="px-4 py-2">HBAR</td>
                <td className="px-4 py-2 text-right font-mono">{fmt(priceUsd / hbarUsd)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmt(hbarUsd / priceUsd)}</td>
              </tr>
            ) : null}
            {featuredRows.map((row) => (
              <tr key={row.code} className="border-t border-border">
                <td className="px-4 py-2">{row.code}</td>
                <td className="px-4 py-2 text-right font-mono">{fmt(row.yours)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmt(row.theirs)}</td>
              </tr>
            ))}
            {hederaRows.map((row) => (
              <tr key={row.detail} className="border-t border-border">
                <td className="px-4 py-2">
                  {row.code} <span className="font-mono text-xs text-subtle">{row.detail}</span>
                </td>
                <td className="px-4 py-2 text-right font-mono">{fmt(row.yours)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmt(row.theirs)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-4 rounded-xl border border-border bg-surface p-5">
        <button
          type="button"
          aria-expanded={showAll}
          onClick={() => setShowAll((open) => !open)}
          className="font-display text-2xl"
        >
          {showAll ? "Hide the rest of the book" : `Every other currency (${rest.length || "…"})`}
        </button>
        <p className="mt-2 text-sm text-muted">
          Coinbase publishes how many of each currency one dollar buys. Your coin is that dollar times its price. Fiat
          and the long tail live here. Hedera tokens with a SaucerSwap pool are in the table above.
        </p>
        {showAll ? (
          <div className="mt-4 max-h-96 overflow-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-bg font-mono text-xs text-subtle uppercase">
                <tr>
                  <th className="px-3 py-2 font-normal">Code</th>
                  <th className="px-3 py-2 text-right font-normal">1 {mark}</th>
                </tr>
              </thead>
              <tbody>
                {rest.map((row) => (
                  <tr key={row.code} className="border-t border-border">
                    <td className="px-3 py-1.5 font-mono">{row.code}</td>
                    <td className="px-3 py-1.5 text-right font-mono">{fmt(row.yours)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function IssuedOnTheTape() {
  const { form, commit } = useWorkingForm();
  const [side, setSide] = useState<"buy" | "sell">("sell");
  const [spend, setSpend] = useState("100");
  const [note, setNote] = useState("");
  if (!form) return null;
  const model = books(form);
  if (!form.issued) {
    return (
      <section className="mt-8 rounded-xl border border-border bg-surface p-5">
        <h2 className="font-display text-2xl">Same tape</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          No coin is issued. A price here would be ambition before the floor. Post the floor, then issue, and this deck
          trades that coin under the same rule.
        </p>
        <a href="/floor#desk" className="mt-4 inline-flex min-h-11 items-center text-sm text-fg underline decoration-border underline-offset-4">
          Issue on the tape
        </a>
      </section>
    );
  }
  return (
    <section className="mt-8 rounded-xl border border-border bg-surface p-5">
      <h2 className="font-display text-2xl">Same tape · {model.mark}</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Book {model.book > 0 ? `$${fmt(model.book)}` : "—"}. Market {model.market > 0 ? `$${fmt(model.market)}` : "—"}
        {model.basket > 0 && model.market > 0 ? `, ${fmt(model.coinBaskets)} baskets a coin.` : "."} The floor is not in this pool, and this trade does not mint {model.unit}.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={side === "buy"}
          onClick={() => setSide("buy")}
          className={side === "buy" ? "rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-fg" : "rounded-full border border-border px-3 py-2 text-sm text-fg"}
        >
          Buy
        </button>
        <button
          type="button"
          aria-pressed={side === "sell"}
          onClick={() => setSide("sell")}
          className={side === "sell" ? "rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-fg" : "rounded-full border border-border px-3 py-2 text-sm text-fg"}
        >
          Sell
        </button>
        <input
          value={spend}
          onChange={(event) => setSpend(event.target.value)}
          inputMode="decimal"
          aria-label={side === "buy" ? "Dollars to spend" : "Coins to sell"}
          className="min-h-11 w-28 rounded-md border border-border bg-bg px-3 font-mono text-fg outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={() => {
            const result = tradePool(form, side, spend);
            commit(result.form);
            setNote(result.notice);
          }}
          className="min-h-11 rounded-full bg-primary px-4 text-sm font-medium text-primary-fg"
        >
          Write the trade
        </button>
      </div>
      {note ? <p className="mt-3 text-sm text-fg">{note}</p> : null}
      <a href="/floor#desk" className="mt-3 inline-block text-sm text-muted underline decoration-border underline-offset-4">
        Read the tape
      </a>
    </section>
  );
}
