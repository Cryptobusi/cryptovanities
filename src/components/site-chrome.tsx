import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mark } from "@/components/mark";

type Item = { label: string; to?: string; href?: string; note?: string };

const ACT: Item[] = [
  { label: "Enter", to: "/enter", note: "Walk the invoice" },
  { label: "Catalog", to: "/catalog", note: "BUI draw · luxury pick" },
  { label: "Floor desk", to: "/floor", note: "Reserve the claim" },
  { label: "Market", to: "/market", note: "Thin books" },
  { label: "Sealroom", to: "/demo", note: "Local seal" },
];

const LAYERS: Item[] = [
  { label: "Floor", to: "/claim", note: "Senior claim" },
  { label: "Mint", to: "/mint", note: "Listed window" },
  { label: "Issue", to: "/hedge", note: "Window lock" },
  { label: "Tape", to: "/show", note: "What can be shown" },
  { label: "Charge", to: "/charge", note: "Listed price" },
  { label: "Agent", to: "/agent", note: "Clerk of rules" },
  { label: "Thin", to: "/thin", note: "Width is information" },
  { label: "Desert", to: "/desert", note: "After listed prices" },
];

const BOOK: Item[] = [
  { label: "Thesis", href: "/#thesis", note: "Door" },
  { label: "Fidelity", href: "/#fidelity", note: "Lyric to settlement" },
  { label: "Stack", to: "/stack", note: "Against fiat" },
  { label: "Refusal", to: "/refusal", note: "One floor, three actors" },
  { label: "Notes", to: "/notes", note: "Bound order" },
  { label: "Board", to: "/board", note: "Pairs" },
  { label: "Help", to: "/help", note: "Index" },
];

function NavLink({ item, className, onClick }: { item: Item; className: string; onClick?: () => void }) {
  if (item.to) {
    return (
      <Link to={item.to} className={className} onClick={onClick}>
        <span>{item.label}</span>
        {item.note ? <span className="block text-xs text-subtle">{item.note}</span> : null}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onClick}>
      <span>{item.label}</span>
      {item.note ? <span className="block text-xs text-subtle">{item.note}</span> : null}
    </a>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [panel, setPanel] = useState<"act" | "layers" | "book" | null>(null);

  function close() {
    setPanel(null);
  }

  return (
    <div className="relative min-h-dvh text-fg">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link to="/" hash="top" className="flex items-center gap-2.5 text-fg" onClick={close}>
            <Mark />
            <span className="font-display text-lg tracking-tight">Egonomic Anonymous</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-1 text-sm text-muted" aria-label="Graph">
            {(
              [
                ["act", "Act"],
                ["layers", "Layers"],
                ["book", "Book"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={panel === id ? "px-3 py-2 text-fg" : "px-3 py-2 hover:text-fg"}
                onClick={() => setPanel((now) => (now === id ? null : id))}
              >
                {label}
              </button>
            ))}
            <Link to="/enter" className="ml-2 border border-border px-3 py-2 text-fg">
              Desk
            </Link>
          </nav>
        </div>
        {panel ? (
          <div className="border-t border-border">
            <div className="mx-auto grid max-w-6xl gap-6 px-5 py-6 sm:px-8 md:grid-cols-4">
              {(panel === "act" ? ACT : panel === "layers" ? LAYERS : BOOK).map((item) => (
                <NavLink key={item.label} item={item} className="text-sm text-muted hover:text-fg" onClick={close} />
              ))}
            </div>
            {panel === "layers" ? (
              <p className="mx-auto max-w-6xl px-5 pb-6 font-mono text-xs text-subtle sm:px-8">
                Floor → Mint → Issue → Tape → Charge → Agent → Thin → Desert
              </p>
            ) : null}
          </div>
        ) : null}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-3">
          <div>
            <a href="https://egonomicanonymous.live" className="font-display text-2xl">
              EgonomicAnonymous.live
            </a>
            <p className="mt-2 max-w-md text-sm text-muted">Floor → Mint → Issue → Tape → Charge → Agent → Thin → Desert.</p>
          </div>
          <div className="text-sm text-muted">
            <p className="font-mono text-xs tracking-widest text-subtle uppercase">Act</p>
            <div className="mt-3 flex flex-col gap-2">
              {ACT.map((item) => (
                <NavLink key={item.label} item={item} className="hover:text-fg" />
              ))}
            </div>
          </div>
          <div className="text-sm text-muted">
            <p className="font-mono text-xs tracking-widest text-subtle uppercase">Book</p>
            <div className="mt-3 flex flex-col gap-2">
              {BOOK.map((item) => (
                <NavLink key={item.label} item={item} className="hover:text-fg" />
              ))}
            </div>
          </div>
        </div>
        <p className="mx-auto max-w-6xl px-5 pb-10 text-xs text-subtle sm:px-8">
          Voice of <a href="https://x.com/trancesage" className="text-muted">@trancesage</a>.
        </p>
      </footer>
    </div>
  );
}
