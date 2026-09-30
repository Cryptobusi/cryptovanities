import { useEffect, useState } from "react";
import { CLUB_ACCOUNT } from "@/lib/site-data";

const MIRROR = "https://mainnet.mirrornode.hedera.com";
const TRAIL = "https://authority.dovu.ai";
const INTENT_KEY = "sealroom-trail";

type Piece = {
  id: string;
  source: "chain" | "desk";
  tokenId: string;
  serial: number;
  name: string;
  accountId: string;
  meta: string;
};

type Identity = {
  did: string;
  handle: string | null;
  account_id: string;
  trust_level: string;
  identity_topic_id: string;
};

type Grant = {
  id: number;
  role_name?: string;
  role_label?: string;
  status?: string;
  holder_did?: string;
  authority_did?: string;
};

type Intent = {
  id: string;
  tokenId: string;
  serial: number;
  name: string;
  accountId: string;
  at: string;
  note: string;
};

type Move = "send" | "receive" | "list";

function decodeMeta(value: string) {
  try {
    const text = atob(value);
    if ([...text].every((char) => (char.charCodeAt(0) >= 32 && char.charCodeAt(0) < 127) || char === "ℏ")) return text;
    return "";
  } catch {
    return "";
  }
}

function sentxNft(tokenId: string, serial: number) {
  return `https://sentx.io/nft-marketplace/${tokenId}/${serial}`;
}

function hashscanNft(tokenId: string, serial: number) {
  return `https://hashscan.io/mainnet/token/${tokenId}/${serial}`;
}

export function MyStuff({ seals }: { seals: { id: string; serial: number; sha: string }[] }) {
  const [account, setAccount] = useState(CLUB_ACCOUNT);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [loadedFor, setLoadedFor] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [move, setMove] = useState<Move>("list");
  const [trailMode, setTrailMode] = useState<"put" | "create" | "manage">("put");
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [trailNote, setTrailNote] = useState("");
  const [trailError, setTrailError] = useState("");
  const [intents, setIntents] = useState<Intent[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(INTENT_KEY);
      if (raw) setIntents(JSON.parse(raw) as Intent[]);
    } catch {
      /* empty desk */
    }
  }, []);

  const deskPieces: Piece[] = seals.map((seal) => ({
    id: `desk-${seal.id}`,
    source: "desk",
    tokenId: "desk",
    serial: seal.serial,
    name: `Sealroom #${seal.serial}`,
    accountId: "this desk",
    meta: seal.sha.slice(0, 12),
  }));

  const shown = [...deskPieces, ...pieces];
  const selected = shown.find((piece) => piece.id === selectedId) ?? null;

  async function load(nextAccount = account) {
    const id = nextAccount.trim();
    if (!/^\d+\.\d+\.\d+$/.test(id)) {
      setLoadError("Use a Hedera account id, like 0.0.527206.");
      return;
    }
    setLoading(true);
    setLoadError("");
    setSelectedId(null);
    try {
      const response = await fetch(`${MIRROR}/api/v1/accounts/${id}/nfts?limit=24&order=desc`);
      if (!response.ok) throw new Error(`Mirror node answered ${response.status}.`);
      const body = (await response.json()) as {
        nfts?: { token_id: string; serial_number: number; metadata: string; deleted: boolean }[];
      };
      const rows = (body.nfts ?? []).filter((row) => !row.deleted);
      const names = new Map<string, string>();
      await Promise.all(
        [...new Set(rows.map((row) => row.token_id))].map(async (tokenId) => {
          try {
            const token = await fetch(`${MIRROR}/api/v1/tokens/${tokenId}`);
            if (!token.ok) return;
            const info = (await token.json()) as { name?: string; symbol?: string };
            names.set(tokenId, info.name || info.symbol || tokenId);
          } catch {
            names.set(tokenId, tokenId);
          }
        }),
      );
      setPieces(
        rows.map((row) => ({
          id: `${row.token_id}-${row.serial_number}`,
          source: "chain",
          tokenId: row.token_id,
          serial: row.serial_number,
          name: names.get(row.token_id) || row.token_id,
          accountId: id,
          meta: decodeMeta(row.metadata),
        })),
      );
      setLoadedFor(id);
    } catch {
      setPieces([]);
      setLoadError("The mirror node did not return this account. Check the id and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function readTrail(holder: string) {
    setTrailError("");
    setIdentity(null);
    setGrants([]);
    if (!/^\d+\.\d+\.\d+$/.test(holder)) {
      setTrailNote("This seal lives on the desk. A Hedera account is what Authority Trail can name.");
      return;
    }
    setTrailNote("Reading the public trail…");
    try {
      const [identityRes, grantRes] = await Promise.all([
        fetch(`${TRAIL}/api/trust/identities?q=${encodeURIComponent(holder)}`),
        fetch(`${TRAIL}/api/trust/grants?holder=${encodeURIComponent(holder)}`),
      ]);
      if (identityRes.ok) {
        const body = (await identityRes.json()) as { data?: Identity[] };
        const match = (body.data ?? []).find((item) => item.account_id === holder) ?? null;
        setIdentity(match);
      }
      if (grantRes.ok) {
        const body = (await grantRes.json()) as { data?: Grant[] };
        setGrants(body.data ?? []);
      }
      setTrailNote("");
    } catch {
      setTrailError("Authority Trail did not answer. The links below still open the live desk.");
      setTrailNote("");
    }
  }

  function select(piece: Piece) {
    setSelectedId(piece.id);
    setMove("list");
    setTrailMode("put");
    void readTrail(piece.accountId);
  }

  function putOnTrail() {
    if (!selected) return;
    const intent: Intent = {
      id: crypto.randomUUID(),
      tokenId: selected.tokenId,
      serial: selected.serial,
      name: selected.name,
      accountId: selected.accountId,
      at: new Date().toISOString(),
      note: `${selected.name} ${selected.tokenId} #${selected.serial} held by ${selected.accountId}`,
    };
    const next = [intent, ...intents].slice(0, 40);
    setIntents(next);
    localStorage.setItem(INTENT_KEY, JSON.stringify(next));
    setTrailMode("manage");
    window.open(TRAIL, "_blank", "noopener,noreferrer");
  }

  const steps = selected ? instructions(selected, move) : [];

  return (
    <section className="mt-8 border-t border-line pt-8" id="my-stuff">
      <h2 className="font-display text-5xl leading-none sm:text-6xl">My Stuff</h2>
      <p className="mt-3 max-w-2xl text-sm text-mute">
        HashPack holds the keys. SentX is the market. Authority Trail is the public record of who was allowed to act.
        This desk does not take the NFT and does not sign for you.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          href="https://sentx.io"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-20 items-center gap-4 rounded-2xl border border-line bg-panel px-4 py-3"
        >
          <img src="/sentx-mark.png" alt="" className="size-14 rounded-xl bg-ink object-contain p-1" />
          <span>
            <span className="block font-display text-2xl">SentX</span>
            <span className="font-mono text-xs text-mute">sentx.io</span>
          </span>
        </a>
        <a
          href="https://www.hashpack.app/"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-20 items-center gap-4 rounded-2xl border border-line bg-panel px-4 py-3"
        >
          <img src="/hashpack-mark.png" alt="" className="size-14 rounded-xl object-cover" />
          <span>
            <span className="block font-display text-2xl">HashPack</span>
            <span className="font-mono text-xs text-mute">hashpack.app</span>
          </span>
        </a>
      </div>

      <form
        className="mt-6 flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          void load();
        }}
      >
        <label className="sr-only" htmlFor="stuff-account">
          Hedera account
        </label>
        <input
          id="stuff-account"
          value={account}
          onChange={(event) => setAccount(event.target.value)}
          spellCheck={false}
          placeholder="0.0.527206"
          className="min-h-12 flex-1 rounded-md border border-line bg-ink px-3 font-mono text-parchment outline-none focus:border-copper"
        />
        <button type="submit" className="min-h-12 rounded-full bg-copper px-5 text-sm font-medium text-copper-ink">
          {loading ? "Reading…" : "Show NFTs"}
        </button>
      </form>
      {loadError ? <p className="mt-3 text-sm text-copper">{loadError}</p> : null}
      {loadedFor ? (
        <p className="mt-3 font-mono text-xs text-mute">
          {pieces.length} on {loadedFor}
          {pieces.length === 24 ? " · first 24" : ""} · desk seals stay at the front
        </p>
      ) : (
        <p className="mt-3 text-sm text-mute">
          Show NFTs reads the public mirror for that account. ClubHbar.ℏ {CLUB_ACCOUNT} is filled in so you can see a real
          wallet. Swap the id for your own.
        </p>
      )}

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {deskPieces.length === 0 && pieces.length === 0 ? (
          <li className="col-span-full rounded-2xl border border-line bg-panel p-5 text-sm text-mute">
            No seals on this desk yet. Load an account, or tokenize a session above, and the piece shows up here.
          </li>
        ) : null}
        {shown.map((piece) => (
          <li key={piece.id}>
            <button
              type="button"
              onClick={() => select(piece)}
              aria-pressed={piece.id === selectedId}
              className={
                piece.id === selectedId
                  ? "h-full w-full rounded-2xl border border-copper bg-panel p-4 text-left"
                  : "h-full w-full rounded-2xl border border-line bg-panel p-4 text-left"
              }
            >
              <p className="font-mono text-xs text-copper">{piece.source === "desk" ? "Desk" : `#${piece.serial}`}</p>
              <p className="mt-2 font-display text-2xl leading-tight">{piece.name}</p>
              <p className="mt-2 truncate font-mono text-xs text-mute">
                {piece.source === "desk" ? piece.meta : `${piece.tokenId} · ${piece.meta || "no name in the metadata"}`}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {selected ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-line bg-panel p-5">
            <p className="font-mono text-xs tracking-widest text-mute uppercase">Selected</p>
            <h3 className="mt-2 font-display text-4xl leading-none">{selected.name}</h3>
            <p className="mt-3 font-mono text-sm text-parchment">
              {selected.source === "chain" ? `${selected.tokenId} #${selected.serial}` : `Local seal #${selected.serial}`}
            </p>
            <p className="mt-1 text-sm text-mute">Held by {selected.accountId}</p>
            {selected.meta ? <p className="mt-3 text-sm text-mute">{selected.meta}</p> : null}
            <div className="mt-5 flex flex-wrap gap-2">
              {(
                [
                  ["send", "Send"],
                  ["receive", "Receive"],
                  ["list", "List"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={move === id}
                  onClick={() => setMove(id)}
                  className={
                    move === id
                      ? "rounded-full bg-copper px-4 py-2 text-sm font-medium text-copper-ink"
                      : "rounded-full border border-line px-4 py-2 text-sm text-parchment"
                  }
                >
                  {label}
                </button>
              ))}
            </div>
            {selected.source === "chain" ? (
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <a href={sentxNft(selected.tokenId, selected.serial)} target="_blank" rel="noreferrer" className="text-copper underline">
                  Open on SentX
                </a>
                <a href="https://www.hashpack.app/" target="_blank" rel="noreferrer" className="text-copper underline">
                  Open HashPack
                </a>
                <a href={hashscanNft(selected.tokenId, selected.serial)} target="_blank" rel="noreferrer" className="text-mute underline">
                  HashScan
                </a>
              </div>
            ) : (
              <p className="mt-5 text-sm text-mute">
                A desk seal is not on Hedera yet. Send, receive, and list apply after it is minted in HashPack. The trail
                can still name the hash.
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-line bg-panel p-5">
            <p className="font-mono text-xs tracking-widest text-mute uppercase">How to {move}</p>
            <ol className="mt-4 space-y-3">
              {steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-2 text-sm">
                  <span className="font-mono text-copper">{String(index + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-line bg-panel p-5 lg:col-span-2">
            <p className="font-mono text-xs tracking-widest text-mute uppercase">Authority Trail · DOVU</p>
            <p className="mt-2 max-w-3xl text-sm text-mute">
              DOVU has no NFT endpoint. The trail records who may act, in which role, for how long. You bind this piece
              by naming it in that role. Signing happens on{" "}
              <a href={TRAIL} target="_blank" rel="noreferrer" className="text-parchment underline">
                authority.dovu.ai
              </a>
              , paid in $TRUST. Reading the trail is free.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(
                [
                  ["put", "Put on trail"],
                  ["create", "Create"],
                  ["manage", "Manage"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={trailMode === id}
                  onClick={() => setTrailMode(id)}
                  className={
                    trailMode === id
                      ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg"
                      : "rounded-full border border-line px-4 py-2 text-sm text-parchment"
                  }
                >
                  {label}
                </button>
              ))}
            </div>
            {trailNote ? <p className="mt-4 text-sm text-mute">{trailNote}</p> : null}
            {trailError ? <p className="mt-4 text-sm text-copper">{trailError}</p> : null}

            {trailMode === "put" ? (
              <div className="mt-4">
                <p className="text-sm">
                  Prepared line: bearer of {selected.name} {selected.source === "chain" ? `${selected.tokenId} #${selected.serial}` : `#${selected.serial}`}{" "}
                  for {selected.accountId}.
                </p>
                <ol className="mt-3 space-y-2 text-sm text-mute">
                  <li>1. The holder needs an identity on the trail. Create does that, for 100 $TRUST.</li>
                  <li>2. An authority publishes a role, for example bearer, for 2,500 $TRUST.</li>
                  <li>3. The grant names this account and the window. Granting is 10,000 $TRUST. The NFT stays in the wallet.</li>
                </ol>
                <button type="button" onClick={putOnTrail} className="mt-4 min-h-12 rounded-full bg-copper px-5 text-sm font-medium text-copper-ink">
                  Keep this line and open DOVU
                </button>
              </div>
            ) : null}

            {trailMode === "create" ? (
              <ol className="mt-4 space-y-3 text-sm">
                <li>01. Open Authority Trail in the same HashPack account that holds the piece.</li>
                <li>02. Prepare the identity topic and sign it. Nothing is stored until you confirm the transaction id.</li>
                <li>03. Associate $TRUST if the account has not. Then register the identity. That announcement is 100 $TRUST.</li>
                <li>04. Claim a handle. A verified domain is what lets the account become an authority.</li>
                <li>05. Publish the role list: name bearer, label “Bearer of {selected.name}”, a default window and a max window. 2,500 $TRUST.</li>
                <li>06. Grant bearer to {selected.accountId === "this desk" ? "the holder’s account" : selected.accountId}. Say the token and serial in the reason. 10,000 $TRUST. Assigning again renews. It does not mint a second NFT.</li>
                <li>
                  <a href={`${TRAIL}/developers`} target="_blank" rel="noreferrer" className="text-copper underline">
                    Developer desk
                  </a>
                  {" · "}
                  <a href={TRAIL} target="_blank" rel="noreferrer" className="text-copper underline">
                    Open Authority Trail
                  </a>
                </li>
              </ol>
            ) : null}

            {trailMode === "manage" ? (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-display text-2xl">On the public trail</p>
                  {identity ? (
                    <p className="mt-2 text-sm text-mute">
                      {identity.handle ? `@${identity.handle}` : "No handle"} · {identity.trust_level} · topic{" "}
                      {identity.identity_topic_id}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-mute">No identity on the trail for this account yet. Create one first.</p>
                  )}
                  {grants.length === 0 ? (
                    <p className="mt-3 text-sm text-mute">No grants held by this account.</p>
                  ) : (
                    <ul className="mt-3 space-y-2 text-sm">
                      {grants.map((grant) => (
                        <li key={grant.id} className="border-t border-line pt-2">
                          <span className="text-parchment">{grant.role_label || grant.role_name}</span>
                          <span className="text-mute"> · {grant.status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-3 text-sm text-mute">
                    Revoke is 2,500 $TRUST. The earlier window stays on the record. Denying a request is the same price.
                  </p>
                  <a href={TRAIL} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-copper underline">
                    Manage on DOVU
                  </a>
                </div>
                <div>
                  <p className="font-display text-2xl">Lines kept on this desk</p>
                  {intents.length === 0 ? (
                    <p className="mt-2 text-sm text-mute">Nothing queued. Put a selected piece on the trail to keep the line here.</p>
                  ) : (
                    <ul className="mt-3 space-y-3">
                      {intents.map((intent) => (
                        <li key={intent.id} className="border-t border-line pt-2 text-sm">
                          <p>{intent.note}</p>
                          <p className="font-mono text-xs text-mute">{new Date(intent.at).toLocaleString()}</p>
                          <button
                            type="button"
                            className="mt-1 text-mute underline"
                            onClick={() => {
                              const next = intents.filter((item) => item.id !== intent.id);
                              setIntents(next);
                              localStorage.setItem(INTENT_KEY, JSON.stringify(next));
                            }}
                          >
                            Drop line
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function instructions(piece: Piece, move: Move) {
  const label = piece.source === "chain" ? `${piece.name} ${piece.tokenId} #${piece.serial}` : `${piece.name} (desk only, hash ${piece.meta})`;
  if (piece.source === "desk") {
    return [
      `${label} is a local seal. HashPack and SentX cannot see it until a collection mints that serial.`,
      "Mint or import the metadata in HashPack first. Keep the hash so the serial you list is the one you sealed.",
      "Then come back, load the Hedera account, and use Send, Receive, or List on the chain piece.",
    ];
  }
  if (move === "send") {
    return [
      `Open HashPack with the account that currently holds ${label}. Confirm the token id, not only the picture.`,
      "Choose Send on that serial. Paste the receiver’s account id, 0.0.something. Do not put an X tag in that field.",
      "Read the HBAR network fee. Sign only if the serial and the receiver match what you meant.",
      "After consensus, HashScan should show the receiver as the account on that serial. Until then it is still yours.",
      "The receiver may need to associate the token before the transfer will clear. Association is their small HBAR fee, not a transfer of the NFT.",
    ];
  }
  if (move === "receive") {
    return [
      `Share your Hedera account id. The sender must transfer ${label} from the wallet that owns it.`,
      "If HashPack asks you to associate the collection, do that first. Associating does not pull the NFT to you.",
      "You do not sign a receive. Wait, then open NFTs in HashPack. The new serial appears when consensus lands.",
      "Check HashScan. The account on that serial should be yours. A screenshot from the sender is not the record.",
      "If it does not arrive, the usual causes are the wrong account id, a missing association, or a fee the sender did not cover.",
    ];
  }
  return [
    `Open ${label} on SentX and connect the HashPack account that owns it. SentX never holds the NFT.`,
    "In My NFTs, start a listing for this serial only. Check the token id before you set a price.",
    "Enter the price and the payment token. A listing is an asking price. It is not a sale and not a valuation.",
    "Approve this NFT only, unless you mean to allow the whole collection. Read the allowance before you sign.",
    "Sign in HashPack. Keep a little HBAR for the network fee. The listing should show this exact serial before you leave.",
  ];
}
