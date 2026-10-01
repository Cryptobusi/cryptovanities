import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { dmUrl, HANDLE } from "@/lib/site-data";

const CHAPTERS = [
  { n: "01", title: "Door", to: "/#thesis", body: "Same rails. Anyone may issue. No one may hide the print. If it cannot be shown, it is only a story." },
  { n: "02", title: "Stack against fiat", to: "/stack", body: "Fiat already has the layers. The bundle is different: senior floor, public mint, no par paper, unpublished acts are not policy." },
  { n: "03", title: "Invoice conversion", to: "/hedge", body: "Face is paper. Checkout haircuts it into basket units. A hedge locks the conversion. The charge is paid when written." },
  { n: "04", title: "What the tape shows", to: "/show", body: "Title, mint, lien, conversion, agent act. Not the body file. Not the raw inbox. Not a scraped dossier." },
  { n: "05", title: "Listed risk charge", to: "/charge", body: "The posted price of writing the paper. Beside the discount, not inside it. Taken before Desert." },
  { n: "06", title: "Mint as a price", to: "/mint", body: "One meter. Listed seigniorage. No weekend facility. Revocation is a line." },
  { n: "07", title: "Desert", to: "/desert", body: "After the floor and the listed prices, the remainder is titled. Not a tail to socialize." },
  { n: "08", title: "Agent", to: "/agent", body: "Pays the floor, flags an off-tape price, refuses a second print. Does not mint, set the basket, or harvest Desert." },
  { n: "09", title: "Thin books", to: "/thin", body: "Width is information. No quiet club. No emergency print. No frozen official rate." },
  { n: "10", title: "Floor claim", to: "/claim", body: "Senior to paper. Funded from surplus already titled. Small on purpose. Not a rescue print." },
  { n: "11", title: "The desk", to: "/floor", body: "Reserve the floor, write the tape, then issue, then trade. Credit, shipment, and credential trails on the desk." },
] as const;

export function NotesPage() {
  const [tag, setTag] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  function requestDownload(event: React.FormEvent) {
    event.preventDefault();
    const handle = tag.trim().replace(/^@+/, "");
    const note = purpose.trim() || "Requesting the bound book of the stack (notes, examples, sources)."
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
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Book</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Notes, examples, sources.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        One book of the Equitable Economic Stack. Each chapter is a live page. This page is the bound order: explanations,
        a worked invoice, the desk trails, and the references those pages already name.
      </p>

      <section id="how" className="mt-10 rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-3xl">How to download</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted">
          <li>Leave your X tag in the form at the foot of this page.</li>
          <li>Send the drafted message to @{HANDLE} from your own X account. That is the confirmation.</li>
          <li>When the print dialog opens, choose Save as PDF. The form block is hidden on the printout.</li>
          <li>Every page of the site repeats the same instruction in the footer: View the notes · Request download.</li>
        </ol>
      </section>

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
        <h2 className="font-display text-3xl">Worked invoice</h2>
        <p className="mt-4 max-w-2xl text-muted">
          A mill invoices a baker 10,000 paper units due in 30 days. Checkout quotes an 8 percent discount, so live value
          is 9,200 basket units. Payroll cannot bear a move to 18 percent. The mill writes a put at a 10 percent strike
          and pays the listed charge for that class. At due date the live discount is 14 percent. Checkout converts to
          8,600. The put pays 400. Net before floor and charge: 9,000. Face was never cash.
        </p>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">Sources named on the tape of this site</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Live notes on this domain. Menger, Principles of Economics. Mises, The Theory of Money and Credit. Hume’s
          monetary essays. Diamond, Collapse — recorded on the thesis as arguments kept, not a model invented here. Open
          writings of @{HANDLE} on the board. Hedera and DOVU as rails. $Trust 0.0.10607411 as fee and acknowledgement,
          not legal tender. HashPack and SaucerSwap as listed purchase paths.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          Isolated citation without the bundle is another pilot.
        </p>
      </section>

      <section id="download" className="mt-14 scroll-mt-24 border-t border-border pt-10 print:hidden">
        <h2 className="font-display text-3xl">Request the bound copy</h2>
        <p className="mt-4 max-w-2xl text-muted">
          The request opens a direct message to @{HANDLE} with your tag and reason already written. You send it. Then
          save the printout.
        </p>
        {sent ? (
          <div className="mt-6 rounded-xl border border-border bg-bg p-6">
            <p className="text-sm text-muted">Confirmation drafted to @{HANDLE}. Send it, then save as PDF.</p>
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
            <label htmlFor="dl-tag" className="text-sm text-muted">X tag</label>
            <input id="dl-tag" required value={tag} onChange={(event) => setTag(event.target.value)} className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-3 text-fg outline-none focus:border-ring" placeholder="@yourtag" spellCheck={false} />
            <label htmlFor="dl-purpose" className="mt-5 block text-sm text-muted">Why you want the book</label>
            <textarea id="dl-purpose" rows={4} value={purpose} onChange={(event) => setPurpose(event.target.value)} className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-3 text-fg outline-none focus:border-ring" placeholder="Read, archive, teach, issue…" />
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
