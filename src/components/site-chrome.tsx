import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Mark } from "@/components/mark";

const USE = [
  { label: "Help", to: "/help" },
  { label: "Floor", to: "/floor" },
  { label: "Market", to: "/market" },
  { label: "Coins", href: "/#give" },
  { label: "Explore", href: "https://hedera.kiloscribe.com/" },
  { label: "Sealroom", to: "/demo" },
] as const;

const READ = [
  { label: "Thesis", href: "/#thesis" },
  { label: "Notes", to: "/notes" },
  { label: "Invoice", href: "/hedge#steps" },
  { label: "Provenance", href: "/#provenance" },
  { label: "Board", to: "/board" },
] as const;

const CHAPTERS = [
  { label: "Stack", to: "/stack" },
  { label: "Hedge", to: "/hedge" },
  { label: "Show", to: "/show" },
  { label: "Charge", to: "/charge" },
  { label: "Mint", to: "/mint" },
  { label: "Desert", to: "/desert" },
  { label: "Agent", to: "/agent" },
  { label: "Thin", to: "/thin" },
  { label: "Claim", to: "/claim" },
] as const;

type NavItem =
  | (typeof USE)[number]
  | (typeof READ)[number]
  | (typeof CHAPTERS)[number];

function NavLink({ item, className, onClick }: { item: NavItem; className: string; onClick?: () => void }) {
  if ("to" in item) {
    return (
      <Link to={item.to} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  const external = item.href.startsWith("http");
  return (
    <a
      href={item.href}
      className={className}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {item.label}
    </a>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-dvh text-fg">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link to="/" hash="top" className="flex items-center gap-2.5 text-fg" onClick={() => setOpen(false)}>
            <Mark />
            <span className="font-display text-lg tracking-tight">Egonomic Anonymous</span>
          </Link>
          <nav className="hidden items-center gap-x-4 text-sm text-muted lg:flex" aria-label="Site">
            <div className="flex items-center gap-x-4">
              {USE.filter((item) => item.label !== "Sealroom").map((item) => (
                <NavLink key={item.label} item={item} className="transition-colors hover:text-fg" />
              ))}
            </div>
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <div className="flex items-center gap-x-4">
              {READ.map((item) => (
                <NavLink key={item.label} item={item} className="transition-colors hover:text-fg" />
              ))}
            </div>
            <a href="/#ledger" className="rounded-full bg-primary px-4 py-2 font-medium text-primary-fg">
              Begin the ledger
            </a>
            <Link to="/demo" aria-label="Sealroom" className="shrink-0">
              <img src="/sealroom-desk-mark.webp" alt="" className="sky-blend size-10 object-contain" />
            </Link>
          </nav>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-border text-fg lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 text-sm lg:hidden" aria-label="Site">
            <p className="px-2 pt-2 font-mono text-xs tracking-widest text-subtle uppercase">Use</p>
            {USE.map((item) => (
              <NavLink key={item.label} item={item} className="rounded-md px-2 py-3 text-fg" onClick={() => setOpen(false)} />
            ))}
            <p className="px-2 pt-3 font-mono text-xs tracking-widest text-subtle uppercase">Read</p>
            {READ.map((item) => (
              <NavLink key={`r-${item.label}`} item={item} className="rounded-md px-2 py-3 text-fg" onClick={() => setOpen(false)} />
            ))}
            <p className="px-2 pt-3 font-mono text-xs tracking-widest text-subtle uppercase">Notes</p>
            {CHAPTERS.map((item) => (
              <NavLink key={item.label} item={item} className="rounded-md px-2 py-3 text-fg" onClick={() => setOpen(false)} />
            ))}
            <a href="/#ledger" className="rounded-md px-2 py-3 text-fg" onClick={() => setOpen(false)}>
              Begin the ledger
            </a>
          </nav>
        ) : null}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="https://egonomicanonymous.live" className="font-display text-2xl">
              EgonomicAnonymous.live
            </a>
            <p className="mt-2 max-w-md text-sm text-muted">
              The Providence Through Provenance. Empowering self-sovereignty. Secure, transparent, and fair.
            </p>
            <p className="mt-3 font-mono text-xs text-subtle">#LeGoMiEgo</p>
          </div>
          <nav className="flex max-w-md flex-col gap-4 text-sm text-muted" aria-label="Footer">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {USE.map((item) => (
                <NavLink key={item.label} item={item} className="hover:text-fg" />
              ))}
              {READ.map((item) => (
                <NavLink key={`f-${item.label}`} item={item} className="hover:text-fg" />
              ))}
              {CHAPTERS.map((item) => (
                <NavLink key={`c-${item.label}`} item={item} className="hover:text-fg" />
              ))}
              <a href="/#ledger" className="hover:text-fg">
                Ledger
              </a>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href="https://hedera.com" className="hover:text-fg" target="_blank" rel="noreferrer">
                Hedera
              </a>
              <a href="https://dovu.ai" className="hover:text-fg" target="_blank" rel="noreferrer">
                DOVU
              </a>
              <a href="https://x.com/trancesage" className="hover:text-fg" target="_blank" rel="noreferrer">
                @trancesage
              </a>
            </div>
          </nav>
        </div>
        <div className="mx-auto max-w-6xl border-t border-border px-5 py-8 sm:px-8">
          <p className="font-mono text-xs tracking-widest text-subtle uppercase">Dissertation</p>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Open Notes. Leave an X tag. Send the drafted message to @trancesage from your own account. Then Print → Save
            as PDF.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/notes" className="rounded-full border border-border px-4 py-2 text-sm text-fg">
              View the notes
            </Link>
            <Link to="/notes" hash="download" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg">
              Request download
            </Link>
          </div>
        </div>
        <p className="mx-auto max-w-6xl px-5 pb-10 text-xs text-subtle sm:px-8">
          Rails drawn from Hedera and DOVU; voice from the open writings of{" "}
          <a href="https://x.com/trancesage" className="text-muted">
            @trancesage
          </a>
          , kept as an X post board. Fees through X Money. Gifts in $Trust. Ledgers do not repeal law. They shrink the
          cost of proving compliance. Isolated pilots recreate the mess they were meant to replace.
        </p>
      </footer>
    </div>
  );
}
