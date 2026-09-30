import { useMemo, useState } from "react";
import { HELP } from "@/lib/help-index";

function matches(query: string) {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);
  if (words.length === 0) return HELP;
  return HELP.filter((entry) => {
    const haystack = `${entry.title} ${entry.instruction} ${entry.detail}`.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

export function HelpPage() {
  const [query, setQuery] = useState("");
  const listed = useMemo(() => matches(query), [query]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Help</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">How the desk is used.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        The index is the short list. Under it, each entry has the instruction, then the explanation.
      </p>

      <label className="mt-8 block max-w-xl text-sm text-muted">
        Search the index
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
          placeholder="Basket, mint, tape, HashPack"
          className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-fg outline-none placeholder:text-subtle focus:border-primary"
        />
      </label>
      <p className="mt-3 text-sm text-muted">
        {listed.length} of {HELP.length}
        {query.trim() ? (
          <button type="button" onClick={() => setQuery("")} className="ml-3 text-fg underline decoration-border underline-offset-4">
            Clear
          </button>
        ) : null}
      </p>

      <section className="mt-10" aria-label="Index">
        <h2 className="font-display text-3xl">Index</h2>
        {listed.length === 0 ? (
          <p className="mt-4 text-muted">Nothing under that search.</p>
        ) : (
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {listed.map((entry, index) => (
              <li key={entry.id}>
                <a href={`#${entry.id}`} className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-fg hover:border-primary">
                  <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
                  <span>{entry.title}</span>
                </a>
              </li>
            ))}
          </ol>
        )}
      </section>

      <div className="mt-12 space-y-10">
        {listed.map((entry, index) => (
          <article key={entry.id} id={entry.id} className="scroll-mt-24 border-t border-border pt-8">
            <p className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 font-display text-3xl">{entry.title}</h2>
            <h3 className="mt-5 font-mono text-xs tracking-widest text-subtle uppercase">Instruction</h3>
            <p className="mt-2 max-w-2xl text-fg">{entry.instruction}</p>
            <h3 className="mt-5 font-mono text-xs tracking-widest text-subtle uppercase">Explanation</h3>
            <p className="mt-2 max-w-2xl text-muted">{entry.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
