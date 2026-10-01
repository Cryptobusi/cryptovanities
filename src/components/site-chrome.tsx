import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Mark } from "@/components/mark";

const DESK = [
  { label: "Enter", to: "/enter" },
  { label: "Floor", to: "/floor" },
  { label: "Market", to: "/market" },
  { label: "Sealroom", to: "/demo" },
  { label: "Coins", href: "/#give" },
] as const;

const READ = [
  { label: "Thesis", href: "/#thesis" },
  { label: "Notes", to: "/notes" },
  { label: "Board", to: "/board" },
] as const;

const NOTES = [
  { label: "Stack", to: "/stack" },
  { label: "Hedge", to: "/hedge" },
  { label: "Invoice", href: "/hedge#steps" },
  { label: "Show", to: "/show" },
  { label: "Charge", to: "/charge" },
  { label: "Mint", to: "/mint" },
  { label: "Desert", to: "/desert" },
  { label: "Agent", to: "/agent" },
  { label: "Thin", to: "/thin" },
  { label: "Claim", to: "/claim" },
] as const;

const MORE = [
  { label: "Help", to: "/help" },
  { label: "Provenance", href: "/#provenance" },
  { label: "Explore", href: "https://hedera.kiloscribe.com/" },
] as const;

type NavItem = (typeof DESK)[number] | (typeof READ)[number] | (typeof NOTES)[number] | (typeof MORE)[number];

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
    <a href={item.href} className={className} onClick={onClick} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
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
            {DESK.filter((item) => item.label !== "Sealroom").map((item) => (
              <NavLink key={item.label} item={item} className="transition-colors hover:text-fg" />
            ))}
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            {READ.map((item) => (
              <NavLink key={item.label} item={item} className="transition-colors hover:text-fg" />
            ))}
            <a href="/#ledger" className="rounded-full bg-primary px-4 py-2 font-medium text-primary-fg">
              Begin the ledger
            </a>
            <Link to="/demo" aria-label="Sealroom" className="shrink-0">
              <img src="/sealroom-desk-mark.webp" alt="" className="sky-blend size-10 object-contain" />
            </Link>
          </nav>
          <button type="button" className="inline-flex size-11 items-center justify-center rounded-md border border-border text-fg lg:hidden" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 text-sm lg:hidden" aria-label="Site">
            <p className="px-2 pt-2 font-mono text-xs tracking-widest text-subtle uppercase">Desk</p>
            {DESK.map((item) => (
              <NavLink key={item.label} item={item} className="rounded-md px-2 py-3 text-fg" onClick={() => setOpen(false)} />
            ))}
            <p className="px-2 pt-3 font-mono text-xs tracking-widest text-subtle uppercase">Read</p>
            {READ.map((item) => (
              <NavLink key={`r-${item.label}`} item={item} className="rounded-md px-2 py-3 text-fg" onClick={() => setOpen(false)} />
            ))}
            <p className="px-2 pt-3 font-mono text-xs tracking-widest text-subtle uppercase">Notes</p>
            {NOTES.map((item) => (
              <NavLink key={item.label} item={item} className="rounded-md px-2 py-3 text-fg" onClick={() => setOpen(false)} />
            ))}
            <p className="px-2 pt-3 font-mono text-xs tracking-widest text-subtle uppercase">More</p>
            {MORE.map((item) => (
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
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_2fr]">
          <div>
            <a href="https://egonomicanonymous.live" className="font-display text-2xl">
              EgonomicAnonymous.live
            </a>
            <p className="mt-2 max-w-md text-sm text-muted">The Providence Through Provenance. Empowering self-sovereignty. Secure, transparent, and fair.</p>
            <p className="mt-3 font-mono text-xs text-subtle">#LeGoMiEgo</p>
          </div>
          <nav className="grid gap-6 text-sm text-muted sm:grid-cols-3" aria-label="Footer">
            <div>
              <p className="font-mono text-xs tracking-widest text-subtle uppercase">Desk</p>
              <div className="mt-3 flex flex-col gap-2">
                {DESK.map((item) => (
                  <NavLink key={item.label} item={item} className="hover:text-fg" />
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-subtle uppercase">Read</p>
              <div className="mt-3 flex flex-col gap-2">
                {READ.map((item) => (
                  <NavLink key={`fr-${item.label}`} item={item} className="hover:text-fg" />
                ))}
                {MORE.map((item) => (
                  <NavLink key={`fm-${item.label}`} item={item} className="hover:text-fg" />
                ))}
                <a href="/#ledger" className="hover:text-fg">Ledger</a>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-subtle uppercase">Notes</p>
              <div className="mt-3 flex flex-col gap-2">
                {NOTES.map((item) => (
                  <NavLink key={`fn-${item.label}`} item={item} className="hover:text-fg" />
                ))}
              </div>
            </div>
          </nav>
        </div>
        <div className="mx-auto max-w-6xl border-t border-border px-5 py-8 sm:px-8">
          <p className="font-mono text-xs tracking-widest text-subtle uppercase">Book</p>
          <p className="mt-2 max-w-2xl text-sm text-muted">Open Notes. Leave an X tag. Send the drafted message to @trancesage. Then Print → Save as PDF.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/notes" className="rounded-full border border-border px-4 py-2 text-sm text-fg">View the notes</Link>
            <Link to="/enter" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg">Enter the program</Link>
          </div>
        </div>
        <p className="mx-auto max-w-6xl px-5 pb-10 text-xs text-subtle sm:px-8">
          Rails drawn from Hedera and DOVU; voice from the open writings of <a href="https://x.com/trancesage" className="text-muted">@trancesage</a>. Fees through X Money. Gifts in $Trust.
        </p>
      </footer>
    </div>
  );
}
