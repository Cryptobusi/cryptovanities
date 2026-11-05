export function RiemannPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">math.NT · math-ph · November 2026</p>
      <h1 className="mt-3 font-display text-4xl leading-tight">A Conditional Spectral and Syntactic Framework for the Critical Line of the Riemann Zeta Function</h1>
      <p className="mt-2 text-sm text-muted">@trancesage</p>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Abstract</h2>
        <p className="mt-3 text-muted">
          We introduce a conditional structural framework for the Riemann Hypothesis in which the non-trivial zeros of the completed zeta function ξ(s) are realized as kernel projections of a zero-boundary operator Z(s) acting on the idèlic quotient Cᵢ = Aᵢ / I×. The construction is grounded in the Hilbert–Pólya program and in Alain Connes’ spectral interpretation of the zeros as an absorption spectrum on the adèle class space. The functional-equation reflection is encoded as an involutive symmetry of the scaling action.
        </p>
        <p className="mt-3 text-muted">
          The argument depends on two hypotheses: the existence of a closed self-adjoint realization of the scaling generator D = −i(x d/dx + 1/2) free of continuous absorption leakage, and a kernel-singularity condition that rules out asymmetric off-critical kernel pairs. Under these hypotheses an off-critical zero induces a spectral bifurcation incompatible with self-adjointness of D. We further observe that the existence of such a realization is a statement internal to any formal system that encodes the operator domain; if the statement is independent in the sense of Gödel, the critical-line constraint acquires the character of a syntactic conservation law. The framework therefore reduces the Riemann Hypothesis to either an analytic construction of the extension or a demonstration of incompleteness for the associated domain theory.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">1. Introduction</h2>
        <p className="mt-3 text-muted">
          The Riemann Hypothesis asserts that every non-trivial zero of the completed zeta function ξ(s) = (1/2) s(s−1) π−s/2 Γ(s/2) ζ(s) satisfies Re(s) = 1/2. The functional equation supplies the reflection identity ξ(s) = ξ(1−s).
        </p>
        <p className="mt-3 text-muted">
          In the classical analytic setting an off-critical zero is not excluded by the functional equation alone; it merely forces the appearance of a symmetric quadruplet. The Hilbert–Pólya conjecture proposes that the imaginary parts of the zeros arise as eigenvalues of a self-adjoint operator, thereby forcing the critical line. Alain Connes embedded this idea in noncommutative geometry: the primes appear as periodic orbits of the idèlic scaling flow on the adèle class space X = Aᵢ/I×, and the non-trivial zeros appear as an absorption spectrum in the corresponding trace formula. Critical zeros are genuine absorption eigenvalues; any off-critical zeros would enter as resonances. The construction of a closed self-adjoint realization of the scaling generator without continuous leakage remains the principal analytic obstruction.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">2. The zero-boundary operator</h2>
        <p className="mt-3 text-muted">
          We replace the scalar zero of I by a terminal projection onto an irreducible zero object in the operator algebra. Define Z(s) := ξ(s) · I_H on a Hilbert space of automorphic test functions supported on the idèlic quotient Cᵢ. A non-trivial zero of ξ(s) corresponds to a non-zero monic kernel vector annihilated by Z(s).
        </p>
        <p className="mt-3 text-muted">
          The functional-equation symmetry is realized by an involution J satisfying J² = id and Re(Js) = 1 − Re(s). The infinitesimal generator of the underlying scaling action is the formally symmetric operator D = −i (x d/dx + 1/2).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">3. Hypotheses and the conditional theorem</h2>
        <p className="mt-3 text-muted"><strong>Hypothesis D (Domain).</strong> There exists a closed self-adjoint realization of D on a dense domain in L²(Cᵢ) that contains the kernel states associated with the zeros of ξ(s) and satisfies ⟨ψ, Dψ⟩ = conjugate(⟨Dψ, ψ⟩) for every such state ψ.</p>
        <p className="mt-3 text-muted"><strong>Hypothesis K (Kernel singularity).</strong> If k : K → M is a non-zero monic kernel of Z(s) and S ⊂ K is a simple non-zero subobject whose spectral projection is disjoint from that of J(S), then S = 0.</p>
        <p className="mt-3 text-muted"><strong>Theorem.</strong> Assume Hypotheses D and K. Then every non-trivial zero of ξ(s) satisfies Re(s) = 1/2.</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">4. Proof</h2>
        <p className="mt-3 text-muted">
          Assume, for contradiction, that s* = 1/2 + δ + it* with δ > 0 and ξ(s*) = 0. By Hypothesis D a corresponding normalized state ψ lies in the domain of the self-adjoint operator D and satisfies ⟨ψ, Dψ⟩ = (t* − iδ) ∥ψ∥². Self-adjointness yields the conjugate identity ⟨Dψ, ψ⟩ = (t* + iδ) ∥ψ∥². Subtraction forces δ = 0, a contradiction.
        </p>
        <p className="mt-3 text-muted">
          Simultaneously, the assumption δ ≠ 0 splits the kernel into a pair of disjoint subspaces Sδ and J(Sδ). Hypothesis K then implies Sδ = 0, contradicting the non-triviality of the zero. Hence no off-critical zero exists under the stated hypotheses.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">5. Relation to Connes’ absorption spectrum</h2>
        <p className="mt-3 text-muted">
          The space Cᵢ is the idèlic quotient underlying the adèle class space of Connes. The operator D generates the scaling action whose periodic orbits encode the primes, and the zeros appear as an absorption spectrum. The kernel-singularity condition converts this absorption picture into a prohibition on asymmetric off-critical kernel pairs once a self-adjoint realization of D is granted. The functional equation alone permits quadruplets; Hypothesis K excludes the bifurcation required to support them.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">6. Syntactic limits and the Gödelian residue</h2>
        <p className="mt-3 text-muted">
          The existence assertion in Hypothesis D is expressible in the language of second-order arithmetic or ZFC once a concrete presentation of the idèlic quotient is fixed. Gödel’s second incompleteness theorem states that any consistent formal system S strong enough to encode Peano arithmetic cannot prove its own consistency and therefore leaves some arithmetic statements undecided.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          <li>If the sentence “a leakage-free self-adjoint extension of D exists” is independent of S, then Hypothesis D cannot be proved inside S.</li>
          <li>The conditional theorem remains valid in every model in which Hypothesis D holds: every non-trivial zero lies on the critical line. In that case the Riemann Hypothesis functions as a conservation law enforced by the syntactic boundary of the formal system.</li>
          <li>An analogous independence may attach to Hypothesis K when the ambient operator algebra is formalized inside S.</li>
        </ul>
        <p className="mt-3 text-muted">
          The remaining step is therefore either an explicit analytic construction of the extension or a proof of independence. In the latter case the critical line is forced precisely because an off-critical zero would violate the syntactic closure of the zero-boundary operator. The model reaches the limit of its fidelity at the incompleteness horizon of the formal system; that horizon itself supplies the missing constraint.
        </p>
        <p className="mt-3 text-muted">
          We emphasize that the Riemann Hypothesis is a Π1 arithmetic statement. Its independence from ZFC is not known; the Gödelian reading offered here is a speculative meta-mathematical interpretation of the domain problem, not a theorem.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">7. Outlook</h2>
        <p className="mt-3 text-muted">
          Once Hypotheses D and K are granted, the structural argument is unconditional. The decisive open question is the status of Hypothesis D. Two complementary routes remain:
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
          <li>Construction of a closed self-adjoint extension of the continuous scaling flow on Cᵢ free of continuous absorption leakage.</li>
          <li>A demonstration that the existence of such an extension is independent of the ambient arithmetic, in which case incompleteness converts the missing step into a syntactic boundary condition.</li>
        </ol>
        <p className="mt-3 text-muted">
          Numerical evidence—billions of zeros on the critical line and vanishing leakage in truncated models—is compatible with both routes but decides neither. The framework isolates the precise point at which either new analysis or a Gödelian independence result would complete the argument, and recasts the Riemann Hypothesis as a conservation principle for an absorbing zero boundary, analytic or syntactic.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">References</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
          <li>A. Connes, Trace formula in noncommutative geometry and the zeros of the Riemann zeta function, Selecta Math. (N.S.) 5 (1999), 29–106. arXiv:math/9811068.</li>
          <li>H. L. Montgomery, The pair correlation of zeros of the zeta function, in Analytic Number Theory, Proc. Sympos. Pure Math. 24, Amer. Math. Soc., 1973, pp. 181–193.</li>
          <li>K. Gödel, Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I, Monatsh. Math. Phys. 38 (1931), 173–198.</li>
        </ol>
      </section>
    </article>
  );
}
