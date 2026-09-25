import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  ExternalLink,
  KeyRound,
  Circle,
  Layers,
  LockKeyhole,
  Plus,
  ScrollText,
  Search,
  Square,
  Trash2,
  X,
} from "lucide-react";
import { lookupParty, readTopic, type TopicMessage } from "@/lib/ledger.functions";
import {
  buildHip412,
  bytesToB64,
  chunkHcs1,
  encryptFile,
  hcs1Memo,
  nftPointer,
  openSealedFile,
  sha256Hex,
  type SealDocument,
} from "@/lib/seal/protocol";
import {
  ACCESS_INBOX,
  EXECUTOR_ACCOUNT,
  EXECUTOR_NAME,
  EXECUTOR_WALLET,
  LOW_CENTS,
  PAYEE,
  START_CENTS,
  sessionQuote,
  usd,
  usdFine,
} from "@/lib/seal/price";
import { useSealStore, type Interaction, type Party, type Receipt } from "@/lib/seal/store";

import { cn } from "@/lib/utils";

const KINDS: { id: Interaction["kind"]; label: string; where: string; hint: string }[] = [
  { id: "phone", label: "Phone", where: "This phone", hint: "This phone" },
  { id: "visit", label: "Visit", where: "Page", hint: "https://example.com/pricing" },
  { id: "message", label: "Message", where: "To", hint: "ada@archive.test" },
  { id: "file", label: "File", where: "File", hint: "q3-statement.pdf" },
  { id: "form", label: "Form", where: "Form", hint: "https://example.com/apply" },
  { id: "note", label: "Note", where: "About", hint: "Phone call, 4 minutes" },
];

function shortHash(value: string): string {
  if (value.length < 18) return value;
  return `${value.slice(0, 10)}…${value.slice(-8)}`;
}

async function historyPointer(events: Interaction[]): Promise<string> {
  const file = JSON.stringify({ v: 1, file: "sealroom-history.json", events });
  const hash = await sha256Hex(new TextEncoder().encode(file));
  return nftPointer(hash);
}

async function downloadPointer(pointer: string): Promise<void> {
  const body = `${pointer}\n`;
  const picker = (
    window as Window & {
      showSaveFilePicker?: (options: {
        suggestedName: string;
        types: { description: string; accept: Record<string, string[]> }[];
      }) => Promise<{
        createWritable: () => Promise<{ write: (data: string) => Promise<void>; close: () => Promise<void> }>;
      }>;
    }
  ).showSaveFilePicker;
  if (picker) {
    const handle = await picker({
      suggestedName: "sealroom-pointer.txt",
      types: [{ description: "History pointer", accept: { "text/plain": [".txt"] } }],
    });
    const writable = await handle.createWritable();
    await writable.write(body);
    await writable.close();
    return;
  }
  const blob = new Blob([body], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sealroom-pointer.txt";
  link.click();
  URL.revokeObjectURL(url);
}

function when(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const now = new Date();
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function hashscanTopic(network: string, topicId: string): string {
  return `https://hashscan.io/${network}/topic/${topicId}`;
}

export function SealApp() {
  const hydrated = useSealStore((state) => state.hydrated);
  const party = useSealStore((state) => state.party);
  const openEvents = useSealStore((state) => state.openEvents);
  const receipts = useSealStore((state) => state.receipts);
  const setParty = useSealStore((state) => state.setParty);
  const addEvent = useSealStore((state) => state.addEvent);
  const removeEvent = useSealStore((state) => state.removeEvent);
  const addReceipt = useSealStore((state) => state.addReceipt);
  const dropKey = useSealStore((state) => state.dropKey);
  const ledger = useSealStore((state) => state.ledger);
  const openLedger = useSealStore((state) => state.openLedger);
  const setRefillConsent = useSealStore((state) => state.setRefillConsent);
  const chargeSeal = useSealStore((state) => state.chargeSeal);
  const askExecutorAccess = useSealStore((state) => state.askExecutorAccess);
  const askRefillAccess = useSealStore((state) => state.askRefillAccess);
  const refillLedger = useSealStore((state) => state.refillLedger);
  const addInbox = useSealStore((state) => state.addInbox);
  const recording = useSealStore((state) => state.recording);
  const setRecording = useSealStore((state) => state.setRecording);

  const [query, setQuery] = useState("");
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [looking, setLooking] = useState(false);
  const [messages, setMessages] = useState<TopicMessage[]>([]);
  const [mirrorError, setMirrorError] = useState<string | null>(null);
  const [mirrorBusy, setMirrorBusy] = useState(false);
  const [sealing, setSealing] = useState(false);
  const [sealError, setSealError] = useState<string | null>(null);
  const [opened, setOpened] = useState<{ id: string; doc: SealDocument | null; error: string | null } | null>(
    null,
  );
  const [feeNote, setFeeNote] = useState<string | null>(null);
  const [allowRefill, setAllowRefill] = useState(true);
  const [showInscription, setShowInscription] = useState<string | null>(null);
  const [desk, setDesk] = useState<"tape" | "console" | "access" | null>(null);
  const [fileNote, setFileNote] = useState<string | null>(null);
  const [savePulse, setSavePulse] = useState(0);
  const [kind, setKind] = useState<Interaction["kind"]>("phone");
  const [where, setWhere] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    const pending = useSealStore.persist.rehydrate();
    void Promise.resolve(pending).finally(() => {
      useSealStore.setState({ hydrated: true });
    });
  }, []);

  const accessOn = Boolean(ledger && ledger.balanceCents > LOW_CENTS && party?.xHandle);
  const wasAccess = useRef(false);

  useEffect(() => {
    if (!hydrated) return;
    const turnedOn = accessOn && !wasAccess.current;
    wasAccess.current = accessOn;
    if (!accessOn) {
      const state = useSealStore.getState();
      if (state.recording && sessionIsOpen(state.openEvents)) {
        addEvent({ kind: "phone", where: "This phone", detail: "Receipt stopped" });
        addEvent({ kind: "phone", where: "This phone", detail: "Access stopped" });
      }
      if (state.recording) setRecording(false);
      return;
    }
    if (!turnedOn) return;
    setRecording(true);
    if (!sessionIsOpen(useSealStore.getState().openEvents)) {
      addEvent({ kind: "phone", where: "This phone", detail: "Receipt started" });
    }
  }, [hydrated, accessOn, addEvent, setRecording]);

  useEffect(() => {
    if (desk !== "console") return;
    document.getElementById("sealroom-page")?.scrollIntoView({ block: "start" });
  }, [desk]);

  useEffect(() => {
    if (!party?.topicId || party.network === "x") {
      setMessages([]);
      setMirrorError(null);
      return;
    }
    const network = party.network;
    let cancel = false;
    setMirrorBusy(true);
    void readTopic({ data: { topicId: party.topicId, network } })
      .then((result) => {
        if (cancel) return;
        setMessages(result.messages);
        setMirrorError(result.error);
      })
      .catch(() => {
        if (!cancel) setMirrorError("Could not read the Hedera mirror node.");
      })
      .finally(() => {
        if (!cancel) setMirrorBusy(false);
      });
    return () => {
      cancel = true;
    };
  }, [party?.topicId, party?.network]);

  useEffect(() => {
    if (!recording) return;
    function onVisibility() {
      addEvent({
        kind: "phone",
        where: "This phone",
        detail: document.hidden ? "Left Sealroom" : "Returned to Sealroom",
      });
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [recording, addEvent]);

  async function bind(name: string) {
    const tag = xTag(name);
    if (!tag) {
      setLookupError("Only an X handle names the private party.");
      return;
    }
    setLooking(true);
    setLookupError(null);
    try {
      const result = await lookupParty({ data: { query: tag } });
      if (result.party) {
        setParty({ ...result.party, handle: tag, displayName: `@${tag}`, xHandle: tag });
      } else {
        setParty(xParty(tag));
      }
      setQuery(`@${tag}`);
      noteBound(`@${tag}`);
    } catch {
      setParty(xParty(tag));
      setQuery(`@${tag}`);
      noteBound(`@${tag}`);
    } finally {
      setLooking(false);
    }
  }

  async function sendPointer() {
    const bound = useSealStore.getState().party;
    if (!bound?.xHandle) {
      setFileNote("Bind an X handle. Save sends the pointer to that inbox.");
      return;
    }
    const pointer = await historyPointer(useSealStore.getState().openEvents);
    addInbox({ binder: bound.xHandle, pointer, file: "sealroom-history.json" });
    setFileNote(null);
    setSavePulse((pulse) => pulse + 1);
  }

  async function choosePointerDestination() {
    setFileNote(null);
    try {
      const pointer = await historyPointer(useSealStore.getState().openEvents);
      await downloadPointer(pointer);
      setFileNote("Pointer saved to the place you chose.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setFileNote("The pointer was not saved.");
    }
  }

  function noteBound(label: string) {
    if (!useSealStore.getState().recording) return;
    addEvent({ kind: "phone", where: "This phone", detail: `Bound ${label}` });
  }

  function toggleReceipt() {
    if (!accessOn) {
      setSealError(
        ledger && ledger.balanceCents <= LOW_CENTS
          ? `Access stopped. Balance reached ${usd(LOW_CENTS)}. Refill ${usd(START_CENTS)} to ${PAYEE}.`
          : `Bind an X handle after the ${usd(START_CENTS)} receipt on ${PAYEE}.`,
      );
      return;
    }
    if (recording) {
      addEvent({ kind: "phone", where: "This phone", detail: "Receipt stopped" });
      setRecording(false);
      return;
    }
    setRecording(true);
    addEvent({ kind: "phone", where: "This phone", detail: "Receipt started" });
  }

  async function seal() {
    const live = useSealStore.getState();
    if (!live.party?.xHandle) {
      setSealError(`Bind an X handle after the ${usd(START_CENTS)} receipt on ${PAYEE}.`);
      return;
    }
    if (!live.ledger || live.ledger.balanceCents <= LOW_CENTS) {
      setSealError(`Access stopped. Balance reached ${usd(LOW_CENTS)}. Refill ${usd(START_CENTS)} to ${PAYEE}.`);
      return;
    }
    if (live.recording) {
      addEvent({ kind: "phone", where: "This phone", detail: "Receipt stopped" });
      setRecording(false);
    }
    const events = useSealStore.getState().openEvents;
    if (events.length === 0) {
      setSealError("Start the receipt, then tokenize the session.");
      return;
    }
    setSealing(true);
    setSealError(null);
    try {
      const sealedAt = new Date().toISOString();
      const document = {
        v: 1 as const,
        sealedAt,
        party: {
          handle: live.party.handle,
          did: live.party.did,
          accountId: live.party.accountId,
          topicId: live.party.topicId,
        },
        events: [...events].reverse(),
      };
      const plain = new TextEncoder().encode(JSON.stringify(document));
      const { file, keyB64 } = await encryptFile(plain);
      const sha256 = await sha256Hex(file);
      const chunks = chunkHcs1(bytesToB64(file));
      const quote = sessionQuote(chunks.length);
      const coinNote = `${usdFine(quote.coins)} from ${EXECUTOR_WALLET} ${EXECUTOR_NAME} ${EXECUTOR_ACCOUNT}`;
      if (!useSealStore.getState().executorAccess) {
        askExecutorAccess(
          `Need HashPack access for ${EXECUTOR_NAME} ${EXECUTOR_ACCOUNT} to execute ${usdFine(quote.coins)} in coins.`,
        );
        setSealError(`Asked ${ACCESS_INBOX} for access to ${EXECUTOR_NAME} ${EXECUTOR_ACCOUNT}.`);
        return;
      }
      const paid = chargeSeal(quote.cents, `Session ${usd(quote.cents)} · coins ${coinNote}`);
      if (!paid.ok) {
        if (paid.reason.startsWith("Access stopped") || paid.reason.startsWith("Balance")) {
          askRefillAccess(`Need a refill so ${EXECUTOR_NAME} ${EXECUTOR_ACCOUNT} can keep executing. ${paid.reason}`);
        }
        setSealError(paid.reason);
        return;
      }
      const pointer = nftPointer(sha256);
      const hip412 = buildHip412({
        serial: useSealStore.getState().nextSerial,
        partyHandle: live.party.handle,
        partyDid: live.party.did,
        accountId: live.party.accountId,
        eventCount: document.events.length,
        sha256,
        sealedAt,
      });
      addReceipt({
        sealedAt,
        party: live.party,
        events: document.events,
        sha256,
        memo: hcs1Memo(sha256),
        pointer,
        plaintextBytes: plain.byteLength,
        fileBytes: file.byteLength,
        chunks,
        hip412,
        keyB64,
      });
      setFeeNote(
        `Session ${usd(quote.cents)}. Coins ${coinNote}. Balance ${usd(paid.balanceCents)}.`,
      );
    } catch (error) {
      setSealError(error instanceof Error ? error.message : "Could not seal this record.");
    } finally {
      setSealing(false);
    }
  }

  async function openReceipt(receipt: Receipt) {
    if (!receipt.keyB64) {
      setOpened({ id: receipt.id, doc: null, error: "The key is not on this desk. The inscription stays ciphertext." });
      return;
    }
    try {
      const doc = await openSealedFile(receipt.chunks, receipt.keyB64);
      setOpened({ id: receipt.id, doc, error: null });
    } catch {
      setOpened({ id: receipt.id, doc: null, error: "The file did not open. The key does not match the inscription." });
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 pb-32 sm:px-6 sm:py-10">
      <p className="mb-4 text-center text-sm text-mute">
        Demo on{" "}
        <Link to="/" className="text-copper">
          Egonomic Anonymous
        </Link>
      </p>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-3" role="tablist" aria-label="Desk">
        <button
          type="button"
          role="tab"
          id="tab-history"
          aria-selected={desk === "tape"}
          aria-controls="panel-history"
          onClick={() => setDesk((current) => (current === "tape" ? null : "tape"))}
          className={cn(
            "min-h-16 rounded-full px-8 font-display text-xl",
            desk === "tape" ? "bg-live text-live-ink" : "border border-live text-live",
          )}
        >
          History
        </button>
        <button
          type="button"
          onClick={() => void choosePointerDestination()}
          className="inline-flex min-h-11 items-center rounded-full border border-live px-4 text-sm font-medium text-live"
        >
          Download
        </button>
        <button
          type="button"
          key={savePulse}
          onClick={() => void sendPointer()}
          className={cn(
            "inline-flex min-h-11 items-center rounded-full bg-live px-4 text-sm font-medium text-live-ink",
            savePulse > 0 && "save-flash",
          )}
        >
          Save
        </button>
        {ledger ? (
          <button
            type="button"
            role="tab"
            id="tab-access"
            aria-selected={desk === "access"}
            aria-controls="panel-access"
            onClick={() => setDesk((current) => (current === "access" ? null : "access"))}
            className={cn(
              "min-h-11 rounded-full px-4 text-sm font-medium",
              desk === "access" ? "bg-copper text-copper-ink" : "border border-line text-parchment",
            )}
          >
            Access
          </button>
        ) : null}
        </div>
        {fileNote ? (
          <p className={fileNote.startsWith("Pointer saved") ? "text-sm text-live" : "text-sm text-copper"}>{fileNote}</p>
        ) : null}
      </div>

      <div className="mt-3 grid items-start gap-4">
        {desk === "access" && ledger ? (
        <section id="panel-access" role="tabpanel" aria-labelledby="tab-access" className="grid gap-4">
          <article className="rounded-2xl border border-line bg-panel p-4 sm:p-5">
            <h2 className="font-display text-2xl">Access</h2>
            <p className="mt-1 text-sm text-mute">
              {usd(START_CENTS)} receipt is on {PAYEE}. Bind an X handle to open Sealroom. Execution coins come from {EXECUTOR_WALLET} {EXECUTOR_NAME} {EXECUTOR_ACCOUNT}. Access for that wallet is asked in the {ACCESS_INBOX} inbox.
            </p>
            <form
              className="mt-4 flex flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                void bind(query);
              }}
            >
              <label className="sr-only" htmlFor="access-tag">
                X handle
              </label>
              <input
                id="access-tag"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="@handle"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="min-h-11 w-full rounded-xl border border-line bg-ink px-3 text-parchment outline-none placeholder:text-mute focus-visible:border-copper"
              />
              <button
                type="submit"
                disabled={looking || !hydrated}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-copper px-4 font-medium text-copper-ink disabled:opacity-50"
              >
                <Search className="size-4" aria-hidden="true" />
                {looking ? "Looking" : "Bind"}
              </button>
            </form>
            {lookupError ? <p className="mt-3 text-sm text-copper">{lookupError}</p> : null}
            <p className="mt-4 text-sm text-parchment">
              {accessOn
                ? `Access on for @${party?.xHandle}.`
                : party?.xHandle
                  ? `Stopped. Balance reached ${usd(LOW_CENTS)}.`
                  : "Bind an X handle to activate access."}
            </p>
            {ledger.balanceCents <= LOW_CENTS ? (
              <button
                type="button"
                onClick={() => {
                  const paid = refillLedger();
                  if (!paid.ok) setSealError(paid.reason);
                  else setSealError(null);
                }}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-copper px-4 font-medium text-copper-ink"
              >
                Refill {usd(START_CENTS)} to {PAYEE}
              </button>
            ) : (
              <p className="mt-3 text-xs text-mute">Balance {usd(ledger.balanceCents)}. Stop line {usd(LOW_CENTS)}.</p>
            )}
          </article>
        </section>
        ) : desk === "tape" ? (
        <section id="panel-history" role="tabpanel" aria-labelledby="tab-history" className="grid gap-4">
          <article className="rounded-2xl border border-line bg-panel p-4 sm:p-5">
            <h2 className="font-display text-2xl">History</h2>
            <p className="mt-1 text-sm text-mute">
              This phone records while access is on. Phone is on. Add a visit, message, file, form, or note.
            </p>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Interaction kind">
              {KINDS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={kind === item.id}
                  onClick={() => setKind(item.id)}
                  className={cn(
                    "min-h-11 rounded-full border px-3 text-sm",
                    kind === item.id
                      ? "border-live bg-live text-live-ink"
                      : "border-line bg-raised text-parchment",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <form
              className="mt-4 grid gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                const picked = KINDS.find((item) => item.id === kind);
                addEvent({
                  kind,
                  where: where.trim() || picked?.where || "This phone",
                  detail: detail.trim(),
                });
                setWhere("");
                setDetail("");
              }}
            >
              <label className="grid gap-1 text-sm text-parchment" htmlFor="where">
                Where
                <input
                  id="where"
                  value={where}
                  onChange={(event) => setWhere(event.target.value)}
                  placeholder={KINDS.find((item) => item.id === kind)?.hint}
                  className="min-h-11 rounded-xl border border-line bg-ink px-3 text-parchment outline-none placeholder:text-mute focus-visible:border-copper"
                />
              </label>
              <label className="grid gap-1 text-sm text-parchment" htmlFor="detail">
                What happened
                <textarea
                  id="detail"
                  value={detail}
                  onChange={(event) => setDetail(event.target.value)}
                  rows={3}
                  placeholder="What to keep on the history"
                  className="rounded-xl border border-line bg-ink px-3 py-2 text-parchment outline-none placeholder:text-mute focus-visible:border-copper"
                />
              </label>
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-live px-4 font-medium text-live-ink"
              >
                <Plus className="size-4" aria-hidden="true" />
                Add to history
              </button>
            </form>

            {openEvents.length === 0 ? (
              <p className="mt-4 text-sm text-mute">Nothing yet. Tap the receipt icon to start.</p>
            ) : (
              <ul className="mt-4 grid gap-2">
                {openEvents.map((event) => (
                  <li key={event.id} className="flex items-start gap-3 rounded-xl bg-raised px-3 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-xs tracking-wide text-copper uppercase">{event.kind}</span>
                        <span className="text-xs text-mute tabular-nums">{when(event.at)}</span>
                      </div>
                      <p className="mt-1 text-sm break-all text-parchment">{event.where || "Untitled"}</p>
                      {event.detail ? <p className="mt-1 text-sm text-mute">{event.detail}</p> : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeEvent(event.id)}
                      className="grid size-11 shrink-0 place-items-center rounded-xl text-mute hover:text-parchment"
                      aria-label="Remove interaction"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-4 text-sm text-mute">
              {openEvents.length} open · {party ? `for ${party.xHandle ? `@${party.xHandle}` : party.handle}` : "no party bound"}
              {recording ? " · receiving" : ""}
            </p>
            <p className="mt-3 text-xs text-mute">Phone, visit, message, file, form, and note are on.</p>
          </article>
        </section>
        ) : null}
      </div>

      <header id="sealroom-page" className="mt-8 flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-copper text-copper"
            aria-hidden="true"
          >
            <span className="font-display text-2xl leading-none">S</span>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest text-copper uppercase">Private party notary</p>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl leading-none text-parchment sm:text-5xl">Sealroom</h1>
              <button
                type="button"
                role="tab"
                id="tab-console"
                aria-selected={desk === "console"}
                aria-controls="panel-console"
                onClick={() => setDesk((current) => (current === "console" ? null : "console"))}
                aria-label={desk === "console" ? "Exit Sealroom" : "Enter Sealroom"}
                className={cn(
                  "inline-flex min-h-14 items-center rounded-full border px-6 font-display text-lg",
                  desk === "console" ? "border-seal text-seal" : "border-live text-live",
                )}
              >
                {desk === "console" ? "Exit" : "Enter"}
              </button>
            </div>
          </div>
        </div>
        <p className="max-w-sm text-sm text-mute">
          Name an X handle, log the interactions meant for them, and mint a receipt: an encrypted HCS-1
          file plus a short NFT pointer.
        </p>
      </header>

      {desk === "console" ? (
        <section id="panel-console" role="tabpanel" aria-labelledby="tab-console" className="mt-4 grid gap-4">
          <LedgerCard
            hydrated={hydrated}
            allowRefill={ledger?.refillConsent ?? allowRefill}
            onAllowRefill={(next) => {
              setAllowRefill(next);
              if (ledger) setRefillConsent(next);
            }}
            onOpen={() => {
              openLedger(allowRefill);
              setDesk("access");
            }}
          />
          <article className="rounded-2xl border border-line bg-panel p-4 sm:p-5">
            <h2 className="font-display text-2xl">Private party</h2>
            <p className="mt-1 text-sm text-mute">Only an X handle names the private party.</p>
            <form
              className="mt-4 flex flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                void bind(query);
              }}
            >
              <label className="sr-only" htmlFor="party-query">
                X handle
              </label>
              <input
                id="party-query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="@trancesage"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="min-h-11 w-full rounded-xl border border-line bg-ink px-3 text-parchment outline-none placeholder:text-mute focus-visible:border-copper"
              />
              <button
                type="submit"
                disabled={looking || !hydrated}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-copper px-4 font-medium text-copper-ink disabled:opacity-50"
              >
                <Search className="size-4" aria-hidden="true" />
                {looking ? "Looking" : "Bind"}
              </button>
            </form>
            {lookupError ? <p className="mt-3 text-sm text-copper">{lookupError}</p> : null}
            {party?.xHandle ? <PartyCard party={party} onClear={() => setParty(null)} /> : null}
          </article>
          <article className="rounded-2xl border border-line bg-panel p-4 sm:p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-2xl">Hedera</h2>
              {party?.topicId ? (
                <a
                  className="inline-flex min-h-11 items-center gap-1 text-sm text-copper"
                  href={hashscanTopic(party.network, party.topicId)}
                  target="_blank"
                  rel="noreferrer"
                >
                  HashScan
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
            {!party?.xHandle ? (
              <p className="mt-2 text-sm text-mute">Bind an X handle to read the identity topic already on Hedera.</p>
            ) : !party.topicId ? (
              <p className="mt-2 text-sm text-mute">
                {party.network === "x"
                  ? "This X tag is the identity. It has no Hedera topic until Authority Trail registers it."
                  : "This identity has no topic id on the DID."}
              </p>
            ) : mirrorBusy ? (
              <p className="mt-2 text-sm text-mute">Reading the mirror node…</p>
            ) : mirrorError ? (
              <p className="mt-2 text-sm text-copper">{mirrorError}</p>
            ) : messages.length === 0 ? (
              <p className="mt-2 text-sm text-mute">The mirror node returned no messages for this topic.</p>
            ) : (
              <ul className="mt-3 grid gap-2">
                {messages.map((message) => (
                  <li key={`${message.sequence}-${message.consensusAt}`} className="rounded-xl bg-raised px-3 py-2">
                    <div className="flex items-baseline justify-between gap-3 text-xs text-mute">
                      <span className="tabular-nums">#{message.sequence}</span>
                      <span className="tabular-nums">{when(message.consensusAt)}</span>
                    </div>
                    <p className="mt-1 text-sm text-parchment">{message.operation}</p>
                    <p className="mt-1 line-clamp-2 text-xs break-all text-mute">{message.preview}</p>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </section>
      ) : null}

      <section aria-label="Dashboard" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <DashTile
          icon={LockKeyhole}
          label="Balance"
          value={ledger ? usd(ledger.balanceCents) : "Closed"}
          hint={ledger ? `Refill line ${usd(LOW_CENTS)}` : `${usd(START_CENTS)} minimum to open`}
        />
        <DashTile
          icon={BadgeCheck}
          label="Party"
          value={party?.xHandle ? `@${party.xHandle}` : "Unbound"}
          hint={party?.xHandle ? "X handle" : "Bind an X handle"}
        />
        <DashTile
          icon={Layers}
          label="History"
          value={String(openEvents.length)}
          hint={recording ? "Receipt on" : openEvents.length === 1 ? "interaction waiting" : "interactions waiting"}
        />
        <DashTile
          icon={ScrollText}
          label="Receipts"
          value={String(receipts.length)}
          hint={receipts[0] ? `Latest seal ${receipts[0].serial}` : "None minted"}
        />
      </section>

      <section className="mt-4 rounded-2xl border border-line bg-panel p-4 sm:p-5">
        <h2 className="font-display text-2xl">Receipts</h2>
        {receipts.length === 0 ? (
          <p className="mt-2 text-sm text-mute">No seals yet. They stay on this desk until you clear site data.</p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {receipts.map((receipt) => (
              <li key={receipt.id} className="rounded-2xl border border-line bg-ink p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl">Seal {receipt.serial}</h3>
                  <span className="text-xs text-mute tabular-nums">{when(receipt.sealedAt)}</span>
                </div>
                <p className="mt-1 text-sm text-parchment">
                  {receipt.events.length} {receipt.events.length === 1 ? "record" : "records"} for{" "}
                  {receipt.party.handle}
                  <span className="text-mute"> · {receipt.party.accountId}</span>
                </p>
                <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                  <div>
                    <dt className="text-mute">File hash</dt>
                    <dd className="mt-1 break-all text-parchment tabular-nums">{shortHash(receipt.sha256)}</dd>
                  </div>
                  <div>
                    <dt className="text-mute">NFT metadata</dt>
                    <dd className="mt-1 break-all text-parchment tabular-nums">{receipt.pointer.slice(0, 22)}…</dd>
                  </div>
                  <div>
                    <dt className="text-mute">HCS-1 chunks</dt>
                    <dd className="mt-1 text-parchment tabular-nums">
                      {receipt.chunks.length} · {receipt.fileBytes} bytes ciphertext
                    </dd>
                  </div>
                  <div>
                    <dt className="text-mute">Topic memo</dt>
                    <dd className="mt-1 break-all text-parchment">{receipt.memo.slice(0, 22)}…:identity:base64</dd>
                  </div>
                </dl>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void openReceipt(receipt)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-raised px-3 text-sm text-parchment"
                  >
                    <KeyRound className="size-4" aria-hidden="true" />
                    {receipt.keyB64 ? "Open file" : "Key dropped"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInscription((current) => (current === receipt.id ? null : receipt.id))}
                    className="inline-flex min-h-11 items-center rounded-xl border border-line px-3 text-sm text-parchment"
                  >
                    Inscription
                  </button>
                  {receipt.keyB64 ? (
                    <button
                      type="button"
                      onClick={() => {
                        dropKey(receipt.id);
                        setOpened((current) => (current?.id === receipt.id ? null : current));
                      }}
                      className="inline-flex min-h-11 items-center rounded-xl border border-line px-3 text-sm text-mute"
                    >
                      Drop key
                    </button>
                  ) : null}
                </div>
                {opened?.id === receipt.id ? (
                  <div className="mt-3 rounded-xl bg-raised p-3">
                    {opened.error ? <p className="text-sm text-copper">{opened.error}</p> : null}
                    {opened.doc ? (
                      <pre className="max-h-64 overflow-auto text-xs leading-relaxed break-all whitespace-pre-wrap text-parchment">
                        {JSON.stringify(opened.doc, null, 2)}
                      </pre>
                    ) : null}
                  </div>
                ) : null}
                {showInscription === receipt.id ? (
                  <div className="mt-3 grid gap-3">
                    <InscriptionBlock title="HIP-412" body={JSON.stringify(receipt.hip412, null, 2)} />
                    <InscriptionBlock
                      title={`Chunk 0 of ${receipt.chunks.length}`}
                      body={JSON.stringify({ o: receipt.chunks[0]?.o, c: receipt.chunks[0]?.c.slice(0, 180) + "…" })}
                    />
                    <p className="text-xs text-mute">
                      Plaintext was {receipt.plaintextBytes} bytes. Chunk messages stay at or under 1024 bytes.
                      Compression is left as identity so this desk can open the file; a gateway submit would swap
                      the memo algo to brotli.
                    </p>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-ink px-4 pt-3 pb-4">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3">
          <button
            type="button"
            onClick={toggleReceipt}
            disabled={!hydrated || !accessOn}
            aria-pressed={recording}
            aria-label={recording ? "Stop receipt" : "Start receipt"}
            className={cn(
              "grid size-16 shrink-0 place-items-center rounded-full border-2 disabled:opacity-50",
              recording ? "border-seal bg-seal text-seal-ink" : "border-copper bg-ink text-copper",
            )}
          >
            {recording ? <Square className="size-6" aria-hidden="true" /> : <Circle className="size-7" aria-hidden="true" />}
          </button>
          {recording ? <span className="text-sm font-medium text-live">Recording</span> : null}
          <button
            type="button"
            onClick={() => void seal()}
            disabled={sealing || !hydrated || !accessOn}
            className="min-h-16 flex-1 rounded-2xl bg-copper px-4 text-lg font-medium text-copper-ink disabled:opacity-50"
          >
            {sealing ? "Tokenizing" : "Tokenize session"}
          </button>
        </div>
        {sealError ? <p className="mx-auto mt-2 max-w-6xl text-sm text-copper">{sealError}</p> : null}
        {!sealError && !accessOn ? (
          <p className="mx-auto mt-2 max-w-6xl text-sm text-mute">
            {ledger && ledger.balanceCents <= LOW_CENTS
              ? `Stopped at ${usd(LOW_CENTS)}. Refill ${usd(START_CENTS)} on the Access tab.`
              : ledger
                ? "Bind an X handle on the Access tab."
                : `${usd(START_CENTS)} receipt to ${PAYEE} opens the Access tab.`}
          </p>
        ) : null}
        {feeNote ? <p className="mx-auto mt-2 max-w-6xl text-sm text-mute">{feeNote}</p> : null}
      </div>
    </main>
  );
}

function sessionIsOpen(events: { detail: string }[]): boolean {
  const start = events.findIndex((event) => event.detail === "Receipt started");
  const stop = events.findIndex((event) => event.detail === "Receipt stopped");
  if (start === -1) return false;
  if (stop === -1) return true;
  return start < stop;
}

function xTag(raw: string): string | null {
  const body = raw.trim().replace(/^@+/, "");
  if (/^[A-Za-z0-9_]{1,15}$/.test(body)) return body;
  return null;
}

function xParty(tag: string): Party {
  return {
    handle: tag,
    displayName: `@${tag}`,
    did: `x:@${tag}`,
    accountId: "",
    topicId: null,
    publicKeyHex: null,
    trustLevel: "x tag",
    network: "x",
    xHandle: tag,
    roles: [],
  };
}

function DashTile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof BadgeCheck;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <article className="rounded-2xl border border-line bg-panel px-4 py-4">
      <div className="flex items-center gap-2 text-xs tracking-wide text-copper uppercase">
        <Icon className="size-4" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-3 truncate font-display text-3xl text-parchment tabular-nums">{value}</p>
      <p className="mt-1 truncate text-sm text-mute">{hint}</p>
    </article>
  );
}

function PartyCard({ party, onClear }: { party: Party; onClear: () => void }) {
  return (
    <div className="mt-4 rounded-xl bg-raised p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-xl">{party.xHandle ? `@${party.xHandle}` : party.displayName || party.handle}</p>
          <p className="text-xs tracking-wide text-copper uppercase">{party.trustLevel.replaceAll("_", " ")}</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="grid size-11 place-items-center rounded-xl text-mute"
          aria-label="Unbind party"
        >
          <X className="size-4" />
        </button>
      </div>
      <dl className="mt-3 grid gap-2 text-xs">
        {party.accountId ? (
          <div>
            <dt className="text-mute">Account</dt>
            <dd className="mt-1 text-parchment tabular-nums">{party.accountId}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-mute">{party.network === "x" ? "Identity" : "DID"}</dt>
          <dd className="mt-1 break-all text-parchment">{party.did}</dd>
        </div>
        {party.network === "x" ? null : (
          <div>
            <dt className="text-mute">Submit key</dt>
            <dd className="mt-1 break-all text-parchment">
              {party.publicKeyHex ? shortHash(party.publicKeyHex) : "Not published on the directory"}
            </dd>
          </div>
        )}
      </dl>
      {party.roles.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {party.roles.map((role) => (
            <li key={role.role} className="rounded-full border border-line px-2 py-1 text-xs text-mute">
              {role.role}
              {role.validUntil ? ` · until ${when(role.validUntil)}` : ""}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function InscriptionBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="text-xs text-mute">{title}</p>
      <pre className="mt-1 max-h-48 overflow-auto rounded-xl bg-raised p-3 text-xs leading-relaxed break-all whitespace-pre-wrap text-parchment">
        {body}
      </pre>
    </div>
  );
}

function LedgerCard({
  hydrated,
  allowRefill,
  onAllowRefill,
  onOpen,
}: {
  hydrated: boolean;
  allowRefill: boolean;
  onAllowRefill: (next: boolean) => void;
  onOpen: () => void;
}) {
  const ledger = useSealStore((state) => state.ledger);
  const cap = Math.max(ledger?.balanceCents ?? START_CENTS, START_CENTS);
  const filled = ledger ? Math.min(100, Math.round((ledger.balanceCents / cap) * 100)) : 0;

  return (
    <article className="rounded-2xl border border-line bg-panel p-4 sm:p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl">Ledger price</h2>
        <p className="text-sm text-copper">{PAYEE}</p>
      </div>
      <dl className="mt-4 grid gap-3 text-sm">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-mute">To open</dt>
          <dd className="tabular-nums text-parchment">{usd(START_CENTS)} minimum</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-mute">Refill</dt>
          <dd className="text-right tabular-nums text-parchment">
            {usd(START_CENTS)} when {usd(LOW_CENTS)} or less is left
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-mute">Execute</dt>
          <dd className="text-right text-parchment">
            {EXECUTOR_WALLET} {EXECUTOR_NAME} {EXECUTOR_ACCOUNT}
          </dd>
        </div>
      </dl>
      <label className="mt-4 flex min-h-11 items-start gap-3 text-sm text-parchment">
        <input
          type="checkbox"
          className="mt-1 size-4 accent-copper"
          checked={allowRefill}
          onChange={(event) => onAllowRefill(event.target.checked)}
        />
        <span>Allow a {usd(START_CENTS)} refill to {PAYEE} whenever the balance is at 25%.</span>
      </label>
      {ledger ? (
        <div className="mt-4">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-3xl tabular-nums">{usd(ledger.balanceCents)}</p>
            <p className="text-xs text-mute">Refill line {usd(LOW_CENTS)}</p>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink" aria-hidden="true">
            <div className="h-full bg-copper" style={{ width: `${filled}%` }} />
          </div>
          <ul className="mt-3 grid gap-2">
            {ledger.entries.slice(0, 4).map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-3 text-xs">
                <span className="text-mute">
                  {item.kind === "fee" ? "Receipt" : item.kind === "refill" ? "Refill" : "Opened"} · {when(item.at)}
                </span>
                <span className="tabular-nums text-parchment">
                  {item.kind === "fee" ? "−" : "+"}
                  {usd(item.cents)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          type="button"
          disabled={!hydrated}
          onClick={onOpen}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-copper px-4 font-medium text-copper-ink disabled:opacity-50"
        >
          Open ledger · {usd(START_CENTS)} due to {PAYEE}
        </button>
      )}
      <p className="mt-3 text-xs text-mute">
        Recorded on this desk. Network coins execute from {EXECUTOR_WALLET} {EXECUTOR_NAME}{" "}
        {EXECUTOR_ACCOUNT}. Access is asked in the {ACCESS_INBOX} inbox when it is needed. This does not
        pull dollars from X Money.
      </p>
    </article>
  );
}
