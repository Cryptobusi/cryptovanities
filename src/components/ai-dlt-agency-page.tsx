import { PaperShell } from "@/components/paper-shell";

export function AiDltAgencyPage() {
  return (
    <PaperShell
      folio="Analytical Brief"
      title="The Architecture of Human Agency: AI & DLT"
      abstract="Speculative mechanics for sovereign economic coordination and an operational critique of the Sovereign Provenance Protocol (lgme.app & egonomicanonymous.live)."
    >
      <section>
        <h2 className="text-2xl text-fg">1. The Theoretical Synthesis: AI as Coordinator, DLT as Substrate</h2>
        <p className="mt-4">
          The ultimate application of pairing Artificial Intelligence with Distributed Ledger Technology is not automated central planning or hyper-financialized token games. Instead, it forms an infrastructure for sovereign human agency, designed to invert the asymmetric extraction typical of centralized platforms.
        </p>
        <h3 className="mt-6 text-xl text-fg">DLT as the Ungameable Reality Layer</h3>
        <p className="mt-4">
          Cryptographic provenance, zero-knowledge verification, and deterministic consensus establish an immutable audit trail. This prevents administrative rent extraction, unilateral rule changes, and opaque computational gatekeeping.
        </p>
        <h3 className="mt-6 text-xl text-fg">AI as the Cognitive Coordination Layer</h3>
        <p className="mt-4">
          Personal, fiduciary AI agents discover multidimensional barter loops, calculate non-extractive clearing paths, and handle micro-accounting friction without requiring humans to navigate bureaucratic overhead.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">2. Structural Comparison: Extractive vs. Agency-Centered Design</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 text-left text-fg">Pillar</th>
                <th className="py-2 pr-4 text-left text-fg">Centralized / Surveillance Paradigm</th>
                <th className="py-2 text-left text-fg">Sovereign AI + DLT Paradigm</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-medium">Value Accounting</td>
                <td className="py-3 pr-4">Monolithic fiat; unrecorded social, civic, and care labor; financialization of attention.</td>
                <td className="py-3">Multi-asset provenance; micro-deeds notarized at near-zero cost; recognition of real-world utility.</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-medium">Agent Role</td>
                <td className="py-3 pr-4">Platform-owned algorithms optimized to maximize behavioral capture and ad revenue.</td>
                <td className="py-3">Locally bound fiduciary agents negotiating exchange terms and enforcing individual boundaries.</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-medium">Safety Floor</td>
                <td className="py-3 pr-4">Discretionary platform payouts or state welfare tied to systemic surveillance.</td>
                <td className="py-3">Algorithmic floor seniority: subsistence claims clear first from named local surplus.</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">Market Clearing</td>
                <td className="py-3 pr-4">Central intermediaries charging 10%–30% take-rates on transactional flow.</td>
                <td className="py-3">Peer-to-peer transitive credit networks and automated bilateral routing (A → B → C).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl text-fg">3. Evaluation: lgme.app & egonomicanonymous.live</h2>
        <p className="mt-4">
          The operational framework showcased across lgme.app and egonomicanonymous.live implements this agency-maximizing thesis through what it terms the Sovereign Provenance Protocol (SPP).
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-5">
          <li>
            <strong>Sub-Cent Micro-Deed Verification:</strong> Leveraging low-cost, high-throughput consensus (Hedera Consensus Service) to notarize mutual human actions for fractions of a cent ($0.0001). This solves the historic problem where the verification cost of neighborly or civic work exceeded the payment rail itself.
          </li>
          <li>
            <strong>Floor Seniority ("The Eight Words"):</strong> A constitutional rule dictating that communal subsistence obligations take algorithmic priority over speculative capital returns or executive fees.
          </li>
          <li>
            <strong>The "Third Seat" (Absolute Right of Refusal):</strong> Placing human sovereignty above algorithmic execution. Participants retain an irrevocable programmatic veto (`NO`) against transactions that violate constitutional precedence.
          </li>
          <li>
            <strong>Systemic Trade-Offs:</strong> The primary barriers to adoption remain cognitive complexity—the philosophical framing demands high domain fluency—and the physical oracle problem, which requires robust mutual web-of-trust validation for offline real-world acts.
          </li>
        </ul>
        <blockquote className="mt-8 border-l-4 border-primary pl-5 font-display text-lg leading-snug text-fg">
          “When human effort is directly anchored to an immutable consensus sequence, value shifts from platform rent-seeking back to mutual coordination. Technology transitions from an instrument of behavior modification to an infrastructure of self-determination.”
        </blockquote>
        <p className="mt-6 text-sm text-muted">
          Analytical Brief: AI, Distributed Ledgers & Human Agency. Floor stays senior. Sovereignty is the refusal.
        </p>
      </section>
    </PaperShell>
  );
}
