import { Link } from "@tanstack/react-router";

const SEATS = [
  {
    name: "State",
    mark: "Rule",
    now: "Originates base money and legal tender. Writes facilities the other two must use.",
    under: "Lives under the same rule. A mint that is not on the tape is not a mint.",
  },
  {
    name: "Corporation",
    mark: "Issue",
    now: "Originates equity and debt against a limited-liability shell. Keeps the upside, socializes the downside.",
    under: "A share is a recorded claim, not a skip. Losses stay on the book. Credit does not clear at par.",
  },
  {
    name: "Individual",
    mark: "Account",
    now: "Originates nothing by declaration. Accepts the print, the fee, and the unratified liability.",
    under: "Same facility of refusal, in degree. Declines an unconsented liability. Wealth rises only from a recorded exchange.",
  },
] as const;

const BRANCHES = [
  {
    branch: "Legislature",
    counterpart: "Rule-writer",
    does: "Statute, charter, contract terms. Sets the facilities everyone must use — and live under.",
  },
  {
    branch: "Executive",
    counterpart: "Issuer",
    does: "Treasury, central bank, corporate treasury. Puts claims into circulation. Does not hide the print.",
  },
  {
    branch: "Judiciary",
    counterpart: "Accountant of equity",
    does: "Compels relative accounting. Unwinds an imposition. Force is the residual, not the default.",
  },
] as const;

export function RefusalPage() {
  return (
    <article className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">The symmetry rule</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">Sovereignty is the refusal.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Not a privilege of the state, and not a privilege of the firm. The same restraints, the same facilities, and the
        same accounting bind all three. Sovereignty is the shared power to refuse an imposition.
      </p>

      <figure className="mt-10 overflow-hidden rounded-xl border border-border bg-[#12080c]">
        <img
          src="/sovereignty-refusal.jpg"
          alt="Three columns on one stone floor: state, corporation, and individual. Each column holds a balance. A share certificate marked limited sits at the center. A liability slip is refused at the individual. The caption reads: same rules, same facilities, claims only from recorded exchange. Civil equity, not coercive correction."
          className="w-full"
        />
        <figcaption className="border-t border-border px-5 py-4 font-mono text-xs text-subtle">
          No imposed liabilities. Same rules. Same facilities. Claims only from recorded exchange.
        </figcaption>
      </figure>

      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-3xl">One floor. Three actors.</h2>
        <p className="mt-4 text-muted">
          State, corporation, individual. None may write a rule it does not also live under. None may push a liability
          onto another without that other’s recorded consent. Settlement is civil and in equity. Force is what remains
          when the ledger is refused, not the way the ledger is written.
        </p>
      </section>

      <ol className="mt-10 grid gap-4 lg:grid-cols-3">
        {SEATS.map((seat) => (
          <li key={seat.name} className="rounded-lg border border-border bg-surface p-5">
            <p className="font-mono text-xs tracking-widest text-subtle uppercase">{seat.mark}</p>
            <h3 className="mt-2 font-display text-2xl">{seat.name}</h3>
            <p className="mt-4 text-sm text-muted">{seat.now}</p>
            <p className="mt-3 text-sm text-fg">{seat.under}</p>
          </li>
        ))}
      </ol>

      <section className="mt-16">
        <h2 className="font-display text-3xl">The branches are not the fracture.</h2>
        <p className="mt-4 max-w-2xl text-muted">
          The split already named on this site maps onto the offices. The fracture is who may originate a claim.
        </p>
        <div className="mt-8 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-surface font-mono text-xs tracking-widest text-subtle uppercase">
              <tr>
                <th className="px-4 py-3 font-normal">Office</th>
                <th className="px-4 py-3 font-normal">Counterpart</th>
                <th className="px-4 py-3 font-normal">What it does</th>
              </tr>
            </thead>
            <tbody>
              {BRANCHES.map((row) => (
                <tr key={row.branch} className="border-t border-border">
                  <td className="px-4 py-4 text-fg">{row.branch}</td>
                  <td className="px-4 py-4 text-fg">{row.counterpart}</td>
                  <td className="px-4 py-4 text-muted">{row.does}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16 max-w-3xl space-y-4 text-muted">
        <h2 className="font-display text-3xl text-fg">Who may originate a claim.</h2>
        <p>
          The state originates base money. The corporation originates equity and debt against a limited shell. On this
          rule the individual originates nothing by declaration. Wealth on the floor rises only when a value exchange is
          recorded: performance against performance, not a printer.
        </p>
        <p>
          Shares and central-bank liabilities are the two exceptions currently allowed to skip that step, then enforced
          on the third seat. The design stands or falls on whether those two are brought onto the floor or left as
          privileges.
        </p>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-border bg-surface p-5">
          <h2 className="font-display text-2xl">Refusal in degree.</h2>
          <p className="mt-3 text-sm text-muted">
            A state already refuses a private claim. A corporation already refuses a creditor in bankruptcy. The
            individual counterpart is the same facility: decline an unconsented liability, a tax written as an
            imposition, or a monetary claim that was not earned by exchange. Matched, not unlimited. Absolute refusal
            collapses the common floor. Zero refusal is subjection.
          </p>
        </article>
        <article className="rounded-lg border border-border bg-surface p-5">
          <h2 className="font-display text-2xl">Print is the same act.</h2>
          <p className="mt-3 text-sm text-muted">
            Limited liability socializes the downside and keeps the upside. Central-bank issuance socializes the unit of
            account. If those are facilities, the individual needs the equivalent recorded claim: mutual credit, equity
            in the monetary base, or a refusal that zeroes an unearned liability. Otherwise the equity accounting never
            closes.
          </p>
        </article>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-3xl">The hard edge is enforcement.</h2>
        <p className="mt-4 text-muted">
          Civil equanimity works only while all three still accept the same ledger. The moment one actor can compel
          with violence and the others cannot, the offices stop being coordinate and become a hierarchy with a residual
          sovereign. Symmetry then requires one of two things. Coercive correction is unavailable to all three except
          through the shared equity court. Or the individual’s refusal is backed by the same remedy the other two
          already use.
        </p>
        <p className="mt-6 border-l border-primary pl-5 font-display text-2xl leading-snug text-fg">
          Civil equity, not coercive correction.
        </p>
        <p className="mt-6 text-muted">
          One floor. Three actors. Claims only from recorded exchange. Liabilities only by consent. Refusal in degree.
          Settlement in equity.{" "}
          <Link to="/stack" className="text-fg underline decoration-border underline-offset-4">
            The stack against fiat
          </Link>{" "}
          is the working form of that floor.{" "}
          <Link to="/show" className="text-fg underline decoration-border underline-offset-4">
            The tape
          </Link>{" "}
          is what makes an unpublished act non-policy.
        </p>
      </section>
    </article>
  );
}
