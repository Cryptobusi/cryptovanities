import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { PaperShell } from "@/components/paper-shell";
import { dmUrl, HANDLE } from "@/lib/site-data";

const CHAPTERS = [
  { n: "I", title: "Door", to: "/", hash: "thesis", body: "Same rails. Anyone may issue. No one may hide the print." },
  { n: "II", title: "Stack against fiat", to: "/stack", hash: undefined, body: "Five operational layers, then Desert. Senior floor, public mint, no par paper." },
  { n: "III", title: "Invoice conversion", to: "/hedge", hash: undefined, body: "Face is paper. Window lock on ratio and charge." },
  { n: "IV", title: "What the tape shows", to: "/show", hash: undefined, body: "Title, mint, lien, conversion, agent act." },
  { n: "V", title: "Listed risk charge", to: "/charge", hash: undefined, body: "Beside the discount, not inside it." },
  { n: "VI", title: "Mint as a price", to: "/mint", hash: undefined, body: "One meter. No weekend facility." },
  { n: "VII", title: "Desert", to: "/desert", hash: undefined, body: "After floor and listed prices, the remainder is titled." },
  { n: "VIII", title: "Agent", to: "/agent", hash: undefined, body: "Does not mint, set the basket, or harvest Desert." },
  { n: "IX", title: "Thin books", to: "/thin", hash: undefined, body: "Width is information. No quiet club." },
  { n: "X", title: "Floor claim", to: "/claim", hash: undefined, body: "Senior to paper. Small on purpose." },
  { n: "XI", title: "The desk", to: "/floor", hash: undefined, body: "Reserve the floor, write the tape, then issue." },
  { n: "XII", title: "Sovereignty is the refusal", to: "/refusal", hash: undefined, body: "One floor. Three actors. Claims only from recorded exchange. Liabilities only by consent." },
] as const;

export function NotesPage() {
  const [tag, setTag] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  function requestDownload(event: React.FormEvent) {
    event.preventDefault();
    const handle = tag.trim().replace(/^@+/, "");
    const note = purpose.trim() || "Requesting the bound book of the stack (notes, examples, sources).";
    if (!/^[A-Za-z0-9_]{1,15}$/.test(handle)) {
      setError("Leave a real X tag so the confirmation can reach @" + HANDLE + ".");
      return;
    }
    const url = dmUrl(`@${handle}`, note, "book-download");
    setSent(url);
    setError("");
    window.open(url, "_blank", "noopener,noreferrer");
    window.print();
  }

  return (
    <PaperShell
      folio="Contents"
      title="Notes, examples, sources."
      abstract="One book of the Equitable Economic Stack. Each chapter is a live page. This leaf is the bound order. If an in-chat preview host fails, open this path on egonomicanonymous.live."
    >
      <section>
        <h2 className="text-2xl text-fg">How to download</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>Leave your X tag in the form below.</li>
          <li>Send the drafted message to @{HANDLE}.</li>
          <li>When print opens, save as PDF.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Chapters</h2>
        <ol className="mt-6 space-y-6">
          {CHAPTERS.map((row) => (
            <li key={row.n}>
              <p className="font-sans text-xs tracking-widest text-subtle uppercase">Chapter {row.n}</p>
              <h3 className="mt-1 text-xl text-fg">
                <Link to={row.to} hash={row.hash} className="underline decoration-border underline-offset-4">
                  {row.title}
                </Link>
              </h3>
              <p className="mt-2">{row.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Worked invoice</h2>
        <p className="mt-4">
          A mill invoices a baker 10,000 paper units due in 30 days. Checkout quotes 8 percent, so live value is 9,200
          basket units. At due date live d is 14 percent. Conversion is 8,600. A book locked at 0.60 pays its advertised
          gap. Face was never cash.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Sources named on this site</h2>
        <p className="mt-4">
          Live notes on this domain. Menger; Mises; Hume. Diamond, Collapse, as arguments kept. Open writings of @
          {HANDLE}. Hedera and DOVU as rails. $Trust 0.0.10607411 as fee, not legal tender.
        </p>
      </section>

      <section id="download" className="print:hidden font-sans text-sm">
        <h2 className="font-serif text-2xl text-fg">Request the bound copy</h2>
        {sent ? (
          <p className="mt-4">
            <a href={sent} target="_blank" rel="noreferrer" className="underline">
              Open the message again
            </a>
          </p>
        ) : (
          <form onSubmit={requestDownload} className="mt-6 space-y-4">
            <label className="block text-muted">
              X tag
              <input required value={tag} onChange={(e) => setTag(e.target.value)} className="mt-2 w-full border border-border bg-bg px-3 py-2 text-fg" placeholder="@yourtag" />
            </label>
            <label className="block text-muted">
              Why you want the book
              <textarea rows={3} value={purpose} onChange={(e) => setPurpose(e.target.value)} className="mt-2 w-full border border-border bg-bg px-3 py-2 text-fg" />
            </label>
            {error ? <p>{error}</p> : null}
            <button type="submit" className="border border-border px-4 py-2 text-fg">
              Request download and notify @{HANDLE}
            </button>
          </form>
        )}
      </section>
    </PaperShell>
  );
}
