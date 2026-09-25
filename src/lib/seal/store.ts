import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Chunk } from "@/lib/seal/protocol";
import { ACCESS_INBOX, LOW_CENTS, PAYEE, START_CENTS, usd } from "@/lib/seal/price";

export type Party = {
  handle: string;
  displayName: string | null;
  did: string;
  accountId: string;
  topicId: string | null;
  publicKeyHex: string | null;
  trustLevel: string;
  network: "mainnet" | "testnet" | "x";
  xHandle: string | null;
  roles: { role: string; validUntil: string | null }[];
};

export type Interaction = {
  id: string;
  at: string;
  kind: "phone" | "visit" | "message" | "file" | "form" | "note";
  where: string;
  detail: string;
};

export type Hip412 = {
  name: string;
  description: string;
  creator: string;
  type: string;
  format: string;
  image: string;
  pointer: string;
  files: { uri: string; type: string; checksum: string; is_default_file: boolean }[];
  attributes: { trait_type: string; value: string }[];
  properties: { holder_did: string; storage: string; write_policy: string };
};

export type Receipt = {
  id: string;
  serial: number;
  sealedAt: string;
  party: Party;
  events: Interaction[];
  sha256: string;
  memo: string;
  pointer: string;
  plaintextBytes: number;
  fileBytes: number;
  chunks: Chunk[];
  hip412: Hip412;
  keyB64: string | null;
};

export type InboxItem = {
  id: string;
  at: string;
  binder: string;
  pointer: string;
  file: string;
};

export type LedgerEntry = {
  id: string;
  at: string;
  kind: "open" | "fee" | "refill";
  cents: number;
  balanceAfter: number;
  note: string;
};

export type Ledger = {
  openedAt: string;
  balanceCents: number;
  refillConsent: boolean;
  payee: typeof PAYEE;
  entries: LedgerEntry[];
};

type ChargeResult =
  | { ok: true; balanceCents: number; refilled: boolean }
  | { ok: false; reason: string };

type SealState = {
  hydrated: boolean;
  party: Party | null;
  openEvents: Interaction[];
  receipts: Receipt[];
  nextSerial: number;
  ledger: Ledger | null;
  inbox: InboxItem[];
  executorAccess: boolean;
  refillAsked: boolean;
  recording: boolean;
  setParty: (party: Party | null) => void;
  addEvent: (event: Omit<Interaction, "id" | "at">) => void;
  removeEvent: (id: string) => void;
  loadEvents: (events: Interaction[]) => void;
  addReceipt: (receipt: Omit<Receipt, "id" | "serial">) => Receipt;
  dropKey: (id: string) => void;
  openLedger: (refillConsent: boolean) => void;
  setRefillConsent: (refillConsent: boolean) => void;
  chargeSeal: (feeCents: number, note?: string) => ChargeResult;
  refillLedger: () => ChargeResult;
  addInbox: (item: Omit<InboxItem, "id" | "at">) => void;
  askExecutorAccess: (reason: string) => void;
  askRefillAccess: (reason: string) => void;
  setRecording: (recording: boolean) => void;
};

function entry(kind: LedgerEntry["kind"], cents: number, balanceAfter: number, note: string): LedgerEntry {
  return { id: crypto.randomUUID(), at: new Date().toISOString(), kind, cents, balanceAfter, note };
}

export const useSealStore = create<SealState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      party: null,
      openEvents: [],
      receipts: [],
      nextSerial: 1,
      ledger: null,
      inbox: [],
      executorAccess: false,
      refillAsked: false,
      recording: false,
      setParty: (party) => set({ party }),
      addEvent: (event) =>
        set((state) => ({
          openEvents: [
            {
              ...event,
              id: crypto.randomUUID(),
              at: new Date().toISOString(),
            },
            ...state.openEvents,
          ].slice(0, 40),
        })),
      removeEvent: (id) =>
        set((state) => ({ openEvents: state.openEvents.filter((event) => event.id !== id) })),
      loadEvents: (events) => set({ openEvents: events.slice(0, 40) }),
      addReceipt: (receipt) => {
        const serial = get().nextSerial;
        const stored: Receipt = { ...receipt, id: crypto.randomUUID(), serial };
        set((state) => ({
          receipts: [stored, ...state.receipts].slice(0, 24),
          nextSerial: serial + 1,
          openEvents: [],
        }));
        return stored;
      },
      dropKey: (id) =>
        set((state) => ({
          receipts: state.receipts.map((receipt) =>
            receipt.id === id ? { ...receipt, keyB64: null } : receipt,
          ),
        })),
      openLedger: (refillConsent) => {
        if (get().ledger) return;
        const balanceCents = START_CENTS;
        set({
          ledger: {
            openedAt: new Date().toISOString(),
            balanceCents,
            refillConsent,
            payee: PAYEE,
            entries: [
              entry("open", START_CENTS, balanceCents, `Opening balance due to ${PAYEE}`),
            ],
          },
        });
      },
      setRefillConsent: (refillConsent) => {
        const ledger = get().ledger;
        if (!ledger) return;
        if (!refillConsent || ledger.balanceCents > LOW_CENTS) {
          set({ ledger: { ...ledger, refillConsent } });
          return;
        }
        const balanceCents = ledger.balanceCents + START_CENTS;
        set({
          ledger: {
            ...ledger,
            refillConsent,
            balanceCents,
            entries: [
              entry(
                "refill",
                START_CENTS,
                balanceCents,
                `Balance was at 25%. ${usd(START_CENTS)} refill due to ${PAYEE}`,
              ),
              ...ledger.entries,
            ].slice(0, 30),
          },
        });
      },
      chargeSeal: (feeCents, note) => {
        const ledger = get().ledger;
        const fee = Math.max(1, Math.round(feeCents));
        if (!ledger) {
          return {
            ok: false,
            reason: `Record the ${usd(START_CENTS)} receipt to ${PAYEE} first.`,
          };
        }
        if (ledger.balanceCents <= LOW_CENTS) {
          return {
            ok: false,
            reason: `Access stopped. Balance reached ${usd(LOW_CENTS)}. Refill ${usd(START_CENTS)} to ${PAYEE}.`,
          };
        }
        if (ledger.balanceCents < fee) {
          return {
            ok: false,
            reason: `Balance is ${usd(ledger.balanceCents)}. This session is ${usd(fee)}. Refill ${usd(START_CENTS)} to ${PAYEE}.`,
          };
        }
        const balance = ledger.balanceCents - fee;
        set({
          ledger: {
            ...ledger,
            balanceCents: balance,
            entries: [entry("fee", fee, balance, note ?? `Session ${usd(fee)}`), ...ledger.entries].slice(0, 30),
          },
        });
        return { ok: true, balanceCents: balance, refilled: false };
      },
      refillLedger: () => {
        const ledger = get().ledger;
        if (!ledger) {
          return { ok: false, reason: `Record the ${usd(START_CENTS)} receipt to ${PAYEE} first.` };
        }
        if (ledger.balanceCents > LOW_CENTS) {
          return { ok: false, reason: `Balance is ${usd(ledger.balanceCents)}. Refill opens at ${usd(LOW_CENTS)}.` };
        }
        const balanceCents = ledger.balanceCents + START_CENTS;
        set({
          ledger: {
            ...ledger,
            balanceCents,
            entries: [
              entry("refill", START_CENTS, balanceCents, `Refill ${usd(START_CENTS)} due to ${PAYEE}`),
              ...ledger.entries,
            ].slice(0, 30),
          },
        });
        return { ok: true, balanceCents, refilled: true };
      },
      addInbox: (item) =>
        set((state) => ({
          inbox: [{ ...item, id: crypto.randomUUID(), at: new Date().toISOString() }, ...state.inbox].slice(0, 30),
        })),
      askExecutorAccess: (reason) => {
        if (get().executorAccess) return;
        const item = {
          binder: ACCESS_INBOX.replace(/^@/, ""),
          pointer: "hashpack:0.0.527206",
          file: reason,
        };
        set((state) => ({
          executorAccess: true,
          inbox: [{ ...item, id: crypto.randomUUID(), at: new Date().toISOString() }, ...state.inbox].slice(0, 30),
        }));
      },
      askRefillAccess: (reason) => {
        if (get().refillAsked) return;
        const item = {
          binder: ACCESS_INBOX.replace(/^@/, ""),
          pointer: "refill:0.0.527206",
          file: reason,
        };
        set((state) => ({
          refillAsked: true,
          inbox: [{ ...item, id: crypto.randomUUID(), at: new Date().toISOString() }, ...state.inbox].slice(0, 30),
        }));
      },
      setRecording: (recording) => set({ recording }),
    }),
    {
      name: "sealroom",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        party: state.party,
        openEvents: state.openEvents,
        receipts: state.receipts,
        nextSerial: state.nextSerial,
        ledger: state.ledger,
        inbox: state.inbox,
        executorAccess: state.executorAccess,
        refillAsked: state.refillAsked,
      }),
    },
  ),
);
