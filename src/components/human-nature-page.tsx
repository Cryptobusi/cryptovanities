import { PaperShell } from "@/components/paper-shell";

export function HumanNaturePage() {
  return (
    <PaperShell
      folio="Human Nature"
      title="Human Nature, Relational Dynamics, and the Egonomic Architecture"
      abstract="A synthesis linking Robert Greene’s The Laws of Human Nature to behavioral economics and the operational design of Egonomic Anonymous / lgme.app."
    >
      <section>
        <h2 className="text-2xl text-fg">Executive Summary</h2>
        <p className="mt-4">This document unites three domains:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li><strong>Psychological Ground Truth:</strong> Evolutionary heuristics (Greene) override rational self-interest.</li>
          <li><strong>Relational Counterweight:</strong> Rational compassion, personal sovereignty, and strategic mercy outperform extractive models.</li>
          <li><strong>Architectural Alternative:</strong> Egonomic Anonymous and lgme.app use a public tape, Senior Living Floor, Third Seat refusal, and “vote by doing” on Hedera to insulate communities from debt fragility.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Part 1: The Laws of Human Nature</h2>
        <p className="mt-4 text-sm">Summary of the 18 laws. Critical assessment notes strengths in biographical historiography and weaknesses in simplified evolutionary psychology.</p>
        <h3 className="mt-6 text-xl text-fg">Mastering the Self</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Law 1 (Irrationality): Emotions drive decisions in milliseconds; rationality requires a pause.</li>
          <li>Law 2 (Narcissism): Spectrum from deep narcissism to healthy self-worth channeled into curiosity.</li>
          <li>Law 3 (Role-Playing): Social masks; observe micro-expressions for true intent.</li>
          <li>Law 4 (Compulsive Behavior): Childhood patterns repeat under stress or power.</li>
          <li>Law 5 (Covetousness): Desire is socially mediated (elusive, forbidden, rival-validated).</li>
          <li>Law 6 (Short-Sightedness): Tactical reactions blind long-term consequences.</li>
          <li>Law 7 (Defensiveness): Validate core identity before persuasion.</li>
          <li>Law 8 (Self-Sabotage): Mindsets as perceptual filters create self-fulfilling loops.</li>
          <li>Law 9 (Repression): Denying the Jungian shadow leads to projections.</li>
        </ul>
        <h3 className="mt-6 text-xl text-fg">Navigating the Social Collective & Long-Term Fulfillment</h3>
        <p className="mt-4">Laws 10–18 cover envy, grandiosity, gender rigidity, aimlessness, conformity, fickleness, aggression, generational myopia, and death denial. Durable leadership requires emotional steadiness and conscious acknowledgment of mortality.</p>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Part 2: Human Nature vs. Economic Behaviors</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 text-left text-fg">Psychological Driver (Greene)</th>
                <th className="py-2 pr-4 text-left text-fg">Economic Phenomenon</th>
                <th className="py-2 text-left text-fg">Macro / Market Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Law 1 & 6 (Irrationality, Short-Sightedness)</td>
                <td className="py-2 pr-4">Hyperbolic Discounting</td>
                <td className="py-2">Asset bubbles, excess debt, flash-crashes</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Law 5 & 10 (Covetousness, Envy)</td>
                <td className="py-2 pr-4">Conspicuous Consumption / Veblen</td>
                <td className="py-2">Capital to positional goods for status</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Law 11 (Grandiosity)</td>
                <td className="py-2 pr-4">Executive Hubris</td>
                <td className="py-2">Over-leveraged M&A value destruction</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Law 14 (Conformity)</td>
                <td className="py-2 pr-4">Herding</td>
                <td className="py-2">Systemic risk, Keynesian beauty contests</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Law 17 (Generational Myopia)</td>
                <td className="py-2 pr-4">Minsky Credit Cycles</td>
                <td className="py-2">Stability breeds fragility</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Part 3: Empowering Relational Faculties</h2>
        <p className="mt-4">Durable organization requires:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li><strong>Rational Compassion:</strong> Universal living floor decouples survival from market volatility.</li>
          <li><strong>Personal Sovereignty:</strong> Right of refusal prevents toxic resentment.</li>
          <li><strong>Strategic Mercy:</strong> Debt jubilees release frozen labor capacity.</li>
        </ul>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 text-left text-fg">Faculty</th>
                <th className="py-2 pr-4 text-left text-fg">Extractive Model</th>
                <th className="py-2 pr-4 text-left text-fg">Regenerative / Commons</th>
                <th className="py-2 text-left text-fg">Resulting Metric</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Mercy</td>
                <td className="py-2 pr-4">Punitive interest, debt traps</td>
                <td className="py-2 pr-4">Jubilees, non-recourse clearing</td>
                <td className="py-2">Reduced contagion, higher V</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Sovereignty</td>
                <td className="py-2 pr-4">1 dollar = 1 vote</td>
                <td className="py-2 pr-4">1 person = 1 vote, vote by doing</td>
                <td className="py-2">Compressed Gini, lower compliance overhead</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Compassion</td>
                <td className="py-2 pr-4">Means-tested welfare traps</td>
                <td className="py-2 pr-4">Unconditional floor from surplus</td>
                <td className="py-2">Human capital gains, lower property offenses</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl text-fg">Platform: Egonomic Anonymous & lgme.app</h2>
        <p className="mt-4">Immutable verification and mutual-credit layer on Hedera. Pipeline: <strong>Floor → Mint → Issue → Tape → Charge → Agent → Thin → Desert</strong>.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li><strong>Senior Living Floor:</strong> Sustenance from real surplus before profit.</li>
          <li><strong>Public Tape:</strong> Append-only consensus record (HCS).</li>
          <li><strong>Third Seat (Sovereign Refusal):</strong> Cryptographic right to reject non-compliant lines.</li>
          <li><strong>Vote by Doing:</strong> Governance via verified service, not capital.</li>
        </ul>
        <p className="mt-4">Strengths include preventing debit abandonment (vs. historical LETS), anti-rehypothecation, and self-authenticating evidence. Adoption needs merchant density and simpler UX.</p>
        <p className="mt-6 text-sm">Floor stays senior. Same rules bind state, firm, and person. If it cannot be shown, it is not policy. Sovereignty is the refusal.</p>
      </section>
    </PaperShell>
  );
}
