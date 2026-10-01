import { Link } from "@tanstack/react-router";

const LAYERS = [
  {
    n: "01",
    title: "Floor",
    body: "Unchanged. Senior. Not a stability tool for invoices. Cannot be called into a book or a Desert fund.",
  },
  {
    n: "02",
    title: "Mint",
    body: "Unchanged. Listed window only. No refill for a short book or an empty overspill.",
  },
  {
    n: "03",
    title: "Issue",
    body: "Invoice plus optional class-book cover. Default posted ratio 0.60 on known 30-day mill paper. Thin class: haircut only.",
  },
  {
    n: "04",
    title: "Tape",
    body: "Receivable, live d, window ratio, window charge, each book line. Optional Desert sliver only if that line is titled.",
  },
  {
    n: "05",
    title: "Agent",
    body: "Lock the current window's listed prices at write. Refuse a ratio with no Funds. Do not freeze last window's d.",
  },
  {
    n: "06",
    title: "Residual",
    body: "Ordinary stability does not spend Desert. A posted sliver may cover only the tail above 0.60, after the book is empty, up to a cap.",
  },
];

const STEPS = [
  { n: "01", title: "Write the receivable", body: "Face is paper. Due date on the tape." },
  { n: "02", title: "Read live d", body: "Conversion = face × (1 − d). No par club." },
  { n: "03", title: "Lock this window", body: "Ratio and charge for the current settlement window are listed at write. That is the cheap stability. Not a frozen official d." },
  { n: "04", title: "Pay the listed charge", body: "One charge, taken now. No second protocol fee." },
  { n: "05", title: "Settle", body: "Live d at checkout. Book pays up to the locked ratio. Tail only if a Desert sliver was already posted." },
];

export function HedgePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Checkout</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Paper is not cash at the register.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Short-term cost stability is a window lock: this write's ratio and charge stay put until the due date. That is the
        minimum change. The rest of the protocol stays as titled.
      </p>

      <section id="window" className="mt-12 rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-3xl">Employed: window lock</h2>
        <p className="mt-4 max-w-2xl text-muted">
          At write, the class book posts 0.60 (known mill paper) and the listed charge for this window only. Payroll for
          that due date can be counted. Next window may requote. Live d still moves at checkout; the book, not the mint,
          pays up to the locked ratio.
        </p>
        <p className="mt-4 max-w-2xl font-mono text-sm text-fg">
          Near-term cost = conversion at live d + book up to 0.60 − charge locked at write.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          Desert fund is not used for ordinary weeks. It is only the tail above 0.60 after Funds are empty, from Desert
          already titled, cap 25% of last titled sliver. Empty sliver = issuer loss. Floor is never the backstop.
        </p>
      </section>

      <ol id="steps" className="mt-12 space-y-4">
        {STEPS.map((step) => (
          <li key={step.n} className="rounded-lg border border-border bg-surface p-5">
            <p className="font-mono text-xs text-subtle">{step.n}</p>
            <h2 className="mt-2 font-display text-3xl">{step.title}</h2>
            <p className="mt-3 max-w-2xl text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <section id="chosen" className="mt-14 rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-3xl">What did not get built</h2>
        <p className="mt-4 max-w-2xl text-muted">
          No new layer. No second sovereign. No frozen d. No compulsory Desert tithe. No spreadsheet h*. Subscription
          book already chosen. Window lock is the only whole-protocol employ: Issue writes the window prices; Tape shows
          them; Agent enforces the window; Desert stays residual; Floor and Mint do not move.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">Across the layers</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {LAYERS.map((row) => (
            <li key={row.n} className="rounded-lg border border-border bg-bg p-5">
              <p className="font-mono text-xs text-subtle">{row.n}</p>
              <h3 className="mt-2 font-display text-2xl">{row.title}</h3>
              <p className="mt-3 text-sm text-muted">{row.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link to="/enter" className="text-fg underline decoration-border underline-offset-4">Enter</Link>
        {" · "}
        <Link to="/charge" className="text-fg underline decoration-border underline-offset-4">Charge</Link>
        {" · "}
        <Link to="/desert" className="text-fg underline decoration-border underline-offset-4">Desert</Link>
        {" · "}
        <Link to="/show" className="text-fg underline decoration-border underline-offset-4">Tape</Link>.
      </p>
    </div>
  );
}
