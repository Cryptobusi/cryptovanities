import { BOARD, HANDLE } from "@/lib/site-data";

export function BoardPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <p className="font-mono text-xs tracking-widest text-gold uppercase">This week</p>
      <h1 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-7xl">Writings from @{HANDLE}.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        The public board is the account. Only the posts on Providence Through Provenance. Open any line on X.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://x.com/trancesage"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-fg"
        >
          Open @{HANDLE}
        </a>
        <a href="/#board" className="rounded-full border border-border px-5 py-3 text-sm text-fg">
          Back to the page
        </a>
      </div>
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {BOARD.map((post, index) => (
          <li key={post.href}>
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="grid gap-3 py-6 sm:grid-cols-[4rem_6rem_1fr] sm:gap-6"
            >
              <span className="font-mono text-xs text-gold">{String(index + 1).padStart(2, "0")}</span>
              <time className="font-mono text-xs text-subtle">{post.date}</time>
              <p className="font-display text-2xl leading-snug text-fg sm:text-3xl">{post.text}</p>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
