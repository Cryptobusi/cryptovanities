import { useEffect, useState } from "react";
import {
  dmUrl,
  HANDLE,
  HOME_POSTS,
  LEDGER_KEY,
  pickQuote,
  SEATS,
  type Quote,
} from "@/lib/site-data";
import { Kicker } from "@/components/home-front";

type SavedNote = {
  email: string;
  message: string;
  role: string;
  at: string;
  quote: string;
  quoteUrl: string;
  dmUrl: string;
};

export function BoardPreview() {
  return (
    <section id="board" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker>The X board</Kicker>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Writings from @{HANDLE}.</h2>
        </div>
        <a href="https://x.com/trancesage" target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm text-fg">
          Open on X
        </a>
      </div>
      <p className="mt-5 max-w-2xl text-muted">
        The public board is the account. Only the posts and replies on Providence Through Provenance.
      </p>
      <p className="mt-4">
        <a href="/board" className="text-sm text-fg underline decoration-border underline-offset-4">
          See this week's board →
        </a>
      </p>
      <ol className="mt-10 divide-y divide-border border-y border-border">
        {HOME_POSTS.map((post) => (
          <li key={post.href}>
            <a href={post.href} target="_blank" rel="noreferrer" className="grid gap-2 py-5 sm:grid-cols-[5rem_1fr] sm:gap-6">
              <time className="font-mono text-xs text-subtle">{post.date}</time>
              <p className="text-fg">{post.text}</p>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Invitation() {
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  const [role, setRole] = useState<(typeof SEATS)[number]["id"]>("witness");
  const [saved, setSaved] = useState<SavedNote | null>(null);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LEDGER_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedNote;
        if (parsed?.email && parsed.role && parsed.quote && parsed.dmUrl) setSaved(parsed);
      }
    } catch {
      /* ignore a bad local note */
    }
    setReady(true);
  }, []);

  const seat = SEATS.find((item) => item.id === (saved?.role ?? role)) ?? SEATS[0];

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const handle = tag.trim().replace(/^@+/, "");
    const note = message.trim();
    if (!/^[A-Za-z0-9_]{1,15}$/.test(handle)) {
      setError("Leave a real X tag.");
      return;
    }
    if (note.length < 2) {
      setError("Leave a message. A blank note cannot choose a line.");
      return;
    }
    if (note.length > 2000) {
      setError("Keep the message under 2,000 characters.");
      return;
    }
    if (honey.trim()) return;
    const email = `@${handle}`;
    const quote: Quote = pickQuote(note, role);
    const url = dmUrl(email, note, role);
    const next: SavedNote = {
      email,
      message: note,
      role,
      at: new Date().toISOString(),
      quote: quote.text,
      quoteUrl: quote.url,
      dmUrl: url,
    };
    localStorage.setItem(LEDGER_KEY, JSON.stringify(next));
    setSaved(next);
    setError("");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="ledger" className="border-t border-border bg-bg/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div>
          <Kicker>The invitation</Kicker>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Write your name toward the next season.</h2>
          <p className="mt-5 text-muted">
            Leave an X tag and a message. Joining opens a direct message to @{HANDLE} with your note already written —
            you send it from your own X account. The tag is not sold and not stacked into a dossier.
          </p>
          <p className="mt-4 text-sm text-fg">Witness is free. A write is about $0.001.</p>
        </div>
        {!ready ? (
          <div className="rounded-xl border border-border bg-bg p-6 text-sm text-muted">The ledger is opening.</div>
        ) : saved ? (
          <div className="rounded-xl border border-border bg-bg p-6">
            <p className="font-mono text-xs tracking-widest text-subtle uppercase">Noted</p>
            <h3 className="mt-2 font-display text-3xl">{saved.email}</h3>
            <p className="mt-2 text-sm text-muted">
              Seat {seat.name}
              {seat.fee ? ` · ${[seat.fee, seat.unit].filter(Boolean).join(" ")}` : ""}
            </p>
            <blockquote className="mt-5 border-l border-primary pl-4 font-display text-2xl leading-snug">
              {saved.quote}
            </blockquote>
            <a href={saved.quoteUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-fg underline decoration-border underline-offset-4">
              The line the note matched
            </a>
            <p className="mt-4 text-sm text-muted">
              A direct message to @{HANDLE} should be open. Send it from your own X account. Nothing here is stored
              except on this browser.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={saved.dmUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
                Open the message again
              </a>
              <button
                type="button"
                className="rounded-full border border-border px-4 py-3 text-sm text-fg"
                onClick={() => {
                  localStorage.removeItem(LEDGER_KEY);
                  setSaved(null);
                  setMessage("");
                }}
              >
                Write another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-xl border border-border bg-bg p-6">
            <label htmlFor="ledger-tag" className="text-sm text-muted">
              X tag
            </label>
            <input
              id="ledger-tag"
              type="text"
              autoComplete="username"
              required
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-3 text-fg outline-none focus:border-ring"
              placeholder="@yourtag"
              spellCheck={false}
            />
            <label htmlFor="ledger-message" className="mt-5 block text-sm text-muted">
              Message
            </label>
            <textarea
              id="ledger-message"
              required
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-2 w-full resize-y rounded-md border border-border bg-surface px-3 py-3 text-fg outline-none focus:border-ring"
              placeholder="What are you bringing to the ledger?"
            />
            <label className="absolute -left-[9999px]" aria-hidden>
              Company
              <input tabIndex={-1} autoComplete="off" value={honey} onChange={(event) => setHoney(event.target.value)} />
            </label>
            <fieldset className="mt-5">
              <legend className="text-sm text-muted">Seat</legend>
              <div className="mt-2 grid gap-2">
                {SEATS.map((item) => (
                  <label
                    key={item.id}
                    className={
                      role === item.id
                        ? "flex cursor-pointer items-center justify-between rounded-md border border-primary px-3 py-3"
                        : "flex cursor-pointer items-center justify-between rounded-md border border-border px-3 py-3"
                    }
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="role"
                        value={item.id}
                        checked={role === item.id}
                        onChange={() => setRole(item.id)}
                        className="accent-primary"
                      />
                      {item.name}
                    </span>
                    <span className="font-mono text-sm text-fg">{item.fee}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {error ? <p className="mt-4 text-sm text-gold">{error}</p> : null}
            <button type="submit" className="mt-6 w-full rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
              Send to @{HANDLE}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
