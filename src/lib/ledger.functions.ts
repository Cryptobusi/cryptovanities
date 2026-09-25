import { createServerFn } from "@tanstack/react-start";
import type { Party } from "@/lib/seal/store";

type Row = Record<string, unknown>;

export type DirectoryEntry = {
  handle: string;
  accountId: string;
  trustLevel: string;
  did: string;
};

export type TopicMessage = {
  sequence: number;
  consensusAt: string;
  operation: string;
  preview: string;
};

const UA = "Sealroom/1.0 (interaction notary)";

function row(value: unknown): Row | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Row;
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function networkOf(did: string): "mainnet" | "testnet" {
  return did.includes(":mainnet:") ? "mainnet" : "testnet";
}

function topicOf(did: string, explicit: string | null): string | null {
  if (explicit && /^\d+\.\d+\.\d+$/.test(explicit)) return explicit;
  const match = did.match(/_(\d+\.\d+\.\d+)$/);
  return match ? match[1] : null;
}

function assertId(query: string): string {
  const id = query.trim();
  if (!/^[a-zA-Z0-9._:-]{1,220}$/.test(id)) {
    throw new Error("Use a DOVU handle, DID, or Hedera account id.");
  }
  return id;
}

async function dovu(path: string): Promise<{ status: number; json: unknown }> {
  const response = await fetch(`https://authority.dovu.ai${path}`, {
    headers: { Accept: "application/json", "User-Agent": UA },
    signal: AbortSignal.timeout(12000),
  });
  const raw = await response.text();
  try {
    return { status: response.status, json: JSON.parse(raw) as unknown };
  } catch {
    return { status: response.status, json: null };
  }
}

async function directory(): Promise<Row[]> {
  const rows: Row[] = [];
  for (let page = 1; page <= 4; page += 1) {
    const { status, json } = await dovu(`/api/trust/identities?page=${page}`);
    if (status !== 200) break;
    const body = row(json);
    const data = body?.data;
    if (!Array.isArray(data)) break;
    for (const item of data) {
      const record = row(item);
      if (record) rows.push(record);
    }
    if (!text(body?.next_page_url)) break;
  }
  return rows;
}

function toEntry(record: Row): DirectoryEntry | null {
  const handle = text(record.handle);
  const accountId = text(record.account_id);
  const did = text(record.did);
  if (!handle || !accountId || !did) return null;
  return {
    handle,
    accountId,
    did,
    trustLevel: text(record.trust_level) ?? "unknown",
  };
}

function sameParty(record: Row, query: string): boolean {
  const needle = query.toLowerCase();
  return [record.handle, record.account_id, record.did, record.display_name].some(
    (value) => typeof value === "string" && value.toLowerCase() === needle,
  );
}

function rolesOf(value: unknown): Party["roles"] {
  if (!Array.isArray(value)) return [];
  const roles: Party["roles"] = [];
  for (const item of value) {
    const record = row(item);
    const role = text(record?.role_name);
    if (!role) continue;
    roles.push({ role, validUntil: text(record?.valid_until) });
  }
  return roles;
}

function toParty(detail: Row, indexed: Row | null): Party | null {
  const did = text(detail.did) ?? text(indexed?.did);
  const handle = text(detail.handle) ?? text(indexed?.handle);
  const accountId = text(detail.account_id) ?? text(indexed?.account_id);
  if (!did || !handle || !accountId) return null;
  const topicId = topicOf(did, text(indexed?.identity_topic_id) ?? text(detail.identity_topic_id));
  return {
    handle,
    displayName: text(detail.display_name) ?? text(indexed?.display_name),
    did,
    accountId,
    topicId,
    publicKeyHex: text(indexed?.public_key_hex) ?? text(detail.public_key_hex),
    trustLevel: text(detail.trust_level) ?? text(indexed?.trust_level) ?? "unknown",
    network: networkOf(did),
    xHandle: null,
    roles: rolesOf(detail.roles_held),
  };
}

export const listParties = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const rows = await directory();
    const entries = rows.flatMap((record) => {
      const entry = toEntry(record);
      return entry ? [entry] : [];
    });
    return { entries, error: null as string | null };
  } catch {
    return { entries: [] as DirectoryEntry[], error: "Authority Trail is not reachable right now." };
  }
});

export const lookupParty = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const body = row(data);
    const query = text(body?.query);
    if (!query) throw new Error("Enter a handle, DID, or account.");
    return { query: assertId(query) };
  })
  .handler(async ({ data }) => {
    try {
      const [detailRes, rows] = await Promise.all([
        dovu(`/api/trust/identities/${encodeURIComponent(data.query)}`),
        directory(),
      ]);
      const indexed = rows.find((record) => sameParty(record, data.query)) ?? null;
      const detail = detailRes.status === 200 ? row(detailRes.json) : null;
      const party = detail ? toParty(detail, indexed) : indexed ? toParty(indexed, indexed) : null;
      if (!party) {
        const suggestions = rows.flatMap((record) => {
          const entry = toEntry(record);
          return entry ? [entry] : [];
        });
        return {
          party: null as Party | null,
          suggestions,
          error: "No DOVU identity matches that name.",
        };
      }
      return { party, suggestions: [] as DirectoryEntry[], error: null as string | null };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Lookup failed.";
      return { party: null as Party | null, suggestions: [] as DirectoryEntry[], error: message };
    }
  });

function previewOf(decoded: string): { operation: string; preview: string } {
  try {
    const parsed = JSON.parse(decoded) as unknown;
    const body = row(parsed);
    const message = row(body?.message);
    const operation =
      text(message?.operation) ?? text(body?.op) ?? text(body?.p) ?? text(message?.type) ?? "message";
    const compact = JSON.stringify(message ?? body ?? parsed);
    return { operation, preview: compact.slice(0, 180) };
  } catch {
    return { operation: "bytes", preview: decoded.slice(0, 180) };
  }
}

export const readTopic = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const body = row(data);
    const topicId = text(body?.topicId);
    const network = text(body?.network);
    if (!topicId || !/^\d+\.\d+\.\d+$/.test(topicId)) throw new Error("Topic id is not valid.");
    if (network !== "mainnet" && network !== "testnet") throw new Error("Network is not valid.");
    return { topicId, network };
  })
  .handler(async ({ data }) => {
    try {
      const url = `https://${data.network}.mirrornode.hedera.com/api/v1/topics/${data.topicId}/messages?limit=5&order=desc`;
      const response = await fetch(url, {
        headers: { Accept: "application/json", "User-Agent": UA },
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) {
        return { messages: [] as TopicMessage[], error: "Mirror node did not return this topic." };
      }
      const json = (await response.json()) as unknown;
      const body = row(json);
      const list = Array.isArray(body?.messages) ? body.messages : [];
      const messages: TopicMessage[] = [];
      for (const item of list) {
        const record = row(item);
        if (!record) continue;
        const sequence = typeof record.sequence_number === "number" ? record.sequence_number : 0;
        const stamp = text(record.consensus_timestamp) ?? "";
        const seconds = Number(stamp.split(".")[0]);
        const consensusAt = Number.isFinite(seconds) ? new Date(seconds * 1000).toISOString() : stamp;
        const encoded = text(record.message) ?? "";
        let decoded = encoded;
        try {
          const bin = atob(encoded);
          const bytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
          decoded = new TextDecoder().decode(bytes);
        } catch {
          decoded = encoded;
        }
        const preview = previewOf(decoded);
        messages.push({ sequence, consensusAt, operation: preview.operation, preview: preview.preview });
      }
      return { messages, error: null as string | null };
    } catch {
      return { messages: [] as TopicMessage[], error: "Could not read the Hedera mirror node." };
    }
  });
