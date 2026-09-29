import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { HashgraphMark } from "@/components/mark";

const NAV = [
  { href: "#thesis", label: "Thesis" },
  { href: "#provenance", label: "Provenance" },
  { href: "#give", label: "Coins" },
  { href: "/demo", label: "Demo" },
  { href: "/board", label: "Board" },
] as const;

const X_HANDLE = import.meta.env.VITE_X_HANDLE || "trancesage";

function usePathname() {
  return useRouterState({ select: (state) => state.location.pathname });
}

function hrefFor(href: string, pathname: string) {
  if (href.startsWith("#")) return pathname === "/" ? href : `/${href}`;
  return href;
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const boardActive = pathname === "/board";

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href={pathname === "/" ? "#top" : "/"} className="flex items-center gap-2.5 text-fg">
          <HashgraphMark className="size-7" />
          <span className="font-display text-lg tracking-tight">Egonomic Anonymous</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {NAV.map((item) => {
            const active = boardActive && item.href === "/board";
            return (
              <a
                key={item.label}
                href={hrefFor(item.href, pathname)}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-[#f3f0e8] underline decoration-[#C9A45C] decoration-2 underline-offset-[6px]"
                    : item.href === "/demo"
                      ? "rounded-full bg-[#6e6c66] px-3 py-1.5 font-medium text-[#f3f0e8] transition-colors hover:bg-[#7d7b74]"
                      : "transition-colors hover:text-fg"
                }
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={hrefFor("#ledger", pathname)}
            className="rounded-full bg-primary px-4 py-2 font-medium text-primary-fg"
          >
            Begin the ledger
          </a>
        </nav>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md border border-border text-fg md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 md:hidden">
          {NAV.map((item) => {
            const active = boardActive && item.href === "/board";
            return (
              <a
                key={item.label}
                href={hrefFor(item.href, pathname)}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-md px-2 py-3 text-[#f3f0e8] underline decoration-[#C9A45C] decoration-2 underline-offset-4"
                    : item.href === "/demo"
                      ? "rounded-full bg-[#6e6c66] px-3 py-3 text-center font-medium text-[#f3f0e8]"
                      : "rounded-md px-2 py-3 text-muted"
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={hrefFor("#ledger", pathname)}
            className="mt-1 rounded-full bg-primary px-4 py-3 text-center font-medium text-primary-fg"
            onClick={() => setOpen(false)}
          >
            Begin the ledger
          </a>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="https://egonomicanonymous.live" className="font-display text-2xl">
            EgonomicAnonymous.live
          </a>
          <p className="mt-2 max-w-md text-sm text-muted">
            The Providence Through Provenance. Empowering self-sovereignty. Secure, transparent,
            and fair.
          </p>
          <p className="mt-3 font-mono text-xs text-subtle">#LeGoMiEgo</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <a href={hrefFor("#give", pathname)} className="hover:text-fg">
            Coins
          </a>
          <a href="https://hedera.com" className="hover:text-fg" target="_blank" rel="noreferrer">
            Hedera
          </a>
          <a href="/board" className="hover:text-fg">
            X board
          </a>
          <a href="https://dovu.ai" className="hover:text-fg" target="_blank" rel="noreferrer">
            DOVU
          </a>
          <a href="/demo" className="hover:text-fg">
            Demo
          </a>
          <a href={hrefFor("#ledger", pathname)} className="hover:text-fg">
            Ledger
          </a>
          <a
            href={`https://x.com/${X_HANDLE}`}
            className="hover:text-fg"
            target="_blank"
            rel="noreferrer"
          >
            @{X_HANDLE}
          </a>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-10 text-xs text-subtle sm:px-8">
        Rails drawn from Hedera and DOVU; voice from the open writings of{" "}
        <a href={`https://x.com/${X_HANDLE}`} className="text-muted">
          @{X_HANDLE}
        </a>
        , kept as an X post board. Fees through X Money. Gifts in $Trust. Ledgers do not repeal law. They
        shrink the cost of proving compliance. Isolated pilots recreate the mess they were meant
        to replace.
      </p>
    </footer>
  );
}
