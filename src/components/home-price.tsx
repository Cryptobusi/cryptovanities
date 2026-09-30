import { useState } from "react";
import { CLUB_ACCOUNT, HOLDERS, SEATS, SUPPLY, TRUST_TOKEN } from "@/lib/site-data";
import { Kicker } from "@/components/home-front";

export function Price() {
  const [open, setOpen] = useState(false);
  return (
    <section id="give" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <Kicker>The price</Kicker>
      <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">A listed write. Not a gift.</h2>
      <p className="mt-5 max-w-2xl text-muted">
        About $0.001 a write. Issuance is priced. The witness seat is free. Profit is what remains after the floor and
        the risk charge.
      </p>
      <div className="mt-8 flex items-center gap-4 sm:gap-8">
        <a href="https://hedera.kiloscribe.com/" target="_blank" rel="noreferrer" aria-label="Explore on Kiloscribe" className="shrink-0">
          <img src="/club-hbar.webp" alt="Gold pin stamped Club H Bar" className="sky-blend w-28 object-contain sm:w-40" />
        </a>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <p className="font-mono text-xs tracking-widest text-subtle uppercase">Purchase $Trust</p>
          <a href="https://www.hashpack.app/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border bg-surface/70 px-3 py-2.5">
            <img src="/hashpack-mark.png" alt="" className="h-11 w-11 shrink-0 rounded-md object-cover" />
            <span className="min-w-0">
              <span className="block text-sm text-fg">HashPack</span>
              <span className="block truncate font-mono text-xs text-muted">www.hashpack.app</span>
            </span>
          </a>
          <a href="https://www.saucerswap.finance/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border bg-surface/70 px-3 py-2.5">
            <img src="/saucerswap-logo.png" alt="" className="h-11 w-11 shrink-0 rounded-full object-cover" />
            <span className="min-w-0">
              <span className="block text-sm text-fg">SaucerSwap</span>
              <span className="block truncate font-mono text-xs text-muted">www.saucerswap.finance</span>
            </span>
          </a>
        </div>
      </div>
      <div className="mt-8 max-w-3xl">
        <h3 className="font-display text-2xl">Mint a personal coin</h3>
        <p className="mt-3 text-sm text-muted">
          The coin is created in HashPack. This page does not mint it and does not take the keys. You sign. Your
          account is the treasury. HashPack shows the network fee before you confirm — a new fungible token is about
          one dollar in HBAR.
        </p>
        <ol className="mt-5 space-y-3 text-sm">
          <li><span className="font-medium text-fg">01. </span>Open HashPack on the account that will hold the supply. Leave HBAR for the fee the app shows.</li>
          <li><span className="font-medium text-fg">02. </span>Open the menu. Choose Advanced Tools, then Token Creator Tools.</li>
          <li><span className="font-medium text-fg">03. </span>Create a fungible token. Set the name, a short symbol, the decimals, and the initial supply. That supply is minted to your account.</li>
          <li><span className="font-medium text-fg">04. </span>Keys. Keep the supply key if you will mint more later. An admin key can change the token after you sign. Leave freeze, wipe, pause, and KYC off unless you mean to lock other holders out.</li>
          <li><span className="font-medium text-fg">05. </span>Read the summary. Sign only if the name, the symbol, the supply, and the keys match what you meant. HashPack returns a token id, 0.0.something. Copy it.</li>
          <li><span className="font-medium text-fg">06. </span>The coin shows under Assets. Another account must associate that token id before it can receive any.</li>
          <li><span className="font-medium text-fg">07. </span>Paste the id into the market deck. A SaucerSwap pool, if one exists, is the listed price. If none exists, two piles on the desk discover the ratio.</li>
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="https://www.hashpack.app/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg">Open HashPack</a>
          <a href="https://docs.hashpack.app/token-creators/token-creator-tool" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-sm text-fg underline decoration-border underline-offset-4">Token Creator notes</a>
          <a href="/market" className="inline-flex min-h-11 items-center text-sm text-fg underline decoration-border underline-offset-4">Market deck</a>
        </div>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {SEATS.map((seat) => (
          <article key={seat.id} className="flex flex-col rounded-lg border border-border bg-surface p-5">
            <h3 className="font-display text-2xl">{seat.name}</h3>
            <p className="mt-2 font-mono text-sm text-fg">{seat.fee}{seat.unit ? ` ${seat.unit}` : ""}</p>
            <p className="mt-3 text-sm text-muted">{seat.blurb}</p>
            <ul className="mt-4 space-y-2 text-sm text-fg">{seat.points.map((point) => (<li key={point}>{point}</li>))}</ul>
            <a href="#ledger" className="mt-6 inline-flex w-fit rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg">{seat.cta}</a>
          </article>
        ))}
      </div>
      <div className="mt-10 max-w-3xl">
        <h3 className="font-display text-2xl">What $Trust is for</h3>
        <p className="mt-3 text-muted">$Trust is the fee and the acknowledgement unit. It is not a second printer, and it is not legal tender.</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div><dt className="text-sm text-fg">Pay a write</dt><dd className="mt-1 text-sm text-muted">A line on the tape is about $0.001, settled in $Trust.</dd></div>
          <div><dt className="text-sm text-fg">Count an acknowledgement</dt><dd className="mt-1 text-sm text-muted">One coin, one acknowledgement. A count, not a share of the treasury.</dd></div>
          <div><dt className="text-sm text-fg">State a limit</dt><dd className="mt-1 text-sm text-muted">Authority is a ceiling in $Trust. The grant may not grow itself.</dd></div>
        </dl>
        <p className="mt-6 text-sm text-muted">
          Fungible on Hedera,{" "}
          <a href={`https://hashscan.io/mainnet/token/${TRUST_TOKEN}`} target="_blank" rel="noreferrer" className="text-fg underline decoration-border underline-offset-4">{TRUST_TOKEN}</a>
          , created 2026-06-25. The supply minted so far is 100,000,000,000 TRUST. At 4 decimals the chain stores 1,000,000,000,000,000 smallest units. The issuer's ceiling is a separate rule. Fees settle to{" "}
          <span className="font-sans tracking-tighter text-fg">ClubHbar.ℏ</span> {CLUB_ACCOUNT}. Buy it in HashPack or on SaucerSwap. This page does not take it at checkout. It does not vote and it does not pay a yield.
        </p>
        <button type="button" aria-expanded={open} aria-controls="trust-tokenomics" onClick={() => setOpen((value) => !value)} className="mt-6 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg">
          TRUST Tokenomics
        </button>
        {open ? <Tokenomics /> : null}
      </div>
    </section>
  );
}

function Tokenomics() {
  return (
    <div id="trust-tokenomics" className="mt-6 max-w-3xl space-y-8 rounded-lg border border-border bg-bg p-5">
      <div>
        <h3 className="font-display text-2xl">What it pays for</h3>
        <p className="mt-3 text-sm text-muted">
          $TRUST is DOVU’s meter for writing authority state on Hedera. Reading that record is free. Changing it is what the token is for. The supply rules are published at{" "}
          <a href="https://trust.dovu.ai/" target="_blank" rel="noreferrer" className="text-fg underline decoration-border underline-offset-4">trust.dovu.ai</a>.
        </p>
        <p className="mt-3 text-sm text-muted">
          On Authority Trail, a write is a change to shared authority: registering an identity, publishing a role list, granting a role, denying a request, or revoking one. The developer page prices examples at 100, 2,500, and 10,000 TRUST. Those fees are the demand. The token is not a share of DOVU, not a vote, and not a claim on the treasury.
        </p>
        <p className="mt-3 text-sm text-muted">
          On this site it is used more narrowly. A listed write is about $0.001, settled in $TRUST, and one coin can count as one acknowledgement. That dollar price is this site’s price. It is not the protocol’s fee, and it does not change how many tokens exist.
        </p>
      </div>
      <div>
        <h3 className="font-display text-2xl">Supply</h3>
        <p className="mt-3 text-sm text-muted">
          Genesis on 25 June 2026 was 100,000,000,000 TRUST. Nothing has been minted since. The chain still shows that same total. The Hedera token record itself has no max supply. The cap is the issuer’s contract: supply may not exceed genesis × 1.01ⁿ, compounding once a year from that date. There is no vote to raise the rate.
        </p>
        <dl className="mt-4 divide-y divide-border border-y border-border">
          {SUPPLY.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 py-2 text-sm">
              <dt className="text-muted">{label}</dt>
              <dd className="font-mono text-fg">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-muted">
          The ceiling grows by about 2.7 million TRUST a day. That headroom is not circulating. It is minted only when claimed, and only to one fixed recipient. Until then, the total stays 100 billion.
        </p>
      </div>
      <div>
        <h3 className="font-display text-2xl">Who holds the 100 billion</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="font-mono text-xs tracking-wide text-subtle uppercase">
              <tr>
                <th className="py-2 pr-3 font-normal">Bucket</th>
                <th className="py-2 pr-3 font-normal">Share</th>
                <th className="py-2 pr-3 font-normal">Unlock</th>
                <th className="py-2 font-normal">Still in the contract</th>
              </tr>
            </thead>
            <tbody>
              {HOLDERS.map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  <td className="py-2 pr-3 text-fg">{row[0]}</td>
                  <td className="py-2 pr-3 text-muted">{row[1]}</td>
                  <td className="py-2 pr-3 text-muted">{row[2]}</td>
                  <td className="py-2 text-muted">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted">About 97.6 million has vested to the ecosystem and not been claimed. Community, treasury, team, and partners have not started vesting. The first of those cliffs is 180 days from 25 June 2026.</p>
        <p className="mt-3 text-sm text-muted">The 8.43 billion circulating is exactly two claimed amounts: 3.43 billion from the ecosystem and the 5 billion liquidity release. The SaucerSwap DOVU/TRUST pool holds about 2.8 billion of that. It is inventory, not a second mint.</p>
        <p className="mt-3 text-sm text-muted">Two treasuries are easy to mix up. Account 0.0.10607410 is the issuance controller and holds none. The 15 billion treasury allocation sits in a different contract, 0.0.10607423.</p>
      </div>
    </div>
  );
}
