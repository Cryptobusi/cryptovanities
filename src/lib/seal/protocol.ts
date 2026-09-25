export type Chunk = { o: number; c: string; bytes: number };

export type SealEvent = {
  id: string;
  at: string;
  kind: string;
  where: string;
  detail: string;
};

export type SealParty = {
  handle: string;
  did: string;
  accountId: string;
  topicId: string | null;
};

export type SealDocument = {
  v: 1;
  sealedAt: string;
  party: SealParty;
  events: SealEvent[];
};

const MIME = "application/octet-stream";

export function bytesToB64(bytes: Uint8Array): string {
  let bin = "";
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    bin += String.fromCharCode(...bytes.subarray(i, i + step));
  }
  return btoa(bin);
}

export function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes as BufferSource);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function encryptFile(plain: Uint8Array): Promise<{ file: Uint8Array; keyB64: string }> {
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain as BufferSource),
  );
  const raw = new Uint8Array(await crypto.subtle.exportKey("raw", key));
  const file = new Uint8Array(12 + cipher.length);
  file.set(iv, 0);
  file.set(cipher, 12);
  return { file, keyB64: bytesToB64(raw) };
}

export async function decryptFile(file: Uint8Array, keyB64: string): Promise<Uint8Array> {
  const raw = b64ToBytes(keyB64);
  const key = await crypto.subtle.importKey("raw", raw as BufferSource, "AES-GCM", false, ["decrypt"]);
  const iv = file.slice(0, 12);
  const cipher = file.slice(12);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher as BufferSource);
  return new Uint8Array(plain);
}

export function chunkHcs1(fileB64: string): Chunk[] {
  const chunks: Chunk[] = [];
  let offset = 0;
  let order = 0;
  const source = fileB64.length === 0 ? "" : fileB64;
  do {
    const prefix = order === 0 ? `data:${MIME};base64,` : "";
    let size = Math.min(700, Math.max(0, source.length - offset));
    if (source.length === 0) size = 0;
    let slice = source.slice(offset, offset + size);
    let body = prefix + slice;
    let message = JSON.stringify({ o: order, c: body });
    let bytes = new TextEncoder().encode(message).length;
    while (bytes > 1024 && slice.length > 1) {
      slice = slice.slice(0, Math.max(1, slice.length - 24));
      body = prefix + slice;
      message = JSON.stringify({ o: order, c: body });
      bytes = new TextEncoder().encode(message).length;
    }
    if (bytes > 1024) throw new Error("A chunk is over the 1 KB HCS limit.");
    chunks.push({ o: order, c: body, bytes });
    offset += slice.length;
    order += 1;
    if (order > 400) throw new Error("That record is too large to seal here.");
    if (source.length === 0) break;
  } while (offset < source.length);
  return chunks;
}

export function reassembleHcs1(chunks: { o: number; c: string }[]): string {
  const ordered = [...chunks].sort((a, b) => a.o - b.o);
  let b64 = "";
  for (const chunk of ordered) {
    if (chunk.o === 0) {
      const marker = "base64,";
      const index = chunk.c.indexOf(marker);
      b64 += index >= 0 ? chunk.c.slice(index + marker.length) : chunk.c;
    } else {
      b64 += chunk.c;
    }
  }
  return b64;
}

export function hcs1Memo(sha256: string): string {
  return `${sha256}:identity:base64`;
}

export function nftPointer(sha256: string): string {
  return `hcs1:${sha256}`;
}

export function buildHip412(input: {
  serial: number;
  partyHandle: string;
  partyDid: string;
  accountId: string;
  eventCount: number;
  sha256: string;
  sealedAt: string;
}) {
  const pointer = nftPointer(input.sha256);
  return {
    name: `Interaction seal ${input.serial}`,
    description: `${input.eventCount} interaction ${input.eventCount === 1 ? "record" : "records"} sealed for ${input.partyHandle}.`,
    creator: input.partyHandle,
    type: "application/json",
    format: "HIP412@2.0.0",
    image: pointer,
    files: [
      {
        uri: pointer,
        type: MIME,
        checksum: input.sha256,
        is_default_file: true,
      },
    ],
    attributes: [
      { trait_type: "Party", value: input.partyHandle },
      { trait_type: "Account", value: input.accountId },
      { trait_type: "Events", value: String(input.eventCount) },
      { trait_type: "Sealed", value: input.sealedAt },
    ],
    properties: {
      holder_did: input.partyDid,
      storage: "hcs-1",
      write_policy: "submit-key",
    },
    pointer,
  };
}

export async function openSealedFile(
  chunks: { o: number; c: string }[],
  keyB64: string,
): Promise<SealDocument> {
  const file = b64ToBytes(reassembleHcs1(chunks));
  const plain = await decryptFile(file, keyB64);
  const text = new TextDecoder().decode(plain);
  const parsed: unknown = JSON.parse(text);
  if (!parsed || typeof parsed !== "object") throw new Error("Sealed file is not a record.");
  return parsed as SealDocument;
}
