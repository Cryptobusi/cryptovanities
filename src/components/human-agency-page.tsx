import { PaperShell } from "@/components/paper-shell";

export function HumanAgencyPage() {
  return (
    <PaperShell
      folio="Human Agency"
      title="Egonomics and the Preservation of Human Agency"
      abstract="A comprehensive review of the categorical arguments for the defense, protection, and advancement (profectus) of human prerogatives. Human agency requires an auditable line of causality."
    >
      <section>
        <h2 className="text-2xl text-fg">1. Executive Summary & Core Thesis</h2>
        <p className="mt-4">
          Modern civil and economic life suffers from an accelerating systemic crisis: the progressive erosion of individual sovereignty beneath opaque financial ledgers and algorithmic extraction. The institutional architecture detailed at EgonomicAnonymous.live establishes that genuine human agency cannot survive in a vacuum of invisible causality. When monetary issuance, credit clearing, and attention-harvesting feedback loops function behind closed doors, human volition degenerates into passive compliance.
        </p>
        <p className="mt-4 font-medium text-fg">
          Foundational Principle: Human agency requires an auditable line of causality. If an economic lien, conversion, or claim cannot be verified publicly on an immutable consensus tape, it lacks legitimate authority to bind human labor, attention, or civic standing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">2. The Dual-Thread Diagnosis of Agency Breakdown</h2>
        <p className="mt-4">
          The Egonomic framework identifies human self-determination as trapped within a compound vice operating simultaneously at psychological and structural scales:
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-5">
          <li>
            <strong>Internal Cognitive Drift (The Jamesian Thread):</strong> Drawing upon William James's functional psychology of habit and volition, internal agency is defined by the capacity for sustained, voluntary attention. Contemporary engagement architectures actively fragment concentration through micro-reward feedback loops, converting autonomous will into conditioned reflex.
          </li>
          <li>
            <strong>External Structural Enclosure (The Deterministic Thread):</strong> Surface-level market "choices" frequently mask closed, deterministic causal tracks. Off-balance-sheet credit creation, hidden money supply dilution, and proprietary platform terms sever human effort from true economic provenance.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl text-fg">3. Categorical Arguments for Institutional Preservation</h2>

        <h3 className="mt-6 text-xl text-fg">I. The Epistemic Argument: Verification and Provenance</h3>
        <p className="mt-4">
          Authentic choice requires an unadulterated perception of reality. Under conventional financial structures, participants make life-defining decisions against pricing and credit metrics distorted by opaque institutional manipulation. Egonomics mandates the Visible Consensus Tape: every monetary claim must possess an unbroken, public provenance from origination to settlement, permanently eliminating arbitrary value extraction.
        </p>

        <h3 className="mt-6 text-xl text-fg">II. The Material Argument: "Senior Floor First" and Non-Par Credit</h3>
        <p className="mt-4">
          A population under chronic precarity possesses nominal legal freedom but negligible operational agency. Rather than advocating debt jubilees or inflationary fiat expansion (which devalue existing wages), Egonomics introduces the Senior Floor:
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-5">
          <li>
            <strong>Floor Primacy:</strong> Fundamental human subsistence claims are settled first out of documented real economic surplus prior to any discretionary financial leveraging.
          </li>
          <li>
            <strong>Non-Par Discipline:</strong> Unbacked private credit instruments are forbidden from clearing at par with sovereign base currency without explicit audit trails, preventing institutions from privatizing speculative gains while socializing downstream currency debasement.
          </li>
        </ul>

        <h3 className="mt-6 text-xl text-fg">III. The Political Argument: The Doctrine of the "Third Seat"</h3>
        <p className="mt-4">
          Historically, political economy has oscillated between state coercion and corporate market enclosure. Egonomics establishes a tripartite constitutional balance:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 text-left font-medium text-fg">Institutional Entity</th>
                <th className="py-2 pr-4 text-left font-medium text-fg">Operating Domain</th>
                <th className="py-2 text-left font-medium text-fg">Egonomic Boundary & Check</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4">The State</td>
                <td className="py-3 pr-4">Sovereignty, civil order, statutory law</td>
                <td className="py-3">Bound strictly to public mint rules and verifiable tax trails.</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4">The Firm</td>
                <td className="py-3 pr-4">Capital allocation, operational scale, margins</td>
                <td className="py-3">Forbidden from clearing private off-ledger debt at par.</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">The Third Seat (The Person)</td>
                <td className="py-3 pr-4">Individual autonomy, conscious labor, personal will</td>
                <td className="py-3">Equipped with the Right of Refusal over non-compliant ledgers.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 text-xl text-fg">IV. The Psychological & Teleological Dimension (Profectus)</h3>
        <p className="mt-4">
          Progress (profectus) cannot be measured by aggregate financial expansion if it degrades the moral and cognitive sovereignty of the participants. Egonomics restores the classical root of economics—oikonomia, the ethical stewardship of the shared household—positioning neutral mathematics as a protective shield for human dignity rather than an instrument of behavioral capture.
        </p>
        <p className="mt-6 text-sm text-muted">
          Floor stays senior. If it cannot be shown, it is not policy. Sovereignty is the refusal. Same rules bind state, firm, and person.
        </p>
      </section>
    </PaperShell>
  );
}
