import { useState } from "react";

type Link = { label: string; href: string };
type Group = { title: string; links: Link[] };

const GROUPS: Group[] = [
  {
    title: "Network",
    links: [
      { label: "hedera.com", href: "https://hedera.com/" },
      { label: "docs.hedera.com", href: "https://docs.hedera.com/" },
      { label: "discord.com", href: "https://discord.com/invite/E7Hhx2adVF" },
      { label: "hashscan.io", href: "https://hashscan.io/" },
      { label: "hgraph.com", href: "https://hgraph.com/" },
      { label: "hsuite.app", href: "https://hsuite.app/" },
    ],
  },
  {
    title: "Wallet",
    links: [
      { label: "hashpack.app", href: "https://www.hashpack.app/" },
      { label: "dropp.cc", href: "https://dropp.cc/" },
      { label: "kabuto.sh", href: "https://kabuto.sh/" },
      { label: "hashgraph.name", href: "https://www.hashgraph.name/" },
    ],
  },
  {
    title: "Markets",
    links: [
      { label: "saucerswap.finance", href: "https://www.saucerswap.finance/" },
      { label: "bonzo.finance", href: "https://bonzo.finance/" },
      { label: "eta.finance", href: "https://eta.finance/" },
      { label: "ichi.org", href: "https://app.ichi.org/" },
      { label: "sodax.com", href: "https://www.sodax.com/" },
      { label: "banksocial.io", href: "https://banksocial.io/" },
      { label: "memejob.fun", href: "https://memejob.fun/" },
      { label: "headstarter.org", href: "https://www.headstarter.org/" },
    ],
  },
  {
    title: "Collect",
    links: [
      { label: "sentx.io", href: "https://sentx.io/" },
      { label: "kiloscribe.com", href: "https://kiloscribe.com/" },
      { label: "altlantis.io", href: "https://www.altlantis.io/" },
      { label: "davincigraph.io", href: "https://davincigraph.io/" },
      { label: "kabila.app", href: "https://kabila.app/" },
    ],
  },
  {
    title: "Use",
    links: [
      { label: "dovu.market", href: "https://app.dovu.market/" },
      { label: "tune.fm", href: "https://tune.fm/" },
      { label: "karate.com", href: "https://karate.com/" },
      { label: "neuron.world", href: "https://neuron.world/" },
    ],
  },
];

function shot(href: string) {
  return `https://image.thum.io/get/width/640/crop/360/noanimate/${href}`;
}

export function HederaEcosystemMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-4 sm:px-8">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="hedera-ecosystem"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-24 w-full items-center justify-center gap-5 rounded-xl border border-[#3a2a14] bg-[#12080c] px-6 text-sm text-[#f3e6c8] sm:text-base"
      >
        <img src="/hedera-coin.webp" alt="" className="h-20 w-20 shrink-0 object-contain" />
        Hedera Ecosystem
      </button>
      {open ? (
        <div id="hedera-ecosystem" className="mt-4 space-y-5 rounded-xl border border-[#3a2a14] bg-[#12080c] p-4">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="font-mono text-xs tracking-widest text-[#d4b56a] uppercase">{group.title}</h2>
              <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block overflow-hidden rounded-lg border border-border bg-surface text-fg"
                    >
                      <img src={shot(link.href)} alt="" className="h-28 w-full object-cover object-top" />
                      <span className="block px-3 py-2 text-sm">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}
