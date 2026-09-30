import { useEffect, useMemo, useState } from "react";
import { MyStuff } from "@/components/my-stuff";
import {
  CLUB_ACCOUNT,
  EVENT_KINDS,
  HANDLE,
  money,
  OPENING_CENTS,
  sessionBill,
  STOP_CENTS,
} from "@/lib/site-data";

const STORE = "sealroom-desk";

type Kind = (typeof EVENT_KINDS)[number]["id"];
type DeskEvent = { id: string; kind: Kind; where: string; detail: string; at: string };
type LedgerEntry = { id: string; kind: "open" | "fee" | "refill"; cents: number; balance: number; note: string; at: string };
type Ledger = { balanceCents: number; refill: boolean; entries: LedgerEntry[] };
export type Seal = {
  id: string;
  serial: number;
  sealedAt: string;
  events: DeskEvent[];
  sha: string;
  key: string | null;
  cents: number;
  coins: number;
};
type Desk = {
  handle: string | null;
  events: DeskEvent[];
  seals: Seal[];
  nextSerial: number;
  ledger: Ledger | null;
  recording: boolean;
};

const EMPTY: Desk = { handle: null, events: [], seals: [], nextSerial: 1, ledger: null, recording: false };

async function digest(text: string) {
  const bytes = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function short(value: string) {
  return value.length < 18 ? value : `${value.slice(0, 10)}…${value.slice(-8)}`;
}

function when(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export function Sealroom() {
  const [desk, setDesk] = useState<Desk>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [tab, setTab] = useState<"console" | "history" | "access">("console");
  const [draftHandle, setDraftHandle] = useState("");
  const [kind, setKind] = useState<Kind>("note");
  const [where, setWhere] = useState("");
  const [detail, setDetail] = useState("");
  const [notice, setNotice] = useState("");
  const [openSeal, setOpenSeal] = useState<string | null>(null);
  const [stuffOpen, setStuffOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const parsed = JSON.parse(raw) as Desk;
        if (parsed && typeof parsed === "object") setDesk({ ...EMPTY, ...parsed, recording: false });
      }
    } catch {
      /* start empty */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORE, JSON.stringify({ ...desk, recording: false }));
  }, [desk, hydrated]);

  const bill = useMemo(() => sessionBill(desk.events.length), [desk.events.length]);
  const kindMeta = EVENT_KINDS.find((item) => item.id === kind) ?? EVENT_KINDS[0];
  const stopped = !!desk.ledger && desk.ledger.balanceCents <= STOP_CENTS;

  function bind(event: React.FormEvent) {
    event.preventDefault();
    const handle = draftHandle.trim().replace(/^@+/, "");
    if (!/^[A-Za-z0-9_]{1,15}$/.test(handle)) {
      setNotice("Only an X handle names the private party.");
      return;
    }
    setDesk((current) => ({ ...current, handle }));
    setNotice("");
    setDraftHandle("");
  }

  function openLedger(refill: boolean) {
    setDesk((current) => {
      if (current.ledger) return current;
      const entry: LedgerEntry = {
        id: crypto.randomUUID(),
        kind: "open",
        cents: OPENING_CENTS,
        balance: OPENING_CENTS,
        note: `Opening balance due to @${HANDLE}`,
        at: new Date().toISOString(),
      };
      return { ...current, ledger: { balanceCents: OPENING_CENTS, refill, entries: [entry] } };
    });
    setNotice(`Recorded ${money(OPENING_CENTS)} on this desk. Nothing left this browser.`);
  }

  function refill() {
    setDesk((current) => {
      if (!current.ledger) return current;
      if (current.ledger.balanceCents > STOP_CENTS) return current;
      const balance = current.ledger.balanceCents + OPENING_CENTS;
      const entry: LedgerEntry = {
        id: crypto.randomUUID(),
        kind: "refill",
        cents: OPENING_CENTS,
        balance,
        note: `Refill ${money(OPENING_CENTS)} due to @${HANDLE}`,
        at: new Date().toISOString(),
      };
      return { ...current, ledger: { ...current.ledger, balanceCents: balance, entries: [entry, ...current.ledger.entries].slice(0, 30) } };
    });
  }

  function addEvent(event: React.FormEvent) {
    event.preventDefault();
    const meta = EVENT_KINDS.find((item) => item.id === kind) ?? EVENT_KINDS[0];
    const next: DeskEvent = {
      id: crypto.randomUUID(),
      kind,
      where: where.trim() || meta.where,
      detail: detail.trim(),
      at: new Date().toISOString(),
    };
    setDesk((current) => ({ ...current, events: [next, ...current.events].slice(0, 40) }));
    setDetail("");
    setNotice("");
  }

  async function seal() {
    if (!desk.handle) {
      setNotice("Bind an X handle on the Access tab.");
      setTab("access");
      return;
    }
    if (!desk.recording) {
      setNotice("Start the receipt, then tokenize the session.");
      return;
    }
    if (!desk.ledger) {
      setNotice(`Record the ${money(OPENING_CENTS)} receipt to @${HANDLE} first.`);
      setTab("access");
      return;
    }
    if (desk.ledger.balanceCents <= STOP_CENTS) {
      setNotice(`Access stopped. Balance reached ${money(STOP_CENTS)}. Refill ${money(OPENING_CENTS)} to @${HANDLE}.`);
      setTab("access");
      return;
    }
    if (desk.ledger.balanceCents < bill.cents) {
      setNotice(`Balance is ${money(desk.ledger.balanceCents)}. This session is ${money(bill.cents)}.`);
      return;
    }
    if (desk.events.length === 0) {
      setNotice("The receipt is empty. Add a line on the History tab.");
      setTab("history");
      return;
    }
    const payload = JSON.stringify({ v: 1, party: desk.handle, events: desk.events });
    const sha = await digest(payload);
    const key = crypto.randomUUID().replace(/-/g, "");
    const balance = desk.ledger.balanceCents - bill.cents;
    const entry: LedgerEntry = {
      id: crypto.randomUUID(),
      kind: "fee",
      cents: bill.cents,
      balance,
      note: `Session ${money(bill.cents)} · coins $${bill.coins.toFixed(4)}`,
      at: new Date().toISOString(),
    };
    const minted: Seal = {
      id: crypto.randomUUID(),
      serial: desk.nextSerial,
      sealedAt: new Date().toISOString(),
      events: desk.events,
      sha,
      key,
      cents: bill.cents,
      coins: bill.coins,
    };
    let nextLedger: Ledger = {
      ...desk.ledger,
      balanceCents: balance,
      entries: [entry, ...desk.ledger.entries].slice(0, 30),
    };
    if (nextLedger.refill && nextLedger.balanceCents <= OPENING_CENTS * 0.25) {
      const refilled = nextLedger.balanceCents + OPENING_CENTS;
      const refillEntry: LedgerEntry = {
        id: crypto.randomUUID(),
        kind: "refill",
        cents: OPENING_CENTS,
        balance: refilled,
        note: `Balance was at 25%. ${money(OPENING_CENTS)} refill due to @${HANDLE}`,
        at: new Date().toISOString(),
      };
      nextLedger = {
        ...nextLedger,
        balanceCents: refilled,
        entries: [refillEntry, ...nextLedger.entries].slice(0, 30),
      };
    }
    setDesk((current) => ({
      ...current,
      events: [],
      recording: false,
      nextSerial: current.nextSerial + 1,
      seals: [minted, ...current.seals].slice(0, 24),
      ledger: nextLedger,
    }));
    setOpenSeal(minted.id);
    setNotice(`Sealed #${minted.serial} for @${desk.handle}. The key stays on this desk until you drop it.`);
  }

  const barMax = Math.max(desk.ledger?.balanceCents ?? OPENING_CENTS, OPENING_CENTS);
  const bar = desk.ledger ? Math.min(100, Math.round((desk.ledger.balanceCents / barMax) * 100)) : 0;

  return (
    <div className="bg-ink text-parchment">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
        <p className="font-mono text-xs tracking-widest text-mute uppercase">Sealroom · demo desk</p>
        <div className="mt-4 flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-5xl leading-none sm:text-6xl">Notarize the act.</h1>
            <p className="mt-4 max-w-xl text-mute">
              A phone-first private-party notary. Timestamped on this desk, then sealed as a local NFT record. Coins are
              counted as if from HashPack <span className="text-parchment">clubhbar.ℏ {CLUB_ACCOUNT}</span>. This demo
              does not move X Money and does not write Hedera.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              aria-expanded={stuffOpen}
              aria-controls="my-stuff"
              onClick={() => setStuffOpen((open) => !open)}
              className={
                stuffOpen
                  ? "inline-flex min-h-14 items-center rounded-full bg-copper px-6 font-display text-lg text-copper-ink"
                  : "inline-flex min-h-14 items-center rounded-full border border-copper px-6 font-display text-lg text-copper"
              }
            >
              My Stuff
            </button>
            <button
              type="button"
              onClick={() => setDesk((current) => ({ ...current, recording: !current.recording }))}
              className={
                desk.recording
                  ? "inline-flex min-h-14 items-center rounded-full border border-live px-6 font-display text-lg text-live"
                  : "inline-flex min-h-14 items-center rounded-full border border-seal px-6 font-display text-lg text-seal"
              }
              aria-pressed={desk.recording}
            >
              {desk.recording ? "Receipt on" : "Start receipt"}
            </button>
          </div>
        </div>
        {stuffOpen ? <MyStuff seals={desk.seals} /> : null}

        <div className="mt-6 flex flex-wrap gap-2" role="tablist">
          {(
            [
              ["console", "Console"],
              ["history", "History"],
              ["access", "Access"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={
                tab === id
                  ? "rounded-full bg-copper px-4 py-2 text-sm font-medium text-copper-ink"
                  : "rounded-full border border-line px-4 py-2 text-sm text-parchment"
              }
            >
              {label}
            </button>
          ))}
        </div>
        {notice ? <p className="mt-4 text-sm text-copper">{notice}</p> : null}

        {tab === "console" ? (
          <section className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-line bg-panel p-5">
              <p className="font-mono text-xs tracking-widest text-mute uppercase">Party</p>
              {desk.handle ? (
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-4xl">@{desk.handle}</p>
                    <p className="mt-1 text-sm text-mute">Private party · keys stay here · no topic until a real rail</p>
                  </div>
                  <button type="button" className="text-sm text-mute underline" onClick={() => setDesk((d) => ({ ...d, handle: null }))}>
                    Clear
                  </button>
                </div>
              ) : (
                <form onSubmit={bind} className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <label className="sr-only" htmlFor="party-query">
                    X handle
                  </label>
                  <input
                    id="party-query"
                    value={draftHandle}
                    onChange={(event) => setDraftHandle(event.target.value)}
                    placeholder={`@${HANDLE}`}
                    className="min-h-12 flex-1 rounded-md border border-line bg-ink px-3 text-parchment outline-none focus:border-copper"
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                  />
                  <button type="submit" className="min-h-12 rounded-full bg-copper px-5 text-sm font-medium text-copper-ink">
                    Bind
                  </button>
                </form>
              )}
              <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
                <div>
                  <dt className="font-mono text-xs text-mute">Balance</dt>
                  <dd className="mt-1 font-display text-3xl">{desk.ledger ? money(desk.ledger.balanceCents) : "—"}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-mute">Waiting</dt>
                  <dd className="mt-1 font-display text-3xl">{desk.events.length}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-mute">Seals</dt>
                  <dd className="mt-1 font-display text-3xl">{desk.seals[0] ? `#${desk.seals[0].serial}` : "None"}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-mute">
                Session {money(bill.cents)} · coins ${bill.coins.toFixed(4)}
                {stopped ? " · access stopped" : desk.recording ? " · receiving" : ""}
              </p>
              <button
                type="button"
                onClick={() => void seal()}
                className="mt-5 min-h-12 rounded-full bg-seal px-5 text-sm font-medium text-seal-ink disabled:opacity-50"
              >
                Tokenize session
              </button>
            </div>
            <div className="rounded-2xl border border-line bg-panel p-5">
              <p className="font-mono text-xs tracking-widest text-mute uppercase">Latest seals</p>
              {desk.seals.length === 0 ? (
                <p className="mt-4 text-sm text-mute">None minted. A seal is a local record: serial, time, hash, and the lines you signed.</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {desk.seals.map((sealItem) => (
                    <li key={sealItem.id} className="border-t border-line pt-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-display text-2xl">#{sealItem.serial}</p>
                        <time className="font-mono text-xs text-mute">{when(sealItem.sealedAt)}</time>
                      </div>
                      <p className="mt-1 text-sm">
                        {sealItem.events.length} {sealItem.events.length === 1 ? "line" : "lines"} · {money(sealItem.cents)} · $
                        {sealItem.coins.toFixed(4)}
                      </p>
                      <p className="mt-1 font-mono text-xs text-mute">{short(sealItem.sha)}</p>
                      <div className="mt-3 flex flex-wrap gap-3 text-sm">
                        <button type="button" className="text-copper" onClick={() => setOpenSeal(openSeal === sealItem.id ? null : sealItem.id)}>
                          {openSeal === sealItem.id ? "Hide record" : "Show record"}
                        </button>
                        {sealItem.key ? (
                          <button
                            type="button"
                            className="text-mute"
                            onClick={() =>
                              setDesk((current) => ({
                                ...current,
                                seals: current.seals.map((item) => (item.id === sealItem.id ? { ...item, key: null } : item)),
                              }))
                            }
                          >
                            Drop key
                          </button>
                        ) : (
                          <span className="text-mute">Key dropped</span>
                        )}
                      </div>
                      {openSeal === sealItem.id ? (
                        <pre className="mt-3 overflow-x-auto rounded-lg bg-ink p-3 font-mono text-xs text-parchment">
                          {JSON.stringify(
                            {
                              name: `Sealroom #${sealItem.serial}`,
                              description: `${sealItem.events.length} ${sealItem.events.length === 1 ? "line" : "lines"} sealed for @${desk.handle ?? "party"}.`,
                              sha256: sealItem.sha,
                              key: sealItem.key ?? "dropped",
                              attributes: [
                                { trait_type: "events", value: sealItem.events.length },
                                { trait_type: "sealed", value: sealItem.sealedAt },
                              ],
                            },
                            null,
                            2,
                          )}
                        </pre>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ) : null}

        {tab === "history" ? (
          <section className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <form onSubmit={addEvent} className="rounded-2xl border border-line bg-panel p-5">
              <p className="font-mono text-xs tracking-widest text-mute uppercase">Add to history</p>
              <label htmlFor="kind" className="mt-4 block text-sm text-mute">
                Kind
              </label>
              <select
                id="kind"
                value={kind}
                onChange={(event) => setKind(event.target.value as Kind)}
                className="mt-2 min-h-12 w-full rounded-md border border-line bg-ink px-3 text-parchment"
              >
                {EVENT_KINDS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <label htmlFor="where" className="mt-4 block text-sm text-mute">
                {kindMeta.where}
              </label>
              <input
                id="where"
                value={where}
                onChange={(event) => setWhere(event.target.value)}
                placeholder={kindMeta.hint}
                className="mt-2 min-h-12 w-full rounded-md border border-line bg-ink px-3 text-parchment outline-none focus:border-copper"
              />
              <label htmlFor="detail" className="mt-4 block text-sm text-mute">
                Detail
              </label>
              <textarea
                id="detail"
                rows={3}
                value={detail}
                onChange={(event) => setDetail(event.target.value)}
                placeholder={kindMeta.hint}
                className="mt-2 w-full rounded-md border border-line bg-ink px-3 py-3 text-parchment outline-none focus:border-copper"
              />
              <button type="submit" className="mt-4 min-h-12 rounded-full bg-copper px-5 text-sm font-medium text-copper-ink">
                Add to history
              </button>
            </form>
            <ol className="rounded-2xl border border-line bg-panel p-5">
              {desk.events.length === 0 ? (
                <li className="text-sm text-mute">No lines waiting. A phone, a file, a visit, a note — write it before you seal.</li>
              ) : (
                desk.events.map((item) => (
                  <li key={item.id} className="flex items-start justify-between gap-3 border-b border-line py-3 last:border-0">
                    <div>
                      <p className="text-sm text-copper">{EVENT_KINDS.find((kindItem) => kindItem.id === item.kind)?.label}</p>
                      <p className="text-parchment">{item.where}</p>
                      {item.detail ? <p className="text-sm text-mute">{item.detail}</p> : null}
                      <time className="font-mono text-xs text-mute">{when(item.at)}</time>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove line"
                      className="text-sm text-mute"
                      onClick={() => setDesk((current) => ({ ...current, events: current.events.filter((event) => event.id !== item.id) }))}
                    >
                      Remove
                    </button>
                  </li>
                ))
              )}
            </ol>
          </section>
        ) : null}

        {tab === "access" ? (
          <section className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-panel p-5">
              <p className="font-mono text-xs tracking-widest text-mute uppercase">Desk balance</p>
              <p className="mt-3 text-sm text-mute">
                {money(OPENING_CENTS)} opens the desk, recorded as due to @{HANDLE}. Execution coins are counted against{" "}
                clubhbar.ℏ {CLUB_ACCOUNT}. Access is asked here when it is needed. This does not pull dollars from X Money.
              </p>
              {desk.ledger ? (
                <>
                  <p className="mt-5 font-display text-5xl">{money(desk.ledger.balanceCents)}</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink" aria-hidden>
                    <div className="h-full bg-copper" style={{ width: `${bar}%` }} />
                  </div>
                  <label className="mt-4 flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="mt-1 size-4 accent-copper"
                      checked={desk.ledger.refill}
                      onChange={(event) =>
                        setDesk((current) =>
                          current.ledger ? { ...current, ledger: { ...current.ledger, refill: event.target.checked } } : current,
                        )
                      }
                    />
                    <span>
                      {money(OPENING_CENTS)} refill to @{HANDLE} whenever the balance is at 25%.
                    </span>
                  </label>
                  {stopped ? (
                    <button type="button" onClick={refill} className="mt-4 min-h-12 rounded-full bg-copper px-5 text-sm font-medium text-copper-ink">
                      Refill {money(OPENING_CENTS)}
                    </button>
                  ) : null}
                  <ul className="mt-5 divide-y divide-line border-t border-line text-sm">
                    {desk.ledger.entries.slice(0, 6).map((entry) => (
                      <li key={entry.id} className="flex justify-between gap-3 py-2">
                        <span className="text-mute">{entry.note}</span>
                        <span className="font-mono">{money(entry.balance)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <button type="button" onClick={() => openLedger(false)} className="mt-5 min-h-12 rounded-full bg-copper px-5 text-sm font-medium text-copper-ink">
                  Record the {money(OPENING_CENTS)} receipt
                </button>
              )}
            </div>
            <form onSubmit={bind} className="rounded-2xl border border-line bg-panel p-5">
              <p className="font-mono text-xs tracking-widest text-mute uppercase">Private party</p>
              <p className="mt-3 text-sm text-mute">Bind an X handle to open Sealroom. The tag is the name on the seal. It is not sent anywhere.</p>
              <label htmlFor="access-tag" className="mt-4 block text-sm text-mute">
                X handle
              </label>
              <input
                id="access-tag"
                value={draftHandle}
                onChange={(event) => setDraftHandle(event.target.value)}
                placeholder={desk.handle ? `@${desk.handle}` : `@you`}
                className="mt-2 min-h-12 w-full rounded-md border border-line bg-ink px-3 text-parchment outline-none focus:border-copper"
                spellCheck={false}
                autoCapitalize="off"
              />
              <button type="submit" className="mt-4 min-h-12 rounded-full border border-line px-5 text-sm text-parchment">
                {desk.handle ? `Bound @${desk.handle} — bind another` : "Bind an X handle"}
              </button>
            </form>
          </section>
        ) : null}
      </div>
    </div>
  );
}
