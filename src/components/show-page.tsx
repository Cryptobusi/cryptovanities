import { Link } from "@tanstack/react-router";

const SHOWS = [
  {
    n: "01",
    title: "Title",
    body: "Who holds the claim. Who held it last. A transfer that cannot name both sides is not a transfer.",
  },
  {
    n: "02",
    title: "Mint",
    body: "Units issued, units scheduled, units revoked. A second print of the same unit fails in public.",
  },
  {
    n: "03",
    title: "Lien",
    body: "What sits on the claim, in which window, and whether that grant was withdrawn. Authority that can grow itself is not authority.",
  },
  {
    n: "04",
    title: "Conversion",
    body: "The receivable, the hedge, the listed risk charge, and the checkout into basket units. Four lines, or the register refuses.",
  },
  {
    n: "05",
    title: "Agent act",
    body: "Who authorized the software, which rule, which clock, and whether a person signed. The refusal to settle is itself a line.",
  },
];

const HOLDS = [
  {
    n: "01",
    title: "The body file",
    body: "Health, location, and the private life stay off the public tape. A credential can attest a fact without publishing the clinic note.",
  },
  {
    n: "02",
    title: "The raw inbox",
    body: "Messages, drafts, and unissued paper are not policy. They become lines when someone signs them onto the rail.",
  },
  {
    n: "03",
    title: "The witness seat",
    body: "Anyone may read title, mint, lien, and conversion. No one may scrape a dossier of persons from those lines and call that the protocol.",
  },
];

export function ShowPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">Tape</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">If it cannot be shown, it is not policy.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        A public tape is not a glass house. It is a rule about which acts count. Title, mint, lien, conversion, and agent
        act count. The rest is not a line, and a missing line is not a secret privilege.
      </p>
      <p className="mt-4 max-w-2xl text-muted">
        Fiat already splits the record across banks, registries, courts, and statistics. A valid act can still be unpublished.
        Here the opposite failure is the risk: publishing a life because a claim was written.{" "}
        <Link to="/stack" className="text-fg underline decoration-border underline-offset-4">
          The stack
        </Link>{" "}
        named that cost. This page writes the rule.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-3xl">What must be shown</h2>
        <ol className="mt-6 space-y-4">
          {SHOWS.map((row) => (
            <li key={row.n} className="rounded-lg border border-border bg-surface p-5">
              <p className="font-mono text-xs text-subtle">{row.n}</p>
              <h3 className="mt-2 font-display text-3xl">{row.title}</h3>
              <p className="mt-3 max-w-2xl text-muted">{row.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">What the tape withholds</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {HOLDS.map((row) => (
            <li key={row.n} className="rounded-lg border border-border bg-bg p-5">
              <p className="font-mono text-xs text-subtle">{row.n}</p>
              <h3 className="mt-2 font-display text-2xl">{row.title}</h3>
              <p className="mt-3 text-sm text-muted">{row.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">How a person still proves</h2>
        <p className="mt-4 max-w-2xl text-muted">
          A credential can say yes or no to a query the counterparty is allowed to ask. The query is on the tape. The
          clinic file is not. Repeat KYC is a failure of memory, not a reason to hoist the file into public view.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          Selective disclosure is not a side letter. The fact that a proof was given, by whom, for which question, and
          whether it was later revoked — that is the line. The underlying body stays off it.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          An agent that deanonymizes a witness to “help the tape” has left the duty. An office that hides a mint behind
          privacy has left the tape. Both failures are public even when the payload is not.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link to="/hedge" hash="steps" className="text-fg underline decoration-border underline-offset-4">
          Invoice conversion
        </Link>
        {" · "}
        <Link to="/stack" className="text-fg underline decoration-border underline-offset-4">
          Against fiat
        </Link>
        {" · "}
        <a href="/#thesis" className="text-fg underline decoration-border underline-offset-4">
          Thesis
        </a>
        .
      </p>
    </div>
  );
}
