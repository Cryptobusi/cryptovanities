import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { dmUrl, HANDLE } from "@/lib/site-data";

const CHAPTERS = [
  { n: "I", title: "Door", to: "/#thesis", body: "Same rails. Anyone may issue. No one may hide the print. If it cannot be shown, it is only a story." },
  { n: "II", title: "Stack against fiat", to: "/stack", body: "Fiat already has the layers. The bundle is different: senior floor, public mint, no par paper, unpublished acts are not policy." },
  { n: "III", title: "Invoice conversion", to: "/hedge", body: "Face is paper. Checkout haircuts it into basket units. A hedge locks the conversion. The charge is paid when written." },
  { n: "IV", title: "What the tape shows", to: "/show", body: "Title, mint, lien, conversion, agent act. Not the body file. Not the raw inbox. Not a scraped dossier." },
  { n: "V", title: "Listed risk charge", to: "/charge", body: "The posted price of writing the paper. Beside the discount, not inside it. Taken before Desert." },
  { n: "VI", title: "Mint as a price", to: "/mint", body: "One meter. Listed seigniorage. No weekend facility. Revocation is a line." },
  { n: "VII", title: "Desert", to: "/desert", body: "After the floor and the listed prices, the remainder is titled. Not a tail to socialize." },
  { n: "VIII", title: "Agent", to: "/agent", body: "Pays the floor, flags an off-tape price, refuses a second print. Does not mint, set the basket, or harvest Desert." },
  { n: "IX", title: "Thin books", to: "/thin", body: "Width is information. No quiet club. No emergency print. No frozen official rate." },
  { n: "X", title: "Floor claim", to: "/claim", body: "Senior to paper. Funded from surplus already titled. Small on purpose. Not a rescue print." },
  { n: "XI", title: "The desk", to: "/floor", body: "Reserve the floor, write the tape, then issue, then trade." },
] as const;

export function NotesPage() {
  const [tag, setTag] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  function requestDownload(event: React.FormEvent) {
    event.preventDefault();
    const handle = tag.trim().replace(/^@+/, "");
    const note = purpose.trim() || "Requesting the thesis dissertation (view and download).";
    if (!/^[A-Za-z0-9_]{1,15}$/.test(handle)) {
      setError("Leave a real X tag so the confirmation can reach @" + HANDLE + ".");
      return;
    }
    const url = dmUrl(`@${handle}`, note, "dissertation-download");
    setSent(url);
    setError("");
    window.open(url, "_blank", "noopener,noreferrer");
    window.print();
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Dissertation</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">The notes, in order.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Providence Through Provenance. The Equitable Economic Stack written as one thesis. Each chapter is a live page.
        This page is the index, the explanations, and the request to view or save the bound copy.
      </p>

      <ol className="mt-12 space-y-3">
        {CHAPTERS.map((row) => (
          <li key={row.n} className="rounded-lg border border-border bg-surface p-5">
            <p className="font-mono text-xs text-subtle">{row.n}</p>
            <h2 className="mt-2 font-display text-3xl">
              <Link to={row.to} className="text-fg underline decoration-border underline-offset-4">
                {row.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-2xl text-muted">{row.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">What the bundle forbids</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Par by frozen discount. A hedge only the treasury can write. An agent that mints to cover a hole. A floor paid
          by stretching the meter. A charge hidden inside the haircut. A residual titled before the take. A tape that
          publishes a life, or hides a print.
        </p>
      </section>

      <section id="download" className="mt-14 scroll-mt-24 border-t border-border pt-10 print:hidden">
        <h2 className="font-display text-3xl">View and download</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Leave the X tag that should appear in the confirmation. Sending opens a direct message to @{HANDLE} with the
          request already written — you send it from your own account. This page then opens the print dialog so you can
          save a PDF. Nothing is stacked into a dossier here.
        </p>
        {sent ? (
          <div className="mt-6 rounded-xl border border-border bg-bg p-6">
            <p className="text-sm text-muted">Confirmation drafted to @{HANDLE}. Send the message, then save the printout.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={sent} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
                Open the message again
              </a>
              <button type="button" className="rounded-full border border-border px-4 py-3 text-sm text-fg" onClick={() => window.print()}>
                Save PDF again
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={requestDownload} className="mt-6 max-w-xl rounded-xl border border-border bg-bg p-6">
            <label htmlFor="dl-tag" className="text-sm text-muted">
              X tag
            </label>
            <input
              id="dl-tag"
              required
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-3 text-fg outline-none focus:border-ring"
              placeholder="@yourtag"
              spellCheck={false}
            />
            <label htmlFor="dl-purpose" className="mt-5 block text-sm text-muted">
              Why you want the bound copy
            </label>
            <textarea
              id="dl-purpose"
              rows={4}
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-3 text-fg outline-none focus:border-ring"
              placeholder="Read, archive, teach, issue…"
            />
            {error ? <p className="mt-4 text-sm text-gold">{error}</p> : null}
            <button type="submit" className="mt-6 w-full rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-fg">
              Request download and notify @{HANDLE}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
